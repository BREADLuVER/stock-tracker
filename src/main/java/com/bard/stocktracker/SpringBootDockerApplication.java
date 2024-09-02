package com.bard.stocktracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.batch.BatchAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;

@RestController
@SpringBootApplication(exclude = { BatchAutoConfiguration.class })
@EnableJpaRepositories("com.bard.stocktracker.repository")
@ComponentScan(basePackages = { "com.bard.stocktracker" })
@EntityScan("com.bard.stocktracker.model")
public class SpringBootDockerApplication {

    private final ResourceLoader resourceLoader;

    public SpringBootDockerApplication(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    @RequestMapping("/")
    public void home(HttpServletResponse response) throws IOException { 
        Resource resource = resourceLoader.getResource("classpath:/index.html");
        try (InputStream inputStream = resource.getInputStream()) {
            response.setContentType("text/html");
            inputStream.transferTo(response.getOutputStream());
        }
    }

    public static void main(String[] args) {
        SpringApplication.run(SpringBootDockerApplication.class, args);
    }
}
