import { CheckCircle, RadioButtonUnchecked } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import { AnnunciationBadge } from "./annunciation-badge";

interface InstallmentsProps {
  selectedParcela: number;
  setSelectedParcela: (parcela: number) => void;
  slice: number | [number, number];
  title: string;

  InstallmentsAnnunciation?: number;
  AnnunciationHighlight?: string;
  AnnunciationText?: string;

  installments: {
    parcela: number;
    valor: number;
    total: number;
  }[];
}
export function Installments(props: InstallmentsProps) {
  const handleCheckboxChange = (parcela: number) => {
    props.setSelectedParcela(parcela === props.selectedParcela ? 1 : parcela);
  };

  const sliceParams = Array.isArray(props.slice) ? props.slice : [props.slice];

  return (
    <div
      className={`max-w-[429px] w-full flex flex-col mt-3 before:content-['${props.title.replace(
        " ",
        "_"
      )}'] before:relative before:text-dak before:top-3 before:left-4 before:w-max before:bg-soft-gray before:font-extrabold before:leading-6 before:rounded-full before:px-5 before:text-center`}
    >
      {props.installments
        .slice(...sliceParams)
        .map(({ parcela, valor, total }) => (
          <div
            onClick={() => props.setSelectedParcela(parcela)}
            key={parcela}
            className={`px-[21px] py-5 first:border-t-2 border-y-2 cursor-pointer last:border-b-2 border-x-2 first:rounded-t-[10px] last:rounded-b-[10px] ${
              parcela === props.selectedParcela
                ? "border-mint-green bg-mint-green/5 border-b-2"
                : "border-soft-gray border-t-0"
            } 
          ${
            parcela > props.selectedParcela
              ? "border-t-0"
              : "border-b-0 border-t-2"
          }
            
        `}
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
                checked={props.selectedParcela === parcela}
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

            {props.InstallmentsAnnunciation === parcela &&
              props.AnnunciationText &&
              props.AnnunciationHighlight && (
                <AnnunciationBadge
                  highlight={props.AnnunciationHighlight}
                  text={props.AnnunciationText}
                />
              )}
          </div>
        ))}
    </div>
  );
}
