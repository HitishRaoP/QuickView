import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "react-hot-toast";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "./_components/header";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <SidebarProvider>
        <AppSidebar />
        <Toaster />
        <main className="w-full mx-auto">
          <Header />
          {children}
        </main>
      </SidebarProvider>
    </SessionProvider>
  );
}
