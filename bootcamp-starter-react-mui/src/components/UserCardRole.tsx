import { Grid, Card, Box } from '@mui/material';
import { UserRole } from '../types/UserRole';

type ListUserRoleProps = {
  role: UserRole;
};

export default function UserCardRole({ role }: ListUserRoleProps) {
  return (
    <>
      <Grid item xs={6} md={4} lg={2} marginLeft={5} marginTop={1}>
        <Card>
          <Box textAlign={'center'}>{role.name}</Box>
        </Card>
      </Grid>
    </>
  );
}
