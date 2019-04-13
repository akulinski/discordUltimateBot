package com.akulinski.dcbot.events.listeners;

import net.dv8tion.jda.core.events.ReadyEvent;
import net.dv8tion.jda.core.hooks.ListenerAdapter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
@DiscordEventListener
public class ReadyEventListener extends ListenerAdapter {

    private final Logger log = LoggerFactory.getLogger(ReadyEventListener.class);

    @Override
    public void onReady(ReadyEvent event) {
        super.onReady(event);
        log.debug("API IS READY");
    }
}
