package com.spotoyou;

import java.io.IOException;
import java.net.URISyntaxException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@SpringBootApplication
public class SpoToYouApplication {
	
	public static String user = "";
	public static String clientId = "9a261e597df34f06a8318172c88d7bd4";
	public static String clientSecret = "f7ad54843db94376b003418b03f7700e";
	public static String successmessage = "playlist replicated successfully";
	private static final Logger log = LoggerFactory.getLogger(SpoToYouApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(SpoToYouApplication.class, args);
	}
	
	@GetMapping("/replicatePlaylist")
	public String replicatePlaylist(@RequestParam(value = "spotId", defaultValue = "7kRrpb1iLm7SqHvpIAjRrh") String spotId) throws Exception {
		String[] searchTerms = new String[0];
		String rawdata = "";
		
		//Spotify
		MySpotifyApi.setAnonymousToken(clientId, clientSecret);
		log.info("token set successfull");
		try {
			rawdata = MySpotifyApi.getPlaylist(spotId);
			log.info("data acquiry successfull");
		} catch (URISyntaxException e) {
			e.printStackTrace();
			log.info("data acquiry failed");
		}
		
		//Mapping
		searchTerms = mapping(rawdata);
		log.info("mapping successfull");

		//Youtube
		MyYoutubeApi.createPlaylist(searchTerms);
		log.info(successmessage);
		return successmessage;
	}
	
	public String[] mapping(String json) throws IOException {
		String song = "";
		String artist = "";
		String[] list = new String[MySpotifyApi.getPlaylistLength()];
		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(json);
		for (int i = 0; i < jsonNode.size(); i++) {
			for (int j = 0; j < jsonNode.get(i).size(); j++) {
				song = jsonNode.get(i).get("items").get(j).get("track").get("name").asText();
				artist = jsonNode.get(i).get("items").get(j).get("track").get("artists").get(0).get("name").asText();
				list[j * i] = song + " by " + artist;
			};
		};
		return list;
	}
}
