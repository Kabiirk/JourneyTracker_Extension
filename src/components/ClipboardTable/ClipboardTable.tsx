import { Stack } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IJourney } from '../../background/background';

interface ClipboardTableProps {
  selectedJourney: IJourney;
}

export default function ClipboardTable({
  selectedJourney
}: ClipboardTableProps) {
  return (
    <Stack>
      <TableContainer component={Paper}>
        <Table sx={{}} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Text</TableCell>
              <TableCell align='right'>URL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedJourney &&
            selectedJourney.recordedTexts &&
            selectedJourney.recordedTexts.length > 0 ? (
              selectedJourney.recordedTexts.map(row => (
                <TableRow
                  key={row.text}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell
                    component='th'
                    scope='row'
                    style={{
                      maxWidth: 100,
                      wordWrap: 'break-word',
                      textWrap: 'wrap'
                    }}
                  >
                    {row.text}
                  </TableCell>
                  <TableCell
                    align='right'
                    style={{
                      maxWidth: 100,
                      textWrap: 'wrap',

                      wordWrap: 'break-word'
                    }}
                  >
                    <a href={row.url} target='_blank'>
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
}
