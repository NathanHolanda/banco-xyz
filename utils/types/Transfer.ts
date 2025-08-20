type Transfer = {
  userId: number;
  currency: string;
  value: number;
  date: string;
  payee: {
    document: string;
    name: string;
  };
};

export default Transfer;
