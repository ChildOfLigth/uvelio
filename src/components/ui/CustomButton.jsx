export default function CustomButton({ children, bgColor="(--color-primary)", w, h, ...props }) {
  return (
    <button
      className={`flex items-center justify-center rounded-(--standart-border-radius) bg-${bgColor} w-${w} h-${h} ${props}`}
    >
      {children}
    </button>
  );
}
