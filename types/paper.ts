export type IPaperForm = {
  timestamp?: Date;
  a4: number;
  a5: number;
  a6: number;
  collegeblock: number;
  zeichenmappe: number;
  a4_recycling: number;
  a5_recycling: number;
  a6_recycling: number;
  collegeblock_recycling: number;
  zeichenmappe_recycling: number;
};

export type PaperType = 'a4' | 'a5' | 'a6' | 'collegeblock' | 'zeichenmappe';
export type RecyclingType = '' | '_recycling';

export type PaperDescription = {
  type: `${PaperType}${RecyclingType}`;
  title: string;
  thgpst: number; // thg pro stück
};
