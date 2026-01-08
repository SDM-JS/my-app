import Sidebar from '@/app/components/layout/Sidebar';
import Header from '@/app/components/layout/Header';

export default async function TeacherLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className="min-h-screen bg-background">
            <Sidebar role="teacher" />
            {/* Main content area */}
            <div className="lg:ml-64">
                {/* Show main Header only on desktop */}
                <div className="hidden lg:block">
                    <Header />
                </div>
                {/* Mobile spacer - replaces the need for mobile header in Sidebar */}
                <div className="h-16 lg:hidden" />
                <main className="p-6 lg:mt-11">{children}</main>
            </div>
        </div>
    );
}