import { Box, Card, Grid } from '@mui/material';
import { UserInfo } from '../types/UserInfo';

type ListUserProps = {
  users: UserInfo;
};

export default function ListUsers({ users }: ListUserProps) {
  return (
    <Grid item xs={6} md={4} lg={2}>
      <Card>
        <Box textAlign={'center'}>
          <Box>{users.username ?? undefined}</Box>
        </Box>
      </Card>
    </Grid>
  );
}
