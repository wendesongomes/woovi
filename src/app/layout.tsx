import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Woovi",
  description: "Melhor forma de pagar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.className} antialiased`}>
        <header>
          <Image
            src={"/logo.svg"}
            alt="logo"
            width={100}
            height={100}
            className="m-auto mt-9"
          />
        </header>

        {children}

        <footer className="flex gap-2 justify-center items-center mt-10 mb-7">
          <Image
            src={"/shield.svg"}
            alt="Ícone de segurança"
            width={20}
            height={20}
          />
          <p className="text-sm leading-4 font-semibold text-light-gray">
            Pagamento 100% seguro via:
          </p>
          <Image
            src={"/footer_logo.svg"}
            alt="Ícone de segurança"
            width={60}
            height={60}
          />
        </footer>
      </body>
    </html>
  );
}
