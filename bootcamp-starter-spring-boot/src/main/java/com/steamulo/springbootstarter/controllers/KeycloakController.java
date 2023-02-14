package com.steamulo.springbootstarter.controllers;

import com.steamulo.springbootstarter.services.KeycloakService;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/keycloak")
public class KeycloakController {

    @Autowired
    KeycloakService keycloakService;

    @GetMapping("/users")
    public List<UserRepresentation> getAllUsers() {
        return keycloakService.getAllUsers();
    }

    @GetMapping("/roles")
    public List<RoleRepresentation> getRoles() {
        return keycloakService.getRoles();
    }

    @GetMapping("/roles/{user}")
    public List<RoleRepresentation> getRolesByUser(@PathVariable("user") String username) {
        return keycloakService.getRolesByUser(username);
    }
    @GetMapping("/info/{user}")
    public UserRepresentation getInfosByUser(@PathVariable("user") String username) {
        return keycloakService.getInfosByUser(username);
    }

    @PatchMapping("/addRole/{user}")
    public UserRepresentation addRolesByUser(@PathVariable("user") String username) {
        return keycloakService.addRolesByUser(username);
    }
}
