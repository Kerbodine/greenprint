import { Radio, RadioGroup, Slider } from "@mantine/core";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  BiArrowToLeft,
  BiArrowToRight,
  BiCar,
  BiPaperPlane,
  BiPlug,
  BiTrash,
} from "react-icons/bi";
import { getFirestore, doc, setDoc, updateDoc } from "firebase/firestore";
import { nanoid } from "nanoid";
import { useAuth } from "../contexts/AuthContext";
import Loader from "../components/Loader";
import Link from "next/link";

const baseQuestions = [
  {
    question:
      "What percentage of your home's electricity comes from renewable sources?",
    marks: [
      { value: -1, label: "0%", text: "0-20%" },
      {
        value: 20,
        label: "20%",
        text: "20-40%",
      },
      {
        value: 40,
        label: "40%",
        text: "40-60%",
      },
      {
        value: 60,
        label: "60%",
        text: "60-80%",
      },
      {
        value: 80,
        label: "80%",
        text: "80%-100%",
      },
      {
        value: 100,
        label: "100%",
        text: "100%",
      },
    ],
    step: 1,
    defaultValue: 0,
    max: 100,
    suffix: "%",
    type: "slider",
  },
  {
    question: "How much electricity do you think you use?",
    marks: [
      { value: -1, label: "0 kWh", text: "I use no electricity" },
      {
        value: 1200,
        label: "1,200 kWh",
        text: "Average electricity consumption of per Chinese household (~ 1,200 kWh)",
      },
      {
        value: 3500,
        label: "3,500 kWh",
        text: "Global average electricity consumption per household (~ 3,500 kWh)",
      },
      {
        value: 4600,
        label: "4,600 kWh",
        text: "Average electricity consumption per English household (~ 4,600 kWh)",
      },
      {
        value: 10000,
        label: "10,000 kWh",
        text: "Average electricity consumption of per American household (~ 10,715 kWh)",
      },
      {
        value: 14000,
        label: "14,000",
        text: "I use a lot of electricity (>14,000)",
      },
    ],
    step: 100,
    defaultValue: 3500,
    max: 16000,
    suffix: "kWh",
    type: "slider",
  },
  {
    question:
      "How much waste do you think you produce compared to your neighbours?",
    marks: [
      { value: -1, label: "0 kWh", text: "I produce little waste" },
      {
        value: 0.27,
        label: "0.27t",
        text: "Global average waste per household (~0.27t)",
      },
      {
        value: 0.4,
        label: "0.40t",
        text: "Average waste per English household (~0.4t)",
      },
      {
        value: 0.74,
        label: "0.74t",
        text: "Average waste per American household (~0.7t)",
      },
      {
        value: 1,
        label: "1t",
        text: "I produce a lot of waste (> 1t)",
      },
    ],
    step: 0.01,
    defaultValue: 0.27,
    max: 1.5,
    suffix: "t",
    type: "slider",
  },
  {
    question: "How many hours do you fly a year?",
    marks: [
      { value: -1, label: "0 hours", text: "0+ hours" },
      {
        value: 5,
        label: "5 Hours",
        text: "5+ hours",
      },
      {
        value: 10,
        label: "10 hours",
        text: "10+ hours",
      },
      {
        value: 15,
        label: "15 hours",
        text: "15+ hours",
      },
      {
        value: 20,
        label: "20 hours",
        text: "20+ hours",
      },
      {
        value: 25,
        label: "25 hours",
        text: "25+ hours",
      },
    ],
    step: 1,
    defaultValue: 0,
    max: 30,
    suffix: "hours",
    type: "slider",
  },
  {
    question: "What type of fuel does your car use?",
    suffix: "",
    type: "dropdown",
    options: ["Gasoline", "Diesel", "Electricity", "I don't own a car"],
  },
  {
    question: "How big is your car?",
    suffix: "",
    type: "dropdown",
    options: ["Small", "Medium", "Large", "I don't own a car"],
  },
  {
    question: "How far do you travel by car each week?",
    marks: [
      { value: -1, label: "0 hours", text: "0+ hours" },
      {
        value: 0,
        label: "0 km",
        text: "0+ km",
      },
      {
        value: 200,
        label: "200 km",
        text: "200+ km",
      },
      {
        value: 400,
        label: "400 km",
        text: "400+ km",
      },
      {
        value: 600,
        label: "600 km",
        text: "600+ km",
      },
      {
        value: 800,
        label: "800 km",
        text: "800+ km",
      },
    ],
    step: 1,
    defaultValue: 0,
    max: 801,
    suffix: " km",
    type: "slider",
  },
  {
    question: "How often do you use public transport?",
    type: "dropdown",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
  },
];

