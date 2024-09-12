export enum Weather {
  Sunny = "Sunny",
  Rainy = "Rainy",
  Cloudy = "Cloudy",
  Stormy = "Stormy",
  Windy = "Windy",
}

export enum Visibility {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
}

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
}
