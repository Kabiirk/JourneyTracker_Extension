import { Stack } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

interface RowData {
  text: string;
  url: string;
}

interface DataDisplayTableProps {
  data: RowData[];
}

const DataDisplayTable: React.FC<DataDisplayTableProps> = ({ data }) => {
  return (
    <Stack>
      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Text</TableCell>
              <TableCell align='right'>URL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.length > 0 ? (
              data.map(row => (
                <TableRow key={row.text}>
                  <TableCell>{row.text}</TableCell>
                  <TableCell align='right'>
                    <a href={row.url} target='_blank' rel='noopener noreferrer'>
                      {row.url}
                    </a>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} align='center'>
                  No data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default DataDisplayTable;
