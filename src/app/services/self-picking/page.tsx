import Image from "next/image";

export default async function Page() {
  return (
    <main className="gap-4 pt-header">
      <section className="container relative flex h-full min-h-section flex-col gap-8 py-8 md:flex-row md:px-16">
        <figure className="relative h-80 w-full basis-80 px-12">
          <Image
            src={"/self-picking.jpg" ?? "placeholder.png"}
            alt={""}
            fill={true}
            className="z-20 rounded-lg object-cover"
          />
        </figure>
        <div className="flex grow flex-col gap-4">
          <h1 className="text-3xl font-bold">Autoraccolta</h1>
          <h2 className="text-xl">Vieni a raccogliere i tuoi kiwi direttamente dall'albero!</h2>
          <p className="">
            Servizio disponibile tutti i giorni dal 25 ottobre in poi dalle 8:00 alle 17:00.
          </p>
          <p className="">
            I bambini sono i benvenuti!
          </p>
          <p className="">
            Consigliamo abbigliamento e scarpe comode o stivali.
          </p>
        </div>
      </section>
    </main>
  );
}
