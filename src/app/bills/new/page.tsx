import { BillCreateForm } from "@/components/forms/BillCreateForm";
import { BackButton } from "@/components/BackButton";

export default async function NewBillPage() {
  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <BackButton href={'/bills'} title="Volver a boletas"/>

      <h1 className="text-2xl font-bold text-center">Crear nueva boleta</h1>

      <BillCreateForm />
    </div>
  );
}
