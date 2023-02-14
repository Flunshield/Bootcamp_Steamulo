package com.steamulo.springbootstarter.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("")
public class TestController {

    @GetMapping("/public")
    @PreAuthorize("user, admin")
    public String publicRoute() {
        return "Public route";
    }

    @GetMapping("/private")
    public String privateRoute(Principal principal) {
        return "Private route, user id : " + principal.getName();
    }
}