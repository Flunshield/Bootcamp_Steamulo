import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import BookCard from './BookCard';

export default function BookList() {
  const [books, setItems] = useState<Book[]>([]);
  const [category, setCategory] = useState<string>('');

  useEffect(() => {
    fetch(
      `http://localhost:8080/books${category ? '?category=' + category : ''}`
    )
      .then((res) => res.json())
      .then((result: Book[]) => {
        setItems(result);
      });
  }, [category]);

  return (
    <>
      <Box width={200}>
        <FormControl fullWidth>
          <InputLabel>categorie</InputLabel>
          <Select
            value={category}
            label="categorie"
            onChange={(event) => setCategory(event.target.value)}
          >
            <MenuItem value={''}>Tout</MenuItem>
            <MenuItem value={'BD'}>BD</MenuItem>
            <MenuItem value={'Manga'}>Manga</MenuItem>
            <MenuItem value={'Roman'}>Roman</MenuItem>
            <MenuItem value={'Magazine'}>Magazine</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Grid
        container
        spacing={'16'}
        justifyContent={'center'}
        whiteSpace={'nowrap'}
        marginTop={2}
      >
        {books.map((book) => {
          return <BookCard key={book.id} book={book} />;
        })}
      </Grid>
    </>
  );
}
