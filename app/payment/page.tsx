"use client"
import React, { useContext } from 'react'
import { SelectedCarAmountContext } from '@/context/SelectedCarAmountContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '@/components/Payment/CheckoutForm'; // Adjust the path if needed
function Payment() {
        // const {carAmount,setCarAmount}=
        // useContext(SelectedCarAmountContext);
        const stripePromise=loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as any)
        const options:any={
          mode:'payment',
          amount:5800, //in paisa (₹58.00)
          currency:'inr'

        };
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm amount={0} />
    </Elements>
  )
}

export default Payment





// 'use client';

// import React, { useContext } from 'react';
// import { SelectedCarAmountContext } from '@/context/SelectedCarAmountContext';
// import CheckoutForm from '@/components/Payment/CheckoutForm';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
// function PaymentPage() {
//   const context = useContext(SelectedCarAmountContext);

//   // Prevent rendering on server or null context
//   if (!context) return null;

//   const { carAmount } = context;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold mb-4">💳 Payment</h1>
//       <p className="text-lg mb-4">Selected Car Fare: ₹{carAmount ?? 'Not selected'}</p>
//       <Elements stripe={stripePromise}>
//         <CheckoutForm amount={carAmount} />
//       </Elements>
//     </div>
//   );
// }


