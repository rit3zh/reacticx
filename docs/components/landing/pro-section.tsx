import SlideTextButton from "@/components/kokonutui/slide-text-button";
import cardsData from "./cards-data.json";
import FeatureCardsGrid from "./cards-grid";

export default function ProSection() {
  return (
    <section className="relative w-full overflow-hidden py-16 md:py-24">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-blue-500/5 to-transparent dark:via-blue-400/5" />

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="max-w-7xl">
          <FeatureCardsGrid
            cards={cardsData}
            description="Premium components, advanced templates, and complete package to build exceptional products faster."
            title="Explore more with Kokonut UI Pro"
          />
          <div className="mt-12 flex justify-center">
            <SlideTextButton
              hoverText="Bring me here"
              href="https://kokonutui.pro"
              text="Explore Pro Templates and Components"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
