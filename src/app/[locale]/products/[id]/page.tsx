import Image from "next/image";
import { getStripePrice, getStripeProduct } from "~/server/stripeQueries";
import { ProductBasketData } from "./_components/productBasketData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { unstable_setRequestLocale } from "next-intl/server";

export default async function Page(props: {
  params: { id: string; locale: string };
}) {
  unstable_setRequestLocale(props.params.locale);
  const product = await getStripeProduct(props.params.id);
  const price = await getStripePrice(product.default_price?.toString() ?? "");

  return (
    <main className="gap-4 pt-header">
      <section className="container relative flex h-full min-h-section flex-col gap-8 py-8 md:px-16">
        <h1 className="px-4 text-3xl font-bold md:px-0">{product.name}</h1>
        <div className="flex h-full flex-col gap-8 md:flex-row">
          <figure className="relative h-80 w-full min-w-96 basis-80 px-12">
            <Carousel opts={{ loop: true, align: "start" }}>
              <CarouselContent>
                {product.metadata?.images?.split(",").map((image, index) => (
                  <CarouselItem key={index} className="relative h-80">
                    <Image
                      src={image ?? "/placeholder.png"}
                      alt={product.name ?? ""}
                      fill={true}
                      className="z-20 rounded-lg object-cover"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </figure>
          <div className="flex grow flex-col gap-4">
            <p className="">{product.metadata?.it_description}</p>
            <ProductBasketData product={product} price={price} />
          </div>
        </div>
      </section>
    </main>
  );
}
