import { InfiniteSlider } from "../infinite-slider";
import { ProgressiveBlur } from "../progressive-blur";

export default function MadeWith() {
  return (
    <section className="bg-background overflow-hidden py-0">
      <div className="group relative m-auto  px-6">
        <div className="flex flex-col items-center md:flex-row">
          <div className="relative py-6 md:w-[calc(100%-11rem)]">
            <InfiniteSlider speedOnHover={20} speed={40} gap={102}>
              <div className="flex">
                <img
                  src="/static/deps/reanimated.png"
                  alt="Reanimated"
                  className="h-8 sm:h-10 w-auto object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </div>

              <div className="flex">
                <img
                  src="/static/deps/react-native.png"
                  alt="React Native"
                  className="h-8 sm:h-10 w-auto object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              <div className="flex">
                <img
                  src="/static/deps/skia.png"
                  alt="React Native Skia"
                  className="h-8 sm:h-10 w-auto object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              <div className="flex">
                <img
                  src="/static/deps/expo.png"
                  alt="Expo"
                  className="h-8 sm:h-10 w-auto object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </InfiniteSlider>

            <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"></div>
            <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"></div>
            <ProgressiveBlur
              className="pointer-events-none absolute left-0 top-0 h-full w-20"
              direction="left"
              blurIntensity={1}
            />
            <ProgressiveBlur
              className="pointer-events-none absolute right-0 top-0 h-full w-20"
              direction="right"
              blurIntensity={1}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
