"use client";

import { Button } from "@/app/components/button";
import { installments } from "@/lib/installments";
import { price } from "@/lib/price";
import { ArrowCircleRight, KeyboardArrowDown } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import Image from "next/image";
import { redirect, useRouter, useSearchParams } from "next/navigation";

export default function Qrcode() {
  const router = useRouter();
  const params = useSearchParams();
  const installmentParams = params.get("installment");

  if (!installmentParams) {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center px- overflow-x-hidden">
      <div className="flex justify-center items-center flex-col gap-5 max-w-[464px] px-4">
        <p className="font-extrabold text-2xl leading-8 mt-10 text-dark-gray max-w-[421px] text-center">
          João, pague a entrada de{" "}
          {price(installments[Number(installmentParams) - 1].valor)} pelo Pix
        </p>

        <div className="border-2 border-mint-green rounded-[10px]">
          <Image
            src={"/qr_code.png"}
            alt="QrCode"
            width={332}
            height={332}
            className="p-2.5"
          />
        </div>

        <Button>
          Clique para copiar QR CODE
          <Image src={"/copy.svg"} width={20} height={20} alt="copy" />
        </Button>

        <div className="flex flex-col text-center leading-5">
          <p className="font-semibold text-light-gray">Prazo de pagamento:</p>
          <p className="font-extrabold text-dark-gray">15/12/2021 - 08:17</p>
        </div>

        <div className="w-full divide-y-2">
          <div className="w-full pb-5">
            <div className="flex justify-between items-center relative top-[6px]">
              <div className="flex items-center gap-2 text-dark-gray leading-6">
                <span className="border-2 rounded-full border-mint-green w-4 h-4" />
                <p className="font-semibold text-lg">1ª entrada no Pix</p>
              </div>
              <p className="font-extrabold text-lg">
                {price(installments[Number(installmentParams) - 1].valor)}
              </p>
            </div>

            <span className="h-5 w-[2px] block relative bg-soft-gray left-[7px]" />

            <div className="flex justify-between items-center relative bottom-[6px]">
              <div className="flex items-center gap-2 text-lighter-gray leading-6">
                <span className="border-2 rounded-full border-soft-gray w-4 h-4" />
                <p className="font-semibold text-lg">2ª no cartão</p>
              </div>
              <p className="font-extrabold text-lg">
                {price(
                  installments[Number(installmentParams) - 1].total /
                    Number(installmentParams) -
                    installments[Number(installmentParams) - 1].total
                )}
              </p>
            </div>
          </div>

          <div className="w-full flex justify-between items-center font-semibold leading-6 text-dark-gray py-5">
            <p className="text-sm">CET: 0,5%</p>
            <p className="text-lg">
              Total: {price(installments[Number(installmentParams) - 1].total)}
            </p>
          </div>

          <div className="w-full p-5">
            <Accordion className="shadow-none w-full">
              <AccordionSummary
                expandIcon={<KeyboardArrowDown />}
                id="panel-header"
                className="font-extrabold leading-5 p-0"
              >
                Como funciona?
              </AccordionSummary>
              <AccordionDetails>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </AccordionDetails>
            </Accordion>
          </div>

          <div className="w-full flex flex-col text-center leading-5 pt-5">
            <p className="font-semibold text-sm text-light-gray">
              Identificador:
            </p>
            <p className="font-extrabold text-dark-gray">
              2c1b951f356c4680b13ba1c9fc889c47
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={() => router.push(`/card?installment=${installmentParams}`)}
        className="fixed bottom-5 right-5 cursor-pointer"
      >
        <ArrowCircleRight className="size-10 text-mint-green" />
      </button>
    </div>
  );
}
