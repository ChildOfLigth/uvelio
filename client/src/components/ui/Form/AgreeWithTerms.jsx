import { useTranslation } from "react-i18next";
import CustomCheckbox from "./CustomCheckbox";
import { useState } from "react";

export default function AgreeWithTerms({ checked, setChecked }) {
  const { t } = useTranslation();

  return (
    <>
      <div className="w-full flex items-center justify-start gap-2">
        <CustomCheckbox
          checked={checked}
          setChecked={setChecked}
          onClick={() => setChecked(!checked)}
        />

        <p className="text-(--color-primary) text-xs 2xl:text-base">
          {t("productPage.reviews.newReviewForm.agreementwithTerms.baseText")}{" "}
          <span className="text-(--second-primary-c)">
            {t("productPage.reviews.newReviewForm.agreementwithTerms.span")}
          </span>
        </p>
      </div>
    </>
  );
}
