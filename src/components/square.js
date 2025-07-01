export default function Square({ value, on_click }) {
  return (
    <button
      className="w-20 h-20 border border-gray-400 text-3xl font-bold flex items-center justify-center hover:bg-gray-100 transition"
      onClick={on_click}
    >
      {value}
    </button>
  );
}
