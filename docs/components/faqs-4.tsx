"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default function FAQsFour() {
  const faqItems = [
    {
      id: "item-1",
      question: "Is Reactix free to use?",
      answer:
        "Yes, Reactix is completely free and open source. You can copy and paste any component into your project without any licensing fees or restrictions.",
    },
    {
      id: "item-2",
      question: "What are the requirements?",
      answer:
        "Reactix components are built for React Native with Expo. Most components require react-native-reanimated and some use react-native-skia for advanced graphics.",
    },
    {
      id: "item-3",
      question: "Can I customize the components?",
      answer:
        "Absolutely! All components are designed to be easily customizable. You own the code once you copy it, so feel free to modify colors, sizes, animations, and behavior to match your brand.",
    },
    {
      id: "item-4",
      question: "Do I need to install a package?",
      answer:
        "No package installation required. Simply copy the component code directly into your project. This gives you full control and avoids dependency bloat.",
    },
    {
      id: "item-5",
      question: "Is TypeScript supported?",
      answer:
        "Yes, all components are written in TypeScript with full type definitions. This provides excellent IDE support and helps catch errors during development.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-black">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl text-white font-satoshi">
            Frequently Asked Questions
          </h2>
          <p className="text-neutral-400 mt-4 text-balance font-satoshi">
            Everything you need to know about using Reactix in your projects.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-xl">
          <Accordion
            type="single"
            collapsible
            className="bg-neutral-900 w-full rounded-2xl p-1 border border-white/10"
          >
            {faqItems.map((item) => (
              <div className="group" key={item.id}>
                <AccordionItem
                  value={item.id}
                  className="data-[state=open]:bg-neutral-800 peer rounded-xl border-none px-7 py-1 data-[state=open]:border-none"
                >
                  <AccordionTrigger className="cursor-pointer text-base hover:no-underline text-white font-satoshi">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-base text-neutral-400 font-satoshi">
                      {item.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <hr className="mx-7 border-white/10 border-dashed group-last:hidden peer-data-[state=open]:opacity-0" />
              </div>
            ))}
          </Accordion>

          <p className="text-neutral-500 mt-6 px-8 text-center font-satoshi">
            Can't find what you're looking for?{" "}
            <Link
              href="https://github.com/rit3zh/reacticx/issues"
              className="text-white font-medium hover:underline"
            >
              Open an issue on GitHub
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
