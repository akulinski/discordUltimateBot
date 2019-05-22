package com.akulinski.dcbot.repository;

import com.akulinski.dcbot.domain.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.Optional;


/**
 * Spring Data  repository for the Message entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    Optional<Message> getByHashcode(int hashCode);

    Optional<Message> findByContentAndLocalDate(String content, Date localDate);

}
