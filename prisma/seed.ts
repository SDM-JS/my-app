// prisma/seed.ts
import { PrismaClient, Roles, DaysOfWeek, Status, CameFrom } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await prisma.attendances.deleteMany();
    await prisma.payments.deleteMany();
    await prisma.lessons.deleteMany();
    await prisma.course.deleteMany();
    await prisma.subject.deleteMany();
    await prisma.groups.deleteMany();
    await prisma.student.deleteMany();
    await prisma.teacher.deleteMany();
    await prisma.admin.deleteMany();

    console.log('✅ Database cleared');

    // Create password hash
    const passwordHash = await bcrypt.hash('password123', 10);

    // Create Admins
    console.log('👨‍💼 Creating admins...');
    const admins = await Promise.all(
        Array.from({ length: 3 }).map(async () => {
            return prisma.admin.create({
                data: {
                    name: faker.person.fullName(),
                    birthday: faker.date.birthdate({ min: 30, max: 60, mode: 'age' }),
                    email: faker.internet.email(),
                },
            });
        })
    );

    // Create Subjects
    console.log('📚 Creating subjects...');
    const subjects = [
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
        'English Literature',
        'Computer Science',
        'History',
        'Art & Design',
        'Music Theory',
        'Foreign Languages',
        'Economics',
        'Business Studies',
    ].map((name) => ({ name }));

    const createdSubjects = await Promise.all(
        subjects.map((subject) =>
            prisma.subject.create({
                data: subject,
            })
        )
    );

    // Create Teachers
    console.log('👨‍🏫 Creating teachers...');
    const teachers = await Promise.all(
        Array.from({ length: 15 }).map(async (_, index) => {
            return prisma.teacher.create({
                data: {
                    name: faker.person.fullName(),
                    birthday: faker.date.birthdate({ min: 25, max: 55, mode: 'age' }),
                    phone: faker.phone.number(),
                    ratings: parseFloat(faker.number.float({ min: 3.5, max: 5 }).toFixed(1)),
                    email: faker.internet.email(),
                    subjects: {
                        connect: [
                            { id: faker.helpers.arrayElement(createdSubjects).id },
                            { id: faker.helpers.arrayElement(createdSubjects).id },
                        ],
                    },
                },
            });
        })
    );

    // Create Courses
    console.log('🎓 Creating courses...');
    const courses = await Promise.all(
        Array.from({ length: 25 }).map(async () => {
            const subject = faker.helpers.arrayElement(createdSubjects);
            const price = faker.commerce.price({ min: 100, max: 500 });

            return prisma.course.create({
                data: {
                    name: `${subject.name} ${faker.helpers.arrayElement([
                        'Fundamentals',
                        'Advanced',
                        'Beginner',
                        'Professional',
                        'Crash Course',
                        'Master Class',
                    ])}`,
                    desc: faker.lorem.sentence(),
                    price: price.toString(),
                    subject: { connect: { id: subject.id } },
                    teacher: {
                        connect: faker.helpers.arrayElements(teachers, faker.number.int({ min: 1, max: 3 })),
                    },
                },
            });
        })
    );

    // Create Groups
    console.log('👥 Creating groups...');
    const groups = await Promise.all(
        Array.from({ length: 10 }).map(async () => {
            const days = faker.helpers.arrayElements(Object.values(DaysOfWeek), faker.number.int({ min: 2, max: 5 }));
            const fromTime = faker.date.between({ from: '2024-01-01T09:00:00Z', to: '2024-01-01T12:00:00Z' });
            const toTime = new Date(fromTime.getTime() + 2 * 60 * 60 * 1000); // 2 hours later
            const teacher = faker.helpers.arrayElement(teachers)

            return prisma.groups.create({
                data: {
                    name: faker.helpers.arrayElement([
                        'Alpha',
                        'Beta',
                        'Gamma',
                        'Delta',
                        'Epsilon',
                        'Zeta',
                        'Theta',
                        'Lambda',
                    ]) + ' Group',
                    from: fromTime,
                    to: toTime,
                    daysOfWeek: days,
                    teacherId: teacher.id,
                },
            });
        })
    );

    // Create Students
    console.log('🧑‍🎓 Creating students...');
    const students = await Promise.all(
        Array.from({ length: 100 }).map(async () => {
            const student = await prisma.student.create({
                data: {
                    name: faker.person.fullName(),
                    birthday: faker.date.birthdate({ min: 15, max: 25, mode: 'age' }),
                    phone: faker.phone.number(),
                    cameFrom: faker.helpers.arrayElement(Object.values(CameFrom)),
                    group: faker.datatype.boolean(0.7) ? {
                        connect: { id: faker.helpers.arrayElement(groups).id }
                    } : undefined,
                },
            });

            // Enroll students in courses
            const studentCourses = faker.helpers.arrayElements(courses, faker.number.int({ min: 1, max: 4 }));
            for (const course of studentCourses) {
                await prisma.course.update({
                    where: { id: course.id },
                    data: {
                        students: {
                            connect: { id: student.id },
                        },
                    },
                });
            }

            return student;
        })
    );

    // Create Lessons
    console.log('📅 Creating lessons...');
    const lessons = await Promise.all(
        Array.from({ length: 50 }).map(async () => {
            const course = faker.helpers.arrayElement(courses);
            const teacher = faker.helpers.arrayElement(teachers);
            const lessonDate = faker.date.future({ years: 0.5 });

            return prisma.lessons.create({
                data: {
                    desc: faker.lorem.sentence(),
                    dateTime: lessonDate,
                    roomName: faker.helpers.arrayElement(['Room 101', 'Room 102', 'Lab A', 'Auditorium', 'Online']),
                    status: faker.helpers.arrayElement(Object.values(Status)),
                    cource: { connect: { id: course.id } },
                    teacher: { connect: { id: teacher.id } },
                },
            });
        })
    );

    // Create Payments
    console.log('💰 Creating payments...');
    await Promise.all(
        Array.from({ length: 200 }).map(async () => {
            const student = faker.helpers.arrayElement(students);
            const group = faker.helpers.arrayElement(groups);
            const amount = faker.commerce.price({ min: 50, max: 500 });
            const paymentDate = faker.date.between({ from: '2024-01-01', to: new Date() });

            return prisma.payments.create({
                data: {
                    studentName: student.name,
                    desc: faker.finance.transactionDescription(),
                    amount: amount.toString(),
                    groupId: group.id,
                    date: new Date(),
                    createdAt: paymentDate,
                    updatedAt: paymentDate,
                },
            });
        })
    );

    // Create Attendances
    console.log('📝 Creating attendances...');
    await Promise.all(
        Array.from({ length: 500 }).map(async () => {
            const student = faker.helpers.arrayElement(students);
            const teacher = faker.helpers.arrayElement(teachers);
            const attendanceDate = faker.date.recent({ days: 30 });

            return prisma.attendances.create({
                data: {
                    desc: faker.helpers.arrayElement([
                        'Regular class',
                        'Makeup session',
                        'Exam preparation',
                        'Group project',
                        'Special workshop',
                    ]),
                    student: { connect: { id: student.id } },
                    teacher: { connect: { id: teacher.id } },
                    date: attendanceDate,
                    createdAt: attendanceDate,
                    updatedAt: attendanceDate,
                },
            });
        })
    );

    // Create recent attendances for today
    console.log('📝 Creating today\'s attendances...');
    const today = new Date();
    const todayStudents = faker.helpers.arrayElements(students, faker.number.int({ min: 40, max: 70 }));

    await Promise.all(
        todayStudents.map(async (student) => {
            const teacher = faker.helpers.arrayElement(teachers);

            return prisma.attendances.create({
                data: {
                    desc: 'Today\'s class',
                    student: { connect: { id: student.id } },
                    teacher: { connect: { id: teacher.id } },
                    date: today,
                    createdAt: today,
                    updatedAt: today,
                },
            });
        })
    );

    console.log('✅ Database seeding completed!');
    console.log('📊 Summary:');
    console.log(`   - ${admins.length} Admins created`);
    console.log(`   - ${createdSubjects.length} Subjects created`);
    console.log(`   - ${teachers.length} Teachers created`);
    console.log(`   - ${courses.length} Courses created`);
    console.log(`   - ${groups.length} Groups created`);
    console.log(`   - ${students.length} Students created`);
    console.log(`   - ${lessons.length} Lessons created`);
    console.log(`   - 200+ Payments created`);
    console.log(`   - 500+ Attendances created (including today's)`);
    console.log('');
    console.log('🔑 Default login credentials:');
    console.log('   Admin: username: admin1, password: password123');
    console.log('   Teacher: username: teacher1, password: password123');
}

main()
    .catch((e) => {
        console.error('❌ Error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });