import {
  BriefcaseBusiness,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";

export default async function Page() {
  return (
    <main className="container flex min-h-section flex-col gap-4 px-6 pb-10 pt-header md:px-16">
      <h1 className="pt-6 text-4xl font-bold">Contatti</h1>
      <div className="flex translate-x-2 flex-col gap-3 md:gap-4">
        <span className="flex justify-center gap-2 md:justify-start">
          <Facebook />
          <Link
            href="https://www.facebook.com/profile.php?id=100095173000490"
            className={buttonVariants({
              variant: "link",
              size: "link",
            })}
          >
            Segui la nostra pagina Facebook
          </Link>
        </span>
        <span className="flex justify-center gap-2 md:justify-start">
          <Instagram />
          <Link
            href="https://www.instagram.com/legiumelle/"
            className={buttonVariants({
              variant: "link",
              size: "link",
            })}
          >
            Seguici su Instagram
          </Link>
        </span>
        <span className="flex justify-center gap-2 md:justify-start">
          <MapPin />
          <Link
            href="https://maps.app.goo.gl/JgZYeZmG7WiTfMWc7"
            className={buttonVariants({
              variant: "link",
              size: "link",
            })}
          >
            Via Restello 19, Villa del Conte, Italy
          </Link>
        </span>
        <span className="flex justify-center gap-2 md:justify-start">
          <Mail />{" "}
          <Link
            href="mailto:info@legiumelle.it"
            className={buttonVariants({
              variant: "link",
              size: "link",
            })}
          >
            info@legiumelle.it
          </Link>
        </span>
        <span className="flex justify-center gap-2 md:justify-start">
          <Phone />{" "}
          <Link
            href="tel:+393460586379"
            className={buttonVariants({
              variant: "link",
              size: "link",
            })}
          >
            +39 346 058 6379
          </Link>
        </span>
        <span className="flex justify-center gap-4 md:justify-start">
          <BriefcaseBusiness /> P.IVA 04682830288
        </span>
      </div>
    </main>
  );
}
