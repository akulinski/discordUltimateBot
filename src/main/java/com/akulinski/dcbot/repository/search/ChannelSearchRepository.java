package com.akulinski.dcbot.repository.search;

import com.akulinski.dcbot.domain.Channel;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.Optional;

/**
 * Spring Data Elasticsearch repository for the Channel entity.
 */
public interface ChannelSearchRepository extends ElasticsearchRepository<Channel, Long> {

    Optional<Channel> getByName(String name);
}
