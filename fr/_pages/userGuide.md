---
title: Mode d'emploi
permalink: /userGuide/fr
layout: single
toc: true
toc_label: "Sur cette page"
toc_sticky: true
---

## Commencement

{% include figure image_path="/assets/images/interaactionScene2.png" alt="InteraactionScene" caption="Voilà à quoi ressemble InteraactionScene lors de la 1er connexion." %}

### Ajouter une scène

Pour ajouter une scène, il faut cliquer sur le bouton "Scene" avec un "+" entouré d'un cercle noir en haut à gauche de l'écran.

{% include figure image_path="/assets/images/userGuideImagesFR/sceneButton.png" alt="Bouton Scene" %}

Une fenêtre va s'ouvrir dans laquelle vous devez renseigner :

* Le nom de votre scène
* Le nom de votre image
* Et enfin l'image que vous voulez ajouter

{% include figure image_path="/assets/images/userGuideImagesFR/windowAddScene.png" alt="Fenêtre ajout d'une scène" %}

Dans l'exemple ci-dessous, nous souhaitons créer une scène qui a pour nom "Lac" et pour image le lac de Guéry.

{% include figure image_path="/assets/images/userGuideImagesFR/exampleAddScene.png" alt="Exemple ajout d'une scène" %}

Voici ce que nous obtenons après la validation :

{% include figure image_path="/assets/images/userGuideImagesFR/exampleScene.png" alt="Exemple d'une scène" caption="Ma scène 'Lac' avec pour image le lac de Guéry a bien été créée." %}

### Ajouter une image

Une image ne peut être ajoutée seulement dans une scène, sinon le bouton permettant d'ajouter une image ne sera pas disponible.<br />
Une fois que notre scène est créée, il faut cliquer sur le bouton "Image" avec un "+" entouré d'un cercle noir à droite du bouton qui permet d'ajouter une scène.

{% include figure image_path="/assets/images/userGuideImagesFR/imageButton.png" alt="Bouton image" %}

Une fenêtre va s'ouvrir demandant :

* Le nom de votre image
* Et enfin l'image que vous voulez ajouter

{% include figure image_path="/assets/images/userGuideImagesFR/windowAddImage.png" alt="Fenêtre ajout d'une image" %}

Dans l'exemple ci-dessous, nous ajoutons une autre image à la scène "Lac", celle du lac de Laffrey.

{% include figure image_path="/assets/images/userGuideImagesFR/exampleAddImage.png" alt="Exemple ajout d'une scène" %}

Après validation, voici ce qu'on obtient :

{% include figure image_path="/assets/images/userGuideImagesFR/exampleImage.png" alt="Exemple ajout d'une scène" %}

La nouvelle image du lac de Laffrey a bien été ajoutée à la scène "Lac". Celle-ci contient désormais nos 2 images.

## Bouton "Jouer"

{% include figure image_path="/assets/images/userGuideImagesFR/playButton.jpg" alt="Bouton Jouer" caption="Ce bouton permet de jouer l'action associé à un hotspot." %}

Une fois actionné, il vous suffit de cliquer sur un hotspot pour que son action se déclenche.

## Bouton "Gérer les hotspots"

{% include figure image_path="/assets/images/userGuideImagesFR/manageHotspotsButton.png" alt="Bouton gérer les hotspots" caption="Ce bouton permet de gérer les hotspots de nos images." %}

Une fois que l'on a cliqué sur le bouton "Hotspots", 4 nouveaux boutons apparaissent et permettent :

* D'ajouter un hotspot à une image.
* De modifier les hotspots d'une image.
* De supprimer les hotspots d'une image.
* De supprimer tous les hotspots d'une image.

{% include figure image_path="/assets/images/userGuideImagesFR/buttonsManageHotspots.png" alt="Les boutons du mode gérer les hotspots" %}

### Ajouter un hotspot

Pour ajouter un hotspot à notre image, il faut cliquer sur le bouton "Ajouter un hotspot".

{% include figure image_path="/assets/images/userGuideImagesFR/addHotspotButton.png" alt="Bouton ajouter un hotspot" %}

Un menu se déroulera et vous permettra de choisir la forme de votre hotspot entre la forme "Courbe", "Rectangle" et "Cercle". Il suffira d'y cliquer dessus.

<img src="/assets/images/userGuideImagesFR/addHotspotButtonDropdown.png" alt="Les formes d'un hotspot" style="width: 200px; height: 200px;">
/*{% include figure image_path="/assets/images/userGuideImagesFR/addHotspotButtonDropdown.png" alt="Les formes d'un hotspot" caption="Trois formes : Courbe, Rectangle et Cercle." width="200" height="240" %}*/

