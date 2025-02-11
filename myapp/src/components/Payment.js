import React, { useState } from 'react';
import { default as image } from '../asserts/images/quick_solutions.613f7f3d78aff16e341a28cdce7d6b15.svg';

const Payment = ({ plan, onPaymentSuccess }) => {
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false); // To track if OTP is sent
  const [otp, setOtp] = useState('');
  const [verified, setVerified] = useState(false); // To track if OTP is verified

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Function to send OTP (Assuming backend integration here)
  const sendOtp = async () => {
    console.log('Sending OTP...'); // Log for debugging
  
    try {
      // Log the phone number being sent
      console.log('Phone number being sent:', phone);
  
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone }), // Send phone number to backend
      });
  
      console.log('Raw response:', response); // Log the raw response
  
      const result = await response.json();
      console.log('Parsed response:', result); // Log the parsed JSON response
  
      if (result.success) { // Check if the OTP was successfully sent
        setOtpSent(true); // Update state to show OTP input
        alert('OTP sent to your phone.');
      } else {
        alert('Failed to send OTP. Try again.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error); // Log any errors that occur
      alert('Error occurred while sending OTP. Check console for details.');
    }
  };
  
  // Function to verify OTP
  const verifyOtp = async () => {
    console.log('Verifying OTP...'); // Log for debugging
    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, otp }), // Send phone and OTP to backend
      });
      const result = await response.json();
      console.log('OTP Verification response:', result); // Log the response for debugging

      if (result.success) {
        setVerified(true); // Update state to allow payment
        alert('Phone number verified.');
      } else {
        alert('Incorrect OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  const handlePayment = async () => {
    if (!verified) {
      alert('Please verify your phone number first.');
      return;
    }

    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const amount = plan === 'essential' ? 29900 : plan === 'extra' ? 49900 : 79900;
    const options = {
      key: 'rzp_test_GcZZFDPP0jHtC4', 
      amount: amount,
      currency: 'INR',
      name: 'Play+',
      description: `${plan} Plan Payment`,
      image: image,
      handler: async function (response) {
        alert(`Payment ID: ${response.razorpay_payment_id}`);
        alert(`Order ID: ${response.razorpay_order_id}`);
        alert(`Signature: ${response.razorpay_signature}`);

        // Send payment details to backend
        try {
          const paymentData = {
            cardholderName: 'Tony Stark',
            cardNumber: 'XXXX-XXXX-XXXX-XXXX',
            expiryDate: 'MM/YY',
            cvv: 'XXX',
            amount: amount / 100,
          };
          const paymentResponse = await fetch('/api/payment/submit1', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
          });
          const result = await paymentResponse.json();
          console.log('Payment saved successfully:', result);
          onPaymentSuccess && onPaymentSuccess();
        } catch (error) {
          console.error('Error saving payment:', error);
        }
      },
      prefill: {
        name: 'Tony Stark',
        email: 'tonystark@example.com',
        contact: phone,
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#F37254',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div>
      {!otpSent ? (
        <>
          <label>Enter Phone Number:</label>
          <input 
            type="text" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            placeholder="Enter your phone number"
          />
          <button onClick={sendOtp}>Send OTP</button>
        </>
      ) : !verified ? (
        <>
          <label>Enter OTP:</label>
          <input 
            type="text" 
            value={otp} 
            onChange={(e) => setOtp(e.target.value)} 
            placeholder="Enter the OTP"
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      ) : (
        <>
          <label>Make a Payment for {plan} Plan</label>
          <button onClick={handlePayment}>Pay Now</button>
        </>
      )}
    </div>
  );
};

export default Payment;
