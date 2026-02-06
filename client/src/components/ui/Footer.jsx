import { motion } from "framer-motion";
import {
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Mail,
  ArrowUpRight,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Twitter, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Linkedin, href: "#" },
    { icon: Github, href: "#" },
  ];

  const footerLinks = {
    services: [
      "AI Video Production",
      "Model Training",
      "Consulting",
      "Custom Pipelines",
    ],
    company: ["About Us", "Careers", "Blog", "Contact"],
    legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  };

  return (
    <footer className="relative bg-zinc-950 pt-32 pb-12 overflow-hidden">
      {/* Abstract gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          {/* Brand Column */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-7xl md:text-9xl font-bold tracking-tighter text-white mb-8"
              >
                ARDIA<span className="text-primary">.</span>
              </motion.h2>
              <p className="text-xl text-gray-400 max-w-md leading-relaxed">
                Pioneering the next generation of visual storytelling through
                artificial intelligence.
              </p>
            </div>

            <div className="mt-12 lg:mt-0">
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="group relative w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white text-white hover:text-black transition-all duration-300"
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8 pt-4">
            <div>
              <h3 className="text-white font-bold mb-8 text-lg">Services</h3>
              <ul className="space-y-4">
                {footerLinks.services.map((item, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-8 text-lg">Company</h3>
              <ul className="space-y-4">
                {footerLinks.company.map((item, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-primary transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <h3 className="text-white font-bold mb-2 text-lg">
                Stay Updated
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                Latest AI insights delivered to your inbox.
              </p>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 transition-colors"
                />
                <button className="absolute right-2 top-2 p-1.5 bg-primary rounded-md text-black hover:bg-white transition-colors">
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {currentYear} Ardia Studio. All rights reserved.</p>
          <div className="flex gap-8">
            {footerLinks.legal.map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
