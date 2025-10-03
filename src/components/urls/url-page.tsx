import React from "react"
import TableURLs from "./table"
import { URLs } from "@/schemas"
interface URLsProps {
    items: URLs[]
    totalPages: number
    currentPage: number
}

const URLsComponent = ({ items, totalPages, currentPage }: URLsProps) => {
    return (
        <div>
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-primary">URL Management</h1>
                        <p className="text-primary/70 mt-1">
                            Monitor and manage all your stored URLs
                        </p>
                    </div>
                </div>
                <TableURLs
                    data={items}
                    totalPages={totalPages}
                    currentPage={currentPage}
                />
            </div>
        </div>
    )
}

export default URLsComponent
