import { setRequestLocale } from "next-intl/server";

export async function generateMetadata() {
  // const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: "Termini e Condizioni",
    alternates: {
      canonical: "/it/terms-and-conditions",
      languages: {
        "it-IT": "/it/terms-and-conditions",
        "en-US": "/en/terms-and-conditions",
      },
    },
  };
}

export default async function Page(props: { params: { locale: string } }) {
  setRequestLocale(props.params.locale);

  return (
    <main className="container flex min-h-section flex-col gap-4 px-6 pb-10 pt-header md:px-16">
      <h1 className="pt-6 text-4xl font-bold">Termini e Condizioni</h1>
      <h2 className="pt-6 text-2xl">Panoramica</h2>
      <p className="">
        Questo sito web è gestito da Società agricola Kiwi Farm S.S.. I termini
        “noi” e “nostro” all&apos;interno del sito si riferiscono a Società
        agricola Kiwi Farm S.S.. Società agricola Kiwi Farm S.S. ti offre questo
        sito web con tutte le informazioni, gli strumenti e i servizi in esso
        disponibili a condizione che tu, in qualità di utente, accetti tutti i
        termini, le condizioni, le informative e le avvertenze qui riportate.
        Visitando il nostro sito e/o acquistando qualcosa da noi, usufruisci del
        nostro “Servizio” e accetti di essere vincolato dai seguenti termini e
        condizioni (“Termini e condizioni del servizio”, “Termini”), che
        includono i termini, le condizioni e le informative aggiuntive citate
        nel presente documento e/o disponibili tramite collegamento
        ipertestuale. I presenti Termini e condizioni del servizio si applicano
        a tutti gli utenti del sito, compresi a titolo esemplificativo e non
        esaustivo visitatori, fornitori, clienti, commercianti e/o autori di
        commenti e altri contenuti. Leggi con attenzione questi Termini e
        condizioni del servizio prima di accedere o utilizzare il nostro sito
        web. Accedendo o utilizzando qualsiasi parte del sito, accetti di essere
        vincolato dai presenti Termini e condizioni del servizio. Se non accetti
        integralmente i termini e le condizioni del presente accordo, non puoi
        accedere al sito web né utilizzare i suoi servizi. Se i presenti Termini
        e condizioni del servizio vengono considerati una proposta,
        l&apos;accettazione è espressamente limitata ai Termini stessi.
        Eventuali nuove funzionalità e strumenti aggiunti all&apos;attuale
        negozio saranno anch&apos;essi soggetti ai Termini e condizioni del
        servizio. Puoi consultare la versione più recente dei Termini e
        condizioni del servizio in qualsiasi momento su questa pagina. Ci
        riserviamo il diritto di aggiornare, modificare o sostituire qualsiasi
        parte dei Termini e condizioni del servizio pubblicando aggiornamenti
        e/o modifiche sul nostro sito web. È tua responsabilità controllare
        periodicamente questa pagina per vedere se sono presenti delle
        modifiche. La prosecuzione dell&apos;utilizzo o dell&apos;accesso al
        sito web dopo la pubblicazione di eventuali modifiche equivale
        all&apos;accettazione di tali modifiche.
      </p>
      <h2 className="pt-6 text-2xl">
        SEZIONE 1 - Termini e condizioni del negozio online
      </h2>
      <p className="">
        Accettando i presenti Termini e condizioni del servizio, dichiari di
        avere almeno la maggiore età nel tuo stato o provincia di residenza, o
        che hai la maggiore età nel tuo stato o provincia di residenza e ci hai
        autorizzato a consentire a qualsiasi minore sotto la tua responsabilità
        di utilizzare questo sito. Non puoi utilizzare i nostri prodotti per
        scopi illegali o non autorizzati né puoi, nell&apos;uso del Servizio,
        violare alcuna legge vigente nel tuo ordinamento (incluse a puro titolo
        esemplificativo le leggi sul copyright). Non ti è consentito diffondere
        worm, virus o altri tipi di codice dannoso. La violazione di una
        qualsiasi disposizione dei Termini comporterà l&apos;immediata
        cessazione del tuo diritto a usare i Servizi.
      </p>
      <h2 className="pt-6 text-2xl">SEZIONE 2 - Condizioni generali</h2>
      <p className="">
        Ci riserviamo il diritto di negare il servizio a chiunque, per qualsiasi
        motivo e in qualsiasi momento. Comprendi che i tuoi contenuti (ad
        eccezione dei dati della carta di credito) possono essere trasferiti in
        chiaro e implicano (a) trasmissioni su varie reti; e (b) modifiche per
        conformarsi e adattarsi ai requisiti tecnici delle reti o dei
        dispositivi di connessione. I dati delle carte di credito vengono sempre
        crittografati durante il trasferimento sulle reti. Accetti di non
        riprodurre, duplicare, copiare, vendere, rivendere o sfruttare alcuna
        parte del Servizio, né l&apos;uso del Servizio, l&apos;accesso al
        Servizio o qualsiasi contatto sul sito web attraverso il quale il
        servizio è fornito senza espressa autorizzazione scritta da parte
        nostra. I titoli utilizzati nel presente accordo sono inclusi solo per
        comodità e non limiteranno né influenzeranno in alcun modo i presenti
        Termini.
      </p>
      <h2 className="pt-6 text-2xl">
        SEZIONE 3 - Precisione, completezza e tempestività delle informazioni
      </h2>
      <p className="">
        Non saremo responsabili nel caso in cui le informazioni rese disponibili
        su questo sito non dovessero risultare accurate, complete o aggiornate.
        I materiali su questo sito sono da intendersi come puramente indicativi
        e non dovranno essere presi a riferimento o utilizzati come unica base
        per prendere decisioni senza consultare fonti di informazione più
        autorevoli, accurate, complete o aggiornate. Facendo affidamento sulle
        informazioni di questo sito te ne assumi il rischio. Questo sito può
        contenere alcune informazioni di carattere storico. Le informazioni
        storiche, necessariamente, non sono attuali e sono fornite solo come
        riferimento. Ci riserviamo il diritto di modificare i contenuti di
        questo sito in qualsiasi momento, ma non siamo soggetti all&apos;obbligo
        di aggiornare alcuna informazione sul nostro sito. Accetti che è tua
        responsabilità monitorare le modifiche al nostro sito.
      </p>
      <h2 className="pt-6 text-2xl">
        SEZIONE 4 - Modifiche al servizio e ai prezzi
      </h2>
      <p className="">
        I prezzi dei nostri prodotti sono soggetti a modifiche senza preavviso.
        Ci riserviamo il diritto di modificare o interrompere il Servizio (o
        qualsiasi sua parte o contenuto) senza preavviso in qualsiasi momento.
        Non saremo responsabili nei confronti tuoi o di terze parti per
        eventuali modifiche, variazioni di prezzo, sospensioni o interruzioni
        del Servizio.
      </p>
      <h2 className="pt-6 text-2xl">
        SEZIONE 5 - Prodotti o servizi (se applicabile)
      </h2>
      <p className="">
        Alcuni prodotti o servizi possono essere disponibili esclusivamente
        online tramite il sito web. Questi prodotti o servizi possono essere
        disponibili in quantità limitate, ed essere soggetti a reso o
        sostituzione solo in base alla nostra Informativa su rimborsi e resi.
        Abbiamo fatto ogni sforzo possibile per mostrare colori e immagini
        fedeli dei prodotti presenti nel negozio. Tuttavia non possiamo
        garantire che i colori visualizzati sullo schermo del tuo computer siano
        accurati. Ci riserviamo il diritto (anche se non siamo obbligati a
        farlo) di limitare la vendita dei nostri prodotti o Servizi nei
        confronti di qualsiasi soggetto, area geografica o giurisdizione.
        Potremo esercitare questo diritto caso per caso. Ci riserviamo il
        diritto di limitare la quantità di prodotti o servizi che offriamo. Le
        descrizioni e i prezzi dei prodotti potranno subire modifiche in
        qualsiasi momento senza alcun preavviso, a nostra esclusiva discrezione.
        Ci riserviamo il diritto di interrompere in ogni momento la vendita di
        un qualsiasi prodotto. La vendita di qualsiasi prodotto o servizio
        tramite questo sito è da considerarsi nulla laddove sia proibita. Non
        garantiamo che la qualità di prodotti, servizi, informazioni o altri
        materiali da te acquistati o ottenuti soddisfi le tue aspettative, né
        che gli eventuali errori del Servizio vengano corretti.
      </p>
      <h2 className="pt-6 text-2xl">
        SEZIONE 6 - Accuratezza delle informazioni di fatturazione e
        dell&apos;account
      </h2>
      <p className="">
        Ci riserviamo il diritto di rifiutare qualsiasi ordine ricevuto. A
        nostra esclusiva discrezione potremo limitare o annullare le quantità
        acquistate per persona, per nucleo familiare o per ordine. Queste
        restrizioni potranno riguardare gli ordini effettuati dallo stesso
        account cliente, con la stessa carta di credito e/o gli ordini che
        utilizzano lo stesso indirizzo di fatturazione e/o di spedizione. In
        caso di modifica o annullamento di un ordine, potremo tentare di
        avvisarti tramite l&apos;indirizzo email, l&apos;indirizzo di
        fatturazione o il numero di telefono forniti al momento
        dell&apos;ordine. Ci riserviamo il diritto di limitare o vietare ordini
        che a nostro insindacabile giudizio sembrino effettuati da grossisti,
        rivenditori o distributori. Accetti di fornire informazioni aggiornate,
        complete e accurate sull&apos;acquisto e sull&apos;account per tutti gli
        acquisti effettuati nel nostro negozio. Accetti di aggiornare
        tempestivamente il tuo account e altri dettagli, come l&apos;indirizzo
        email, il numero e la data di scadenza delle carte di credito, in modo
        che possiamo completare le transazioni e contattarti se necessario. Per
        maggiori informazioni, consulta la nostra Informativa su rimborsi e
        resi.
      </p>
      <h2 className="pt-6 text-2xl">SEZIONE 7 - Strumenti opzionali</h2>
      <p className="">
        Potremo fornirti l&apos;accesso a strumenti di terze parti che non
        monitoriamo e sui quali non abbiamo alcuna forma di controllo o
        gestione. Riconosci e accetti che forniamo l&apos;accesso a tali
        strumenti ”così come sono” e ”come disponibili”, senza alcun tipo di
        garanzia, dichiarazione, condizione o avallo. Non avremo alcuna
        responsabilità derivante da o relativa al tuo utilizzo di strumenti
        opzionali di terze parti. Qualsiasi utilizzo da parte tua degli
        strumenti opzionali offerti attraverso il sito avverrà interamente a tuo
        rischio e discrezione. Starà a te assicurarti di conoscere e approvare i
        termini e le condizioni a cui sono soggetti gli strumenti di terze
        parti. In futuro potremo anche offrire nuovi servizi e/o funzionalità
        attraverso il sito web (ad esempio, introducendo nuovi strumenti e
        risorse). Anche tali nuove funzionalità e/o servizi saranno soggetti ai
        presenti Termini e condizioni del servizio.
      </p>
      <h2 className="pt-6 text-2xl">SEZIONE 8 - Link di terze parti</h2>
      <p className="">
        Alcuni contenuti, prodotti e servizi disponibili tramite il nostro
        Servizio possono includere materiali di terze parti. I link di terze
        parti su questo sito potranno indirizzarti a siti web esterni, che non
        sono affiliati con noi. Noi non siamo responsabili di esaminare o
        valutare i contenuti o l&apos;esattezza di tali siti web. E non forniamo
        alcuna garanzia né abbiamo alcuna responsabilità per materiali o siti
        web di terze parti né per altri materiali, prodotti o servizi di terze
        parti. Non risponderemo di eventuali danni connessi all&apos;acquisto o
        all&apos;utilizzo di beni, servizi, risorse, contenuti o a qualsiasi
        altra transazione effettuata attraverso siti web di terze parti. Esamina
        attentamente le policy e le procedure di terze parti e assicurati di
        averle comprese prima di effettuare qualsiasi transazione. Reclami,
        richieste, dubbi e domande sui prodotti di terze parti dovranno essere
        indirizzati ai terzi interessati.
      </p>
      <h2 className="pt-6 text-2xl">
        SEZIONE 9 - Commenti, feedback e altri materiali inviati
      </h2>
      <p className="">
        Se ci invii online, via email, tramite posta ordinaria o in altro modo
        determinati materiali (congiuntamente denominati “commenti”) — ad
        esempio, su nostra richiesta, contributi per la partecipazione a
        concorsi, oppure senza una nostra richiesta, idee creative,
        suggerimenti, proposte, piani o altri materiali — accetti che possiamo
        in qualsiasi momento e senza limitazioni modificare, copiare,
        pubblicare, distribuire, tradurre o utilizzare in qualsiasi altro modo e
        con qualsiasi mezzo i commenti che ci trasmetti. Non abbiamo e non
        avremo alcun obbligo di (1) mantenere riservati i commenti; (2) pagare
        compensi per i commenti; o (3) rispondere ai commenti. Potremo (senza
        avere alcun obbligo al riguardo) monitorare, modificare e rimuovere
        contenuti che dovessimo a nostra esclusiva discrezione ritenere
        illeciti, offensivi, minacciosi, calunniosi, diffamatori, pornografici,
        osceni o altrimenti discutibili, o contenuti che violino la proprietà
        intellettuale di qualsiasi parte o i presenti Termini e condizioni del
        servizio. Accetti di evitare commenti che ledano i diritti di terze
        parti, tra cui copyright, marchi commerciali, diritto alla privacy,
        diritti della personalità e altri diritti reali o personali. Inoltre
        accetti di non inviare commenti che contengano materiale diffamatorio o
        altrimenti illegale, offensivo o osceno, oppure virus informatici o
        altri malware che rischiano di compromettere il funzionamento del
        Servizio o di qualsiasi sito web correlato. Non potrai utilizzare un
        indirizzo email falso, fingere di essere qualcun altro o altrimenti
        fuorviare noi o terze parti sull&apos;origine di eventuali commenti. Sei
        l&apos;unico responsabile dei commenti che invii e della loro
        accuratezza. Non ci assumiamo e non avremo alcuna responsabilità per
        eventuali commenti pubblicati da te o da terze parti.
      </p>
      <h2 className="pt-6 text-2xl">SEZIONE 10 - Informazioni personali</h2>
      <p className="">
        L&apos;invio di informazioni personali attraverso il negozio è regolato
        dalla nostra Informativa sulla privacy. Clicca qui per visualizzare la
        nostra Informativa sulla privacy.
      </p>
      <h2 className="pt-6 text-2xl">
        SEZIONE 11 - Errori, inesattezze e omissioni
      </h2>
      <p className="">
        Occasionalmente possono essere presenti sul nostro sito o nel Servizio
        informazioni contenenti errori tipografici, inesattezze e omissioni
        riguardanti descrizioni dei prodotti, prezzi, promozioni, offerte, costi
        di spedizione, tempi di consegna o disponibilità dei prodotti. Ci
        riserviamo il diritto di correggere eventuali errori, inesattezze e
        omissioni modificando e aggiornando le informazioni o annullando gli
        ordini, se qualsiasi informazione nel Servizio o su un sito web
        correlato dovesse essere inaccurata, in ogni momento (anche dopo
        l&apos;invio dell&apos;ordine) e senza alcun preavviso. Non ci assumiamo
        alcun obbligo di aggiornare, correggere o chiarire le informazioni nel
        Servizio o in qualsiasi sito web correlato, incluse senza limitazioni le
        informazioni sui prezzi, salvo quanto previsto dalla legge. Nessuna data
        di aggiornamento specificata nel Servizio o in qualsiasi sito web
        correlato dovrà essere interpretata come garanzia che tutte le
        informazioni nel Servizio o in qualsiasi sito web correlato siano state
        corrette e aggiornate.
      </p>
      <h2 className="pt-6 text-2xl">SEZIONE 12 - Usi proibiti</h2>
      <p className="">
        Oltre agli altri divieti stabiliti nei Termini e condizioni del
        servizio, è vietato utilizzare il sito o il suo contenuto: (a) per scopi
        illegali; (b) per indurre altri a compiere o partecipare ad atti
        illeciti; (c) per violare leggi e regolamenti internazionali, federali,
        provinciali o statali, o ordinanze locali; (d) per ledere o violare i
        diritti di proprietà intellettuale nostri o di terzi; (e) per molestare,
        abusare, insultare, danneggiare, diffamare, calunniare, denigrare,
        intimidire o discriminare qualcuno in base a sesso, orientamento
        sessuale, religione, etnia, età, paese di origine o disabilità; (f) per
        fornire informazioni false o fuorvianti; (g) per caricare o trasmettere
        virus o qualsiasi altro tipo di codice dannoso idoneo a influire sulla
        funzionalità o sul funzionamento del Servizio, di qualsiasi sito web
        correlato, di altri siti web o di internet; (h) per raccogliere o
        monitorare le informazioni personali di altri utenti; (i) per spam,
        phishing, pharming, pretexting, uso di spider, crawling o scraping; (j)
        per qualsiasi scopo osceno o immorale; oppure (k) per intralciare o
        aggirare le funzionalità di sicurezza del Servizio o di qualsiasi sito
        web correlato, di altri siti web o di internet. Ci riserviamo il diritto
        di interrompere il tuo utilizzo del Servizio o di qualsiasi sito web
        correlato se violi una qualsiasi delle disposizioni sugli usi proibiti.
      </p>
      <h2 className="pt-6 text-2xl">
        SEZIONE 13 - Esclusione di garanzie; limitazione di responsabilità
      </h2>
      <p className="">
        Non garantiamo, affermiamo o dichiariamo che l&apos;utilizzo del nostro
        servizio sarà ininterrotto, tempestivo, sicuro né privo di errori. Non
        garantiamo che i risultati raggiungibili con l&apos;uso del servizio
        siano accurati o affidabili. Prendi atto che potremo occasionalmente
        sospendere il servizio per periodi di tempo indeterminati, o cancellare
        il servizio in qualsiasi momento senza inviarti alcun preavviso. Accetti
        espressamente che siano a tuo esclusivo rischio l&apos;utilizzo e
        l&apos;impossibilità di utilizzare il servizio. Il servizio e tutti i
        prodotti e servizi forniti tramite il servizio vengono (salvo quanto da
        noi espressamente dichiarato) offerti ”così come sono” e ”come
        disponibili” per l&apos;uso da parte dell&apos;utente, senza
        dichiarazioni, garanzie o condizioni di alcun tipo, espresse o
        implicite, tra cui garanzie implicite o condizioni di commerciabilità,
        qualità commerciabile, idoneità per uno scopo specifico, durata,
        titolarità e assenza di violazioni. In nessun caso Società agricola Kiwi
        Farm S.S. e i suoi amministratori, dirigenti, dipendenti, affiliati,
        agenti, appaltatori, stagisti, fornitori, fornitori di servizi o
        concessori di licenza saranno responsabili per qualsiasi pregiudizio,
        perdita, reclamo o per un danno diretto, indiretto, incidentale,
        punitivo, speciale o consequenziale di qualsiasi tipo — inclusi senza
        limitazione profitti persi, mancati guadagni, risparmi persi, perdita di
        dati, costi di sostituzione o altri danni simili, in virtù di contratto,
        illecito civile (anche dovuto a negligenza), responsabilità oggettiva o
        altro — derivante dall&apos;utilizzo di uno qualsiasi dei servizi o
        prodotti ottenuti utilizzando il servizio, né per qualsiasi altro
        reclamo relativo comunque all&apos;utilizzo del servizio o prodotto,
        compresi, a titolo esemplificativo ma non esaustivo, eventuali errori o
        omissioni nei contenuti, perdite e danni di qualsiasi genere legati
        all&apos;uso del servizio o di qualsiasi contenuto (o prodotto)
        pubblicato, trasmesso o reso altrimenti disponibile attraverso il
        servizio, anche se informati di tale eventualità. Poiché alcuni stati o
        giurisdizioni non consentono l&apos;esclusione o la limitazione di
        responsabilità per danni conseguenti o incidentali, in tali stati o
        giurisdizioni la nostra responsabilità sarà limitata fino al limite
        massimo consentito dalla legge.
      </p>
      <h2 className="pt-6 text-2xl">SEZIONE 14 - Indennizzo</h2>
      <p className="">
        Accetti di risarcire, difendere e tenere indenne Società agricola Kiwi
        Farm S.S. e le sue imprese controllanti, controllate e affiliate, nonché
        i suoi partner, dirigenti, amministratori, agenti, appaltatori,
        concessori di licenza, fornitori di servizi, subappaltatori, fornitori,
        stagisti e dipendenti da qualsiasi rivendicazione o richiesta, incluse
        le spese legali in misura ragionevole, avanzata da qualsiasi soggetto
        terzo e dovuta o derivante dalla tua violazione dei presenti Termini e
        condizioni del servizio o dei documenti in essi incorporati mediante
        riferimento, o dalla tua violazione di qualsiasi legge o diritto di
        terze parti.
      </p>
      <h2 className="pt-6 text-2xl">SEZIONE 15 - Separabilità</h2>
      <p className="">
        Nel caso in cui una qualsiasi disposizione dei presenti Termini e
        condizioni del servizio sia ritenuta illegale, nulla o inapplicabile,
        tale disposizione sarà comunque applicabile nella misura massima
        consentita dalla legge vigente e la parte inapplicabile sarà considerata
        scissa dai presenti Termini e condizioni del servizio, senza pregiudizio
        per la validità e l&apos;applicabilità delle disposizioni rimanenti.
      </p>
      <h2 className="pt-6 text-2xl">SEZIONE 16 - Risoluzione</h2>
      <p className="">
        Gli obblighi e le responsabilità assunti dalle parti prima della data di
        cessazione sopravvivranno a tutti gli effetti alla risoluzione del
        presente accordo. I presenti Termini e condizioni del servizio saranno
        efficaci fino al recesso da parte tua o nostra. Potrai risolvere i
        presenti Termini e condizioni del servizio in qualsiasi momento
        informandoci che non desideri più utilizzare i nostri Servizi, o
        interrompendo l&apos;utilizzo del nostro sito. Inoltre, se a nostro
        insindacabile giudizio tu violi o sospettiamo che abbia violato una
        qualsiasi disposizione dei presenti Termini e condizioni del servizio,
        potremo risolvere il presente accordo in qualsiasi momento senza
        preavviso e tu resterai responsabile per tutte le somme dovute fino alla
        data di cessazione inclusa; di conseguenza potremo negarti
        l&apos;accesso ai Servizi (o a una qualsiasi parte di essi).
      </p>
      <h2 className="pt-6 text-2xl">SEZIONE 17 - Intero accordo</h2>
      <p className="">
        Il mancato esercizio o applicazione di qualsiasi diritto o disposizione
        dei presenti Termini e condizioni del servizio non costituirà una
        rinuncia a tale diritto o disposizione. I presenti Termini e condizioni
        del servizio e le eventuali informative o regole operative pubblicate da
        noi su questo sito o in relazione al Servizio costituiscono
        l&apos;intero accordo e intesa tra te e noi e disciplinano
        l&apos;utilizzo del Servizio da parte tua, sostituendo qualsiasi
        accordo, comunicazione e proposta precedente o contemporanea, sia orale
        che scritta, tra te e noi (incluse, senza limitazione, eventuali
        versioni precedenti dei Termini e condizioni del servizio). Eventuali
        ambiguità nell&apos;interpretazione dei presenti Termini e condizioni
        del servizio non dovranno essere interpretate contro la parte scrivente.
      </p>
      <h2 className="pt-6 text-2xl">SEZIONE 18 - Legge applicabile</h2>
      <p className="">
        I presenti Termini e condizioni del servizio e gli eventuali accordi
        separati in base ai quali ti forniamo i Servizi saranno regolati e
        interpretati in conformità con le leggi vigenti in Via Restello 19 35010
        Villa del Conte PD Italia.
      </p>
      <h2 className="pt-6 text-2xl">
        SEZIONE 19 - Modifiche ai termini e condizioni del servizio
      </h2>
      <p className="">
        Puoi consultare la versione più aggiornata dei Termini e condizioni del
        servizio in qualsiasi momento su questa pagina. Ci riserviamo il diritto
        a nostra esclusiva discrezione di aggiornare, modificare o sostituire
        qualsiasi parte dei presenti Termini e condizioni del servizio
        pubblicando aggiornamenti e modifiche sul nostro sito web. È tua
        responsabilità controllare periodicamente la presenza di modifiche nel
        nostro sito web. La prosecuzione dell&apos;uso o dell&apos;accesso al
        sito web o al Servizio dopo la pubblicazione di eventuali modifiche ai
        presenti Termini e condizioni del servizio costituisce accettazione di
        tali modifiche.
      </p>
      <h2 className="pt-6 text-2xl">SEZIONE 20 - Contatti</h2>
      <p className="">
        Eventuali domande relative ai Termini e condizioni del servizio dovranno
        esserci inviate all&apos;indirizzo info@legiumelle.it.
      </p>
    </main>
  );
}
