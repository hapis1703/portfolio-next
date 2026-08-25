import { PageHead } from "@/components/blocks";
import ThemeGrid from "@/components/theme-grid";

export const metadata = {
  title: "Themes",
};

export default function ThemesPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-24 pt-20 sm:px-6">
      <PageHead
        eyebrow="Appearance"
        title="Pick a theme"
        sub="Six accent palettes times light and dark. Your choice is saved on this device and applies everywhere."
      />
      <div className="mt-10">
        <ThemeGrid />
      </div>
    </section>
  );
}
