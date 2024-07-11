// pages/prototype/success.js
import { useRouter } from "next/router";
import { useEffect } from "react";

const Success = () => {
  const router = useRouter();
  const { session_id } = router.query;

  useEffect(() => {
    if (session_id) {
      const checkPaymentStatus = async () => {
        try {
          const response = await fetch(`/api/payment-status/${session_id}`);
          const data = await response.json();
          if (data.status === "paid") {
            // Redirect to the form with step 6
            router.push(`/prototype/form?step=6&session_id=${session_id}`);
          }
        } catch (error) {
          console.error("Error checking payment status:", error);
        }
      };

      checkPaymentStatus();
    }
  }, [session_id, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-semibold mb-4">Payment Successful!</h1>
      <p className="text-lg">Thank you for your payment. Redirecting...</p>
    </div>
  );
};

export default Success;
