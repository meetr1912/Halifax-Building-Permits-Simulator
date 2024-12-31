'use client'

import React, { useState, useEffect } from 'react';
import { questions } from './data/questions';
import { determinePermits } from './utils/determinePermits';
import { Question, PermitResult, Answers } from './types/permit-finder';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CalendarCheck } from 'lucide-react'

export default function PermitFinder() {
  const [answers, setAnswers] = useState<Answers>({});
  const [result, setResult] = useState<PermitResult | null>(null);
  const [currentQuestionId, setCurrentQuestionId] = useState('start');

  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      setResult(determinePermits(answers));
    }
  }, [answers]);

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => {
      const newAnswers = { ...prev, [questionId]: answer };
      
      // Remove answers to subsequent questions
      const questionIds = Object.keys(questions);
      const currentIndex = questionIds.indexOf(questionId);
      questionIds.slice(currentIndex + 1).forEach(id => {
        if (newAnswers[id]) {
          delete newAnswers[id];
        }
      });

      return newAnswers;
    });

    const nextQuestionId = questions[questionId].nextQuestion[answer];
    if (nextQuestionId) {
      setCurrentQuestionId(nextQuestionId);
    }
  };

  const renderQuestion = (questionId: string) => {
    const question = questions[questionId];
    return (
      <div key={questionId} className="mb-4">
        <Label htmlFor={questionId} className="mb-2 block">
          {question.text}
        </Label>
        <Select onValueChange={(value) => handleAnswer(questionId, value)} value={answers[questionId] || ''}>
          <SelectTrigger id={questionId}>
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            {question.options.map((option, index) => (
              <SelectItem key={index} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  };

  const renderQuestions = () => {
    const questionIds = [];
    let currentId = 'start';
    while (currentId) {
      questionIds.push(currentId);
      if (answers[currentId]) {
        currentId = questions[currentId].nextQuestion[answers[currentId]] || null;
      } else {
        break;
      }
    }
    return questionIds.map(renderQuestion);
  };

  const handleBookAppointment = () => {
    // In a real implementation, this would open the Calendly widget or navigate to a booking page
    alert("This would open the appointment booking system.");
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <Card className="w-full md:w-1/2">
        <CardHeader>
          <CardTitle>Halifax Permit Finder</CardTitle>
          <CardDescription>Answer the questions to find out which permits you need.</CardDescription>
        </CardHeader>
        <CardContent>
          {renderQuestions()}
        </CardContent>
      </Card>
      
      {result && (
        <Card className="w-full md:w-1/2">
          <CardHeader>
            <CardTitle>Permit Results</CardTitle>
            <CardDescription>Based on your answers, here are the permits you may need:</CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-semibold mb-2">Required Permits:</h3>
            {result.permits.length > 0 ? (
              <ul className="list-disc pl-5 mb-4">
                {result.permits.map((permit, index) => (
                  <li key={index}>{permit}</li>
                ))}
              </ul>
            ) : (
              <p>No permits are required based on the information provided.</p>
            )}
            <h3 className="text-lg font-semibold mb-2">Additional Information:</h3>
            <ul className="list-disc pl-5 mb-4">
              {result.additionalInfo.map((info, index) => (
                <li key={index}>{info}</li>
              ))}
            </ul>
            <Button onClick={handleBookAppointment} className="w-full">
              <CalendarCheck className="mr-2 h-4 w-4" /> Book an Appointment
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
