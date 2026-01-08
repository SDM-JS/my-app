'use client';

import { useState, useRef } from 'react';
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
    TrendingDown,
    Clock,
    CheckCircle,
    XCircle,
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

// Type definitions
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
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const formatPercentage = (value: number) => {
        return `${value.toFixed(1)}%`;
    };

    // Enhanced attendance data with calculations
    const enhancedAttendanceData = attendanceData.map(day => ({
        ...day,
        total: day.present + day.absent,
        rate: day.present + day.absent > 0 ? (day.present / (day.present + day.absent)) * 100 : 0
    }));

    // Enhanced source distribution with percentages
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

            // Create workbook
            const workbook = XLSX.utils.book_new();
            const date = new Date().toISOString().split('T')[0];

            // Sheet 1: Summary Dashboard
            const summaryData = [
                ['Dashboard Summary', '', '', ''],
                ['Generated on:', new Date().toLocaleDateString(), '', ''],
                ['', '', '', ''],
                ['Metric', 'Value', 'Target', 'Status'],
                ['Total Students', dashboardStats.totalStudents, 'N/A', 'Actual'],
                ['Total Teachers', dashboardStats.totalTeachers, 'N/A', 'Actual'],
                ['Total Groups', dashboardStats.totalGroups, 'N/A', 'Actual'],
                ['Total Courses', dashboardStats.totalCourses, 'N/A', 'Actual'],
                ['Monthly Revenue', formatCurrency(dashboardStats.monthlyRevenue), formatCurrency(10000), dashboardStats.monthlyRevenue >= 10000 ? 'Achieved' : 'Below Target'],
                ['Total Revenue', formatCurrency(dashboardStats.totalRevenue), 'N/A', 'Actual'],
                ['Attendance Rate', `${dashboardStats.attendanceRate}%`, '90%', dashboardStats.attendanceRate >= 90 ? 'Achieved' : 'Below Target'],
                ['New Students (Month)', dashboardStats.newStudentsThisMonth, 50, dashboardStats.newStudentsThisMonth >= 50 ? 'Achieved' : 'Below Target'],
            ];

            const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
            XLSX.utils.book_append_sheet(workbook, summarySheet, 'Dashboard Summary');

            // Sheet 2: Revenue Data
            const revenueSheetData = [
                ['Revenue Analysis by Month', '', '', ''],
                ['Month', 'Revenue', 'New Students', 'Revenue per Student'],
                ...revenueData.map(item => [
                    item.month,
                    item.revenue,
                    item.students,
                    item.students > 0 ? item.revenue / item.students : 0
                ])
            ];

            const revenueSheet = XLSX.utils.aoa_to_sheet(revenueSheetData);
            XLSX.utils.book_append_sheet(workbook, revenueSheet, 'Revenue Analysis');

            // Sheet 3: Course Popularity
            const courseSheetData = [
                ['Course Popularity & Revenue', '', '', ''],
                ['Course Name', 'Number of Students', 'Total Revenue', 'Average per Student'],
                ...coursePopularity.map(course => [
                    course.name,
                    course.students,
                    course.revenue,
                    course.students > 0 ? course.revenue / course.students : 0
                ])
            ];

            const courseSheet = XLSX.utils.aoa_to_sheet(courseSheetData);
            XLSX.utils.book_append_sheet(workbook, courseSheet, 'Course Analysis');

            // Sheet 4: Attendance Data
            const attendanceSheetData = [
                ['Attendance Analysis', '', '', '', ''],
                ['Day', 'Present', 'Absent', 'Total', 'Attendance Rate'],
                ...enhancedAttendanceData.map(day => [
                    day.day,
                    day.present,
                    day.absent,
                    day.total,
                    day.rate
                ])
            ];

            const attendanceSheet = XLSX.utils.aoa_to_sheet(attendanceSheetData);
            XLSX.utils.book_append_sheet(workbook, attendanceSheet, 'Attendance');

            // Sheet 5: Teacher Performance
            const teacherSheetData = [
                ['Teacher Performance Metrics', '', '', '', ''],
                ['Teacher Name', 'Rating (1-5)', 'Total Students', 'Attendance Rate', 'Performance Score'],
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
            XLSX.utils.book_append_sheet(workbook, teacherSheet, 'Teacher Performance');

            // Sheet 6: Student Sources
            const sourcesSheetData = [
                ['Student Source Distribution', '', '', ''],
                ['Source', 'Number of Students', 'Percentage', 'Value'],
                ...enhancedSourceDistribution.map(source => [
                    source.name,
                    source.students,
                    `${source.percentage.toFixed(1)}%`,
                    source.value
                ])
            ];

            const sourcesSheet = XLSX.utils.aoa_to_sheet(sourcesSheetData);
            XLSX.utils.book_append_sheet(workbook, sourcesSheet, 'Student Sources');

            // Sheet 7: Raw Data Summary
            const rawData = [
                ['Raw Data Summary', '', '', ''],
                ['Data Type', 'Count', 'Total Value', 'Average'],
                ['Courses', coursePopularity.length, coursePopularity.reduce((sum, c) => sum + c.revenue, 0), coursePopularity.reduce((sum, c) => sum + c.revenue, 0) / coursePopularity.length],
                ['Revenue Months', revenueData.length, revenueData.reduce((sum, r) => sum + r.revenue, 0), revenueData.reduce((sum, r) => sum + r.revenue, 0) / revenueData.length],
                ['Attendance Days', enhancedAttendanceData.length, enhancedAttendanceData.reduce((sum, a) => sum + a.total, 0), enhancedAttendanceData.reduce((sum, a) => sum + a.total, 0) / enhancedAttendanceData.length],
                ['Teachers', teacherPerformance.length, teacherPerformance.reduce((sum, t) => sum + t.students, 0), teacherPerformance.reduce((sum, t) => sum + t.students, 0) / teacherPerformance.length],
                ['Sources', enhancedSourceDistribution.length, enhancedSourceDistribution.reduce((sum, s) => sum + s.students, 0), enhancedSourceDistribution.reduce((sum, s) => sum + s.students, 0) / enhancedSourceDistribution.length],
            ];

            const rawSheet = XLSX.utils.aoa_to_sheet(rawData);
            XLSX.utils.book_append_sheet(workbook, rawSheet, 'Data Summary');

            // Style the sheets
            const sheets = workbook.SheetNames;
            sheets.forEach(sheetName => {
                const sheet = workbook.Sheets[sheetName];
                const maxWidths = {};
                XLSX.utils.sheet_to_json(sheet, { header: 1 }).forEach(row => {
                    row.forEach((cell, colIndex) => {
                        const cellLength = String(cell).length;
                        maxWidths[colIndex] = Math.max(maxWidths[colIndex] || 0, cellLength);
                    });
                });

                sheet['!cols'] = Object.keys(maxWidths).map(colIndex => ({
                    wch: Math.min(maxWidths[colIndex] + 2, 50) // Max width 50 characters
                }));
            });

            // Generate file name
            const fileName = `academy_dashboard_${date}.xlsx`;

            // Save the file
            XLSX.writeFile(workbook, fileName);

            toast.success('Dashboard exported successfully!', {
                description: `File "${fileName}" has been downloaded.`
            });

        } catch (error) {
            console.error('Error exporting to Excel:', error);
            toast.error('Failed to export dashboard', {
                description: 'Please try again or check the console for errors.'
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

            toast.success(`${sheetName} exported as CSV!`);
        } catch (error) {
            console.error('Error exporting to CSV:', error);
            toast.error('Failed to export CSV');
        }
    };

    // Enhanced export options
    const exportOptions = [
        {
            label: 'Full Dashboard (Excel)',
            description: 'All data in multiple sheets',
            icon: <FileSpreadsheet className="h-4 w-4" />,
            onClick: exportToExcel,
            format: 'xlsx'
        },
        {
            label: 'Revenue Data',
            description: 'Monthly revenue trends',
            icon: <DollarSign className="h-4 w-4" />,
            onClick: () => exportToCSV(revenueData, 'Revenue_Analysis'),
            format: 'csv'
        },
        {
            label: 'Course Analysis',
            description: 'Course popularity and revenue',
            icon: <BookOpen className="h-4 w-4" />,
            onClick: () => exportToCSV(coursePopularity, 'Course_Analysis'),
            format: 'csv'
        },
        {
            label: 'Attendance Report',
            description: 'Daily attendance records',
            icon: <Calendar className="h-4 w-4" />,
            onClick: () => exportToCSV(enhancedAttendanceData, 'Attendance_Report'),
            format: 'csv'
        },
        {
            label: 'Teacher Performance',
            description: 'Teacher ratings and metrics',
            icon: <GraduationCap className="h-4 w-4" />,
            onClick: () => exportToCSV(teacherPerformance, 'Teacher_Performance'),
            format: 'csv'
        },
        {
            label: 'Student Sources',
            description: 'Where students come from',
            icon: <Users className="h-4 w-4" />,
            onClick: () => exportToCSV(enhancedSourceDistribution, 'Student_Sources'),
            format: 'csv'
        }
    ];

    // Overview Stats Cards
    const statsCards = [
        {
            title: 'Total Students',
            value: dashboardStats.totalStudents,
            change: `+${dashboardStats.newStudentsThisMonth} this month`,
            icon: <Users className="h-6 w-6" />,
            color: 'bg-blue-500'
        },
        {
            title: 'Total Teachers',
            value: dashboardStats.totalTeachers,
            change: '',
            icon: <GraduationCap className="h-6 w-6" />,
            color: 'bg-green-500'
        },
        {
            title: 'Monthly Revenue',
            value: formatCurrency(dashboardStats.monthlyRevenue),
            change: dashboardStats.monthlyRevenue > 1000 ? 'Good' : 'Average',
            icon: <DollarSign className="h-6 w-6" />,
            color: 'bg-purple-500'
        },
        {
            title: 'Attendance Rate',
            value: `${dashboardStats.attendanceRate}%`,
            change: dashboardStats.attendanceRate > 80 ? 'High' : 'Medium',
            icon: <CheckCircle className="h-6 w-6" />,
            color: 'bg-orange-500'
        },
        {
            title: 'Active Groups',
            value: dashboardStats.totalGroups,
            change: '',
            icon: <BookOpen className="h-6 w-6" />,
            color: 'bg-red-500'
        },
        {
            title: 'Total Courses',
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
                    <h1 className="text-3xl font-bold">Statistics Dashboard</h1>
                    <p className="text-muted-foreground">Monitor your academy's performance and insights</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
                        <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                        {isRefreshing ? 'Refreshing...' : 'Refresh'}
                    </Button>

                    {/* Enhanced Export Button with Dropdown */}
                    <div className="relative group">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={isExporting}
                            className="gap-2"
                        >
                            <Download className="h-4 w-4" />
                            {isExporting ? 'Exporting...' : 'Export Data'}
                        </Button>

                        {/* Export Options Dropdown */}
                        <div className="absolute right-0 top-full mt-2 w-72 bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                            <div className="p-2 space-y-1">
                                <div className="px-3 py-2 text-sm font-semibold border-b">Export Options</div>
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

            {/* Quick Export Info */}
            <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <FileSpreadsheet className="h-5 w-5 text-blue-600" />
                            <div>
                                <p className="text-sm font-medium text-blue-800">Data Export Available</p>
                                <p className="text-xs text-blue-600">
                                    Click "Export Data" to download Excel reports with all dashboard data
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
                                    Exporting...
                                </>
                            ) : (
                                <>
                                    <FileSpreadsheet className="h-3.5 w-3.5 mr-2" />
                                    Quick Export
                                </>
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* The rest of your existing dashboard content remains the same... */}
            {/* I'll continue with the existing dashboard structure you had */}

            {/* Overview Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {statsCards.map((stat, index) => (
                    <Card key={index} className="overflow-hidden">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className={`p-2 rounded-lg ${stat.color} text-white`}>
                                    {stat.icon}
                                </div>
                                {stat.change && (
                                    <span className={`text-xs px-2 py-1 rounded-full ${stat.change.includes('+') || stat.change === 'High' || stat.change === 'Good'
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

            {/* Tabs for different views */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="financial">Financial</TabsTrigger>
                    <TabsTrigger value="attendance">Attendance</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Revenue Trend */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5" />
                                    Revenue Trend
                                </CardTitle>
                                <CardDescription>Revenue vs New Students (Last 6 Months)</CardDescription>
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
                                                    if (name === 'revenue') return [formatCurrency(Number(value)), 'Revenue'];
                                                    if (name === 'students') return [value, 'New Students'];
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
                                                name="Revenue"
                                            />
                                            <Area
                                                yAxisId="right"
                                                type="monotone"
                                                dataKey="students"
                                                stroke="#82ca9d"
                                                fill="#82ca9d"
                                                fillOpacity={0.3}
                                                name="New Students"
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
                                        Export Data
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Course Popularity */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BarChart3 className="h-5 w-5" />
                                    Course Popularity
                                </CardTitle>
                                <CardDescription>Most enrolled courses</CardDescription>
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
                                                    if (name === 'revenue') return [formatCurrency(Number(value)), 'Revenue'];
                                                    if (name === 'students') return [value, 'Students'];
                                                    return value;
                                                }}
                                            />
                                            <Legend />
                                            <Bar dataKey="students" fill="#8884d8" name="Students" />
                                            <Bar dataKey="revenue" fill="#82ca9d" name="Revenue" />
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
                                        Export Data
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Student Sources */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <PieChart className="h-5 w-5" />
                                    Student Sources
                                </CardTitle>
                                <CardDescription>Where students come from</CardDescription>
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
                                            <Tooltip formatter={(value) => [value, 'Students']} />
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
                                        Export Data
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Teacher Performance */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <GraduationCap className="h-5 w-5" />
                                    Top Teachers
                                </CardTitle>
                                <CardDescription>Performance ratings</CardDescription>
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
                                                        {teacher.students} students • {teacher.attendanceRate.toFixed(1)}% attendance
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
                                                                : 'bg-gray-200'
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
                                        Export Data
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Financial Tab */}
                <TabsContent value="financial" className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <DollarSign className="h-5 w-5" />
                                    Revenue Breakdown
                                </CardTitle>
                                <CardDescription>Total: {formatCurrency(dashboardStats.totalRevenue)}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={coursePopularity}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                                            <YAxis />
                                            <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'Revenue']} />
                                            <Legend />
                                            <Bar dataKey="revenue" fill="#8884d8" name="Course Revenue" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5" />
                                    Monthly Performance
                                </CardTitle>
                                <CardDescription>Revenue growth over time</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={revenueData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'Revenue']} />
                                            <Legend />
                                            <Line
                                                type="monotone"
                                                dataKey="revenue"
                                                stroke="#8884d8"
                                                strokeWidth={2}
                                                dot={{ r: 4 }}
                                                activeDot={{ r: 6 }}
                                                name="Revenue"
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Revenue Summary */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Revenue Summary</CardTitle>
                            <CardDescription>Detailed breakdown by course</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-3 px-4 font-medium">Course</th>
                                            <th className="text-left py-3 px-4 font-medium">Students</th>
                                            <th className="text-left py-3 px-4 font-medium">Revenue</th>
                                            <th className="text-left py-3 px-4 font-medium">Avg. per Student</th>
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
                                    Export Revenue Data
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Attendance Tab */}
                <TabsContent value="attendance" className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5" />
                                    Weekly Attendance
                                </CardTitle>
                                <CardDescription>Last 7 days attendance trend</CardDescription>
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
                                            <Bar dataKey="present" fill="#82ca9d" name="Present" />
                                            <Bar dataKey="absent" fill="#ff8042" name="Absent" />
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
                                        Export Data
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5" />
                                    Attendance Rate
                                </CardTitle>
                                <CardDescription>Overall: {dashboardStats.attendanceRate}%</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col items-center justify-center h-80">
                                    <div className="relative w-48 h-48">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center">
                                                <p className="text-4xl font-bold">{dashboardStats.attendanceRate}%</p>
                                                <p className="text-sm text-muted-foreground">Attendance Rate</p>
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
                                            <p className="text-sm text-muted-foreground">Present (Week)</p>
                                        </div>
                                        <div className="text-center p-4 border rounded-lg">
                                            <p className="text-2xl font-bold text-red-600">
                                                {enhancedAttendanceData.reduce((sum, day) => sum + day.absent, 0)}
                                            </p>
                                            <p className="text-sm text-muted-foreground">Absent (Week)</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Performance Tab */}
                <TabsContent value="performance" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <GraduationCap className="h-5 w-5" />
                                Teacher Performance Metrics
                            </CardTitle>
                            <CardDescription>Detailed teacher analytics</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-3 px-4 font-medium">Teacher</th>
                                            <th className="text-left py-3 px-4 font-medium">Rating</th>
                                            <th className="text-left py-3 px-4 font-medium">Total Students</th>
                                            <th className="text-left py-3 px-4 font-medium">Attendance Rate</th>
                                            <th className="text-left py-3 px-4 font-medium">Performance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {teacherPerformance.map((teacher, index) => {
                                            const performanceScore = (teacher.rating * 0.4) + (teacher.attendanceRate * 0.3) + (Math.min(teacher.students / 50, 1) * 0.3);
                                            const performanceLevel = performanceScore > 4 ? 'Excellent' : performanceScore > 3 ? 'Good' : performanceScore > 2 ? 'Average' : 'Needs Improvement';

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
                                                                        : 'bg-gray-200'
                                                                        }`}
                                                                />
                                                            ))}
                                                            <span className="ml-2 font-medium">{teacher.rating.toFixed(1)}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-4">{teacher.students}</td>
                                                    <td className="py-3 px-4">{teacher.attendanceRate.toFixed(1)}%</td>
                                                    <td className="py-3 px-4">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${performanceLevel === 'Excellent'
                                                            ? 'bg-green-100 text-green-700'
                                                            : performanceLevel === 'Good'
                                                                ? 'bg-blue-100 text-blue-700'
                                                                : performanceLevel === 'Average'
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
                                    Export Teacher Data
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Total Revenue</p>
                                <p className="text-2xl font-bold">{formatCurrency(dashboardStats.totalRevenue)}</p>
                            </div>
                            <DollarSign className="h-8 w-8 text-green-500" />
                        </div>
                        <div className="mt-4">
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-green-500 rounded-full"
                                    style={{ width: `${Math.min(dashboardStats.totalRevenue / 10000 * 100, 100)}%` }}
                                />
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                                Compared to target: {formatCurrency(10000)}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">New Students This Month</p>
                                <p className="text-2xl font-bold">{dashboardStats.newStudentsThisMonth}</p>
                            </div>
                            <TrendingUp className="h-8 w-8 text-blue-500" />
                        </div>
                        <div className="mt-4">
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-blue-500 rounded-full"
                                    style={{ width: `${Math.min(dashboardStats.newStudentsThisMonth / 50 * 100, 100)}%` }}
                                />
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                                Monthly target: 50 students
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Average Attendance</p>
                                <p className="text-2xl font-bold">{dashboardStats.attendanceRate}%</p>
                            </div>
                            <CheckCircle className="h-8 w-8 text-orange-500" />
                        </div>
                        <div className="mt-4">
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-orange-500 rounded-full"
                                    style={{ width: `${dashboardStats.attendanceRate}%` }}
                                />
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                                Target: 90% attendance rate
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Export Summary Card */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileSpreadsheet className="h-5 w-5" />
                        Export Summary
                    </CardTitle>
                    <CardDescription>
                        All data is available for download. Click any export button to download data in Excel or CSV format.
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
                                    <p className="font-medium">Excel Export</p>
                                    <p className="text-sm text-muted-foreground">Complete dashboard with all sheets</p>
                                </div>
                            </div>
                            <Button
                                size="sm"
                                variant="outline"
                                className="w-full mt-2"
                                onClick={exportToExcel}
                                disabled={isExporting}
                            >
                                {isExporting ? 'Exporting...' : 'Download Full Report'}
                            </Button>
                        </div>

                        <div className="border rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
                                    <FileText className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="font-medium">Individual Reports</p>
                                    <p className="text-sm text-muted-foreground">Export specific data sections</p>
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Use the export buttons in each section for specific data
                            </p>
                        </div>

                        <div className="border rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-purple-100 text-purple-700 rounded-lg">
                                    <Table className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="font-medium">Data Points</p>
                                    <p className="text-sm text-muted-foreground">Total records available</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                    <p className="font-medium">{revenueData.length}</p>
                                    <p className="text-xs text-muted-foreground">Revenue Records</p>
                                </div>
                                <div>
                                    <p className="font-medium">{coursePopularity.length}</p>
                                    <p className="text-xs text-muted-foreground">Courses</p>
                                </div>
                                <div>
                                    <p className="font-medium">{teacherPerformance.length}</p>
                                    <p className="text-xs text-muted-foreground">Teachers</p>
                                </div>
                                <div>
                                    <p className="font-medium">{enhancedSourceDistribution.length}</p>
                                    <p className="text-xs text-muted-foreground">Sources</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}