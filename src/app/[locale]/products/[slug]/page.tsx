import { getStripeProduct } from "~/server/stripeQueries";
import { ProductBasketData } from "./_components/productBasketData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import CdnImage from "~/components/cdnImage";
import {
  getStripeIdFromSlug,
  isSlugValid,
  type ProductSlug,
} from "~/lib/products";
import ProductList from "../../_components/ProductList";

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  if (!isSlugValid(slug)) {
    return notFound();
  }

  // Checked slug validity above
  const stripeId = getStripeIdFromSlug(slug as ProductSlug);
  // const t = await getTranslations({ locale, namespace: "Metadata" });
  const product = await getStripeProduct(stripeId);

  return {
    title: product.name,
    description: product.metadata?.[`${locale}_description`],
    alternates: {
      canonical: `/it/products/${slug}`,
      languages: {
        "it-IT": `/it/products/${slug}`,
        "en-US": `/en/products/${slug}`,
      },
    },
    openGraph: {
      images: product.images,
    },
  };
}

export default async function Page(props: {
  params: { slug: string; locale: string };
}) {
  setRequestLocale(props.params.locale);
  if (!isSlugValid(props.params.slug)) {
    return notFound();
  }

  // Checked slug validity above
  const stripeId = getStripeIdFromSlug(props.params.slug as ProductSlug);
  const product = await getStripeProduct(stripeId);

  if (!product?.default_price || typeof product.default_price === "string")
    return notFound();

  return (
    <main
      className="gap-4 pt-header"
      itemType="https://schema.org/Product"
      itemScope
    >
      <section className="container relative flex h-full min-h-section flex-col gap-8 py-8 md:px-16">
        <meta itemProp="name" content={product.name} />
        <h1 className="px-4 text-3xl font-bold md:px-0">{product.name}</h1>
        <div className="flex h-full flex-col gap-8 md:flex-row">
          <figure className="relative h-80 w-full basis-80 px-12 md:min-w-96">
            <Carousel opts={{ loop: true, align: "start" }}>
              <CarouselContent>
                {product.metadata?.images?.split(",").map((image, index) => (
                  <CarouselItem key={index} className="relative h-80">
                    <CdnImage
                      src={image ?? "/placeholder.png"}
                      alt={product.name ?? ""}
                      fill={true}
                      className="z-20 rounded-lg object-cover"
                    />
                    <link itemProp="image" href={image} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </figure>
          <div className="flex grow flex-col gap-4">
            <p className="">
              {product.metadata?.[`${props.params.locale}_description`]}
              <meta
                itemProp="description"
                content={
                  product.metadata?.[`${props.params.locale}_description`]
                }
              />
              <div
                itemProp="brand"
                itemType="https://schema.org/Brand"
                itemScope
              >
                <meta itemProp="name" content="Le Giumelle" />
              </div>
            </p>
            <ProductBasketData
              product={product}
              price={product.default_price}
            />
            <CdnImage
              src={"/logos/sqnpi-logo.png"}
              alt={"Sqnpi logo"}
              width={100}
              height={100}
              className="block object-cover pt-4"
            />
          </div>
        </div>
        <div className="pt-4">
          <h2 className="w-full text-2xl font-bold">Related products</h2>
          <div className="flex w-full flex-wrap gap-8 px-2 pt-8 md:gap-10">
            <ProductList
              filter={(cur) => cur.id !== product.id}
              locale={props.params.locale}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
