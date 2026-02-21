import { useConvertionPrice } from "../../hooks/useConvertionPrice";
import useReturnExchangeRate from "../../hooks/useReturnExchangeRate";

export default function ProductCard({ imgSrc, name, price, sale }) {
  const exchangeRate = useReturnExchangeRate();

  const returnCleanPrice = (price) => {
    const priceTypeStr = String(price);
    if (priceTypeStr.length < 4) return price;

    return priceTypeStr.split(",").join("");
  };

  const cleanPrice = returnCleanPrice(price);
  const cleanSalePrice = sale ? returnCleanPrice(sale) : null;

  const presentPrice = useConvertionPrice(cleanPrice, exchangeRate);
  const presentSalePrice =
    cleanSalePrice != null && useConvertionPrice(cleanSalePrice, exchangeRate);

  return (
    <article className="bg-white h-auto rounded-(--border-radius) flex flex-col items-center justify-between overflow-hidden cursor-pointer">
      <img src={imgSrc} alt={name} className="w-5/6 aspect-square" />

      <div className="w-[90%] flex flex-col items-start justify-center">
        <h5 className="w-5/6 inline-block text-xs font-normal text-(--color-primary) leading-normal text-left 2xl:text-base">
          {name}
        </h5>

        <span className="font-bold text-(--color-primary) my-1 text-[clamp(1rem,0.94rem+0.3vw,1.207rem)] ">
          {sale ? (
            <>
              <div className="flex flex-col items-center justify-center">
                <s className="text-sm text-(--color-primary)/70 font-normal">
                  <data value={cleanPrice}>{presentPrice}</data>
                </s>
                <data value={cleanSalePrice}>{presentSalePrice}</data>
              </div>
            </>
          ) : (
            <data value={cleanPrice}>{presentPrice}</data>
          )}
        </span>

        <div className="w-full flex items-center justify-center gap-1">
          <button className="w-5/6 flext items-center justify-center bg-(--color-primary) rounded-(--border-radius)"></button>
          <button></button>
        </div>
      </div>
    </article>
  );
}
