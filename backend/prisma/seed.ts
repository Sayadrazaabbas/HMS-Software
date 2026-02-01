// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seed...');

    // Clear existing data (in development only)
    console.log('Clearing existing data...');

    // Create Roles
    console.log('Creating roles...');
    const adminRole = await prisma.role.upsert({
        where: { name: 'admin' },
        update: {},
        create: {
            name: 'admin',
            displayName: 'Administrator',
            permissions: ['*'], // All permissions
            isSystem: true,
        },
    });

    const doctorRole = await prisma.role.upsert({
        where: { name: 'doctor' },
        update: {},
        create: {
            name: 'doctor',
            displayName: 'Doctor',
            permissions: [
                'patients:read',
                'patients:write',
                'appointments:read',
                'appointments:write',
                'prescriptions:write',
                'lab:read',
            ],
            isSystem: true,
        },
    });

    const receptionistRole = await prisma.role.upsert({
        where: { name: 'receptionist' },
        update: {},
        create: {
            name: 'receptionist',
            displayName: 'Receptionist',
            permissions: [
                'patients:read',
                'patients:write',
                'appointments:read',
                'appointments:write',
                'billing:read',
                'billing:write',
            ],
            isSystem: true,
        },
    });

    const pharmacistRole = await prisma.role.upsert({
        where: { name: 'pharmacist' },
        update: {},
        create: {
            name: 'pharmacist',
            displayName: 'Pharmacist',
            permissions: [
                'pharmacy:read',
                'pharmacy:write',
                'patients:read',
            ],
            isSystem: true,
        },
    });

    const labTechRole = await prisma.role.upsert({
        where: { name: 'lab_technician' },
        update: {},
        create: {
            name: 'lab_technician',
            displayName: 'Lab Technician',
            permissions: [
                'lab:read',
                'lab:write',
                'patients:read',
            ],
            isSystem: true,
        },
    });

    console.log('✅ Roles created');

    // Create Departments
    console.log('Creating departments...');
    const departments = await Promise.all([
        prisma.department.upsert({
            where: { code: 'GEN' },
            update: {},
            create: { name: 'General Medicine', code: 'GEN', description: 'General OPD consultations' },
        }),
        prisma.department.upsert({
            where: { code: 'PED' },
            update: {},
            create: { name: 'Pediatrics', code: 'PED', description: 'Child healthcare' },
        }),
        prisma.department.upsert({
            where: { code: 'GYN' },
            update: {},
            create: { name: 'Gynecology', code: 'GYN', description: 'Women healthcare' },
        }),
        prisma.department.upsert({
            where: { code: 'ORT' },
            update: {},
            create: { name: 'Orthopedics', code: 'ORT', description: 'Bone and joint care' },
        }),
        prisma.department.upsert({
            where: { code: 'ENT' },
            update: {},
            create: { name: 'ENT', code: 'ENT', description: 'Ear, Nose and Throat' },
        }),
        prisma.department.upsert({
            where: { code: 'CAR' },
            update: {},
            create: { name: 'Cardiology', code: 'CAR', description: 'Heart care' },
        }),
        prisma.department.upsert({
            where: { code: 'DER' },
            update: {},
            create: { name: 'Dermatology', code: 'DER', description: 'Skin care' },
        }),
    ]);
    console.log('✅ Departments created');

    // Create Admin User
    console.log('Creating admin user...');
    const hashedPassword = await bcrypt.hash('Admin@123', 10);

    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@bnhospital.com' },
        update: {},
        create: {
            email: 'admin@bnhospital.com',
            phone: '9876543210',
            password: hashedPassword,
            name: 'Rajesh Sharma',
            roleId: adminRole.id,
            isActive: true,
        },
    });
    console.log('✅ Admin user created: admin@bnhospital.com / Admin@123');

    // Create Sample Doctor
    const doctorUser = await prisma.user.upsert({
        where: { email: 'doctor@bnhospital.com' },
        update: {},
        create: {
            email: 'doctor@bnhospital.com',
            phone: '9876543211',
            password: hashedPassword,
            name: 'Dr. Amit Kumar',
            roleId: doctorRole.id,
            isActive: true,
        },
    });

    const doctor = await prisma.doctor.upsert({
        where: { userId: doctorUser.id },
        update: {},
        create: {
            userId: doctorUser.id,
            departmentId: departments[0].id, // General Medicine
            specialization: 'General Physician',
            qualification: 'MBBS, MD',
            registrationNo: 'MCI-123456',
            consultationFee: 500,
        },
    });
    console.log('✅ Doctor created: doctor@bnhospital.com / Admin@123');

    // Create Receptionist
    const receptionistUser = await prisma.user.upsert({
        where: { email: 'reception@bnhospital.com' },
        update: {},
        create: {
            email: 'reception@bnhospital.com',
            phone: '9876543212',
            password: hashedPassword,
            name: 'Priya Verma',
            roleId: receptionistRole.id,
            isActive: true,
        },
    });
    console.log('✅ Receptionist created: reception@bnhospital.com / Admin@123');

    // Create Doctor Schedule (Mon-Sat 9AM-5PM)
    const daysOfWeek = [1, 2, 3, 4, 5, 6]; // Monday to Saturday
    for (const day of daysOfWeek) {
        await prisma.doctorSchedule.upsert({
            where: {
                doctorId_dayOfWeek: { doctorId: doctor.id, dayOfWeek: day },
            },
            update: {},
            create: {
                doctorId: doctor.id,
                dayOfWeek: day,
                startTime: '09:00',
                endTime: '17:00',
                slotDuration: 15,
                isActive: true,
            },
        });
    }
    console.log('✅ Doctor schedule created (Mon-Sat 9AM-5PM)');

    // Create Sample Services
    console.log('Creating services...');
    const services = [
        { name: 'General Consultation', code: 'CONSULT', category: 'Consultation', price: 500 },
        { name: 'Follow-up Consultation', code: 'FOLLOWUP', category: 'Consultation', price: 300 },
        { name: 'Emergency Consultation', code: 'EMERG', category: 'Emergency', price: 1000 },
        { name: 'X-Ray', code: 'XRAY', category: 'Radiology', price: 400 },
        { name: 'ECG', code: 'ECG', category: 'Cardiology', price: 300 },
        { name: 'Blood Test - CBC', code: 'LAB-CBC', category: 'Lab', price: 250 },
        { name: 'Blood Test - Sugar', code: 'LAB-SUGAR', category: 'Lab', price: 150 },
        { name: 'Urine Test', code: 'LAB-URINE', category: 'Lab', price: 100 },
        { name: 'General Ward (per day)', code: 'WARD-GEN', category: 'IPD', price: 1000 },
        { name: 'Private Room (per day)', code: 'WARD-PVT', category: 'IPD', price: 3000 },
        { name: 'ICU (per day)', code: 'WARD-ICU', category: 'IPD', price: 5000 },
    ];

    for (const service of services) {
        await prisma.service.upsert({
            where: { code: service.code },
            update: {},
            create: service,
        });
    }
    console.log('✅ Services created');

    // Create Sample Wards and Beds
    console.log('Creating wards and beds...');
    const generalWard = await prisma.ward.upsert({
        where: { code: 'GEN-W1' },
        update: {},
        create: {
            name: 'General Ward 1',
            code: 'GEN-W1',
            type: 'GENERAL',
            floor: 'Ground Floor',
        },
    });

    const privateWard = await prisma.ward.upsert({
        where: { code: 'PVT-W1' },
        update: {},
        create: {
            name: 'Private Ward',
            code: 'PVT-W1',
            type: 'PRIVATE',
            floor: 'First Floor',
        },
    });

    const icuWard = await prisma.ward.upsert({
        where: { code: 'ICU-01' },
        update: {},
        create: {
            name: 'ICU',
            code: 'ICU-01',
            type: 'ICU',
            floor: 'First Floor',
        },
    });

    // Create beds
    for (let i = 1; i <= 10; i++) {
        await prisma.bed.upsert({
            where: { wardId_bedNo: { wardId: generalWard.id, bedNo: `GEN-${i.toString().padStart(2, '0')}` } },
            update: {},
            create: {
                wardId: generalWard.id,
                bedNo: `GEN-${i.toString().padStart(2, '0')}`,
                status: 'AVAILABLE',
                dailyCharge: 1000,
            },
        });
    }

    for (let i = 1; i <= 5; i++) {
        await prisma.bed.upsert({
            where: { wardId_bedNo: { wardId: privateWard.id, bedNo: `PVT-${i.toString().padStart(2, '0')}` } },
            update: {},
            create: {
                wardId: privateWard.id,
                bedNo: `PVT-${i.toString().padStart(2, '0')}`,
                status: 'AVAILABLE',
                dailyCharge: 3000,
            },
        });
    }

    for (let i = 1; i <= 5; i++) {
        await prisma.bed.upsert({
            where: { wardId_bedNo: { wardId: icuWard.id, bedNo: `ICU-${i.toString().padStart(2, '0')}` } },
            update: {},
            create: {
                wardId: icuWard.id,
                bedNo: `ICU-${i.toString().padStart(2, '0')}`,
                status: 'AVAILABLE',
                dailyCharge: 5000,
            },
        });
    }
    console.log('✅ Wards and beds created');

    // Create Lab Tests
    console.log('Creating lab tests...');
    const labTests = [
        { name: 'Complete Blood Count', code: 'CBC', category: 'blood', price: 250, reportTime: 4, sampleType: 'Blood' },
        { name: 'Blood Sugar Fasting', code: 'BSF', category: 'blood', price: 100, reportTime: 2, sampleType: 'Blood' },
        { name: 'Blood Sugar PP', code: 'BSPP', category: 'blood', price: 100, reportTime: 2, sampleType: 'Blood' },
        { name: 'Lipid Profile', code: 'LIPID', category: 'blood', price: 600, reportTime: 6, sampleType: 'Blood' },
        { name: 'Liver Function Test', code: 'LFT', category: 'blood', price: 500, reportTime: 6, sampleType: 'Blood' },
        { name: 'Kidney Function Test', code: 'KFT', category: 'blood', price: 500, reportTime: 6, sampleType: 'Blood' },
        { name: 'Thyroid Profile', code: 'THYROID', category: 'blood', price: 700, reportTime: 24, sampleType: 'Blood' },
        { name: 'Urine Routine', code: 'URINE-R', category: 'urine', price: 80, reportTime: 2, sampleType: 'Urine' },
    ];

    for (const test of labTests) {
        await prisma.labTest.upsert({
            where: { code: test.code },
            update: {},
            create: test,
        });
    }
    console.log('✅ Lab tests created');

    // Create Sample Patients
    console.log('Creating sample patients...');
    const patients = [
        { patientId: 'P-2026-0001', name: 'Rahul Verma', phone: '9898989898', gender: 'MALE' as const, age: 35 },
        { patientId: 'P-2026-0002', name: 'Sunita Devi', phone: '9797979797', gender: 'FEMALE' as const, age: 42 },
        { patientId: 'P-2026-0003', name: 'Amit Singh', phone: '9696969696', gender: 'MALE' as const, age: 28 },
        { patientId: 'P-2026-0004', name: 'Priya Sharma', phone: '9595959595', gender: 'FEMALE' as const, age: 55 },
        { patientId: 'P-2026-0005', name: 'Vikram Patel', phone: '9494949494', gender: 'MALE' as const, age: 65 },
    ];

    for (const patient of patients) {
        await prisma.patient.upsert({
            where: { patientId: patient.patientId },
            update: {},
            create: {
                ...patient,
                city: 'Varanasi',
                state: 'Uttar Pradesh',
            },
        });
    }
    console.log('✅ Sample patients created');

    // Create Hospital Settings
    console.log('Creating hospital settings...');
    const settings = [
        { key: 'hospital_name', value: 'BN Hospital', group: 'hospital' },
        { key: 'hospital_address', value: 'Sigra, Varanasi, UP', group: 'hospital' },
        { key: 'hospital_phone', value: '+91 542 123 4567', group: 'hospital' },
        { key: 'hospital_email', value: 'info@bnhospital.com', group: 'hospital' },
        { key: 'invoice_prefix', value: 'INV', group: 'billing' },
        { key: 'patient_prefix', value: 'P', group: 'billing' },
        { key: 'appointment_prefix', value: 'APT', group: 'billing' },
        { key: 'tax_rate', value: '0', group: 'billing' },
    ];

    for (const setting of settings) {
        await prisma.setting.upsert({
            where: { key: setting.key },
            update: {},
            create: setting,
        });
    }
    console.log('✅ Hospital settings created');

    console.log('');
    console.log('🎉 Database seeded successfully!');
    console.log('');
    console.log('📋 Test Accounts:');
    console.log('   Admin:        admin@bnhospital.com / Admin@123');
    console.log('   Doctor:       doctor@bnhospital.com / Admin@123');
    console.log('   Receptionist: reception@bnhospital.com / Admin@123');
    console.log('');
}

main()
    .catch((e) => {
        console.error('❌ Seed error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
