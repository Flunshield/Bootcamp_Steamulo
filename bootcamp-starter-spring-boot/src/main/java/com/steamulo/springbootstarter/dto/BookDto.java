package com.steamulo.springbootstarter.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookDto {

    @JsonProperty("id")
    private Long id;
    private String title;
    private String summary;
    private String author;
    private String edition;
    private String editionDate;
    private String category;
    private String coverUrl;

    //On va aller chercher dans "attributes" les informations que nous souhaitons : title,summary.......
    @JsonProperty("attributes")
    private void unpackNested(JsonNode attributes) {
        this.title = attributes.get("title").asText();
        this.summary = attributes.get("summary").asText();
        this.author = attributes.get("author").asText();
        this.edition = attributes.get("edition").asText();
        this.editionDate = attributes.get("editionDate").asText();
        this.category = attributes.get("category").asText();
        JsonNode data = attributes.get("cover").get("data");
        if (data.isNull()) {
            this.coverUrl = null;
        } else {
            this.coverUrl = "http://localhost:1337" + data.get("attributes").get("url").asText();
        }
    }
}
