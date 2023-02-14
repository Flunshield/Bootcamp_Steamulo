package com.steamulo.springbootstarter.controllers;

import com.steamulo.springbootstarter.dto.BookDto;
import com.steamulo.springbootstarter.services.StrapiService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/books")
public class BookController {
    Logger logger = LoggerFactory.getLogger(BookController.class);
    @Autowired
    StrapiService strapiService;

    @GetMapping("")
    public List<BookDto> getBooks(@RequestParam(required = false) String category) {
        try {
            return strapiService.getStrapiBooks(category);
        } catch (IOException e) {
            logger.error("Error: can't retrieve books from remote server");
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error: can't retrieve books from remote server");
        }
    }

    @GetMapping("/{id}")
    public BookDto getBooksById(@PathVariable("id") Long id) throws IOException {
        try {
            return strapiService.getStrapiById(id);
        } catch (IOException e) {
            logger.warn("Book with id " + id + " not found");
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Book not found");
        }
    }
}
