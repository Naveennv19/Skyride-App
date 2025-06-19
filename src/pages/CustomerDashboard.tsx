
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Car, Calendar, MapPin, Filter, Plus } from 'lucide-react';

interface Booking {
  id: string;
  rideType: string;
  pickupLocation: string;
  dropLocation: string;
  date: string;
  time: string;
  status: 'pending' | 'assigned' | 'completed' | 'scheduled' | 'cancelled';
  createdAt: string;
  rideOption?: string;
  scheduled?: boolean;
}

const CustomerDashboard = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [rideTypeFilter, setRideTypeFilter] = useState('all');
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

    if (rideTypeFilter !== 'all') {
      filtered = filtered.filter(booking => booking.rideType === rideTypeFilter);
    }

    setFilteredBookings(filtered);
  }, [bookings, statusFilter, rideTypeFilter]);

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

  const handleCancelRide = (bookingId: string) => {
    const updatedBookings = bookings.map(booking =>
      booking.id === bookingId
        ? { ...booking, status: 'cancelled' as const }
        : booking
    );
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    
    toast({
      title: "Ride cancelled",
      description: "Your ride has been cancelled successfully.",
    });
  };

  const recentBookings = filteredBookings.slice(0, 3);
  const totalBookings = bookings.length;
  const completedBookings = bookings.filter(b => b.status === 'completed').length;
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
            <p className="text-gray-600">Manage your rides and bookings</p>
          </div>
          <Link to="/book-ride">
            <Button className="btn-primary flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Book New Ride</span>
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                <div className="bg-green-100 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{completedBookings}</p>
                  <p className="text-gray-600">Completed Rides</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="skeuomorphic-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{pendingBookings}</p>
                  <p className="text-gray-600">Pending Rides</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Bookings */}
        <Card className="skeuomorphic-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Car className="h-5 w-5" />
              <span>Recent Bookings</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentBookings.length > 0 ? (
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </Badge>
                          <span className="text-sm text-gray-500 capitalize">{booking.rideType} Travel</span>
                        </div>
                        <div className="space-y-1">
                          <p className="font-medium">From: {booking.pickupLocation}</p>
                          <p className="font-medium">To: {booking.dropLocation}</p>
                          {booking.date && (
                            <p className="text-sm text-gray-600">
                              Scheduled: {booking.date} at {booking.time}
                            </p>
                          )}
                        </div>
                      </div>
                      {booking.status === 'pending' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCancelRide(booking.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No bookings yet</p>
                <Link to="/book-ride">
                  <Button className="mt-4">Book your first ride</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* All Bookings with Filters */}
        <Card className="skeuomorphic-card">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center space-x-2">
                <Filter className="h-5 w-5" />
                <span>All Bookings</span>
              </CardTitle>
              <div className="flex space-x-4">
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

                <Select value={rideTypeFilter} onValueChange={setRideTypeFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by ride type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="airport">Airport Travel</SelectItem>
                    <SelectItem value="local">Local Travel</SelectItem>
                    <SelectItem value="outstation">Outstation Travel</SelectItem>
                    <SelectItem value="hourly">Hourly Rentals</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
                          <p className="font-medium">From: {booking.pickupLocation}</p>
                          <p className="font-medium">To: {booking.dropLocation}</p>
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
                      {booking.status === 'pending' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCancelRide(booking.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">No bookings match your filters</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerDashboard;
