import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "~/components/Form";
import ShipmentType from "~/forms/ShipmentType";
import ArticleLayout from "~/layouts/ArticleLayout";
import PaymentMethod from "~/forms/PaymentMethod";
import { useState } from "react";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

export const formSchema = z.object({
  shipmentType: z.union([z.literal("pickup"), z.literal("delivery")]),
  shipmentDetails: z.object({
    name: z.string(),
    surname: z.string(),
    email: z.string().email(),
    phone: z.string().regex(phoneRegex),
    address: z.string(),
    city: z.string(),
    zip: z.string(),
    province: z.string(),
  }),
  paymentMethod: z.union([z.literal("cash"), z.literal("online-payment")]),
});
export type FormSchema = z.infer<typeof formSchema>;

export default function ReserveForm() {
  const [page, setPage] = useState(0);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shipmentType: undefined,
      shipmentDetails: {
        name: "",
        surname: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        zip: "",
        province: "",
      },
      paymentMethod: "cash",
    },
  });

  const onSubmit = (data: FormSchema) => console.log(data);

  return (
    <ArticleLayout
      headline="Prenotazione kiwi"
      title="Prenotazione kiwi | Kiwi Farm"
      description="Prenotazione kiwi"
    >
      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit(onSubmit);
          }}
          className="w-3/5 max-w-[90dvw] space-y-8"
        >
          {/* Shipment type form */}
          {page === 0 && (
            <ShipmentType
              form={form}
              onContinue={() => {
                console.log("continue");
                console.log(form.getValues());
                setPage(1);
              }}
            />
          )}
          {/* Payment method */}
          {page === 1 && (
            <PaymentMethod
              form={form}
              onContinue={() => {
                console.log("continue");
                console.log(form.getValues());
              }}
            />
          )}
        </form>
      </Form>

      {/* Delivery form */}
      {/* <section>
          <form id="delivery" className="w-full">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              placeholder="Nome"
              className="w-full"
            />
            <label htmlFor="surname">Cognome</label>
            <input
              type="text"
              id="surname"
              placeholder="Cognome"
              className="w-full"
            />
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Email"
              className="w-full"
            />
            <label htmlFor="phone">Telefono</label>
            <input
              type="text"
              id="phone"
              placeholder="Telefono"
              className="w-full"
            />
            <label htmlFor="address">Indirizzo</label>
            <input
              type="text"
              id="address"
              placeholder="Indirizzo"
              className="w-full"
            />
            <label htmlFor="city">Città</label>
            <input
              type="text"
              id="city"
              placeholder="Città"
              className="w-full"
            />
            <label htmlFor="zip">CAP</label>
            <input type="text" id="zip" placeholder="CAP" className="w-full" />
            <label htmlFor="province">Provincia</label>
            <input
              type="text"
              id="province"
              placeholder="Provincia"
              className="w-full"
            />
          </form>
        </section> */}
      {/* Payment type */}
      {/* <section>
          <form id="payment-type" className="w-full">
            <label htmlFor="cash">Contanti</label>
            <input type="radio" name="payment-type" id="cash" value="cash" />
            <label htmlFor="card">Pagamento online</label>
            <input
              disabled
              type="radio"
              name="payment-type"
              value="online-payment"
            />
          </form>
        </section> */}
    </ArticleLayout>
  );
}
