"use client";

import { motion } from "motion/react";
import TeamMemberCard, { type TeamMember } from "@/components/ui/team-members";

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "rit3zh",
    role: "Creator & Maintainer",
    image:
      "https://i.pinimg.com/1200x/81/ca/65/81ca659db9c8c6a017575f23d4c8c494.jpg",
    cardType: "white",
    social: "https://twitter.com/rit3zh",
  },
];

export default function Team1() {
  return (
    <section className="pb-16 md:pb-24 flex flex-col items-center justify-center bg-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4"
      >
        <h2 className="text-center text-3xl font-bold md:text-4xl lg:text-5xl mb-3 text-white font-satoshi">
          Made by
        </h2>
        <span className="text-neutral-400 block text-center text-sm mb-16 font-satoshi">
          Built with love for the React Native community
        </span>

        <div className="flex justify-center">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
