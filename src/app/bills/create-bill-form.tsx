"use client";

import { useState } from "react";
import { createBill } from "./actions";
import { useRouter } from "next/navigation";

export default function CreateBillForm() {
  const [name, setName] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await createBill({ name });
    setName("");
    router.refresh(); // Recarga los datos del servidor
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre de la cuenta"
        className="border p-2 rounded w-full"
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Crear cuenta
      </button>
    </form>
  );
}
