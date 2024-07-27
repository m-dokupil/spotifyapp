import { Box, Card } from '@mui/material';
import { loginUrl } from '../config/spotify';

export const Login = () => {
  return (
    <Box 
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={2}
      sx={{ backGroundColor: '#f0f0f0', height: '100vh' }}
    >
      <Card variant="outlined" sx={{ maxWidth: '365px', backgroundColor: '#1bd35e', p: 2}}>
        <a href={loginUrl}>Login with Spotify</a>
      </Card>
    </Box>
  );
}