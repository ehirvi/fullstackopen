import { isNotNumber } from "./utils";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ParsedList {
  dailyExerciseHours: number[];
  targetAmount: number;
}

const parseArguments = (args: string[]): ParsedList => {
  if (args.length < 4) {
    throw new Error("Not enough arguments");
  }

  const parsedArgs = args.slice(2).map((a) => Number(a));

  for (const arg of parsedArgs) {
    if (isNotNumber(arg)) {
      throw new Error("Provided values were not numbers");
    }
  }
  return {
    dailyExerciseHours: parsedArgs.slice(1),
    targetAmount: parsedArgs[0],
  };
};

const calculateExercises = (
  dailyExerciseHours: number[],
  targetAmount: number
): Result => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((d) => d !== 0).length;
  const average =
    dailyExerciseHours.reduce((sum, day) => sum + day) / periodLength;
  const success = average >= targetAmount ? true : false;
  const percentageOfSuccess = average / targetAmount;
  const rating =
    percentageOfSuccess > 0.75 ? (percentageOfSuccess >= 1 ? 3 : 2) : 1;
  const ratingDescription =
    rating === 1
      ? "you are way off your target"
      : rating === 2
      ? "not too bad but could be better"
      : "well done";

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetAmount,
    average,
  };
};

if (require.main === module) {
  try {
    const { dailyExerciseHours, targetAmount } = parseArguments(process.argv);
    console.log(calculateExercises(dailyExerciseHours, targetAmount));
  } catch (error: unknown) {
    let errorMessage = "An error has occured:";
    if (error instanceof Error) {
      errorMessage += ` ${error.message}`;
    }
    console.log(errorMessage);
  }
}

export default { calculateExercises };
