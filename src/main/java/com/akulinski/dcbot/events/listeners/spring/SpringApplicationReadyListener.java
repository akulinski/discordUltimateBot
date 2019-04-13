package com.akulinski.dcbot.events.listeners.spring;

import com.akulinski.dcbot.repository.AuthorRepository;
import com.akulinski.dcbot.repository.ChannelRepository;
import com.akulinski.dcbot.repository.MessageRepository;
import com.akulinski.dcbot.repository.search.AuthorSearchRepository;
import com.akulinski.dcbot.repository.search.ChannelSearchRepository;
import com.akulinski.dcbot.repository.search.MessageSearchRepository;
import com.akulinski.dcbot.service.TextChannelService;
import net.dv8tion.jda.core.JDA;
import net.dv8tion.jda.core.entities.TextChannel;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SpringApplicationReadyListener {

    private final JDA api;

    private final MessageRepository messageRepository;

    private final AuthorRepository authorRepository;

    private final MessageSearchRepository messageSearchRepository;

    private final AuthorSearchRepository authorSearchRepository;

    private final ChannelRepository channelRepository;

    private final ChannelSearchRepository channelSearchRepository;

    private final TextChannelService textChannelService;

    public SpringApplicationReadyListener(MessageRepository messageRepository, AuthorRepository authorRepository, MessageSearchRepository messageSearchRepository, AuthorSearchRepository authorSearchRepository, JDA api, ChannelRepository channelRepository, ChannelSearchRepository channelSearchRepository, TextChannelService textChannelService) {
        this.messageRepository = messageRepository;
        this.authorRepository = authorRepository;
        this.messageSearchRepository = messageSearchRepository;
        this.authorSearchRepository = authorSearchRepository;
        this.api = api;
        this.channelRepository = channelRepository;
        this.channelSearchRepository = channelSearchRepository;
        this.textChannelService = textChannelService;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void loadInitialData() {
        List<TextChannel> textChannels = api.getTextChannels();

        textChannels.forEach(textChannel -> {
            textChannelService.createTextChannelIfDoesntExist(textChannel);
        });

    }

}
