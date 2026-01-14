"use client"
import TestChecker from "@/app/components/test-checker";

const sampleData = [
    {
        id: "q1",
        question: "What is the capital of France?",
        options: [
            { id: "a1", text: "London" },
            { id: "a2", text: "Paris" },
            { id: "a3", text: "Berlin" },
            { id: "a4", text: "Madrid" }
        ],
        imgUrl: "https://example.com/paris.jpg"
    },
    {
        id: "q2",
        question: "Explain the concept of quantum computing in your own words",
        imgUrl: "https://example.com/quantum.jpg"
    },
    {
        id: "q3",
        question: "Which of these are JavaScript frameworks?",
        options: [
            { id: "b1", text: "React" },
            { id: "b2", text: "Django" },
            { id: "b3", text: "Vue" },
            { id: "b4", text: "Spring" }
        ]
    }
];

export default function Home() {
    const handleResultsSubmit = (results: any) => {
        console.log('Results ready for backend:', results);
        // Send results to your backend API here
        // fetch('/api/submit-test', {
        //   method: 'POST',
        //   body: JSON.stringify(results)
        // })
    };

    return (
        <div className="container mx-auto py-8">
            <TestChecker
                data={sampleData}
                onResultsSubmit={handleResultsSubmit}
            />
        </div>
    );
}