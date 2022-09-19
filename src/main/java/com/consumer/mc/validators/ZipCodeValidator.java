package com.consumer.mc.validators;

import com.consumer.mc.consumer.entity.Consumer;
import org.springframework.stereotype.Component;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.function.Predicate;
import java.util.regex.Pattern;

public class ZipCodeValidator implements ConstraintValidator<ZipCodeValid, Consumer> {

    /*
     * US ZIP code (U.S. postal code) allow both the five-digit and nine-digit (called ZIP + 4) formats.
     */
    private final static Predicate<String> US_ZIP_CODE = Pattern.compile("^[0-9]{5}(?:-[0-9]{4})?$").asPredicate();

    @Override
    public boolean isValid(Consumer consumer, ConstraintValidatorContext context) {
        context.disableDefaultConstraintViolation();
        boolean result = consumer.getAddresses().stream().allMatch(ad -> ad.getCountry().equals("US") && US_ZIP_CODE.test(ad.getZipCode()));
        if (!result) {
            context.buildConstraintViolationWithTemplate(
                    "{validation.field.zipCode}").addPropertyNode("zipCode").addConstraintViolation();
        }
        return result;
    }

}