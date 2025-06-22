
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import { Car, Users, Clock, Star, CheckCircle, Quote } from 'lucide-react';

const About = () => {
  const steps = [
    {
      number: "01",
      title: "Book",
      description: "Choose your destination and select from our range of vehicles"
    },
    {
      number: "02", 
      title: "Assign",
      description: "Get matched with a verified driver in your area instantly"
    },
    {
      number: "03",
      title: "Ride",
      description: "Enjoy a safe, comfortable journey to your destination"
    }
  ];

  const stats = [
    {
      icon: <Car className="h-8 w-8 text-blue-600" />,
      number: "2M+",
      label: "Rides Completed"
    },
    {
      icon: <Star className="h-8 w-8 text-yellow-600" />,
      number: "4.9",
      label: "Customer Rating"
    },
    {
      icon: <Clock className="h-8 w-8 text-green-600" />,
      number: "24/7",
      label: "Support Hours"
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      number: "50K+",
      label: "Active Users"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Business Executive",
      text: "SkyRide has completely transformed how I commute. The reliability and professionalism of drivers is outstanding.",
      rating: 5
    },
    {
      name: "Michael Chen", 
      role: "Frequent Traveler",
      text: "I use SkyRide for all my airport transfers. Always on time, clean vehicles, and fair pricing.",
      rating: 5
    },
    {
      name: "Emma Davis",
      role: "Marketing Manager", 
      text: "The business account features are fantastic. Monthly invoicing and ride analytics help manage our company expenses perfectly.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            About SkyRide
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're revolutionizing urban mobility with safe, reliable, and affordable 
            ride-sharing solutions that connect communities and empower drivers.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-16 text-center">
          <Card className="skeuomorphic-card max-w-4xl mx-auto">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold text-black mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                To provide accessible, reliable transportation that connects people to opportunities 
                while creating economic empowerment for drivers and contributing to sustainable urban mobility. 
                We believe everyone deserves safe, affordable rides at the tap of a button.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-black mb-12">
            How SkyRide Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-black text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                  {step.number}
                </div>
                <h3 className="text-2xl font-semibold text-black mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Founder Quote */}
        <div className="mb-16">
          <Card className="skeuomorphic-card bg-gray-50">
            <CardContent className="p-12 text-center">
              <Quote className="h-12 w-12 text-gray-400 mx-auto mb-6" />
              <blockquote className="text-2xl text-gray-800 mb-6 italic">
                "Our vision is simple: make transportation accessible, reliable, and safe for everyone. 
                We're not just building a ride-sharing platform; we're creating connections that 
                strengthen communities."
              </blockquote>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-gray-600" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-black">Alex Rivera</p>
                  <p className="text-gray-600">Founder & CEO, SkyRide</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistics */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-black mb-12">
            SkyRide by the Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="skeuomorphic-card text-center">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-black mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-black mb-12">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="skeuomorphic-card">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-black">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-gray-50 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-center text-black mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-black mb-3">Safety First</h3>
              <p className="text-gray-600">Rigorous driver screening and real-time safety monitoring</p>
            </div>
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-black mb-3">Reliability</h3>
              <p className="text-gray-600">Consistent service quality and on-time performance</p>
            </div>
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-black mb-3">Community</h3>
              <p className="text-gray-600">Supporting local drivers and strengthening neighborhoods</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
