"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  IconQrcode,
  IconX,
  IconCheck,
  IconLoader2,
  IconRefresh,
} from "@tabler/icons-react";

const PRESETS = [10000, 25000, 50000];

function rupiah(n) {
  return `Rp ${Number(n || 0).toLocaleString("id-ID")}`;
}

export default function DonateClient() {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [qr, setQr] = useState(null);
  const [checking, setChecking] = useState(false);
  const [paid, setPaid] = useState(false);
  const [checkError, setCheckError] = useState("");

  const num = Number(amount);

  async function createQris(e) {
    e.preventDefault();
    if (!num || num < 100) {
      setError("Minimum Rp 100.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/donate/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: num }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate QRIS.");
      setQr(data.data);
      setPaid(false);
      setCheckError("");
    } catch (err) {
      setError(err.message || "Failed to generate QRIS. Try again.");
    }
    setLoading(false);
  }

  async function checkStatus() {
    if (!qr?.transaction_id) return;
    setChecking(true);
    setCheckError("");
    try {
      const res = await fetch("/api/donate/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transactionId: qr.transaction_id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to check status.");
      if (data.status === "success") {
        setPaid(true);
      } else {
        setCheckError(
          data.status === "pending"
            ? "Not paid yet. Complete the scan, then check again."
            : `Status: ${data.status}.`
        );
      }
    } catch (err) {
      setCheckError(err.message || "Failed to check status.");
    }
    setChecking(false);
  }

  function close() {
    setQr(null);
    setPaid(false);
  }

  return (
    <>
      <form onSubmit={createQris} className="rounded-xl border border-line bg-surface p-6 sm:p-8">
        <div>
          <label htmlFor="don-amount" className="mb-2 block text-sm font-medium text-muted">
            Amount (IDR)
          </label>
          <input
            id="don-amount"
            type="number"
            min={100}
            step={100}
            inputMode="numeric"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="25000"
            className="w-full rounded-lg border border-line bg-base px-4 py-3 text-lg font-mono text-ink placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 transition"
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setAmount(String(p))}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                num === p
                  ? "border-accent bg-accent text-[var(--accent-ink)] font-semibold"
                  : "border-line text-muted hover:border-accent hover:text-accent"
              }`}
            >
              {rupiah(p)}
            </button>
          ))}
        </div>

        {error && (
          <p className="mt-4 text-sm text-red-500" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-[var(--accent-ink)] transition-transform hover:-translate-y-0.5 active:translate-y-0 disabled:translate-y-0 disabled:opacity-60"
        >
          {loading ? (
            <>
              <IconLoader2 size={18} className="animate-spin" /> Generating...
            </>
          ) : (
            <>
              <IconQrcode size={18} /> Generate QRIS
            </>
          )}
        </button>

        <p className="mt-4 text-center text-xs text-muted">
          QRIS accepts every Indonesian e-wallet and m-banking app.
        </p>
      </form>

      <AnimatePresence>
        {qr && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={close}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm rounded-2xl border border-line bg-raised p-6 sm:p-8"
              role="dialog"
              aria-modal="true"
              aria-label="Payment details"
            >
              <button
                onClick={close}
                aria-label="Close"
                className="absolute right-4 top-4 text-muted hover:text-ink"
              >
                <IconX size={20} />
              </button>

              {paid ? (
                <div className="py-10 text-center">
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mx-auto mb-4 grid size-16 place-items-center rounded-full bg-emerald-500 text-white"
                  >
                    <IconCheck size={32} stroke={3} />
                  </motion.div>
                  <h3 className="text-xl font-bold">Payment received!</h3>
                  <p className="mt-1 text-sm text-muted">Thank you for the support.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-center text-lg font-bold">Scan to pay</h3>
                  <div className="mx-auto mt-4 w-fit rounded-xl bg-white p-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={qr.qr_url} alt="QRIS payment code" className="size-56 object-contain sm:size-64" />
                  </div>
                  <dl className="mt-5 space-y-2 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted">Amount</dt>
                      <dd className="font-mono">{rupiah(qr.amount)}</dd>
                    </div>
                    {Number(qr.total_amount) !== Number(qr.amount) && (
                      <div className="flex justify-between gap-4">
                        <dt className="text-muted">Fee</dt>
                        <dd className="font-mono">
                          +{rupiah(Number(qr.total_amount) - Number(qr.amount))}
                        </dd>
                      </div>
                    )}
                    <div className="flex justify-between gap-4 border-t border-line pt-2 font-semibold">
                      <dt>Total</dt>
                      <dd className="font-mono">{rupiah(qr.total_amount)}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted">Expires</dt>
                      <dd className="font-mono text-xs leading-5">
                        {qr.expired_at
                          ? qr.expired_at.replace(" ", ", ")
                          : "see app"}
                      </dd>
                    </div>
                  </dl>
                  {checkError && (
                    <p className="mt-3 text-center text-xs text-muted">{checkError}</p>
                  )}
                  <button
                    onClick={checkStatus}
                    disabled={checking}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-[var(--accent-ink)] disabled:opacity-60"
                  >
                    {checking ? (
                      <>
                        <IconLoader2 size={17} className="animate-spin" /> Checking...
                      </>
                    ) : (
                      <>
                        <IconRefresh size={17} /> I have paid, check status
                      </>
                    )}
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
