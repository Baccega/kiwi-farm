import Link, { type LinkProps } from "next/link";
import { type IconType } from "react-icons";

export default function LinkButton(
  props: { children: React.ReactNode; Icon: IconType } & LinkProps,
) {
  const { children, Icon, ...rest } = props;

  return (
    <Link
      className="flex aspect-video w-64 flex-col items-center justify-center gap-8 rounded-md border border-white p-4 text-lg transition-all hover:scale-105 hover:bg-white hover:text-primary"
      {...rest}
    >
      {<Icon size={48} />}
      {children}
    </Link>
  );
}