Il faut ensuite presser le clic gauche de la souris et tracer la zone que l'on souhaite définir comme hotspot, tout en gardant le clic enfoncé.

Une fois le clic relâché, une fenêtre apparaît pour créer le hotspot. Vous pouvez créer deux types de hotspots : un SoundHotspot qui permet de jouer un son, grâce à l'onglet "Ajouter un son" et un ImageHotspot qui permet de changer d'image, grâce à l'onglet "Ajouter une référence".

Pour créer un hotspot qui permet de jouer un son, vous pouvez "Importer un son" depuis votre ordinateur, "Enregistrer un son" avec le micro de votre ordinateur ou "Écrire un son" qui sera joué par une synthèse vocale.<br />
Pour créer un hotspot qui permet de changer d'image, vous pouvez "Choisir l'image" sur laquelle vous voulez vous rendre, en renseignant son nom. Vous ne pouvez sélectionner seulement les images de la scène courante.<br />
Vous pouvez ensuite sélectionner la couleur du hotspot, la taille de son contour et son nom.

{% include figure image_path="/assets/images/userGuideImagesFR/windowAddHotspotSound.png" alt="Fenêtre d'ajout d'un SoundHotspot" %}

{% include figure image_path="/assets/images/userGuideImagesFR/windowAddHotspotImage.png" alt="Fenêtre d'ajout d'un ImageHotspot" %}

Dans notre exemple ci-dessous, nous allons ajouter un bruit d'eau pour le lac de Laffrey.<br />
Nous importons donc un fichier "eau.wav" qui fait le bruit de l'eau.<br />
Nous pouvons ensuite choisir de mettre en bleu, par exemple, la couleur de notre hotspot.<br />
Et comme nom, nous entrons "Eau du lac".

{% include figure image_path="/assets/images/userGuideImagesFR/exampleWindowAddSoundHotspot.png" alt="Exemple de fenêtre d’ajout d’un SoundHotspot" %}

Voici ce que nous obtenons :

{% include figure image_path="/assets/images/userGuideImagesFR/zoneSoundHotspot.png" alt="Exemple d'ajout d'un SoundHotspot" caption="Ce hotspot fera maintenant le bruit associé au son choisi (de l'eau dans notre cas)." %}

Nous pouvons aussi ajouter un hotspot qui permet de changer d'image.<br />
Créons ce hotspot sur le lac de Guéry pour qu'il nous emmène au lac de Laffrey.<br />
Comme ci-dessous, j'ai sélectionné le lac de Laffrey comme image de destination, mis le contour du hotspot en blanc et nommé le hotspot "Lac de Laffrey".

{% include figure image_path="/assets/images/userGuideImagesFR/exampleWindowAddImageHotspot.png" alt="Exemple de fenêtre d’ajout d’un ImageHotspot" %}

Voici ce que nous obtenons : 

{% include figure image_path="/assets/images/userGuideImagesFR/zoneImageHotspot.png" alt="Exemple d'ajout d'un ImageHotspot" caption="Ce hotspot nous redirigera sur lac de Laffrey lorsque l'on clique dessus." %}

### Modifier un hotspot

Pour modifier un hotspot, il faut cliquer sur le bouton "Modifier un Hotspot".

{% include figure image_path="/assets/images/userGuideImagesFR/modifyHotspotButton.png" alt="Bouton modifier un hotspot" %}

Puis, cliquez sur le hotspot que vous souhaitez modifier.<br />
Dans l'exemple qui suit, nous prendrons le hotspot du Lac de Laffrey crée dans la partie "Ajouter un hotspot".<br />
Une fenêtre semblable à la fenêtre de création d'un hotspot s'ouvrira, permettant de modifier votre hotspot. Quelque soit le type du hotspot, vous pourrez :

* Importer, enregistrer ou écrire un son, ou alors sélectionner une image de destination, en cliquant sur les onglets correspondants.
* De changer la couleur du hotspot.
* De changer la taille du contour du hotspot.
* De changer le nom du hotspot.
* De redessiner le hotspot.

{% include figure image_path="/assets/images/userGuideImagesFR/windowModifyHotspot.png" alt="Fenêtre de modification d'un hotspot" %}

Après avoir changé la couleur bleu en rouge, voici ce que nous obtenons :

{% include figure image_path="/assets/images/userGuideImagesFR/exampleModifyHotspot.png" alt="Exemple de modification d'un hotspot" %}

### Supprimer un hotspot

Pour supprimer un hotspot, il faut cliquer sur le bouton "Supprimer un Hotspot".

{% include figure image_path="/assets/images/userGuideImagesFR/deleteHotspotButton.png" alt="Bouton supprimer un hotspot" %}

