import { setRequestLocale } from "next-intl/server";

export async function generateMetadata() {
  // const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: "Resi",
    alternates: {
      canonical: "/it/returns",
      languages: {
        "it-IT": "/it/returns",
        "en-US": "/en/returns",
      },
    },
  };
}

export default async function Page(props: { params: { locale: string } }) {
  setRequestLocale(props.params.locale);

  return (
    <main className="container flex min-h-section flex-col gap-4 px-6 pb-10 pt-header md:px-16">
      <h1 className="pt-6 text-4xl font-bold">Resi</h1>
      <p className="">
        La nostra policy prevede un termine di 30 giorni per i resi. Se sono
        trascorsi 30 giorni dalla data dell&apos;acquisto, purtroppo non
        possiamo offrirti alcun rimborso o cambio. Affinché sia idoneo al reso,
        l&apos;articolo deve essere intatto e nelle stesse condizioni in cui lo
        hai ricevuto. Deve anche essere nella sua confezione originale. Per
        diverse tipologie di beni è escluso il reso. I beni deperibili come
        cibo, fiori, giornali o riviste non possono essere oggetto di reso.
        Inoltre non accettiamo il reso di prodotti intimi o sanitari, materiali
        pericolosi e liquidi o gas infiammabili. Ulteriori articoli per i quali
        è escluso il reso: * Buoni regalo * Prodotti software scaricabili *
        Alcuni articoli per la salute e la cura della persona Ai fini del reso,
        richiediamo una ricevuta o una prova di acquisto. Per favore non
        rispedire indietro il tuo acquisto al produttore. In alcuni casi sono
        concessi solo rimborsi parziali (se applicabili): * Libro con evidenti
        segni d&apos;uso * CD, DVD, nastro VHS, software, videogioco, cassetta o
        disco in vinile che sia stato aperto. * Qualsiasi articolo che non si
        trovi nel suo stato originario, sia danneggiato o con parti mancanti per
        cause estranee a un nostro errore. * Qualsiasi articolo restituito più
        di 30 giorni dopo la consegna Rimborsi (se applicabile) Una volta
        ricevuto e ispezionato il reso, ti invieremo un&apos;email per
        comunicarti l&apos;avvenuta ricezione dell&apos;articolo. Ti
        comunicheremo anche l&apos;approvazione o il rifiuto della tua richiesta
        di rimborso. Se la tua richiesta è approvata, il rimborso sarà elaborato
        e verrà automaticamente applicato un credito sulla tua carta o metodo di
        pagamento originario, entro un certo numero di giorni. Rimborsi tardivi
        o inevasi (se applicabile) Se non hai ancora ricevuto un rimborso,
        innanzitutto ricontrolla il tuo conto bancario. Poi contatta
        l&apos;azienda emittente della carta di credito; può occorrere del tempo
        prima che il rimborso sia formalmente registrato. Quindi contatta la tua
        banca. Spesso sono previsti dei tempi di elaborazione per la
        registrazione di un rimborso. Se hai già seguito questi passaggi e non
        hai ancora ricevuto il rimborso, scrivici al seguente indirizzo:
        soc.agr.kiwifarm@gmail.com. Articoli in saldo (se applicabile) Solo gli
        articoli a prezzo pieno possono essere rimborsati. Purtroppo per gli
        articoli in saldo non è possibile alcun rimborso. Cambi (se applicabile)
        Sostituiamo gli articoli solo se difettosi o danneggiati. Se ti occorre
        un cambio con lo stesso articolo, inviaci un&apos;email a
        soc.agr.kiwifarm@gmail.com e spedisci l&apos;articolo al seguente
        indirizzo: Via Restello 19 35010 Villa del Conte PD Italia. Regali Se al
        momento dell&apos;acquisto l&apos;articolo è stato contrassegnato come
        regalo e spedito direttamente a te, riceverai un buono corrispondente al
        valore del reso. Alla ricezione dell&apos;articolo oggetto di reso, ti
        sarà spedito per posta il buono regalo. Se l&apos;articolo non è stato
        contrassegnato come regalo al momento dell&apos;acquisto, o se chi ha
        fatto il regalo si è fatto spedire l&apos;ordine per consegnartelo di
        persona, invieremo un rimborso a chi ha fatto il regalo e questi verrà a
        conoscenza del tuo reso. Spedizione Per effettuare un reso, spedisci il
        prodotto al seguente indirizzo: Via Restello 19 35010 Villa del Conte PD
        Italia. I costi di spedizione per il reso dell&apos;articolo saranno a
        tuo carico. I costi di spedizione non sono rimborsabili. Se ricevi un
        rimborso, i costi di spedizione del reso non saranno inclusi nel
        rimborso. A seconda del paese in cui vivi, il tempo necessario per il
        recapito del prodotto in sostituzione può variare. Se devi spedire un
        articolo del valore di oltre 75 €, considera di utilizzare un servizio
        di spedizione tracciabile o di assicurare la spedizione. Non garantiamo
        che riceveremo l&apos;articolo oggetto di reso.
      </p>
    </main>
  );
}
