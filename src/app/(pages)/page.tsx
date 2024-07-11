"use client";

import { installments } from "@/lib/installments";
import { ArrowCircleRight } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Installments } from "../components/installments";

export default function Home() {
  const [selectedInstallment, setSelectedInstallment] = useState(1);
  const router = useRouter();

  return (
    <div className="flex flex-col items-center px-5">
      <p className="font-extrabold text-2xl mt-10 text-dak mb-8">
        João, como você quer pagar?
      </p>

      <Installments
        slice={[0, 1]}
        title="Pix"
        installments={installments}
        selectedInstallment={selectedInstallment}
        setSelectedInstallment={setSelectedInstallment}
        InstallmentsAnnunciation={1}
        AnnunciationHighlight="🤑 R$ 300,00 "
        AnnunciationText="de volta no seu Pix
        na hora"
      />

      <Installments
        slice={1}
        installments={installments}
        title="Pix Parcelado"
        selectedInstallment={selectedInstallment}
        setSelectedInstallment={setSelectedInstallment}
        InstallmentsAnnunciation={4}
        AnnunciationHighlight="-3% de juros: "
        AnnunciationText="Melhor opção de parcelamento"
      />

      <button
        onClick={() =>
          router.push(`/qrcode?installment=${selectedInstallment}`)
        }
        className="fixed right-5 bottom-5 cursor-pointer"
      >
        <ArrowCircleRight className="size-10 text-mint-green" />
      </button>
    </div>
  );
}
