package com.example.demo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.demo.user.User;
import com.example.demo.user.UserService;

@SpringBootApplication
public class VideochattingApplication {

	public static void main(String[] args) {
		SpringApplication.run(VideochattingApplication.class, args);
	}
	@Bean
	public CommandLineRunner commandLineRunner(
		UserService service
	)
	{
		return args ->{
			service.register(User.builder()
					.username("Areeb")
					.email("areeb@gmail.com")
					.password("123")
			.build()	
			);
	
		};
	}
}
