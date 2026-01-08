import Sidebar from '@/app/components/layout/Sidebar';
import Header from '@/app/components/layout/Header';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    // const { userId } = await auth()

    // const admin = await prisma.admin.findFirst({
    //     where: {
    //         id: userId!
    //     },
    //     select: {
    //         avatarUrl: true,
    //         name: true,
    //         email: true
    //     }
    // })
    return (
        <div className="min-h-screen bg-background">
            <Sidebar role="admin" />
            {/* Main content area */}
            <div className="lg:ml-64">
                {/* Show main Header only on desktop */}
                <div className="hidden lg:block">
                    <Header />
                </div>
                {/* Mobile spacer - replaces the need for mobile header in Sidebar */}
                <div className="h-16 lg:hidden" />
                <main className="p-6 lg:mt-16">{children}</main>
            </div>
        </div>
    );
}