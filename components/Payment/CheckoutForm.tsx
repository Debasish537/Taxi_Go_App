// import React, { useContext } from 'react'
// import { Elements, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
// import { SelectedCarAmountContext } from '@/context/SelectedCarAmountContext';
// function CheckoutForm() {
//   const stripe:any = useStripe();
//   const elements = useElements();
// const { carAmount } = useContext(SelectedCarAmountContext);
//   const handleSubmit =async (event:any) =>{
//     event.preventDefault();
//     if(elements == null){
//       return ;
//     }
//     const {error:submitError} = await elements.submit();

//     if(submitError){
//       return;
//     }
//       const res= await fetch("/api/create-intent",{
//     method:"POST",
//     body:JSON.stringify({
//       amount:carAmount,
//     }),
//   });

//   const secretKey=await res.json();

//   console.log(secretKey);
//   const {error} = await stripe.confirmPayment({
//     clientSecret: secretKey,
//     elements,
//     confirmParams:{
//       return_url:"http://localhost:3000",
//     },
//   });
//   }




//   return (
//     <div className='flex flex-col justify-center items-center
//     w-full mt-6'>
//       <form onSubmit={handleSubmit}
//         className='max-w-md '>
//         <PaymentElement />
//         <button className='font-semibold w-full bg-yellow-500 p-1 rounded-lg mt-2' type='submit'  disabled={!stripe || !elements}>
//           Pay
//         </button>
//       </form>
//     </div>

//   )
// }

// export default CheckoutForm




'use client';

import React from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

type Props = {
  amount: number;
};

function CheckoutForm({ amount }: Props) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const { error: submitError } = await elements.submit();
    if (submitError) return;

    const res = await fetch('/api/create-intent', {
      method: 'POST',
      body: JSON.stringify({ amount }),
    });

    const clientSecret = await res.json();

    const { error } = await stripe.confirmPayment({
      clientSecret,
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000',
      },
    });

    if (error) console.error('Payment error:', error.message);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full mt-6">
      <form onSubmit={handleSubmit} className="max-w-md">
        <PaymentElement />
        <button
          className="font-semibold w-full bg-yellow-500 p-1 rounded-lg mt-2"
          type="submit"
          disabled={!stripe || !elements}
        >
          Pay
        </button>
      </form>
    </div>
  );
}

export default CheckoutForm;




// 'use client';

// import React from 'react';
// import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

// type Props = {
//   amount: number;
// };

// function CheckoutForm({ amount }: Props) {
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     if (!stripe || !elements) return;

//     const { error: submitError } = await elements.submit();
//     if (submitError) return;

//     const res = await fetch('/api/create-intent', {
//       method: 'POST',
//       body: JSON.stringify({ amount }),
//     });

//     const secretKey = await res.json();

//     const { error } = await stripe.confirmPayment({
//       clientSecret: secretKey,
//       elements,
//       confirmParams: {
//         return_url: 'http://localhost:3000', // or your deployed site
//       },
//     });

//     if (error) {
//       console.error('Payment error:', error.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col items-center w-full mt-6">
//       <PaymentElement />
//       <button
//         type="submit"
//         disabled={!stripe || !elements}
//         className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
//       >
//         Pay
//       </button>
//     </form>
//   );
// }

// export default CheckoutForm
