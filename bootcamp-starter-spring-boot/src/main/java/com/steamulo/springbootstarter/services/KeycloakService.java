package com.steamulo.springbootstarter.services;

import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.representations.idm.ClientRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class KeycloakService {

    @Value("${keycloak.resource}")
    private String keycloakClient;

    @Value("${keycloak.auth-server-url}")
    private String keycloakUrl;

    @Value("${keycloak.realm}")
    private String keycloakRealm;

    @Value("${is.keycloak.admin.user}")
    private String keycloakAdminUser;

    @Value("${is.keycloak.admin.password}")
    private String keycloakAdminPassword;

    private Keycloak getKeycloakInstance() {
        return Keycloak.getInstance(
                keycloakUrl,
                "master",
                keycloakAdminUser,
                keycloakAdminPassword,
                "admin-cli");
    }

    /**
     * La fonction retourne la liste des utilisateur inscrit.
     */
    public List<UserRepresentation> getAllUsers() {
        Keycloak keycloak = getKeycloakInstance();
        List<UserRepresentation> userRepresentations = keycloak.realm(keycloakRealm).users().list();
        return userRepresentations;
    }

    /**
     * La fonction retourne la liste des rôles existant.
     */
    public List<RoleRepresentation> getRoles() {
        Keycloak keycloak = getKeycloakInstance();
        ClientRepresentation clientRepresentation = keycloak.realm(keycloakRealm).clients().findByClientId(keycloakClient).get(0);
        List<RoleRepresentation> roles = keycloak.realm(keycloakRealm).clients().get(clientRepresentation.getId()).roles().list();
        return roles;
    }

    /**
     * La fonction retourne les rôles par utilisateur.
     * @param username
     */
    public List<RoleRepresentation> getRolesByUser(String username) {
        Keycloak keycloak = getKeycloakInstance();
        Optional<UserRepresentation> user = keycloak.realm(keycloakRealm).users().search(username).stream()
                .filter(u -> u.getUsername().equals(username)).findFirst();
        if (user.isPresent()) {
            UserRepresentation userRepresentation = user.get();
            UserResource userResource = keycloak.realm(keycloakRealm).users().get(userRepresentation.getId());
            List<RoleRepresentation> roles = userResource.roles().realmLevel().listAll();
            return roles;
        } else {
            return null;
        }
    }

    /**
     * La fonction retourne les informations de l'utilisateur. Nom/Prénom/email.....
     * @param username
     */
    public UserRepresentation getInfosByUser(String username) {
        Keycloak keycloak = getKeycloakInstance();
        Optional<UserRepresentation> user = keycloak.realm(keycloakRealm).users().search(username).stream()
                .filter(u -> u.getUsername().equals(username)).findFirst();
        return user.orElse(null);
    }

    /**
     * La fonction ajoute le rôle "Loan" à un utilisateur.
     * @param username
     */
    public UserRepresentation addRolesByUser(String username) {
        String userRole = "Loan";
        Keycloak keycloak = getKeycloakInstance();
        Optional<UserRepresentation> user = keycloak.realm(keycloakRealm).users().search(username).stream()
                .filter(u -> u.getUsername().equals(username)).findFirst();
        if (user.isPresent()) {
            UserRepresentation userRepresentation = user.get();
            UserResource userResource = keycloak.realm(keycloakRealm).users().get(userRepresentation.getId());
            List<RoleRepresentation> roleRepresentationList = userResource.roles().realmLevel().listAvailable();

            for (RoleRepresentation roleRepresentation : roleRepresentationList)
            {
                if (roleRepresentation.getName().equals(userRole))
                {
                    userResource.roles().realmLevel().add(Arrays.asList(roleRepresentation));
                    break;
                }
            }
        }
        return null;
    }

}


