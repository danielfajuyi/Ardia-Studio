import React from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$999",
    features: [
      "5 AI Shorts/mo",
      "Basic Avatar usage",
      "720p Render",
      "Email Support",
    ],
    variant: "secondary",
  },
  {
    name: "Pro",
    price: "$2,499",
    features: [
      "15 AI Shorts/mo",
      "Custom Avatar Training",
      "4K Render",
      "Priority Support",
      "Source Files",
    ],
    variant: "glow",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "Unlimited Content",
      "Full Studio Access",
      "API Integration",
      "Dedicated Manager",
      "White Label",
    ],
    variant: "secondary",
  },
];

const PricingCard = ({ plan, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className={`relative p-8 rounded-3xl border ${plan.popular ? "border-primary bg-white/5" : "border-white/10 bg-black/40"} flex flex-col`}
    >
      {plan.popular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest z-10">
          Most Popular
        </div>
      )}

      <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
      <div className="text-4xl font-bold mb-6">
        {plan.price}
        <span className="text-lg font-normal text-gray-500">
          {plan.price !== "Custom" && "/mo"}
        </span>
      </div>

      <ul className="mb-8 space-y-4 flex-1">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-center text-sm text-gray-300">
            <Check className="w-4 h-4 text-primary mr-2" />
            {feature}
          </li>
        ))}
      </ul>

      <Button
        variant={plan.variant === "glow" ? "primary" : "secondary"}
        className="w-full text-center justify-center"
      >
        Choose {plan.name}
      </Button>
    </motion.div>
  );
};

const Pricing = () => {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-400">
            Choose the plan that fits your production needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
