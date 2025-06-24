import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Car, User, LogOut, Phone, Mail, MapPin } from 'lucide-react';

const Navigation = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  console.log('Auth user:', user);


  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'CUSTOMER':
        return '/customer-dashboard';
      case 'DRIVER':
        return '/driver-dashboard';
      case 'ADMIN':
        return '/admin-dashboard';
      default:
        return '/';
    }
  };



  return (
    <>
      <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center space-x-2">
                <Car className="h-8 w-8 text-black" />
                <span className="text-2xl font-bold text-black">SkyRide</span>
              </Link>
              
              <div className="hidden md:flex space-x-6">
                {/* Only show Ride link to customers or non-authenticated users */}
                {(!isAuthenticated || user?.role === 'CUSTOMER') && (
                  <Link to="/" className="text-gray-700 hover:text-black transition-colors">
                    Ride
                  </Link>
                )}
                {/* Only show Drive link to drivers */}
                {(!isAuthenticated || user?.role === 'DRIVER') && (
                  <Link to="/driver-dashboard" className="text-gray-700 hover:text-black transition-colors">
                    Drive
                  </Link>
                )}
                <Link to="/business" className="text-gray-700 hover:text-black transition-colors">
                  Business
                </Link>
                <Link to="/about" className="text-gray-700 hover:text-black transition-colors">
                  About
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Link to={getDashboardLink()}>
                    <Button variant="outline" className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{user?.name}</span>
                    </Button>
                  </Link>
                  <Button onClick={handleLogout} variant="outline" size="sm">
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link to="/login">
                    <Button variant="outline">Log in</Button>
                  </Link>
                  <Link to="/register">
                    <Button className="btn-primary">Sign up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

// Footer Component
export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Car className="h-8 w-8 text-white" />
              <span className="text-2xl font-bold">SkyRide</span>
            </div>
            <p className="text-gray-300 mb-6">
              Your reliable partner for safe, comfortable, and affordable rides. 
              Available 24/7 across the city.
            </p>
            <div className="flex space-x-4">
              <div className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-colors cursor-pointer">
                <Phone className="h-5 w-5" />
              </div>
              <div className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-colors cursor-pointer">
                <Mail className="h-5 w-5" />
              </div>
              <div className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-colors cursor-pointer">
                <MapPin className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">support@skyride.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">Downtown, City Center</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-300 hover:text-white transition-colors">
                Book a Ride
              </Link>
              <Link to="/register" className="block text-gray-300 hover:text-white transition-colors">
                Become a Driver
              </Link>
              <Link to="#" className="block text-gray-300 hover:text-white transition-colors">
                Help & Support
              </Link>
              <Link to="#" className="block text-gray-300 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 SkyRide. All rights reserved. | Safe, Reliable, Always On Time
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Navigation;
