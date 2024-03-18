import UnderConstruction from "@/components/alerts/under-construction";

export default function Novelty() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-2">Novelty</h1>
      <p>
        This measures how likely it is for a user to get recommendations the are
        not aware of.
      </p>
      <UnderConstruction />
    </div>
  );
}
