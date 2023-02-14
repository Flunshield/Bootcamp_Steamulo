package com.steamulo.springbootstarter.services;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.steamulo.springbootstarter.dto.BookDto;
import com.steamulo.springbootstarter.properties.StrapiProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.http.HttpConnectTimeoutException;
import java.util.List;

@Service
public class StrapiService {
    @Autowired
    StrapiProperties strapiProperties;

    /**
     * On prend l'URL en paramètre d'entrée et on retourne la donnée que nous renvoie Strapi sous forme de string.
     * @param url URL passé à Strapi
     * @throws IOException
     */
    private String callStrapi(URL url) throws IOException {
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");
        connection.setRequestProperty("Authorization", "Bearer " + strapiProperties.getToken());
        connection.setConnectTimeout(5000);
        connection.connect();
        if (connection.getResponseCode() == 200) {
            // On récupère la donnée de la requête puis on la transforme en string pour la mapper en JSON.
            BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = br.readLine()) != null) {
                sb.append(line).append("\n");
            }
            br.close();
            connection.disconnect();
            return sb.toString();
        } else {
            connection.disconnect();
            throw new HttpConnectTimeoutException("Can't connect to Strapi");
        }
    }

    /**
     * On récupère la liste des livres depuis Strapi
     * Si on ajoute la catégorie, nous récupérons la liste de livre associé à celle-ci.
     * Sinon, nous avons la liste entière des livres.
     *
     * @param category Catégorie du livre
     * @throws IOException
     */
    public List<BookDto> getStrapiBooks(String category) throws IOException {
        // On se connect à l'URL de l'API en passant le Bearer token dans les headers
        URL url;
        if (category != null) {
            url = new URL(strapiProperties.getBookUrl() + "?populate[cover][fields]=url&filters[category][$eq]=" + category);
        } else {
            url = new URL(strapiProperties.getBookUrl() + "?populate[cover][fields]=url");
        }
        String response = callStrapi(url);
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(response);
        String data = jsonNode.get("data").toString();
        List<BookDto> listBook = objectMapper.readValue(data, new TypeReference<>() {
        });
        return listBook;
    }

    /**
     * Nous récupérons le livre associé à l'ID demandé.
     * @param id
     * @throws IOException
     */
    public BookDto getStrapiById(Long id) throws IOException {
        // On se connect à l'URL de l'API en passant le Bearer token dans les headers
        URL url = new URL("http://localhost:1337/api/livres/" + id + "?populate[cover][fields]=url");
        String response = callStrapi(url);
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(response);
        String data = jsonNode.get("data").toString();
        BookDto listBook = objectMapper.readValue(data, new TypeReference<>() {
        });
        return listBook;
    }
}
