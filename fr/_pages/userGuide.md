---
title: Mode d'emploi
permalink: /userGuide/fr
layout: single
toc: true
toc_label: "Sur cette page"
toc_sticky: true
---

## Commencement

{% include figure image_path="/assets/images/userGuideImages/interaactionScene.png" alt="InteraactionScene" caption="Voilà à quoi ressemble InteraactionScene lors de la 1er connexion." %}

### Ajouter une scène

Pour ajouter une scène, il faut cliquer sur le bouton "Scene" avec un "+" noir entouré d'un cercle noir en haut à gauche de l'écran.

{% include figure image_path="/assets/images/userGuideImages/sceneButton.png" alt="Bouton Scene" %}

Une fenêtre va s'ouvrir demandant :

* Le nom de votre scène
* Le nom de votre image
* Et enfin l'image que vous voulez ajouter

{% include figure image_path="/assets/images/userGuideImages/windowAddScene.png" alt="Fenêtre ajout d'une scène" %}

Dans mon exemple ci-dessous, je souhaite créer une scène qui a pour nom "Lac" et pour image le lac de Guéry.

{% include figure image_path="/assets/images/userGuideImages/exampleAddScene.png" alt="Exemple ajout d'une scène" %}

Je valide et voilà ce que j'obtiens :

{% include figure image_path="/assets/images/userGuideImages/exampleScene.png" alt="Exemple d'une scène" caption="Ma scène "Lac" avec pour image le lac de Guéry a bien été créer." %}

### Ajouter une image

Pour ajouter une image, il faut au moins une scène sinon le bouton permettant d'ajouter une image ne sera pas disponible.<br />
Une fois que l'on a une scène, il faut cliquer sur le bouton "Image" avec un "+" noir entouré d'un cercle noir à droite du bouton qui permet d'ajouter une scène.

{% include figure image_path="/assets/images/userGuideImages/imageButton.png" alt="Bouton image" %}

Une fenêtre va s'ouvrir demandant :

* Le nom de votre image
* Et enfin l'image que vous voulez ajouter

{% include figure image_path="/assets/images/userGuideImages/windowAddImage.png" alt="Fenêtre ajout d'une image" %}

Dans mon exemple ci-dessous, je souhaite ajouter une autre image à ma scène "Lac", celle du lac de Laffrey.

{% include figure image_path="/assets/images/userGuideImages/exampleAddImage.png" alt="Exemple ajout d'une scène" %}

Je valide et voilà ce que j'obtiens :

{% include figure image_path="/assets/images/userGuideImages/exampleImage.png" alt="Exemple ajout d'une scène" %}

Ma nouvelle image du lac de Laffrey a bien été ajouté à ma scène "Lac". Celle-ci contient désormais mes 2 images.

## Bouton "Jouer"

{% include figure image_path="/assets/images/userGuideImages/playButton.png" alt="Bouton Jouer" caption="Ce bouton permet de jouer le son associé à l'hotspot lorsque l'on clique dessus." %}

## Bouton "Gérer les hotspots"

{% include figure image_path="/assets/images/userGuideImages/manageHotspotsButton.png" alt="Bouton gérer les hotspots" caption="Ce bouton permet de gérer les hotspots de nos images." %}

Une fois que l'on a cliqué dessus, 3 nouveaux boutons apparaissent et permettent :

* D'ajouter un hotspot a une image.
* De modifier un hotspot d'une image.
* De supprimer une hotspot d'une image.

{% include figure image_path="/assets/images/userGuideImages/buttonsManageHotspots.png" alt="Les boutons du mode gérer les hotspots" %}

### Ajouter un hotspot

Pour ajouter un hotspot à notre image, il faut cliquer sur le bouton "Add Hotspot".

{% include figure image_path="/assets/images/userGuideImages/addHotspotButton.png" alt="Bouton ajouter un hotspot" %}

Puis cliquer sur l'image, et tout en gardant son clic enfoncer, effectuer le tracer de toute la zone que l'on souhaite définir comme hotspot.

{% include figure image_path="/assets/images/userGuideImages/zoneHotspot.png" alt="Zone d'un hotspot" caption="Le tracé en noir et la zone assombrie sur l'image représentent mon hotspot." %}

Une fois le clique relâché, une fenêtre apparaît demandant :

* Si on souhaite importer un son ou enregistrer un son via le micro de notre PC.
* De choisir la couleur du hotspot : noir (par défaut), blanc, bleu, rouge, orange ou vert.
* De donner un nom à notre hotspot.

