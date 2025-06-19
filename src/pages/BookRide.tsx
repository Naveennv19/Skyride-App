
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navigation from '@/components/Navigation';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Calendar, Clock, Plane, Car, Globe, Timer } from 'lucide-react';

const BookRide = () => {
  const [bookingData, setBookingData] = useState({
    rideType: '',
    pickupLocation: '',
    dropLocation: '',
    date: '',
    time: '',
  });
  const [showPrices, setShowPrices] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const rideTypes = [
    { value: 'airport', label: 'Airport Travel', icon: <Plane className="h-5 w-5" /> },
    { value: 'local', label: 'Local Travel', icon: <Car className="h-5 w-5" /> },
    { value: 'outstation', label: 'Outstation Travel', icon: <Globe className="h-5 w-5" /> },
    { value: 'hourly', label: 'Hourly Rentals', icon: <Timer className="h-5 w-5" /> },
  ];

  const mockPrices = {
    economy: { price: 25, time: '5-10 min', capacity: '4 seats' },
    comfort: { price: 35, time: '3-8 min', capacity: '4 seats' },
    premium: { price: 55, time: '2-5 min', capacity: '4 seats' },
  };

  const handleInputChange = (field: string, value: string) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const handleSeePrices = () => {
    if (!bookingData.pickupLocation || !bookingData.dropLocation) {
      toast({
        title: "Missing information",
        description: "Please enter both pickup and drop locations.",
        variant: "destructive",
      });
      return;
    }
    setShowPrices(true);
  };

  const handleBookRide = (rideOption: string) => {
    const booking = {
      id: `booking-${Date.now()}`,
      ...bookingData,
      rideOption,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    // Save booking to localStorage
    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    existingBookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(existingBookings));

    toast({
      title: "Ride booked successfully!",
      description: "Your ride request has been submitted. You'll be notified when a driver is assigned.",
    });

    navigate('/customer-dashboard');
  };

  const handleScheduleForLater = () => {
    if (!bookingData.date || !bookingData.time) {
      toast({
        title: "Missing schedule information",
        description: "Please select date and time for your scheduled ride.",
        variant: "destructive",
      });
      return;
    }

    const booking = {
      id: `booking-${Date.now()}`,
      ...bookingData,
      scheduled: true,
      status: 'scheduled',
      createdAt: new Date().toISOString(),
    };

    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    existingBookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(existingBookings));

    toast({
      title: "Ride scheduled successfully!",
      description: `Your ride has been scheduled for ${bookingData.date} at ${bookingData.time}.`,
    });

    navigate('/customer-dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book your ride</h1>
          <p className="text-gray-600">Fill in the details below to get started</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Form */}
          <Card className="skeuomorphic-card">
            <CardHeader>
              <CardTitle>Ride Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select onValueChange={(value) => handleInputChange('rideType', value)}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select ride type" />
                </SelectTrigger>
                <SelectContent>
                  {rideTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center space-x-2">
                        {type.icon}
                        <span>{type.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Pickup location"
                  value={bookingData.pickupLocation}
                  onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
                  className="pl-10 h-12"
                />
              </div>

              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Drop location"
                  value={bookingData.dropLocation}
                  onChange={(e) => handleInputChange('dropLocation', e.target.value)}
                  className="pl-10 h-12"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="date"
                    value={bookingData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>

                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="time"
                    value={bookingData.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleSeePrices}
                  className="w-full h-12 btn-primary"
                >
                  See Prices
                </Button>
                
                <Button
                  onClick={handleScheduleForLater}
                  variant="outline"
                  className="w-full h-12"
                >
                  Schedule for Later
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Price Options */}
          {showPrices && (
            <Card className="skeuomorphic-card">
              <CardHeader>
                <CardTitle>Choose your ride</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(mockPrices).map(([option, details]) => (
                  <Card key={option} className="border-2 hover:border-black transition-colors cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold capitalize">{option}</h3>
                          <p className="text-sm text-gray-600">{details.time} • {details.capacity}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold">${details.price}</p>
                          <Button
                            onClick={() => handleBookRide(option)}
                            size="sm"
                            className="mt-2"
                          >
                            Book Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookRide;
