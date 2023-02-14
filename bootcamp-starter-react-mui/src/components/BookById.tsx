import { Alert, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Book } from '../types/Book';
import DetailBook from './DetailBook';

export default function BookById() {
  const [book, setBook] = useState<Book>();
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:8080/books/${id}`)
      .then((res) => res.json())
      .then((result: Book) => setBook(result));
  }, []);

  return (
    <Grid container justifyContent={'center'} flexWrap={'wrap'}>
      {book ? (
        <DetailBook book={book} />
      ) : (
        <Alert severity="error">Ce livre n'existe pas.</Alert>
      )}
    </Grid>
  );
}
