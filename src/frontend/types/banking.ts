export type Bank = {
  id: number;
  accountHolderName: string;
  accountNumber: string;
  iban: string;
  country: string;
  city: string;
  state: string;
  postCode: number;
  firstLine: string | null;
  primary: boolean;
  user: number;
};
