import { Car } from "lucide-react";
import BookingCard from "@/components/ui/BookingCard";

interface Booking {
  id: string;
  rideType: string;
  pickupLocation: string;
  dropLocation: string;
  date: string;
  time: string;
  status: string;
  createdAt: string;
}

interface BookingSectionProps {
  title: string;
  bookings: Booking[];
  getStatusColor: (status: string) => string;
  onCancel: (bookingId: string) => void;
}

const BookingSection = ({ title, bookings, getStatusColor, onCancel }: BookingSectionProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              getStatusColor={getStatusColor}
              onCancel={onCancel}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No bookings available</p>
        </div>
      )}
    </div>
  );
};

export default BookingSection;
