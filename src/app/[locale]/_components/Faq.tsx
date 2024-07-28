import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

export default function Faq() {
  const t = useTranslations("Faq");

  return (
    <Accordion className="w-full" type="single" collapsible>
      <AccordionItem value="dove-spediamo">
        <AccordionTrigger>{t("q1")}</AccordionTrigger>
        <AccordionContent>
          {t('a1')}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="come-conservare">
        <AccordionTrigger>{t("q2")}</AccordionTrigger>
        <AccordionContent>
          {t("a2.1")}
          <ol className="list-inside list-decimal marker:font-bold">
            <li>{t("a2.2")}</li>
            <li>
              {t('a2.3')}
            </li>
            <li>
              {t('a2.4')}
            </li>
          </ol>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="come-maturare-4-7">
        <AccordionTrigger>{t("q3")}</AccordionTrigger>
        <AccordionContent>{t("a3")}</AccordionContent>
      </AccordionItem>
      <AccordionItem value="come-maturare-7-10">
        <AccordionTrigger>{t("q4")}</AccordionTrigger>
        <AccordionContent>{t("a4")}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
