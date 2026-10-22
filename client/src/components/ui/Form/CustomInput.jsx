export default function CustomInput({ customStyle = null, ...props }) {
  return (
    <input
      className={`w-full flex items-center justify-center py-3 px-4 rounded-(--base-b-radius) bg-white shadow-md 
      text-base lg:text-lg ${customStyle !== null ? customStyle : ""}`}
      {...props}
      required
    />
  );
};