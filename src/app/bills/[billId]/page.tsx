import { getBillById } from "@/services/bills";

export default async function Bill({
  params,
}: {
  params: Promise<{ billId: string }>
}) {
  const { billId } = await params
  const bill = await getBillById(Number(billId));
  return (
    <div>
      <h1>Bill Details</h1>
      <p>Bill ID: {bill.id}</p>
      <p>Bill Name: {bill.name}</p>
    </div>
  )
}
