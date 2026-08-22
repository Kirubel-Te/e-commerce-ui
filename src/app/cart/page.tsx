"use client"
import ShippingForm from "@/components/ShippingForm";
import PaymentForm from "@/components/PaymentForm";
import { CartItemsType, ShippingFormInputs } from "@repo/types"
import { ArrowRight , Trash2} from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useState } from "react";
import Image from "next/image";
import useCartStore from "@/stores/CartStore";
import StripePaymentForm from "@/components/StripePaymentForm";

const steps = [
  {
    id: 1,
    title: "Shopping Cart",
  },
  {
    id: 2,
    title: "Shipping Address",
  },
  {
    id: 3,
    title: "Payment Method",
  },
];




const CartPage = () => {

    const [shippingForm, setShippingForm] = useState<ShippingFormInputs | null>(null);

    const router = useRouter()
    const SearchParams = useSearchParams()

    const activeStep = parseInt(SearchParams.get("step") || "1")
    const {cart,removeFromCart} = useCartStore()
    return(
        <div className = "flex flex-col gap-8 items-center justify-center mt-12">
            <h1 className = "text-2xl font-medium">Your Shopping Cart</h1>
            <div className = "flex flex-col lg:flex-row gap-8 items-center lg:gap-16">
                {steps.map((step) => (
                    <div key = {step.id} className = {`flex items-center border-b-2 pb-4 gap-2 ${activeStep === step.id ? "border-gray-800": "border-gray-400"}`}>
                        <div className = {`w-6 h-6 text-white rounded-full flex items-center justify-center p-4 ${activeStep === step.id ? "bg-gray-800" : "bg-gray-400"}`}>
                            {step.id}
                        </div>
                        <p className = {`font-medium text-sm ${activeStep === step.id ? "text-gray-800" : "text-gray-400"}`}>
                            {step.title}
                        </p>
                    </div>
                ))}
            </div>
            {/*steps and details*/}
            <div className = "flex flex-col lg:flex-row gap-16 w-full">
                {/*steps*/}
                <div className = "w-full lg:w-7/12 shadow-lg border-1 border-gray-200 flex flex-col gap-8 rounded-lg p-8">
                    {activeStep === 1 ? (
                        cart.map((item) => {
                            const selectedColor = item.selectedColor || item.colors[0] || "";
                            const images = item.images as Record<string, string>;
                            const imageSrc = images[selectedColor] ?? images[item.colors[0] ?? ""] ?? "/placeholder.png";

                            return (
                                <div
                                    className="flex items-center justify-between"
                                    key={item.id + item.selectedSize + item.selectedColor}
                                >
                                    <div className="flex gap-8">
                                        <div className="relative w-32 h-32 bg-gray-50 rounded-lg overflow-hidden">
                                            <Image
                                                src={imageSrc}
                                                alt={item.name}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                        <div className="flex flex-col justify-between">
                                            <div className="flex flex-col gap-1">
                                                <p className="text-sm font-medium">{item.name}</p>
                                                <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
                                                <p className="text-xs text-gray-500">Size: {item.selectedSize}</p>
                                                <p className="text-xs text-gray-500">Color: {item.selectedColor}</p>
                                            </div>
                                            <p className="font-medium">${item.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item)}
                                        className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 transition-all duration-300 text-red-400 flex items-center justify-center cursor-pointer"
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                </div>
                            );
                        })
                    ) : activeStep === 2 ? (
                        <ShippingForm setShippingForm={setShippingForm}  />
                    ) : activeStep === 3 && shippingForm ? (
                        <StripePaymentForm shippingForm={shippingForm}/>
                    ) : (
                        <p className = "text-sm text-gray-300">Please fill the shipment form first</p>
                    )}
                </div>
                <div className = "w-full lg:w-5/12 shadow-lg border-1 border-gray-200 flex flex-col gap-8 rounded-lg p-8 h-max">
                    <h2 className = "font-semibold">Cart Details</h2>
                    <div className = "flex flex-col gap-4">
                        <div className = "flex justify-between text-sm">
                            <p className = "text-gray-500">Subtotal</p>
                            <p className = "font-medium">${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
                        </div>
                        <div className = "flex justify-between text-sm">
                            <p className = "text-gray-500">Discount(10%)</p>
                            <p className = "font-medium">${(cart.reduce((total, item) => total + item.price * item.quantity, 0) * 0.1).toFixed(2)}</p>
                        </div>
                        <div className = "flex justify-between text-sm">
                            <p className = "text-gray-500">Shipping Fee</p>
                            <p className = "font-medium">$10.00</p>
                        </div>
                        <hr className = "border-gray-200 border-1"/>
                        <div className = "flex justify-between text-sm  ">
                            <p className = "text-gray-800 font-semibold">Total</p>
                            <p className = "font-medium">${(cart.reduce((total, item) => total + item.price * item.quantity, 0) - (cart.reduce((total, item) => total + item.price * item.quantity, 0) * 0.1) + 10).toFixed(2)}</p>
                        </div>
                    </div>
                    {activeStep === 1 && (
                        <button onClick={() => router.push("/cart?step=2", { scroll: false })} className = "flex items-center justify-center gap-2 text-sm text-white bg-gray-800 rounded-lg hover:bg-gray-900 transition-all duration-300 py-2 px-4">
                            Continue
                            <ArrowRight className = "w-3 h-3"/>
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
} 

export default CartPage