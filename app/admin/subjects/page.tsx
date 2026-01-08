'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import DataTable from '@/app/components/DataTable';
import { Plus, Pencil, Trash2, Eye, Search, BookOpen, X, Tag } from 'lucide-react';
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
import * as z from 'zod';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import { axiosClient } from '@/lib/axiosClient';
import { Subject } from '@prisma/client';

// Zod schema for subject
const subjectSchema = z.object({
    name: z.string().min(1, 'Subject name is required').max(100, 'Subject name is too long'),
});

type SubjectFormData = z.infer<typeof subjectSchema>;

// Helper function to transform subjects for DataTable
const transformSubjectsForTable = (subjects: Subject[]) => {
    return subjects.map(subject => ({
        id: subject.id,
        name: subject.name,
        createdAt: subject.createdAt,
        updatedAt: subject.updatedAt,
        _raw: subject // Keep raw data for actions
    }));
};

export default function SubjectsPage() {
    // Fetch subjects data
    const { data: subjectsData, isLoading, refetch } = useQuery({
        queryKey: ["subjects"],
        queryFn: async () => {
            const { data } = await axiosClient.get<Subject[]>("/api/subjects")
            return data
        },
    });

    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [tableData, setTableData] = useState<any[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
    const [viewMode, setViewMode] = useState<'view' | 'edit' | 'create'>('create');
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    // const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (subjectsData) {
            setSubjects(subjectsData);
            setTableData(transformSubjectsForTable(subjectsData));
            refetch()
        }
    }, [subjectsData]);

    // Filter subjects based on search
    const filteredTableData = tableData;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<SubjectFormData>({
        resolver: zodResolver(subjectSchema),
        defaultValues: {
            name: '',
        }
    });

    const openDeleteDialog = (subject: any) => {
        const originalSubject = subjects.find(s => s.id === subject._raw.id) || subject._raw;
        setSelectedSubject(originalSubject);
        setIsDeleteDialogOpen(true);
    };

    const closeDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
        setSelectedSubject(null);
    };

    const openDialog = (mode: 'view' | 'edit' | 'create', tableSubject?: any) => {
        setViewMode(mode);
        if (tableSubject) {
            const originalSubject = subjects.find(s => s.id === tableSubject._raw.id) || tableSubject._raw;
            setSelectedSubject(originalSubject);
            reset({ name: originalSubject.name });
        } else {
            reset({ name: '' });
            setSelectedSubject(null);
        }
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setSelectedSubject(null);
        reset();
    };

    // Create subject using API route
    const createSubject = async (data: SubjectFormData) => {
        const response = await axiosClient.post('/api/subjects', {
            name: data.name,
        });
        return response.data;
    };

    // Update subject using API route
    const updateSubject = async (id: string, data: SubjectFormData) => {
        try {
            const response = await axiosClient.put(`/api/subjects/${id}`, {
                name: data.name,
            });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Failed to update subject');
        }
    };

    const onSubmit = async (data: SubjectFormData) => {
        setIsSubmitting(true);
        try {
            if (viewMode === 'edit' && selectedSubject) {
                // Update subject
                await updateSubject(selectedSubject.id, data);
                toast.success("Subject updated successfully!");
                refetch();
                closeDialog();
            } else if (viewMode === 'create') {
                // Create new subject
                await createSubject(data);
                toast.success("Subject created successfully!");
                refetch();
                closeDialog();
            }
        } catch (error: any) {
            console.error('Error submitting subject:', error);
            toast.error(error.message || "Failed to save subject");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (selectedSubject) {
            try {
                // Delete subject from database
                setIsSubmitting(true)
                console.log(selectedSubject)
                await axiosClient.delete(`/api/subjects/${selectedSubject.id}`);

                setSubjects(subjects.filter((s) => s.id !== selectedSubject.id));
                toast.success("Subject deleted successfully!");
                closeDeleteDialog();
                refetch();

                setIsSubmitting(false)
            } catch (error: any) {
                console.error('Error deleting subject:', error);
                const errorMessage = error.response?.data?.error || "Failed to delete subject";
                toast.error(errorMessage);
                setIsSubmitting(false)
                closeDeleteDialog()

                // If it's a "not found" error, remove from local state anyway
                if (error.response?.status === 404) {
                    setSubjects(subjects.filter((s) => s.id !== selectedSubject.id));
                    toast.info("Subject was already removed");
                    setIsSubmitting(false)
                    closeDeleteDialog();
                }
            }
        }
    };

    // Columns definition for DataTable
    const columns = [
        {
            key: 'name',
            label: 'Subject Name',
            sortable: true,
            render: (value: string, item: any) => {
                return (
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <p className="font-medium">{value}</p>
                            <p className="text-xs text-muted-foreground">
                                ID: {item.id.slice(0, 8)}...
                            </p>
                        </div>
                    </div>
                );
            }
        },
        {
            key: 'createdAt',
            label: 'Created',
            sortable: true,
            render: (value: Date) => {
                return new Date(value).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });
            }
        },
        {
            key: 'updatedAt',
            label: 'Last Updated',
            sortable: true,
            render: (value: Date) => {
                return new Date(value).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });
            }
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Subjects</h1>
                    <p className="text-muted-foreground">
                        Manage all subjects ({filteredTableData.length} total)
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">

                    <Button
                        onClick={() => openDialog('create')}
                        className="gap-2"
                    >
                        <Plus className="h-4 w-4" />
                        Create Subject
                    </Button>
                </div>
            </div>

            {/* Data Table */}
            <DataTable
                columns={columns}
                data={filteredTableData}
                actions={(item) => (
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openDialog('view', item)}
                            title="View subject"
                        >
                            <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openDialog('edit', item)}
                            title="Edit subject"
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openDeleteDialog(item)}
                            title="Delete subject"
                        >
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                )}
                emptyMessage={
                    <div className="text-center py-12">
                        <div className="mx-auto h-12 w-12 text-muted-foreground mb-4">
                            <BookOpen className="h-12 w-12" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">No subjects found</h3>
                        <p className="text-muted-foreground mb-4">
                            {subjectsData ? 'Try a different search term' : 'Get started by creating a new subject'}
                        </p>
                        {subjectsData && (
                            <Button onClick={() => openDialog('create')}>
                                <Plus className="h-4 w-4 mr-2" />
                                Create Subject
                            </Button>
                        )}
                    </div>
                }
            />

            {/* Subject Form Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            {viewMode === 'create' ? 'Create New Subject' :
                                viewMode === 'edit' ? 'Edit Subject' : 'View Subject'}
                        </DialogTitle>
                        <DialogDescription>
                            {viewMode === 'create'
                                ? 'Add a new subject to the system'
                                : viewMode === 'edit'
                                    ? 'Update subject information'
                                    : 'Subject details'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">
                                Subject Name *
                                {viewMode === 'view' && selectedSubject && (
                                    <span className="text-xs text-muted-foreground ml-2">
                                        ID: {selectedSubject.id}
                                    </span>
                                )}
                            </Label>
                            <div className="relative">
                                <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id="name"
                                    {...register('name')}
                                    disabled={viewMode === 'view' || isSubmitting}
                                    placeholder="Enter subject name (e.g., Mathematics, Physics)"
                                    className="pl-10"
                                />
                            </div>
                            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                        </div>

                        {viewMode === 'view' && selectedSubject && (
                            <div className="space-y-3 pt-2 border-t">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-xs text-muted-foreground">Created</Label>
                                        <p className="text-sm">
                                            {new Date(selectedSubject.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    <div>
                                        <Label className="text-xs text-muted-foreground">Last Updated</Label>
                                        <p className="text-sm">
                                            {new Date(selectedSubject.updatedAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <DialogFooter className="gap-2 sm:gap-0">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={closeDialog}
                                disabled={isSubmitting}
                            >
                                {viewMode === 'view' ? 'Close' : 'Cancel'}
                            </Button>
                            {viewMode !== 'view' && (
                                <Button type="submit" disabled={isSubmitting} className='ml-2'>
                                    {isSubmitting ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                            {viewMode === 'create' ? 'Creating...' : 'Saving...'}
                                        </div>
                                    ) : (
                                        viewMode === 'create' ? 'Create Subject' : 'Save Changes'
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
                        <DialogTitle className="text-destructive">Delete Subject</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete the "<strong>{selectedSubject?.name}</strong>" subject?
                            This action cannot be undone.
                        </DialogDescription>
                        <div className="mt-2 p-3 bg-destructive/10 rounded-md">
                            <p className="text-sm text-destructive font-medium">
                                ⚠️ Important: You cannot delete a subject that has associated courses or teachers.
                                Please remove all courses and teachers from this subject first.
                            </p>
                        </div>
                    </DialogHeader>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={closeDeleteDialog} disabled={isSubmitting}>
                            Cancel
                        </Button>
                        <Button type="button" variant="destructive" onClick={handleDelete} disabled={isSubmitting}>
                            {
                                isSubmitting ? "Deleting Subject..." : "Delete Subject"
                            }
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}