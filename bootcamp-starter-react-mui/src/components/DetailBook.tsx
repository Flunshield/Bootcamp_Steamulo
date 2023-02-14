import { AccountCircle, MenuBook } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import CardMedia from '@mui/material/CardMedia/CardMedia';
import Grid from '@mui/material/Grid/Grid';
import { useKeycloak } from '@react-keycloak/web/lib/useKeycloak';
import { Book } from '../types/Book';
import ButtonLoan from './ButtonLoan';

type DetailBookProps = {
  book: Book;
};

export default function DetailBook({ book }: DetailBookProps) {
  const { keycloak } = useKeycloak();
  const isLoggedIn = keycloak.authenticated;

  const token = keycloak.token;
  const tableauToken = token?.split('.')[1];
  const tableauTokenRole: string[] = tableauToken
    ? JSON.parse(atob(tableauToken)).realm_access?.roles
    : null;

  const checkRoleAdmin = tableauTokenRole?.includes('Admin');
  const checkRoleUser = tableauTokenRole?.includes('Loan');

  return (
    <>
      <Grid item xs={12} lg={4}>
        <CardMedia
          component="img"
          height={'auto'}
          alt=""
          image={book.coverUrl ?? undefined}
        />
      </Grid>
      <Grid item xs={12} lg={6} paddingRight={10} paddingLeft={10}>
        <Box>
          <Typography
            variant="h3"
            color="black"
            height="auto"
            textAlign={'center'}
            marginBottom={5}
          >
            {book.title}
          </Typography>
        </Box>
        <Box>
          <Typography gutterBottom variant="h5" component="div">
            Résumé : <MenuBook></MenuBook>
          </Typography>
          <Typography
            variant="body1"
            color="black"
            height="auto"
            textAlign={'justify'}
          >
            {book.summary}
          </Typography>
        </Box>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Box>
            <Typography gutterBottom variant="h5" component="div" marginTop={5}>
              Auteur <AccountCircle></AccountCircle>
            </Typography>
            <Typography
              variant="body2"
              color="black"
              height="auto"
              textAlign={'center'}
            >
              {book.author}
            </Typography>
          </Box>
          <Box>
            <Typography gutterBottom variant="h5" component="div" marginTop={5}>
              Maison d'édition <AccountCircle></AccountCircle>
            </Typography>
            <Typography
              variant="body2"
              color="black"
              height="auto"
              textAlign={'center'}
            >
              {book.edition}
            </Typography>
          </Box>
          <Box>
            <Typography gutterBottom variant="h5" component="div" marginTop={5}>
              Date d'édition <AccountCircle></AccountCircle>
            </Typography>
            <Typography
              variant="body2"
              color="black"
              height="auto"
              textAlign={'center'}
            >
              {book.editionDate}
            </Typography>
          </Box>
        </Box>
        <Box textAlign={'right'} marginTop={10}>
          {isLoggedIn && checkRoleUser && !checkRoleAdmin && <ButtonLoan />}
        </Box>
      </Grid>
    </>
  );
}
