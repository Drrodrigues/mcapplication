package com.consumer.mc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Collections;

@SpringBootApplication
@EnableSwagger2
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.any())
                .build()
                .pathMapping("/");
    }

    @Bean
    public ApiInfo apiInfo() {
        return new ApiInfo(
                "Consumer REST API",
                "RESTful endpoints to create a customer, retrieve a customer by Id, add an address and retrieve addresses for a customer. ",
                "API TOS",
                "Terms of service",
                new Contact("Diogo Rodrigues", "https://www.linkedin.com/in/jdiogorodrigues/", "rodrigues.jdiogo@gmail.com"),
                "License of API", "API license URL", Collections.emptyList());
    }

}
