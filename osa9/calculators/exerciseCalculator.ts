interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  target: number;
  average: number;
}

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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
