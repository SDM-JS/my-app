'use client';

import { Bell, Search, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { dark } from "@clerk/themes"
import { UserButton } from '@clerk/nextjs';
import { useState, useEffect } from 'react';

export default function Header() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Use a default theme until mounted to avoid hydration mismatch
    const currentTheme = mounted ? theme : 'light';

    return (
        <header className="fixed left-64 right-0 top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6 shadow-sm max-lg:left-0">
            {/* Search */}
            <div className="flex flex-1 items-center gap-4">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search students, courses, lessons..."
                        className="pl-10"
                    />
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
                {/* Theme Toggle */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
                    disabled={!mounted}
                >
                    {mounted ? (
                        <>
                            <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
                        </>
                    ) : (
                        <div className="h-5 w-5" /> // Placeholder while loading
                    )}
                    <span className="sr-only">Toggle theme</span>
                </Button>

                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute right-2 top-2 flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                    </span>
                </Button>

                {/* User Menu - Conditionally render after mount */}
                {mounted && (
                    <UserButton
                        appearance={{
                            theme: currentTheme === 'dark' ? dark : 'clerk',
                        }}
                        userProfileProps={{
                            appearance: {
                                theme: currentTheme === 'dark' ? dark : 'clerk'
                            }
                        }}
                    />
                )}
            </div>
        </header>
    );
}