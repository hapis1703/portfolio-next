import { PageHead } from "@/components/blocks";
import DonateClient from "@/components/donate-client";

export const metadata = {
  title: "Support my work",
};

export default function DonatePage() {
  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-4 pb-24 pt-20 sm:px-6 lg:grid-cols-2 lg:items-start">
      <div>
        <PageHead
          eyebrow="Support"
          title="Buy me a coffee"
          sub="Everything here is free and open source. If something helped you, a small donation keeps the experiments running."
        />
        <div className="mt-8 space-y-4">
          <div className="rounded-xl border border-line bg-surface p-5">
            <h2 className="font-semibold">Where it goes</h2>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              Server time for side projects, domains, and the occasional Minecraft
              map reset.
            </p>
          </div>
          <div className="rounded-xl border border-line bg-surface p-5">
            <h2 className="font-semibold">Secure by design</h2>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              Payments run through QRIS. The site never sees your wallet or bank
              details, only whether the payment landed.
            </p>
          </div>
        </div>
      </div>
      <DonateClient />
    </section>
  );
}
