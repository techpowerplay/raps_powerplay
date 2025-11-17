import React from 'react';
import { motion } from "framer-motion";
import { SlideLeft } from "../utility/animation";

const Terms = () => {
  return (
    <div>
      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }} // Start with low opacity and slightly higher position
        whileInView={{ opacity: 1, y: 0 }} // Fade in and move to normal position (down to up)
        transition={{ duration: 1, delay: 0.2 }} // Smooth transition
        viewport={{ once: true }} // Animate only the first time the element comes into view
        className="text-2xl text-center mb-12"
      >
        <h2 className="text-[#e87d0e] text-3xl md:text-5xl font-bold mb-6">
          TERMS & CONDITIONS
        </h2>
      </motion.div>

      {/* Terms Content Section */}
      <div className="my-16 px-4 md:px-8">
      <motion.div
          initial={{ opacity: 0 }} // Start with low opacity
          whileInView={{ opacity: 1 }} // Fade in
          transition={{ duration: 1, delay: 0.4 }} // Smooth transition
          viewport={{ once: true }} // Animate only the first time the element comes into view
          style={{ lineHeight: "1.8" }}
          className="flex flex-col justify-center gap-10 md:w-3/4 text-white mx-auto"
        >
          <div className="space-y-8">
            <p className="my-6 text-lg">
              <b>Please read these Terms and Conditions carefully</b> before accessing, using, or obtaining any materials, information, products, or services. By accessing any RAPS Powerplay platform (including our website, mobile interface, or direct communication services), you agree to be bound by these Terms and our Privacy Policy. If you do not accept all of these Terms, then you may not use our platform. In these Terms, "we", "us", "our", and "RAPS Powerplay" refer to RAPS Powerplay, and "you" and "your" refer to you, the user of our services.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">1. Overview</h3>
            <p className="text-lg mb-6">
              RAPS Powerplay provides PlayStation 5 rentals for home-based gaming experiences. We offer flexible rental options for hourly, daily, and weekly periods. Whether you prefer a short gaming session or a longer gaming experience, we ensure that our services cater to your needs. Use of our services is subject to the following conditions.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">2. Booking & Payment</h3>
            <p className="text-lg mb-6">
              All bookings are subject to availability and are confirmed only upon full payment. The pricing for rentals is as follows:
            </p>

            <h4 className="text-xl font-semibold mt-6 mb-4">Member Pricing</h4>
            <ul className="list-disc ml-6 text-lg mb-6">
              <li><b>Hourly Offer:</b> ₹90/hour for 1 hour, ₹150 for 2 hours, ₹210 for 3 hours, ₹240 for 4 hours.</li>
              <li><b>Daily Offer:</b> ₹750/day for 1 day, ₹1000 for 2 days, ₹1250 for 3 days, ₹1500 for 4 days.</li>
              <li><b>Weekly Offer:</b> ₹3000/week for 1 week, ₹3700 for 2 weeks, ₹4000 for 3 weeks, ₹4200 for 4 weeks.</li>
            </ul>

            <h4 className="text-xl font-semibold mt-6 mb-4">Non-Member Pricing</h4>
            <ul className="list-disc ml-6 text-lg mb-6">
              <li><b>Hourly Offer:</b> ₹110/hour for 1 hour, ₹180 for 2 hours, ₹240 for 3 hours, ₹280 for 4 hours.</li>
              <li><b>Daily Offer:</b> ₹950/day for 1 day, ₹1200 for 2 days, ₹1450 for 3 days, ₹1700 for 4 days.</li>
              <li><b>Weekly Offer:</b> ₹3200/week for 1 week, ₹3900 for 2 weeks, ₹4200 for 3 weeks, ₹4500 for 4 weeks.</li>
            </ul>

            <p className="text-lg mb-8">
              Payments can be made via UPI, wallets, or direct cash (where applicable). A refundable security deposit may be required, depending on the rental duration and terms.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">3. Usage & Conduct</h3>
            <ul className="list-disc ml-6 text-lg mb-6">
              <li>RAPS Powerplay consoles are to be used <b>strictly at home for personal entertainment</b>.</li>
              <li>Any misuse, resale, or public sharing of the console will lead to cancellation of future access.</li>
              <li>Users must ensure a stable power supply and safe storage of the equipment during the rental period.</li>
              <li>Any damages caused by negligence will be chargeable. If there is damage to the equipment, RAPS Powerplay will assess the damage and bill the user accordingly.</li>
              <li><b>In case of physical damage, loss, or theft</b> of any RAPS Powerplay property (console, controllers, cables, packaging, etc.), the user will be liable to pay repair or replacement costs as determined by RAPS Powerplay.</li>
            </ul>

            <h3 className="text-2xl font-semibold mt-8 mb-4">4. Cancellation & Rescheduling</h3>
            <ul className="list-disc ml-6 text-lg mb-6">
              <li>Cancellations must be made at least <b>2 hours prior</b> to the booking time for hourly rentals, and <b>24 hours prior</b> for daily or weekly rentals to be eligible for a refund.</li>
              <li>One rescheduling is permitted per booking, with at least <b>2 hours' notice</b> for hourly rentals and <b>24 hours' notice</b> for daily/weekly rentals.</li>
              <li>Failure to adhere to these conditions may result in full or partial forfeiture of fees.</li>
            </ul>

            <h3 className="text-2xl font-semibold mt-8 mb-4">5. Delivery & Pickup</h3>
            <ul className="list-disc ml-6 text-lg mb-6">
              <li>Delivery is available in selected areas with prior notice.</li>
              <li>Late pickups/deliveries (beyond 15 minutes) may incur additional charges, and such delays may affect the availability of your booked time slot.</li>
              <li>Time slots are considered active from the moment of console handover. Any time used beyond the reserved period will be charged at the applicable rate.</li>
            </ul>

            <h3 className="text-2xl font-semibold mt-8 mb-4">6. Limited Access & Availability</h3>
            <ul className="list-disc ml-6 text-lg mb-6">
              <li><b>Slots are limited and prioritized on a first-booked basis</b>.</li>
              <li>Weekends and holidays are high-demand periods. Early bookings are advised.</li>
              <li>RAPS Powerplay reserves the right to modify or cancel bookings due to availability, technical issues, or safety concerns.</li>
            </ul>

            <h3 className="text-2xl font-semibold mt-8 mb-4">7. User Verification</h3>
            <ul className="list-disc ml-6 text-lg mb-6">
              <li>For security and safety, all users must provide <b>valid identification</b> (such as Aadhar card, driving license, or other government-issued ID) prior to or during the first booking.</li>
              <li>RAPS Powerplay reserves the right to decline bookings if identity verification is not completed or deemed invalid.</li>
              <li>Verified users may receive priority access or faster approval for future bookings.</li>
            </ul>

            <h3 className="text-2xl font-semibold mt-8 mb-4">8. Intellectual Property</h3>
            <p className="text-lg mb-6">
              All RAPS Powerplay branding, logos, and media content are owned and protected under IP law. Unauthorized use or reproduction is prohibited.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">9. Arbitration & Disputes</h3>
            <p className="text-lg mb-6">
              Any dispute shall be resolved through <b>individual confidential arbitration</b>. Users waive the right to participate in any class action or legal collective.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">10. Modifications</h3>
            <p className="text-lg mb-6">
              RAPS Powerplay may update or modify these Terms at any time. Continued use after such updates will be deemed as acceptance of the new terms.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">11. Contact</h3>
            <p className="text-lg mb-6">
              For inquiries, disputes, or concerns, please reach out via:
            </p>
            <ul className="list-disc ml-6 text-lg mb-6">
              <li>Email: support@rapspowerplay.com</li>
              <li>Phone: +91 93217 32794</li>
              <li>Location: Mumbai, India</li>
            </ul>
            <p className="text-lg mt-4">Last updated: 24/03/2025</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;
