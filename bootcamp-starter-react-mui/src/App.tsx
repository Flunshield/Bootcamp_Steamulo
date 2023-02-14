import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './helpers/PrivateRoute';
import Books from './pages/Books';
import Home from './pages/Home';
import MonCompte from './pages/MonCompte';
import PageBook from './pages/PageBook';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/moncompte" element={<MonCompte />} />
        <Route path="/books/:id" element={<PageBook />} />
        <Route
          path="/secured"
          element={
            <PrivateRoute>
              <MonCompte />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
