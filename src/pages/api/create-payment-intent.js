import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  if (req.method === "POST") {
    const { amount } = req.body;

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd", // or 'cad' for Canadian dollars
        payment_method_types: ["card"],
      });

      res.status(200).send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
