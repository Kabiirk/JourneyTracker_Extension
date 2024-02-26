import { Button, Typography } from '@mui/material';

const Login = () => {
  const handleClick = () => {
    chrome.tabs.create({ url: 'http://localhost:3000/login' });
  };

  return (
    <>
      <Typography variant='h5'>Welcome to User Journey</Typography>
        <Button
          variant='contained'
          type='button'
          onClick={handleClick}
        >
          Login to Start Using
        </Button>
    </>
  );
};

export default Login;
