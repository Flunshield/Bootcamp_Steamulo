package com.steamulo.springbootstarter.services;

import com.steamulo.springbootstarter.entity.Loan;
import com.steamulo.springbootstarter.repositories.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Date;
import java.util.List;

@Service
public class LoanService {
    @Autowired
    LoanRepository loanRepository;

    /**
     * La fonction déclare le livre associé à l'ID "emprunté si et seulement si l'utilisateur possède le droit d'emprunter".
     *
     * @param idUser
     * @param idBook
     * @return
     * @throws IOException
     */
    public Loan loan(String idUser, Long idBook) throws IOException {
        boolean isBookLoaned = loanRepository.existsByIdBookAndReturnLoaningDateIsNull(idBook);
        Date today = new Date();
        if (!isBookLoaned) {
            Loan addLoan = new Loan();
            addLoan.setIdUser(idUser);
            addLoan.setIdBook(idBook);
            addLoan.setLoaningDate(today);
            loanRepository.save(addLoan);
            return addLoan;
        } else {
            throw new IOException("This book cannot be loan");
        }
    }

    /**
     * La fonction indique si le livre est emprunté ou non.
     *
     * @param idBook
     * @throws IOException
     */
    public boolean canLoan(Long idBook) throws IOException {
        boolean isBookLoaned = loanRepository.existsByIdBookAndReturnLoaningDateIsNull(idBook);
        return !isBookLoaned;
    }

    /**
     * La fonction déclare que le livre emprunté a été rendu et est dispo.
     *
     * @param idUser
     * @param idBook
     * @return
     * @throws IOException
     */
    public Loan returnBook(String idUser, Long idBook) throws IOException {
        List<Loan> loans = loanRepository.findByIdBookAndIdUserAndReturnLoaningDateIsNull(idBook, idUser);

        if (loans.isEmpty()) {
            throw new IOException("This book cannot be returned");
        } else {
            Loan loan = loans.get(0);
            loan.setReturnLoaningDate(new Date());
            loanRepository.saveAndFlush(loan);
            return loan;
        }
    }

    /**
     * La fonction retourne la liste de livre emprunté par l'utilisateur.
     *
     * @param idUser
     * @throws IOException
     */
    public List<Loan> listBookLoanByUser(String idUser) throws IOException {

        return loanRepository.findByIdUserAndReturnLoaningDateIsNull(idUser);
    }


}
