import Alert from '@mui/material/Alert/Alert';
import Button from '@mui/material/Button/Button';
import { useKeycloak } from '@react-keycloak/web';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ButtonLoan = () => {
  const { keycloak } = useKeycloak();
  const { id } = useParams();
  const [canLoan, setcanLoan] = useState<boolean>();

  useEffect(() => {
    fetch(`http://localhost:8080/loans/canLoan/${id}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${keycloak.token}` },
    })
      .then((res) => res.json())
      .then((result) => setcanLoan(result));
  }, []);

  const loan = () => {
    fetch(`http://localhost:8080/loans/${id}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${keycloak.token}` },
    })
      .then((res) => {
        res.json();
        setcanLoan(!canLoan);
      })
      .catch((error) => {
        <Alert severity="error">Erreur lors de l'emprunt : {error}</Alert>;
      });
  };

  const returnLoan = () => {
    fetch(`http://localhost:8080/loans/${id}/return`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${keycloak.token}` },
    })
      .then((res) => {
        res.json();
        setcanLoan(!canLoan);
      })
      .catch((error) => {
        <Alert severity="error">Erreur lors du retour d'emprunt{error}</Alert>;
      });
  };
  return canLoan ? (
    <Button variant="contained" color="secondary" onClick={() => loan()}>
      Emprunter
    </Button>
  ) : (
    <Button variant="contained" color="secondary" onClick={() => returnLoan()}>
      Rendre
    </Button>
  );
};

export default ButtonLoan;
