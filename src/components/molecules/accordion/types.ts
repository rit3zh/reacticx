type AccordionTheme = {
  backgroundColor: string;
  borderColor: string;
  headlineColor: string;
  subtitleColor: string;
  iconColor: string;
};

type AccordionIcons = "chevron" | "cross";
type AccordionType = "single" | "multiple";

type AccordionContextType = {
  openItems: Set<string>;
  toggleItem: (id: string) => void;
  theme: AccordionTheme;
  spacing: number;
};

type AccordionProps = {
  children: React.ReactNode;
  type?: AccordionType;
  theme?: AccordionTheme;
  spacing?: number;
};

type AccordionItemProps = {
  children: React.ReactNode;
  value: string;
  pop?: boolean;
  icon?: AccordionIcons;
  popScale?: number;
  isLast?: boolean;
};

type AccordionTriggerProps = {
  children: React.ReactNode;
};

type AccordionContentProps = {
  children: React.ReactNode;
};

export type {
  AccordionContentProps,
  AccordionContextType,
  AccordionIcons,
  AccordionItemProps,
  AccordionProps,
  AccordionTheme,
  AccordionTriggerProps,
  AccordionType,
};
