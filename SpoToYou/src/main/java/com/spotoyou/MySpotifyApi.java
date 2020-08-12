/**
 * 
 */
package com.spotoyou;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URISyntaxException;
import java.net.URL;

import org.apache.hc.core5.http.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.wrapper.spotify.SpotifyApi;
import com.wrapper.spotify.exceptions.SpotifyWebApiException;
import com.wrapper.spotify.model_objects.credentials.ClientCredentials;
import com.wrapper.spotify.model_objects.specification.Paging;
import com.wrapper.spotify.model_objects.specification.Playlist;
import com.wrapper.spotify.model_objects.specification.PlaylistTrack;
import com.wrapper.spotify.requests.authorization.client_credentials.ClientCredentialsRequest;
import com.wrapper.spotify.requests.data.playlists.GetPlaylistRequest;
import com.wrapper.spotify.requests.data.playlists.GetPlaylistsItemsRequest;

/**
 * @author Sofian Faiz
 *
 */
public class MySpotifyApi {

	private static String Name = "";
	private static int Length = 0;
	private static String token = "";
	private static final Logger log = LoggerFactory.getLogger(MySpotifyApi.class);

	public static void setAnonymousToken(String clientId, String clientSecret) {
		try {
			SpotifyApi spotifyApi = new SpotifyApi.Builder().setClientId(clientId).setClientSecret(clientSecret)
					.build();

			ClientCredentialsRequest clientCredentialsRequest = spotifyApi.clientCredentials().build();

			final ClientCredentials clientCredentials = clientCredentialsRequest.execute();

			token = clientCredentials.getAccessToken();
//				spotifyApi.setAccessToken(token);

			log.info("Expires in: " + clientCredentials.getExpiresIn());
		} catch (IOException | SpotifyWebApiException | ParseException e) {
			log.info("Error: " + e.getMessage());
		}
	}

	public static String getPlaylist(String Id) throws URISyntaxException {
		final SpotifyApi spotifyApi = new SpotifyApi.Builder().setAccessToken(token).build();
		final GetPlaylistRequest getPlaylistRequest = spotifyApi.getPlaylist(Id)
//		          .fields("description")
//		          .market(CountryCode.SE)
//		          .additionalTypes("track,episode")
				.build();
		final GetPlaylistsItemsRequest getPlaylistsItemsRequest = spotifyApi.getPlaylistsItems(Id)
//				          .fields("description")
//				          .market(CountryCode.SE)
//				          .additionalTypes("track,episode")
				.build();

		try {
			final Playlist playlist = getPlaylistRequest.execute();
			Paging<PlaylistTrack> items = getPlaylistsItemsRequest.execute();
			String Uri = getPlaylistsItemsRequest.getUri().toString();
			Name = playlist.getName();
			Length = items.getTotal();
			String Json = "";

			if (items.getLimit() > 99) {
				Json = "[\n";
				for (int i = 0; i < (Length / 100) + 1; i++) {
					URL url = new URL(Uri + "?offset=" + i * 100 + "&limit=100");
					HttpURLConnection con = (HttpURLConnection) url.openConnection();
					con.setRequestMethod("GET");
					con.setRequestProperty("Authorization", "Bearer " + token);
					BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
					String inputLine;
					StringBuffer content = new StringBuffer();
					while ((inputLine = in.readLine()) != null) {
						content.append(inputLine + "\n");
					}
					in.close();
					con.disconnect();
					if (i == (Length/100)) {
						Json = Json + content;
					} else {
						Json = Json + content + ",";
					}
				}
				Json = Json + "\n]";
			} else {
				Json = "{\n\"Json\": " + getPlaylistsItemsRequest.getJson() + "\n}";
			}

			File filename = new File("C:\\Tmp\\WorkingDirectory\\" + Name + ".json");
			if (filename.createNewFile()) {
				log.info("File is created!");
			} else {
				log.info("File already exists.");
			}

			FileWriter writer = new FileWriter(filename);
			writer.write(Json);
			writer.close();

			return Json;
		} catch (IOException | SpotifyWebApiException | ParseException e) {
			log.info("Error: " + e.getMessage());
			return "Error: " + e.getMessage();
		}
	}

	public static String getPlaylistName() {
		return Name;
	}
	
	public static int getPlaylistLength() {
		return Length;
	}
}