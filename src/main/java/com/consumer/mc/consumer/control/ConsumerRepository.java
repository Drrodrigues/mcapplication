package com.consumer.mc.consumer.control;

import com.consumer.mc.consumer.entity.Consumer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConsumerRepository extends JpaRepository<Consumer, String> {
}
