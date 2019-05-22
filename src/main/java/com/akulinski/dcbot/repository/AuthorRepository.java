package com.akulinski.dcbot.repository;

import com.akulinski.dcbot.domain.Author;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;


/**
 * Spring Data  repository for the Author entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {
    Optional<Author> getByName(String name);
}
