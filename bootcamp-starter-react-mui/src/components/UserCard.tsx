import { Box, Card, Grid } from '@mui/material';
import { UserInfo } from '../types/UserInfo';

type ListUserProps = {
  users: UserInfo;
};

export default function UserCard({ users }: ListUserProps) {
  return (
    <>
      <Grid item xs={6} md={4} lg={2}>
        <Card>
          <Box textAlign={'center'}>Prénom : {users.firstName}</Box>
          <Box textAlign={'center'}>Nom : {users.lastName}</Box>
          <Box textAlign={'center'}>Email : {users.email}</Box>
        </Card>
      </Grid>
    </>
  );
}