Puis cliquer sur le hotspot que vous souhaitez supprimer.<br />
Dans l'exemple qui suit, je prends le hotspot du Lac de Guéry crée dans la partie "Ajouter un hotspot".<br />
Une fenêtre va s'ouvrir demandant si l'on est sûr de vouloir supprimer le hotspot sélectionné.

{% include figure image_path="/assets/images/userGuideImagesFR/windowDeleteHotspot.png" alt="Fenêtre de suppression d'un hotspot" %}

Cliquez sur "Supprimer" pour valider votre choix.

### Supprimer tous les hotspots

Vous avez aussi la possibilité de supprimer tous les hotspots d'une image en cliquant sur le bouton "tout supprimer".

{% include figure image_path="/assets/images/userGuideImagesFR/deleteAllHotspotsButton.png" alt="Bouton supprimer tous les hotspots" %}

Cliquer sur ce bouton fera apparaître une fenêtre de confirmation. Pour confirmer votre choix, cliquez sur "Oui".

## Bouton "Gérer les scènes"

{% include figure image_path="/assets/images/userGuideImagesFR/manageScenesButton.png" alt="Bouton gérer les scènes" caption="Ce bouton permet de gérer nos scènes et nos images." %}

Une fois que l'on a cliqué sur le bouton "Scènes", 5 nouveaux boutons apparaissent au centre de l'affichage et permettent :

* De cacher une image. Si c'est la seule image de la scène alors la scène est aussi caché.
* De supprimer une image. Si c'est la seule image de la scène alors la scène est aussi supprimée.
* De renommer une image et/ou la scène courante.
* D'exporter une scène.
* D'importer une scène.

{% include figure image_path="/assets/images/userGuideImagesFR/buttonsManageScenes.png" alt="Les boutons du mode gérer les scènes" %}

### Cacher une image

Pour cacher une image, il faut cliquer sur le bouton "Cacher".

{% include figure image_path="/assets/images/userGuideImagesFR/hideButton.png" alt="Bouton cacher une image" %}

Une fenêtre apparaît nous demandant si on est sûr de vouloir cacher l'image choisie.

{% include figure image_path="/assets/images/userGuideImagesFR/windowHideImage.png" alt="Fenêtre cacher une image" %}

Si l'on accepte, alors l'image choisie devient moins opaque dans "Manage Scenes".

{% include figure image_path="/assets/images/userGuideImagesFR/opaqueImage.png" alt="Image moins opaque" %}

Dans les autres modes, l'image n'est plus visible.

Si l'on clique sur le bouton "Hide" pour cacher une image déjà cachée, alors celle-ci redevient visible.

### Supprimer une image

Pour supprimer une image, il faut cliquer sur le bouton "Supprimer".

{% include figure image_path="/assets/images/userGuideImagesFR/removeButton.png" alt="Bouton supprimer une image" %}

Une fenêtre apparaîtra nous demandant si l'on est sûr de vouloir supprimer l'image choisie.

{% include figure image_path="/assets/images/userGuideImagesFR/windowRemoveImage.png" alt="Image supprimée" %}

### Renommer une image et/ou une scène

Pour renommer une image et/ou une scène, il faut cliquer sur le bouton "Renommer".

{% include figure image_path="/assets/images/userGuideImagesFR/renameButton.png" alt="Bouton renommer une image" %}

Une fenêtre apparaît nous demandant le nouveau nom de notre image et de notre scène. Vous pouvez décidez de renommer soit l'image, soit la scène, soit les deux.

{% include figure image_path="/assets/images/userGuideImagesFR/windowRenameImage.png" alt="Fenêtre pour renommer une image" %}

### Exporter une scène

Nous pouvons exporter la scène en cours sous format JSON.<br />
Pour le faire, il faut cliquer sur le bouton "Export".

{% include figure image_path="/assets/images/userGuideImagesFR/exportButton.png" alt="Bouton exporter" %}

On nous demande ensuite de choisir un nom pour le fichier exporté et sera directement téléchargé.

### Importer une scène

On peut importer une scène.<br />
Pour le faire, il faut cliquer sur le bouton "Import".

{% include figure image_path="/assets/images/userGuideImagesFR/importButton.png" alt="Bouton importer" %}

Ensuite une fenêtre apparaît, nous demandant quel fichier on veut importer.

{% include figure image_path="/assets/images/userGuideImagesFR/windowImport.png" alt="Fenêtre pour importer" %}

## Bouton "Dessiner"

{% include figure image_path="/assets/images/userGuideImagesFR/drawButton.png" alt="Bouton dessiner" caption="Ce bouton permet de dessiner sur nos images." %}

Une fois que l'on a cliqué sur le bouton "Dessiner", un panel de dessin apparaît :

