import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export const useConvertionPrice = (currentPrice, exchangeRate = "usd") => {
  const { i18n } = useTranslation();
  const [convertCurrentPrice, setConvertCurrentPrice] = useState(null);
  const countryCode = useSelector((state) => state.userAccount.accountData.countryCode);

  const getPrice = async () => {
    try {
      const res = await axios.get(
        "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json",
      );

      const currentExchangeRate = res.data.usd[exchangeRate];
      const priceAtCurrentRate = currentPrice * currentExchangeRate;

      return priceAtCurrentRate.toFixed(2);
    } catch (e) {
        throw Error(e.message);
    }
  };

  const returnCountryCode = () => {
    switch (i18n.language) {
      case "ua":
        return "uk-UA";
      case "fr":
        return "fr-FR";
      case "en":
        return "en-US";
      default:
        return "en-US";
    }
  };

  const formatPrice = async () => {
    const price = await getPrice();
    const priceWithCurrencySign = new Intl.NumberFormat(returnCountryCode(), {
      style: "currency",
      currency: countryCode,
      currencyDisplay: 'narrowSymbol'
    }).format(price);

    setConvertCurrentPrice(priceWithCurrencySign);
  };

  useEffect(() => {
    formatPrice();
  }, [currentPrice, exchangeRate]);

  return convertCurrentPrice;
};
