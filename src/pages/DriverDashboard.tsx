
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Car, Calendar, MapPin, User, DollarSign, Clock } from 'lucide-react';

interface Booking {
  id: string;
  rideType: string;
  pickupLocation: string;
  dropLocation: string;
  date: string;
  time: string;
  status: 'pending' | 'assigned' | 'completed' | 'scheduled';
  createdAt: string;
  customerName?: string;
  assignedDriver?: string;
  rideOption?: string;
}

const DriverDashboard = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [rideTypeFilter, setRideTypeFilter] = useState('all');
  const { user } = useAuth();

  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    // Only show bookings assigned to this driver
    const driverBookings = savedBookings.filter((booking: Booking) => 
      booking.assignedDriver === user?.id
    );
    
    setBookings(driverBookings);
    setFilteredBookings(driverBookings);
  }, [user]);

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
      case 'assigned':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const recentBookings = filteredBookings.slice(0, 3);
  const totalRides = bookings.length;
  const completedRides = bookings.filter(b => b.status === 'completed').length;
  const assignedRides = bookings.filter(b => b.status === 'assigned').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Driver Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}! ({user?.role?.toUpperCase()}) Here are your ride assignments</p>
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
                  <p className="text-2xl font-bold">{totalRides}</p>
                  <p className="text-gray-600">Total Rides</p>
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
                  <p className="text-2xl font-bold">{completedRides}</p>
                  <p className="text-gray-600">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="skeuomorphic-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{assignedRides}</p>
                  <p className="text-gray-600">Assigned</p>
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
                  <p className="text-2xl font-bold">${completedRides * 25}</p>
                  <p className="text-gray-600">Earnings</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Assigned Rides */}
        <Card className="skeuomorphic-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Car className="h-5 w-5" />
              <span>Recent Assigned Rides</span>
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
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-gray-500" />
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
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              <span>Scheduled: {booking.date} at {booking.time}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600 capitalize">{booking.rideOption || 'Economy'}</p>
                        {booking.status === 'assigned' && (
                          <Button size="sm" className="w-full">
                            Start Ride
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No rides assigned yet</p>
                <p className="text-sm text-gray-500 mt-2">Check back later for new ride assignments</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* All Rides with Filters */}
        <Card className="skeuomorphic-card">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Ride History</CardTitle>
              <div className="flex space-x-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="assigned">Assigned</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
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
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-gray-500" />
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
                            Assigned: {new Date(booking.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600 capitalize mb-2">{booking.rideOption || 'Economy'}</p>
                        {booking.status === 'completed' && (
                          <p className="text-sm font-semibold text-green-600">+$25</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">No rides match your filters</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DriverDashboard;
