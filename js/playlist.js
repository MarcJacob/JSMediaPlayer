// Interface

var controls = document.getElementById("playlistControls");
// 0 = bouton d'ajout
// 1 = input contenant le lien vers l'élément
// 2 = Bouton pour ajouter un podcast

var list = document.getElementById("list");

//

// Création d'un élément de la liste 

var listElement = document.createElement("div");
listElement.className = "playlistElement";
listElement.appendChild(document.createElement("button")); // Création bouton supprimer.
listElement.appendChild(document.createElement("button")); // Création bouton augmenter priorité.gt 'èg
listElement.appendChild(document.createElement("button")); // Création bouton baisser priorité.
listElement.appendChild(document.createElement("textarea"));

listElement.children.item(0).textContent = "x";
listElement.children.item(1).textContent = "-";
listElement.children.item(2).textContent = "+";
// Sera cloné à l'ajout d'un élément à la playlist.



// FONCTIONS RELATIVES AUX ELEMENTS DE PLAYLIST

// Fonctions de manipulation des éléments de la playlist

function onPlaylistElementDelete(element)
{
    list.removeChild(element);
    // TODO : Vérifier que l'élément ne soit pas en cours
    // de lecture. Si c'est le cas, interrompre la lecture
    // et passer au prochain élément.
}

function onPlaylistElementPriorityUp(element)
{
    if (list.children.length > element.priority+1)
        {
            console.log(element.priority);
            list.insertBefore(list.children.item(element.priority+1), element);
            list.children.item(element.priority).priority--;
            element.priority++;
        }
}

function onPlaylistElementPriorityDown(element)
{
    if (element.priority > 0)
        {
            list.insertBefore(element, list.children.item(element.priority-1));
            list.children.item(element.priority).priority++;
            element.priority--;
        }
}

// Renvoi un nouvel élément de playlist contenant le lien vers l'élément ajouté. L'ajoute à l'élément "list".
function createListElement(link)
{
    var newElement = listElement.cloneNode(true);
    newElement.children.item(3).textContent = link;
    newElement.children.item(3).readOnly = true;
    newElement.children.item(0).addEventListener("click", function() {onPlaylistElementDelete(newElement);});
    newElement.children.item(1).addEventListener("click", function() {onPlaylistElementPriorityUp(newElement);});
    newElement.children.item(2).addEventListener("click", function() {onPlaylistElementPriorityDown(newElement);});
    newElement.priority = list.children.length;
    console.log("Created element with priority " + newElement.priority);
    list.appendChild(newElement);
    var playlistElementCreatedEvent = new Event("PlaylistElementCreated");
    playlistElementCreatedEvent.element = newElement;
    document.dispatchEvent(playlistElementCreatedEvent);
    return newElement;
}




//____________________________________________________

// Vérifie si du texte est présent dans le textArea contenant le lien.
// Si du texte se trouve dedans, alors un nouvel élément est ajouté à la playlist avec le lien indiqué dans le textArea. Le contenu du textArea est vidé.
function onPlaylistAddButtonClicked()
{
    var link = controls.children.item(1).value;
    if (link === null || list === undefined || link.length > 0)
        {
            createListElement(link);
            controls.children.item(1).value = "";
        }
    else
        {
            console.log("ERREUR : Pas de liens !");
        }
}

controls.children.item(0).addEventListener("click", onPlaylistAddButtonClicked);



