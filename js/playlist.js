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
listElement.appendChild(document.createElement("button")); // Création bouton augmenter priorité.
listElement.appendChild(document.createElement("button")); // Création bouton baisser priorité.
listElement.appendChild(document.createElement("textarea"));

listElement.children.item(0).textContent = "x";
listElement.children.item(1).textContent = "-";
listElement.children.item(2).textContent = "+";

list.appendChild(listElement);
