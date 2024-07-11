"use client";

import { Button } from "@/app/components/button";
import { installments } from "@/lib/installments";
import { price } from "@/lib/price";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, KeyboardArrowDown } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { redirect, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Card() {
  const zodform = z.object({
    name: z.string().min(5, "Nome completo"),
    cpf: z.string().min(11, "CPF Obrigatorio"),
    number: z.string().min(16, "Numero do Cartão Obrigatorio"),
    val: z.string().min(4, "Validade Obrigatorio"),
    cvv: z.string().min(3, "CVV Obrigatorio"),
    valor: z.number(),
  });

  type formData = z.infer<typeof zodform>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(zodform),
  });

  const params = useSearchParams();
  const installmentParams = params.get("installment");

  if (!installmentParams) {
    redirect("/");
  }

  const onSubmit = (data: formData) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center px-5">
      <div className="flex justify-center items-center flex-col gap-5 max-w-[464px] px-4">
        <p className="font-extrabold text-2xl leading-8 mt-10 text-dark-gray max-w-[421px] text-center">
          João, pague o restante em {installmentParams}x no cartão
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-7"
        >
          <TextField
            error={!!errors.name}
            {...register("name")}
            required
            id="outlined-error"
            label="Nome completo"
            placeholder="João Linaldo Dias Fraga Santos"
          />

          <TextField
            error={!!errors.cpf}
            {...register("cpf")}
            required
            type="number"
            id="outlined-error"
            label="CPF"
            placeholder="405.503.503-15"
          />

          <TextField
            error={!!errors.number}
            {...register("number")}
            required
            type="number"
            id="outlined-error"
            label="Número do cartão"
            placeholder="405.503.503-15"
          />

          <div className="flex justify-between gap-5">
            <TextField
              error={!!errors.val}
              {...register("val")}
              required
              type="number"
              id="outlined-error"
              label="Vencimento"
              placeholder="10/11"
            />

            <TextField
              error={!!errors.cvv}
              {...register("cvv")}
              required
              type="number"
              id="outlined-error"
              label="CVV"
              placeholder="405"
            />
          </div>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Parcelas</InputLabel>
            <Select
              error={!!errors.valor}
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="parcelas"
              defaultValue={installments[Number(installmentParams) - 2].valor}
              {...register("valor")}
            >
              {installments.slice().map(({ parcela, valor }) => (
                <MenuItem key={parcela} value={valor}>
                  {parcela}x de R${" "}
                  {price(
                    (installments[Number(installmentParams) - 1].total /
                      Number(installmentParams) -
                      installments[Number(installmentParams) - 1].total) /
                      parcela
                  )}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button>Pagar</Button>
        </form>

        <div className="flex flex-col text-center leading-5">
          <p className="font-semibold text-light-gray">Prazo de pagamento:</p>
          <p className="font-extrabold text-dark-gray">15/12/2021 - 08:17</p>
        </div>

        <div className="w-full divide-y-2">
          <div className="w-full pb-5">
            <div className="flex justify-between items-center relative top-[6px]">
              <div className="flex items-center gap-2 text-dark-gray leading-6">
                <span className="rounded-full bg-mint-green w-4 h-4 flex justify-center items-center">
                  <Check className="size-3 text-white" />
                </span>
                <p className="font-semibold text-lg">1ª entrada no Pix</p>
              </div>
              <p className="font-extrabold text-lg">
                {price(installments[Number(installmentParams) - 1].valor)}
              </p>
            </div>

            <span className="h-5 w-[2px] block relative bg-soft-gray left-[7px]" />

            <div className="flex justify-between items-center relative bottom-[6px]">
              <div className="flex items-center gap-2 text-dark-gray leading-6">
                <span className="border-2 rounded-full border-soft-gray w-4 h-4" />
                <p className="font-semibold text-lg">2ª no cartão</p>
              </div>
              <p className="font-extrabold text-lg">
                {" "}
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
    </div>
  );
}
