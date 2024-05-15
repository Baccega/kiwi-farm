import { Modal } from "~/components/modal";
import ProductPage from "~/app/products/[id]/page";

export default function ProductsModal(props: { params: { id: string } }) {
  return (
    <Modal>
      <ProductPage {...props} />
    </Modal>
  );
}
