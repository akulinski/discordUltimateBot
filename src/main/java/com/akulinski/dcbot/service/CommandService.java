package com.akulinski.dcbot.service;

import net.dv8tion.jda.core.entities.Message;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class CommandService {

    @Async
    public void handleCommand(Message message){

    }
}
