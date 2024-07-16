// pages/api/payment-status/[session_id].js
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

export default async function handler(req, res) {
  const { session_id } = req.query;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    res.status(200).json({ status: session.payment_status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
