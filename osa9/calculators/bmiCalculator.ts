import { isNotNumber } from "./utils";

interface ParsedList {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): ParsedList => {
  if (args.length < 4) {
    throw new Error("Not enough arguments");
  }
  if (args.length > 4) {
    throw new Error("Too many arguments");
  }

  if (isNotNumber(args[2]) || isNotNumber(args[3])) {
    throw new Error("Provided values were not numbers");
  }
  return {
    height: Number(args[2]),
    weight: Number(args[3]),
  };
};

const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi < 25) {
    return "Normal range";
  } else if (bmi < 30) {
    return "Overweight";
  } else {
    return "Obese";
  }
};

if (require.main === module) {
  try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = "An error has occured:";
    if (error instanceof Error) {
      errorMessage += ` ${error.message}`;
    }
    console.log(errorMessage);
  }
}

export default { calculateBmi };
