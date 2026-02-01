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
"[project]/src/app/(dashboard)/opd/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OPDPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$stethoscope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stethoscope$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/stethoscope.js [app-client] (ecmascript) <export default as Stethoscope>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user-plus.js [app-client] (ecmascript) <export default as UserPlus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarPlus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar-plus.js [app-client] (ecmascript) <export default as CalendarPlus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/activity.js [app-client] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$modules$2d$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/modules-api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function OPDPage() {
    _s();
    const [queue, setQueue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [stats, setStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        total: 0,
        pending: 0,
        completed: 0,
        emergency: 0
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OPDPage.useEffect": ()=>{
            const fetchOPDData = {
                "OPDPage.useEffect.fetchOPDData": async ()=>{
                    setLoading(true);
                    try {
                        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$modules$2d$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["appointmentsApi"].getAll(1, 100);
                        const allApts = response.data.data;
                        // Filter today's appointments for the queue
                        setQueue(allApts);
                        // Mock stats based on data
                        setStats({
                            total: allApts.length,
                            pending: allApts.filter({
                                "OPDPage.useEffect.fetchOPDData": (a)=>a.status === 'SCHEDULED' || a.status === 'CHECKED_IN'
                            }["OPDPage.useEffect.fetchOPDData"]).length,
                            completed: allApts.filter({
                                "OPDPage.useEffect.fetchOPDData": (a)=>a.status === 'COMPLETED'
                            }["OPDPage.useEffect.fetchOPDData"]).length,
                            emergency: 2 // Mock emergency count
                        });
                    } catch (error) {
                        console.error('Failed to fetch OPD data:', error);
                    } finally{
                        setLoading(false);
                    }
                }
            }["OPDPage.useEffect.fetchOPDData"];
            fetchOPDData();
        }
    }["OPDPage.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-bold text-gray-900 flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$stethoscope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stethoscope$3e$__["Stethoscope"], {
                                        className: "w-8 h-8 text-teal-600"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                        lineNumber: 77,
                                        columnNumber: 25
                                    }, this),
                                    "OPD Dashboard"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                lineNumber: 76,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-500 mt-1",
                                children: "Outpatient Department real-time management"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                lineNumber: 80,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                        lineNumber: 75,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/patients/new",
                                className: "inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all shadow-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__["UserPlus"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                        lineNumber: 87,
                                        columnNumber: 25
                                    }, this),
                                    "Walk-in"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                lineNumber: 83,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/appointments/new",
                                className: "inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white font-medium rounded-xl hover:bg-teal-700 transition-all shadow-md shadow-teal-500/20",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarPlus$3e$__["CalendarPlus"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                        lineNumber: 94,
                                        columnNumber: 25
                                    }, this),
                                    "Book Appointment"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                lineNumber: 90,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                        lineNumber: 82,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                lineNumber: 74,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
                children: [
                    {
                        label: "Today's Total",
                        value: stats.total,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
                        color: "text-blue-600",
                        bg: "bg-blue-50"
                    },
                    {
                        label: "Waiting",
                        value: stats.pending,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"],
                        color: "text-amber-600",
                        bg: "bg-amber-50"
                    },
                    {
                        label: "Completed",
                        value: stats.completed,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$stethoscope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stethoscope$3e$__["Stethoscope"],
                        color: "text-teal-600",
                        bg: "bg-teal-50"
                    },
                    {
                        label: "Emergency",
                        value: stats.emergency,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"],
                        color: "text-red-600",
                        bg: "bg-red-50"
                    }
                ].map((stat, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white p-6 rounded-2xl border border-gray-100 shadow-sm",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-medium text-gray-500",
                                            children: stat.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                            lineNumber: 111,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-2xl font-bold text-gray-900 mt-1",
                                            children: stat.value
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                            lineNumber: 112,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                    lineNumber: 110,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `${stat.bg} ${stat.color} p-3 rounded-xl`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(stat.icon, {
                                        className: "w-6 h-6"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                        lineNumber: 115,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                    lineNumber: 114,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                            lineNumber: 109,
                            columnNumber: 25
                        }, this)
                    }, i, false, {
                        fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                        lineNumber: 108,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                lineNumber: 101,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden font-inter",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                className: "w-5 h-5 text-teal-600"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                                lineNumber: 127,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "font-bold text-gray-900",
                                                children: "Live Consultation Queue"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                                lineNumber: 128,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                        lineNumber: 126,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                                lineNumber: 131,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                placeholder: "Search queue...",
                                                className: "pl-9 pr-4 py-1.5 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none w-64"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                                lineNumber: 132,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                        lineNumber: 130,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                lineNumber: 125,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "overflow-x-auto",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    className: "w-full",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                className: "text-left bg-gray-50/30",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-6 py-4 text-xs font-semibold text-gray-500 uppercase",
                                                        children: "Token"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                                        lineNumber: 144,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-6 py-4 text-xs font-semibold text-gray-500 uppercase",
                                                        children: "Patient"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                                        lineNumber: 145,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-6 py-4 text-xs font-semibold text-gray-500 uppercase",
                                                        children: "Doctor / Dept"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                                        lineNumber: 146,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-6 py-4 text-xs font-semibold text-gray-500 uppercase",
                                                        children: "Time"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                                        lineNumber: 147,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-6 py-4 text-xs font-semibold text-gray-500 uppercase",
                                                        children: "Status"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                                        lineNumber: 148,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider",
                                                        children: "Action"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                                        lineNumber: 149,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                                lineNumber: 143,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                            lineNumber: 142,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            className: "divide-y divide-gray-100",
                                            children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    colSpan: 6,
                                                    className: "px-6 py-12 text-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                                        lineNumber: 156,
                                                        columnNumber: 45
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                                    lineNumber: 155,
                                                    columnNumber: 41
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                                lineNumber: 154,
                                                columnNumber: 37
                                            }, this) : queue.length > 0 ? queue.map((apt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: "hover:bg-gray-50 transition-colors",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-6 py-4",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-8 h-8 rounded-lg bg-teal-50 text-teal-700 font-bold flex items-center justify-center border border-teal-100",
                                                                children: apt.tokenNo
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                                                lineNumber: 163,
                                                                columnNumber: 49
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                                            lineNumber: 162,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-6 py-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-semibold text-gray-900",
                                                                    children: apt.patient.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                                                    lineNumber: 168,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-gray-500",
                                                                    children: apt.patient.patientId
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                                                    lineNumber: 169,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                                            lineNumber: 167,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-6 py-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm font-medium text-gray-900",
                                                                    children: apt.doctor.user.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                                                    lineNumber: 172,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-gray-500",
                                                                    children: apt.doctor.department.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                                                    lineNumber: 173,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                                            lineNumber: 171,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-6 py-4 text-sm font-medium text-gray-700",
                                                            children: apt.startTime
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                                            lineNumber: 175,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-6 py-4",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${apt.status === 'CHECKED_IN' ? 'bg-amber-100 text-amber-700' : apt.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`,
                                                                children: apt.status === 'CHECKED_IN' ? 'WAITING' : apt.status
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                                                lineNumber: 179,
                                                                columnNumber: 49
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                                            lineNumber: 178,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-6 py-4 text-right",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: "text-teal-600 hover:text-teal-700 font-semibold text-sm flex items-center gap-1 ml-auto",
                                                                children: [
                                                                    "Handle ",
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                                        className: "w-4 h-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                                                        lineNumber: 188,
                                                                        columnNumber: 60
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                                                lineNumber: 187,
                                                                columnNumber: 49
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                                            lineNumber: 186,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, apt.id, true, {
                                                    fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                                    lineNumber: 161,
                                                    columnNumber: 41
                                                }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    colSpan: 6,
                                                    className: "px-6 py-12 text-center text-gray-500",
                                                    children: "No patients in queue"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                                    lineNumber: 195,
                                                    columnNumber: 41
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                                lineNumber: 194,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                            lineNumber: 152,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                    lineNumber: 141,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                lineNumber: 140,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                        lineNumber: 124,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-xl",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-bold flex items-center gap-2 mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                className: "w-5 h-5 text-teal-400"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                                lineNumber: 209,
                                                columnNumber: 29
                                            }, this),
                                            "Doctor Availability"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                        lineNumber: 208,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: [
                                            {
                                                name: 'Dr. Sarah Smith',
                                                status: 'Available',
                                                color: 'bg-emerald-400'
                                            },
                                            {
                                                name: 'Dr. James Wilson',
                                                status: 'In Surgery',
                                                color: 'bg-red-400'
                                            },
                                            {
                                                name: 'Dr. Emily Chen',
                                                status: 'Available',
                                                color: 'bg-emerald-400'
                                            }
                                        ].map((doc, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between items-center py-2 border-b border-white/10 last:border-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm font-medium text-gray-300",
                                                        children: doc.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                                        lineNumber: 219,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2 text-xs",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: `w-2 h-2 rounded-full ${doc.color}`
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                                                lineNumber: 221,
                                                                columnNumber: 41
                                                            }, this),
                                                            doc.status
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                                        lineNumber: 220,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, i, true, {
                                                fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                                lineNumber: 218,
                                                columnNumber: 33
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                        lineNumber: 212,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                lineNumber: 207,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-2xl border border-gray-100 p-6 shadow-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-bold text-gray-900 flex items-center gap-2 mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                className: "w-5 h-5 text-teal-600"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                                lineNumber: 231,
                                                columnNumber: 29
                                            }, this),
                                            "Recent Walk-ins"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                        lineNumber: 230,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: [
                                            {
                                                name: 'Rahul Sharma',
                                                time: '10 mins ago',
                                                id: 'PT-9982'
                                            },
                                            {
                                                name: 'Priya Gupta',
                                                time: '25 mins ago',
                                                id: 'PT-9981'
                                            }
                                        ].map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold",
                                                        children: p.name[0]
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                                        lineNumber: 240,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm font-bold text-gray-900",
                                                                children: p.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                                                lineNumber: 244,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-gray-500",
                                                                children: [
                                                                    p.id,
                                                                    " • ",
                                                                    p.time
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                                                lineNumber: 245,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                                        lineNumber: 243,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, i, true, {
                                                fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                                lineNumber: 239,
                                                columnNumber: 33
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                        lineNumber: 234,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                                lineNumber: 229,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                        lineNumber: 206,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
                lineNumber: 122,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(dashboard)/opd/page.tsx",
        lineNumber: 72,
        columnNumber: 9
    }, this);
}
_s(OPDPage, "dh8S7DvjiNo/u48okhzRoX7zSw4=");
_c = OPDPage;
var _c;
__turbopack_context__.k.register(_c, "OPDPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_daf36529._.js.map