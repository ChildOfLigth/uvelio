import { useTranslation } from "react-i18next";
import useTitle from "../../hooks/useTitle"
import { useGenerateMultiLiElems } from "../../hooks/useGenerateMultiLiElems.js";
import { RETURN_TRANSLATE_FUNC_TYPE } from "../../globalVariables.js";

export function AboutUs() {
    useTitle("About us");
    const {t} = useTranslation();
    const uvelioCollectionsBlock = useGenerateMultiLiElems('aboutsUs.uvelioCollectionsBlock.list');
    const listOfBenefits = useGenerateMultiLiElems('aboutUs.companyToday.listOfBenefits');
    const benefitsBlockTopPart = useGenerateMultiLiElems('aboutUs.benefitsBlock.topPart', "text-sm font-medium", {
        htmlCode: [{tag: "h4", keyUsingForTextContent: "count", style: "font-medium"}, {tag: "p", keyUsingForTextContent: "desc"}]
    });

    return (
        <>
        <div className="w-full bg-(--color-primary) flex items-start justify-center h-[70vh] relative overflow-hidden">
            <div className=" w-[90%] h-full flex items-start justify-center mx-auto relative z-30">
                <div className="w-5/6 inline-flex flex-col items-center justify-start gap-[clamp(30px,5vw,50px)]">
                 <div className="w-full inline">
                    <h1>{t('aboutUs.heroBlock.title')}</h1>
                    <h3>{t('aboutUs.heroBlock.subtitle')}</h3>
                 </div>

                 <div className="w-full inline">
                    <p>{t('aboutUs.heroBlock.descriptionBlock.title')}</p>
                    <p>{t('aboutUs.heroBlock.descriptionBlock.description')}</p>
                 </div>
                </div>
            </div>

            <div className="w-full h-full absolute bg-(--color-primary)/60 z-20"></div>
            <img src="" alt="decorate ring" className="absolute z-10"/>
        </div>

        <div className="w-[90%] flex flex-col justify-center mx-auto">
            <section>
                <img src="" alt="decorate element" />
                <div className="">
                    <h5>{t('aboutUs.ourGoal.title')}</h5>
                    <p>{t('aboutUs.ourGoal.description')}</p>
                </div>
            </section>

            <section>
                <img src="" alt="" />
                <div className="">
                    <div className="">
                        <h3>{t('aboutUs.uvelioCollectionsBlock.title')}</h3>
                        <p>{t('aboutUs.uvelioCollectionsBlock.description')}</p>
                    </div>

                    <ul>{t('aboutsUs.uvelioCollectionsBlock.list', )}</ul>

                    <p>{t('aboutUs.uvelioCollectionsBlock.summaryText')}</p>
                </div>
            </section>

            <section>
                <div className="">
                <div className="">
                    <h5>{t('aboutUs.companyToday.title')}</h5>
                    <p>{t('aboutUs.companyToday.description')}</p>
                </div>

                <ul>{...listOfBenefits}</ul>

                <p>{t('aboutUs.companyToday.summaryText')}</p>
                </div>

                <div className="">
                    <ul className="">
                       {...benefitsBlockTopPart}
                    </ul>

                    <ul className=""></ul>
                </div>
            </section>
        </div>
        </>
    )
}