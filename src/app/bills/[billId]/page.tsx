import { getBillById } from "@/services/bills";
import { getAllItems } from "@/services/items";

export default async function Bill({
  params,
}: {
  params: Promise<{ billId: string }>
}) {
  const { billId } = await params
  const bill = await getBillById(Number(billId));

  const items = await getAllItems();
  const billItems = items.filter((item) => item.billId === bill.id);
  const totalAmount = billItems.reduce((total, item) => {
    return total + Number(item.unitPrice) * item.quantity;
  }, 0);

  return (
    <div>
      <h1>Bill Details</h1>
      <p>Bill ID: {bill.id}</p>
      <p>Bill Name: {bill.name}</p>
      <p>Total Amount: {totalAmount}</p>
      <h2>Items</h2>

      <ul>
        {billItems.map((item) => (
          <li key={item.id}>
            {item.name} - {item.unitPrice} x {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  )
}
