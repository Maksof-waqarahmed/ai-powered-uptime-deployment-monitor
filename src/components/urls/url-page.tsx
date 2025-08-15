import React from "react";
import SearchCard from "./search-card";
import TableURLs from "./table";
import { api } from "@/trpc-server/server";

interface Props {
    searchParams: { page?: string };
}

const URLsComponent = async ({ searchParams }: Props) => {
    const page = Number(searchParams?.page) || 1;
    const limit = 10;

    const { items, totalPages } = await api.urls.getAllURLs({ page, limit });

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
                {/* <SearchCard /> */}
                <TableURLs
                    data={items}
                    totalPages={totalPages}
                    currentPage={page}
                />
            </div>
        </div>
    );
};

export default URLsComponent;
