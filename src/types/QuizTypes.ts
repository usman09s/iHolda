export type Quiz = {
  timeLimitInSeconds: number;
  totalScore: number;
  _id: string;
  title: string;
  questions: Question[];
  createdAt: string;
  __v: number;
};

export type Question = {
  questionText: string;
  options: Option[];
  _id: string;
};

export type Option = {
  optionText: string;
  isCorrect: boolean;
  _id: string;
};

export type SelectedQA = { question: string; selectedOption: string; isCorrect: boolean};