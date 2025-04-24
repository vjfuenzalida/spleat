"use client";

import { getAllBills } from "@/services/bills";
import CreateBillForm from "./create-bill-form";

export default async function BillsPage() {
  const bills = await getAllBills();

  return (
    <main className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Cuentas</h1>

      <CreateBillForm />

      <ul className="space-y-2">
        {bills.map((bill) => (
          <li key={bill.id} className="border p-2 rounded shadow-sm">
            <div className="font-medium">#{bill.id} - {bill.name}</div>
            <div className="text-sm text-gray-600">
              Fecha: {new Date(bill.createdAt).toLocaleDateString()}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}