
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { Footer } from "./components/Navigation";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import CustomerDashboard from "./pages/CustomerDashboard";
import DriverDashboard from "./pages/DriverDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import BookRide from "./pages/BookRide";
import Business from "./pages/Business";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/business" element={<Business />} />
                <Route path="/about" element={<About />} />
                <Route 
                  path="/customer-dashboard" 
                  element={
                    <ProtectedRoute requiredRole="customer">
                      <CustomerDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/driver-dashboard" 
                  element={
                    <ProtectedRoute requiredRole="driver">
                      <DriverDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin-dashboard" 
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/book-ride" element={<BookRide />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
