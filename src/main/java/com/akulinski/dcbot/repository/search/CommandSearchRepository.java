package com.akulinski.dcbot.repository.search;

import com.akulinski.dcbot.domain.Command;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Command entity.
 */
public interface CommandSearchRepository extends ElasticsearchRepository<Command, Long> {
}
