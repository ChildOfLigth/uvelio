import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { RETURN_TRANSLATE_FUNC_TYPE } from "../globalVariables";

export default function useTranslatedList(pathToObj, callback) {
  const { t } = useTranslation();

  return useMemo(
    () => [...t(pathToObj, RETURN_TRANSLATE_FUNC_TYPE)].map(callback),
    [t, pathToObj, callback],
  );
}
