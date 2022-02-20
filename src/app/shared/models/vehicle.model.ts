export interface IVehicle {
  id: number;
  type: string;
  brand: string;
  colors: string[];
  img: string;
}

export type SelectedVehicle = IVehicle & { color: string };
