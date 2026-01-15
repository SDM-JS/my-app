'use client';

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import DataTable from '@/app/components/DataTable';
import { Plus, Trash2, Eye, Search, User, GraduationCap, X, Pencil } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import { axiosClient } from '@/lib/axiosClient';
import { Attendances, Student, Teacher } from '@prisma/client';

// Zod schema matching your Prisma schema - at least one of studentId or teacherId is required
const attendanceSchema = z.object({
    desc: z.string().min(1, 'Description is required'),
    date: z.string().min(1, 'Date is required'),
    studentId: z.string().optional(),
    teacherId: z.string().optional(),
}).refine(
    (data) => data.studentId || data.teacherId,
    {
        message: 'Either student or teacher must be selected',
        path: ['studentId']
    }
);

type AttendanceFormData = z.infer<typeof attendanceSchema>;

// Extended type to include relations
type AttendanceWithRelations = Attendances & {
    student: Student | null;
    teacher: Teacher | null;
};

// Helper function to transform attendances for DataTable
const transformAttendancesForTable = (attendances: AttendanceWithRelations[]) => {
    return attendances.map(attendance => ({
        id: attendance.id,
        student: attendance.student?.name || 'No student',
        teacher: attendance.teacher?.name || 'No teacher',
        date: attendance.date,
        desc: attendance.desc,
        createdAt: attendance.createdAt,
        // Keep the original objects for render functions
        _student: attendance.student,
        _teacher: attendance.teacher,
        _raw: attendance
    }));
};

