import { HiExclamationTriangle } from "react-icons/hi2";
import { Alert } from "flowbite-react";

export default function NotSupported({ message }: { message: string }) {
  return (
    <Alert color="failure" icon={HiExclamationTriangle} className="mt-2">
      {message}
    </Alert>
  );
}
