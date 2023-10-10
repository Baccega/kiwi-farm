import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "~/components/Form";
import ShipmentType from "~/forms/ShipmentType";
import ArticleLayout from "~/layouts/ArticleLayout";
import PaymentMethod from "~/forms/PaymentMethod";
import { useState } from "react";
import OrderDetails from "~/forms/OrderDetails";
import ShipmentDetails from "~/forms/ShipmentDetails";
import { type FormSchema, formSchema } from "~/types/types";
import { api } from "~/utils/api";

export default function ReserveForm() {
  const [page, setPage] = useState(0);
  const addOrder = api.orders.add.useMutation();

  const form = useForm<FormSchema>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
    defaultValues: {
      orderDetails: {
        name: "",
        surname: "",
        email: "",
        phone: "",
        kiwiKg: 5,
      },
      shipmentDetails: {
        address: "",
        city: "",
        zip: "",
        province: "",
      },
      paymentMethod: "cash",
    },
  });

  const onSubmit = (data: FormSchema) => {
    console.log("New order:", data);
    addOrder.mutate(data);
  };

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
          {/* Order details */}
          {page === 0 && (
            <OrderDetails
              form={form}
              onContinue={() => {
                setPage(1);
              }}
            />
          )}
          {/* Shipment type */}
          {page === 1 && (
            <ShipmentType
              form={form}
              onContinue={() => {
                if (form.getValues().shipmentType === "pickup") {
                  setPage(3);
                } else {
                  setPage(2);
                }
              }}
            />
          )}
          {/* Shipment details type */}
          {page === 2 && (
            <ShipmentDetails
              form={form}
              onContinue={() => {
                setPage(3);
              }}
            />
          )}
          {/* Payment method */}
          {page === 3 && (
            <PaymentMethod
              form={form}
              onContinue={() => {
                onSubmit(form.getValues());
              }}
            />
          )}
        </form>
      </Form>
    </ArticleLayout>
  );
}
