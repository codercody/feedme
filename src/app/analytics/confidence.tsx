import NotSupported from "@/components/alerts/not-supported";

export default function Confidence() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-2">Confidence and trust</h1>
      <p>
        This measures the level of faith the system (confidence) and user (user)
        has in the recommendations.
      </p>
      <NotSupported message="Confidence and trust metrics are not supported yet." />
    </div>
  );
}
