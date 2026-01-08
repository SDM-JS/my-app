'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import DataTable from '@/app/components/DataTable';
import { mockAttendances, Attendance } from '@/app/data/mockData';
import { Plus } from 'lucide-react';
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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { toast } from 'sonner';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const attendanceSchema = z.object({
    date: z.date({
        error: "Date is required",
    }),
    group: z.string().min(1, 'Group is required'),
    presentCount: z.number().min(0, 'Present count must be positive'),
    absentCount: z.number().min(0, 'Absent count must be positive'),
    notes: z.string().optional(),
});

type AttendanceFormData = z.infer<typeof attendanceSchema>;

export default function TeacherAttendancesPage() {
    const [attendances, setAttendances] = useState<Attendance[]>(mockAttendances);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<AttendanceFormData>({
        resolver: zodResolver(attendanceSchema),
        defaultValues: {
            date: new Date(),
            presentCount: 0,
            absentCount: 0,
        }
    });

    const selectedDate = watch('date');

    const openCreateDialog = () => {
        reset({
            date: new Date(),
            group: '',
            presentCount: 0,
            absentCount: 0,
            notes: '',
        });
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        reset();
    };

    const onSubmit = (data: AttendanceFormData) => {
        const newAttendance: Attendance = {
            id: `ATT${(attendances.length + 1).toString().padStart(3, '0')}`,
            date: format(data.date, 'yyyy-MM-dd'),
            group: data.group,
            status: "absent",
            student: 'Multiple Students',
            description: data.notes,
        };

        setAttendances([newAttendance, ...attendances]);

        toast.success('Attendance Recorded', {
            description: `Attendance for ${data.group} on ${formatDisplayDate(data.date)} has been saved.`,
        });

        console.log('Create attendance:', newAttendance);
        closeDialog();
    };

    const formatDisplayDate = (date: Date) => {
        return format(date, 'MMMM d, yyyy');
    };

    const formatTableDate = (dateString: string) => {
        const date = new Date(dateString);
        return format(date, 'EEE, MMM d');
    };

    const columns = [
        {
            key: 'date',
            label: 'Date',
            sortable: true,
            render: (value: string) => formatTableDate(value)
        },
        { key: 'group', label: 'Group', sortable: true },
        {
            key: 'present',
            label: 'Present',
            render: () => {
                const present = Math.floor(Math.random() * 5) + 10;
                return <span className="text-green-500 font-medium">{present}</span>;
            },
        },
        {
            key: 'absent',
            label: 'Absent',
            render: () => {
                const absent = Math.floor(Math.random() * 3);
                return <span className="text-red-500 font-medium">{absent}</span>;
            },
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">My Attendances</h1>
                    <p className="text-muted-foreground">Track attendance records for your classes</p>
                </div>
                <Button className="gap-2" onClick={openCreateDialog}>
                    <Plus className="h-4 w-4" />
                    Mark Attendance
                </Button>
            </div>

            <DataTable columns={columns} data={attendances} />

            {/* Mark Attendance Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Mark Group Attendance</DialogTitle>
                        <DialogDescription>
                            Record attendance for an entire group. You can add individual student details later.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="date">Attendance Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !selectedDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={selectedDate}
                                        onSelect={(date) => date && setValue('date', date)}
                                        initialFocus
                                        disabled={(date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                        }
                                    />
                                </PopoverContent>
                            </Popover>
                            {errors.date && <p className="text-xs text-destructive">{errors.date.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="group">Group</Label>
                            <Input
                                id="group"
                                {...register('group')}
                                placeholder="Enter group name"
                            />
                            {errors.group && <p className="text-xs text-destructive">{errors.group.message}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="presentCount">Present Students</Label>
                                <Input
                                    id="presentCount"
                                    type="number"
                                    min="0"
                                    {...register('presentCount', { valueAsNumber: true })}
                                    placeholder="0"
                                />
                                {errors.presentCount && <p className="text-xs text-destructive">{errors.presentCount.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="absentCount">Absent Students</Label>
                                <Input
                                    id="absentCount"
                                    type="number"
                                    min="0"
                                    {...register('absentCount', { valueAsNumber: true })}
                                    placeholder="0"
                                />
                                {errors.absentCount && <p className="text-xs text-destructive">{errors.absentCount.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="notes">Notes (Optional)</Label>
                            <textarea
                                id="notes"
                                {...register('notes')}
                                rows={3}
                                placeholder="Add any additional notes about this attendance session..."
                                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={closeDialog}>
                                Cancel
                            </Button>
                            <Button type="submit">
                                Save Attendance
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}