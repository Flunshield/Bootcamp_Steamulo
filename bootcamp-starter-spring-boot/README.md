# Spring Boot Starter

This repository aims to provide a starter template for the bootcamp backend.

## Authentication

This application uses a Keycloak authentication server to manage the authentication. 
To start the application it is necessary to configure keycloak.

Run the docker-compose configuration :

```bash
docker-compose up 
or 
docker compose up
```

After the services have started, keycloak should be available at http://localhost:8081/

**FIRST STARTUP INSTRUCTIONS**

1. Visit http://localhost:8081/admin/
2. Sign in with username: `admin` and password: `admin`
3. Follow the instructions [on this page](https://www.keycloak.org/getting-started/getting-started-docker#_create_a_realm) (`Create a realm` and `Create a user` only)
4. Select the created realm, go to clients and add a new one (fill in the `Client ID`, then click `Next` and finally click `Save`)
5. Add `http://localhost:5173/*` in `Valid redirect URIs`
6. Add `+` in `Valid post logout redirect URIs`
7. Add `+` in `Web origins`
8. Modify `application.properties` with your realm name (`keycloak.realm`) and your client id (`keycloak.resource`)

## Launch the app

Run `SpringBootStarterApplication` configuration.
The app should be available at http://localhost:8080/.

Go on http://localhost:8080/public/ and then http://localhost:8080/private/.
