
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import { MapPin, Calendar, Clock, Plane, Car, Globe, Timer, Star, Shield, Clock3 } from 'lucide-react';

const Index = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');

  const rideTypes = [
    {
      icon: <Plane className="h-8 w-8" />,
      title: 'Airport Travel',
      description: 'Reliable rides to and from the airport',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Car className="h-8 w-8" />,
      title: 'Local Travel',
      description: 'Quick rides around the city',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: 'Outstation Travel',
      description: 'Long distance comfortable journeys',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: <Timer className="h-8 w-8" />,
      title: 'Hourly Rentals',
      description: 'Book a cab for multiple hours',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const features = [
    {
      icon: <Star className="h-6 w-6" />,
      title: '5-Star Rated',
      description: 'Top-rated drivers and excellent service'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Safe & Secure',
      description: 'Background-checked drivers, GPS tracking'
    },
    {
      icon: <Clock3 className="h-6 w-6" />,
      title: '24/7 Available',
      description: 'Round-the-clock service when you need it'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section with Modern Cab Service Imagery */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                  Request a ride for<br />
                  <span className="text-black">now or later</span>
                </h1>
                
                <div className="flex items-center space-x-2 text-green-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-sm font-medium">Up to 50% off your first 5 rides. T&Cs apply.*</span>
                </div>
                <p className="text-sm text-gray-600">*Valid within 15 days of signup.</p>
              </div>

              <Card className="skeuomorphic-card">
                <CardContent className="p-6 space-y-4">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Enter location"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      className="pl-10 h-12 border-2 border-gray-200"
                    />
                  </div>
                  
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Enter destination"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="pl-10 h-12 border-2 border-gray-200"
                    />
                  </div>

                  <div className="flex space-x-3">
                    <Link to="/book-ride" className="flex-1">
                      <Button className="w-full h-12 btn-primary">
                        See prices
                      </Button>
                    </Link>
                    <Link to="/book-ride" className="flex-1">
                      <Button variant="outline" className="w-full h-12 border-2">
                        Schedule for later
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Modern Cab Service Illustration */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl p-8 h-96 flex items-center justify-center relative overflow-hidden">
                {/* Modern Car Silhouette */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
                <div className="relative z-10 text-center text-white">
                  <div className="mb-6">
                    <div className="w-32 h-16 mx-auto bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl flex items-center justify-center mb-4 shadow-2xl">
                      <Car className="h-12 w-12 text-white" />
                    </div>
                    <div className="flex justify-center space-x-2 mb-4">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-75"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-150"></div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Your Premium Ride</h3>
                  <p className="text-lg opacity-90">Safe • Reliable • Comfortable</p>
                </div>
                {/* Floating Elements */}
                <div className="absolute top-8 right-8 w-4 h-4 bg-blue-400 rounded-full opacity-60 animate-bounce"></div>
                <div className="absolute bottom-8 left-8 w-3 h-3 bg-purple-400 rounded-full opacity-60 animate-bounce delay-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose SkyRide?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="skeuomorphic-card text-center">
                <CardContent className="p-6">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-blue-600">{feature.icon}</div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Ride Types Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose your ride type</h2>
            <p className="text-xl text-gray-600">Find the perfect ride for every occasion</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rideTypes.map((type, index) => (
              <Link key={index} to="/book-ride">
                <Card className="ride-type-card h-48 cursor-pointer group">
                  <CardContent className={`h-full p-6 bg-gradient-to-br ${type.color} text-white flex flex-col justify-between`}>
                    <div className="flex justify-between items-start">
                      <div className="text-white opacity-90">
                        {type.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{type.title}</h3>
                      <p className="text-sm opacity-90">{type.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Suggestions Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Suggestions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="skeuomorphic-card cursor-pointer hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Popular destinations</h3>
                <p className="text-gray-600">Quick access to frequently visited places</p>
              </CardContent>
            </Card>
            <Card className="skeuomorphic-card cursor-pointer hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Recent trips</h3>
                <p className="text-gray-600">Easily rebook your previous rides</p>
              </CardContent>
            </Card>
            <Card className="skeuomorphic-card cursor-pointer hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Saved places</h3>
                <p className="text-gray-600">Quick booking to your saved locations</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
