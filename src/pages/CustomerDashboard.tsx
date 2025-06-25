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
import BookingCard from '@/components/ui/BookingCard';
import StatCard from '@/components/ui/StatCard';
import BookingSection from '@/components/ui/BookingSection';
import FilterDropdown from '@/components/ui/FilterDropdown';

import axios from 'axios';

interface Booking {
  id: string;
  rideType: string;
  pickupLocation: string;
  dropLocation: string;
  date: string;
  time: string;
  status: 'pending' | 'assigned' | 'completed' | 'scheduled' | 'cancelled';
  createdAt: string;
}

const CustomerDashboard = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [rideTypeFilter, setRideTypeFilter] = useState('all');
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/user/booking', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          
        });
        console.log('Raw backend response:', response.data);

        const backendBookings: Booking[] = response.data.map((b: any) => ({
          id: b.id,
          pickupLocation: b.pickupLocation,
          dropLocation: b.dropLocation,
          rideType: b.rideType?.toLowerCase() || 'unknown', // depends on backend
          date: b.date,
          time: b.time,
          status: b.status.toLowerCase(),
          createdAt: b.createdAt || new Date().toISOString(),
        }));

        setBookings(backendBookings);
        setFilteredBookings(backendBookings);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
        toast({
          title: 'Error',
          description: 'Unable to load bookings from server.',
        });
      }
    };

    fetchBookings();
  }, []);

  // useEffect(() => {
  //   let filtered = bookings;

  //   if (statusFilter !== 'all') {
  //     filtered = filtered.filter((booking) => booking.status === statusFilter);
  //   }

  //   if (rideTypeFilter !== 'all') {
  //     filtered = filtered.filter((booking) => booking.rideType === rideTypeFilter);
  //   }

  //   setFilteredBookings(filtered);
  // }, [bookings, statusFilter, rideTypeFilter]);

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
    const updatedBookings = bookings.map((booking) =>
      booking.id === bookingId ? { ...booking, status: 'cancelled' as const } : booking
    );
    setBookings(updatedBookings);

    toast({
      title: 'Ride cancelled',
      description: 'Your ride has been cancelled successfully.',
    });
  };

  const recentBookings = filteredBookings.slice(0, 3);
  const totalBookings = bookings.length;
  const completedBookings = bookings.filter((b) => b.status === 'completed').length;
  const pendingBookings = bookings.filter((b) => b.status === 'pending').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard icon={<Car />} label="Total Bookings" value={totalBookings} bg="blue" />
          <StatCard icon={<Calendar />} label="Completed Rides" value={completedBookings} bg="green" />
          <StatCard icon={<MapPin />} label="Pending Rides" value={pendingBookings} bg="yellow" />
        </div>

        {/* Recent Bookings */}
        <BookingSection title="Recent Bookings" bookings={recentBookings} onCancel={handleCancelRide} getStatusColor={getStatusColor} />

        {/* All Bookings with Filters */}
        <Card className="skeuomorphic-card">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center space-x-2">
                <Filter className="h-5 w-5" />
                <span>All Bookings</span>
              </CardTitle>
              <div className="flex space-x-4">
                <FilterDropdown value={statusFilter} onChange={setStatusFilter} label="status" options={['all', 'pending', 'assigned', 'completed', 'scheduled', 'cancelled']} />
                <FilterDropdown value={rideTypeFilter} onChange={setRideTypeFilter} label="ride type" options={['all', 'airport', 'local', 'outstation', 'hourly']} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} getStatusColor={getStatusColor} onCancel={handleCancelRide} />
              ))
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
