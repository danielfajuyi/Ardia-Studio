import React, { useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Button from "../../components/ui/Button";
import Footer from "../../components/ui/Footer";
import {
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
  Send,
  CheckCircle2,
} from "lucide-react";
import ArdiaAcademy from "../../components/sections/ArdiaAcademy";

/**
 * Animated "Connect" 3D Card
 */
const ConnectCard = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set(clientX - left - width / 2);
    y.set(clientY - top - height / 2);
  }

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      className="w-full aspect-square bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-3xl p-8 relative overflow-hidden group perspective-1000 hidden md:flex items-center justify-center"
    >
      {/* Abstract Background Shapes */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] group-hover:bg-white/20 transition-colors duration-500" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-zinc-800/50 rounded-full blur-[80px] group-hover:bg-zinc-700/50 transition-colors duration-500" />

      {/* Floating Content */}
      <motion.div
        style={{ transform: "translateZ(50px)" }}
        className="flex flex-col items-center gap-6 text-center z-10"
      >
        <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md shadow-2xl relative">
          <Mail className="w-10 h-10 text-white" />
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-black animate-pulse" />
        </div>

        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Let's Talk</h3>
          <p className="text-gray-400 text-sm max-w-xs">
            Whether you have a groundbreaking idea or just want to say hi, our
            inbox is always open.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Contact = () => {
  const [formState, setFormState] = useState("idle"); // idle, submitting, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState("submitting");
    // Simulate API call
    setTimeout(() => setFormState("success"), 2000);
  };

  return (
    <main className="bg-black min-h-screen text-white pt-32">
      <div className="container mx-auto px-6 mb-24">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-white/80">
              Available for new projects
            </span>
          </div>

          <h2 className="text-9xl md:text-8xl font-bold text-white leading-tight mb-6">
            Get in <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white">
              Touch
            </span>
          </h2>
          <p className="text-xl text-gray-400">
            Ready to start your next project? We're here to help you bring your
            vision to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Left Column: Contact Info & 3D Visual */}
          <div className="space-y-12">
            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-all duration-300">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    Email Us
                  </h3>
                  <p className="text-gray-400 mb-2">
                    For general inquiries and project proposals.
                  </p>
                  <a
                    href="mailto:hello@ardaistudios.com"
                    className="text-white hover:text-primary transition-colors font-medium inline-flex items-center gap-2"
                  >
                    hello@ardaistudios.com <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-all duration-300">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    Phone Number
                  </h3>
                  <p className="text-gray-400 mb-2">Mon-Fri from 8am to 5pm.</p>
                  <a
                    href="tel:+2348000000000"
                    className="text-white hover:text-primary transition-colors font-medium"
                  >
                    +234 800 000 0000
                  </a>
                </div>
              </div>
            </div>

            <ConnectCard />
          </div>

          {/* Right Column: Interactive Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden backdrop-blur-xl"
          >
            <div className="absolute top-0 right-0 w-full h-2 bg-gradient-to-r from-gray-400 to-white" />

            {formState === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-[400px] flex flex-col items-center justify-center text-center space-y-6"
              >
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-3xl font-bold text-white">Message Sent!</h3>
                <p className="text-gray-400 max-w-xs">
                  Thanks for reaching out. We'll get back to you within 24
                  hours.
                </p>
                <Button
                  variant="secondary"
                  onClick={() => setFormState("idle")}
                >
                  Send Another
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Send a Message
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 ml-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="John"
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 ml-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="Doe"
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 ml-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary transition-colors"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 ml-1">
                    Project Details
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Tell us about your project..."
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary transition-colors resize-none"
                    required
                  />
                </div>

                <Button
                  variant="primary"
                  className="w-full py-4 text-lg flex items-center justify-center gap-2 group flex-row"
                  disabled={formState === "submitting"}
                >
                  {formState === "submitting" ? (
                    "Sending..."
                  ) : (
                    <>
                      <span> Send Message</span>
                      <Send
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <ArdiaAcademy />

      <Footer />
    </main>
  );
};

export default Contact;
