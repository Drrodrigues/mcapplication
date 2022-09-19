package com.consumer.mc.consumer.control;

import com.consumer.mc.consumer.entity.Address;
import com.consumer.mc.consumer.entity.Consumer;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ConsumerService {
    private final ConsumerRepository consumerRepository;

    public ConsumerService(ConsumerRepository consumerRepository) {
        this.consumerRepository = consumerRepository;
    }

    public List<Consumer> findAll() {
        return consumerRepository.findAll();
    }

    public Consumer findById(String id) {
        return consumerRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    public String save(Consumer consumer) {
        return consumerRepository.save(consumer).getId();
    }

    public Consumer setConsumerAddresses(String id, List<Address> addresses) {
        Optional<Consumer> consumer = consumerRepository.findById(id);
        return consumer.map(c -> {
            c.setAddresses(addresses);
            consumerRepository.save(c);
            return c;
        }).orElse(null);
    }

    public void deleteById(String id) {
        consumerRepository.deleteById(id);
    }

    public List<Address> getConsumerAddresses(String id) {
        Optional<Consumer> c = consumerRepository.findById(id);
        return c.map(Consumer::getAddresses).orElse(Collections.emptyList());
    }
}
