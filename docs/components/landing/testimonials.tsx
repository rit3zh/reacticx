import { VerifiedIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import XIcon from "../icons/x-icon";
import { testimonials } from "./testimonials-data";
import XCard from "./x-card";

export default function TestimonialsSection() {
  return (
    <section
      className="w-full overflow-hidden py-24 md:py-32 lg:py-40"
      id="testimonials"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <h2 className="mb-4 font-bold text-3xl text-black tracking-tight md:text-4xl lg:text-5xl dark:text-white">
            What People Are Saying
          </h2>
          <p className="text-balance text-black/70 text-lg md:text-xl dark:text-white/70">
            Used by many developers and companies around the world.
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Left Column: Tweet Cards */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            {/* Tweet-like Card */}
            <XCard
              avatar={testimonials[0].avatar}
              content={testimonials[0].content}
              date={testimonials[0].date}
              name={testimonials[0].name}
              username={testimonials[0].username}
            />

            {/* Tweet Card - Inline */}
            <Link
              href="https://x.com/dorianbaffier/status/1880291036410572934"
              target="_blank"
            >
              <div className="w-full rounded-3xl bg-black/5 p-1.5 dark:bg-white/5">
                <div className="relative w-full rounded-xl bg-black/5 p-5 text-black/90 transition-colors hover:bg-black/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10">
                  <div className="flex gap-3">
                    <div className="shrink-0">
                      <div className="h-10 w-10 overflow-hidden rounded-full">
                        <Image
                          alt="Dorian"
                          className="h-full w-full object-cover"
                          height={40}
                          src="https://pbs.twimg.com/profile_images/1992215290936205312/N_EuwLUO_400x400.jpg"
                          width={40}
                        />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1">
                            <span className="cursor-pointer font-semibold text-black hover:underline dark:text-white/90">
                              Dorian
                            </span>
                            <VerifiedIcon className="h-4 w-4 text-blue-400" />
                          </div>
                          <span className="text-black text-sm dark:text-white/60">
                            @dorianbaffier
                          </span>
                        </div>
                        <button
                          className="flex h-8 w-8 items-center justify-center rounded-lg p-1 text-black hover:bg-black/5 hover:text-black dark:text-white/80 dark:hover:bg-white/5 dark:hover:text-white"
                          type="button"
                        >
                          <XIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2">
                    <p className="text-base text-black dark:text-white/90">
                      All components from KokonutUI can now be open in @v0 🎉
                    </p>
                    <p className="text-base text-black dark:text-white/90">
                      1. Click on &apos;Open in V0&apos;
                    </p>
                    <p className="text-base text-black dark:text-white/90">
                      2. Customize with prompts
                    </p>
                    <p className="text-base text-black dark:text-white/90">
                      3. Deploy to your app
                    </p>
                    <span className="mt-2 block text-black text-sm dark:text-white/50">
                      Jan 18, 2025
                    </span>
                  </div>

                  <div className="mt-4 border-black/[0.08] border-t pt-4 dark:border-white/[0.08]">
                    <div className="flex gap-3">
                      <div className="shrink-0">
                        <div className="h-10 w-10 overflow-hidden rounded-full">
                          <Image
                            alt="shadcn"
                            className="h-full w-full object-cover"
                            height={40}
                            src="https://pbs.twimg.com/profile_images/1593304942210478080/TUYae5z7_400x400.jpg"
                            width={40}
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1">
                          <span className="cursor-pointer font-semibold text-black hover:underline dark:text-white/90">
                            shadcn
                          </span>
                          <VerifiedIcon className="h-4 w-4 text-blue-400" />
                          <span className="text-black text-sm dark:text-white/60">
                            @shadcn
                          </span>
                          <span className="text-black text-sm dark:text-white/60">
                            ·
                          </span>
                          <span className="text-black text-sm dark:text-white/60">
                            Jan 18
                          </span>
                        </div>
                        <p className="mt-1 text-black text-sm dark:text-white/80">
                          Awesome.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Right Column: View Works Card + Web Development Card */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            {/* YouTube Video Card */}
            <div className="relative flex min-h-[320px] w-full flex-[2] flex-col rounded-3xl bg-black/5 p-2 dark:bg-white/5">
              <div className="h-full w-full flex-1 overflow-hidden rounded-2xl bg-black/5 dark:bg-white/5">
                <iframe
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="h-full w-full"
                  referrerPolicy="strict-origin-when-cross-origin"
                  src="https://www.youtube.com/embed/2Fj3WewGRow"
                  title="YouTube video player"
                />
              </div>
            </div>

            {/* Web Development Carousel */}
            <XCard
              avatar={testimonials[1].avatar}
              content={testimonials[1].content}
              date={testimonials[1].date}
              name={testimonials[1].name}
              username={testimonials[1].username}
            />
          </div>
        </div>

        {/* Three Cards Row */}
        <div className="mx-auto mt-6 grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(2, 5).map((testimonial) => (
            <XCard
              avatar={testimonial.avatar}
              content={testimonial.content}
              date={testimonial.date}
              key={testimonial.username}
              name={testimonial.name}
              username={testimonial.username}
            />
          ))}
        </div>

        {/* Many More Message */}
        <div className="mt-12 text-center">
          <p className="text-balance text-black/60 text-lg dark:text-white/60">
            ...and many more
          </p>
        </div>
      </div>
    </section>
  );
}
