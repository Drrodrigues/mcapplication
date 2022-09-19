package com.consumer.mc.application;

import com.consumer.mc.Application;
import com.consumer.mc.consumer.entity.Consumer;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@SpringBootTest(
        classes = Application.class)
@AutoConfigureMockMvc
@TestPropertySource(
        locations = "classpath:application.properties")
public class RestConsumerIT {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void when_findingAll_expect_findAllToBeCalled() throws Exception {
        MvcResult result = mvc.perform(get("/consumers")
                .contentType(MediaType.APPLICATION_JSON)).andReturn();

        String contentAsString = result.getResponse().getContentAsString();
        List<Consumer> consumers = objectMapper.readValue(contentAsString, List.class);
        Assertions.assertEquals(2, consumers.size());
    }
}