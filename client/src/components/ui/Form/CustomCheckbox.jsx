import cheked from "@imgs/icons/productPage/cheked.svg";

export default function CustomCheckbox({ checked, setChecked, ...props }) {
  return (
    <>
      <label
        htmlFor="agreeWithTerms"
        className={`w-5 h-5 min-w-5 flex items-center justify-center p-0.5 
                  ${checked ? "bg-(--color-primary)" : "bg-white border-2 border-(--base-b-radius)"} 
                  rounded-md transition-colors duration-300 cursor-pointer`}
        {...props}
      >
        <img
          className={`w-5/6 aspect-square ${checked ? "block" : "hidden"}`}
          src={cheked}
        />

        <input
          type="checkbox"
          className="hidden"
          name="agreeWithTerms"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
      </label>
    </>
  );
}
