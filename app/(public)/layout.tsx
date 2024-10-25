import { HomeHeader } from "@/components/home-header";

export default async function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <main className="w-full mx-auto pt-24">
            <HomeHeader />
            {children}
        </main>
    );
}
