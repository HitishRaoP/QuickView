import { getPaymentsFromDb } from "@/data/get-payments-from-db"
import { columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"

export default async function BillingPage() {
    const data = await getPaymentsFromDb()

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
