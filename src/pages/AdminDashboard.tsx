import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Car, Users, MapPin, DollarSign, Settings, UserCheck } from 'lucide-react';

interface Booking {
  driverName: string;
  id: string;
  rideType: string;
  pickupLocation: string;
  dropLocation: string;
  date: string;
  time: string;
  status: 'pending' | 'assigned' | 'completed' | 'cancelled';
  createdAt?: string;
  customerName?: string;
  assignedDriver?: string;
  rideOption?: string;
}

interface Driver {
  id: number;
  name: string;
  email: string;
}

const AdminDashboard = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [selectedDrivers, setSelectedDrivers] = useState<{ [bookingId: string]: number }>({});

  const { user } = useAuth();
  const { toast } = useToast();

  // ✅ Fetch all bookings for admin
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/admin/bookings', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setBookings(response.data);
        setFilteredBookings(response.data);
      } catch (err) {
        console.error('Failed to fetch bookings:', err);
        toast({
          title: 'Error',
          description: 'Failed to load bookings.',
        });
      }
    };

    fetchBookings();
  }, []);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8080/api/admin/driver?driverStatus=AVAILABLE', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDrivers(res.data);
      } catch (err) {
        console.error('Failed to fetch drivers:', err);
      }
    };

    fetchDrivers();
  }, []);

  useEffect(() => {
    let filtered = bookings;
    if (statusFilter !== 'all') {
      filtered = filtered.filter(b => b.status === statusFilter);
    }
    setFilteredBookings(filtered);
  }, [bookings, statusFilter]);

  const handleDriverSelect = (bookingId: string, driverId: number) => {
    setSelectedDrivers(prev => ({ ...prev, [bookingId]: driverId }));
  };

  const handleAssignDriver = async (bookingId: string) => {
    const driverId = selectedDrivers[bookingId];
    if (!driverId) {
      toast({
        title: 'Select a driver',
        description: 'Please select a driver before assigning.',
      });
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:8080/api/admin/booking',
        { bookingId: Number(bookingId), driverId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.message === 'Driver assigned successfully') {
        const updatedBookings = bookings.map((b) =>
          b.id === bookingId
            ? {
                ...b,
                status: 'assigned' as const,
                assignedDriver: `driver-${driverId}`,
              }
            : b
        );
        setBookings(updatedBookings);

        toast({
          title: 'Driver assigned',
          description: 'Driver assigned successfully to this booking.',
        });
      }
    } catch (error) {
      console.error('Assignment failed:', error);
      toast({
        title: 'Assignment failed',
        description: 'Could not assign driver. Try again.',
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'assigned':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const completedBookings = bookings.filter(b => b.status === 'completed').length;
  const totalRevenue = completedBookings * 25;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome {user?.name}! ({user?.role?.toUpperCase()})</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card><CardContent className="p-6"><div className="flex items-center space-x-4"><Car className="h-6 w-6 text-blue-600" /><div><p className="text-2xl font-bold">{totalBookings}</p><p>Total Bookings</p></div></div></CardContent></Card>
          <Card><CardContent className="p-6"><div className="flex items-center space-x-4"><Settings className="h-6 w-6 text-yellow-600" /><div><p className="text-2xl font-bold">{pendingBookings}</p><p>Pending Assignment</p></div></div></CardContent></Card>
          <Card><CardContent className="p-6"><div className="flex items-center space-x-4"><UserCheck className="h-6 w-6 text-green-600" /><div><p className="text-2xl font-bold">{completedBookings}</p><p>Completed</p></div></div></CardContent></Card>
          <Card><CardContent className="p-6"><div className="flex items-center space-x-4"><DollarSign className="h-6 w-6 text-purple-600" /><div><p className="text-2xl font-bold">${totalRevenue}</p><p>Total Revenue</p></div></div></CardContent></Card>
        </div>

        {/* Pending Assignments */}
        <Card className="skeuomorphic-card mb-8">
          <CardHeader><CardTitle className="flex items-center space-x-2"><Settings className="h-5 w-5" /><span>Pending Driver Assignments</span></CardTitle></CardHeader>
          <CardContent>
            {bookings.filter(b => b.status === 'pending' && !b.assignedDriver).length > 0 ? (
              bookings.filter(b => b.status === 'pending' && !b.assignedDriver).map((booking) => (
                <div key={booking.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={getStatusColor(booking.status)}>Pending</Badge>
                        <span className="text-sm">{booking.rideType}</span>
                      </div>
                      <p className="text-sm">Customer: {booking.customerName}</p>
                      <p className="text-sm">From: {booking.pickupLocation}</p>
                      <p className="text-sm">To: {booking.dropLocation}</p>
                      <p className="text-sm">Time: {booking.date} at {booking.time}</p>
                    </div>
                    <div className="space-y-2">
                      <Select onValueChange={(value) => handleDriverSelect(booking.id, Number(value))}>
                        <SelectTrigger className="w-48"><SelectValue placeholder="Select driver" /></SelectTrigger>
                        <SelectContent>
                          {drivers.map((driver) => (
                            <SelectItem key={driver.id} value={driver.id.toString()}>
                              {driver.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button onClick={() => handleAssignDriver(booking.id)} size="sm" className="w-full">Assign Driver</Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No pending assignments</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Booking History */}
        <Card className="skeuomorphic-card mb-8">
          <CardHeader><CardTitle className="flex items-center space-x-2"><Users className="h-5 w-5" /><span>Booking History</span></CardTitle></CardHeader>
          <CardContent>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <div key={booking.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status.charAt(0) + booking.status.slice(1).toLowerCase()}
                        </Badge>
                        <span className="text-sm capitalize">{booking.rideType}</span>
                      </div>
                      <p className="text-sm">Customer: {booking.customerName}</p>
                      <p className="text-sm">From: {booking.pickupLocation}</p>
                      <p className="text-sm">To: {booking.dropLocation}</p>
                      <p className="text-sm">Time: {booking.date} at {booking.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        Assigned Driver: {booking.driverName || 'Not assigned'}
                      </p>
                      {booking.status === 'completed' && (
                        <p className="text-sm font-semibold text-green-600 mt-1">+$25</p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No bookings available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
