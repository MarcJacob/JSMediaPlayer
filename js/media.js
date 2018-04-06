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

// Event listeners

document.addEventListener("PlaylistElementCreated", onPlaylistElementAdded);

mediaControls.children.item(0).addEventListener("click", onPause);

videoScreen.addEventListener("ended", onCurrentElementEnded);

//

// Event handlers

function onPlaylistElementAdded(event)
{
    if (currentElement === null)
        {
            console.log("No source");
            setElementAsSource(event.element);
        }
}

function setElementAsSource(element)
{
    // get element type
    var splitString = element.children.item(3).value.split(".");
    var extension = splitString[splitString.length-1];
        videoScreen.children.item(0).src = element.children.item(3).value;
    currentElement = videoScreen.children.item(0).src;
        videoScreen.children.item(0).type = "video/mp4";
    videoScreen.load();
    videoScreen.play();
}

function onCurrentElementEnded(element)
{
    currentElement = null;
    // On enlève le premier élément de la playlist.
    list.removeChild(list.children.item(0));
}

function onPause(e)
{
    if (videoScreen.paused)
        {
            mediaControls.children.item(0).textContent = "Pause";
            videoScreen.play();
        }
    else
        {
            mediaControls.children.item(0).textContent = "Resume";
            videoScreen.pause();
        }
}

function onSkip(e)
{
    onCurrentElementEnded(e);
}

// ______________________________________

// Barre de progression
progressUpdate();
function progressUpdate()
{
    if (currentElement !== null && videoScreen.duration !== undefined && videoScreen.duration !== null && videoScreen.duration !== 0)
        {
    mediaControls.children.item(2).value = videoScreen.currentTime / videoScreen.duration * 100;
        }
    setTimeout(progressUpdate, 500);
}