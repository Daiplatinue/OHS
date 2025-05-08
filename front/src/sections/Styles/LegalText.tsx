import type React from "react";

const LegalText: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-sm text-gray-600">
      <p className="mb-4">
        Prices displayed are inclusive of all taxes and service fees. Free booking management for all orders.
        Our platform is designed to ensure transparency and reliability, giving you peace of mind with every booking.
      </p>

      <p className="mb-4">
        Handy Go's booking and service platform connects you to trusted professionals across various categories,
        including plumbing, electrical, home cleaning, appliance repair, and more. Services are available in multiple
        locations, with real-time updates and flexible scheduling to fit your convenience. Availability may vary
        by region.
      </p>

      <p className="mb-4">
        <strong>Handy Go+ Membership:</strong> Enjoy priority booking, exclusive discounts, and faster service responses 
        with Handy Go+ for just $9.99/month after a free trial. Members also benefit from extended customer support, 
        no cancellation fees, and premium service options. Only one offer per Handy Go Account and one per family 
        if you're part of a Family Sharing group. Offer valid for 3 months after activation. Plan automatically renews
        until cancelled. Restrictions and other terms apply.
      </p>

      <p className="mb-4">
        <strong>Special Pricing:</strong> We offer exclusive discounts for first-time users, senior citizens, and
        community programs. To learn more about how to qualify, talk to a Handy Go specialist or contact our support team.
      </p>

      <p className="mb-4">
        <strong>Booking Management:</strong> With Handy Go, you can easily schedule, reschedule, or cancel bookings
        directly through our platform. Real-time notifications keep you informed every step of the way, ensuring
        seamless communication with service providers.
      </p>

      <p className="mb-4">
        New subscribers only. $9.99/month after the trial period. Offer is available for new Handy Go+ subscribers
        with a new eligible activation for a limited time only. Only one offer per Handy Go Account, regardless of the
        number of bookings made. Plan automatically renews until cancelled. Restrictions and other{" "}
        <a href="#" className="text-blue-600 hover:underline">
          terms
        </a>{" "}
        apply.
      </p>

      <p className="mb-4">
        For assistance, call our customer service hotline at 1800-123-4567 or reach out through our live chat support 
        available 24/7. Your satisfaction is our priority, and we are committed to delivering quality service with every booking.
      </p>
    </div>
  );
};

export default LegalText;