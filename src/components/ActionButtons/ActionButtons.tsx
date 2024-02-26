import { Button, Stack } from '@mui/material'

const ActionButtons = () => {
  return (
    <Stack spacing={2} direction='row' alignItems='center' justifyContent='space-between' padding={2} style={{ backgroundColor: '#f5f5f5' }}>
      <Button variant='contained' color='primary'>
        Add Journey
      </Button>
      <Button variant='contained' color='error'>
        Clear Table
      </Button>
    </Stack>

  )
}

export default ActionButtons