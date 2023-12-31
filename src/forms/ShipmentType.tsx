import { Label } from "~/components/Label";
import { RadioGroup, RadioGroupItem } from "~/components/RadioGroup";
import { CardLayout } from "~/layouts/CardLayout";
import { IoStorefront } from "react-icons/io5";
import { FaTruck } from "react-icons/fa";
import { type UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/Form";
import { type FormSchema } from "~/types/types";

type Props = {
  form: UseFormReturn<FormSchema, unknown, undefined>;
  onContinue: () => void;
};

export default function ShipmentType(props: Props) {
  const { form, onContinue } = props;

  const shipmentType = form.watch("shipmentType");

  return (
    <CardLayout
      isContinueAvailable={Boolean(shipmentType)}
      onContinue={onContinue}
      title="Tipo di spedizione"
      description="Seleziona il tipo di spedizione"
    >
      <FormField
        control={form.control}
        name="shipmentType"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <RadioGroup
                onValueChange={
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                  field?.onChange as (value: string) => void
                }
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                defaultValue={field?.value as string}
                className="grid grid-cols-2"
              >
                <FormItem className="">
                  <FormControl>
                    <div>
                      <RadioGroupItem
                        value="pickup"
                        id="pickup"
                        className="peer sr-only"
                      />

                      <Label
                        htmlFor="pickup"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:cursor-pointer hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <IoStorefront className="mb-3 h-6 w-6" />
                        Ritiro in negozio
                      </Label>
                    </div>
                  </FormControl>
                </FormItem>
                <FormItem className="">
                  <FormControl>
                    <div>
                      <RadioGroupItem
                        value="delivery"
                        id="delivery"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="delivery"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:cursor-pointer hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <FaTruck className="mb-3 h-6 w-6" />
                        Consegna a domicilio
                      </Label>
                    </div>
                  </FormControl>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </CardLayout>
  );
}
