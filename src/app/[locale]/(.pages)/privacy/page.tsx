import { setRequestLocale } from "next-intl/server";


export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  // const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: "Privacy policy",
    alternates: {
      canonical: "/it/privacy",
      languages: {
        "it-IT": "/it/privacy",
        "en-US": "/en/privacy",
      },
    },
  };
}

export default async function Page(props: { params: { locale: string } }) {
  setRequestLocale(props.params.locale);

  return (
    <main className="container flex min-h-section flex-col gap-4 px-6 pb-10 pt-header md:px-16">
      <h1 className="pt-6 text-4xl font-bold">Privacy policy</h1>
      <p className="">
        Informativa sulla privacy di Società agricola Kiwi Farm S.S. La presente
        Informativa sulla privacy descrive le modalità con cui i tuoi dati
        personali vengono raccolti, utilizzati e diffusi quando visiti o
        effettui un acquisto su https://www.legiumelle.it/ (il “Sito”). Quando
        parliamo di “Dati personali” in questa Informativa sulla privacy,
        facciamo riferimento sia alle Informazioni sul dispositivo che alle
        Informazioni sugli ordini.
      </p>
      <h2 className="pt-6 text-2xl">Raccolta dati personali</h2>
      <p className="">
        Quando visiti il Sito, raccogliamo automaticamente determinate
        informazioni presenti sul tuo dispositivo, tra cui dati del browser,
        indirizzo IP, fuso orario e dati di alcuni cookie installati sul tuo
        dispositivo. Inoltre, mentre navighi sul Sito raccogliamo informazioni
        specifiche sulle pagine web e i prodotti che visualizzi, sui siti web o
        i termini di ricerca che ti hanno indirizzato al Sito e sul modo in cui
        interagisci con il Sito. Definiremo queste informazioni raccolte
        automaticamente come “Informazioni sul dispositivo”. Raccogliamo le
        Informazioni sul dispositivo con le seguenti tecnologie: - I “cookie”
        sono file di dati che vengono inseriti sul tuo dispositivo o computer, e
        spesso includono un codice identificativo univoco anonimo. Per maggiori
        informazioni sui cookie e su come disattivarli visita
        http://www.allaboutcookies.org. - I “File di log” tengono traccia delle
        azioni che hanno luogo sul Sito, e raccolgono dati tra cui indirizzo IP,
        tipo di browser, provider di servizi internet, pagine di
        riferimento/uscita e marcatura temporale con data/ora. - “Web beacon”,
        “tag” e “pixel” sono file elettronici utilizzati per registrare dati
        sulle tue modalità di navigazione nel Sito. In più quando effettui un
        acquisto o tenti di effettuare un acquisto tramite il Sito, raccogliamo
        determinate informazioni che ti riguardano, tra cui nome e cognome,
        indirizzo di fatturazione, indirizzo di spedizione, dati di pagamento
        (compresi i numeri delle carte di credito o di debito), indirizzo email
        e numero di telefono. Definiremo questi dati “Informazioni sugli
        ordini”.
      </p>
      <h2 className="pt-6 text-2xl">Come utilizziamo i tuoi dati personali?</h2>
      <p className="">
        Generalmente utilizziamo le Informazioni sugli ordini per evadere gli
        ordini effettuati tramite il Sito (il che include l&apos;elaborazione
        dei dati di pagamento, l&apos;organizzazione della spedizione e il
        recapito di fatture e/o conferme d&apos;ordine). Inoltre, utilizziamo le
        Informazioni sugli ordini per: Comunicare con te; verificare
        l&apos;assenza di potenziali rischi o frodi negli ordini; fornirti
        informazioni o pubblicità sui nostri prodotti o servizi, se in linea con
        le preferenze che ci hai espresso. Utilizziamo le Informazioni sul
        dispositivo raccolte (in particolare il tuo indirizzo IP) per verificare
        l&apos;assenza di potenziali rischi o frodi e, più in generale, per
        migliorare e ottimizzare il nostro Sito (ad esempio, generando dati
        analitici sulle modalità di navigazione e interazione con il Sito da
        parte dei nostri clienti, e per valutare il successo delle nostre
        campagne pubblicitarie e di marketing).{" "}
      </p>
      <h2 className="pt-6 text-2xl">Divulgazione dei tuoi dati personali</h2>
      <p className="">
        Condividiamo i tuoi Dati personali con le aziende di terze parti che ci
        aiutano nello svolgimento delle attività sopra descritte. Utilizziamo
        PostHog per tenere traccia del comportamento degli utenti sul nostro
        sito web. Per maggiori informazioni su come PostHog utilizza i tuoi Dati
        personali visita la pagina https://posthog.com/privacy. Utilizziamo
        Sentry per monitorare gli errori che si verificano sul nostro sito web.
        Per maggiori informazioni su come Sentry utilizza i tuoi Dati personali
        visita la pagina https://sentry.io/privacy. Entrambi i servizi
        conservano i tuoi dati in server nell&apos;Unione europea. Infine,
        possiamo anche comunicare a terzi i tuoi Dati personali per conformarci
        a leggi e regolamenti applicabili, rispondere a citazioni in giudizio,
        mandati di perquisizione o altre richieste legali di dati ricevute, o
        comunque per tutelare i nostri diritti.
      </p>
      {/* <h2 className="pt-6 text-2xl">Pubblicità comportamentale</h2>
      <p className="">
        Come descritto sopra, utilizziamo i tuoi Dati personali per fornirti
        pubblicità mirata o comunicazioni di marketing che riteniamo possano
        essere di tuo interesse. Per maggiori informazioni su come funziona la
        pubblicità mirata, visita la pagina formativa di Network Advertising
        Initiative ("NAI") all&apos;indirizzo web
        http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work.
        Puoi disattivare la pubblicità mirata da qui: [[ INCLUDI IL LINK DI
        RECESSO PER QUALSIASI SERVIZIO UTILIZZATO. TRA I LINK PIÙ COMUNI:
        FACEBOOK - https://www.facebook.com/settings/?tab=ads GOOGLE -
        https://www.google.com/settings/ads/anonymous BING -
        https://about.ads.microsoft.com/it-it/risorse/informative/annunci-personalizzati
        ]] Inoltre, puoi rifiutare esplicitamente alcuni di questi servizi
        visitando il portale di recesso dalla pubblicità digitale di Digital
        Advertising Alliance: http://optout.aboutads.info/.
      </p> */}
      <h2 className="pt-6 text-2xl">Do not track</h2>
      <p className="">
        Tieni presente che non alteriamo le modalità di raccolta dati del nostro
        Sito e le pratiche di utilizzo dei dati in presenza del segnale Do Not
        Track del tuo browser.
      </p>
      <h2 className="pt-6 text-2xl">I tuoi diritti</h2>
      <p className="">
        Se risiedi in Europa, hai il diritto di accedere ai dati personali che
        ti riguardano in nostro possesso e di richiederne l&apos;aggiornamento,
        la correzione o la rimozione. Se desideri esercitare questo diritto,
        contattaci attraverso i recapiti sottostanti. In più, se risiedi in
        Europa, tieni presente che trattiamo i tuoi dati anche per adempiere
        agli eventuali obblighi contrattuali nei tuoi confronti (ad esempio, in
        relazione agli ordini da te effettuati tramite il Sito) o comunque per
        perseguire i nostri legittimi interessi aziendali sopra indicati. Oltre
        a ciò, tieni presente che i tuoi dati saranno trasferiti in paesi
        extraeuropei tra cui il Canada e gli Stati Uniti.
      </p>
      <h2 className="pt-6 text-2xl">Conservazione dei dati</h2>
      <p className="">
        Quando effettui degli ordini tramite il Sito, conserviamo le
        Informazioni sugli ordini nei nostri archivi, tranne se e fino a quando
        non ci chiedi di eliminare tali informazioni.
      </p>
      <h2 className="pt-6 text-2xl">Minori</h2>
      <p className="">
        Il Sito non è destinato a persone di età inferiore a 18 anni.
      </p>
      <h2 className="pt-6 text-2xl">Modifiche</h2>
      <p className="">
        Di volta in volta potremo aggiornare la presente Informativa sulla
        privacy, ad esempio in modo che rifletta le modifiche alle nostre
        procedure, oppure per altre ragioni operative, legali o normative.
      </p>
      <h2 className="pt-6 text-2xl">Contattaci</h2>
      <p className="">
        Per maggiori informazioni sulle nostre procedure in materia di privacy,
        se hai domande o se vuoi presentare un reclamo, inviaci un&apos;email a
        info@legiumelle.it o contattaci tramite posta ai seguenti recapiti: Via
        Restello 19 35010 Villa del Conte PD Italia
      </p>
    </main>
  );
}
