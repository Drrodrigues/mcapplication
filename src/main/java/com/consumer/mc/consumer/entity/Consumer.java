package com.consumer.mc.consumer.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.LinkedList;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "consumer")
public class Consumer {

    @Id
    private String id = UUID.randomUUID().toString();

    @Column
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "consumer")
    private List<Address> addresses = new LinkedList<>();
    @Column
    private String firstName;
    @Column
    private String lastName;

}
