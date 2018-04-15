// Ensemble de fonctions utilitaires
// de manipulation de la section "media".

// La section media va lire le fichier actuel s'il y en a un, sinon il passe au
// prochain dans la playlist.

// Si la playlist est vide, alors elle attend qu'un élément soit ajouté.

// Interface

var mediaControls = document.getElementById("controls");
var videoScreen = document.getElementById("media").children.item(0);
var audioImage = document.getElementById("media").children.item(1);
var currentElement = null; // Element (vidéo ou audio) entrain d'être lu.
//


// Event handlers



function setElementAsSource(element) {
    "use strict";
    // get element type
    var splitString = element.children.item(3).value.split(".");
    var extension = splitString[splitString.length - 1];
    videoScreen.children.item(0).src = element.children.item(3).value;
    currentElement = videoScreen.children.item(0).src;
    videoScreen.children.item(0).type = "video/mp4";
    videoScreen.load();
    videoScreen.play();
}


function onCurrentElementRemoved(event) {
    "use strict";
    currentElement = null;
    videoScreen.children.item(0).src = "";
    mediaControls.children.item(2).value = 0;
    videoScreen.load();
    if (list.children.item(1) !== null && list.children.item(1) !== undefined) {
        setElementAsSource(list.children.item(1));
    }
}


function onPlaylistElementAdded(event) {
    "use strict";
    if (currentElement === null) {
        console.log("No source");
        setElementAsSource(event.element);
    }
}

function onCurrentElementEnded(element) {
    "use strict";
    currentElement = null;
    videoScreen.children.item(0).src = null;
    // On enlève le premier élément de la playlist.
    list.removeChild(list.children.item(0));
    // On met le prochain élément de la playlist (qui se trouve maintenant en première position) en source.
    setElementAsSource(list.children.item(0));
}

function onPause(e) {
    "use strict";
    if (videoScreen.paused) {
        mediaControls.children.item(0).textContent = "Pause";
        videoScreen.play();
    } else {
        mediaControls.children.item(0).textContent = "Resume";
        videoScreen.pause();
    }
}

function onSkip(e) {
    "use strict";
    onCurrentElementEnded(e);
}

// ______________________________________

// Barre de progression
function progressUpdate() {
    "use strict";
    if (currentElement !== null && videoScreen.duration !== undefined && videoScreen.duration !== null && videoScreen.duration !== 0) {
        mediaControls.children.item(2).value = videoScreen.currentTime / videoScreen.duration * 100;
    }
    setTimeout(progressUpdate, 500);
}

progressUpdate();


// Event listeners

document.addEventListener("PlaylistElementCreated", onPlaylistElementAdded);

document.addEventListener("PlaylistFirstElementRemoved", onCurrentElementRemoved);

mediaControls.children.item(0).addEventListener("click", onPause);

mediaControls.children.item(1).addEventListener("click", onSkip);

videoScreen.addEventListener("ended", onCurrentElementEnded);

//