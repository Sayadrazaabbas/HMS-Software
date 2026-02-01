(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authApi",
    ()=>authApi,
    "dashboardApi",
    ()=>dashboardApi,
    "default",
    ()=>__TURBOPACK__default__export__,
    "patientsApi",
    ()=>patientsApi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
// MOCK API IMPLEMENTATION
// This replaces the actual Axios instance with a mock object for testing purposes
// when the backend is unavailable.
const mockDelay = 500;
const mockPatients = [
    {
        id: '1',
        patientId: 'PT-1001',
        name: 'John Doe',
        age: 30,
        gender: 'Male',
        phone: '1234567890',
        address: '123 Main St, New York',
        lastVisit: '2023-01-01',
        email: 'john@example.com',
        bloodGroup: 'O+',
        emergencyContact: 'Jane Doe (9876543210)'
    },
    {
        id: '2',
        patientId: 'PT-1002',
        name: 'Jane Smith',
        age: 25,
        gender: 'Female',
        phone: '0987654321',
        address: '456 Oak Ave, Los Angeles',
        lastVisit: '2023-01-05',
        email: 'jane@example.com',
        bloodGroup: 'A-',
        emergencyContact: 'John Smith (0987123456)'
    }
];
const mockAppointments = [
    {
        id: '1',
        appointmentNo: 'APT-1001',
        date: new Date().toISOString().split('T')[0],
        startTime: '10:00',
        tokenNo: 1,
        type: 'NEW',
        status: 'SCHEDULED',
        patient: {
            id: '1',
            patientId: 'PT-1001',
            name: 'John Doe',
            phone: '1234567890',
            gender: 'Male'
        },
        doctor: {
            id: 'd1',
            user: {
                name: 'Dr. Sarah Smith'
            },
            department: {
                name: 'Cardiology'
            }
        }
    },
    {
        id: '2',
        appointmentNo: 'APT-1002',
        date: new Date().toISOString().split('T')[0],
        startTime: '11:30',
        tokenNo: 2,
        type: 'FOLLOWUP',
        status: 'CHECKED_IN',
        patient: {
            id: '2',
            patientId: 'PT-1002',
            name: 'Jane Smith',
            phone: '0987654321',
            gender: 'Female'
        },
        doctor: {
            id: 'd2',
            user: {
                name: 'Dr. James Wilson'
            },
            department: {
                name: 'Neurology'
            }
        }
    }
];
const mockStats = {
    totalPatients: 125,
    todayAppointments: 12,
    pendingBills: 8,
    todayRevenue: 25000
};
const mockInvoices = [
    {
        id: 'inv-1',
        invoiceNo: 'INV-2026-001',
        date: '2023-10-25',
        totalAmount: 1500,
        status: 'PAID',
        patient: {
            name: 'John Doe',
            patientId: 'PT-1001'
        }
    },
    {
        id: 'inv-2',
        invoiceNo: 'INV-2026-002',
        date: '2023-10-26',
        totalAmount: 2500,
        status: 'PENDING',
        patient: {
            name: 'Jane Smith',
            patientId: 'PT-1002'
        }
    }
];
const mockMedicines = [
    {
        id: 'm1',
        name: 'Paracetamol',
        brand: 'GSK',
        stock: 500,
        unit: 'Tablet',
        price: 5,
        expiryDate: '2025-12-01'
    },
    {
        id: 'm2',
        name: 'Amoxicillin',
        brand: 'Pfizer',
        stock: 200,
        unit: 'Capsule',
        price: 15,
        expiryDate: '2025-06-15'
    },
    {
        id: 'm3',
        name: 'Cetirizine',
        brand: 'Cipla',
        stock: 15,
        unit: 'Tablet',
        price: 2,
        expiryDate: '2024-10-20'
    }
];
const api = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: 'http://localhost:3001/api/v1'
});
// Mocking methods
api.get = async (url, config)=>{
    console.log(`[MOCK API] GET ${url}`, config?.params);
    await new Promise((resolve)=>setTimeout(resolve, mockDelay));
    if (url.includes('/dashboard/stats')) return {
        data: {
            data: mockStats
        }
    };
    if (url.includes('/dashboard/recent-patients')) return {
        data: {
            data: mockPatients.slice(0, 5)
        }
    };
    if (url.includes('/dashboard/today-appointments')) return {
        data: {
            data: mockAppointments
        }
    };
    if (url.includes('/patients')) return {
        data: {
            data: mockPatients,
            pagination: {
                total: 2,
                pages: 1,
                page: 1,
                limit: 10
            }
        }
    };
    if (url.includes('/appointments/doctors')) return {
        data: {
            data: [
                {
                    id: 'd1',
                    user: {
                        name: 'Dr. Sarah Smith'
                    },
                    department: {
                        name: 'Cardiology'
                    }
                },
                {
                    id: 'd2',
                    user: {
                        name: 'Dr. James Wilson'
                    },
                    department: {
                        name: 'Neurology'
                    }
                }
            ]
        }
    };
    if (url.includes('/appointments')) return {
        data: {
            data: mockAppointments,
            pagination: {
                total: 2,
                pages: 1,
                page: 1,
                limit: 10
            }
        }
    };
    if (url.includes('/billing/invoices')) return {
        data: {
            data: mockInvoices,
            pagination: {
                total: 2,
                pages: 1,
                page: 1,
                limit: 10
            }
        }
    };
    if (url.includes('/pharmacy/medicines')) return {
        data: {
            data: mockMedicines,
            pagination: {
                total: 3,
                pages: 1,
                page: 1,
                limit: 10
            }
        }
    };
    if (url.includes('/pharmacy/stock/low')) return {
        data: {
            data: mockMedicines.filter((m)=>m.stock < 20)
        }
    };
    return {
        data: {
            data: []
        }
    };
};
api.post = async (url, data)=>{
    console.log(`[MOCK API] POST ${url}`, data);
    await new Promise((resolve)=>setTimeout(resolve, mockDelay));
    if (url.includes('/auth/login')) {
        return {
            data: {
                data: {
                    user: {
                        id: 'mock-1',
                        name: 'Admin',
                        email: data.email,
                        role: {
                            name: 'admin',
                            displayName: 'Administrator',
                            permissions: [
                                '*'
                            ]
                        }
                    },
                    accessToken: 'mock-token',
                    refreshToken: 'mock-refresh'
                }
            }
        };
    }
    return {
        data: {
            data: {
                ...data,
                id: `mock-new-${Date.now()}`
            },
            message: 'Created successfully (MOCKED)'
        }
    };
};
api.put = async (url, data)=>{
    console.log(`[MOCK API] PUT ${url}`, data);
    await new Promise((resolve)=>setTimeout(resolve, mockDelay));
    return {
        data: {
            data: {
                ...data
            },
            message: 'Updated successfully (MOCKED)'
        }
    };
};
api.patch = async (url, data)=>{
    console.log(`[MOCK API] PATCH ${url}`, data);
    await new Promise((resolve)=>setTimeout(resolve, mockDelay));
    return {
        data: {
            data: {
                ...data
            },
            message: 'Status updated (MOCKED)'
        }
    };
};
api.delete = async (url)=>{
    console.log(`[MOCK API] DELETE ${url}`);
    await new Promise((resolve)=>setTimeout(resolve, mockDelay));
    return {
        data: {
            message: 'Deleted successfully (MOCKED)'
        }
    };
};
const __TURBOPACK__default__export__ = api;
const authApi = {
    login: (email, password)=>api.post('/auth/login', {
            email,
            password
        }),
    getCurrentUser: ()=>api.get('/auth/me'),
    logout: ()=>api.post('/auth/logout', {})
};
const dashboardApi = {
    getStats: ()=>api.get('/dashboard/stats'),
    getRecentPatients: (limit = 5)=>api.get(`/dashboard/recent-patients?limit=${limit}`),
    getTodayAppointments: ()=>api.get('/dashboard/today-appointments')
};
const patientsApi = {
    getAll: (page = 1, limit = 10, search = '')=>api.get(`/patients?page=${page}&limit=${limit}${search ? `&search=${search}` : ''}`),
    getById: (id)=>api.get(`/patients/${id}`),
    create: (data)=>api.post('/patients', data),
    update: (id, data)=>api.put(`/patients/${id}`, data),
    delete: (id)=>api.delete(`/patients/${id}`)
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/modules-api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "appointmentsApi",
    ()=>appointmentsApi,
    "billingApi",
    ()=>billingApi,
    "pharmacyApi",
    ()=>pharmacyApi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api.ts [app-client] (ecmascript)");
;
const appointmentsApi = {
    getAll: (page = 1, limit = 10, filters)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/appointments', {
            params: {
                page,
                limit,
                ...filters
            }
        }),
    getById: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/appointments/${id}`),
    getTodayByDoctor: (doctorId)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/appointments/today/${doctorId}`),
    getAvailableSlots: (doctorId, date)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/appointments/slots', {
            params: {
                doctorId,
                date
            }
        }),
    getDoctors: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/appointments/doctors'),
    create: (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/appointments', data),
    updateStatus: (id, status)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].patch(`/appointments/${id}/status`, {
            status
        }),
    update: (id, data)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`/appointments/${id}`, data),
    cancel: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`/appointments/${id}`)
};
const billingApi = {
    getAll: (page = 1, limit = 10, filters)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/billing/invoices', {
            params: {
                page,
                limit,
                ...filters
            }
        }),
    getById: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/billing/invoices/${id}`),
    create: (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/billing/invoices', data),
    addPayment: (invoiceId, data)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`/billing/invoices/${invoiceId}/payments`, data),
    getServices: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/billing/services')
};
const pharmacyApi = {
    getMedicines: (page = 1, limit = 10, search)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/pharmacy/medicines', {
            params: {
                page,
                limit,
                search
            }
        }),
    getMedicineById: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/pharmacy/medicines/${id}`),
    getStock: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/pharmacy/stock'),
    getLowStock: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/pharmacy/stock/low'),
    dispenseMedicine: (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/pharmacy/dispense', data),
    getPrescriptions: (patientId)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/pharmacy/prescriptions', {
            params: {
                patientId
            }
        })
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/(dashboard)/appointments/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AppointmentsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$modules$2d$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/modules-api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const statusColors = {
    SCHEDULED: 'bg-blue-100 text-blue-700',
    CHECKED_IN: 'bg-yellow-100 text-yellow-700',
    IN_PROGRESS: 'bg-purple-100 text-purple-700',
    COMPLETED: 'bg-green-100 text-green-700',
    CANCELLED: 'bg-red-100 text-red-700',
    NO_SHOW: 'bg-gray-100 text-gray-700'
};
const typeColors = {
    NEW: 'bg-teal-100 text-teal-700',
    FOLLOWUP: 'bg-indigo-100 text-indigo-700',
    EMERGENCY: 'bg-red-100 text-red-700'
};
function AppointmentsPage() {
    _s();
    const [appointments, setAppointments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [pagination, setPagination] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [selectedDate, setSelectedDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Date().toISOString().split('T')[0]);
    const fetchAppointments = async (page = 1, date)=>{
        setLoading(true);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$modules$2d$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["appointmentsApi"].getAll(page, 10, {
                date
            });
            setAppointments(response.data.data);
            setPagination(response.data.pagination);
        } catch (error) {
            console.error('Failed to fetch appointments:', error);
        } finally{
            setLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AppointmentsPage.useEffect": ()=>{
            fetchAppointments(currentPage, selectedDate);
        }
    }["AppointmentsPage.useEffect"], [
        currentPage,
        selectedDate
    ]);
    const formatDate = (dateStr)=>{
        return new Date(dateStr).toLocaleDateString('en-IN', {
            weekday: 'short',
            day: 'numeric',
            month: 'short'
        });
    };
    const formatTime = (time)=>{
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minutes} ${ampm}`;
    };
    const handleStatusChange = async (id, status)=>{
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$modules$2d$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["appointmentsApi"].updateStatus(id, status);
            fetchAppointments(currentPage, selectedDate);
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-bold text-gray-900",
                                children: "Appointments"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                lineNumber: 109,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-500 mt-1",
                                children: "Manage patient appointments and schedules"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                lineNumber: 110,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                        lineNumber: 108,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/appointments/new",
                        className: "inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium rounded-xl hover:from-teal-600 hover:to-cyan-700 transition-all shadow-lg shadow-teal-500/25",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                lineNumber: 116,
                                columnNumber: 21
                            }, this),
                            "New Appointment"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                        lineNumber: 112,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                lineNumber: 107,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-2xl border border-gray-100 p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col sm:flex-row gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                    className: "w-5 h-5 text-gray-400"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                    lineNumber: 125,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "date",
                                    value: selectedDate,
                                    onChange: (e)=>{
                                        setSelectedDate(e.target.value);
                                        setCurrentPage(1);
                                    },
                                    className: "px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:bg-white transition-all outline-none"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                    lineNumber: 126,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                            lineNumber: 124,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        const prev = new Date(selectedDate);
                                        prev.setDate(prev.getDate() - 1);
                                        setSelectedDate(prev.toISOString().split('T')[0]);
                                    },
                                    className: "px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors",
                                    children: "← Previous"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                    lineNumber: 137,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setSelectedDate(new Date().toISOString().split('T')[0]),
                                    className: "px-3 py-2 bg-teal-50 text-teal-700 font-medium rounded-lg hover:bg-teal-100 transition-colors",
                                    children: "Today"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                    lineNumber: 147,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        const next = new Date(selectedDate);
                                        next.setDate(next.getDate() + 1);
                                        setSelectedDate(next.toISOString().split('T')[0]);
                                    },
                                    className: "px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors",
                                    children: "Next →"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                    lineNumber: 153,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                            lineNumber: 136,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                    lineNumber: 123,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                lineNumber: 122,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-2xl border border-gray-100 overflow-hidden",
                children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-center py-12",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                        lineNumber: 171,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                    lineNumber: 170,
                    columnNumber: 21
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "overflow-x-auto",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                className: "w-full",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "bg-gray-50 border-b border-gray-100",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide",
                                                    children: "Token"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                                    lineNumber: 179,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide",
                                                    children: "Time"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                                    lineNumber: 180,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide",
                                                    children: "Patient"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                                    lineNumber: 181,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide",
                                                    children: "Doctor"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                                    lineNumber: 182,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide",
                                                    children: "Type"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                                    lineNumber: 183,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide",
                                                    children: "Status"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                                    lineNumber: 184,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide",
                                                    children: "Actions"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                                    lineNumber: 185,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                            lineNumber: 178,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                        lineNumber: 177,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                        className: "divide-y divide-gray-100",
                                        children: appointments.length > 0 ? appointments.map((apt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                className: "hover:bg-gray-50 transition-colors",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-6 py-4",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-teal-700 font-bold",
                                                                children: apt.tokenNo
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                                                lineNumber: 194,
                                                                columnNumber: 57
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                                            lineNumber: 193,
                                                            columnNumber: 53
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                                        lineNumber: 192,
                                                        columnNumber: 49
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-6 py-4",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2 text-gray-600",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                                    className: "w-4 h-4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                                                    lineNumber: 199,
                                                                    columnNumber: 57
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-medium",
                                                                    children: formatTime(apt.startTime)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                                                    lineNumber: 200,
                                                                    columnNumber: 57
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                                            lineNumber: 198,
                                                            columnNumber: 53
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                                        lineNumber: 197,
                                                        columnNumber: 49
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-6 py-4",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-medium text-gray-900",
                                                                    children: apt.patient.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                                                    lineNumber: 205,
                                                                    columnNumber: 57
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-gray-500",
                                                                    children: apt.patient.patientId
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                                                    lineNumber: 206,
                                                                    columnNumber: 57
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                                            lineNumber: 204,
                                                            columnNumber: 53
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                                        lineNumber: 203,
                                                        columnNumber: 49
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-6 py-4",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-medium text-gray-900",
                                                                    children: apt.doctor.user.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                                                    lineNumber: 211,
                                                                    columnNumber: 57
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-gray-500",
                                                                    children: apt.doctor.department.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                                                    lineNumber: 212,
                                                                    columnNumber: 57
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                                            lineNumber: 210,
                                                            columnNumber: 53
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                                        lineNumber: 209,
                                                        columnNumber: 49
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-6 py-4",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `inline-flex px-2 py-1 text-xs font-medium rounded-full ${typeColors[apt.type]}`,
                                                            children: apt.type
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                                            lineNumber: 216,
                                                            columnNumber: 53
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                                        lineNumber: 215,
                                                        columnNumber: 49
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-6 py-4",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusColors[apt.status]}`,
                                                            children: apt.status.replace('_', ' ')
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                                            lineNumber: 221,
                                                            columnNumber: 53
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                                        lineNumber: 220,
                                                        columnNumber: 49
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-6 py-4",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-end gap-2",
                                                            children: [
                                                                apt.status === 'SCHEDULED' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>handleStatusChange(apt.id, 'CHECKED_IN'),
                                                                    className: "px-3 py-1.5 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-lg hover:bg-yellow-200 transition-colors",
                                                                    children: "Check In"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                                                    lineNumber: 228,
                                                                    columnNumber: 61
                                                                }, this),
                                                                apt.status === 'CHECKED_IN' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>handleStatusChange(apt.id, 'IN_PROGRESS'),
                                                                    className: "px-3 py-1.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-lg hover:bg-purple-200 transition-colors",
                                                                    children: "Start"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                                                    lineNumber: 236,
                                                                    columnNumber: 61
                                                                }, this),
                                                                apt.status === 'IN_PROGRESS' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>handleStatusChange(apt.id, 'COMPLETED'),
                                                                    className: "px-3 py-1.5 bg-green-100 text-green-700 text-xs font-medium rounded-lg hover:bg-green-200 transition-colors",
                                                                    children: "Complete"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                                                    lineNumber: 244,
                                                                    columnNumber: 61
                                                                }, this),
                                                                [
                                                                    'SCHEDULED',
                                                                    'CHECKED_IN'
                                                                ].includes(apt.status) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>handleStatusChange(apt.id, 'CANCELLED'),
                                                                    className: "p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors",
                                                                    title: "Cancel",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                                                        className: "w-4 h-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                                                        lineNumber: 257,
                                                                        columnNumber: 65
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                                                    lineNumber: 252,
                                                                    columnNumber: 61
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                                            lineNumber: 226,
                                                            columnNumber: 53
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                                        lineNumber: 225,
                                                        columnNumber: 49
                                                    }, this)
                                                ]
                                            }, apt.id, true, {
                                                fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                                lineNumber: 191,
                                                columnNumber: 45
                                            }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                colSpan: 7,
                                                className: "px-6 py-12 text-center text-gray-500",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                        className: "w-12 h-12 mx-auto text-gray-300 mb-3"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                                        lineNumber: 267,
                                                        columnNumber: 49
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-medium",
                                                        children: [
                                                            "No appointments for ",
                                                            formatDate(selectedDate)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                                        lineNumber: 268,
                                                        columnNumber: 49
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm mt-1",
                                                        children: "Create a new appointment to get started"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                                        lineNumber: 269,
                                                        columnNumber: 49
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                                lineNumber: 266,
                                                columnNumber: 45
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                            lineNumber: 265,
                                            columnNumber: 41
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                        lineNumber: 188,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                lineNumber: 176,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                            lineNumber: 175,
                            columnNumber: 25
                        }, this),
                        pagination && pagination.pages > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between px-6 py-4 border-t border-gray-100",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-500",
                                    children: [
                                        "Showing ",
                                        (pagination.page - 1) * pagination.limit + 1,
                                        " to",
                                        ' ',
                                        Math.min(pagination.page * pagination.limit, pagination.total),
                                        " of ",
                                        pagination.total,
                                        " appointments"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                    lineNumber: 280,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setCurrentPage((p)=>Math.max(1, p - 1)),
                                            disabled: currentPage === 1,
                                            className: "p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                                className: "w-5 h-5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                                lineNumber: 290,
                                                columnNumber: 41
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                            lineNumber: 285,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-medium text-gray-700",
                                            children: [
                                                "Page ",
                                                pagination.page,
                                                " of ",
                                                pagination.pages
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                            lineNumber: 292,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setCurrentPage((p)=>p + 1),
                                            disabled: currentPage >= pagination.pages,
                                            className: "p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                className: "w-5 h-5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                                lineNumber: 300,
                                                columnNumber: 41
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                            lineNumber: 295,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                                    lineNumber: 284,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                            lineNumber: 279,
                            columnNumber: 29
                        }, this)
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
                lineNumber: 168,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(dashboard)/appointments/page.tsx",
        lineNumber: 105,
        columnNumber: 9
    }, this);
}
_s(AppointmentsPage, "plYQIPPoIRoNFCrl6MpLuJNdVyM=");
_c = AppointmentsPage;
var _c;
__turbopack_context__.k.register(_c, "AppointmentsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_e818e18f._.js.map