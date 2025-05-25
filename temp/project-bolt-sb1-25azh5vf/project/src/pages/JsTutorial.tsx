import React, { useState } from "react";
import CodeBlock from "../components/CodeBlock";
import ProgressTracker from "../components/ProgressTracker";

const JsTutorial: React.FC = () => {
  const steps = [
    "Introduction to JavaScript",
    "Variables and Data Types",
    "Functions and Scope",
    "Arrays and Objects",
    "DOM Manipulation",
    "Events and Event Handling",
    "Asynchronous JavaScript",
  ];

  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="py-8">
      <h1 className="text-center mb-8">JavaScript Tutorial</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <ProgressTracker
            steps={steps}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
          />
        </div>

        <div className="md:col-span-3">
          <div className="glass p-8">
            <div className="flex justify-between mt-12">
              <button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                className={`btn ${
                  currentStep === 0
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }`}
                disabled={currentStep === 0}
              >
                Previous
              </button>

              <button
                onClick={() =>
                  setCurrentStep(Math.min(steps.length - 1, currentStep + 1))
                }
                className={`btn ${
                  currentStep === steps.length - 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "btn-primary"
                }`}
                disabled={currentStep === steps.length - 1}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JsTutorial;
