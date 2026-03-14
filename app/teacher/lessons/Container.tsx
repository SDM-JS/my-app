
import DataTable from '@/app/components/DataTable';
import { mockLessons } from '@/app/data/mockData';

export default function TeacherLessonsPage({ lessons }: any) {

    const myLessons = mockLessons.filter((l) => l.teacher === 'Dr. Robert Chen');

    const columns = [
        {
            key: 'id', label: 'Lesson ID', sortable: true,

        },
        { key: 'course', label: 'Course', sortable: true },
        { key: 'dateTime', label: 'Time', sortable: true },
        { key: 'topic', label: 'Topic', sortable: false },

    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">My Lessons</h1>
                <p className="text-muted-foreground">View your lesson schedule</p>
            </div>

            <DataTable columns={columns} data={myLessons} />
        </div>
    );
}