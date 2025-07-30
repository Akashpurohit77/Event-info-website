// components/Checkout.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { checkoutOrder } from "@/lib/actions/order.actions";
import type { IEvent } from "@/lib/database/models/event.model";

interface CheckoutProps {
  event: IEvent;
  userId: string;
}

const Checkout = ({ event, userId }: CheckoutProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onCheckout = async () => {
    setIsLoading(true);

    const order = {
      eventTitle: event.title,
      eventId: event._id,
      price: event.price || "",
      isFree: event.isFree,
      buyerId: userId,
    };

    try {
      const response = await checkoutOrder(order);
      console.log("Response from checkoutOrder:", response);
    } catch (error) {
      console.error("Checkout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      type="button"
      role="link"
      size="lg"
      className="button sm:w-fit"
      disabled={isLoading}
      onClick={onCheckout}
    >
      {isLoading
        ? "Checking..."
        : event.isFree
        ? "Get Ticket"
        : "Buy Ticket"}
    </Button>
  );
};

export default Checkout;
