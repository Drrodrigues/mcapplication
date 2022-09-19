package com.consumer.mc.consumer.boundary;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;

@ControllerAdvice
public class ConsumerControllerAdvice {

        @ExceptionHandler(ConstraintViolationException.class)
        public ResponseEntity handleConstraintViolationException(ConstraintViolationException exception) {
            return ResponseEntity.badRequest().body(exception.getConstraintViolations().stream().map(ConstraintViolation::getMessage));
        }
}