export default function Quiz() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState(baseQuestions);
  const [quizStart, setQuizStart] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState(3);
  const [quizData, setQuizData] = useState({});
  const [quizComplete, setQuizComplete] = useState(false);

  const { user } = useAuth();

  const calcScore = (co2) => {
    return 100 - Math.round((co2 / 6154.368792) * 100);
  };

  const submitFormHandler = async () => {
    questions.forEach((q) => console.log(typeof q.answer));
    const answers = questions.map((q) => q.answer);
    setLoading(true);
    const response = await fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ answers }),
    });
    const data = await response.json();
    console.log(data);
    const id = nanoid();
    await setDoc(doc(getFirestore(), "Users", user.uid, "Quizzes", id), {
      id,
      data,
      answers: answers,
      createdAt: new Date(),
    });
    await updateDoc(doc(getFirestore(), "Users", user.uid), {
      score: data.co2,
      percent: calcScore(data.co2),
    });
    setQuizData(data);
    setQuizComplete(true);
    console.log(data);
    setLoading(false);
  };

  useEffect(() => {
    if (questions[currentQuestion].answer) {
      setCurrentAnswer(questions[currentQuestion].answer);
    } else {
      setCurrentAnswer(questions[currentQuestion].defaultValue);
    }
  }, [currentQuestion]);

  console.log(currentAnswer);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {quizComplete ? (
            <div className="flex h-full w-full flex-col items-center justify-center">
              <div className="flex flex-col items-center rounded-2xl border-2 border-gray-200 p-8 shadow-lg">
                <h1 className="text-2xl font-bold tracking-tight text-accent">
                  Quiz Completed!
                </h1>
                <p className="mb-4 text-xl font-semibold text-gray-500">
                  Your Results:
                </p>
                <p className="text-5xl font-bold tracking-tight text-gray-500">
                  {Math.round(quizData.co2 * 100) / 100}
                  <span className="text-2xl"> kg</span>
                </p>
                <p className="-mt-1 text-xl font-bold text-gray-400">
                  CO2 Emissions
                </p>
                <p className="mt-4 text-5xl font-bold tracking-tight text-gray-500">
                  {calcScore(quizData.co2)}%
                </p>
                <p className="-mt-1 text-xl font-bold text-gray-400">
                  Percentage Score
                </p>
                <div className="mt-4 space-y-2 text-gray-700">
                  <p className="flex gap-1">
                    <BiPlug className="text-2xl text-accent" />
                    Energy:{" "}
                    <span className="font-semibold">
                      {Math.round(
                        (quizData.co2Array[0] + quizData.co2Array[1]) * 100
                      ) / 100}{" "}
                      kg
                    </span>
                  </p>
                  <p className="flex gap-1">
                    <BiTrash className="text-2xl text-accent" />
                    Waste:{" "}
                    <span className="font-semibold">
                      {Math.round(quizData.co2Array[2] * 100) / 100} kg
                    </span>
                  </p>
                  <p className="flex gap-1">
                    <BiPaperPlane className="text-2xl text-accent" />
                    Flight:{" "}
                    <span className="font-semibold">
                      {Math.round(quizData.co2Array[3] * 100) / 100} kg
                    </span>
                  </p>
                  <p className="flex gap-1">
                    <BiCar className="text-2xl text-accent" />
                    Driving:{" "}
                    <span className="font-semibold">
                      {Math.round(quizData.co2Array[4] * 100) / 100} kg
                    </span>
                  </p>
                </div>
                <Link href="/dashboard">
                  <button className="mt-8 rounded-lg border-2 border-accent px-3 py-1 font-medium text-accent transition-colors hover:bg-accent hover:text-white">
                    To dashboard
                  </button>
                </Link>
              </div>
            </div>
          ) : quizStart ? (
            <div className="flex h-full flex-col">
              <div className="mb-8 flex h-2 w-full gap-2">
                {questions.map((item, index) => (
                  <div
                    onClick={() => {
                      if (questions[index].answer) {
                        setCurrentQuestion(index);
                      }
                    }}
                    key={index}
                    className={`${
                      currentQuestion === index ? "!bg-accent" : "bg-gray-200"
                    } ${
                      item.edited && "bg-accent/50"
                    } w-full rounded-full transition-transform hover:scale-y-[1.5]`}
                  ></div>
                ))}
              </div>
              <div className="relative mb-8 aspect-video w-full">
                <Image src={`/quiz${currentQuestion + 1}.svg`} layout="fill" />
              </div>
              <h1 className="mt-auto text-2xl font-bold leading-6 tracking-tight">
                {currentQuestion + 1}: {questions[currentQuestion].question}
              </h1>
              {questions[currentQuestion].type === "slider" ? (
                <Slider
                  key={currentQuestion}
                  className="mt-8 mb-4"
                  label={(val) =>
                    questions[currentQuestion].marks
                      .filter((mark) => mark.value < val)
                      .at(-1).text
                  }
                  value={currentAnswer}
                  marks={questions[currentQuestion].marks}
                  step={questions[currentQuestion].step}
                  min={0}
                  max={questions[currentQuestion].max}
                  styles={() => ({
                    markLabel: { display: "none" },
                    bar: {
                      backgroundColor: "#059669",
                    },
                    thumb: {
                      border: "2px solid #059669",
                    },
                    markFilled: {
                      border: "2px solid #059669",
                    },
                  })}
                  onChange={(val) => {
                    setCurrentAnswer(val);
                  }}
                  onChangeEnd={(val) => {
                    const updated = [...questions];
                    updated[currentQuestion].answer = val;
                    updated[currentQuestion].edited = true;
                    setQuestions(updated);
                  }}
                />
              ) : (
                <div className="ml-2 mt-4 mb-4 flex flex-col gap-2">
                  <RadioGroup
                    key={currentQuestion}
                    value={currentAnswer}
                    onChange={(val) => {
                      const updated = [...questions];
                      updated[currentQuestion].answer = val;
                      updated[currentQuestion].edited = true;
                      setCurrentAnswer(val);
                    }}
                  >
                    {questions[currentQuestion].options.map((item, index) => (
                      <Radio key={index} value={item} label={item} />
                    ))}
                  </RadioGroup>
                </div>
              )}
              <span className="mb-8 rounded-lg bg-gray-100 px-3 py-1.5 text-gray-500">
                Your Answer:{" "}
                <span className="font-semibold text-gray-700">
                  {questions[currentQuestion].type === "slider"
                    ? Math.round(currentAnswer * 100) / 100
                    : currentAnswer}
                </span>{" "}
                {questions[currentQuestion].suffix}
              </span>
              <div className="mt-auto flex">
                {currentQuestion > 0 && (
                  <button
                    onClick={() => setCurrentQuestion((prev) => prev - 1)}
                    className="flex items-center gap-2 rounded-lg border-2 border-gray-200 px-3 py-1.5 font-medium text-gray-500 transition-colors hover:bg-gray-100"
                  >
                    <BiArrowToLeft className="text-2xl" /> Previous
                  </button>
                )}
                {currentQuestion < questions.length - 1 && (
                  <button
                    onClick={() => {
                      setCurrentQuestion((prev) => prev + 1);
                    }}
                    {...((currentAnswer === undefined ||
                      !questions[currentQuestion].edited) && {
                      disabled: true,
                    })}
                    className="ml-auto flex items-center gap-2 rounded-lg border-2 border-accent px-3 py-1.5 font-medium text-accent transition-colors hover:bg-accent hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next <BiArrowToRight className="text-2xl" />
                  </button>
                )}
                {currentQuestion === questions.length - 1 && (
                  <button
                    {...((currentAnswer === undefined ||
                      !questions[currentQuestion].edited) && {
                      disabled: true,
                    })}
                    onClick={submitFormHandler}
                    className="ml-auto flex items-center gap-2 rounded-lg border-2 border-accent px-3 py-1.5 font-medium text-accent transition-colors hover:bg-accent hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold tracking-tight">
                Carbon Footprint Quiz
              </h1>
              <Image
                src="/quiz.svg"
                className="aspect-video w-full"
                width={400}
                height={400}
              />
              <button
                onClick={() => {
                  setQuizStart(true);
                  setQuestions(baseQuestions);
                }}
                className="mt-4 block rounded-lg border-2 border-accent px-4 py-1.5 font-medium text-accent transition-colors hover:bg-accent hover:text-white"
              >
                Start
              </button>
            </>
          )}
        </>
      )}
    </>
  );
}
