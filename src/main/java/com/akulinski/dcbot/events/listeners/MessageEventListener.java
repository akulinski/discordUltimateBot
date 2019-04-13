package com.akulinski.dcbot.events.listeners;

import com.akulinski.dcbot.domain.Author;
import com.akulinski.dcbot.domain.Channel;
import com.akulinski.dcbot.domain.Message;
import com.akulinski.dcbot.repository.AuthorRepository;
import com.akulinski.dcbot.repository.ChannelRepository;
import com.akulinski.dcbot.repository.MessageRepository;
import com.akulinski.dcbot.service.CommandService;
import net.dv8tion.jda.core.events.message.MessageReceivedEvent;
import net.dv8tion.jda.core.hooks.ListenerAdapter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.ZoneId;
import java.util.Date;
import java.util.Optional;

@Component
@DiscordEventListener
public class MessageEventListener extends ListenerAdapter {
    private final Logger log = LoggerFactory.getLogger(ReadyEventListener.class);

    private final ChannelRepository channelRepository;

    private final MessageRepository messageRepository;

    private final AuthorRepository authorRepository;

    private final CommandService commandService;

    public MessageEventListener(ChannelRepository channelRepository, MessageRepository messageRepository, AuthorRepository authorRepository, CommandService commandService) {
        this.channelRepository = channelRepository;
        this.messageRepository = messageRepository;
        this.authorRepository = authorRepository;
        this.commandService = commandService;
    }

    @Override
    public void onMessageReceived(MessageReceivedEvent event) {
        super.onMessageReceived(event);

        if (event.getMessage().getContentStripped().startsWith("#")){
            commandService.handleCommand(event.getMessage());
        }

        Date date = Date.from(event.getMessage().getCreationTime().toLocalDate().atStartOfDay(ZoneId.systemDefault()).toInstant());

        Author author = createAuthorIfDoesNotExist(event);

        Channel channel = createChannelIfDoesNotExist(event);

        setUpMessage(event, date, author, channel);

    }

    private void setUpMessage(MessageReceivedEvent event, Date date, Author author, Channel channel) {
        Message message = new Message();
        message.setContent(event.getMessage().getContentStripped());
        message.setAuthor(author);
        message.setChannel(channel);
        message.setHashcode(event.getMessage().hashCode());
        message.setCreationDate(event.getMessage().getCreationTime().toInstant());
        message.setLocalDate(date);
        messageRepository.save(message);
    }

    private Channel createChannelIfDoesNotExist(MessageReceivedEvent event) {
        Channel channel;
        Optional<Channel> channelOptional = channelRepository.findByName(event.getChannel().getName());
        if (channelOptional.isPresent()) {
            channel = channelOptional.get();
        } else {
            channel = new Channel();
            channel.setType(event.getChannelType().name());
            channelRepository.save(channel);
        }
        return channel;
    }

    private Author createAuthorIfDoesNotExist(MessageReceivedEvent event) {
        Author author;
        Optional<Author> byName = authorRepository.getByName(event.getAuthor().getName());
        if (byName.isPresent()) {
            author = byName.get();
        } else {
            author = new Author();
            author.setName(event.getAuthor().getName());
            author.setAvatarUrl(event.getAuthor().getAvatarUrl());
            author.setCreationDate(event.getAuthor().getCreationTime().toInstant());
            authorRepository.save(author);
        }
        return author;
    }
}
