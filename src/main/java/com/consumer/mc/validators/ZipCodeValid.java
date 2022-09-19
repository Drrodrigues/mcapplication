package com.consumer.mc.validators;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;
import javax.validation.Constraint;
import javax.validation.Payload;

import static java.lang.annotation.ElementType.PARAMETER;
import static java.lang.annotation.ElementType.TYPE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Target({ PARAMETER,TYPE })
@Retention(RUNTIME)
@Constraint(validatedBy = ZipCodeValidator.class)
@Documented
public @interface ZipCodeValid {

    String message() default "";
    Class<?>[] groups() default { };
    Class<? extends Payload>[] payload() default { };
}