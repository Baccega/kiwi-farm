"use client";
import { ShoppingBasket } from "lucide-react";
import type Stripe from "stripe";
import { useBasketStore } from "~/app/providers";
import ProductQuantityChanger from "~/components/productQuantityChanger";
import { Button } from "~/components/ui/button";
import { getFormattedPrice } from "~/lib/utils";

export function ProductBasketData(props: {
  product: Stripe.Product;
  price: Stripe.Price;
}) {
  const { product, price } = props;

  const basket = useBasketStore((state) => state.basket);

  const addProductToBasket = useBasketStore(
    (state) => state.addProductToBasket,
  );

  const basketProduct = basket.find(
    (basketProduct) => basketProduct.product.id === product.id,
  );

  return (
    <div className="grid-in-price">
      {basketProduct ? (
        <div className="">
          <p className="flex flex-row items-baseline gap-x-2 self-center pb-4 text-lg font-bold grid-in-price @md/basket-product:flex-col-reverse @md/basket-product:self-end">
            {Number(getFormattedPrice(price) * basketProduct.quantity).toFixed(
              2,
            )}{" "}
            €
            <span className="text-sm font-light tracking-wide">
              {getFormattedPrice(price)} € / {product.unit_label ?? "pz"}
            </span>
          </p>
          <ProductQuantityChanger basketProduct={basketProduct} />
        </div>
      ) : (
        <Button
          variant={"default"}
          onClick={() => addProductToBasket(product, price)}
        >
          <ShoppingBasket />
          Add Product to Basket
        </Button>
      )}
    </div>
  );
}
