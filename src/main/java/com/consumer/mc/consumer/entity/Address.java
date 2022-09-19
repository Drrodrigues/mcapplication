package com.consumer.mc.consumer.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.UUID;

@Entity
@Getter
@Setter
public class Address {

    private AddressType type;
    @Id
    private String id = UUID.randomUUID().toString();
    // US format according to UPS
    private String street;
    private String floor;
    private String city;
    private String state;
    private String zipCode;
    //only US is required
    private String country = "US";
    private String consumer;

    public void setCountry(String country) throws Exception {
        if (!country.equals("US")){
            throw new Exception("Invalid Country specified");
        }
    }
}
