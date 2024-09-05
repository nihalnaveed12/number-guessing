"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NumberGuess() {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false);
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [userGuess, setUserGuess] = useState<number | string>("");
  const [attempts, setAttempts] = useState<number>(0);
  const [difficultyMode, setDifficultyMode] = useState<string>("");
  const [maxAttempt, setMaxAttempt] = useState<number>(0);
  const [selectAlert, setSelectAlert] = useState<string>("");

  // Start the game and generate the target number
  useEffect(() => {
    if (gameStarted && !paused) {
      const randomNumber = Math.floor(Math.random() * 10) + 1;
      setTargetNumber(randomNumber);
    }
  }, [gameStarted, paused]);

  const startGame = (): void => {
    if (difficultyMode === "") {
      setSelectAlert("Please Select Difficulty Mode");
      return; // Stop the function execution if no difficulty is selected
    }
    setGameStarted(true);
    setPaused(false);
    setGameOver(false);
    setAttempts(0);
    setSelectAlert("");
    setUserGuess("");

    switch (difficultyMode) {
      case "easy":
        setMaxAttempt(10);
        break;
      case "medium":
        setMaxAttempt(6);
        break;
      case "hard":
        setMaxAttempt(3);
        break;
      default:
        setMaxAttempt(10);
    }
  };

  const pauseGame = (): void => {
    setPaused(true);
  };

  const resumeGame = (): void => {
    setPaused(false);
  };

  const GameResult = (): void => {
    const parsedUserGuess = Number(userGuess);

    if (!isNaN(parsedUserGuess) && parsedUserGuess === targetNumber) {
      setGameOver(true);
    } else {
      setAttempts((prevAttempts) => prevAttempts + 1);
    }

    if (attempts + 1 >= maxAttempt) {
      setGameOver(true); // Game over after max attempts
    }
  };

  const tryAgain = (): void => {
    setGameStarted(false);
    setGameOver(false);
    setUserGuess("");
    setAttempts(0);
    setDifficultyMode("");
    setSelectAlert("");
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setUserGuess(parseInt(e.target.value));
  };

  const onDifficultyChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDifficultyMode(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-800 to-black">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md h-30">
        <h1 className="text-3xl font-bold text-center mb-2 text-black">
          Number Guessing Game
        </h1>
        <p className="text-center text-black mb-4">
          Try to guess the number between 1 and 10!
        </p>

        {!gameStarted && (
          <div className="flex justify-center mb-4 flex-col">
            <div className="mb-4">
              <label className="block text-black text-center mb-2">
                Select Difficulty:
              </label>
              <div className="flex justify-center space-x-4">
                <label className="text-black">
                  <input
                    type="radio"
                    name="difficultyMode"
                    value="easy"
                    onChange={onDifficultyChange}
                  />{" "}
                  Easy (10 attempts)
                </label>
                <label className="text-black">
                  <input
                    type="radio"
                    name="difficultyMode"
                    value="medium"
                    onChange={onDifficultyChange}
                  />{" "}
                  Medium (6 attempts)
                </label>
                <label className="text-black">
                  <input
                    type="radio"
                    name="difficultyMode"
                    value="hard"
                    onChange={onDifficultyChange}
                  />{" "}
                  Hard (3 attempts)
                </label>
              </div>
            </div>
            {selectAlert && (
              <p className="text-center text-red-600">{selectAlert}</p>
            )}
            <Button
              onClick={startGame}
              className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Start Game
            </Button>
          </div>
        )}
        {gameStarted && !gameOver && (
          <div>
            <div className="flex justify-center mb-4">
              {paused ? (
                <Button
                  onClick={resumeGame}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  Resume
                </Button>
              ) : (
                <Button
                  onClick={pauseGame}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  Pause
                </Button>
              )}
            </div>
            <div className="flex justify-center mb-4">
              <Input
                type="number"
                value={userGuess}
                onChange={onInputChange}
                className="bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 w-full max-w-xs text-black"
                placeholder="Enter your guess"
              />
              <Button
                onClick={GameResult}
                className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded ml-4"
              >
                Guess
              </Button>
            </div>
            <div className="text-center text-black">
              <p>Attempts: {attempts}</p>
              <p>Max Attempts: {maxAttempt}</p>
            </div>
          </div>
        )}
        {gameOver && (
          <div>
            <div className="text-center mb-4 text-black">
              <h2 className="text-2xl font-bold">Game Over!</h2>
              {attempts >= maxAttempt ? (
                <p>
                  You've used all your {maxAttempt} attempts. The number was{" "}
                  {targetNumber}.
                </p>
              ) : (
                <p>You guessed the number in {attempts} attempts!</p>
              )}
            </div>
            <div className="flex justify-center">
              <Button
                onClick={tryAgain}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Try Again
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
