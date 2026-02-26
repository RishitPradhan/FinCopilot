'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Question {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
}

interface QuizProps {
    questions: Question[];
    onComplete: (score: number) => void;
}

export function Quiz({ questions, onComplete }: QuizProps) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const handleSubmit = () => {
        if (selectedAnswer === null) return;

        if (selectedAnswer === questions[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }
        setIsSubmitted(true);
    };

    const handleNext = () => {
        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setIsSubmitted(false);
        } else {
            setIsFinished(true);
            onComplete(score + (selectedAnswer === questions[currentQuestion].correctAnswer ? 1 : 0));
        }
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setIsSubmitted(false);
        setScore(0);
        setIsFinished(false);
    };

    if (isFinished) {
        const percentage = Math.round((score / questions.length) * 100);
        return (
            <Card className="bg-card border-border text-white shadow-xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-6">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                cx="64"
                                cy="64"
                                r="58"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="transparent"
                                className="text-border"
                            />
                            <circle
                                cx="64"
                                cy="64"
                                r="58"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="transparent"
                                strokeDasharray={Math.PI * 116}
                                strokeDashoffset={Math.PI * 116 * (1 - percentage / 100)}
                                className="text-white transition-all duration-1000"
                            />
                        </svg>
                        <div className="absolute text-2xl font-bold font-mono">{percentage}%</div>
                    </div>
                    <div className="text-center">
                        <p className="text-gray-400">You scored {score} out of {questions.length} questions correctly.</p>
                        <p className="mt-2 text-white font-bold italic">
                            {percentage >= 80 ? 'Excellent! You have mastered this module.' : 'Good effort! Review the content and try again for a perfect score.'}
                        </p>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center space-x-4">
                    <Button onClick={resetQuiz} variant="outline" className="border-border hover:bg-secondary">
                        <RotateCcw className="mr-2 h-4 w-4" /> Try Again
                    </Button>
                    <Button className="bg-white text-black hover:bg-gray-200 font-bold">
                        Continue to Next Module
                    </Button>
                </CardFooter>
            </Card>
        );
    }

    const question = questions[currentQuestion];

    return (
        <Card className="bg-card border-border text-white shadow-xl">
            <CardHeader>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Question {currentQuestion + 1} of {questions.length}</span>
                    <div className="h-1.5 w-32 bg-secondary rounded-full overflow-hidden">
                        <div
                            className="h-full bg-white transition-all duration-300"
                            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                        />
                    </div>
                </div>
                <CardTitle className="text-xl">{question.question}</CardTitle>
            </CardHeader>
            <CardContent>
                <RadioGroup value={selectedAnswer?.toString()} onValueChange={(v) => !isSubmitted && setSelectedAnswer(parseInt(v))}>
                    <div className="space-y-3">
                        {question.options.map((option, index) => {
                            const isCorrect = isSubmitted && index === question.correctAnswer;
                            const isWrong = isSubmitted && selectedAnswer === index && index !== question.correctAnswer;

                            return (
                                <div
                                    key={index}
                                    className={cn(
                                        "flex items-center space-x-3 p-4 rounded-xl border transition-all",
                                        isCorrect ? "bg-white/10 border-white" :
                                            isWrong ? "bg-white/5 border-gray-700" :
                                                selectedAnswer === index ? "bg-secondary border-white" : "bg-black border-border hover:bg-secondary"
                                    )}
                                >
                                    <RadioGroupItem value={index.toString()} id={`q${index}`} className="hidden" />
                                    <Label
                                        htmlFor={`q${index}`}
                                        className="flex-1 cursor-pointer flex justify-between items-center"
                                    >
                                        <span className="text-sm">{option}</span>
                                        {isCorrect && <CheckCircle2 className="h-5 w-5 text-white" />}
                                        {isWrong && <XCircle className="h-5 w-5 text-gray-500" />}
                                    </Label>
                                </div>
                            );
                        })}
                    </div>
                </RadioGroup>
            </CardContent>
            <CardFooter className="justify-end space-x-4">
                {!isSubmitted ? (
                    <Button
                        onClick={handleSubmit}
                        disabled={selectedAnswer === null}
                        className="bg-white text-black hover:bg-gray-200 font-bold"
                    >
                        Submit Answer
                    </Button>
                ) : (
                    <Button
                        onClick={handleNext}
                        className="bg-white text-black hover:bg-gray-200 font-bold"
                    >
                        {currentQuestion + 1 === questions.length ? 'Finish Quiz' : 'Next Question'} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
