'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import DataTable from '@/app/components/DataTable';
import { Plus, Eye, Pencil, Trash2, GraduationCap, X, Search, User } from 'lucide-react';
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
import { Textarea } from '@/components/ui/textarea';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosClient } from '@/lib/axiosClient';
import { Groups, Payments, Student } from '@prisma/client';
import { Loader2 } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';

const paymentSchema = z.object({
    studentId: z.string().min(1, 'Student is required'),
    amount: z.number().min(1, 'Amount must be greater than 0'),
    date: z.date({
        error: "Date is required",
    }),
    desc: z.string().optional(),
    groupId: z.string().optional().nullable()
});

type PaymentFormData = z.infer<typeof paymentSchema>;

type PaymentWithRelations = Payments & {
    group: Groups | null
    student: Student
}

export default function PaymentsPage() {
    const queryClient = useQueryClient();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState<PaymentWithRelations | null>(null);
    const [viewMode, setViewMode] = useState<'view' | 'edit' | 'create'>('create');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [studentSearch, setStudentSearch] = useState('');
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);


    const { data: groups, isLoading: isLoadingGroups } = useQuery({
        queryKey: ["groups"],
        queryFn: async () => {
            const { data } = await axiosClient.get("/api/groups")
            return data
        },
    });

    const { data: payments, isLoading, refetch } = useQuery({
        queryKey: ["payments"],
        queryFn: async () => {
            const { data } = await axiosClient.get<PaymentWithRelations[]>("/api/payments")
            return data
        },
    });

    console.log(payments)

    const { data: students } = useQuery({
        queryKey: ["students"],
        queryFn: async () => {
            const { data } = await axiosClient.get<Student[]>("/api/students")
            return data
        }
    })

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        trigger,
        watch,
        formState: { errors },
    } = useForm<PaymentFormData>({
        resolver: zodResolver(paymentSchema),
    });

    const selectedDate = watch('date');

    const createPaymentMutation = useMutation({
        mutationFn: async (data: PaymentFormData) => {
            console.log(data)
            const response = await axiosClient.post('/api/payments', {
                studentId: data.studentId,
                date: data.date,
                amount: data.amount,
                groupId: data.groupId || null,
                desc: data.desc
            });
            return response.data;
        },
        onSuccess: () => {
            toast.success('Payment Added', {
                description: 'Payment has been recorded successfully.',
            });
            refetch()
            closeDialog();
        },
        onError: (error: any) => {
            toast.error('Failed to add payment', {
                description: error.response?.data?.error || 'Please try again.',
            });
        },
    });

    const filteredStudents = useMemo(() => {
        if (!students) return [];
        return students.filter((student: Student) =>
            student.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
            student.phone.toLowerCase().includes(studentSearch.toLowerCase())
        );
    }, [students, studentSearch]);

    const updatePaymentMutation = useMutation({
        mutationFn: async ({ id, data }: { id: string, data: PaymentFormData }) => {
            const response = await axiosClient.put(`/api/payments/${id}`, {
                studentId: data.studentId,
                date: data.date,
                amount: data.amount,
                groupId: data.groupId || null,
                desc: data.desc
            });
            return response.data;
        },
        onSuccess: () => {
            toast.success('Payment Updated', {
                description: 'Payment has been updated successfully.',
            });
            queryClient.invalidateQueries({ queryKey: ['payments'] });
            refetch()
            closeDialog();
        },
        onError: (error: any) => {
            toast.error('Failed to update payment', {
                description: error.response?.data?.error || 'Please try again.',
            });
        },
    });

    const deletePaymentMutation = useMutation({
        mutationFn: async (id: string) => {
            await axiosClient.delete(`/api/payments/${id}`);
        },
        onSuccess: () => {
            toast.success('Payment Deleted', {
                description: 'Payment has been deleted successfully.',
            });
            queryClient.invalidateQueries({ queryKey: ['payments'] });
            closeDeleteDialog();
        },
        onError: (error: any) => {
            const errorMessage = error.response?.data?.error || "Failed to delete payment";
            toast.error(errorMessage);

            // If it's a "not found" error, invalidate queries anyway
            if (error.response?.status === 404) {
                queryClient.invalidateQueries({ queryKey: ['payments'] });
                toast.info("Payment was already removed");
                closeDeleteDialog();
            }
        },
    });

    const handleSelectStudent = (student: Student) => {
        setSelectedStudent(student);
        setValue('studentId', student.id);
        setStudentSearch('');
        trigger('studentId');
    };
    const handleClearStudent = () => {
        setSelectedStudent(null);
        setValue('studentId', "student.id");
        trigger('studentId');
    };

    const openDialog = (mode: 'view' | 'edit' | 'create', payment?: PaymentWithRelations) => {
        setViewMode(mode);
        if (payment) {
            setSelectedPayment(payment);
            setValue('studentId', payment.studentId!);
            setValue('amount', Number(payment.amount));
            setValue('date', new Date(payment.date));
            setValue('desc', payment.desc || '');
            setValue('groupId', payment.groupId || '');
        } else {
            reset({
                studentId: '',
                amount: 0,
                date: new Date(),
                desc: '',
                groupId: '',
            });
        }
        setIsDialogOpen(true);
    };

    const openDeleteDialog = (payment: PaymentWithRelations) => {
        setSelectedPayment(payment);
        setIsDeleteDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setSelectedPayment(null);
        reset();
    };

    const closeDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
        setSelectedPayment(null);
    };

    const onSubmit = async (data: PaymentFormData) => {
        if (viewMode === 'edit' && selectedPayment) {
            // Update payment
            updatePaymentMutation.mutate({ id: selectedPayment.id, data });
        } else if (viewMode === 'create') {
            // Create payment
            createPaymentMutation.mutate(data);
        }
    };

    const handleDelete = async () => {
        if (selectedPayment) {
            deletePaymentMutation.mutate(selectedPayment.id);
        }
    };

    const formatDate = (date: Date | string) => {
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        return dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const columns = [
        { key: 'studentName', label: 'Student', sortable: true },
        {
            key: 'amount',
            label: 'Amount',
            sortable: true,
            render: (value: number) => <span className="font-medium">${value.toLocaleString()}</span>,
        },
        {
            key: 'group',
            label: 'Group',
            sortable: true,
            render: (group: Groups | null | undefined) =>
                group?.name || <span className="text-muted-foreground">No group</span>
        },
        {
            key: 'date',
            label: 'Date',
            sortable: true,
            render: (value: Date) => formatDate(value)
        },
    ];

    if (isLoadingGroups) {
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
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Payments</h1>
                    <p className="text-muted-foreground">Track all payment transactions</p>
                </div>
                <Button
                    className="gap-2"
                    onClick={() => openDialog('create')}
                    disabled={isLoadingGroups}
                >
                    <Plus className="h-4 w-4" />
                    Add Payment
                </Button>
            </div>

            {!isLoading && (
                <DataTable
                    columns={columns}
                    data={payments || []}
                    actions={(payment) => (
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openDialog('view', payment)}
                            >
                                <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openDialog('edit', payment)}
                            >
                                <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openDeleteDialog(payment)}
                            >
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </div>
                    )}
                />
            )}


            {/* Payment Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            {viewMode === 'create' ? 'Add New Payment' : viewMode === 'edit' ? 'Edit Payment' : 'View Payment'}
                        </DialogTitle>
                        <DialogDescription>
                            {viewMode === 'create'
                                ? 'Record a new payment transaction'
                                : viewMode === 'edit'
                                    ? 'Update payment information'
                                    : 'Payment details'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className="w-full justify-start h-10"
                                        disabled={viewMode === 'view' || isSubmitting}
                                    >
                                        {selectedStudent ? (
                                            <div className="flex items-center justify-between w-full">
                                                <div className="flex items-center gap-2">
                                                    <User className="h-4 w-4" />
                                                    <span className="truncate">{selectedStudent.name}</span>
                                                </div>
                                                {viewMode !== 'view' && (
                                                    <div
                                                        className="h-6 w-6 hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleClearStudent();
                                                        }}
                                                    >
                                                        <X className="h-3 w-3 hover:bg-accent hover:text-accent-foreground" />
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <User className="h-4 w-4" />
                                                <span>Select a student</span>
                                            </div>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 p-0" align="start">
                                    <div className="p-3 border-b">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
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
                                                    <Button
                                                        key={student.id}
                                                        variant="ghost"
                                                        className="w-full justify-start text-left h-auto py-2 px-3"
                                                        onClick={() => handleSelectStudent(student)}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                                                <User className="h-4 w-4 text-primary" />
                                                            </div>
                                                            <div className="flex flex-col items-start">
                                                                <span className="font-medium">{student.name}</span>
                                                                {student.phone && (
                                                                    <span className="text-xs text-muted-foreground line-clamp-1">
                                                                        {student.phone}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </Button>
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

                        <div className="space-y-2">
                            <Label htmlFor="amount">Amount ($)</Label>
                            <Input
                                id="amount"
                                type="number"
                                step="0.01"
                                {...register('amount', { valueAsNumber: true })}
                                disabled={viewMode === 'view' || createPaymentMutation.isPending || updatePaymentMutation.isPending}
                                placeholder="0.00"
                            />
                            {errors.amount && <p className="text-xs text-destructive">{errors.amount.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="date">Payment Date</Label>
                            <Input
                                id="date"
                                type="date"
                                value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
                                onChange={(e) => setValue('date', e.target.value ? new Date(e.target.value) : new Date())}
                                disabled={viewMode === 'view' || createPaymentMutation.isPending || updatePaymentMutation.isPending}
                            />
                            {errors.date && <p className="text-xs text-destructive">{errors.date.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="groupId">Group (Optional)</Label>
                            <select
                                id="groupId"
                                {...register('groupId')}
                                disabled={viewMode === 'view' || createPaymentMutation.isPending || updatePaymentMutation.isPending || isLoadingGroups}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="">No group</option>
                                {groups?.map((group: Groups) => (
                                    <option key={group.id} value={group.id}>
                                        {group.name}
                                    </option>
                                ))}
                            </select>
                            {errors.groupId && (
                                <p className="text-xs text-destructive">{errors.groupId.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="desc">Description (Optional)</Label>
                            <Textarea
                                id="desc"
                                {...register('desc')}
                                disabled={viewMode === 'view' || createPaymentMutation.isPending || updatePaymentMutation.isPending}
                                rows={3}
                                placeholder="Add any additional notes about this payment"
                            />
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={closeDialog}
                                disabled={createPaymentMutation.isPending || updatePaymentMutation.isPending}
                            >
                                Cancel
                            </Button>
                            {viewMode !== 'view' && (
                                <Button
                                    type="submit"
                                    disabled={createPaymentMutation.isPending || updatePaymentMutation.isPending}
                                >
                                    {(createPaymentMutation.isPending || updatePaymentMutation.isPending) ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            {viewMode === 'create' ? 'Adding...' : 'Saving...'}
                                        </>
                                    ) : (
                                        viewMode === 'create' ? 'Add Payment' : 'Save Changes'
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
                        <DialogTitle>Delete Payment</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete the payment record for {selectedPayment?.student?.name || 'this payment'}?
                            This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={closeDeleteDialog}
                            disabled={deletePaymentMutation.isPending}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={deletePaymentMutation.isPending}
                        >
                            {deletePaymentMutation.isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                'Delete Payment'
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}