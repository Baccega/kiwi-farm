import { Label } from "~/components/Label";
import { RadioGroup, RadioGroupItem } from "~/components/RadioGroup";
import { CardLayout } from "~/layouts/CardLayout";
import { IoGlobeOutline } from "react-icons/io5";
import { FaTruck } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";
import { type UseFormReturn } from "react-hook-form";
import { type FormSchema } from "~/pages/reserve-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/Form";

type Props = {
  form: UseFormReturn<FormSchema, unknown, undefined>;
  onContinue: () => void;
};

export default function PaymentMethod(props: Props) {
  const { form, onContinue } = props;

  return (
    <CardLayout
      isContinueAvailable={true}
      onContinue={onContinue}
      title="Metodo di pagamento"
      description="Seleziona il metodo di pagamento"
    >
      <FormField
        control={form.control}
        name="paymentMethod"
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
                        value="cash"
                        id="cash"
                        className="peer sr-only"
                      />

                      <Label
                        htmlFor="cash"
                        className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground flex flex-col items-center justify-between rounded-md border-2 p-4 hover:cursor-pointer peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <BsCashCoin className="mb-3 h-6 w-6" />
                        Contanti
                      </Label>
                    </div>
                  </FormControl>
                </FormItem>
                <FormItem className="">
                  <FormControl>
                    <div>
                      <RadioGroupItem
                        value="online-payment"
                        id="online-payment"
                        className="peer sr-only"
                        disabled
                      />
                      <Label
                        htmlFor="online-payment"
                        className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground flex flex-col items-center justify-between rounded-md border-2 p-4 hover:cursor-pointer peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <IoGlobeOutline className="mb-3 h-6 w-6" />
                        Pagamento online
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
