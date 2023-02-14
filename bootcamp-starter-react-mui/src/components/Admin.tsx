import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useKeycloak } from '@react-keycloak/web/lib/useKeycloak';
import { useEffect, useState } from 'react';
import keycloak from '../../keycloak';
import { UserInfo } from '../types/UserInfo';
import { UserRole } from '../types/UserRole';
import ListUser from './ListUser';
import UserCard from './UserCard';
import UserCardRole from './UserCardRole';

export default function Admin() {
  const [userList, setUserList] = useState<UserInfo[]>([]);
  const [name, setName] = useState<string | undefined>();
  const [roleUser, setroleUser] = useState<UserRole[]>([]);
  const [info, setInfo] = useState<UserInfo | undefined>();
  const { keycloak } = useKeycloak();

  useEffect(() => {
    fetch('http://localhost:8080/keycloak/users', {
      method: 'GET',
      headers: { Authorization: `Bearer ${keycloak.token}` },
    })
      .then((res) => res.json())
      .then((result: UserInfo[]) => {
        setUserList(result);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8080/keycloak/roles/${name}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${keycloak.token}` },
    })
      .then((res) => res.json())
      .then((result: UserRole[]) => setroleUser(result));
  }, [name, roleUser]);

  useEffect(() => {
    fetch(`http://localhost:8080/keycloak/info/${name}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${keycloak.token}` },
    })
      .then((res) => res.json())
      .then((result: UserInfo) => setInfo(result));
  }, [name]);

  const addRoleLoan = () => {
    fetch(`http://localhost:8080/keycloak/addRole/${name}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${keycloak.token}` },
    }).then((res) => {
      res.json();
    });
  };

  return (
    <Grid>
      <Grid
        container
        spacing={'1'}
        justifyContent={'left'}
        whiteSpace={'nowrap'}
      >
        <Typography marginRight={1}>
          Liste des utilisateur inscrit :{' '}
        </Typography>
        {userList.map((users) => {
          return <ListUser key={users.id} users={users} />;
        })}
      </Grid>
      <Grid
        container
        spacing={'1'}
        justifyContent={'left'}
        whiteSpace={'nowrap'}
        marginTop={2}
      >
        <Typography marginRight={1}>Rechercher un utilisateur : </Typography>
        <Box marginLeft={2}>
          <TextField
            type={'input'}
            id="standard-basic"
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
      </Grid>

      {info && name && (
        <Grid>
          <Grid
            container
            spacing={'1'}
            justifyContent={'left'}
            whiteSpace={'nowrap'}
            marginTop={1}
          >
            {info && name && (
              <>
                <Typography marginRight={1}>
                  Information utilisateur :{' '}
                </Typography>
                {<UserCard key={info?.id} users={info} />}
              </>
            )}
          </Grid>
          <Grid
            container
            spacing={'1'}
            justifyContent={'left'}
            whiteSpace={'nowrap'}
            marginTop={2}
          >
            <>
              <Typography>Liste des roles utilisateur : </Typography>
              {roleUser.map((role) => {
                return <UserCardRole key={role.id} role={role} />;
              })}
            </>
          </Grid>
          <Button
            variant="contained"
            disableElevation
            onClick={() => addRoleLoan()}
          >
            Droit d'emprunt
          </Button>
        </Grid>
      )}
    </Grid>
  );
}
