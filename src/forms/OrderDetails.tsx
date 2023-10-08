import { CardLayout } from "~/layouts/CardLayout";
import { type UseFormReturn } from "react-hook-form";
import { type FormSchema } from "~/pages/reserve-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/Form";
import { Input } from "~/components/Input";
import { env } from "~/env.mjs";

type Props = {
  form: UseFormReturn<FormSchema, unknown, undefined>;
  onContinue: () => void;
};

export default function OrderDetails(props: Props) {
  const { form, onContinue } = props;
  const {
    formState: { errors },
  } = form;

  const hasErrors = Boolean(
    errors.orderDetails?.email ??
      errors.orderDetails?.phone ??
      errors.orderDetails?.name ??
      errors.orderDetails?.surname ??
      errors.orderDetails?.kiwiKg,
  );
  const isAnyEmpty = Boolean(
    !form.getValues().orderDetails.email ||
      !form.getValues().orderDetails.phone ||
      !form.getValues().orderDetails.name ||
      !form.getValues().orderDetails.surname ||
      !form.getValues().orderDetails.kiwiKg,
  );

  const kgKiwi = form?.getValues()?.orderDetails?.kiwiKg ?? 0;
  const priceStr =
    kgKiwi > 0 ? ` (${kgKiwi * Number(env.NEXT_PUBLIC_KIWI_PRICE)} €)` : "";

  return (
    <CardLayout
      isContinueAvailable={!hasErrors && !isAnyEmpty}
      onContinue={onContinue}
      title="Dettagli ordine"
      description="Inserisci i tuoi dati"
    >
      <FormField
        control={form.control}
        name="orderDetails.kiwiKg"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Kg. Kiwi{priceStr}</FormLabel>
            <FormControl>
              <Input type="number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="orderDetails.name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="orderDetails.surname"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cognome</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="orderDetails.email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="orderDetails.phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Telefono</FormLabel>
            <FormControl>
              <Input type="tel" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </CardLayout>
  );
}
