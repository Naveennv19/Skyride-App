import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface BookingCardProps {
  booking: {
    id: string;
    rideType: string;
    pickupLocation: string;
    dropLocation: string;
    date: string;
    time: string;
    status: string;
    createdAt: string;
  };
  getStatusColor: (status: string) => string;
  onCancel: (bookingId: string) => void;
}

const BookingCard = ({ booking, getStatusColor, onCancel }: BookingCardProps) => {
  return (
    <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
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
            <p className="text-sm text-gray-600">Scheduled: {booking.date} at {booking.time}</p>
            <p className="text-xs text-gray-500">Booked: {new Date(booking.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        {booking.status === 'pending' && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onCancel(booking.id)}
            className="text-red-600 hover:text-red-700"
          >
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
};

export default BookingCard;
