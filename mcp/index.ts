// src/index.ts
import { prisma } from "@/lib/prisma";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { PrismaClient } from '@prisma/client'
import { z } from 'zod';

// Validation schemas
const studentSchema = z.object({
    name: z.string().min(1, "Name is required"),
    birthday: z.string().datetime(),
    phone: z.string().min(1, "Phone is required"),
    cameText: z.string().optional(),
    groupId: z.string().optional(),
});

type StudentInput = z.infer<typeof studentSchema>;

const server = new Server(
    {
        name: "students-mcp-server",
        version: "1.0.0",
    },
    {
        capabilities: {
            tools: {},
        },
    }
);

// Helper function to validate foreign keys exist
async function validateRelations(data: Partial<StudentInput>) {
    const errors: string[] = [];

    if (data.cameText) {
        const cameFrom = await prisma.cameFrom.findUnique({
            where: { id: data.cameText }
        });
        if (!cameFrom) {
            errors.push(`cameFrom with id "${data.cameText}" does not exist`);
        }
    }

    if (data.groupId) {
        const group = await prisma.groups.findUnique({
            where: { id: data.groupId }
        });
        if (!group) {
            errors.push(`Group with id "${data.groupId}" does not exist`);
        }
    }

    return errors;
}

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "create_student",
                description: "Create a new student",
                inputSchema: studentSchema,
            },
            {
                name: "get_student",
                description: "Get a student by ID",
                inputSchema: z.object({
                    id: z.string()
                }),
            },
            {
                name: "update_student",
                description: "Update a student",
                inputSchema: z.object({
                    id: z.string(),
                    ...studentSchema.shape
                }).partial(),
            },
            {
                name: "delete_student",
                description: "Delete a student",
                inputSchema: z.object({
                    id: z.string()
                }),
            },
            {
                name: "list_students",
                description: "List all students with optional filtering",
                inputSchema: z.object({
                    groupId: z.string().optional(),
                    cameFromId: z.string().optional(),
                    search: z.string().optional(),
                    limit: z.number().min(1).max(100).optional(),
                    offset: z.number().min(0).optional()
                }),
            },
            {
                name: "get_camefrom_sources",
                description: "Get all available cameFrom sources for dropdown/lookup",
                inputSchema: z.object({}),
            },
            {
                name: "get_groups",
                description: "Get all available groups for dropdown/lookup",
                inputSchema: z.object({
                    search: z.string().optional()
                }),
            },
            {
                name: "validate_student_data",
                description: "Validate student data before creating/updating",
                inputSchema: studentSchema.partial().shape,
            },
        ],
    };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
        switch (name) {
            case "create_student": {
                const validated = studentSchema.parse(args);

                // Validate foreign keys
                const relationErrors = await validateRelations(validated);
                if (relationErrors.length > 0) {
                    return {
                        content: [{
                            type: "text",
                            text: JSON.stringify({
                                error: "Validation failed",
                                details: relationErrors
                            }, null, 2)
                        }],
                        isError: true
                    };
                }

                const student = await prisma.student.create({
                    data: validated,
                    include: {
                        cameFrom: true,
                        group: true
                    }
                });

                return {
                    content: [{
                        type: "text",
                        text: JSON.stringify(student, null, 2)
                    }]
                };
            }

            case "get_student": {
                const { id } = z.object({ id: z.string() }).parse(args);

                const student = await prisma.student.findUnique({
                    where: { id },
                    include: {
                        cameFrom: true,
                        group: true,
                        courses: true,
                        attendances: true,
                        payments: true
                    }
                });

                if (!student) {
                    return {
                        content: [{
                            type: "text",
                            text: JSON.stringify({ error: "Student not found" }, null, 2)
                        }],
                        isError: true
                    };
                }

                return {
                    content: [{
                        type: "text",
                        text: JSON.stringify(student, null, 2)
                    }]
                };
            }

            case "update_student": {
                const schema = z.object({
                    id: z.string(),
                    ...studentSchema.shape
                }).partial();

                const { id, ...data } = schema.parse(args);

                // Check if student exists
                const existing = await prisma.student.findUnique({
                    where: { id }
                });

                if (!existing) {
                    return {
                        content: [{
                            type: "text",
                            text: JSON.stringify({ error: "Student not found" }, null, 2)
                        }],
                        isError: true
                    };
                }

                // Validate foreign keys if they're being updated
                if (Object.keys(data).length > 0) {
                    const relationErrors = await validateRelations(data);
                    if (relationErrors.length > 0) {
                        return {
                            content: [{
                                type: "text",
                                text: JSON.stringify({
                                    error: "Validation failed",
                                    details: relationErrors
                                }, null, 2)
                            }],
                            isError: true
                        };
                    }
                }

                const student = await prisma.student.update({
                    where: { id },
                    data,
                    include: {
                        cameFrom: true,
                        group: true
                    }
                });

                return {
                    content: [{
                        type: "text",
                        text: JSON.stringify(student, null, 2)
                    }]
                };
            }

            case "delete_student": {
                const { id } = z.object({ id: z.string() }).parse(args);

                // Check if student exists
                const existing = await prisma.student.findUnique({
                    where: { id }
                });

                if (!existing) {
                    return {
                        content: [{
                            type: "text",
                            text: JSON.stringify({ error: "Student not found" }, null, 2)
                        }],
                        isError: true
                    };
                }

                await prisma.student.delete({
                    where: { id }
                });

                return {
                    content: [{
                        type: "text",
                        text: JSON.stringify({ success: true, message: "Student deleted" }, null, 2)
                    }]
                };
            }

            case "list_students": {
                const schema = z.object({
                    groupId: z.string().optional(),
                    cameFromId: z.string().optional(),
                    search: z.string().optional(),
                    limit: z.number().min(1).max(100).default(50),
                    offset: z.number().min(0).default(0)
                });

                const filters = schema.parse(args || {});

                const where: any = {};

                if (filters.groupId) {
                    where.groupId = filters.groupId as string;
                }

                if (filters.cameFromId) {
                    where.cameText = filters.cameFromId as string;
                }

                if (filters.search) {
                    where.OR = [
                        { name: { contains: filters.search, mode: 'insensitive' } },
                        { phone: { contains: filters.search } }
                    ];
                }

                const [students, total] = await Promise.all([
                    prisma.student.findMany({
                        where,
                        include: {
                            cameFrom: true,
                            group: true
                        },
                        skip: filters.offset,
                        take: filters.limit,
                        orderBy: {
                            createdAt: 'desc'
                        }
                    }),
                    prisma.student.count({ where })
                ]);

                return {
                    content: [{
                        type: "text",
                        text: JSON.stringify({
                            students,
                            pagination: {
                                total,
                                limit: filters.limit,
                                offset: filters.offset,
                                hasMore: filters.offset + filters.limit < total
                            }
                        }, null, 2)
                    }]
                };
            }

            case "get_camefrom_sources": {
                const sources = await prisma.cameFrom.findMany({
                    orderBy: {
                        name: 'asc'
                    }
                });

                return {
                    content: [{
                        type: "text",
                        text: JSON.stringify(sources, null, 2)
                    }]
                };
            }

            case "get_groups": {
                const { search } = z.object({
                    search: z.string().optional()
                }).parse(args || {});

                const where = search ? {
                    name: { contains: search, mode: 'insensitive' }
                } : {};

                const groups = await prisma.groups.findMany({
                    where: where as any,
                    orderBy: {
                        name: 'asc'
                    },
                    include: {
                        teacher: true,
                        course: true,
                        _count: {
                            select: { students: true }
                        }
                    }
                });

                return {
                    content: [{
                        type: "text",
                        text: JSON.stringify(groups, null, 2)
                    }]
                };
            }

            case "validate_student_data": {
                const data = studentSchema.partial().parse(args || {});

                const validationErrors: string[] = [];

                // Validate schema
                try {
                    studentSchema.parse(data);
                } catch (error) {
                    if (error instanceof z.ZodError) {
                        validationErrors.push(...error.issues.map((e: any) => e.message));
                    } else {
                        validationErrors.push(error instanceof Error ? error.message : "Unknown error");
                    }
                }

                // Validate relations
                const relationErrors = await validateRelations(data);
                validationErrors.push(...relationErrors);

                return {
                    content: [{
                        type: "text",
                        text: JSON.stringify({
                            isValid: validationErrors.length === 0,
                            errors: validationErrors
                        }, null, 2)
                    }]
                };
            }

            default:
                throw new Error(`Unknown tool: ${name}`);
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify({
                        error: "Validation failed",
                        details: error.issues
                    }, null, 2)
                }],
                isError: true
            };
        }

        return {
            content: [{
                type: "text",
                text: JSON.stringify({
                    error: error instanceof Error ? error.message : "Unknown error"
                }, null, 2)
            }],
            isError: true
        };
    }
});

// Start server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Students MCP server running on stdio");
}

main().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
});