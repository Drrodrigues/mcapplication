package com.consumer.mc.consumer.boundary;

import com.consumer.mc.consumer.control.ConsumerService;
import com.consumer.mc.consumer.entity.Address;
import com.consumer.mc.consumer.entity.Consumer;
import com.consumer.mc.validators.ZipCodeValid;
import io.swagger.annotations.ApiOperation;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/consumers")
@Validated
public class ConsumerController {

    private final ConsumerService consumerService;

    public ConsumerController(ConsumerService consumerService) {
        this.consumerService = consumerService;
    }

    @GetMapping
    @ApiOperation(value = "Get all consumers")
    public List<Consumer> getConsumers() {
        return consumerService.findAll();
    }

    @GetMapping("/{id}")
    @ApiOperation(value = "Get a specific consumer")
    public Consumer getConsumer(@PathVariable String id) {
        return consumerService.findById(id);
    }

    @PostMapping
    @ApiOperation(value = "Create a new consumer")
    public String createConsumer(@RequestBody @ZipCodeValid Consumer consumer) {
        return consumerService.save(consumer);
    }

    @GetMapping("/{id}/address")
    @ApiOperation(value = "Get a consumer's addresses")
    public List<Address> getAddresses(@PathVariable String id) {
        return consumerService.getConsumerAddresses(id);
    }

    @PatchMapping("/{id}/addresses")
    @ApiOperation(value = "Sets the consumer' addresses")
    public Consumer addBillingAddress(@PathVariable String id, @RequestBody List<Address> addresses) {
        return consumerService.setConsumerAddresses(id, addresses);
    }

    @DeleteMapping("/{id}")
    public void deleteConsumer(@PathVariable String id) {
        consumerService.deleteById(id);
    }


}
