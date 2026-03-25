"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
var prisma_1 = require("@/lib/prisma");
var index_js_1 = require("@modelcontextprotocol/sdk/server/index.js");
var stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
var types_js_1 = require("@modelcontextprotocol/sdk/types.js");
var zod_1 = require("zod");
// Validation schemas
var studentSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    birthday: zod_1.z.string().datetime(),
    phone: zod_1.z.string().min(1, "Phone is required"),
    cameText: zod_1.z.string().optional(),
    groupId: zod_1.z.string().optional(),
});
var server = new index_js_1.Server({
    name: "students-mcp-server",
    version: "1.0.0",
}, {
    capabilities: {
        tools: {},
    },
});
// Helper function to validate foreign keys exist
function validateRelations(data) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, cameFrom, group;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = [];
                    if (!data.cameText) return [3 /*break*/, 2];
                    return [4 /*yield*/, prisma_1.prisma.cameFrom.findUnique({
                            where: { id: data.cameText }
                        })];
                case 1:
                    cameFrom = _a.sent();
                    if (!cameFrom) {
                        errors.push("cameFrom with id \"".concat(data.cameText, "\" does not exist"));
                    }
                    _a.label = 2;
                case 2:
                    if (!data.groupId) return [3 /*break*/, 4];
                    return [4 /*yield*/, prisma_1.prisma.groups.findUnique({
                            where: { id: data.groupId }
                        })];
                case 3:
                    group = _a.sent();
                    if (!group) {
                        errors.push("Group with id \"".concat(data.groupId, "\" does not exist"));
                    }
                    _a.label = 4;
                case 4: return [2 /*return*/, errors];
            }
        });
    });
}
// List available tools
server.setRequestHandler(types_js_1.ListToolsRequestSchema, function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, {
                tools: [
                    {
                        name: "create_student",
                        description: "Create a new student",
                        inputSchema: studentSchema,
                    },
                    {
                        name: "get_student",
                        description: "Get a student by ID",
                        inputSchema: zod_1.z.object({
                            id: zod_1.z.string()
                        }),
                    },
                    {
                        name: "update_student",
                        description: "Update a student",
                        inputSchema: zod_1.z.object(__assign({ id: zod_1.z.string() }, studentSchema.shape)).partial(),
                    },
                    {
                        name: "delete_student",
                        description: "Delete a student",
                        inputSchema: zod_1.z.object({
                            id: zod_1.z.string()
                        }),
                    },
                    {
                        name: "list_students",
                        description: "List all students with optional filtering",
                        inputSchema: zod_1.z.object({
                            groupId: zod_1.z.string().optional(),
                            cameFromId: zod_1.z.string().optional(),
                            search: zod_1.z.string().optional(),
                            limit: zod_1.z.number().min(1).max(100).optional(),
                            offset: zod_1.z.number().min(0).optional()
                        }),
                    },
                    {
                        name: "get_camefrom_sources",
                        description: "Get all available cameFrom sources for dropdown/lookup",
                        inputSchema: zod_1.z.object({}),
                    },
                    {
                        name: "get_groups",
                        description: "Get all available groups for dropdown/lookup",
                        inputSchema: zod_1.z.object({
                            search: zod_1.z.string().optional()
                        }),
                    },
                    {
                        name: "validate_student_data",
                        description: "Validate student data before creating/updating",
                        inputSchema: studentSchema.partial().shape,
                    },
                ],
            }];
    });
}); });
// Handle tool calls
server.setRequestHandler(types_js_1.CallToolRequestSchema, function (request) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, args, _b, validated, relationErrors, student, id, student, schema, _c, id, data, existing, relationErrors, student, id, existing, schema, filters, where, _d, students, total, sources, search, where, groups, data, validationErrors, relationErrors, error_1;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _a = request.params, name = _a.name, args = _a.arguments;
                _e.label = 1;
            case 1:
                _e.trys.push([1, 25, , 26]);
                _b = name;
                switch (_b) {
                    case "create_student": return [3 /*break*/, 2];
                    case "get_student": return [3 /*break*/, 5];
                    case "update_student": return [3 /*break*/, 7];
                    case "delete_student": return [3 /*break*/, 12];
                    case "list_students": return [3 /*break*/, 15];
                    case "get_camefrom_sources": return [3 /*break*/, 17];
                    case "get_groups": return [3 /*break*/, 19];
                    case "validate_student_data": return [3 /*break*/, 21];
                }
                return [3 /*break*/, 23];
            case 2:
                validated = studentSchema.parse(args);
                return [4 /*yield*/, validateRelations(validated)];
            case 3:
                relationErrors = _e.sent();
                if (relationErrors.length > 0) {
                    return [2 /*return*/, {
                            content: [{
                                    type: "text",
                                    text: JSON.stringify({
                                        error: "Validation failed",
                                        details: relationErrors
                                    }, null, 2)
                                }],
                            isError: true
                        }];
                }
                return [4 /*yield*/, prisma_1.prisma.student.create({
                        data: validated,
                        include: {
                            cameFrom: true,
                            group: true
                        }
                    })];
            case 4:
                student = _e.sent();
                return [2 /*return*/, {
                        content: [{
                                type: "text",
                                text: JSON.stringify(student, null, 2)
                            }]
                    }];
            case 5:
                id = zod_1.z.object({ id: zod_1.z.string() }).parse(args).id;
                return [4 /*yield*/, prisma_1.prisma.student.findUnique({
                        where: { id: id },
                        include: {
                            cameFrom: true,
                            group: true,
                            courses: true,
                            attendances: true,
                            payments: true
                        }
                    })];
            case 6:
                student = _e.sent();
                if (!student) {
                    return [2 /*return*/, {
                            content: [{
                                    type: "text",
                                    text: JSON.stringify({ error: "Student not found" }, null, 2)
                                }],
                            isError: true
                        }];
                }
                return [2 /*return*/, {
                        content: [{
                                type: "text",
                                text: JSON.stringify(student, null, 2)
                            }]
                    }];
            case 7:
                schema = zod_1.z.object(__assign({ id: zod_1.z.string() }, studentSchema.shape)).partial();
                _c = schema.parse(args), id = _c.id, data = __rest(_c, ["id"]);
                return [4 /*yield*/, prisma_1.prisma.student.findUnique({
                        where: { id: id }
                    })];
            case 8:
                existing = _e.sent();
                if (!existing) {
                    return [2 /*return*/, {
                            content: [{
                                    type: "text",
                                    text: JSON.stringify({ error: "Student not found" }, null, 2)
                                }],
                            isError: true
                        }];
                }
                if (!(Object.keys(data).length > 0)) return [3 /*break*/, 10];
                return [4 /*yield*/, validateRelations(data)];
            case 9:
                relationErrors = _e.sent();
                if (relationErrors.length > 0) {
                    return [2 /*return*/, {
                            content: [{
                                    type: "text",
                                    text: JSON.stringify({
                                        error: "Validation failed",
                                        details: relationErrors
                                    }, null, 2)
                                }],
                            isError: true
                        }];
                }
                _e.label = 10;
            case 10: return [4 /*yield*/, prisma_1.prisma.student.update({
                    where: { id: id },
                    data: data,
                    include: {
                        cameFrom: true,
                        group: true
                    }
                })];
            case 11:
                student = _e.sent();
                return [2 /*return*/, {
                        content: [{
                                type: "text",
                                text: JSON.stringify(student, null, 2)
                            }]
                    }];
            case 12:
                id = zod_1.z.object({ id: zod_1.z.string() }).parse(args).id;
                return [4 /*yield*/, prisma_1.prisma.student.findUnique({
                        where: { id: id }
                    })];
            case 13:
                existing = _e.sent();
                if (!existing) {
                    return [2 /*return*/, {
                            content: [{
                                    type: "text",
                                    text: JSON.stringify({ error: "Student not found" }, null, 2)
                                }],
                            isError: true
                        }];
                }
                return [4 /*yield*/, prisma_1.prisma.student.delete({
                        where: { id: id }
                    })];
            case 14:
                _e.sent();
                return [2 /*return*/, {
                        content: [{
                                type: "text",
                                text: JSON.stringify({ success: true, message: "Student deleted" }, null, 2)
                            }]
                    }];
            case 15:
                schema = zod_1.z.object({
                    groupId: zod_1.z.string().optional(),
                    cameFromId: zod_1.z.string().optional(),
                    search: zod_1.z.string().optional(),
                    limit: zod_1.z.number().min(1).max(100).default(50),
                    offset: zod_1.z.number().min(0).default(0)
                });
                filters = schema.parse(args || {});
                where = {};
                if (filters.groupId) {
                    where.groupId = filters.groupId;
                }
                if (filters.cameFromId) {
                    where.cameText = filters.cameFromId;
                }
                if (filters.search) {
                    where.OR = [
                        { name: { contains: filters.search, mode: 'insensitive' } },
                        { phone: { contains: filters.search } }
                    ];
                }
                return [4 /*yield*/, Promise.all([
                        prisma_1.prisma.student.findMany({
                            where: where,
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
                        prisma_1.prisma.student.count({ where: where })
                    ])];
            case 16:
                _d = _e.sent(), students = _d[0], total = _d[1];
                return [2 /*return*/, {
                        content: [{
                                type: "text",
                                text: JSON.stringify({
                                    students: students,
                                    pagination: {
                                        total: total,
                                        limit: filters.limit,
                                        offset: filters.offset,
                                        hasMore: filters.offset + filters.limit < total
                                    }
                                }, null, 2)
                            }]
                    }];
            case 17: return [4 /*yield*/, prisma_1.prisma.cameFrom.findMany({
                    orderBy: {
                        name: 'asc'
                    }
                })];
            case 18:
                sources = _e.sent();
                return [2 /*return*/, {
                        content: [{
                                type: "text",
                                text: JSON.stringify(sources, null, 2)
                            }]
                    }];
            case 19:
                search = zod_1.z.object({
                    search: zod_1.z.string().optional()
                }).parse(args || {}).search;
                where = search ? {
                    name: { contains: search, mode: 'insensitive' }
                } : {};
                return [4 /*yield*/, prisma_1.prisma.groups.findMany({
                        where: where,
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
                    })];
            case 20:
                groups = _e.sent();
                return [2 /*return*/, {
                        content: [{
                                type: "text",
                                text: JSON.stringify(groups, null, 2)
                            }]
                    }];
            case 21:
                data = studentSchema.partial().parse(args || {});
                validationErrors = [];
                // Validate schema
                try {
                    studentSchema.parse(data);
                }
                catch (error) {
                    if (error instanceof zod_1.z.ZodError) {
                        validationErrors.push.apply(validationErrors, error.issues.map(function (e) { return e.message; }));
                    }
                    else {
                        validationErrors.push(error instanceof Error ? error.message : "Unknown error");
                    }
                }
                return [4 /*yield*/, validateRelations(data)];
            case 22:
                relationErrors = _e.sent();
                validationErrors.push.apply(validationErrors, relationErrors);
                return [2 /*return*/, {
                        content: [{
                                type: "text",
                                text: JSON.stringify({
                                    isValid: validationErrors.length === 0,
                                    errors: validationErrors
                                }, null, 2)
                            }]
                    }];
            case 23: throw new Error("Unknown tool: ".concat(name));
            case 24: return [3 /*break*/, 26];
            case 25:
                error_1 = _e.sent();
                if (error_1 instanceof zod_1.z.ZodError) {
                    return [2 /*return*/, {
                            content: [{
                                    type: "text",
                                    text: JSON.stringify({
                                        error: "Validation failed",
                                        details: error_1.issues
                                    }, null, 2)
                                }],
                            isError: true
                        }];
                }
                return [2 /*return*/, {
                        content: [{
                                type: "text",
                                text: JSON.stringify({
                                    error: error_1 instanceof Error ? error_1.message : "Unknown error"
                                }, null, 2)
                            }],
                        isError: true
                    }];
            case 26: return [2 /*return*/];
        }
    });
}); });
// Start server
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var transport;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    transport = new stdio_js_1.StdioServerTransport();
                    return [4 /*yield*/, server.connect(transport)];
                case 1:
                    _a.sent();
                    console.error("Students MCP server running on stdio");
                    return [2 /*return*/];
            }
        });
    });
}
main().catch(function (error) {
    console.error("Fatal error:", error);
    process.exit(1);
});
