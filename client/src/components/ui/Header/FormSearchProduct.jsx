import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { setReplaceFilter } from "@redux/products/productsSlice";

export default function FormSearchProduct() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [_, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const query = form.searchProduct.value.trim();

    if (!query) return;

    dispatch(setReplaceFilter({ key: "name", value: query }));

    if (!location.pathname.includes("catalog")) {
      navigate(`/catalog?name=${query}`);
    } else {
      setSearchParams((searchParams) => {
        searchParams.set("name", query);
        return searchParams;
      });
    }

    form.searchProduct.value = "";
  };

  return (
    <form
      action="/catalog:filter"
      onSubmit={(e) => handleSubmit(e)}
      className="flex items-center justify-between bg-white w-full md:w-[78.8%] h-full rounded-(--base-b-radius) px-5"
    >
      <input
        type="text"
        placeholder={t("header.placeholderInput")}
        className="w-[95%] py-3 text-base outline-none"
        name="searchProduct"
        required
      />

      <button className="w-5 aspect-square flex items-center justify-center changeFillToPrimaryColor">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <path
            d="M19.6 21L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.146 15.3707 4.888 14.112C3.63 12.8533 3.00067 11.316 3 9.5C2.99933 7.684 3.62867 6.14667 4.888 4.888C6.14733 3.62933 7.68467 3 9.5 3C11.3153 3 12.853 3.62933 14.113 4.888C15.373 6.14667 16.002 7.684 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L21 19.6L19.6 21ZM9.5 14C10.75 14 11.8127 13.5627 12.688 12.688C13.5633 11.8133 14.0007 10.7507 14 9.5C13.9993 8.24933 13.562 7.187 12.688 6.313C11.814 5.439 10.7513 5.00133 9.5 5C8.24867 4.99867 7.18633 5.43633 6.313 6.313C5.43967 7.18967 5.002 8.252 5 9.5C4.998 10.748 5.43567 11.8107 6.313 12.688C7.19033 13.5653 8.25267 14.0027 9.5 14Z"
            className="fill-gray-400"
          />
        </svg>
      </button>
    </form>
  );
}
