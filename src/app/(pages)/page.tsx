"use client";

import { installments } from "@/lib/installments";
import { ArrowCircleRight } from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Installments } from "../components/installments";

export default function Home() {
  const [selectedParcela, setSelectedParcela] = useState(1);
  const router = useRouter();

  return (
    <div className="w-screen h-screen flex flex-col items-center px-5 overflow-x-hidden">
      <Image
        src={"/logo.svg"}
        alt="logo"
        width={100}
        height={100}
        className="mt-9"
      />

      <p className="font-extrabold text-2xl mt-10 text-dak mb-8">
        João, como você quer pagar?
      </p>

      <Installments
        slice={[0, 1]}
        title="Pix"
        installments={installments}
        selectedParcela={selectedParcela}
        setSelectedParcela={setSelectedParcela}
        InstallmentsAnnunciation={1}
        AnnunciationHighlight="🤑 R$ 300,00 "
        AnnunciationText="de volta no seu Pix
        na hora"
      />

      <Installments
        slice={1}
        installments={installments}
        title="Pix Parcelado"
        selectedParcela={selectedParcela}
        setSelectedParcela={setSelectedParcela}
        InstallmentsAnnunciation={4}
        AnnunciationHighlight="-3% de juros: "
        AnnunciationText="Melhor opção de parcelamento"
      />

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

      <button
        onClick={() => router.push("/qrcode")}
        className="absolute bottom-5 right-5 cursor-pointer"
      >
        <ArrowCircleRight className="size-10 text-mint-green" />
      </button>
    </div>
  );
}
