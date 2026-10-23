"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitted(true);
        reset();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-24">
      {/* Header */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-extrabold text-navy dark:text-white mb-6">Get In Touch</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Have a project in mind or just want to say hi? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-navy dark:text-white mb-8">Contact Information</h2>
              <div className="space-y-8">
                <div className="flex items-start space-x-6">
                  <div className="w-14 h-14 bg-optima-blue/10 rounded-2xl flex items-center justify-center text-optima-blue dark:text-optima-green shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-navy dark:text-white">Email Us</h4>
                    <p className="text-gray-600 dark:text-gray-400">optimatech.dev@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="w-14 h-14 bg-optima-green/10 rounded-2xl flex items-center justify-center text-optima-green shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-navy dark:text-white">Call Us</h4>
                    <a href="tel:+251939405104" className="block text-gray-600 dark:text-gray-400 hover:text-optima-blue transition-colors">+251 939 405104</a>
                    <a href="tel:+251914585645" className="block text-gray-600 dark:text-gray-400 hover:text-optima-blue transition-colors">+251 914 585645</a>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="w-14 h-14 bg-navy/10 dark:bg-white/10 rounded-2xl flex items-center justify-center text-navy dark:text-white shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-navy dark:text-white">Our Locations</h4>
                    <p className="text-gray-600 dark:text-gray-400">Addis Ababa & Regional Cities, Ethiopia</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Connect */}
            <div className="p-10 bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/10">
              <h3 className="text-xl font-bold text-navy dark:text-white mb-4">Connect with us</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Follow us on social media for latest updates and news.</p>
              <div className="flex space-x-4">
                {/* Social icons here */}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-white/5 p-10 rounded-3xl border border-gray-100 dark:border-white/10 shadow-xl shadow-gray-200/50 dark:shadow-none">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 bg-optima-green/10 text-optima-green rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 size={48} />
                </div>
                <h2 className="text-3xl font-bold text-navy dark:text-white mb-4">Message Sent!</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">Thank you for reaching out. We will get back to you shortly.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-navy dark:bg-optima-blue text-white px-8 py-3 rounded-xl font-bold hover:bg-optima-blue transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-navy dark:text-white mb-2">Full Name</label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    className={`w-full px-6 py-4 bg-gray-50 dark:bg-white/5 border ${errors.name ? 'border-red-500' : 'border-gray-100 dark:border-white/10'} rounded-2xl text-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-optima-blue transition-all`}
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold text-navy dark:text-white mb-2">Email Address</label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    className={`w-full px-6 py-4 bg-gray-50 dark:bg-white/5 border ${errors.email ? 'border-red-500' : 'border-gray-100 dark:border-white/10'} rounded-2xl text-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-optima-blue transition-all`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold text-navy dark:text-white mb-2">Message</label>
                  <textarea
                    {...register("message", { required: "Message is required" })}
                    rows={6}
                    className={`w-full px-6 py-4 bg-gray-50 dark:bg-white/5 border ${errors.message ? 'border-red-500' : 'border-gray-100 dark:border-white/10'} rounded-2xl text-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-optima-blue transition-all resize-none`}
                    placeholder="How can we help you?"
                  />
                  {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
                </div>

                {error && (
                  <div className="flex items-center space-x-2 text-red-500 bg-red-50 dark:bg-red-500/10 p-4 rounded-xl">
                    <AlertCircle size={20} />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-optima-blue to-optima-green text-white py-5 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all flex items-center justify-center space-x-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={20} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
