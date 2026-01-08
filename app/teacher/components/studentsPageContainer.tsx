'use client';

import DataTable from '@/app/components/DataTable';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

type StudentData = {
    id: string;
    name: string;
    phone: string;
    birthday: Date;
    group: string;
    lastAttendance: Date | null;
    progress: number;
    groupData: any;
    courses: any[];
    attendances: any[];
    payments: any[];
    balance: number;
    totalPaid: number;
    totalCoursePrice: number;
};

export const TeacherStudentsPage = ({ students }: { students: StudentData[] }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(null);

    const openDialog = (student: StudentData) => {
        setSelectedStudent(student);
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setSelectedStudent(null);
    };

    // Helper function to get progress color
    const getProgressColor = (progress: number) => {
        if (progress >= 80) return 'text-green-600';
        if (progress >= 60) return 'text-blue-600';
        if (progress >= 40) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getProgressStatus = (progress: number) => {
        if (progress >= 80) return 'Excellent';
        if (progress >= 60) return 'Good';
        if (progress >= 40) return 'Average';
        return 'Needs Improvement';
    };

    const columns = [
        {
            key: 'id',
            label: 'ID',
            sortable: true,
            render: (_: any, item: StudentData) => (
                <span className="font-mono text-xs">{item.id.substring(0, 8)}...</span>
            )
        },
        { key: 'name', label: 'Name', sortable: true },
        { key: 'group', label: 'Group', sortable: true },
        {
            key: 'lastAttendance',
            label: 'Last Attendance',
            sortable: true,
            render: (value: Date | null) => (
                value ? format(new Date(value), 'MMM dd, yyyy') : 'No attendance'
            )
        },
        {
            key: 'progress',
            label: 'Progress',
            sortable: true,
            render: (value: number, item: StudentData) => (
                <div className="flex items-center gap-2">
                    <div className="h-2 w-20 rounded-full bg-muted overflow-hidden">
                        <div
                            className="h-full bg-primary transition-all"
                            style={{ width: `${value}%` }}
                        />
                    </div>
                    <span className={`text-sm font-medium ${getProgressColor(value)}`}>
                        {value}%
                    </span>
                </div>
            ),
        },
    ];

    // Format date for display
    const formatDate = (date: Date) => {
        return format(new Date(date), 'PPP');
    };

    // Format currency
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">My Students</h1>
                <p className="text-muted-foreground">View and track your students' progress</p>
            </div>

            <DataTable
                columns={columns}
                data={students}
                actions={(student) => (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openDialog(student)}
                    >
                        <Eye className="h-4 w-4" />
                    </Button>
                )}
            />

            {/* Student Details Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Student Details</DialogTitle>
                        <DialogDescription>
                            Complete information about {selectedStudent?.name}
                        </DialogDescription>
                    </DialogHeader>

                    {selectedStudent && (
                        <div className="space-y-6">
                            {/* Basic Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Basic Information</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Student ID</p>
                                        <p className="text-base font-mono text-xs">{selectedStudent.id}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Name</p>
                                        <p className="text-base font-medium">{selectedStudent.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Phone</p>
                                        <p className="text-base">{selectedStudent.phone}</p>
                                    </div>
                                    {/* <div>
                                        <p className="text-sm font-medium text-muted-foreground">Came From</p>
                                        <p className="text-base">{selectedStudent.cameFrom}</p>
                                    </div> */}
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Birthday</p>
                                        <p className="text-base">{formatDate(selectedStudent.birthday)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Group</p>
                                        <p className="text-base">{selectedStudent.group}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Course Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Course Information</h3>
                                <div className="space-y-3">
                                    {selectedStudent.courses.map((course, index) => (
                                        <div key={index} className="border rounded-lg p-3">
                                            <p className="font-medium">{course.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                Price: {formatCurrency(Number(course.price))}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Progress Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Progress Information</h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Progress</p>
                                        <div className="flex items-center gap-3 mt-1">
                                            <div className="h-3 w-32 rounded-full bg-muted overflow-hidden">
                                                <div
                                                    className="h-full bg-primary transition-all"
                                                    style={{ width: `${selectedStudent.progress}%` }}
                                                />
                                            </div>
                                            <span className={`text-base font-medium ${getProgressColor(selectedStudent.progress)}`}>
                                                {selectedStudent.progress}%
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Progress Status</p>
                                        <p className="text-base">{getProgressStatus(selectedStudent.progress)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Last Attendance</p>
                                        <p className="text-base">
                                            {selectedStudent.lastAttendance
                                                ? formatDate(selectedStudent.lastAttendance)
                                                : 'No attendance recorded'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Total Attendances</p>
                                        <p className="text-base">{selectedStudent.attendances.length} sessions</p>
                                    </div>
                                </div>
                            </div>

                            {/* Financial Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Financial Information</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Total Course Price</p>
                                        <p className="text-base font-medium">
                                            {formatCurrency(selectedStudent.totalCoursePrice)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Total Paid</p>
                                        <p className="text-base font-medium text-green-600">
                                            {formatCurrency(selectedStudent.totalPaid)}
                                        </p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-sm font-medium text-muted-foreground">Balance</p>
                                        <p className={`text-lg font-medium ${selectedStudent.balance < 0 ? 'text-red-500' : 'text-green-500'}`}>
                                            {formatCurrency(selectedStudent.balance)}
                                            {selectedStudent.balance < 0 ? ' (Owes)' : ' (Paid in Full)'}
                                        </p>
                                    </div>
                                </div>
                                {selectedStudent.payments.length > 0 && (
                                    <div className="space-y-2">
                                        <p className="text-sm font-medium text-muted-foreground">Payment History</p>
                                        <div className="space-y-2 max-h-40 overflow-y-auto">
                                            {selectedStudent.payments.map((payment, index) => (
                                                <div key={index} className="border rounded p-2 text-sm">
                                                    <div className="flex justify-between">
                                                        <span>{formatDate(payment.date)}</span>
                                                        <span className="font-medium text-green-600">
                                                            +{formatCurrency(Number(payment.amount))}
                                                        </span>
                                                    </div>
                                                    <p className="text-muted-foreground text-xs">{payment.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Attendance History */}
                            {selectedStudent.attendances.length > 0 && (
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold">Recent Attendance</h3>
                                    <div className="space-y-2 max-h-40 overflow-y-auto">
                                        {selectedStudent.attendances.slice(0, 5).map((attendance, index) => (
                                            <div key={index} className="border rounded p-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span>{formatDate(attendance.date)}</span>
                                                    <Badge variant="outline" className="text-xs">
                                                        Present
                                                    </Badge>
                                                </div>
                                                <p className="text-muted-foreground text-xs">{attendance.desc || 'No description'}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}