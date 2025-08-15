'use client'

import {
    Pagination, PaginationContent, PaginationItem,
    PaginationLink, PaginationNext, PaginationPrevious
} from "@/components/ui/pagination"
import { useRouter } from "next/navigation"

export default function PaginationComponent({
    totalPages,
    currentPage
}: {
    totalPages: number,
    currentPage: number
}) {
    const router = useRouter();

    const goToPage = (page: number) => {
        if (page < 1 || page > totalPages) return;
        router.push(`?page=${page}`);
    };

    return (
        <Pagination>
            <PaginationContent>
                {/* Previous */}
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => goToPage(currentPage - 1)}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>

                {/* Numbered Pages */}
                {[...Array(totalPages)].map((_, idx) => (
                    <PaginationItem key={idx}>
                        <PaginationLink
                            isActive={currentPage === idx + 1}
                            onClick={() => goToPage(idx + 1)}
                        >
                            {idx + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {/* Next */}
                <PaginationItem>
                    <PaginationNext
                        onClick={() => goToPage(currentPage + 1)}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
