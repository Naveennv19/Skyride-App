
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Car, Users, MapPin, DollarSign, Settings, UserCheck } from 'lucide-react';

interface Booking {
  id: string;
  rideType: string;
  pickupLocation: string;
  dropLocation: string;
  date: string;
  time: string;
  status: 'pending' | 'assigned' | 'completed' | 'scheduled' | 'cancelled';
  createdAt: string;
  customerName?: string;
  assignedDriver?: string;
  rideOption?: string;
}

const AdminDashboard = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(savedBookings);
    setFilteredBookings(savedBookings);
  }, []);

  useEffect(() => {
    let filtered = bookings;

    if (statusFilter !== 'all') {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }

    setFilteredBookings(filtered);
  }, [bookings, statusFilter]);

  const handleAssignDriver = (bookingId: string) => {
    const updatedBookings = bookings.map(booking => {
      if (booking.id === bookingId) {
        return {
          ...booking,
          status: 'assigned' as const,
          assignedDriver: 'driver-123' // Mock driver ID
        };
      }
      return booking;
    });

    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));

    toast({
      title: "Driver assigned",
      description: "A driver has been successfully assigned to this booking.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'assigned':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-purple-100 text-purple-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const completedBookings = bookings.filter(b => b.status === 'completed').length;
  const totalRevenue = completedBookings * 25; // Mock revenue calculation

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome {user?.name}! ({user?.role?.toUpperCase()}) Manage bookings and assign drivers</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="skeuomorphic-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Car className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalBookings}</p>
                  <p className="text-gray-600">Total Bookings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="skeuomorphic-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Settings className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{pendingBookings}</p>
                  <p className="text-gray-600">Pending Assignment</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="skeuomorphic-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <UserCheck className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{completedBookings}</p>
                  <p className="text-gray-600">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="skeuomorphic-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">${totalRevenue}</p>
                  <p className="text-gray-600">Total Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Assignments */}
        <Card className="skeuomorphic-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Pending Driver Assignments</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {bookings.filter(b => b.status === 'pending').length > 0 ? (
              <div className="space-y-4">
                {bookings.filter(b => b.status === 'pending').map((booking) => (
                  <div key={booking.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(booking.status)}>
                            Pending Assignment
                          </Badge>
                          <span className="text-sm text-gray-500 capitalize">{booking.rideType} Travel</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-gray-500" />
                            <span className="font-medium">{booking.customerName}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span>From: {booking.pickupLocation}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span>To: {booking.dropLocation}</span>
                          </div>
                          {booking.date && (
                            <p className="text-sm text-gray-600">
                              Scheduled: {booking.date} at {booking.time}
                            </p>
                          )}
                          <p className="text-xs text-gray-500">
                            Booked: {new Date(booking.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600 capitalize">{booking.rideOption || 'Economy'}</p>
                        <Button
                          onClick={() => handleAssignDriver(booking.id)}
                          size="sm"
                          className="w-full"
                        >
                          Assign Driver
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No pending assignments</p>
                <p className="text-sm text-gray-500 mt-2">All bookings have been assigned to drivers</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* All Bookings */}
        <Card className="skeuomorphic-card">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>All Bookings</CardTitle>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="assigned">Assigned</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {filteredBookings.length > 0 ? (
              <div className="space-y-4">
                {filteredBookings.map((booking) => (
                  <div key={booking.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </Badge>
                          <span className="text-sm text-gray-500 capitalize">{booking.rideType} Travel</span>
                          {booking.rideOption && (
                            <span className="text-sm text-gray-500 capitalize">• {booking.rideOption}</span>
                          )}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-gray-500" />
                            <span className="font-medium">{booking.customerName}</span>
                          </div>
                          <p className="text-sm">From: {booking.pickupLocation}</p>
                          <p className="text-sm">To: {booking.dropLocation}</p>
                          {booking.date && (
                            <p className="text-sm text-gray-600">
                              Scheduled: {booking.date} at {booking.time}
                            </p>
                          )}
                          <p className="text-xs text-gray-500">
                            Booked: {new Date(booking.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <p className="text-sm text-gray-600 capitalize">{booking.rideOption || 'Economy'}</p>
                        {booking.status === 'pending' && (
                          <Button
                            onClick={() => handleAssignDriver(booking.id)}
                            size="sm"
                          >
                            Assign Driver
                          </Button>
                        )}
                        {booking.status === 'completed' && (
                          <p className="text-sm font-semibold text-green-600">Revenue: $25</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">No bookings found</p>
                <p className="text-sm text-gray-500 mt-2">Bookings will appear here once customers make reservations</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
