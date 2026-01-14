import { PrismaClient, DaysOfWeek } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting seed...');

    // Clear existing data (be careful in production!)
    console.log('🧹 Clearing existing data...');
    await prisma.attendances.deleteMany();
    await prisma.payments.deleteMany();
    await prisma.lessons.deleteMany();
    await prisma.groups.deleteMany();
    await prisma.student.deleteMany();
    await prisma.teacher.deleteMany();
    await prisma.admin.deleteMany();
    await prisma.course.deleteMany();
    await prisma.subject.deleteMany();
    await prisma.cameFrom.deleteMany();

    // Create cameFrom sources
    console.log('📝 Creating cameFrom sources...');
    const cameFromSources = [
        'Instagram',
        'Facebook',
        'Google Search',
        'Friend Recommendation',
        'School',
        'YouTube',
        'Telegram',
        'Website',
    ];

    const cameFromRecords = [];
    for (const source of cameFromSources) {
        const cameFrom = await prisma.cameFrom.create({
            data: {
                name: source,
            },
        });
        cameFromRecords.push(cameFrom);
    }

    // Create Subjects
    console.log('📚 Creating subjects...');
    const subjects = [
        { name: 'Mathematics' },
        { name: 'Physics' },
        { name: 'Chemistry' },
        { name: 'Biology' },
        { name: 'English Language' },
        { name: 'Computer Science' },
        { name: 'History' },
        { name: 'Geography' },
    ];

    const subjectRecords = [];
    for (const subjectData of subjects) {
        const subject = await prisma.subject.create({
            data: subjectData,
        });
        subjectRecords.push(subject);
    }

    // Create Courses
    console.log('🎓 Creating courses...');
    const courses = [
        {
            name: 'Basic Mathematics',
            desc: 'Foundation course covering basic mathematical concepts',
            price: '500000',
            subjectId: subjectRecords[0].id,
        },
        {
            name: 'Advanced Physics',
            desc: 'In-depth study of physics principles and applications',
            price: '750000',
            subjectId: subjectRecords[1].id,
        },
        {
            name: 'Organic Chemistry',
            desc: 'Comprehensive organic chemistry course',
            price: '600000',
            subjectId: subjectRecords[2].id,
        },
        {
            name: 'English for Beginners',
            desc: 'Beginner level English language course',
            price: '400000',
            subjectId: subjectRecords[4].id,
        },
        {
            name: 'Web Development Bootcamp',
            desc: 'Full-stack web development course',
            price: '1200000',
            subjectId: subjectRecords[5].id,
        },
    ];

    const courseRecords = [];
    for (const courseData of courses) {
        const course = await prisma.course.create({
            data: courseData,
        });
        courseRecords.push(course);
    }

    // Create Teachers
    console.log('👨‍🏫 Creating teachers...');
    const teacherNames = [
        'John Smith',
        'Emma Wilson',
        'Michael Brown',
        'Sarah Johnson',
        'David Lee',
        'Lisa Chen',
        'Robert Taylor',
        'Maria Garcia',
    ];

    const teacherRecords = [];
    for (let i = 0; i < 8; i++) {
        const teacher = await prisma.teacher.create({
            data: {
                name: teacherNames[i],
                birthday: faker.date.between({ from: '1970-01-01', to: '1990-01-01' }),
                phone: faker.phone.number({ style: "international" }),
                ratings: faker.number.float({ min: 3.5, max: 5, fractionDigits: 1 }),
                email: faker.internet.email({ firstName: teacherNames[i].split(' ')[0], lastName: teacherNames[i].split(' ')[1] }),
                avatarUrl: faker.image.avatar(),
            },
        });
        teacherRecords.push(teacher);
    }

    // Connect Teachers to Subjects
    console.log('🔗 Connecting teachers to subjects...');
    for (let i = 0; i < teacherRecords.length; i++) {
        const teacher = teacherRecords[i];
        const subject = subjectRecords[i % subjectRecords.length];

        await prisma.teacher.update({
            where: { id: teacher.id },
            data: {
                subjects: {
                    connect: { id: subject.id },
                },
            },
        });
    }

    // Create Students
    console.log('👨‍🎓 Creating students...');
    const studentRecords = [];
    for (let i = 0; i < 50; i++) {
        const cameFrom = faker.helpers.arrayElement(cameFromRecords);

        const student = await prisma.student.create({
            data: {
                name: faker.person.fullName(),
                birthday: faker.date.between({ from: '2000-01-01', to: '2010-01-01' }),
                phone: faker.phone.number({ style: "international" }),
                cameText: cameFrom.id,
            },
        });
        studentRecords.push(student);
    }

    // Create Groups
    console.log('👥 Creating groups...');
    const groupNames = [
        'Math Beginners',
        'Physics Advanced',
        'Chemistry Lab',
        'English Intermediate',
        'Web Dev Group A',
        'Web Dev Group B',
        'Math Advanced',
        'Physics Beginners',
    ];

    const groupRecords = [];
    for (let i = 0; i < 8; i++) {
        const teacher = teacherRecords[i];
        const course = courseRecords[i % courseRecords.length];

        const group = await prisma.groups.create({
            data: {
                name: groupNames[i],
                teacherId: teacher.id,
                courseId: course.id,
            },
        });
        groupRecords.push(group);
    }

    // Assign Students to Groups
    console.log('📋 Assigning students to groups...');
    for (let i = 0; i < studentRecords.length; i++) {
        const student = studentRecords[i];
        const group = groupRecords[i % groupRecords.length];

        await prisma.student.update({
            where: { id: student.id },
            data: {
                groupId: group.id,
            },
        });
    }

    // Connect Students to Courses
    console.log('🎯 Connecting students to courses...');
    for (let i = 0; i < studentRecords.length; i++) {
        const student = studentRecords[i];
        const course = courseRecords[i % courseRecords.length];

        await prisma.student.update({
            where: { id: student.id },
            data: {
                courses: {
                    connect: { id: course.id },
                },
            },
        });
    }

    // Create Lessons
    console.log('📅 Creating lessons...');
    const lessonTimes = [
        { start: '09:00', end: '10:30' },
        { start: '11:00', end: '12:30' },
        { start: '14:00', end: '15:30' },
        { start: '16:00', end: '17:30' },
    ];

    const roomNames = ['Room 101', 'Room 102', 'Room 201', 'Room 202', 'Lab 1', 'Lab 2'];

    const lessonRecords = [];
    for (let i = 0; i < groupRecords.length; i++) {
        const group = groupRecords[i];
        const teacher = teacherRecords[i];
        const lessonTime = lessonTimes[i % lessonTimes.length];

        // Create multiple lessons per group for different days
        for (let dayOffset = 0; dayOffset < 3; dayOffset++) {
            const lessonDate = new Date();
            lessonDate.setDate(lessonDate.getDate() + dayOffset * 7); // Weekly lessons

            const startTime = new Date(lessonDate);
            const [hours, minutes] = lessonTime.start.split(':').map(Number);
            startTime.setHours(hours, minutes, 0, 0);

            const endTime = new Date(lessonDate);
            const [endHours, endMinutes] = lessonTime.end.split(':').map(Number);
            endTime.setHours(endHours, endMinutes, 0, 0);

            // Assign random days of week
            const availableDays = Object.values(DaysOfWeek);
            const selectedDays = faker.helpers.arrayElements(availableDays, faker.number.int({ min: 1, max: 3 }));

            const lesson = await prisma.lessons.create({
                data: {
                    desc: `${group.name} - Lesson ${dayOffset + 1}`,
                    daysOfWeek: selectedDays,
                    groupId: group.id,
                    teacherId: teacher.id,
                    startTime: startTime,
                    endTime: endTime,
                    room: faker.helpers.arrayElement(roomNames),
                },
            });
            lessonRecords.push(lesson);
        }
    }

    // Create Attendances
    console.log('✅ Creating attendance records...');
    for (const lesson of lessonRecords) {
        const group = await prisma.groups.findUnique({
            where: { id: lesson.groupId! },
            include: { students: true },
        });

        if (group && group.students.length > 0) {
            // Randomly select some students to be present
            const presentStudents = faker.helpers.arrayElements(
                group.students,
                faker.number.int({ min: Math.floor(group.students.length * 0.7), max: group.students.length })
            );

            for (const student of presentStudents) {
                await prisma.attendances.create({
                    data: {
                        desc: 'Regular attendance',
                        studentId: student.id,
                        teacherId: lesson.teacherId,
                        lessonsId: lesson.id,
                        date: lesson.startTime,
                    },
                });
            }
        }
    }

    // Create Payments
    console.log('💰 Creating payment records...');
    for (const group of groupRecords) {
        const groupWithStudents = await prisma.groups.findUnique({
            where: { id: group.id },
            include: { students: true },
        });

        if (groupWithStudents) {
            for (const student of groupWithStudents.students) {
                // Create 1-3 payment records per student
                const paymentCount = faker.number.int({ min: 1, max: 3 });

                for (let i = 0; i < paymentCount; i++) {
                    const paymentDate = faker.date.between({
                        from: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // Last 90 days
                        to: new Date(),
                    });

                    await prisma.payments.create({
                        data: {
                            date: paymentDate,
                            groupId: group.id,
                            desc: `Payment for ${courseRecords.find(c => c.id === group.courseId)?.name || 'Course'}`,
                            amount: faker.helpers.arrayElement(['500000', '600000', '750000', '400000']),
                            studentId: student.id,
                        },
                    });
                }
            }
        }
    }

    // Create Admin
    console.log('👑 Creating admin user...');
    await prisma.admin.create({
        data: {
            name: 'Admin User',
            birthday: new Date('1985-01-01'),
            email: 'admin@example.com',
            avatarUrl: faker.image.avatar(),
        },
    });

    console.log('✨ Seed completed successfully!');
    console.log('📊 Summary:');
    console.log(`   Subjects: ${subjectRecords.length}`);
    console.log(`   Courses: ${courseRecords.length}`);
    console.log(`   Teachers: ${teacherRecords.length}`);
    console.log(`   Students: ${studentRecords.length}`);
    console.log(`   Groups: ${groupRecords.length}`);
    console.log(`   Lessons: ${lessonRecords.length}`);
    console.log(`   CameFrom Sources: ${cameFromRecords.length}`);
}

main()
    .catch((e) => {
        console.error('❌ Error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });