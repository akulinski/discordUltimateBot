package com.akulinski.dcbot.service;

import com.akulinski.dcbot.domain.Command;
import com.akulinski.dcbot.repository.ActionRepository;
import com.akulinski.dcbot.repository.CommandRepository;
import com.akulinski.dcbot.repository.search.ActionSearchRepository;
import com.akulinski.dcbot.repository.search.CommandSearchRepository;
import org.springframework.stereotype.Service;

@Service
public class ActionLoggingService {

    private final CommandRepository commandRepository;

    private final CommandSearchRepository commandSearchRepository;

    private final ActionSearchRepository actionSearchRepository;

    private final ActionRepository actionRepository;

    public ActionLoggingService(CommandRepository commandRepository, CommandSearchRepository commandSearchRepository, ActionSearchRepository actionSearchRepository, ActionRepository actionRepository) {
        this.commandRepository = commandRepository;
        this.commandSearchRepository = commandSearchRepository;
        this.actionSearchRepository = actionSearchRepository;
        this.actionRepository = actionRepository;
    }

    public void saveCommand(Command command) {

        commandRepository.save(command);
        commandSearchRepository.save(command);
    }
}
