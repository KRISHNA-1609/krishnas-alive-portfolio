import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, MapPin, Send, CheckCircle } from "lucide-react";
import ExternalLink from "@/components/ExternalLink";

const ContactSection = () => {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", reason: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:krishnashonka@gmail.com?subject=${encodeURIComponent(
      form.reason || "Portfolio Contact"
    )}&body=${encodeURIComponent(
      `From: ${form.firstName} ${form.lastName}\nEmail: ${form.email}\n\n${form.message}`
    )}`;
    window.open(mailtoLink);
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const inputClasses = "w-full px-4 py-3.5 rounded-xl bg-card border border-border text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-300 placeholder:text-muted-foreground/50";

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm mb-2 block">{'<contact>'}</span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Let's Build Something Amazing</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Interested in collaborating, have a project idea, or just want to connect?
            I'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          {/* Contact info side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass-card rounded-2xl p-6 gradient-border">
              <Mail size={20} className="text-primary mb-3" />
              <p className="text-sm font-semibold mb-1">Email</p>
              <p className="text-xs text-muted-foreground">krishnashonka@gmail.com</p>
            </div>
            <div className="glass-card rounded-2xl p-6 gradient-border">
              <MapPin size={20} className="text-primary mb-3" />
              <p className="text-sm font-semibold mb-1">Location</p>
              <p className="text-xs text-muted-foreground">India</p>
            </div>
            <div className="glass-card rounded-2xl p-6 gradient-border">
              <p className="text-xs text-muted-foreground mb-3">Connect with me</p>
              <div className="flex flex-col gap-2">
                {[
                  { label: "GitHub", href: "https://github.com/KRISHNA-1609" },
                  { label: "LinkedIn", href: "https://www.linkedin.com/in/krishna-shonka-903a67358/?skipRedirect=true" },
                  { label: "Codolio", href: "https://codolio.com/profile/Krishna_1609" },
                  { label: "Instagram", href: "https://www.instagram.com/krishnaaa_1609?igsh=bmlqdXZ6cXZvaDYz" },
                ].map((link) => (
                  <ExternalLink
                    key={link.label}
                    href={link.href}
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center justify-between group"
                  >
                    {link.label}
                    <span className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all">→</span>
                  </ExternalLink>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  className={inputClasses}
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  className={inputClasses}
                />
              </div>
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClasses}
                required
              />
              <select
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
                className={inputClasses}
              >
                <option value="">Select a reason...</option>
                <option value="Internship Opportunity">Internship Opportunity</option>
                <option value="Project Collaboration">Project Collaboration</option>
                <option value="Freelance Work">Freelance / Contract Work</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Other">Other</option>
              </select>
              <div className="relative">
                <textarea
                  placeholder="Tell me about your project or idea..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  maxLength={500}
                  className={`${inputClasses} resize-none`}
                  required
                />
                <span className="absolute bottom-3 right-3 text-[10px] text-muted-foreground/50">
                  {form.message.length}/500
                </span>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 flex items-center justify-center gap-2"
              >
                {sent ? (
                  <>
                    <CheckCircle size={16} />
                    Message Prepared!
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