{% include figure image_path="/assets/images/userGuideImages/windowAddHotspot.png" alt="Fenêtre ajout d'un hotspot" %}

Dans mon exemple ci-dessous, je souhaite ajouter un son d'eau pour le lac de Guéry.<br />
J'importe donc un fichier "eau.mp3" qui fait le bruit de l'eau.<br />
Je choisis de mettre en bleu la couleur de mon hotspot.<br />
Et comme nom, je choisis "Eau du lac".

{% include figure image_path="/assets/images/userGuideImages/exampleWindowAddHotspot.png" alt="Exemple d'une fenêtre d'ajout de hotspot remplie" %}

Et voilà ce que j'obtiens :

{% include figure image_path="/assets/images/userGuideImages/zoneHotspot.png" alt="Exemple d'ajout d'un hotspot" caption="Maintenant lorsque l'on cliquera sur cette hotspot il fera le bruit associé au son choisi (de l'eau pour ma part)." %}

### Modifier un hotspot

Pour modifier un hotspot, il faut cliquer sur le bouton "Modify Hotspot".

{% include figure image_path="/assets/images/userGuideImages/modifyHotspotButton.png" alt="Bouton modifier un hotspot" %}

Puis cliquer sur le hotspot que l'on souhaite modifier.<br />
Dans l'exemple qui suit, je prens le hotspot crée dans la partie "Ajouter un hotspot".<br />
Une fenêtre va s'ouvrir permettant :

* D'importer un son ou enregistrer un son via le micro de notre PC.
* De changer la couleur du hotspot.
* De changer le nom du hotspot.
* De redessiner le hotspot.

{% include figure image_path="/assets/images/userGuideImages/windowModifyHotspot.png" alt="Fenêtre modifier un hospot" %}

Après avoir changé la couleur bleue en rouge, voilà ce que j'obtiens :

{% include figure image_path="/assets/images/userGuideImages/exampleModifyHotspot.png" alt="Exemple modifier un hotspot" %}

### Supprimer un hotspot

Pour supprimer un hotspot, il faut cliquer sur le bouton "Delete Hotspot".

{% include figure image_path="/assets/images/userGuideImages/deleteHotspotButton.png" alt="Bouton supprimer un hotspot" %}

Puis cliquer sur le hotspot que l'on souhaite modifier.<br />
Dans l'exemple qui suit, je prends le hotspot crée dans la partie "Ajouter un hotspot".<br />
Une fenêtre va s'ouvrir demandant si on est sûr de vouloir supprimé le hotspot sélectionner.

{% include figure image_path="/assets/images/userGuideImages/windowDeleteHotspot.png" alt="Fenêtre suppression d'un hotspot" %}

## Bouton "Gérer les scènes"

{% include figure image_path="/assets/images/userGuideImages/manageScenesButton.png" alt="Bouton gérer les scènes" caption="Ce bouton permet de gérer nos scènes et images." %}

Une fois que l'on a cliqué dessus, 5 nouveaux boutons apparaissent et permettent :

* De cacher une image. Si c'est la seule image de la scène alors la scène est aussi caché.
* D'enlever une image. Si c'est la seule image de la scène alors la scène est aussi enlevé.
* De renommer une image.
* D'exporter une scène.
* D'importer une scène.

{% include figure image_path="/assets/images/userGuideImages/buttonsManageScenes.png" alt="Les boutons du mode gérer les scènes" %}

### Cacher une image

Pour cacher une image, il faut cliquer sur le bouton "Hide".

{% include figure image_path="/assets/images/userGuideImages/hideButton.png" alt="Bouton cacher unne image" %}

Une fenêtre apparaît nous demandant si on est sûr de vouloir cacher l'image choisie.

{% include figure image_path="/assets/images/userGuideImages/windowHideImage.png" alt="Fenêtre cacher une image" %}

Si on accepte alors :

* L'image choisie devient plus opaque dans "Manage Scenes".

{% include figure image_path="/assets/images/userGuideImages/opaqueImage.png" alt="Image opaque" %}

* Et l'image choisie n'est plus visible dans les autres modes.

Si l'on clique sur le bouton "Hide" pour cacher une image déjà cachée, alors celle-ci redevient visible.

### Enlever une image

Pour enlever une image, il faut cliquer sur le bouton "Remove".

{% include figure image_path="/assets/images/userGuideImages/removeButton.png" alt="Bouton enlever une image" %}

Une fenêtre apparaît nous demandant si on est sûr de vouloir enlever l'image choisie.

{% include figure image_path="/assets/images/userGuideImages/windowRemoveImage.png" alt="Image enlever" %}

