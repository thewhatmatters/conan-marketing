import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// FAQ accordion island. Copy lives in FAQ.astro frontmatter and is passed in as
// `items` (keeps prose in the .astro per project convention); this island only
// owns the single-open interaction. Gold hover/open accent + larger trigger type
// are deliberate dark-pulp overrides per DESIGN.md §Component stylings.
type FaqItem = { q: string; a: string };

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
      {items.map((item, i) => (
        <AccordionItem key={i} value={`item-${i}`} className="border-border/70">
          <AccordionTrigger className="py-5 text-base font-medium text-foreground transition-colors hover:text-gold hover:no-underline data-[state=open]:text-gold">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="max-w-2xl pb-5 text-[15px] leading-relaxed text-muted-foreground">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
