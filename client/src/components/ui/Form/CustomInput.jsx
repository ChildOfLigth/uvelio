export default function CustomInput({ type = "text", name, placeholder, ...props }) {
  return (
    <input
      className="w-full flex items-center justify-center py-3 px-4 rounded-(--base-b-radius) bg-white shadow-md 
      text-base lg:text-lg"
      type={type}
      name={name}
      placeholder={placeholder}
      {...props}
      required
    />
  );
}
