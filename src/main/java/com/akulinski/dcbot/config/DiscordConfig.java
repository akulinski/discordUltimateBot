package com.akulinski.dcbot.config;


import com.akulinski.dcbot.events.listeners.DiscordEventListener;
import com.google.common.eventbus.EventBus;
import net.dv8tion.jda.core.AccountType;
import net.dv8tion.jda.core.JDA;
import net.dv8tion.jda.core.JDABuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.security.auth.login.LoginException;

@Configuration
public class DiscordConfig {

    private final ApplicationContext applicationContext;

    @Value("${discord.token}")
    private String token;


    public DiscordConfig(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }

    @Bean
    public JDA getDiscord() throws LoginException {

        JDABuilder jdaBuilder = new JDABuilder(AccountType.BOT)
            .setToken(token);

        applicationContext.getBeansWithAnnotation(DiscordEventListener.class)
            .values().forEach(jdaBuilder::addEventListener);

        return jdaBuilder.buildAsync();
    }
}
