"use client";

import { loadStripe } from "@stripe/stripe-js";
import { CheckoutElementsProvider } from "@stripe/react-stripe-js/checkout";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { CartItemsType, ShippingFormInputs } from "@repo/types";
import CheckoutForm from "./CheckoutForm";
import useCartStore from "@/stores/CartStore";
const stripe = loadStripe(
  "pk_test_51U6cIzEMWnoccKKh2shls4SGcBeLxW4e2fVV0PclD2GfZ6Vutj7Fl8lgYLKRNXPTPFu44STOAANWxt54IJVk8GEp00Cp3NsfNM"
);
const fetchClientSecret = async (cart: CartItemsType, token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/session/create-checkout-session`,
    {
      method: "POST",
      body: JSON.stringify({
        cart,
      }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const json = (await response.json()) as {
    checkoutSessionClientSecret?: string | null;
    error?: string;
    message?: string;
  };

  if (!response.ok || !json.checkoutSessionClientSecret) {
    throw new Error(
      json.error || json.message || "Could not create a Stripe checkout session"
    );
  }

  return json.checkoutSessionClientSecret;
};

const StripePaymentForm = ({
  shippingForm,
}: {
  shippingForm: ShippingFormInputs;
}) => {
  const { cart } = useCartStore();
  const [token, setToken] = useState<string | null>(null);
  const { getToken, isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    getToken({ skipCache: true }).then(setToken).catch(() => setToken(null));
  }, [getToken, isLoaded, isSignedIn]);

  if (!isLoaded) return <p>Checking your sign-in...</p>;
  if (!isSignedIn) return <p>Please sign in before checkout.</p>;
  if (!token) return <p>Preparing secure checkout...</p>;

  return (
    <CheckoutElementsProvider
      stripe={stripe}
      options={{ clientSecret: fetchClientSecret(cart, token) }}
    >
      <CheckoutForm shippingForm={shippingForm} />
    </CheckoutElementsProvider>
  );
};

export default StripePaymentForm;