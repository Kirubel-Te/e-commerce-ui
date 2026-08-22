"use client";

import { ShippingFormInputs } from "@repo/types";
import {
  PaymentElement,
  useCheckoutElements,
} from "@stripe/react-stripe-js/checkout";
import { useState } from "react";

const CheckoutForm = ({
  shippingForm,
}: {
  shippingForm: ShippingFormInputs;
}) => {
  const checkout = useCheckoutElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (checkout.type !== "success") return;

    setLoading(true);
    setError(null);

    try {
      await checkout.checkout.updateEmail(shippingForm.email);
      await checkout.checkout.updateShippingAddress({
        name: shippingForm.name,
        address: {
          line1: shippingForm.address,
          city: shippingForm.city,
          country: "US",
        },
      });

      const result = await checkout.checkout.confirm();
      if (result.type === "error") {
        setError(result.error.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment could not be completed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement options={{ layout: "accordion" }} />
      {checkout.type === "error" && (
        <p className="mt-3 text-sm text-red-500">{checkout.error.message}</p>
      )}
      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={loading || checkout.type !== "success"}
        className="mt-4 w-full rounded-lg bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Processing..." : "Pay now"}
      </button>
    </form>
  );
};

export default CheckoutForm;