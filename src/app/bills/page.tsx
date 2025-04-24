import Link from "next/link"
import { getAllBills } from "@/services/bills"

export default async function Bills() {
  const bills = await getAllBills()
  return (
    <ul>
      {bills.map((bill) => (
        <li key={bill.id}>
          <Link href={`/bills/${encodeURIComponent(bill.id)}`}>
            {bill.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}