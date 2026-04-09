'use client';

import { Bell, Search, Moon, Sun, X, User, GraduationCap, Loader2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { dark } from "@clerk/themes"
import { UserButton } from '@clerk/nextjs';
import { useState, useEffect, useRef, useCallback } from 'react';
import { axiosClient } from '@/lib/axiosClient';
import { useRouter } from 'next/navigation';

interface SearchResult {
    teachers: { id: string; name: string; email?: string; phone?: string }[];
    students: { id: string; name: string; phone?: string }[];
}

export default function Header() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
    const [isSearching, setIsSearching] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close on Escape
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsSearchOpen(false);
                inputRef.current?.blur();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    const performSearch = useCallback(async (query: string) => {
        if (!query.trim() || query.trim().length < 2) {
            setSearchResults(null);
            setIsSearchOpen(false);
            return;
        }

        setIsSearching(true);
        try {
            const { data } = await axiosClient.post('/api/search', { query: query.trim() });
            setSearchResults(data);
            setIsSearchOpen(true);
        } catch (error) {
            console.error('Search failed:', error);
            setSearchResults(null);
        } finally {
            setIsSearching(false);
        }
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setSearchQuery(value);

        // Debounce search
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }
        debounceRef.current = setTimeout(() => {
            performSearch(value);
        }, 350);
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setSearchResults(null);
        setIsSearchOpen(false);
        inputRef.current?.focus();
    };

    const handleResultClick = (type: 'teacher' | 'student', id: string) => {
        setIsSearchOpen(false);
        setSearchQuery('');
        setSearchResults(null);
        if (type === 'teacher') {
            router.push(`/admin/teachers`);
        } else {
            router.push(`/admin/students`);
        }
    };

    const totalResults = searchResults
        ? (searchResults.teachers?.length || 0) + (searchResults.students?.length || 0)
        : 0;

    // Используем тему по умолчанию до монтирования, чтобы избежать несоответствия гидратации
    const currentTheme = mounted ? theme : 'light';

    return (
        <header className="fixed left-64 right-0 top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6 shadow-sm max-lg:left-0">
            {/* Поиск */}
            <div className="flex flex-1 items-center gap-4">
                <div className="relative w-full max-w-md" ref={searchRef}>
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none z-10" />
                    {isSearching && (
                        <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground animate-spin z-10" />
                    )}
                    {searchQuery && !isSearching && (
                        <button
                            onClick={handleClearSearch}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors z-10"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                    <Input
                        ref={inputRef}
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onFocus={() => {
                            if (searchResults && totalResults > 0) {
                                setIsSearchOpen(true);
                            }
                        }}
                        placeholder="Поиск учителей, студентов..."
                        className="pl-10 pr-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />

                    {/* Выпадающий список результатов поиска */}
                    {isSearchOpen && searchResults && (
                        <div className="absolute top-full left-0 right-0 mt-2 rounded-xl border bg-popover shadow-xl overflow-hidden animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200 z-50">
                            {totalResults === 0 ? (
                                <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                                    <Search className="h-10 w-10 text-muted-foreground/40 mb-3" />
                                    <p className="text-sm font-medium text-muted-foreground">Ничего не найдено</p>
                                    <p className="text-xs text-muted-foreground/70 mt-1">
                                        Попробуйте изменить запрос
                                    </p>
                                </div>
                            ) : (
                                <div className="max-h-80 overflow-y-auto">
                                    {/* Результаты учителей */}
                                    {searchResults.teachers?.length > 0 && (
                                        <div>
                                            <div className="px-4 py-2.5 bg-muted/50 border-b">
                                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                                                    <GraduationCap className="h-3.5 w-3.5" />
                                                    Учителя
                                                    <span className="ml-auto bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full">
                                                        {searchResults.teachers.length}
                                                    </span>
                                                </p>
                                            </div>
                                            {searchResults.teachers.map((teacher) => (
                                                <button
                                                    key={teacher.id}
                                                    onClick={() => handleResultClick('teacher', teacher.id)}
                                                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent/80 transition-colors text-left group"
                                                >
                                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                                                        <GraduationCap className="h-4 w-4" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                                                            {teacher.name}
                                                        </p>
                                                        {teacher.email && (
                                                            <p className="text-xs text-muted-foreground truncate">
                                                                {teacher.email}
                                                            </p>
                                                        )}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {/* Результаты студентов */}
                                    {searchResults.students?.length > 0 && (
                                        <div>
                                            <div className="px-4 py-2.5 bg-muted/50 border-b border-t">
                                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                                                    <User className="h-3.5 w-3.5" />
                                                    Студенты
                                                    <span className="ml-auto bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full">
                                                        {searchResults.students.length}
                                                    </span>
                                                </p>
                                            </div>
                                            {searchResults.students.map((student) => (
                                                <button
                                                    key={student.id}
                                                    onClick={() => handleResultClick('student', student.id)}
                                                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent/80 transition-colors text-left group"
                                                >
                                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                                                        <User className="h-4 w-4" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                                                            {student.name}
                                                        </p>
                                                        {student.phone && (
                                                            <p className="text-xs text-muted-foreground truncate">
                                                                {student.phone}
                                                            </p>
                                                        )}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Нижняя панель */}
                            <div className="px-4 py-2 border-t bg-muted/30 flex items-center justify-between">
                                <p className="text-xs text-muted-foreground">
                                    {totalResults} {totalResults === 1 ? 'результат' : totalResults < 5 ? 'результата' : 'результатов'}
                                </p>
                                <kbd className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded border">
                                    Esc
                                </kbd>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Правая часть (Действия) */}
            <div className="flex items-center gap-2">
                {/* Переключатель темы */}
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
                        <div className="h-5 w-5" /> // Заглушка на время загрузки
                    )}
                    <span className="sr-only">Переключить тему</span>
                </Button>

                {/* Уведомления */}
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute right-2 top-2 flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                    </span>
                </Button>

                {/* Меню пользователя - рендерится только после монтирования */}
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