### Renommer une image

Pour renommer une image, il faut cliquer sur le bouton "Rename".

{% include figure image_path="/assets/images/userGuideImages/renameButton.png" alt="Bouton renommer une image" %}

Une fenêtre apparaît nous demandant quel nouveau nom, on veut donner à notre image.

{% include figure image_path="/assets/images/userGuideImages/windowRenameImage.png" alt="Fenêtre pour renommer une image" %}

### Exporter une scène

On peut exporter la scène en cours sous format JSON.<br />
Pour le faire, il faut cliquer sur le bouton "Export".

{% include figure image_path="/assets/images/userGuideImages/exportButton.png" alt="Bouton exporter" %}

Ensuite, on nous demande de choisir un nom au fichier exporté et où on veut le sauvegarder sur notre PC.

### Importer une scène

On peut importer une scène.<br />
Pour le faire, il faut cliquer sur le bouton "Import".

{% include figure image_path="/assets/images/userGuideImages/importButton.png" alt="Bouton importer" %}

Ensuite une fenêtre apparaît, nous demandant quel fichier on veut importer.

{% include figure image_path="/assets/images/userGuideImages/windowImport.png" alt="Fenêtre pour importer" %}

## Bouton "Dessiner"

{% include figure image_path="/assets/images/userGuideImages/drawButton.png" alt="Bouton dessiner" caption="Ce bouton permet de dessiner sur nos images." %}

Une fois que l'on a cliqué dessus, une palette de 6 couleurs et 2 nouveaux boutons apparaissent et permettent :

* De dessiner sur notre image avec les couleurs : Blanc, Noir, Rouge, Orange, Bleu et Vert.
* De gommer certaines parties de nos dessins.
* De supprimer tous nos dessins faits sur notre image.

{% include figure image_path="/assets/images/userGuideImages/buttonsDraw.png" alt="Tous les boutons du mode draw" %}

### Palette de couleurs

Pour dessiner, il faut d'abord cliquer sur une des 6 couleurs disponibles.

{% include figure image_path="/assets/images/userGuideImages/colorsButton.png" alt="Les boutons de couleurs" %}

Ensuite, il faut cliquer sur notre image et, pendant que l'on garde le clic enfoncé, faire le tracer du dessin que l'on souhaite.

Dans l'exemple ci-dessous, je trace un carré rouge entouré par un cercle vert.

{% include figure image_path="/assets/images/userGuideImages/exampleDrawing.png" alt="Exemple d'un dessin sur une image" %}

### Gommer

Pour gommer, il faut d'abord cliquer sur le bouton "Erase".

{% include figure image_path="/assets/images/userGuideImages/eraseButton.png" alt="Bouton gommer" %}

Ensuite, il faut cliquer sur notre image et, pendant que l'on garde le clic enfoncé, passer sur les parties du dessin que l'on souhaite effacer.
Dans l'exemple ci-dessous, je reprends le dessin fait dans la section "Palette de couleurs" et je gomme le cercle vert.

{% include figure image_path="/assets/images/userGuideImages/exampleErase.png" alt="Exemple d'un gommage" %}

### Tout effacer

Pour tout effacer, il faut cliquer sur le bouton "Clear".

{% include figure image_path="/assets/images/userGuideImages/clearButton.png" alt="Bouton tout effacer" %}

Une fois cliquer dessus, cela supprime tous les dessins faits sur l'image.

## Paramètres

Pour accéder aux paramètres, il faut cliquer sur le bouton "Settings" tout en haut à droite de l'écran.

{% include figure image_path="/assets/images/userGuideImages/settingsButton.png" alt="Bouton paramètres" %}

On arrive alors sur cette page :

{% include figure image_path="/assets/images/userGuideImages/settingsPage.png" alt="Page des paramètres" %}

On peut alors :

* Activer/Désactiver le Dwell-Time.
* Choisir la durée du Dwell-Time.
* Revenir sur la page principale via le bouton "Back" tout en haut à gauche.

## Cacher/Afficher la barre de menu

On peut cacher ou afficher la barre de menu avec le bouton en forme de triangle pointant vers le haut (pour cacher) ou vers le bas (pour afficher).

{% include figure image_path="/assets/images/userGuideImages/hideShowButton.png" alt="Bouton pour cacher ou montrer la barre de menu" %}

## Plein écran

On peut mettre ou sortir du plein écran avec le bouton en forme de carré.

{% include figure image_path="/assets/images/userGuideImages/fullScreenButton.png" alt="Bouton pour entrer ou sortir du mode plein écran" %}
