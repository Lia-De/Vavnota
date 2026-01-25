import { MdPrint } from "react-icons/md";

export default function PrintButton({ label = "Skriv ut" }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="printHidden btnPrint"
      title="Skriv ut sidan"
    >
      <MdPrint className="icon" />
      <span>{label}</span>
    </button>
  );
}
