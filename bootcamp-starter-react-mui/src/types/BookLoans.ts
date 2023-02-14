export type BookLoans = {
  id: number;
  idBook: number;
  idUser: string | null;
  loaningDate: Date | null;
  returnLoaningDate: Date | null;
};
