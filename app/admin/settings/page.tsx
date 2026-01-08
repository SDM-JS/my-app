'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Save, Bell, Globe, Tag, Plus, Eye, Pencil, Trash2 } from 'lucide-react';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DataTable, { Column } from '@/app/components/DataTable';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosClient } from '@/lib/axiosClient';
import { sourceSchema, validSchema } from '@/lib/validation';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';
import { cameFrom } from '@prisma/client';
import { toast } from 'sonner';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

type formData = z.infer<typeof validSchema>
type sourceFormData = z.infer<typeof sourceSchema>

export default function SettingsPage() {
    const queryClient = useQueryClient();

    const {
        data: cameFromData,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ['cameFrom'],
        queryFn: async () => {
            try {
                const { data } = await axiosClient.get("/api/cameFrom")
                return data
            } catch (error) {
                console.error("Error fetching cameFrom data:", error)
                throw error
            }
        },
        staleTime: 5 * 60 * 1000,
    })

    const userInfo = useForm<formData>({
        resolver: zodResolver(validSchema),
    });

    const sourceForm = useForm<sourceFormData>({
        resolver: zodResolver(sourceSchema),
        defaultValues: {
            name: ''
        }
    })

    const [viewMode, setViewMode] = useState<'view' | 'edit' | 'create'>('create');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedSource, setSelectedSource] = useState<cameFrom | null>(null)

    // Create mutation
    const createSource = useMutation({
        mutationKey: ["sourceCreate"],
        mutationFn: async (name: string) => {
            const { data } = await axiosClient.post("/api/cameFrom", { name })
            return data
        },
        onSuccess: async () => {
            toast.success("Source created successfully!")
            setIsDialogOpen(false)
            sourceForm.reset()
            await queryClient.invalidateQueries({ queryKey: ['cameFrom'] })
        },
        onError: (error) => {
            toast.error("Failed to create source")
            console.error("Create source error:", error)
        }
    })

    // Update mutation
    const updateSource = useMutation({
        mutationKey: ["sourceUpdate"],
        mutationFn: async ({ id, name }: { id: string, name: string }) => {
            const { data } = await axiosClient.put(`/api/cameFrom/${id}`, { name })
            return data
        },
        onSuccess: async () => {
            toast.success("Source updated successfully!")
            setIsDialogOpen(false)
            sourceForm.reset()
            await queryClient.invalidateQueries({ queryKey: ['cameFrom'] })
        },
        onError: (error) => {
            toast.error("Failed to update source")
            console.error("Update source error:", error)
        }
    })

    // Delete mutation
    const deleteSource = useMutation({
        mutationKey: ["sourceDelete"],
        mutationFn: async (id: string) => {
            const { data } = await axiosClient.delete(`/api/cameFrom/${id}`)
            return data
        },
        onSuccess: async () => {
            toast.success("Source deleted successfully!")
            setIsDeleteDialogOpen(false)
            setSelectedSource(null)
            await queryClient.invalidateQueries({ queryKey: ['cameFrom'] })
        },
        onError: (error) => {
            toast.error("Failed to delete source")
            console.error("Delete source error:", error)
        }
    })

    const handleSourceSubmit = (data: sourceFormData) => {
        if (viewMode === 'create') {
            createSource.mutate(data.name)
        } else if (viewMode === 'edit' && selectedSource) {
            updateSource.mutate({ id: selectedSource.id, name: data.name })
        }
    }

    const handleDeleteSource = () => {
        if (selectedSource) {
            deleteSource.mutate(selectedSource.id)
        }
    }

    const openDialog = (mode: 'view' | 'edit' | 'create', source?: cameFrom) => {
        setViewMode(mode);
        if (source) {
            setSelectedSource(source);
            sourceForm.reset({
                name: source.name,
            });
        } else {
            sourceForm.reset({
                name: '',
            });
            setSelectedSource(null);
        }
        setIsDialogOpen(true);
    };

    const openDeleteDialog = (source: cameFrom) => {
        setSelectedSource(source);
        setIsDeleteDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setSelectedSource(null);
        sourceForm.reset();
    };

    const closeDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
        setSelectedSource(null);
    };

    const onSubmit = (data: formData) => {
        console.log(data)
        userInfo.reset()
    }

    const columns: Column<Record<string, any>>[] = [{
        key: "name",
        label: "Source name",
        sortable: true
    },
    {
        key: 'createdAt',
        label: 'Created At',
        sortable: true,
        render: (createdAt: string | Date) => {
            const date = new Date(createdAt);
            return isNaN(date.getTime()) ? 'Invalid date' : date.toLocaleDateString();
        },
    }, {
        key: 'updatedAt',
        label: 'Updated At',
        sortable: true,
        render: (updatedAt: string | Date) => {
            const date = new Date(updatedAt);
            return isNaN(date.getTime()) ? 'Invalid date' : date.toLocaleDateString();
        },
    }]

    // Show loading state
    if (isLoading) {
        return (
            <div className="space-y-6 p-4">
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

    // Show error state
    if (isError) {
        return (
            <div className="space-y-6 p-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold">Settings</h1>
                        <p className="text-muted-foreground">Manage your system preferences</p>
                    </div>
                </div>
                <Card className="border-destructive/50">
                    <CardContent className="pt-6">
                        <div className="text-center space-y-4">
                            <div className="text-destructive font-semibold">
                                Failed to load sources
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {error instanceof Error ? error.message : "An unknown error occurred"}
                            </p>
                            <Button
                                onClick={() => queryClient.invalidateQueries({ queryKey: ['cameFrom'] })}
                                variant="outline"
                            >
                                Retry
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Settings</h1>
                <p className="text-muted-foreground">Manage your system preferences</p>
            </div>

            <div className="grid gap-6">
                {/* Profile Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="h-5 w-5" />
                            Profile Settings
                        </CardTitle>
                        <CardDescription>Update your personal information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <form className="grid gap-4 md:grid-cols-2" onSubmit={userInfo.handleSubmit(onSubmit)}>
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" {...userInfo.register("fullName")} />
                                {userInfo.formState.errors.fullName && (
                                    <p className="text-xs text-destructive">{userInfo.formState.errors.fullName.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" {...userInfo.register("email")} />
                                {userInfo.formState.errors.email && (
                                    <p className="text-xs text-destructive">{userInfo.formState.errors.email.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" {...userInfo.register("phoneNumber")} />
                                {userInfo.formState.errors.phoneNumber && (
                                    <p className="text-xs text-destructive">{userInfo.formState.errors.phoneNumber.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role">Role</Label>
                                <Input id="role" defaultValue="Admin" disabled />
                            </div>
                            <Button type="submit" className="gap-2 w-[30%] lg:w-[30%] sm:w-full">
                                <Save className="h-4 w-4" />
                                Save Changes
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Source Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            Source Settings
                        </CardTitle>
                        <CardDescription>Manage student sources</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <DataTable
                            columns={columns}
                            data={cameFromData || []}
                            actions={(source) => (
                                <div className="flex items-center gap-1">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => openDialog('view', source as cameFrom)}
                                        title="View source"
                                    >
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => openDialog('edit', source as cameFrom)}
                                        title="Edit source"
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => openDeleteDialog(source as cameFrom)}
                                        title="Delete source"
                                        disabled={deleteSource.isPending}
                                    >
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>
                            )}
                            emptyMessage={
                                <div className="text-center py-12">
                                    <div className="mx-auto h-12 w-12 text-muted-foreground mb-4">
                                        <Tag className="h-12 w-12" />
                                    </div>
                                    <h3 className="font-semibold text-lg mb-2">No sources found</h3>
                                    <p className="text-muted-foreground mb-4">
                                        Get started by creating your first source
                                    </p>
                                    <Button onClick={() => openDialog('create')}>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Create Source
                                    </Button>
                                </div>
                            }
                            headerActions={
                                <Button onClick={() => openDialog('create')} className="gap-2">
                                    <Plus className="h-4 w-4" />
                                    Add Source
                                </Button>
                            }
                        />
                    </CardContent>
                </Card>

                {/* Notification Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Bell className="h-5 w-5" />
                            Notification Settings
                        </CardTitle>
                        <CardDescription>Configure how you receive notifications</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Email Notifications</p>
                                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                            </div>
                            <Button variant="outline" size="sm">
                                Enable
                            </Button>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">SMS Notifications</p>
                                <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                            </div>
                            <Button variant="outline" size="sm">
                                Enable
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Create/Edit/View Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            {viewMode === 'create' ? 'Create New Source' :
                                viewMode === 'edit' ? 'Edit Source' : 'View Source'}
                        </DialogTitle>
                        <DialogDescription>
                            {viewMode === 'create'
                                ? 'Add a new source to the system'
                                : viewMode === 'edit'
                                    ? 'Update source information'
                                    : 'Source details'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={sourceForm.handleSubmit(handleSourceSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">
                                Source name *
                                {viewMode === 'view' && selectedSource && (
                                    <span className="text-xs text-muted-foreground ml-2">
                                        ID: {selectedSource.id}
                                    </span>
                                )}
                            </Label>
                            <div className="relative">
                                <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id="name"
                                    {...sourceForm.register('name')}
                                    disabled={viewMode === 'view' || createSource.isPending || updateSource.isPending}
                                    placeholder="Enter source name"
                                    className="pl-10"
                                />
                            </div>
                            {sourceForm.formState.errors.name && <p className="text-xs text-destructive">{sourceForm.formState.errors.name.message}</p>}
                        </div>

                        {viewMode === 'view' && selectedSource && (
                            <div className="space-y-3 pt-2 border-t">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-xs text-muted-foreground">Created</Label>
                                        <p className="text-sm">
                                            {new Date(selectedSource.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    <div>
                                        <Label className="text-xs text-muted-foreground">Last Updated</Label>
                                        <p className="text-sm">
                                            {new Date(selectedSource.updatedAt).toLocaleDateString('en-US', {
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
                                disabled={createSource.isPending || updateSource.isPending}
                            >
                                {viewMode === 'view' ? 'Close' : 'Cancel'}
                            </Button>
                            {viewMode !== 'view' && (
                                <Button
                                    type="submit"
                                    disabled={createSource.isPending || updateSource.isPending}
                                    className='ml-2'
                                >
                                    {(createSource.isPending || updateSource.isPending) ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                            {viewMode === 'create' ? 'Creating...' : 'Saving...'}
                                        </div>
                                    ) : (
                                        viewMode === 'create' ? 'Create Source' : 'Save Changes'
                                    )}
                                </Button>
                            )}
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={closeDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the source
                            "{selectedSource?.name}" and remove it from the system.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={deleteSource.isPending}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteSource}
                            disabled={deleteSource.isPending}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {deleteSource.isPending ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                    Deleting...
                                </div>
                            ) : (
                                'Delete'
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}