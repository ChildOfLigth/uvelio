import { useTranslation } from "react-i18next";

export default function useReturnExchangeRate() {
  const { i18n } = useTranslation();

  switch (i18n.language) {
    case "en":
      return "usd";
    case "ua":
      return "uah";
    case "fr":
      return "eur";

    default: return "usd";
  };
};
