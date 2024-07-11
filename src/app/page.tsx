"use client";

import { parcelas } from "@/lib/parcelas";
import {
  ArrowCircleRight,
  CheckCircle,
  RadioButtonUnchecked,
} from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [selectedParcela, setSelectedParcela] = useState(1);
  const router = useRouter();

  const handleCheckboxChange = (parcela: number) => {
    setSelectedParcela(parcela === selectedParcela ? 1 : parcela);
  };

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

      {parcelas.slice(0, 1).map(({ parcela, valor }) => (
        <div
          key={parcela}
          onClick={() => setSelectedParcela(parcela)}
          className={`max-w-[429px] cursor-pointer w-full rounded-[10px] border-2 flex flex-col px-[21px] pb-[23px] before:content-['Pix'] before:relative before:text-dak before:bottom-3 before:w-max before:bg-soft-gray before:font-extrabold before:leading-6 before:rounded-full before:px-5 before:text-center ${
            parcela === selectedParcela
              ? "border-mint-green"
              : "border-pale-gray"
          }`}
        >
          <div className="flex justify-between">
            <p className="font-extrabold text-2xl text-dak leading-8">
              {parcela}x{" "}
              <span className="font-semibold">
                R${" "}
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(valor)}
              </span>
            </p>

            <Checkbox
              name="parcela"
              checked={selectedParcela === parcela}
              onChange={() => handleCheckboxChange(parcela)}
              icon={<RadioButtonUnchecked className="text-soft-gray" />}
              checkedIcon={<CheckCircle className="text-mint-green" />}
            />
          </div>
          <p className="text-mint-green leading-5 font-semibold mb-2">
            Ganhe <span className="font-extrabold">3%</span> de Cashback
          </p>
          <div className="bg-deep-blue rounded flex justify-between items-center">
            <p className="font-semibold leading-5 text-white p-2">
              🤑 <span className="font-extrabold">R$ 300,00</span> de volta no
              seu Pix na hora
            </p>
            <span className="[clip-path:polygon(0%_50%,100%_0%,100%_100%)] bg-white size-7 relative left-1" />
          </div>
        </div>
      ))}

      <div className="max-w-[429px] w-full flex flex-col mt-3 before:content-['Pix_Parcelado'] before:relative before:text-dak before:top-3 before:left-4 before:w-max before:bg-soft-gray before:font-extrabold before:leading-6 before:rounded-full before:px-5 before:text-center">
        {parcelas.slice(1).map(({ parcela, valor, total, melhorOpcao }) => (
          <div
            onClick={() => setSelectedParcela(parcela)}
            key={parcela}
            className={`px-[21px] py-5 first:border-t-2 border-y-2 cursor-pointer last:border-b-2 border-x-2 first:rounded-t-[10px] last:rounded-b-[10px] ${
              parcela === selectedParcela
                ? "border-mint-green border-b-2"
                : "border-soft-gray border-b-0"
            }`}
          >
            <div className="flex justify-between">
              <p className="font-extrabold text-2xl text-dak leading-8">
                {parcela}x{" "}
                <span className="font-semibold">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(valor)}
                </span>
              </p>

              <Checkbox
                name="parcela"
                checked={selectedParcela === parcela}
                onChange={() => handleCheckboxChange(parcela)}
                icon={<RadioButtonUnchecked className="text-soft-gray" />}
                checkedIcon={<CheckCircle className="text-mint-green" />}
              />
            </div>
            <p className="text-lighter-gray leading-5 font-semibold">
              total: R${" "}
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(total)}
            </p>
            {melhorOpcao && (
              <div className="bg-deep-blue rounded mt-2 flex justify-between items-center">
                <p className="font-extrabold leading-5 text-white p-2">
                  -3% de juros:{" "}
                  <span className="font-semibold">
                    Melhor opção de parcelamento
                  </span>
                </p>
                <span className="[clip-path:polygon(0%_50%,100%_0%,100%_100%)] bg-white size-7 relative left-1" />
              </div>
            )}
          </div>
        ))}
      </div>

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
