/**
 * 
 */
package com.spotoyou;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.List;
import java.util.Properties;
import java.util.concurrent.TimeUnit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.auth.oauth2.StoredCredential;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.json.GoogleJsonResponseException;
import com.google.api.client.http.HttpRequest;
import com.google.api.client.http.HttpRequestInitializer;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.util.store.DataStore;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.model.Playlist;
import com.google.api.services.youtube.model.PlaylistItem;
import com.google.api.services.youtube.model.PlaylistItemSnippet;
import com.google.api.services.youtube.model.PlaylistSnippet;
import com.google.api.services.youtube.model.PlaylistStatus;
import com.google.api.services.youtube.model.ResourceId;
import com.google.api.services.youtube.model.SearchListResponse;
import com.google.api.services.youtube.model.SearchResult;
import com.google.common.collect.Lists;

/**
 * @author Sofian Faiz
 *
 */
public class MyYoutubeApi {

	private static YouTube youtube;
	private static String VIDEO_ID = "";
	private static Properties properties = new Properties();
	private static final long NUMBER_OF_VIDEOS_RETURNED = 5;
	public static final JsonFactory JSON_FACTORY = new JacksonFactory();
	private static final String PROPERTIES_FILENAME = "youtube.properties";
	private static final String CREDENTIALS_DIRECTORY = ".oauth-credentials";
	public static final HttpTransport HTTP_TRANSPORT = new NetHttpTransport();
	private static final Logger log = LoggerFactory.getLogger(SpoToYouApplication.class);

	public static void createPlaylist(String[] searchTerms) {
		List<String> scopes = Lists.newArrayList("https://www.googleapis.com/auth/youtube");
		try {
			InputStream in = MyYoutubeApi.class.getResourceAsStream("/" + PROPERTIES_FILENAME);
			properties.load(in);

		} catch (IOException e) {
			System.err.println(
					"There was an error reading " + PROPERTIES_FILENAME + ": " + e.getCause() + " : " + e.getMessage());
			System.exit(1);
		}

		try {
			Credential credential = authorize(scopes, "playlistupdates");
			log.info("authorization successfull");

			youtube = new YouTube.Builder(HTTP_TRANSPORT, JSON_FACTORY, credential)
					.setApplicationName("youtube-cmdline-playlistupdates-sample").build();
			log.info("youtube builder successfull");
			
			TimeUnit.SECONDS.sleep(1);

			String playlistId = insertPlaylist();
			log.info("playlist inserted");
			
			TimeUnit.SECONDS.sleep(1);
			
			for (int i = 0; i < MySpotifyApi.getPlaylistLength(); i++) {
				VIDEO_ID = getVideoId(searchTerms[i]);
				log.info("item " + i + " id retrieved");
				
				TimeUnit.SECONDS.sleep(1);
				
				insertPlaylistItem(playlistId, VIDEO_ID);
				log.info("item inserted");
			}

		} catch (GoogleJsonResponseException e) {
			System.err.println(
					"There was a service error: " + e.getDetails().getCode() + " : " + e.getDetails().getMessage());
			e.printStackTrace();
		} catch (IOException e) {
			System.err.println("IOException: " + e.getMessage());
			e.printStackTrace();
		} catch (Throwable t) {
			System.err.println("Throwable: " + t.getMessage());
			t.printStackTrace();
		}
	}

	public static Credential authorize(List<String> scopes, String credentialDatastore) throws IOException {

		Reader clientSecretReader = new InputStreamReader(
				MyYoutubeApi.class.getResourceAsStream("/client_secrets.json"));
		GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(JSON_FACTORY, clientSecretReader);

		if (clientSecrets.getDetails().getClientId().startsWith("Enter")
				|| clientSecrets.getDetails().getClientSecret().startsWith("Enter ")) {
			System.out.println(
					"Enter Client ID and Secret from https://console.developers.google.com/project/_/apiui/credential "
							+ "into src/main/resources/client_secrets.json");
			System.exit(1);
		}

		FileDataStoreFactory fileDataStoreFactory = new FileDataStoreFactory(
				new File(System.getProperty("user.home") + "/" + CREDENTIALS_DIRECTORY));
		DataStore<StoredCredential> datastore = fileDataStoreFactory.getDataStore(credentialDatastore);

		GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(HTTP_TRANSPORT, JSON_FACTORY,
				clientSecrets, scopes).setCredentialDataStore(datastore).build();

		LocalServerReceiver localReceiver = new LocalServerReceiver.Builder().setPort(8080).build();

		return new AuthorizationCodeInstalledApp(flow, localReceiver).authorize("user");
	}

