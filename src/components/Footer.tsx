export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="absolute bottom-2 w-full text-center text-sm text-white/40">
      © Società agricola Kiwi Farm s.s. {year}
    </footer>
  );
}
