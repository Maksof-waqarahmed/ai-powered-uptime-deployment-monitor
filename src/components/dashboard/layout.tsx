import { SidebarInset, SidebarProvider } from "../ui/sidebar"; // Yahan SidebarProvider import karo
import { AppSidebar } from "./app-sidebar";
import Header from "./header";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <Header />
            <div className="p-4">
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
