package com.akulinski.dcbot.service;

import com.akulinski.dcbot.domain.Author;
import com.akulinski.dcbot.domain.Channel;
import com.akulinski.dcbot.domain.Message;
import com.akulinski.dcbot.repository.AuthorRepository;
import com.akulinski.dcbot.repository.ChannelRepository;
import com.akulinski.dcbot.repository.MessageRepository;
import com.akulinski.dcbot.repository.search.AuthorSearchRepository;
import com.akulinski.dcbot.repository.search.ChannelSearchRepository;
import com.akulinski.dcbot.repository.search.MessageSearchRepository;
import net.dv8tion.jda.core.entities.TextChannel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.ZoneId;
import java.util.Date;
import java.util.Optional;

@Service
public class TextChannelService {
    private Logger logger = LoggerFactory.getLogger(TextChannelService.class);

    private final AuthorSearchRepository authorSearchRepository;

    private final ChannelRepository channelRepository;

    private final ChannelSearchRepository channelSearchRepository;

    private final AuthorRepository authorRepository;

    private final MessageRepository messageRepository;

    private final Environment environment;

    private final MessageSearchRepository messageSearchRepository;

    private boolean isDev = false;

    public TextChannelService(ChannelSearchRepository channelSearchRepository, ChannelRepository channelRepository, AuthorRepository authorRepository, MessageRepository messageRepository, Environment environment, AuthorSearchRepository authorSearchRepository, MessageSearchRepository messageSearchRepository) {
        this.channelSearchRepository = channelSearchRepository;
        this.channelRepository = channelRepository;
        this.authorRepository = authorRepository;
        this.messageRepository = messageRepository;
        this.environment = environment;
        this.authorSearchRepository = authorSearchRepository;
        this.messageSearchRepository = messageSearchRepository;
    }

    public void createTextChannelIfDoesntExist(TextChannel textChannel) {
        boolean presentInChannelRepository = channelRepository.findByName(textChannel.getName()).isPresent();
        boolean presentInChannelSearchRepository = channelSearchRepository.getByName(textChannel.getName()).isPresent();


        if (!presentInChannelRepository || !presentInChannelSearchRepository) {
            Channel channel = new Channel();
            channel.setName(textChannel.getName());
            channel.setType(textChannel.getType().name());

            if (!presentInChannelRepository) {
                channelRepository.save(channel);
            }

            if (!presentInChannelSearchRepository) {
                channelSearchRepository.save(channel);
            }
        }

        boolean dataLoaded = messageRepository.count() > 100;

        for (String activeProfile : environment.getActiveProfiles()) {
            if (activeProfile.equals("dev")) {
                isDev = true;
            }
        }
        if (isDev && !dataLoaded) {
            loadDataToChannel(textChannel, channelRepository.findByName(textChannel.getName()).get());
        }
    }

    private void loadDataToChannel(TextChannel textChannel, Channel channel) {
        textChannel.getIterableHistory().forEach(message -> {
            Date date = Date.from(message.getCreationTime().toLocalDate().atStartOfDay(ZoneId.systemDefault()).toInstant());
            Optional<Message> byContentAndLocalDate = messageRepository.getByHashcode(message.hashCode());
            if (!byContentAndLocalDate.isPresent()) {
                Message messageEntity = new Message();
                Optional<Author> authorOptional = authorRepository.getByName(message.getAuthor().getName());
                Author author = null;

                if (authorOptional.isPresent()) {
                    author = authorOptional.get();
                } else {
                    author = new Author();
                    author.setName(message.getAuthor().getName());
                    author.setAvatarUrl(message.getAuthor().getAvatarUrl());
                    author.setCreationDate(Instant.now());
                    authorRepository.save(author);
                    authorSearchRepository.save(author);
                }
                logger.debug(message.getContentRaw());
                messageEntity.setContent(message.getContentRaw());
                messageEntity.setAuthor(author);
                messageEntity.setCreationDate(message.getCreationTime().toInstant());

                messageEntity.setLocalDate(date);
                messageEntity.setChannel(channel);
                messageEntity.setHashcode(message.hashCode());
                messageRepository.save(messageEntity);
                messageSearchRepository.save(messageEntity);
            }
        });
    }
}
