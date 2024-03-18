import { HiWrenchScrewdriver } from "react-icons/hi2";
import { Alert } from "flowbite-react";

export default function UnderConstruction() {
  return (
    <Alert color="warning" icon={HiWrenchScrewdriver} className="mt-2">
      Under construction.
    </Alert>
  );
}
