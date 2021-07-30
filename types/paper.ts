export type IPaperForm = {
  timestamp?: Date;
  a4: number;
  a5: number;
  a6: number;
  collegeblock: number;
  zeichenmappe: number;
};

export type PaperType = 'a4' | 'a5' | 'a6' | 'collegeblock' | 'zeichenmappe';

export type PaperDescription = {
  type: 'a4' | 'a5' | 'a6' | 'collegeblock' | 'zeichenmappe';
  title: string;
  thgpkm: number;
};
