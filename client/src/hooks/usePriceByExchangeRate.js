import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function usePriceByExchangeRate(currentPrice) {
  const { i18n } = useTranslation();
  const [priceByExchangeRate, setPriceByExchangeRate] = useState(0);

  const returnExchangeRate = () => {
    switch (i18n.language) {
      case "en":
        return "usd";
      case "ua":
        return "uah";
      default:
        return "usd";
    }
  };

  const exchangeRate = returnExchangeRate();

  useEffect(() => {
    const getFinalPrice = async () => {
      try {
        const res = await axios.get(
          "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json",
        );

        const currentExchangeRate = res.data.usd[exchangeRate];
        const priceAtCurrentRate = currentPrice * currentExchangeRate;

        setPriceByExchangeRate(priceAtCurrentRate.toFixed(2));
      } catch (e) {
        throw Error(e.message);
      }
    };

    getFinalPrice();
  }, [currentPrice, exchangeRate]);

  return priceByExchangeRate;
}
