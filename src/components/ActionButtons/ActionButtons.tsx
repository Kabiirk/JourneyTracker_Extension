import { Button, Stack } from '@mui/material'

interface ActionButtonsProps {
  clearTable?: () => void
}

const ActionButtons = ({ clearTable }: ActionButtonsProps) => {
  return (
    <Stack spacing={2} direction='row' alignItems='center' justifyContent='space-between' padding={2} style={{ backgroundColor: '#f5f5f5' }}>
      {/* <Button variant='contained' color='primary'>
        Add Journey
      </Button> */}
      <Button variant='contained' color='error' onClick={clearTable}>
        Clear Table
      </Button>
    </Stack>

  )
}

export default ActionButtons