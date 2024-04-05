import { fireEvent, render } from '@testing-library/react';
import Counter from '../components/CounterProps';

describe('Counter', () => {
  test('renders with initial value', () => {
    const initialValue = 5;
    const { getByText } = render(<Counter initialValue={initialValue} />);
    expect(getByText(initialValue.toString())).toBeInTheDocument();
  });

  test('increments count correctly', () => {
    const { getByText } = render(<Counter initialValue={0} />);
    fireEvent.click(getByText('+'));
    expect(getByText('1')).toBeInTheDocument();
  });

  test('decrements count correctly', () => {
    const { getByText } = render(<Counter initialValue={3} />);
    fireEvent.click(getByText('-'));
    expect(getByText('2')).toBeInTheDocument();
  });
});
