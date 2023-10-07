import { useForm } from "react-hook-form";
import ArticleLayout from "~/layouts/ArticleLayout";

export default function ReserveForm() {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();

  // const onSubmit = (data) => console.log(data);

  return (
    <ArticleLayout
      headline="Prenotazione kiwi"
      title="Prenotazione kiwi | Kiwi Farm"
      description="Prenotazione kiwi"
    >
      {/* Shipment type form */}
      <section>
        <form id="shipment-type" className="w-full">
          <input type="radio" name="shipment-type" value="pickup" />
          <input type="radio" name="shipment-type" value="delivery" />
        </form>
      </section>
      {/* Delivery form */}
      <section>
        <form id="delivery" className="w-full">
          <input type="text" placeholder="Nome" className="w-full" />
          <input type="text" placeholder="Cognome" className="w-full" />
          <input type="text" placeholder="Email" className="w-full" />
          <input type="text" placeholder="Telefono" className="w-full" />
          <input type="text" placeholder="Indirizzo" className="w-full" />
          <input type="text" placeholder="Città" className="w-full" />
          <input type="text" placeholder="CAP" className="w-full" />
          <input type="text" placeholder="Provincia" className="w-full" />
        </form>
      </section>
      {/* Payment type */}
      <section>
        <form id="payment-type" className="w-full">
          <input type="radio" name="payment-type" value="cash" />
          <input
            disabled
            type="radio"
            name="payment-type"
            value="online-payment"
          />
        </form>
      </section>
    </ArticleLayout>
  );
}
