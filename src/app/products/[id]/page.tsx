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

export default async function Page(props: { params: { id: string } }) {
  const product = await getStripeProduct(props.params.id);
  const price = await getStripePrice(product.default_price?.toString() ?? "");

  return (
    <main className="gap-4 pt-header">
      <section className="container relative flex h-full min-h-section flex-col gap-8 py-8 md:flex-row md:px-16">
        <figure className="relative h-80 w-full basis-80 px-12">
          <Carousel opts={{ loop: true, align: "start" }}>
            <CarouselContent>
              {product.images.map((image, index) => (
                <CarouselItem key={index} className="relative h-80">
                  <Image
                    src={image ?? "placeholder.png"}
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
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="">{product.description}</p>
          <ProductBasketData product={product} price={price} />
        </div>
      </section>
    </main>
  );
}
