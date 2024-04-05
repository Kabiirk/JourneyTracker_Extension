import React from 'react';
import { Button } from '@mui/material';

interface CounterProps {
  initialValue: number;
}

const Counter: React.FC<CounterProps> = ({ initialValue }) => {
  const [count, setCount] = React.useState(initialValue);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <Button variant="contained" onClick={decrement}>-</Button>
      <span>{count}</span>
      <Button variant="contained" onClick={increment}>+</Button>
    </div>
  );
};

export default Counter;
