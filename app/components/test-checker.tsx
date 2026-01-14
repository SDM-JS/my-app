// app/components/test-checker.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, Circle, Send, AlertCircle } from 'lucide-react';

interface Option {
    id: string;
    text: string;
}

interface Question {
    id: string;
    question: string;
    options?: Option[];
    imgUrl?: string;
    type?: 'test' | 'question'; // Optional: explicitly define type
}

interface TestResult {
    id: string;
    question: string;
    studentAnswer: string;
    answerId?: string;
}

interface TextQuestionResult {
    questionId: string;
    answerText: string;
}

type ResultsArray = (TestResult | TextQuestionResult)[];

interface TestCheckerProps {
    data: Question[];
    onResultsSubmit?: (results: ResultsArray) => void;
}

export default function TestChecker({ data, onResultsSubmit }: TestCheckerProps) {
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [textAnswers, setTextAnswers] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [allAnswered, setAllAnswered] = useState(false);

    // Check if all questions are answered
    useEffect(() => {
        const checkAllAnswered = () => {
            for (const question of data) {
                if (question.options && question.options.length > 0) {
                    // Test question - must have an answer selected
                    if (!answers[question.id]) {
                        return false;
                    }
                } else {
                    // Text question - must have non-empty answer
                    const textAnswer = textAnswers[question.id] || '';
                    if (!textAnswer.trim()) {
                        return false;
                    }
                }
            }
            return true;
        };

        setAllAnswered(checkAllAnswered());
    }, [answers, textAnswers, data]);

    const handleOptionSelect = (questionId: string, optionId: string) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: optionId
        }));
    };

    const handleTextAnswerChange = (questionId: string, answer: string) => {
        setTextAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));
    };

    const submitTest = () => {
        if (!allAnswered) {
            return; // Should not be reachable due to button disabled state
        }

        const resultsArray: ResultsArray = [];

        data.forEach(item => {
            if (item.options && item.options.length > 0) {
                // It's a test question
                const studentAnswer = answers[item.id] || '';
                const selectedOption = item.options.find(opt => opt.id === studentAnswer);

                resultsArray.push({
                    id: item.id,
                    question: item.question,
                    studentAnswer: selectedOption?.text || '',
                    answerId: studentAnswer
                });
            } else {
                // It's a free-text question
                resultsArray.push({
                    questionId: item.id,
                    answerText: textAnswers[item.id] || ''
                });
            }
        });

        setSubmitted(true);

        // Console.log the results as requested
        console.log('Test results ready for backend:', resultsArray);
        console.log('Formatted data:', JSON.stringify(resultsArray, null, 2));

        if (onResultsSubmit) {
            onResultsSubmit(resultsArray);
        }
    };

    const navigateQuestion = (direction: 'prev' | 'next') => {
        if (direction === 'prev' && currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        } else if (direction === 'next' && currentIndex < data.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const currentQuestion = data[currentIndex];
    const progress = ((currentIndex + 1) / data.length) * 100;

    const isTestQuestion = currentQuestion.options && currentQuestion.options.length > 0;
    const isCurrentAnswered = isTestQuestion
        ? answers[currentQuestion.id] !== undefined
        : textAnswers[currentQuestion.id]?.trim() !== '';

    const unansweredCount = data.reduce((count, question) => {
        if (question.options && question.options.length > 0) {
            return answers[question.id] ? count : count + 1;
        } else {
            const textAnswer = textAnswers[question.id] || '';
            return textAnswer.trim() ? count : count + 1;
        }
    }, 0);

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-6">
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Test & Questions</h1>
                    <div className="flex items-center gap-4">
                        <Badge variant="outline" className="text-sm">
                            {currentIndex + 1} of {data.length}
                        </Badge>
                        <Badge
                            variant={allAnswered ? "default" : "secondary"}
                            className={allAnswered ? "bg-green-600" : ""}
                        >
                            {allAnswered ? "Ready to Submit" : `${unansweredCount} unanswered`}
                        </Badge>
                    </div>
                </div>
                <Progress value={progress} className="h-2" />
            </div>

            {!allAnswered && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                        Please answer all {data.length} questions before submitting.
                        You have {unansweredCount} unanswered question{unansweredCount !== 1 ? 's' : ''}.
                    </AlertDescription>
                </Alert>
            )}

            {submitted && (
                <Alert className="bg-green-50 border-green-200">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                        Test submitted successfully! Check the browser console for the results data.
                    </AlertDescription>
                </Alert>
            )}

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <span>Question {currentIndex + 1}</span>
                            {isTestQuestion ? (
                                <Badge variant="secondary">Multiple Choice</Badge>
                            ) : (
                                <Badge variant="outline">Text Answer</Badge>
                            )}
                        </CardTitle>
                        <div className="text-sm text-muted-foreground">
                            {isCurrentAnswered ? (
                                <span className="flex items-center gap-1 text-green-600">
                                    <CheckCircle className="w-4 h-4" /> Answered
                                </span>
                            ) : (
                                <span className="flex items-center gap-1 text-amber-600">
                                    <Circle className="w-4 h-4" /> Pending
                                </span>
                            )}
                        </div>
                    </div>
                    <CardDescription>
                        {isTestQuestion
                            ? "Select one option from the choices below"
                            : "Type your answer in the text box below"}
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">{currentQuestion.question}</h2>

                        {currentQuestion.imgUrl && (
                            <div className="rounded-lg overflow-hidden border">
                                <img
                                    src={currentQuestion.imgUrl}
                                    alt="Question illustration"
                                    className="w-full h-auto max-h-64 object-contain"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                    }}
                                />
                            </div>
                        )}

                        {isTestQuestion ? (
                            <RadioGroup
                                value={answers[currentQuestion.id] || ''}
                                onValueChange={(value) => handleOptionSelect(currentQuestion.id, value)}
                                className="space-y-3"
                            >
                                {currentQuestion.options?.map((option) => (
                                    <div key={option.id} className="flex items-center space-x-2">
                                        <RadioGroupItem value={option.id} id={`${currentQuestion.id}-${option.id}`} />
                                        <Label
                                            htmlFor={`${currentQuestion.id}-${option.id}`}
                                            className="flex-1 cursor-pointer py-3 px-4 rounded-md border hover:bg-accent transition-colors"
                                        >
                                            {option.text}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        ) : (
                            <div className="space-y-3">
                                <Label htmlFor={`text-answer-${currentQuestion.id}`}>Your Answer</Label>
                                <Textarea
                                    id={`text-answer-${currentQuestion.id}`}
                                    placeholder="Type your answer here..."
                                    value={textAnswers[currentQuestion.id] || ''}
                                    onChange={(e) => handleTextAnswerChange(currentQuestion.id, e.target.value)}
                                    className="min-h-[120px]"
                                    required
                                />
                                {!textAnswers[currentQuestion.id]?.trim() && (
                                    <p className="text-sm text-amber-600">
                                        Please provide an answer to this question
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col sm:flex-row gap-4">
                    <div className="flex gap-2 flex-1">
                        <Button
                            variant="outline"
                            onClick={() => navigateQuestion('prev')}
                            disabled={currentIndex === 0}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => navigateQuestion('next')}
                            disabled={currentIndex === data.length - 1}
                        >
                            Next
                        </Button>
                    </div>

                    <Button
                        onClick={submitTest}
                        className="gap-2"
                        disabled={!allAnswered || submitted}
                    >
                        <Send className="w-4 h-4" />
                        {submitted ? 'Submitted' : 'Submit Test'}
                    </Button>
                </CardFooter>
            </Card>

            {/* Question Navigation with Answer Status */}
            <Card>
                <CardHeader>
                    <CardTitle>Question Navigation</CardTitle>
                    <CardDescription>
                        {allAnswered ? 'All questions answered ✓' : 'Click on a question to jump to it'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                        {data.map((item, index) => {
                            const isTest = item.options && item.options.length > 0;
                            const isAnswered = isTest
                                ? answers[item.id] !== undefined
                                : textAnswers[item.id]?.trim() !== '';

                            return (
                                <Button
                                    key={item.id}
                                    variant={currentIndex === index ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setCurrentIndex(index)}
                                    className={`aspect-square ${isAnswered
                                        ? 'bg-green-100 hover:bg-green-200 text-green-800 border-green-300'
                                        : 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200'
                                        }`}
                                >
                                    {index + 1}
                                    {isAnswered && (
                                        <CheckCircle className="absolute -top-1 -right-1 w-3 h-3 text-green-600" />
                                    )}
                                </Button>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}