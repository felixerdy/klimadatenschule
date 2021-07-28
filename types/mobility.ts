export interface IMobilityForm {
  timestamp: Date;
  pkw: number;
  bahn: number;
  bus: number;
  ubahn: number;
  fahrrad: number;
  fuss: number;
}

export type MobilityRecord = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  pkw: number;
  bahn: number;
  bus: number;
  ubahn: number;
  fahrrad: number;
  fuss: number;
};

export type MobilityType =
  | 'pkw'
  | 'bahn'
  | 'bus'
  | 'ubahn'
  | 'fahrrad'
  | 'fuss';

export type MobilityDescription = {
  type: MobilityType;
  title: string;
  thgpkm: number;
};