* Trois boutons (petit, moyen et grand) permettant de choisir la taille de votre crayon et de votre gomme.
* 10 couleurs différentes : blanc, noir, marron, rouge, orange, jaune, bleu, violet, rose et vert.
* Un bouton pour séléctionner la gomme et gommer vos traits
* Un bouton pour supprimer tous vos dessins faits sur votre image.

{% include figure image_path="/assets/images/userGuideImagesFR/buttonsDraw.png" alt="Tous les boutons du mode draw" %}

### Choisir la taille

{% include figure image_path="/assets/images/userGuideImagesFR/drawSizeButtons.png" alt="Les boutons pour la taille du dessin" %}

Ces trois boutons vous permettent de choisir la taille de votre crayon et de votre gomme entre petit, moyen et grand.

### Palette de couleurs

Pour dessiner, il faut d'abord cliquer sur une des 10 couleurs disponibles.

{% include figure image_path="/assets/images/userGuideImagesFR/colorsButton.png" alt="La palette de couleurs" %}

Ensuite, il faut cliquer sur notre image et, pendant que l'on garde le clic enfoncé, faire le tracé du dessin que l'on souhaite.

Dans l'exemple ci-dessous, je trace un carré rouge entouré par un cercle vert.

{% include figure image_path="/assets/images/userGuideImagesFR/exampleDrawing.png" alt="Exemple d'un dessin sur une image" %}

### Gommer

Pour gommer, il faut d'abord cliquer sur le bouton avec l'icône de la gomme.

{% include figure image_path="/assets/images/userGuideImagesFR/eraseButton.png" alt="Bouton gommer" %}

Ensuite, il faut cliquer sur notre image et, pendant que l'on garde le clic enfoncé, passer sur les parties du dessin que l'on souhaite effacer.
Dans l'exemple ci-dessous, je reprends le dessin fait dans la section "Palette de couleurs" et je gomme le cercle vert.

{% include figure image_path="/assets/images/userGuideImagesFR/exampleErase.png" alt="Exemple d'un gommage" %}

### Tout effacer

Pour tout effacer, il faut cliquer sur le bouton avec l'icône de la croix.

{% include figure image_path="/assets/images/userGuideImagesFR/clearButton.png" alt="Bouton tout effacer" %}

Une fois cliqué dessus, cela supprime tous les dessins faits sur l'image.

## Bouton "Recommencer"

{% include figure image_path="/assets/images/userGuideImagesFR/removeAllScenes.png" alt="Bouton recommencer" %}

Ce bouton vous permettra de supprimer toutes les scènes en un seul clic. Cliquez dessus, et une fenêtre de confirmation apparaîtra. Vous pourrez ainsi cliquer sur "Oui" pour confirmer votre choix.

## Tutoriel

{% include figure image_path="/assets/images/userGuideImagesFR/tutorialButton.png" alt="Bouton tutoriel" %}

En cliquant sur ce bouton, vous pourrez retrouver le tutoriel de l'application, dont vous êtes actuellement entrain de lire.

## Paramètres

Pour accéder aux paramètres, il faut cliquer sur le bouton "Settings" tout en haut à droite de l'écran.

{% include figure image_path="/assets/images/userGuideImagesFR/settingsButton.png" alt="Bouton paramètres" %}

On arrive alors sur cette page :

{% include figure image_path="/assets/images/userGuideImagesFR/settingsPage.png" alt="Page des paramètres" %}

Vous pourrez alors :

* Activer/Désactiver la synthèse vocal
* Régler le volume de l'application
* Activer/Désactiver la sélection par temps de fixation (Dwell-Time).
* Choisir la durée du temps de fixation.
* Sélectionner la langue de l'application (Français ou Anglais).
* Réintialiser les paramètres par défaut.
* Revenir sur la page principale via le bouton "Back" tout en haut à gauche.

## Cacher/Afficher la barre de menu

On peut cacher ou afficher la barre de menu avec le bouton en forme de triangle pointant vers le haut (pour cacher) ou vers le bas (pour afficher), en dessous du bouton "Options".

{% include figure image_path="/assets/images/userGuideImagesFR/hideShowButton.png" alt="Bouton pour cacher ou montrer la barre de menu" %}

## Plein écran

On peut entrer ou sortir du mode plein écran avec le bouton en forme de carré sous le bouton pour afficher/cacher la barre de menu.

{% include figure image_path="/assets/images/userGuideImagesFR/fullScreenButton.png" alt="Bouton pour entrer ou sortir du mode plein écran" %}

## Zoomer et Dézoomer

Encore en dessous, on peut retrouver deux boutons pour zoomer et dézoomer l'image, ce qui peut être pratique lorsqu'elle est petite. 

{% include figure image_path="/assets/images/userGuideImagesFR/zoomButtons.png" alt="Boutons pour zoomer et dézoomer" %}
