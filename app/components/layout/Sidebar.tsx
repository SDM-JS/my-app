'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    GraduationCap,
    BookOpen,
    Calendar,
    CreditCard,
    CheckSquare,
    UsersRound,
    Settings,
    Menu,
    X,
    Layers,
    BarChartBig,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useState } from 'react';

interface SidebarProps {
    role: 'admin' | 'teacher';
}
const adminMenuItems = [
    { icon: LayoutDashboard, label: 'Панель управления', href: '/admin' },
    { icon: Users, label: 'Ученики', href: '/admin/students' },
    { icon: GraduationCap, label: 'Преподаватели', href: '/admin/teachers' },
    { icon: Layers, label: 'Предметы', href: '/admin/subjects' },
    { icon: BookOpen, label: 'Курсы', href: '/admin/courses' },
    { icon: Calendar, label: 'Занятия', href: '/admin/lessons' },
    { icon: CreditCard, label: 'Платежи', href: '/admin/payments' },
    { icon: CheckSquare, label: 'Посещаемость', href: '/admin/attendances' },
    { icon: UsersRound, label: 'Группы', href: '/admin/groups' },
    { icon: BarChartBig, label: "Статистика", href: "/admin/statistics" },
    { icon: Settings, label: 'Настройки', href: '/admin/settings' }
];

const teacherMenuItems = [
    { icon: LayoutDashboard, label: 'Панель управления', href: '/teacher' },
    { icon: Users, label: 'Мои ученики', href: '/teacher/students' },
    { icon: CheckSquare, label: 'Моя посещаемость', href: '/teacher/attendances' },
    { icon: Calendar, label: 'Мои занятия', href: '/teacher/lessons' },
];

// Компонент боковой панели для десктопа
function DesktopSidebar({ role, pathname }: { role: 'admin' | 'teacher'; pathname: string }) {
    const menuItems = role === 'admin' ? adminMenuItems : teacherMenuItems;

    return (
        <aside className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-64 lg:flex-col">
            <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r bg-card px-6 pb-4 shadow-sm">
                {/* Логотип */}
                <div className="flex h-16 shrink-0 items-center">
                    <Link href={role === 'admin' ? '/admin' : '/teacher'} className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <GraduationCap className="h-5 w-5" />
                        </div>
                        <span className="text-lg font-bold">EduCRM</span>
                    </Link>
                </div>

                {/* Навигация */}
                <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-1">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');

                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-smooth',
                                            isActive
                                                ? 'bg-primary text-primary-foreground shadow-sm'
                                                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                                        )}
                                    >
                                        <Icon className="h-5 w-5" />
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Футер */}
                <div className="border-t pt-4">
                    <div className="text-xs text-muted-foreground">
                        © 2025 EduCRM
                    </div>
                </div>
            </div>
        </aside>
    );
}

// Компонент мобильной боковой панели
function MobileSidebar({ role, pathname, open, onOpenChange }: {
    role: 'admin' | 'teacher';
    pathname: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    const menuItems = role === 'admin' ? adminMenuItems : teacherMenuItems;

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="left" className="w-64 p-0">
                {/* Скрытый заголовок для доступности (accessibility) */}
                <SheetTitle asChild>
                    <VisuallyHidden>Меню навигации</VisuallyHidden>
                </SheetTitle>

                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-card px-6 pb-4">
                    {/* Логотип и кнопка закрытия */}
                    <div className="flex h-16 shrink-0 items-center justify-between">
                        <Link
                            href={role === 'admin' ? '/admin' : '/teacher'}
                            className="flex items-center gap-2"
                            onClick={() => onOpenChange(false)}
                        >
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                <GraduationCap className="h-5 w-5" />
                            </div>
                            <span className="text-lg font-bold">EduCRM</span>
                        </Link>
                    </div>

                    {/* Навигация */}
                    <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-1">
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');

                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-smooth',
                                                isActive
                                                    ? 'bg-primary text-primary-foreground shadow-sm'
                                                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                                            )}
                                            onClick={() => onOpenChange(false)}
                                        >
                                            <Icon className="h-5 w-5" />
                                            {item.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* Футер */}
                    <div className="border-t pt-4">
                        <div className="text-xs text-muted-foreground">
                            © 2025 EduCRM
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}

// Кнопка мобильного меню
function MobileMenuButton({ onMenuClick }: { onMenuClick: () => void }) {
    return (
        <Button
            type="button"
            variant="ghost"
            size="icon"
            className="fixed left-4 top-4 z-50 lg:hidden"
            onClick={onMenuClick}
        >
            <Menu className="h-6 w-6" />
            <VisuallyHidden>Открыть меню</VisuallyHidden>
        </Button>
    );
}

export default function Sidebar({ role }: SidebarProps) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            {/* Мобильная панель */}
            <MobileSidebar
                role={role}
                pathname={pathname}
                open={sidebarOpen}
                onOpenChange={setSidebarOpen}
            />

            {/* Десктопная панель */}
            <DesktopSidebar role={role} pathname={pathname} />

            {/* Кнопка открытия мобильного меню */}
            <MobileMenuButton onMenuClick={() => setSidebarOpen(true)} />
        </>
    );
}