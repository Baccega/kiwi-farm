import { CardLayout } from "~/layouts/CardLayout";
import { type UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/Form";
import { Input } from "~/components/Input";
import { type FormSchema } from "~/types/types";

type Props = {
  form: UseFormReturn<FormSchema, unknown, undefined>;
  onContinue: () => void;
};

export default function ShipmentDetails(props: Props) {
  const { form, onContinue } = props;
  const {
    formState: { errors },
  } = form;

  const hasErrors = Boolean(
    errors.shipmentDetails?.address ??
      errors.shipmentDetails?.city ??
      errors.shipmentDetails?.province ??
      errors.shipmentDetails?.zip,
  );

  const shipmentDetails = form.watch("shipmentDetails");
  const isAnyEmpty = Boolean(
    !shipmentDetails.address ||
      !shipmentDetails.city ||
      !shipmentDetails.province ||
      !shipmentDetails.zip,
  );

  return (
    <CardLayout
      isContinueAvailable={!hasErrors && !isAnyEmpty}
      onContinue={onContinue}
      title="Dettagli consegna"
      description="Inserisci i tuoi dati"
    >
      <FormField
        control={form.control}
        name="shipmentDetails.address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Indirizzo</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="shipmentDetails.city"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Città</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="shipmentDetails.zip"
        render={({ field }) => (
          <FormItem>
            <FormLabel>CAP</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
            <FormDescription>
              Per il momento la consegna è disponibile solamente a 30km dallo
              spaccio
            </FormDescription>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="shipmentDetails.province"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Provincia</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </CardLayout>
  );
}
