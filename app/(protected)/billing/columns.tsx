"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Payment = {
    id: string;
    session_id: string;
    payment_status: string;
    createdAt: Date;
}

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "id",
        header: "Payment ID",
    },
    {
        accessorKey: "session_id",
        header: "Session ID",
    },
    {
        accessorKey: "payment_status",
        header: "Payment Status",
        cell: ({ row }) => {
            return <div className="text-green-500 bg-[#0B2212] font-semibold text-center rounded-md p-2 justify-self-center">{row.getValue("payment_status") }</div>
        },
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
    },
]
