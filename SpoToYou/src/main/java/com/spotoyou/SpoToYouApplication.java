package com.spotoyou;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.net.URISyntaxException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	
	@GetMapping("/getPlaylistsfrom")
	public String getPlaylistsfrom(@RequestParam(value = "user", defaultValue = "spotify") String user) 
			throws Exception {
		String rawdata = "";
		String playlists = "";
		
		// Spotify
		MySpotifyApi.setAnonymousToken(clientId, clientSecret);
		log.info("token set successfull");
		rawdata = MySpotifyApi.getUser(user);
		log.info("data acquiry successfull");

		// Mapping
		playlists = mappingOne(rawdata);
		log.info("mapping successfull");
		log.info(playlists);

		return playlists;
	}

	@GetMapping("/getSongsfor")
	public String getSongsfor(@RequestParam(value = "spotId", defaultValue = "7kRrpb1iLm7SqHvpIAjRrh") String spotId)
			throws Exception {
		String songs = "";
		String rawdata = "";

		// Spotify
		MySpotifyApi.setAnonymousToken(clientId, clientSecret);
		log.info("token set successfull");
		try {
			rawdata = MySpotifyApi.getPlaylist(spotId);
			log.info("data acquiry successfull");
		} catch (URISyntaxException e) {
			e.printStackTrace();
			log.info("data acquiry failed");
		}

		// Mapping
		songs = mappingTwo(rawdata);
		log.info("mapping successfull");
		log.info(songs);

		return songs;
	}

	@PostMapping("/postSongs")
	public String postSongs(@RequestBody String songs) throws IOException {
		
		//Mapping
		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(songs);
		int size = jsonNode.size();
		String searchTerms[] = new String[size];
		for (int i=0; i < size; i++) {
			searchTerms[i] = jsonNode.get(i).toString();
		}
		
		//Youtube
		MyYoutubeApi.insertPlaylistItem("PLn16NZ5qTMRhMaAL2-ZaZt9tpq8jgpPHi","AvtVuHMqOOM");
//		MyYoutubeApi.createPlaylist(searchTerms);
		log.info(songs);
		return successmessage;
	}

	public String mappingOne(String json) throws IOException {
		int imgs = 0;
		String id = "";
		String img = "";
		String name = "";
		String jsonlist = "[\n";
		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(json);
		int num = jsonNode.get("items").size();
		String[] idlist = new String[num];
		String[] namelist = new String[num];
		String[] imglist = new String[num];
		log.info("Playlists: " + num);
		for (int i = 0; i < num; i++) {
			id = jsonNode.get("items").get(i).get("id").asText();
			name = jsonNode.get("items").get(i).get("name").asText();
			imgs = jsonNode.get("items").get(i).get("images").size()-1;
			img = jsonNode.get("items").get(i).get("images").get(imgs).get("url").asText();
			namelist[i] = name;
			imglist[i] = img;
			idlist[i] = id;
			if (i == num-1) {
				jsonlist = jsonlist + "{\"Name\":\"" + namelist[i] + "\",\n\"Img\":\"" + imglist[i] + "\",\n\"Id\":\"" + idlist[i] + "\"}\n";
			} else {
				jsonlist = jsonlist + "{\"Name\":\"" + namelist[i] + "\",\n\"Img\":\"" + imglist[i] + "\",\n\"Id\":\"" + idlist[i] + "\"},\n";
			}
			log.info("Round " + i);
		};
		jsonlist = jsonlist + "]";
		
		JsonNode finaljsonNode = objectMapper.readTree(jsonlist);
		jsonlist = finaljsonNode.toPrettyString();

		File filename = new File("C:\\Tmp\\WorkingDirectory\\" + MySpotifyApi.getPlaylistName() + "List.json");
		if (filename.createNewFile()) {
			log.info("File is created!");
		} else {
			log.info("File already exists.");
		}

		FileWriter writer = new FileWriter(filename);
		writer.write(jsonlist);
		writer.close();

		return jsonlist;
	}

	public String mappingTwo(String json) throws IOException {
		int pagenum = 0;
		String img = "";
		String song = "";
		String artist = "";
		String jsonlist = "[\n";
		int num = MySpotifyApi.getPlaylistLength();
		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(json);
		String[] namelist = new String[num];
		String[] imglist = new String[num];
		pagenum = jsonNode.size();
		for (int i = 0; i < pagenum; i++) {
			for (int j = 0; j < jsonNode.get(i).get("items").size(); j++) {
				num = i * 100 + j;
				song = jsonNode.get(i).get("items").get(j).get("track").get("name").asText();
				artist = jsonNode.get(i).get("items").get(j).get("track").get("artists").get(0).get("name").asText();
				img = jsonNode.get(i).get("items").get(j).get("track").get("album").get("images").get(2).get("url")
						.asText();
				namelist[num] = artist + " - " + song;
				imglist[num] = img;
				if (i == (pagenum - 1) & j == (jsonNode.get(pagenum - 1).get("items").size() - 1)) {
					jsonlist = jsonlist + "{\"Name\":\"" + namelist[num] + "\",\n\"Img\":\"" + imglist[num] + "\"}\n";
				} else {
					jsonlist = jsonlist + "{\"Name\":\"" + namelist[num] + "\",\n\"Img\":\"" + imglist[num] + "\"},\n";
				}
			}
			;
		}
		;
		jsonlist = jsonlist + "\n]";
		JsonNode finaljsonNode = objectMapper.readTree(jsonlist);
		jsonlist = finaljsonNode.toPrettyString();

		File filename = new File("C:\\Tmp\\WorkingDirectory\\" + MySpotifyApi.getPlaylistName() + "List.json");
		if (filename.createNewFile()) {
			log.info("File is created!");
		} else {
			log.info("File already exists.");
		}

		FileWriter writer = new FileWriter(filename);
		writer.write(jsonlist);
		writer.close();

		return jsonlist;
	}
}
