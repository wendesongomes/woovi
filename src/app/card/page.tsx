"use client";

import { parcelas } from "@/lib/parcelas";
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
import Image from "next/image";
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

  const onSubmit = (data: formData) => {
    console.log(data);
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

      <div className="flex justify-center items-center flex-col gap-5 max-w-[464px] px-4">
        <p className="font-extrabold text-2xl leading-8 mt-10 text-dark-gray max-w-[421px] text-center">
          João, pague o restante em 1x no cartão
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
              defaultValue={parcelas[1].valor}
              {...register("valor")}
            >
              {parcelas.slice(1).map(({ parcela, valor }) => (
                <MenuItem key={parcela} value={valor}>
                  {parcela - 1}x de R${" "}
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(valor)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <button
            type="submit"
            className="bg-deep-blue normal-case w-full px-5 py-2 rounded text-center leading-6 text-lg font-semibold text-white"
          >
            Pagar
          </button>
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
              <p className="font-extrabold text-lg">R$ 15.300,00</p>
            </div>

            <span className="h-5 w-[2px] block relative bg-soft-gray left-[7px]" />

            <div className="flex justify-between items-center relative bottom-[6px]">
              <div className="flex items-center gap-2 text-dark-gray leading-6">
                <span className="border-2 rounded-full border-soft-gray w-4 h-4" />
                <p className="font-semibold text-lg">2ª no cartão</p>
              </div>
              <p className="font-extrabold text-lg">R$ 15.300,00</p>
            </div>
          </div>

          <div className="w-full flex justify-between items-center font-semibold leading-6 text-dark-gray py-5">
            <p className="text-sm">CET: 0,5%</p>
            <p className="text-lg">Total: R$ 30.600,00</p>
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
    </div>
  );
}
