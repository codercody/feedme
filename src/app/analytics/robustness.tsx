import NotSupported from "@/components/alerts/not-supported";

export default function Robustness() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-2">Robustness and stability</h1>
      <p>This measures how much the algorithm is affected by noise.</p>
      <NotSupported message="Robustness and stability metrics are not supported yet." />
    </div>
  );
}
