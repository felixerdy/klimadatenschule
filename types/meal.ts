export interface IMealForm {
  name: string;
  co2: number;
  count: number;
}

export type MealRecord = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  name: string;
  co2: number;
  count: number;
};
