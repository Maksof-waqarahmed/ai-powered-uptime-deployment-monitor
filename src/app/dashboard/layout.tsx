import DashboardLayout from "@/components/dashboard/layout";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <DashboardLayout children={children}>
                </DashboardLayout>
            </body>
        </html>
    );
}
