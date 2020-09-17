var listOfTracks =document.getElementById("listOfTracks");
var tracks = listOfTracks.children;
var usernameTextField = document.getElementById("enterUsername");
var playlistIdTextField = document.getElementById("enterPlaylistId");

//eventtrigger when enter pressed
usernameTextField.addEventListener("keydown", function(event){
    if (event.keyCode === 13) {
        checkIfEmpty("enter");
    }
})
//eventtrigger when enter pressed
playlistIdTextField.addEventListener("keydown", function(event){
    if (event.keyCode === 13) {
        getPlaylistById();
    }
})
//checks all tracks
function checkAll(){
    for (let index = 0; index < tracks.length; index++){
        tracks[index].children[0].children[2].checked = true;
    }
}
//unchecks all tracks
function uncheckAll(){
    for (let index = 0; index < tracks.length; index++){
        tracks[index].children[0].children[2].checked = false;
    }
}
//deletes all li from an ul
function deleteLi(ulId){
    var ul = document.getElementById(ulId)
    while( ul.firstChild ){
        ul.removeChild( ul.firstChild );
    }
}
//changes the section that is shown
function changeActiveSection(newActiveSection){
    var sections = document.getElementsByClassName("section")
    for (let index = 0; index < sections.length; index++) {
        sections[index].classList.remove("activeSection");
    }
    var activeSection = document.getElementById(newActiveSection)
    activeSection.classList.add("activeSection");
    if(newActiveSection!=="playlistSelection"){
        deleteLi("listOfPlaylist");
        console.log("list of playlist cleared");
    }
    if(newActiveSection!=="trackSelection"){
        deleteLi("listOfTracks");
        console.log("tracklist cleared");
    }
    console.log("active section changed to: "+ newActiveSection);
    console.log("-------------------------------------");
}
//checks if empty, if yes rewrites Instruction, if not triggers all needed functions
function checkIfEmpty(eventType){
    var username = usernameTextField.value;
    username = username.trim();
    usernameTextField.value = "";
    if (username == ""){
        if(eventType == "button"){
            var alertMessage = document.createTextNode("Please Type in your Spotify username befor using the button")
        }
        else if(eventType == "enter"){
            var alertMessage = document.createTextNode("Please Type in your Spotify username befor pressing enter")
        }
        var newInstruction = document.createElement("h2").appendChild(alertMessage);
        var instruction = document.getElementsByClassName("logInh2");
        instruction.parentNode.replaceChild(newInstruction, instruction);
        newInstruction.id = "logInh2";
    }
    else{
        getUsersPlaylists(username);
    }
}

function getPlaylistById(){
    var playlistId = playlistIdTextField.value;
    console.log("playlist Id: " + playlistId + " entered")
    playlistId = playlistId.trim();
    playlistIdTextField.value = "";
    if (playlistId == ""){
        var newInstruction = document.createElement("h2").appendChild("Please enter an id befor confirming");
        var instruction = document.getElementsByClassName("playlistByIdh2");
        instruction.parentNode.replaceChild(newInstruction, instruction);
        newInstruction.id = "playlistByIdh2";
    }
    else{
        getPlaylistTracks(playlistId);
    }
}
//creates a new playlist as a li
function createPlaylistLi(playlistName,playlistImg,playlistId){
    var listOfPlaylist = document.getElementById("listOfPlaylist");
    var newPlaylistLi = document.createElement("li");
        newPlaylistLi.classList.add("playlist");
    var newButton = document.createElement("button");
        newButton.classList.add("playlistButton");
        newButton.addEventListener("click", function(event){
            getPlaylistTracks(playlistId);
        })
    var newImg = document.createElement("img");
        newImg.src = playlistImg;
        newImg.alt = "image of that playlist";
        newImg.style = "float: left;";
    var newP = document.createElement("p");
    newP.appendChild(document.createTextNode(playlistName));
    newButton.appendChild(newImg);
    newButton.appendChild(newP);
    newPlaylistLi.appendChild(newButton);
    listOfPlaylist.appendChild(newPlaylistLi);
    console.log(`playlist: ${playlistName} wurde erstellt`);
}
//return the username and getting arr of that user´s playlists
function getUsersPlaylists(username){
    var url = "http://localhost:8080/getPlaylistsfrom?user=" + username;
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      }      
    fetch (url, requestOptions)
    .then (response => {
        if (response.ok){
            console.log("Playlist creation for "+ username + "started");
            console.log(response);
            return response.json();
        }
        else{
            alert("username not found please use a valid username");
        }
    })
    .then(myJson => {
        console.log(myJson);
        for (let index = 0; index < myJson.length; index++) {
            createPlaylistLi(myJson[index].Name,myJson[index].Img,myJson[index].Id);
        }
    })
    .then( () => {
        changeActiveSection("playlistSelection");
    })
    .catch(error => {
        console.log(error);
        alert("ERROR - please try again")
    })
}
//creates a new track as a li
function createTrackLi(trackName,trackImg){
    var newTrackLi = document.createElement("li");
    var newLabel = document.createElement("label");
        newLabel.classList.add("track");
    var newImg = document.createElement("img");
        newImg.src = trackImg;
        newImg.alt = "image of the cover";
        newImg.style = "float: left;";
    var newP = document.createElement("p");
        newP.appendChild(document.createTextNode(trackName));
    var newCheckbox = document.createElement("input");
        newCheckbox.setAttribute("type","checkbox");
        newCheckbox.setAttribute("checked","checkbox");
    var newCheckmark = document.createElement("span");
        newCheckmark.classList.add("checkmark");
    newLabel.appendChild(newImg);
    newLabel.appendChild(newP);
    newLabel.appendChild(newCheckbox);
    newLabel.appendChild(newCheckmark);
    newTrackLi.appendChild(newLabel);
    listOfTracks.appendChild(newTrackLi);
    console.log(`Track: ${trackName} wurde erstellt`);
}
//return the playlist id and getting arr of that playlist´s tracks
function getPlaylistTracks(id){
    var url = "http://localhost:8080/getSongsfor?spotId=" + id;
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      }      
    fetch (url, requestOptions)
    .then (response => {
        if (response.ok){
            console.log("Track creation for playlist with id :" + id+ "started");
            console.log(response);
            return response.json();
        }
        else{
            alert("something gone wrong please try again")
            changeActiveSection("logIn");
        }
    })
    .then(myJson => {
        console.log(myJson);
        for (let index = 0; index < myJson.length; index++) {
            createTrackLi(myJson[index].Name,myJson[index].Img);
        }
    })
    .then( () => {
        changeActiveSection("trackSelection");
    })
    .catch(error => {
        console.log(error);
        alert("ERROR - please try again")
        changeActiveSection("logIn");
    })
}
//craeting and returning arr of tracks und getting a link
function convertPlaylist(){
    var search = [];
    for (let index = 0; index < tracks.length; index++) {
        if(tracks[index].children[0].children[2].checked){
            search.push(tracks[index].children[0].children[1].textContent);
        }
    }
    console.log(search);
    //return arr of Tracks to "youtube"
    changeActiveSection("endScreen");
}
//returns the link of the converted Playlist
function returnLink(){
    alert("here should be your link:)");
}
