import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { categories } from '../expense.constant';

const schema = z.object({
  description: z
    .string()
    .min(3, {
      message: 'Description must be at least 3 characters.',
    })
    .max(50),
  amount: z
    .number({
      invalid_type_error: 'Amount is required.',
    })
    .min(0.01)
    .max(100_000),
  category: z.enum(categories, {
    errorMap: () => ({
      message: 'Category is required.',
    }),
  }),
});

export type ExpenseFormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: ExpenseFormData) => void;
}

const ExpenseForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(schema),
  });

  return (
    <form
      onSubmit={handleSubmit(data => {
        onSubmit(data);
        reset();
      })}
    >
      <div className='mb-3'>
        <label htmlFor='description' className='form-lable'>
          Description
        </label>
        <input
          id='description'
          type='text'
          className='form-control'
          {...register('description')}
        />
        {errors.description && (
          <div className='text-danger'>{errors.description.message}</div>
        )}
      </div>
      <div className='mb-3'>
        <label htmlFor='amount' className='form-lable'>
          Amount
        </label>
        <input
          id='amount'
          type='number'
          className='form-control'
          {...register('amount', {
            valueAsNumber: true,
          })}
        />
        {errors.amount && (
          <div className='text-danger'>{errors.amount.message}</div>
        )}
      </div>
      <div className='mb-3'>
        <label htmlFor='description' className='form-lable'>
          Category
        </label>
        <select id='category' className='form-select' {...register('category')}>
          <option value=''>Select a category</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <div className='text-danger'>{errors.category.message}</div>
        )}
      </div>
      <button className='btn btn-primary'>Submit</button>
    </form>
  );
};

export default ExpenseForm;
