export interface Announcement {
  id: string;
  title: string;
  description: string;
  newComponents: Array<{
    name: string;
    path: string;
  }>;
  date: string;
  version?: string;
  priority?: "low" | "medium" | "high";
}

export const announcements: Announcement[] = [
  {
    id: "2024-12-01",
    title: "New Components Added! 🎉",
    description:
      "We've added some exciting new components to enhance your React Native development experience.",
    newComponents: [
      {
        name: "Grainy Gradient",
        path: "/docs/components/grainy-gradient",
      },
      {
        name: "Mesh Gradient",
        path: "/docs/components/mesh-gradient",
      },
    ],
    date: "December 1, 2024",
    version: "v2.4.0",
  },
];
