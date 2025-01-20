'use server'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const getStripePaymentintent = async (amount: number) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: 'usd',
            automatic_payment_methods: {
              enabled: true,
            },
          });

        return {
            success: true,
            data: JSON.parse(JSON.stringify(paymentIntent))
        }
    } catch (error: any) {
        console.log(error)
        return {
            success: false,
            message: error.message
        }
    }
}