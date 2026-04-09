'use client';

import { useState } from 'react';
import * as XLSX from 'xlsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Users,
    GraduationCap,
    DollarSign,
    TrendingUp,
    Calendar,
    BookOpen,
    BarChart3,
    PieChart,
    CheckCircle,
    Download,
    RefreshCw,
    FileSpreadsheet,
    FileText,
    Table
} from 'lucide-react';
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    PieChart as RePieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import { toast } from 'sonner';

// Определения типов
interface DashboardStats {
    totalStudents: number;
    totalTeachers: number;
    totalGroups: number;
    totalCourses: number;
    monthlyRevenue: number;
    totalRevenue: number;
    attendanceRate: number;
    newStudentsThisMonth: number;
}

interface RevenueData {
    month: string;
    revenue: number;
    students: number;
}

interface CoursePopularity {
    name: string;
    students: number;
    revenue: number;
}

interface AttendanceData {
    day: string;
    present: number;
    absent: number;
}

interface TeacherPerformance {
    name: string;
    rating: number;
    students: number;
    attendanceRate: number;
}

interface SourceDistribution {
    name: string;
    students: number;
    value: number;
}

interface StatisticsClientProps {
    dashboardStats: DashboardStats;
    revenueData: RevenueData[];
    coursePopularity: CoursePopularity[];
    attendanceData: AttendanceData[];
    teacherPerformance: TeacherPerformance[];
    sourceDistribution: SourceDistribution[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export default function StatisticsClient({
    dashboardStats,
    revenueData,
    coursePopularity,
    attendanceData,
    teacherPerformance,
    sourceDistribution
}: StatisticsClientProps) {
    const [activeTab, setActiveTab] = useState('overview');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isExporting, setIsExporting] = useState(false);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };
    
    // Расширенные данные посещаемости с расчетами
    const enhancedAttendanceData = attendanceData.map(day => ({
        ...day,
        total: day.present + day.absent,
        rate: day.present + day.absent > 0 ? (day.present / (day.present + day.absent)) * 100 : 0
    }));

