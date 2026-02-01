'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    Calendar,
    Receipt,
    Pill,
    FlaskConical,
    Bed,
    Settings,
    ChevronLeft,
    ChevronRight,
    Building2,
    Stethoscope,
    HeartPulse,
    Ambulance,
    UserCircle,
    Wallet,
} from 'lucide-react';

interface NavItem {
    name: string;
    href: string;
    icon: React.ElementType;
    badge?: number;
}

const navigation: NavItem[] = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Patients', href: '/patients', icon: Users },
    { name: 'Appointments', href: '/appointments', icon: Calendar },
    { name: 'OPD', href: '/opd', icon: Stethoscope },
    { name: 'IPD', href: '/ipd', icon: Bed },
    { name: 'Billing', href: '/billing', icon: Receipt },
    { name: 'Pharmacy', href: '/pharmacy', icon: Pill },
    { name: 'Laboratory', href: '/laboratory', icon: FlaskConical },
    { name: 'Blood Bank', href: '/blood-bank', icon: HeartPulse },
    { name: 'Ambulance', href: '/ambulance', icon: Ambulance },
    { name: 'HR & Payroll', href: '/hr', icon: UserCircle },
    { name: 'Finance', href: '/finance', icon: Wallet },
    { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
            className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 z-40 ${collapsed ? 'w-20' : 'w-64'
                }`}
        >
            {/* Logo */}
            <div className="h-16 flex items-center px-4 border-b border-gray-700/50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-teal-500/20">
                        <Building2 className="w-5 h-5 text-white" />
                    </div>
                    {!collapsed && (
                        <div className="overflow-hidden">
                            <h1 className="font-bold text-lg leading-tight">BN Hospital</h1>
                            <p className="text-xs text-gray-400">HMS</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                {navigation.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${isActive
                                    ? 'bg-gradient-to-r from-teal-500/20 to-cyan-500/10 text-teal-400 border border-teal-500/20'
                                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                }`}
                            title={collapsed ? item.name : undefined}
                        >
                            <item.icon
                                className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-teal-400' : 'text-gray-400 group-hover:text-white'
                                    }`}
                            />
                            {!collapsed && (
                                <span className="flex-1 text-sm font-medium">{item.name}</span>
                            )}
                            {!collapsed && item.badge && (
                                <span className="px-2 py-0.5 text-xs bg-teal-500 rounded-full">
                                    {item.badge}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Collapse Button */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="absolute -right-3 top-20 w-6 h-6 bg-gray-700 border border-gray-600 rounded-full flex items-center justify-center text-gray-300 hover:bg-gray-600 hover:text-white transition-colors shadow-lg"
            >
                {collapsed ? (
                    <ChevronRight className="w-4 h-4" />
                ) : (
                    <ChevronLeft className="w-4 h-4" />
                )}
            </button>
        </aside>
    );
}
