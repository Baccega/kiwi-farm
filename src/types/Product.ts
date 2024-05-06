export type BasketProduct = {
  id: number;
  product: Product;
  quantity: number;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  strikedPrice?: number;
  description: string;
  image: string;
};

export const MOCK_PRODUCT = {
  id: 1,
  name: "Nome",
  price: 19.99,
  strikedPrice: 20,
  description: "Descrizione",
  image: "enea.jpg",
};
