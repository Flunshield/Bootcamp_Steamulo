import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import { Book } from '../types/Book';
import { Link as RouterLink } from 'react-router-dom';

type BookCardProps = {
  book: Book;
};

export default function BookCard({ book }: BookCardProps) {
  return (
    <Grid item xs={6} md={4} lg={2}>
      <Card>
        <CardActionArea component={RouterLink} to={`/books/${book.id}`}>
          <CardMedia
            component="img"
            height="auto"
            image={book.coverUrl ?? undefined}
            alt=""
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="subtitle1"
              component="div"
              textAlign={'center'}
              overflow={'hidden'}
              textOverflow={'ellipsis'}
            >
              {book.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
