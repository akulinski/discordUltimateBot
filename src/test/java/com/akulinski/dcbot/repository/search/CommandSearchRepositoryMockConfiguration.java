package com.akulinski.dcbot.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of CommandSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class CommandSearchRepositoryMockConfiguration {

    @MockBean
    private CommandSearchRepository mockCommandSearchRepository;

}
