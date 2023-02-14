import { Grid, Typography } from '@mui/material';
import { useKeycloak } from '@react-keycloak/web/lib/useKeycloak';
import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { BookLoans } from '../types/BookLoans';
import BookCard from './BookCard';

export default function BookListLoanByUser() {
  const [booksLoans, setBooksLoans] = useState<BookLoans[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const { keycloak } = useKeycloak();

  useEffect(() => {
    fetch('http://localhost:8080/loans/bookLoans', {
      method: 'GET',
      headers: { Authorization: `Bearer ${keycloak.token}` },
    })
      .then((res) => res.json())
      .then((result: BookLoans[]) => {
        setBooksLoans(result);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/books')
      .then((res) => res.json())
      .then((result: Book[]) => {
        setBooks(result);
      });
  }, []);

  const filtreIdBooksLoans = booksLoans.map((loan) => loan.idBook);

  const booksToDisplay = books.filter((book) =>
    filtreIdBooksLoans.includes(book.id)
  );
  return (
    <>
      <Grid textAlign={'left'}>
        <Typography>Liste des livres empruntés :</Typography>
      </Grid>
      <Grid
        container
        spacing={'16'}
        justifyContent={'center'}
        whiteSpace={'nowrap'}
        marginTop={2}
      >
        {booksToDisplay.map((book) => {
          return <BookCard key={book.id} book={book} />;
        })}
      </Grid>
    </>
  );
}
