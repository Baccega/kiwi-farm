import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

export default function Faq() {
  return (
    <Accordion className="w-full" type="single" collapsible>
      <AccordionItem value="dove-spediamo">
        <AccordionTrigger>Dove spediamo?</AccordionTrigger>
        <AccordionContent>
          Effettuiamo spedizioni in tutta Europa tramite DHL. I tempi di
          consegna variano in base alla destinazione, con una media di 3-5
          giorni lavorativi.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="come-conservare">
        <AccordionTrigger>Come conservare i kiwi?</AccordionTrigger>
        <AccordionContent>
          I kiwi possono durare da alcune settimane a diversi mesi, a seconda
          delle precauzioni adottate. Le precauzioni sono:
          <ol className="list-inside list-decimal marker:font-bold">
            <li>
              Separare periodicamente i frutti che maturano più rapidamente.
            </li>
            <li>
              Conservare i frutti in una cassetta, in un luogo buio, asciutto e
              fresco, lontano da altra frutta che rilascia etilene, come mele,
              pere o banane (in alternativa, in frigorifero).
            </li>
            <li>
              È possibile lavarli, sbucciarli e congelarli per conservarli fino
              a 10 mesi. In questo caso, saranno più adatti per frullati,
              succhi, confetture, gelati o torte.
            </li>
          </ol>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="come-maturare-4-7">
        <AccordionTrigger>
          Come fare maturare i kiwi in 4-7 giorni?
        </AccordionTrigger>
        <AccordionContent>
          Riporre i kiwi in un sacchetto di carta ben chiuso insieme a frutta
          che rilascia etilene, come mele, pere o banane.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="come-maturare-7-10">
        <AccordionTrigger>
          Come fare maturare i kiwi in 7-10 giorni?
        </AccordionTrigger>
        <AccordionContent>
          Conservare i kiwi a temperatura ambiente.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
