import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import ExpenseList from './expense-tracker/components/ExpenseList';
import ExpenseFilter from './expense-tracker/components/ExpenseFilter';
import ExpenseForm, {
  ExpenseFormData,
} from './expense-tracker/components/ExpenseForm';
import { AxiosError } from './services/api-client';
import expenseService, { Expense } from './services/expense-service';
import useExpenses from './hooks/useExpenses';

function App() {
  const {
    expenses,
    setExpenses,
    loading,
    selectedCategory,
    setSelectedCategory,
  } = useExpenses();

  const visibleExpenses = selectedCategory
    ? expenses.filter(expense => expense.category === selectedCategory)
    : expenses;

  const handleDelete = async (id: string) => {
    const newExpenses = expenses.filter(expense => expense.id !== id);

    try {
      await expenseService.delete(id);
      setExpenses(newExpenses);
      toast.success('Expense deleted');
    } catch (error) {
      toast.error((error as AxiosError).message);
    }
  };

  const handleSubmit = async (data: ExpenseFormData) => {
    const newExpense = {
      id: uuidv4(),
      ...data,
    };

    try {
      await expenseService.create<Expense>(newExpense);
      setExpenses([...expenses, newExpense]);
      toast.success('Expense added');
    } catch (error) {
      toast.error((error as AxiosError).message);
    }
  };

  return (
    <div className='container mx-auto mx-w-2'>
      <h1 className='text-center my-5'>Expense Tracker</h1>
      <div className='my-5'>
        <ExpenseForm onSubmit={handleSubmit} />
      </div>

      <div className='mb-3'>
        <ExpenseFilter
          onSelectCategory={category => setSelectedCategory(category)}
        />
      </div>

      <hr />

      {loading ? (
        <div className='spinner-border'></div>
      ) : (
        <ExpenseList expenses={visibleExpenses} onDelete={handleDelete} />
      )}
    </div>
  );
}

export default App;
