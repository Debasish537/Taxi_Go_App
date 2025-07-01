// import { Currency } from "lucide-react";
// import { NextResponse } from "next/server";
// // import { Stripe } from "@stripe/stripe-js";
// import Stripe from "stripe";
// const stripe= new Stripe(process.env.STRIPE_SECRETE_KEY!,{
//     typescript:true,
//     apiVersion: "2025-05-28.basil"
// })
// export async function POST(request:any) {
//     const data:any=await request.json();
//     const amount=data.amount;
//     try{
//         const paymentIntent = await stripe.paymentIntents.create({
//             amount: Number(amount)*100,
//             currency: 'inr'
//         })
//         return NextResponse.json(paymentIntent.client_secret,{status:200})
//     }
//     catch(error:any){

//     }
// }




import { Currency } from "lucide-react";
import { NextResponse } from "next/server";
// import { Stripe } from "@stripe/stripe-js";
import Stripe from "stripe";
// ✅ Correct environment variable key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    typescript: true,
    apiVersion: "2025-05-28.basil"  // ✅ Use valid API version as required by Stripe type
});

export async function POST(request: Request) {
    const data = await request.json();
    const amount = data.amount;

    if (!amount) {
        return NextResponse.json({ error: "Amount is required" }, { status: 400 });
    }

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Number(amount) * 100, // in paise
            currency: 'inr' // ✅ Only if your account supports INR
        });

        return NextResponse.json(paymentIntent.client_secret, { status: 200 });
    } catch (error: any) {
        console.error("Stripe error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
