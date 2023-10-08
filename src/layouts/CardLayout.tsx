import { Button } from "~/components/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/Card";

type Props = {
  children: React.ReactNode;
  title: string;
  description: string;
  onContinue: () => void;
  isContinueAvailable: boolean;
};

export function CardLayout(props: Props) {
  const { children, title, description, onContinue, isContinueAvailable } =
    props;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">{children}</CardContent>
      <CardFooter>
        <Button
          disabled={isContinueAvailable}
          onClick={onContinue}
          className="w-full"
        >
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
}
