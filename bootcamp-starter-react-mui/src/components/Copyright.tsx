import Typography from '@mui/material/Typography';

export default function Copyright() {
  return (
    <Typography variant="body2" textAlign={'center'} bottom={0}>
      {`Copyright © Basejump Starter ${new Date().getFullYear()}`}
    </Typography>
  );
}
