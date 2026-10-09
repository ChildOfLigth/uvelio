import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import usePriceByExchangeRate from "./usePriceByExchangeRate";

export default function useConvertionPrice(currentPrice) {
  const { i18n } = useTranslation();
  const [convertCurrentPrice, setConvertCurrentPrice] = useState(null);
  const priceByExchangeRate = usePriceByExchangeRate(currentPrice);

  const returnCountryCode = () => {
    switch (i18n.language) {
      case "ua":
        return "uk-UA";;
      case "en":
        return "en-US";
      default:
        return "en-US";
    };
  };

  const returnCurrency = () => {
    switch (i18n.language) {
      case "ua":
        return "UAH";
      case "en":
        return "USD";
      default:
        return "USD";
    };
  };

  const formatPrice = () => {
    const price = priceByExchangeRate;
    const priceWithCurrencySign = new Intl.NumberFormat(returnCountryCode(), {
      style: "currency",
      currency: returnCurrency(),
      currencyDisplay: "narrowSymbol",
    }).format(price);
    
    setConvertCurrentPrice(priceWithCurrencySign);
  };

  useEffect(() => {
    formatPrice();
  }, [currentPrice, priceByExchangeRate]);

  return convertCurrentPrice;
}
