
import URLsComponent from "@/components/urls/url-page"


export default function UrlsPage({ searchParams }: { searchParams: { page?: string } }) {
    return (
        <div className="min-h-screen">
            <URLsComponent searchParams={searchParams} />
        </div>
    )
}
