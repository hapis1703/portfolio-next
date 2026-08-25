"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconSend, IconCheck, IconAlertTriangle } from "@tabler/icons-react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  }

  const inputCls =
    "w-full rounded-lg border border-line bg-base px-4 py-3 text-ink placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 transition";

  return (
    <form onSubmit={onSubmit} className="rounded-xl border border-line bg-surface p-6 sm:p-8">
      <div className="space-y-5">
        <div>
          <label htmlFor="cf-name" className="mb-2 block text-sm font-medium text-muted">
            Name
          </label>
          <input
            id="cf-name"
            type="text"
            required
            maxLength={120}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="cf-email" className="mb-2 block text-sm font-medium text-muted">
            Email
          </label>
          <input
            id="cf-email"
            type="email"
            required
            maxLength={200}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@example.com"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="cf-message" className="mb-2 block text-sm font-medium text-muted">
            Message
          </label>
          <textarea
            id="cf-message"
            required
            rows={5}
            maxLength={4000}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="What is on your mind?"
            className={`${inputCls} resize-y`}
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-[var(--accent-ink)] transition-transform hover:-translate-y-0.5 active:translate-y-0 disabled:translate-y-0 disabled:opacity-60 sm:w-auto"
        >
          {status === "sending" ? (
            "Sending..."
          ) : (
            <>
              Send message <IconSend size={17} />
            </>
          )}
        </button>

        <AnimatePresence>
          {status === "sent" && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-sm text-accent"
              role="status"
            >
              <IconCheck size={16} /> Message sent. Talk soon.
            </motion.p>
          )}
          {status === "error" && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-sm text-red-500"
              role="alert"
            >
              <IconAlertTriangle size={16} /> Something broke on the way. Try again.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
