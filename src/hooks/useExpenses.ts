import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { CanceledError, AxiosError } from '../services/api-client';
import expenseService, { Expense } from '../services/expense-service';

const useExpenses = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = expenseService.getAll<Expense>();
    request
      .then(req => {
        setExpenses(req.data);
        setLoading(false);
      })
      .catch(error => {
        if (error instanceof CanceledError) {
          console.log('Request canceled', error.message);
        } else {
          toast.error((error as AxiosError).message);
        }
        setLoading(false);
      });

    return () => {
      cancel();
    };
  }, []);

  return {
    loading,
    expenses,
    setExpenses,
    selectedCategory,
    setSelectedCategory,
  };
};

export default useExpenses;
