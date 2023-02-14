package com.steamulo.springbootstarter.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@Configuration
@ConfigurationProperties (prefix = "strapi")
public class StrapiProperties {
    private String bookUrl;
    private String token;
}
