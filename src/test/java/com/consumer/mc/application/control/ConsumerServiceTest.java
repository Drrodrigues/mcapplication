package com.consumer.mc.application.control;

import com.consumer.mc.consumer.control.ConsumerRepository;
import com.consumer.mc.consumer.control.ConsumerService;
import com.consumer.mc.consumer.entity.Address;
import com.consumer.mc.consumer.entity.Consumer;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertNull;

@ExtendWith(MockitoExtension.class)
public class ConsumerServiceTest {

    private static final Address ADDRESS_1 = new Address();
    private static final Consumer CONSUMER_1 = createConsumer("first", "firstLast", List.of(ADDRESS_1));
    private static final Consumer CONSUMER_2 = createConsumer("second", "secondLast", List.of());

    private static Consumer createConsumer(String firstName, String lastName, List<Address> addresses) {
        Consumer c = new Consumer();
        c.setFirstName(firstName);
        c.setLastName(lastName);
        c.setAddresses(addresses);
        return c;
    }

    @Mock
    private ConsumerRepository consumerRepository;

    private final List<Consumer> consumers = List.of(CONSUMER_1, CONSUMER_2);

    @Test
    public void when_findingAll_expect_findAllToBeCalled() {
        ConsumerService consumerService = new ConsumerService(consumerRepository);
        Mockito.when(consumerRepository.findAll()).thenReturn(consumers);
        consumerService.findAll();
        Mockito.verify(consumerRepository, Mockito.times(1)).findAll();
    }

    @Test
    public void when_findingByID_expect_findFindByIdToBeCalled() {
        ConsumerService consumerService = new ConsumerService(consumerRepository);
        Mockito.when(consumerRepository.findById(Mockito.any())).thenReturn(Optional.of(CONSUMER_1));
        consumerService.findById("id");
        Mockito.verify(consumerRepository, Mockito.times(1)).findById(Mockito.any());
    }

    @Test
    public void when_findingByIDNotExists_expect_Exception() {
        ConsumerService consumerService = new ConsumerService(consumerRepository);
        Mockito.when(consumerRepository.findById(Mockito.any())).thenReturn(null);
        Assertions.assertThrows(RuntimeException.class, () -> {
            consumerService.findById("id");
        });
    }

    @Test
    public void when_save_expect_SaveToBeCalled() {
        ConsumerService consumerService = new ConsumerService(consumerRepository);
        Mockito.when(consumerRepository.save(Mockito.any())).thenReturn(CONSUMER_1);
        consumerService.save(CONSUMER_1);
        Mockito.verify(consumerRepository, Mockito.times(1)).save(Mockito.any());
    }

    @Test
    public void when_SetConsumerAddresses_expect_AddressToBeUpdated() {
        ConsumerService consumerService = new ConsumerService(consumerRepository);
        Mockito.when(consumerRepository.findById(Mockito.any())).thenReturn(Optional.of(CONSUMER_1));
        consumerService.setConsumerAddresses("1", List.of());
        Mockito.verify(consumerRepository, Mockito.times(1)).findById(Mockito.any());
        Mockito.verify(consumerRepository, Mockito.times(1)).save(Mockito.any());
    }


}
