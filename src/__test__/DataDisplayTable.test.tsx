import { render } from '@testing-library/react';
import DataDisplayTable from '../components/DataDisplayTable';

interface RowData {
    text: string;
    url: string;
  }
  
//   interface DataDisplayTableProps {
//     data: RowData[];
//   }
  
describe('DataDisplayTable', () => {
  test('renders table with data', () => {
    const data: RowData[] = [
      { text: 'Example Text 1', url: 'https://example.com/1' },
      { text: 'Example Text 2', url: 'https://example.com/2' }
    ];

    const { getByText } = render(<DataDisplayTable data={data} />);
    
    expect(getByText('Example Text 1')).toBeInTheDocument();
    expect(getByText('https://example.com/1')).toBeInTheDocument();
    expect(getByText('Example Text 2')).toBeInTheDocument();
    expect(getByText('https://example.com/2')).toBeInTheDocument();
  });

  test('renders "No data" message when no data is provided', () => {
    const { getByText } = render(<DataDisplayTable data={[]} />);
    
    expect(getByText('No data')).toBeInTheDocument();
  });

  test('renders "No data" message when null data is provided', () => {
    const { getByText } = render(<DataDisplayTable data={null as any} />);
    
    expect(getByText('No data')).toBeInTheDocument();
  });

  test('renders "No data" message when undefined data is provided', () => {
    const { getByText } = render(<DataDisplayTable data={undefined as any} />);
    
    expect(getByText('No data')).toBeInTheDocument();
  });
});
