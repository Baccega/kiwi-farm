import Image from "next/image";

export default async function Page() {
  return (
    <main className="gap-4 pt-header">
      <section className="container relative flex h-full min-h-section flex-col gap-8 py-8 md:flex-row md:px-16">
        <figure className="relative h-80 w-full basis-80 px-12">
          <Image
            src={"/spaccio.jpg" ?? "placeholder.png"}
            alt={""}
            fill={true}
            className="z-20 rounded-lg object-cover"
          />
        </figure>
        <div className="flex grow flex-col gap-4">
          <h1 className="text-3xl font-bold">Il nostro spaccio</h1>
          <p className="">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            malesuada, est vel aliquet aliquet, justo ex lacinia metus, ut
            fermentum neque nunc et est. Nullam nec nunc nec nibh lacinia
            tincidunt. Nullam id nunc auctor, ultricies mi sit amet, auctor
            libero. Nullam nec nunc nec nibh lacinia tincidunt. Nullam id nunc
            auctor, ultricies mi sit amet, auctor libero. Nullam nec nunc nec
            nibh lacinia tincidunt. Nullam id nunc auctor, ultricies mi sit
            amet, auctor libero.{" "}
          </p>
        </div>
      </section>
    </main>
  );
}
