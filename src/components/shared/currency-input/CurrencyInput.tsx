import { useEffect, useState, type ChangeEvent } from "react";

type CurrencyInputBRLProps = {
  value: string ;
  name: string;
  onChange: (e: HTMLInputElement) => void;
};

const CurrencyInputBRL: React.FC<CurrencyInputBRLProps> = ({ value, name, onChange }) => {
  const [inputValue, setInputValue] = useState("");

  const formatToBRL = (num: number) => {
    if (isNaN(num)) return "";
    return num.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const parseToNumber = (val: string) => {
    const numeric = val.replace(/\D/g, "");
    return parseFloat(numeric) / 100;
  };

  useEffect(() => {
    if (typeof value === "number") {
      setInputValue(formatToBRL(value));
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseToNumber(e.target.value);
    setInputValue(formatToBRL(value));

    if (onChange) {
      onChange(e);
    }
  };

  return (
    <input
      type="text"
      name={name}
      value={inputValue}
      onChange={handleInputChange}
      placeholder="Valor de Compra"
      className="mr-3 border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}

export default CurrencyInputBRL;
