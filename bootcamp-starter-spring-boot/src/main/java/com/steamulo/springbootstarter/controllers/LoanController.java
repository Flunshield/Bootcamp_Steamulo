package com.steamulo.springbootstarter.controllers;

import com.steamulo.springbootstarter.entity.Loan;
import com.steamulo.springbootstarter.services.LoanService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/loans")
public class LoanController {
    @Autowired
    LoanService loanService;

    Logger logger = LoggerFactory.getLogger(LoanController.class);

    @PostMapping("/{idBook}")
    public Loan Loans(@PathVariable("idBook") Long idBook, Principal principal) throws IOException {
        try {
            String idUser = principal.getName();
            return loanService.loan(idUser, idBook);
        } catch (IOException e) {
            throw new IOException("This book cannot be loan");
        }
    }

    @GetMapping("/canLoan/{idBook}")
    public boolean canLoan(@PathVariable("idBook") Long idBook) throws IOException {
        try {
            return loanService.canLoan(idBook);
        } catch (IOException e) {
            throw new IOException("This book cannot be loan");
        }
    }

    @PatchMapping("/{idBook}/return")
    public Loan ReturnLoans(@PathVariable("idBook") Long idBook, Principal principal) throws IOException {
        try {
            String idUser = principal.getName();
            return loanService.returnBook(idUser, idBook);
        } catch (IOException e) {
            throw new IOException("This book cannot be returned");
        }
    }

    @GetMapping("/bookLoans")
    public List<Loan> listBookLoanByUser(Principal principal) throws IOException {
        String idUser = principal.getName();
        try {
            return loanService.listBookLoanByUser(idUser);
        } catch (IOException e) {
            logger.error("Error: can't retrieve books for user " + idUser);
            throw new IOException("Error: can't retrieve books for user " + idUser);
        }
    }
}
