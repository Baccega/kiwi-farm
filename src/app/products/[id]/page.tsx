import Image from "next/image";
import { getStripePrice, getStripeProduct } from "~/server/stripeQueries";
import { ProductBasketData } from "./_components/productBasketData";

export default async function Page(props: { params: { id: string } }) {
  const product = await getStripeProduct(props.params.id);
  const price = await getStripePrice(product.default_price?.toString() ?? "");

  return (
    <div className="grid-areas-product-sm md:grid-areas-product grid-cols-product grid-rows-product relative grid gap-4">
      <h1 className="text-2xl font-bold grid-in-name">{product.name}</h1>
      <p className="grid-in-description">{product.description}</p>
      <figure className="w-[300px] h-[300px] relative block grid-in-image">
        {product.images[0] !== null ? (
          <Image
            src={product.images?.[0] ?? "placeholder.png"}
            alt={product.name ?? ""}
            width={300}
            height={300}
            className="w-[300px] h-[300px] z-20 rounded-lg object-cover"
          />
        ) : null}
      </figure>
      <ProductBasketData product={product} price={price} />
    </div>
  );
}
