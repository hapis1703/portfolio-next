import { PageHead } from "@/components/blocks";
import ContactForm from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { SITE } from "@/lib/data";

export const metadata = {
  title: "Contact",
};

const LINKS = [
  { label: "GitHub", href: SITE.github, note: "code and contributions" },
  { label: "Email", href: "mailto:hepiss1703@gmail.com", note: "slowest but surest" },
];

export default function ContactPage() {
  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-4 pb-24 pt-20 sm:px-6 lg:grid-cols-2">
      <div>
        <PageHead
          eyebrow="Say hi"
          title="Get in touch"
          sub="Freelance work, collaboration, or just to argue about tabs versus spaces. Messages land straight in my Discord."
        />
        <Reveal delay={0.1}>
          <ul className="mt-8 space-y-3">
            {LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-xl border border-line bg-surface px-5 py-4 transition-colors hover:border-accent"
                >
                  <span className="font-semibold group-hover:text-accent transition-colors">
                    {link.label}
                  </span>
                  <span className="text-sm text-muted">{link.note}</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
      <Reveal delay={0.15}>
        <ContactForm />
      </Reveal>
    </section>
  );
}