    // Расширенное распределение источников с процентами
    const enhancedSourceDistribution = sourceDistribution.map(source => ({
        ...source,
        percentage: (source.students / dashboardStats.totalStudents) * 100
    }));

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => {
            window.location.reload();
        }, 500);
    };

    const exportToExcel = () => {
        try {
            setIsExporting(true);

            // Создание рабочей книги
            const workbook = XLSX.utils.book_new();
            const date = new Date().toISOString().split('T')[0];

            // Лист 1: Сводная панель управления
            const summaryData = [
                ['Сводная панель управления', '', '', ''],
                ['Создано:', new Date().toLocaleDateString('ru-RU'), '', ''],
                ['', '', '', ''],
                ['Показатель', 'Значение', 'Цель', 'Статус'],
                ['Всего студентов', dashboardStats.totalStudents, 'Н/Д', 'Факт'],
                ['Всего преподавателей', dashboardStats.totalTeachers, 'Н/Д', 'Факт'],
                ['Всего групп', dashboardStats.totalGroups, 'Н/Д', 'Факт'],
                ['Всего курсов', dashboardStats.totalCourses, 'Н/Д', 'Факт'],
                ['Месячный доход', formatCurrency(dashboardStats.monthlyRevenue), formatCurrency(10000), dashboardStats.monthlyRevenue >= 10000 ? 'Достигнуто' : 'Ниже цели'],
                ['Общий доход', formatCurrency(dashboardStats.totalRevenue), 'Н/Д', 'Факт'],
                ['Посещаемость', `${dashboardStats.attendanceRate}%`, '90%', dashboardStats.attendanceRate >= 90 ? 'Достигнуто' : 'Ниже цели'],
                ['Новых студентов (месяц)', dashboardStats.newStudentsThisMonth, 50, dashboardStats.newStudentsThisMonth >= 50 ? 'Достигнуто' : 'Ниже цели'],
            ];

            const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
            XLSX.utils.book_append_sheet(workbook, summarySheet, 'Сводка');

            // Лист 2: Данные о доходах
            const revenueSheetData = [
                ['Анализ доходов по месяцам', '', '', ''],
                ['Месяц', 'Доход', 'Новых студентов', 'Доход на студента'],
                ...revenueData.map(item => [
                    item.month,
                    item.revenue,
                    item.students,
                    item.students > 0 ? item.revenue / item.students : 0
                ])
            ];

            const revenueSheet = XLSX.utils.aoa_to_sheet(revenueSheetData);
            XLSX.utils.book_append_sheet(workbook, revenueSheet, 'Анализ доходов');

            // Лист 3: Популярность курсов
            const courseSheetData = [
                ['Популярность курсов и доход', '', '', ''],
                ['Название курса', 'Количество студентов', 'Общий доход', 'Среднее на студента'],
                ...coursePopularity.map(course => [
                    course.name,
                    course.students,
                    course.revenue,
                    course.students > 0 ? course.revenue / course.students : 0
                ])
            ];

            const courseSheet = XLSX.utils.aoa_to_sheet(courseSheetData);
            XLSX.utils.book_append_sheet(workbook, courseSheet, 'Анализ курсов');

            // Лист 4: Данные о посещаемости
            const attendanceSheetData = [
                ['Анализ посещаемости', '', '', '', ''],
                ['День', 'Присутствуют', 'Отсутствуют', 'Всего', 'Процент посещаемости'],
                ...enhancedAttendanceData.map(day => [
                    day.day,
                    day.present,
                    day.absent,
                    day.total,
                    day.rate
                ])
            ];

            const attendanceSheet = XLSX.utils.aoa_to_sheet(attendanceSheetData);
            XLSX.utils.book_append_sheet(workbook, attendanceSheet, 'Посещаемость');

            // Лист 5: Эффективность преподавателей
            const teacherSheetData = [
                ['Метрики эффективности преподавателей', '', '', '', ''],
                ['Преподаватель', 'Рейтинг (1-5)', 'Всего студентов', 'Посещаемость', 'Общий балл'],
                ...teacherPerformance.map(teacher => {
                    const performanceScore = (teacher.rating * 0.4) + (teacher.attendanceRate * 0.3) + (Math.min(teacher.students / 50, 1) * 0.3);
                    return [
                        teacher.name,
                        teacher.rating.toFixed(1),
                        teacher.students,
                        `${teacher.attendanceRate.toFixed(1)}%`,
                        performanceScore.toFixed(2)
                    ];
                })
            ];

            const teacherSheet = XLSX.utils.aoa_to_sheet(teacherSheetData);
            XLSX.utils.book_append_sheet(workbook, teacherSheet, 'Эффективность преподавателей');

            // Лист 6: Источники студентов
            const sourcesSheetData = [
                ['Распределение по источникам', '', '', ''],
                ['Источник', 'Количество студентов', 'Процент', 'Значение'],
                ...enhancedSourceDistribution.map(source => [
                    source.name,
                    source.students,
                    `${source.percentage.toFixed(1)}%`,
                    source.value
                ])
            ];

            const sourcesSheet = XLSX.utils.aoa_to_sheet(sourcesSheetData);
            XLSX.utils.book_append_sheet(workbook, sourcesSheet, 'Источники студентов');

            // Лист 7: Сводка исходных данных
            const rawData = [
                ['Сводка исходных данных', '', '', ''],
                ['Тип данных', 'Количество', 'Общее значение', 'Среднее'],
                ['Курсы', coursePopularity.length, coursePopularity.reduce((sum, c) => sum + c.revenue, 0), coursePopularity.reduce((sum, c) => sum + c.revenue, 0) / coursePopularity.length],
                ['Месяцы доходов', revenueData.length, revenueData.reduce((sum, r) => sum + r.revenue, 0), revenueData.reduce((sum, r) => sum + r.revenue, 0) / revenueData.length],
                ['Дни посещаемости', enhancedAttendanceData.length, enhancedAttendanceData.reduce((sum, a) => sum + a.total, 0), enhancedAttendanceData.reduce((sum, a) => sum + a.total, 0) / enhancedAttendanceData.length],
                ['Преподаватели', teacherPerformance.length, teacherPerformance.reduce((sum, t) => sum + t.students, 0), teacherPerformance.reduce((sum, t) => sum + t.students, 0) / teacherPerformance.length],
                ['Источники', enhancedSourceDistribution.length, enhancedSourceDistribution.reduce((sum, s) => sum + s.students, 0), enhancedSourceDistribution.reduce((sum, s) => sum + s.students, 0) / enhancedSourceDistribution.length],
            ];

            const rawSheet = XLSX.utils.aoa_to_sheet(rawData);
            XLSX.utils.book_append_sheet(workbook, rawSheet, 'Сводка данных');

            // Стилизация листов
            const sheets = workbook.SheetNames;
            sheets.forEach(sheetName => {
                const sheet = workbook.Sheets[sheetName];
                const maxWidths: { [key: string]: number } = {};
                XLSX.utils.sheet_to_json(sheet, { header: 1 }).forEach((row: any) => {
                    (row as any[]).forEach((cell: any, colIndex: any) => {
                        const cellLength = String(cell).length;
                        maxWidths[colIndex] = Math.max(maxWidths[colIndex] || 0, cellLength);
                    });
                });

                sheet['!cols'] = Object.keys(maxWidths).map(colIndex => ({
                    wch: Math.min(maxWidths[colIndex] + 2, 50) // Максимальная ширина 50 символов
                }));
            });

            // Генерация имени файла
            const fileName = `academy_dashboard_${date}.xlsx`;

            // Сохранение файла
            XLSX.writeFile(workbook, fileName);

            toast.success('Панель управления успешно экспортирована!', {
                description: `Файл "${fileName}" загружен.`
            });

        } catch (error) {
            console.error('Ошибка при экспорте в Excel:', error);
            toast.error('Не удалось экспортировать панель управления', {
                description: 'Пожалуйста, попробуйте снова или проверьте консоль на наличие ошибок.'
            });
        } finally {
            setIsExporting(false);
        }
    };

    const exportToCSV = (data: any[], sheetName: string) => {
        try {
            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

            const date = new Date().toISOString().split('T')[0];
            const fileName = `${sheetName.toLowerCase().replace(/ /g, '_')}_${date}.csv`;

            XLSX.writeFile(workbook, fileName);

            toast.success(`${sheetName} экспортирован как CSV!`);
        } catch (error) {
            console.error('Ошибка при экспорте в CSV:', error);
            toast.error('Не удалось экспортировать CSV');
        }
    };

    // Расширенные опции экспорта
    const exportOptions = [
        {
            label: 'Полная панель (Excel)',
            description: 'Все данные в нескольких листах',
            icon: <FileSpreadsheet className="h-4 w-4" />,
            onClick: exportToExcel,
            format: 'xlsx'
        },
        {
            label: 'Данные о доходах',
            description: 'Тренды доходов по месяцам',
            icon: <DollarSign className="h-4 w-4" />,
            onClick: () => exportToCSV(revenueData, 'Revenue_Analysis'),
            format: 'csv'
        },
        {
            label: 'Анализ курсов',
            description: 'Популярность курсов и доходы',
            icon: <BookOpen className="h-4 w-4" />,
            onClick: () => exportToCSV(coursePopularity, 'Course_Analysis'),
            format: 'csv'
        },
        {
            label: 'Отчет о посещаемости',
            description: 'Ежедневные записи посещаемости',
            icon: <Calendar className="h-4 w-4" />,
            onClick: () => exportToCSV(enhancedAttendanceData, 'Attendance_Report'),
            format: 'csv'
        },
        {
            label: 'Эффективность преподавателей',
            description: 'Рейтинги и метрики преподавателей',
            icon: <GraduationCap className="h-4 w-4" />,
            onClick: () => exportToCSV(teacherPerformance, 'Teacher_Performance'),
            format: 'csv'
        },
        {
            label: 'Источники студентов',
            description: 'Откуда приходят студенты',
            icon: <Users className="h-4 w-4" />,
            onClick: () => exportToCSV(enhancedSourceDistribution, 'Student_Sources'),
            format: 'csv'
        }
    ];

    // Карточки сводной статистики
    const statsCards = [
        {
            title: 'Всего студентов',
            value: dashboardStats.totalStudents,
            change: `+${dashboardStats.newStudentsThisMonth} в этом месяце`,
            icon: <Users className="h-6 w-6" />,
            color: 'bg-blue-500'
        },
        {
            title: 'Всего преподавателей',
            value: dashboardStats.totalTeachers,
            change: '',
            icon: <GraduationCap className="h-6 w-6" />,
            color: 'bg-green-500'
        },
        {
            title: 'Месячный доход',
            value: formatCurrency(dashboardStats.monthlyRevenue),
            change: dashboardStats.monthlyRevenue > 1000 ? 'Хорошо' : 'Средне',
            icon: <DollarSign className="h-6 w-6" />,
            color: 'bg-purple-500'
        },
        {
            title: 'Посещаемость',
            value: `${dashboardStats.attendanceRate}%`,
            change: dashboardStats.attendanceRate > 80 ? 'Высокая' : 'Средняя',
            icon: <CheckCircle className="h-6 w-6" />,
            color: 'bg-orange-500'
        },
        {
            title: 'Активных групп',
            value: dashboardStats.totalGroups,
            change: '',
            icon: <BookOpen className="h-6 w-6" />,
            color: 'bg-red-500'
        },
        {
            title: 'Всего курсов',
            value: dashboardStats.totalCourses,
            change: '',
            icon: <BarChart3 className="h-6 w-6" />,
            color: 'bg-indigo-500'
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Панель статистики</h1>
                    <p className="text-muted-foreground">Мониторинг эффективности и аналитика академии</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
                        <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                        {isRefreshing ? 'Обновление...' : 'Обновить'}
                    </Button>

                    {/* Расширенная кнопка экспорта с выпадающим меню */}
                    <div className="relative group">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={isExporting}
                            className="gap-2"
                        >
                            <Download className="h-4 w-4" />
                            {isExporting ? 'Экспорт...' : 'Экспорт данных'}
                        </Button>

                        {/* Выпадающее меню опций экспорта */}
                        <div className="absolute right-0 top-full mt-2 w-72 bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                            <div className="p-2 space-y-1">
                                <div className="px-3 py-2 text-sm font-semibold border-b">Опции экспорта</div>
                                {exportOptions.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={option.onClick}
                                        disabled={isExporting}
                                        className="w-full flex items-start gap-3 px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors"
                                    >
                                        <div className={`p-1.5 rounded ${option.format === 'xlsx' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                            {option.icon}
                                        </div>
                                        <div className="text-left flex-1">
                                            <div className="font-medium">{option.label}</div>
                                            <div className="text-xs text-muted-foreground">{option.description}</div>
                                        </div>
                                        <span className="text-xs text-muted-foreground px-2 py-1 bg-muted rounded">
                                            .{option.format}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Быстрый экспорт информации */}
            <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <FileSpreadsheet className="h-5 w-5 text-blue-600" />
                            <div>
                                <p className="text-sm font-medium text-blue-800">Доступен экспорт данных</p>
                                <p className="text-xs text-blue-600">
                                    Нажмите &quot;Экспорт данных&quot;, чтобы загрузить Excel-отчеты со всеми данными панели управления
                                </p>
                            </div>
                        </div>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={exportToExcel}
                            disabled={isExporting}
                            className="text-blue-700 hover:text-blue-800 hover:bg-blue-100"
                        >
                            {isExporting ? (
                                <>
                                    <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2" />
                                    Экспорт...
                                </>
                            ) : (
                                <>
                                    <FileSpreadsheet className="h-3.5 w-3.5 mr-2" />
                                    Быстрый экспорт
                                </>
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Карточки сводной статистики */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {statsCards.map((stat, index) => (
                    <Card key={index} className="overflow-hidden">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className={`p-2 rounded-lg ${stat.color} text-white`}>
                                    {stat.icon}
                                </div>
                                {stat.change && (
                                    <span className={`text-xs px-2 py-1 rounded-full ${stat.change.includes('+') || stat.change === 'Высокая' || stat.change === 'Хорошо'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {stat.change}
                                    </span>
                                )}
                            </div>
                            <div className="mt-4">
                                <p className="text-sm text-muted-foreground">{stat.title}</p>
                                <p className="text-2xl font-bold">{stat.value}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Вкладки для разных представлений */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-4">
                    <TabsTrigger value="overview">Обзор</TabsTrigger>
                    <TabsTrigger value="financial">Финансы</TabsTrigger>
                    <TabsTrigger value="attendance">Посещаемость</TabsTrigger>
                    <TabsTrigger value="performance">Эффективность</TabsTrigger>
                </TabsList>

                {/* Вкладка Обзор */}
                <TabsContent value="overview" className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Тренд доходов */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5" />
                                    Тренд доходов
                                </CardTitle>
                                <CardDescription>Доходы против новых студентов (последние 6 месяцев)</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={revenueData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis yAxisId="left" />
                                            <YAxis yAxisId="right" orientation="right" />
                                            <Tooltip
                                                formatter={(value, name) => {
                                                    if (name === 'revenue') return [formatCurrency(Number(value)), 'Доход'];
                                                    if (name === 'students') return [value, 'Новых студентов'];
                                                    return value;
                                                }}
                                            />
                                            <Legend />
                                            <Area
                                                yAxisId="left"
                                                type="monotone"
                                                dataKey="revenue"
                                                stroke="#8884d8"
                                                fill="#8884d8"
                                                fillOpacity={0.3}
                                                name="Доход"
                                            />
                                            <Area
                                                yAxisId="right"
                                                type="monotone"
                                                dataKey="students"
                                                stroke="#82ca9d"
                                                fill="#82ca9d"
                                                fillOpacity={0.3}
                                                name="Новых студентов"
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="mt-4 flex justify-end">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => exportToCSV(revenueData, 'Revenue_Trend')}
                                        className="text-xs"
                                    >
                                        <Download className="h-3 w-3 mr-1" />
                                        Экспорт данных
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Популярность курсов */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BarChart3 className="h-5 w-5" />
                                    Популярность курсов
                                </CardTitle>
                                <CardDescription>Самые востребованные курсы</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={coursePopularity}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                                            <YAxis />
                                            <Tooltip
                                                formatter={(value, name) => {
                                                    if (name === 'revenue') return [formatCurrency(Number(value)), 'Доход'];
                                                    if (name === 'students') return [value, 'Студентов'];
                                                    return value;
                                                }}
                                            />
                                            <Legend />
                                            <Bar dataKey="students" fill="#8884d8" name="Студентов" />
                                            <Bar dataKey="revenue" fill="#82ca9d" name="Доход" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="mt-4 flex justify-end">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => exportToCSV(coursePopularity, 'Course_Popularity')}
                                        className="text-xs"
                                    >
                                        <Download className="h-3 w-3 mr-1" />
                                        Экспорт данных
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Источники студентов */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <PieChart className="h-5 w-5" />
                                    Источники студентов
                                </CardTitle>
                                <CardDescription>Откуда приходят студенты</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RePieChart>
                                            <Pie
                                                data={enhancedSourceDistribution}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="value"
                                            >
                                                {enhancedSourceDistribution.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip formatter={(value) => [value, 'Студентов']} />
                                            <Legend />
                                        </RePieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="mt-4 flex justify-end">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => exportToCSV(enhancedSourceDistribution, 'Student_Sources')}
                                        className="text-xs"
                                    >
                                        <Download className="h-3 w-3 mr-1" />
                                        Экспорт данных
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Эффективность преподавателей */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <GraduationCap className="h-5 w-5" />
                                    Лучшие преподаватели
                                </CardTitle>
                                <CardDescription>Рейтинги эффективности</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {teacherPerformance.map((teacher, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                                    <span className="font-semibold text-primary">
                                                        {teacher.name.charAt(0)}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="font-medium">{teacher.name}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {teacher.students} студентов • {teacher.attendanceRate.toFixed(1)}% посещаемости
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="flex items-center gap-1">
                                                    {Array.from({ length: 5 }).map((_, i) => (
                                                        <div
                                                            key={i}
                                                            className={`w-3 h-3 rounded-full ${i < Math.floor(teacher.rating)
                                                                ? 'bg-yellow-500'
                                                                : 'bg-muted'
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                                <p className="text-lg font-bold">{teacher.rating.toFixed(1)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 flex justify-end">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => exportToCSV(teacherPerformance, 'Teacher_Performance')}
                                        className="text-xs"
                                    >
                                        <Download className="h-3 w-3 mr-1" />
                                        Экспорт данных
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Вкладка Финансы */}
                <TabsContent value="financial" className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <DollarSign className="h-5 w-5" />
                                    Структура доходов
                                </CardTitle>
                                <CardDescription>Всего: {formatCurrency(dashboardStats.totalRevenue)}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={coursePopularity}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                                            <YAxis />
                                            <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'Доход']} />
                                            <Legend />
                                            <Bar dataKey="revenue" fill="#8884d8" name="Доход по курсам" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5" />
                                    Динамика по месяцам
                                </CardTitle>
                                <CardDescription>Рост доходов во времени</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={revenueData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'Доход']} />
                                            <Legend />
                                            <Line
                                                type="monotone"
                                                dataKey="revenue"
                                                stroke="#8884d8"
                                                strokeWidth={2}
                                                dot={{ r: 4 }}
                                                activeDot={{ r: 6 }}
                                                name="Доход"
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Сводка доходов */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Сводка доходов</CardTitle>
                            <CardDescription>Детальная разбивка по курсам</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-3 px-4 font-medium">Курс</th>
                                            <th className="text-left py-3 px-4 font-medium">Студентов</th>
                                            <th className="text-left py-3 px-4 font-medium">Доход</th>
                                            <th className="text-left py-3 px-4 font-medium">Ср. на студента</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {coursePopularity.map((course, index) => (
                                            <tr key={index} className="border-b hover:bg-muted/50">
                                                <td className="py-3 px-4">{course.name}</td>
                                                <td className="py-3 px-4">{course.students}</td>
                                                <td className="py-3 px-4 font-medium">{formatCurrency(course.revenue)}</td>
                                                <td className="py-3 px-4">
                                                    {course.students > 0
                                                        ? formatCurrency(course.revenue / course.students)
                                                        : formatCurrency(0)
                                                    }
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => exportToCSV(coursePopularity, 'Revenue_Summary')}
                                >
                                    <Download className="h-3 w-3 mr-1" />
                                    Экспорт данных о доходах
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Вкладка Посещаемость */}
                <TabsContent value="attendance" className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5" />
                                    Еженедельная посещаемость
                                </CardTitle>
                                <CardDescription>Тренд посещаемости за последние 7 дней</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={enhancedAttendanceData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="day" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="present" fill="#82ca9d" name="Присутствуют" />
                                            <Bar dataKey="absent" fill="#ff8042" name="Отсутствуют" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="mt-4 flex justify-end">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => exportToCSV(enhancedAttendanceData, 'Attendance_Data')}
                                        className="text-xs"
                                    >
                                        <Download className="h-3 w-3 mr-1" />
                                        Экспорт данных
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5" />
                                    Процент посещаемости
                                </CardTitle>
                                <CardDescription>Общий: {dashboardStats.attendanceRate}%</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col items-center justify-center h-80">
                                    <div className="relative w-48 h-48">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center">
                                                <p className="text-4xl font-bold">{dashboardStats.attendanceRate}%</p>
                                                <p className="text-sm text-muted-foreground">Посещаемость</p>
                                            </div>
                                        </div>
                                        <svg className="w-full h-full" viewBox="0 0 100 100">
                                            <circle
                                                cx="50"
                                                cy="50"
                                                r="45"
                                                fill="none"
                                                stroke="#e5e7eb"
                                                strokeWidth="10"
                                            />
                                            <circle
                                                cx="50"
                                                cy="50"
                                                r="45"
                                                fill="none"
                                                stroke="#10b981"
                                                strokeWidth="10"
                                                strokeLinecap="round"
                                                strokeDasharray={`${dashboardStats.attendanceRate * 2.83} 283`}
                                                transform="rotate(-90 50 50)"
                                            />
                                        </svg>
                                    </div>
                                    <div className="mt-8 grid grid-cols-2 gap-4 w-full max-w-md">
                                        <div className="text-center p-4 border rounded-lg">
                                            <p className="text-2xl font-bold text-green-600">
                                                {enhancedAttendanceData.reduce((sum, day) => sum + day.present, 0)}
                                            </p>
                                            <p className="text-sm text-muted-foreground">Присутствуют (неделя)</p>
                                        </div>
                                        <div className="text-center p-4 border rounded-lg">
                                            <p className="text-2xl font-bold text-red-600">
                                                {enhancedAttendanceData.reduce((sum, day) => sum + day.absent, 0)}
                                            </p>
                                            <p className="text-sm text-muted-foreground">Отсутствуют (неделя)</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Вкладка Эффективность */}
                <TabsContent value="performance" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <GraduationCap className="h-5 w-5" />
                                Метрики эффективности преподавателей
                            </CardTitle>
                            <CardDescription>Детальная аналитика преподавателей</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-3 px-4 font-medium">Преподаватель</th>
                                            <th className="text-left py-3 px-4 font-medium">Рейтинг</th>
                                            <th className="text-left py-3 px-4 font-medium">Всего студентов</th>
                                            <th className="text-left py-3 px-4 font-medium">Посещаемость</th>
                                            <th className="text-left py-3 px-4 font-medium">Эффективность</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {teacherPerformance.map((teacher, index) => {
                                            const performanceScore = (teacher.rating * 0.4) + (teacher.attendanceRate * 0.3) + (Math.min(teacher.students / 50, 1) * 0.3);
                                            const performanceLevel = performanceScore > 4 ? 'Отлично' : performanceScore > 3 ? 'Хорошо' : performanceScore > 2 ? 'Средне' : 'Требует улучшения';

                                            return (
                                                <tr key={index} className="border-b hover:bg-muted/50">
                                                    <td className="py-3 px-4">{teacher.name}</td>
                                                    <td className="py-3 px-4">
                                                        <div className="flex items-center gap-1">
                                                            {Array.from({ length: 5 }).map((_, i) => (
                                                                <div
                                                                    key={i}
                                                                    className={`w-3 h-3 rounded-full ${i < Math.floor(teacher.rating)
                                                                        ? 'bg-yellow-500'
                                                                        : 'bg-muted'
                                                                        }`}
                                                                />
                                                            ))}
                                                            <span className="ml-2 font-medium">{teacher.rating.toFixed(1)}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-4">{teacher.students}</td>
                                                    <td className="py-3 px-4">{teacher.attendanceRate.toFixed(1)}%</td>
                                                    <td className="py-3 px-4">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${performanceLevel === 'Отлично'
                                                            ? 'bg-green-100 text-green-700'
                                                            : performanceLevel === 'Хорошо'
                                                                ? 'bg-blue-100 text-blue-700'
                                                                : performanceLevel === 'Средне'
                                                                    ? 'bg-yellow-100 text-yellow-700'
                                                                    : 'bg-red-100 text-red-700'
                                                            }`}>
                                                            {performanceLevel}
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => exportToCSV(teacherPerformance, 'Teacher_Metrics')}
                                >
                                    <Download className="h-3 w-3 mr-1" />
                                    Экспорт данных преподавателей
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Быстрая статистика */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Общий доход</p>
                                <p className="text-2xl font-bold">{formatCurrency(dashboardStats.totalRevenue)}</p>
                            </div>
                            <DollarSign className="h-8 w-8 text-green-500" />
                        </div>
                        <div className="mt-4">
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-green-500 rounded-full"
                                    style={{ width: `${Math.min(dashboardStats.totalRevenue / 10000 * 100, 100)}%` }}
                                />
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                                По сравнению с целью: {formatCurrency(10000)}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Новых студентов в этом месяце</p>
                                <p className="text-2xl font-bold">{dashboardStats.newStudentsThisMonth}</p>
                            </div>
                            <TrendingUp className="h-8 w-8 text-blue-500" />
                        </div>
                        <div className="mt-4">
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-blue-500 rounded-full"
                                    style={{ width: `${Math.min(dashboardStats.newStudentsThisMonth / 50 * 100, 100)}%` }}
                                />
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                                Месячная цель: 50 студентов
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Средняя посещаемость</p>
                                <p className="text-2xl font-bold">{dashboardStats.attendanceRate}%</p>
                            </div>
                            <CheckCircle className="h-8 w-8 text-orange-500" />
                        </div>
                        <div className="mt-4">
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-orange-500 rounded-full"
                                    style={{ width: `${dashboardStats.attendanceRate}%` }}
                                />
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                                Цель: 90% посещаемости
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Карточка сводки экспорта */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileSpreadsheet className="h-5 w-5" />
                        Сводка экспорта
                    </CardTitle>
                    <CardDescription>
                        Все данные доступны для скачивания. Нажмите любую кнопку экспорта, чтобы загрузить данные в формате Excel или CSV.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-green-100 text-green-700 rounded-lg">
                                    <FileSpreadsheet className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="font-medium">Экспорт Excel</p>
                                    <p className="text-sm text-muted-foreground">Полная панель со всеми листами</p>
                                </div>
                            </div>
                            <Button
                                size="sm"
                                variant="outline"
                                className="w-full mt-2"
                                onClick={exportToExcel}
                                disabled={isExporting}
                            >
                                {isExporting ? 'Экспорт...' : 'Скачать полный отчет'}
                            </Button>
                        </div>

                        <div className="border rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
                                    <FileText className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="font-medium">Индивидуальные отчеты</p>
                                    <p className="text-sm text-muted-foreground">Экспорт определенных разделов данных</p>
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Используйте кнопки экспорта в каждом разделе для получения конкретных данных
                            </p>
                        </div>

                        <div className="border rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-purple-100 text-purple-700 rounded-lg">
                                    <Table className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="font-medium">Точки данных</p>
                                    <p className="text-sm text-muted-foreground">Всего доступных записей</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                    <p className="font-medium">{revenueData.length}</p>
                                    <p className="text-xs text-muted-foreground">Записей о доходах</p>
                                </div>
                                <div>
                                    <p className="font-medium">{coursePopularity.length}</p>
                                    <p className="text-xs text-muted-foreground">Курсов</p>
                                </div>
                                <div>
                                    <p className="font-medium">{teacherPerformance.length}</p>
                                    <p className="text-xs text-muted-foreground">Преподавателей</p>
                                </div>
                                <div>
                                    <p className="font-medium">{enhancedSourceDistribution.length}</p>
                                    <p className="text-xs text-muted-foreground">Источников</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}