export default function AttendancesPage() {
    // Fetch attendances data with relations
    const { data: attendancesData, isLoading, refetch } = useQuery({
        queryKey: ["attendances"],
        queryFn: async () => {
            const { data } = await axiosClient.get<AttendanceWithRelations[]>("/api/attendances")
            return data
        },
    });

    // Fetch students for dropdown
    const { data: studentsData } = useQuery({
        queryKey: ["students"],
        queryFn: async () => {
            const { data } = await axiosClient.get("/api/students")
            return data
        },
    });

    // Fetch teachers for dropdown
    const { data: teachersData } = useQuery({
        queryKey: ["teachers"],
        queryFn: async () => {
            const { data } = await axiosClient.get("/api/teachers")
            return data
        },
    });

    const [attendances, setAttendances] = useState<AttendanceWithRelations[]>([]);
    const [tableData, setTableData] = useState<any[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedAttendance, setSelectedAttendance] = useState<AttendanceWithRelations | null>(null);
    const [viewMode, setViewMode] = useState<'view' | 'edit' | 'create'>('create');
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Popover states
    const [studentSearch, setStudentSearch] = useState('');
    const [teacherSearch, setTeacherSearch] = useState('');
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

    useEffect(() => {
        if (attendancesData) {
            setAttendances(attendancesData);
            setTableData(transformAttendancesForTable(attendancesData));
        }
    }, [attendancesData]);

    // Filter students based on search
    const filteredStudents = useMemo(() => {
        if (!studentsData) return [];
        return studentsData.filter((student: Student) =>
            student.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
            student.phone.includes(studentSearch)
        );
    }, [studentsData, studentSearch]);

    // Filter teachers based on search
    const filteredTeachers = useMemo(() => {
        if (!teachersData) return [];
        return teachersData.filter((teacher: Teacher) =>
            teacher.name.toLowerCase().includes(teacherSearch.toLowerCase()) ||
            teacher.email.toLowerCase().includes(teacherSearch.toLowerCase())
        );
    }, [teachersData, teacherSearch]);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
        trigger,
    } = useForm<AttendanceFormData>({
        resolver: zodResolver(attendanceSchema),
    });

    const openDeleteDialog = (attendance: any) => {
        const originalAttendance = attendances.find(a => a.id === attendance._raw.id) || attendance._raw;
        setSelectedAttendance(originalAttendance);
        setIsDeleteDialogOpen(true);
    };

    const closeDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
        setSelectedAttendance(null);
    };

    const openDialog = (mode: 'view' | 'edit' | 'create', tableAttendance?: any) => {
        setViewMode(mode);
        if (tableAttendance) {
            const originalAttendance = attendances.find(a => a.id === tableAttendance._raw.id) || tableAttendance._raw;
            setSelectedAttendance(originalAttendance);
            setSelectedStudent(originalAttendance.student);
            setSelectedTeacher(originalAttendance.teacher);
            setValue('desc', originalAttendance.desc);
            setValue('date', new Date(originalAttendance.date).toISOString().split('T')[0]);
            setValue('studentId', originalAttendance.studentId || '');
            setValue('teacherId', originalAttendance.teacherId || '');
        } else {
            reset({
                desc: '',
                date: new Date().toISOString().split('T')[0],
                studentId: '',
                teacherId: '',
            });
            setSelectedStudent(null);
            setSelectedTeacher(null);
        }
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setSelectedAttendance(null);
        setSelectedStudent(null);
        setSelectedTeacher(null);
        setStudentSearch('');
        setTeacherSearch('');
        reset();
    };

    // Handle student selection
    const handleSelectStudent = (student: Student) => {
        setSelectedStudent(student);
        setValue('studentId', student.id);
        setStudentSearch('');
        trigger('studentId');
    };

    // Handle teacher selection
    const handleSelectTeacher = (teacher: Teacher) => {
        setSelectedTeacher(teacher);
        setValue('teacherId', teacher.id);
        setTeacherSearch('');
        trigger('teacherId');
    };

    // Clear student selection
    const handleClearStudent = () => {
        setSelectedStudent(null);
        setValue('studentId', '');
        trigger('studentId');
    };

    // Clear teacher selection
    const handleClearTeacher = () => {
        setSelectedTeacher(null);
        setValue('teacherId', '');
        trigger('teacherId');
    };

    // Create attendance using API route
    const createAttendance = async (data: AttendanceFormData) => {
        const response = await axiosClient.post('/api/attendances', {
            desc: data.desc,
            date: new Date(data.date),
            studentId: data.studentId || null,
            teacherId: data.teacherId || null,
        });
        return response.data;
    };

    // Update attendance using API route
    const updateAttendance = async (id: string, data: AttendanceFormData) => {
        try {
            const response = await axiosClient.put(`/api/attendances/${id}`, {
                desc: data.desc,
                date: new Date(data.date),
                studentId: data.studentId || null,
                teacherId: data.teacherId || null,
            });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Failed to update attendance');
        }
    };

    const onSubmit = async (data: AttendanceFormData) => {
        setIsSubmitting(true);
        try {
            if (viewMode === 'edit' && selectedAttendance) {
                // Update attendance
                await updateAttendance(selectedAttendance.id, data);
                toast.success("Attendance updated successfully!");
                refetch();
                closeDialog();
            } else if (viewMode === 'create') {
                // Create new attendance
                await createAttendance(data);
                toast.success("Attendance created successfully!");
                refetch();
                closeDialog();
            }
        } catch (error: any) {
            console.error('Error submitting attendance:', error);
            toast.error(error.message || "Failed to save attendance");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (selectedAttendance) {
            setIsSubmitting(true);
            try {
                // Delete attendance from database
                await axiosClient.delete(`/api/attendances/${selectedAttendance.id}`);

                // Update local state
                setAttendances(attendances.filter((a) => a.id !== selectedAttendance.id));
                toast.success("Attendance deleted successfully!");
                closeDeleteDialog();
            } catch (error: any) {
                console.error('Error deleting attendance:', error);
                const errorMessage = error.response?.data?.error || "Failed to delete attendance";
                toast.error(errorMessage);

                // If it's a "not found" error, remove from local state anyway
                if (error.response?.status === 404) {
                    setAttendances(attendances.filter((a) => a.id !== selectedAttendance.id));
                    toast.info("Attendance was already removed");
                    closeDeleteDialog();
                }
            }
            finally {
                setIsSubmitting(false);
            }
        }
    };

    // Format date for display
    const formatDate = (dateString: string | Date) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return 'Invalid date';
        }
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const formatDateTime = (dateString: string | Date) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return 'Invalid date';
        }
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    // Fixed columns definition to match DataTable interface
    const columns = [
        {
            key: 'desc',
            label: 'Description',
            sortable: true
        },
        {
            key: 'student',
            label: 'Student',
            sortable: true,
            render: (value: string, item: any) => {
                return value || <span className="text-muted-foreground">No student</span>;
            }
        },
        {
            key: 'teacher',
            label: 'Teacher',
            sortable: true,
            render: (value: string, item: any) => {
                return value || <span className="text-muted-foreground">No teacher</span>;
            }
        },
        {
            key: 'date',
            label: 'Date',
            sortable: true,
            render: (value: Date | string) => formatDate(value)
        },
        {
            key: 'createdAt',
            label: 'Recorded',
            sortable: true,
            render: (value: Date | string) => formatDateTime(value)
        },
    ];

    // Loading state
    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <div className="h-8 w-48 bg-muted rounded-md animate-pulse"></div>
                        <div className="h-4 w-64 bg-muted/50 rounded-md animate-pulse"></div>
                    </div>
                    <div className="h-9 w-28 bg-muted rounded-md animate-pulse"></div>
                </div>

                <div className="rounded-lg border bg-card">
                    <div className="p-6">
                        <div className="h-10 w-full bg-muted rounded-md animate-pulse mb-4"></div>
                        <div className="space-y-3">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 bg-muted rounded-full animate-pulse"></div>
                                        <div className="space-y-2">
                                            <div className="h-4 w-40 bg-muted rounded animate-pulse"></div>
                                            <div className="h-3 w-28 bg-muted/50 rounded animate-pulse"></div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="h-6 w-16 bg-muted rounded-full animate-pulse"></div>
                                        <div className="h-6 w-20 bg-muted rounded-full animate-pulse"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Attendances</h1>
                    <p className="text-muted-foreground">
                        Monitor attendance records ({tableData.length} total)
                    </p>
                </div>
                <Button
                    onClick={() => openDialog('create')}
                    className="gap-2"
                >
                    <Plus className="h-4 w-4" />
                    Mark Attendance
                </Button>
            </div>

            {/* Data Table */}
            <DataTable
                columns={columns}
                data={tableData}
                actions={(item) => (
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openDialog('view', item)}
                            title="View attendance"
                        >
                            <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openDialog('edit', item)}
                            title="Edit attendance"
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openDeleteDialog(item)}
                            title="Delete attendance"
                        >
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                )}
            />

            {/* Attendance Form Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            {viewMode === 'create' ? 'Mark Attendance' :
                                viewMode === 'edit' ? 'Edit Attendance' : 'Attendance Details'}
                        </DialogTitle>
                        <DialogDescription>
                            {viewMode === 'create'
                                ? 'Record a new attendance entry'
                                : viewMode === 'edit'
                                    ? 'Update attendance information'
                                    : 'Attendance details'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="desc">Description *</Label>
                            <Input
                                id="desc"
                                {...register('desc')}
                                disabled={viewMode === 'view' || isSubmitting}
                                placeholder="Enter description (e.g., 'Regular class', 'Exam')"
                            />
                            {errors.desc && <p className="text-xs text-destructive">{errors.desc.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="date">Date *</Label>
                            <Input
                                id="date"
                                type="date"
                                {...register('date')}
                                disabled={viewMode === 'view' || isSubmitting}
                            />
                            {errors.date && <p className="text-xs text-destructive">{errors.date.message}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Student Selection Popover */}
                            <div className="space-y-2">
                                <Label>Student (Optional)</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <div className="relative">
                                            <Button
                                                variant="outline"
                                                className="w-full justify-start h-10 pr-10"
                                                disabled={viewMode === 'view' || isSubmitting}
                                            >
                                                {selectedStudent ? (
                                                    <div className="flex items-center gap-2">
                                                        <User className="h-4 w-4" />
                                                        <span className="truncate">{selectedStudent.name}</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2 text-muted-foreground">
                                                        <User className="h-4 w-4" />
                                                        <span>Select student</span>
                                                    </div>
                                                )}
                                            </Button>
                                            {selectedStudent && viewMode !== 'view' && (
                                                <button
                                                    type="button"
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 flex items-center justify-center rounded-sm opacity-70 hover:opacity-100 hover:bg-accent"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleClearStudent();
                                                    }}
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            )}
                                        </div>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80 p-0" align="start">
                                        <div className="p-3 border-b">
                                            <div className="relative">
                                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                                <Input
                                                    placeholder="Search students..."
                                                    value={studentSearch}
                                                    onChange={(e) => setStudentSearch(e.target.value)}
                                                    className="pl-10"
                                                />
                                            </div>
                                        </div>
                                        <ScrollArea className="h-64">
                                            {filteredStudents.length > 0 ? (
                                                <div className="p-1">
                                                    {filteredStudents.map((student: Student) => (
                                                        <button
                                                            key={student.id}
                                                            className="w-full justify-start text-left h-auto py-2 px-3 hover:bg-accent rounded-sm"
                                                            onClick={() => handleSelectStudent(student)}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                                                    <User className="h-4 w-4 text-primary" />
                                                                </div>
                                                                <div className="flex flex-col items-start">
                                                                    <span className="font-medium">{student.name}</span>
                                                                    <span className="text-xs text-muted-foreground">
                                                                        {student.phone}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="py-6 text-center">
                                                    <p className="text-sm text-muted-foreground">
                                                        {studentSearch ? 'No students found' : 'No students available'}
                                                    </p>
                                                </div>
                                            )}
                                        </ScrollArea>
                                    </PopoverContent>
                                </Popover>
                                {errors.studentId && <p className="text-xs text-destructive">{errors.studentId.message}</p>}
                                <input type="hidden" {...register('studentId')} />
                            </div>

                            {/* Teacher Selection Popover */}
                            <div className="space-y-2">
                                <Label>Teacher (Optional)</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <div className="relative">
                                            <Button
                                                variant="outline"
                                                className="w-full justify-start h-10 pr-10"
                                                disabled={viewMode === 'view' || isSubmitting}
                                            >
                                                {selectedTeacher ? (
                                                    <div className="flex items-center gap-2">
                                                        <GraduationCap className="h-4 w-4" />
                                                        <span className="truncate">{selectedTeacher.name}</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2 text-muted-foreground">
                                                        <GraduationCap className="h-4 w-4" />
                                                        <span>Select teacher</span>
                                                    </div>
                                                )}
                                            </Button>
                                            {selectedTeacher && viewMode !== 'view' && (
                                                <button
                                                    type="button"
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 flex items-center justify-center rounded-sm opacity-70 hover:opacity-100 hover:bg-accent"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleClearTeacher();
                                                    }}
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            )}
                                        </div>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80 p-0" align="start">
                                        <div className="p-3 border-b">
                                            <div className="relative">
                                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                                <Input
                                                    placeholder="Search teachers..."
                                                    value={teacherSearch}
                                                    onChange={(e) => setTeacherSearch(e.target.value)}
                                                    className="pl-10"
                                                />
                                            </div>
                                        </div>
                                        <ScrollArea className="h-64">
                                            {filteredTeachers.length > 0 ? (
                                                <div className="p-1">
                                                    {filteredTeachers.map((teacher: Teacher) => (
                                                        <button
                                                            key={teacher.id}
                                                            className="w-full justify-start text-left h-auto py-2 px-3 hover:bg-accent rounded-sm"
                                                            onClick={() => handleSelectTeacher(teacher)}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                                                    <GraduationCap className="h-4 w-4 text-primary" />
                                                                </div>
                                                                <div className="flex flex-col items-start">
                                                                    <span className="font-medium">{teacher.name}</span>
                                                                    <span className="text-xs text-muted-foreground">
                                                                        {teacher.email}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="py-6 text-center">
                                                    <p className="text-sm text-muted-foreground">
                                                        {teacherSearch ? 'No teachers found' : 'No teachers available'}
                                                    </p>
                                                </div>
                                            )}
                                        </ScrollArea>
                                    </PopoverContent>
                                </Popover>
                                {errors.teacherId && <p className="text-xs text-destructive">{errors.teacherId.message}</p>}
                                <input type="hidden" {...register('teacherId')} />
                            </div>
                        </div>

                        {/* Show error if neither student nor teacher is selected */}
                        {!errors.studentId && !errors.teacherId && errors.root && (
                            <p className="text-xs text-destructive">Either student or teacher must be selected</p>
                        )}

                        <DialogFooter className="gap-2 sm:gap-0">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={closeDialog}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                            {viewMode !== 'view' && (
                                <Button type="submit" disabled={isSubmitting} className='ml-2'>
                                    {isSubmitting ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                            {viewMode === 'create' ? 'Creating...' : 'Saving...'}
                                        </div>
                                    ) : (
                                        viewMode === 'create' ? 'Mark Attendance' : 'Save Changes'
                                    )}
                                </Button>
                            )}
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={closeDeleteDialog}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-destructive">Delete Attendance Record</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this attendance record?
                            This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={closeDeleteDialog}>
                            Cancel
                        </Button>
                        <Button type="button" variant="destructive" onClick={handleDelete} disabled={isSubmitting}>
                            {isSubmitting ? "Deleting Record..." : "Delete record"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}