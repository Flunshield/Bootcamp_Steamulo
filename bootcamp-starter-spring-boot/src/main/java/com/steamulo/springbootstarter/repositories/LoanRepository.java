package com.steamulo.springbootstarter.repositories;

import com.steamulo.springbootstarter.entity.Loan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoanRepository extends JpaRepository<Loan, Long> {
    // Cette fonction vérifie si il existe un livre dont la date de retour est vide dans la BDD.
    boolean existsByIdBookAndReturnLoaningDateIsNull(Long idBook);
    // Cette fonction cherche un livre ayant le même idBook et le même idUser avec une date de retour d'emprunt null.
    List<Loan> findByIdBookAndIdUserAndReturnLoaningDateIsNull(Long idBook, String idUser);
    // Cette fonction cherche les livres emprunté et non rendu par un utilisateur.
    List<Loan> findByIdUserAndReturnLoaningDateIsNull(String idUser);
}

