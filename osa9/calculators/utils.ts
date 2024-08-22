// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNotNumber = (arg: any) => {
  return isNaN(Number(arg));
};
