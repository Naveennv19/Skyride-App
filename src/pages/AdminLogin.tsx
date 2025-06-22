
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Car, Mail, Lock, Shield } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Only allow admin login - check for admin credentials specifically
      if (email === 'admin_1@gmail.com' && password === 'admin_1') {
        const success = await login(email, password);
        if (success) {
          toast({
            title: "Admin login successful",
            description: "Welcome to the Admin Portal!",
          });
          navigate('/admin-dashboard');
        } else {
          toast({
            title: "Access denied",
            description: "Invalid admin credentials.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Access denied",
          description: "Invalid admin credentials.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <Car className="h-10 w-10 text-white" />
            <span className="text-3xl font-bold text-white">SkyRide</span>
          </Link>
        </div>

        {/* Admin Access Badge */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center space-x-2 bg-red-600/20 backdrop-blur-sm border border-red-500/30 rounded-full px-4 py-2">
            <Shield className="h-5 w-5 text-red-400" />
            <span className="text-red-300 font-semibold">🔒 Admin Access Only</span>
          </div>
        </div>

        <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white">Admin Portal</CardTitle>
            <p className="text-gray-300">Sign in to access the admin dashboard</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Admin email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40"
                  required
                />
              </div>
              
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="password"
                  placeholder="Admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-semibold transition-all duration-300 hover:shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign in as Admin'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link to="/login" className="text-gray-400 hover:text-white transition-colors">
                ← Back to regular login
              </Link>
            </div>

            <div className="mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
              <p className="text-sm text-gray-400 mb-2">Demo admin credentials:</p>
              <p className="text-xs text-gray-500">admin_1@gmail.com / admin_1</p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            Admins are created manually. Contact system administrator for access.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
