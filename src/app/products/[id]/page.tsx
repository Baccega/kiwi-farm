export default function Page(props: { params: { id: string } }) {
   // const addProductToBasket = useBasketStore(
  //   (state) => state.addProductToBasket,
  // );
  return <div>Test{props.params.id}</div>;
}