	private static String insertPlaylist() throws IOException {

		PlaylistSnippet playlistSnippet = new PlaylistSnippet();
		playlistSnippet.setTitle(MySpotifyApi.getPlaylistName());
		playlistSnippet.setDescription("A private playlist replicated from Spotify");
		PlaylistStatus playlistStatus = new PlaylistStatus();
		playlistStatus.setPrivacyStatus("private");

		Playlist youTubePlaylist = new Playlist();
		youTubePlaylist.setSnippet(playlistSnippet);
		youTubePlaylist.setStatus(playlistStatus);

		YouTube.Playlists.Insert playlistInsertCommand = youtube.playlists().insert("snippet,status", youTubePlaylist);
		Playlist playlistInserted = playlistInsertCommand.execute();

		System.out.println("New Playlist name: " + playlistInserted.getSnippet().getTitle());
		System.out.println(" - Privacy: " + playlistInserted.getStatus().getPrivacyStatus());
		System.out.println(" - Description: " + playlistInserted.getSnippet().getDescription());
		System.out.println(" - Posted: " + playlistInserted.getSnippet().getPublishedAt());
		System.out.println(" - Channel: " + playlistInserted.getSnippet().getChannelId() + "\n");
		return playlistInserted.getId();

	}

	private static String insertPlaylistItem(String playlistId, String videoId) throws IOException {

		ResourceId resourceId = new ResourceId();
		resourceId.setKind("youtube#video");
		resourceId.setVideoId(videoId);

		PlaylistItemSnippet playlistItemSnippet = new PlaylistItemSnippet();
		playlistItemSnippet.setTitle("First video in the test playlist");
		playlistItemSnippet.setPlaylistId(playlistId);
		playlistItemSnippet.setResourceId(resourceId);

		PlaylistItem playlistItem = new PlaylistItem();
		playlistItem.setSnippet(playlistItemSnippet);

		YouTube.PlaylistItems.Insert playlistItemsInsertCommand = youtube.playlistItems()
				.insert("snippet,contentDetails", playlistItem);
		PlaylistItem returnedPlaylistItem = playlistItemsInsertCommand.execute();

		System.out.println("New PlaylistItem name: " + returnedPlaylistItem.getSnippet().getTitle());
		System.out.println(" - Video id: " + returnedPlaylistItem.getSnippet().getResourceId().getVideoId());
		System.out.println(" - Posted: " + returnedPlaylistItem.getSnippet().getPublishedAt());
		System.out.println(" - Channel: " + returnedPlaylistItem.getSnippet().getChannelId());
		return returnedPlaylistItem.getId();

	}

	public static String getVideoId(String searchTerm) {
		String Id = "KXcChl2Gj8I";
		try {
			youtube = new YouTube.Builder(HTTP_TRANSPORT, JSON_FACTORY, new HttpRequestInitializer() {
				public void initialize(HttpRequest request) throws IOException {
				}
			}).setApplicationName("SpoToYou").build();

			String queryTerm = searchTerm;

			YouTube.Search.List search = youtube.search().list("id,snippet");

			String apiKey = properties.getProperty("youtube.apikey");
			search.setKey(apiKey);
			search.setQ(queryTerm);

			search.setType("video");

			search.setFields("items(id/kind,id/videoId,snippet/title,snippet/thumbnails/default/url)");
			search.setMaxResults(NUMBER_OF_VIDEOS_RETURNED);

			SearchListResponse searchResponse = search.execute();
			List<SearchResult> searchResultList = searchResponse.getItems();
			ResourceId resourceId = searchResultList.get(0).getId();
			if (resourceId.getKind().equals("youtube#video")) {
				log.info("is video");
				Id = resourceId.getVideoId();
				log.info("Id: " + Id);
			}

		} catch (GoogleJsonResponseException e) {
			System.err.println(
					"There was a service error: " + e.getDetails().getCode() + " : " + e.getDetails().getMessage());
		} catch (IOException e) {
			System.err.println("There was an IO error: " + e.getCause() + " : " + e.getMessage());
		} catch (Throwable t) {
			t.printStackTrace();
		}
		return Id;
	}
}