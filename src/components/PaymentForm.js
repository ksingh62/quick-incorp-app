import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function PaymentForm({ amount, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const { error: backendError, clientSecret } = await fetch(
      "/api/create-payment-intent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      }
    ).then((r) => r.json());

    if (backendError) {
      setError(backendError.message);
      setProcessing(false);
      return;
    }

    const { error: stripeError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

    if (stripeError) {
      setError(stripeError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      setError(null);
      setProcessing(false);
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      {error && <div className="text-red-500 mt-2">{error}</div>}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="mt-4 w-full bg-sky-600 text-white py-2 rounded-lg"
      >
        {processing ? "Processing…" : "Pay"}
      </button>
    </form>
  );
}
