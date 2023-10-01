import create from './http-service';

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
}

export default create('/expenses');
