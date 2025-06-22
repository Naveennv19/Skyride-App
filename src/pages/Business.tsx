
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import { useToast } from '@/hooks/use-toast';
import { Building2, TrendingUp, Calculator, BarChart3, Mail, Phone, MapPin, CheckCircle } from 'lucide-react';

const Business = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Thank you for your interest!",
      description: "Our sales team will contact you within 24 hours.",
    });
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  const features = [
    {
      icon: <Building2 className="h-8 w-8 text-blue-600" />,
      title: "Corporate Discounts",
      description: "Volume-based pricing with up to 30% savings for your business rides"
    },
    {
      icon: <Calculator className="h-8 w-8 text-green-600" />,
      title: "Monthly Invoicing",
      description: "Simplified billing with detailed monthly reports for easy expense tracking"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-purple-600" />,
      title: "Ride Analytics",
      description: "Comprehensive dashboard with insights on usage patterns and cost optimization"
    }
  ];

  const benefits = [
    "24/7 priority support for business accounts",
    "Dedicated account manager for enterprise clients",
    "Custom approval workflows for ride requests",
    "Integration with expense management systems",
    "Real-time tracking and reporting",
    "Flexible payment terms and billing options"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Empower your team with reliable ride solutions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Streamline your company's transportation needs with SkyRide Business. 
            Get corporate rates, simplified billing, and powerful analytics.
          </p>
          <Button className="btn-primary text-lg px-8 py-3">
            Contact Sales
          </Button>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-black mb-12">
            Why Choose SkyRide for Business?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="skeuomorphic-card text-center">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-black mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-black mb-6">
                Complete Business Transportation Solution
              </h2>
              <p className="text-gray-600 mb-8">
                From small startups to large enterprises, SkyRide Business adapts to your needs 
                with scalable solutions and enterprise-grade features.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <Card className="skeuomorphic-card">
              <CardHeader>
                <CardTitle className="text-center">Contact Our Sales Team</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="h-12"
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="h-12"
                    required
                  />
                  <Input
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="h-12"
                    required
                  />
                  <Textarea
                    placeholder="Tell us about your transportation needs..."
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="min-h-[100px]"
                    required
                  />
                  <Button type="submit" className="w-full h-12 btn-primary">
                    Request Demo
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gray-50 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-black mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of companies already using SkyRide Business
          </p>
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-gray-600" />
              <span className="text-gray-700">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-gray-600" />
              <span className="text-gray-700">business@skyride.com</span>
            </div>
          </div>
          <Button className="btn-primary text-lg px-8 py-3">
            Schedule a Call
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Business;
