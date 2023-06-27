---
title: User Guide
permalink: /userGuide/
layout: single
toc: true
toc_sticky: true
---

## Beginning

{% include figure image_path="/assets/images/interaactionScene2.png" alt="InteraactionScene" caption="This is what InteraactionScene looks like on the 1st connection" %}

### Add scene

To add a scene, you must click on the "Scene" button with a black "+" surrounded by a black circle at the top left of the screen.

{% include figure image_path="/assets/images/userGuideImagesEN/sceneButton.png" alt="Scene button" %}

A window will open asking :

* The name of your scene
* The name of your image
* And finally the image you want to add

{% include figure image_path="/assets/images/userGuideImagesEN/windowAddScene.png" alt="Window add a scene" %}

In my example below, I want to create a scene whose name is "Lac" and the image of Guéry lake.

{% include figure image_path="/assets/images/userGuideImagesEN/exampleAddScene.png" alt="Example add a scene" %}

I validate and this is what I get :

{% include figure image_path="/assets/images/userGuideImagesEN/exampleScene.png" alt="Example of a scene" caption="My 'Lac' scene with Guéry lake as an image has been created." %}

### Add image

To add an image, you need at least one scene otherwise the button to add an image will not be available.<br />
Once you have a scene, you have to click on the "Image" button with a black "+" surrounded by a black circle to the right of the button that allows you to add a scene.

{% include figure image_path="/assets/images/userGuideImagesEN/imageButton.png" alt="Image button" %}

A window will open asking :

* The name of your image
* And finally the image you want to add

{% include figure image_path="/assets/images/userGuideImagesEN/windowAddImage.png" alt="Window add an image" %}

In my example below, I want to add another image to my "Lac" scene, that of Laffrey lake.

{% include figure image_path="/assets/images/userGuideImagesEN/exampleAddImage.png" alt="Example add an image" %}

I validate and this is what I get:

{% include figure image_path="/assets/images/userGuideImagesEN/exampleImage.png" alt="Example image" %}

My new image of Lac de Laffrey has been added to my "Lac" scene. This now contains my 2 images.

## "Play" Button

{% include figure image_path="/assets/images/userGuideImagesEN/playButton.png" alt="Play button" caption="This button allows you to play the action associated with hotspots." %}

Once activated, you have to click on a hotspot to play its action

## "Manage Hotspots" Button

{% include figure image_path="/assets/images/userGuideImagesEN/manageHotspotsButton.png" alt="Manage hotspots button" caption="This button is used to manage the hotspots of our images." %}

Once you have clicked on it, 4 new buttons appear and allow:

* To add a hotspot to an image.
* To modify a hotspot of an image.
* To remove a hotspot from an image.
* To remove all hotspots from an image.

{% include figure image_path="/assets/images/userGuideImagesEN/buttonsManageHotspots.png" alt="Buttons from manage hotspots" %}

### Add hotspot

To add a hotspot to our image, click on the "Add Hotspot" button.

{% include figure image_path="/assets/images/userGuideImagesEN/addHotspotButton.png" alt="Add hotspot button" %}

A dropdown menu will appear and allow you to choose the shape of your hotspot. Just click on it.

{% include figure image_path="/assets/images/userGuideImagesEN/addHotspotButtonDropdown.png" alt="Shapes of an hotspot" caption="Three shapes : Polyline, Rectangle and Circle." %}

Then, press the left mouse button and draw the area you want to define as hotspot, while keeping the button pressed.

Once the click is released, a window appears to create a hotspot. You can create two types of hotspots: a SoundHotspot that allows to play a sound, through the "Add a sound" tab and an ImageHotspot that allows to display another image, through the "Add a reference" tab.

To create a hotspot that plays a sound, you can "Import a sound" from your computer, "Record a sound" using your computer's microphone or "Write a sound" that will be played by a voice synthesizer.<br />
To create a hotspot that displays another image, you can "Select an image" that you want to display, by selecting it. You can select only the images of the current scene.<br />
Then you will be able to select the hotspot color, the size of it and its name.

{% include figure image_path="/assets/images/userGuideImagesEN/windowAddHotspotSound.png" alt="Add SoundHotspot window" %}

{% include figure image_path="/assets/images/userGuideImagesEN/windowAddHotspotImage.png" alt="Add ImageHotspot window" %}

In my example below, I want to add a water sound for Lake Laffrey.<br />
So I import a file "eau.wav" that makes the sound of water.<br />
I choose to put the color of my hotspot in blue.<br />
And as a name, I choose "Water from the lake".

{% include figure image_path="/assets/images/userGuideImagesEN/exampleWindowAddSoundHotspot.png" alt="Example window add hotspot fulfilled" %}

And this is what I get:

{% include figure image_path="/assets/images/userGuideImagesEN/zoneSoundHotspot.png" alt="SoundHotspot area" caption="Now when we click on this hotspot it will make the noise associated with the sound we have chosen (water for me)." %}

I can also add an hotspot that will display another image.<br />
I will create this hotspot on the Guéry lake for it to display the Laffrey lake.<br />
As below, I selected the Laffrey lake as the image to display, choose the white color for the hotspot and name it "Lac de Laffrey".

{% include figure image_path="/assets/images/userGuideImagesEN/exampleWindowAddImageHotspot.png" alt="Example window add hotspot image fulfilled" %}

And this is what I get:

{% include figure image_path="/assets/images/userGuideImagesEN/zoneImageHotspot.png" alt="ImageHotspot area" caption="This hotspot will display the Laffrey lake when we click on it" %}

### Modify hotspot

To modify a hotspot, you must click on the "Modify Hotspot" button.

{% include figure image_path="/assets/images/userGuideImagesEN/modifyHotspotButton.png" alt="Modify hotspot button" %}

Then click on the hotspot you want to modify.<br />
In the following example, I take the Laffrey lake's hotspot created in the "Add a hotspot" section.<br />
A window similar to the hotspot creation window will open, allowing to modify your hotspot. Whatever the type of your hotspot, you will be able to:

* Import, record, or write a sound, or select an image to display, by clicking on the corresponding tabs.
* To change the color of the hotspot.
* to change the size of the hotspot.
* To change the name of the hotspot.
* To redraw the hotspot.

{% include figure image_path="/assets/images/userGuideImagesEN/windowModifyHotspot.png" alt="Window modify hotspot" %}

After changing the color blue to red, this is what I get:

{% include figure image_path="/assets/images/userGuideImagesEN/exampleModifyHotspot.png" alt="Example modify hotspot" %}

### Delete hotspot

To delete a hotspot, click on the "Delete Hotspot" button.

{% include figure image_path="/assets/images/userGuideImagesEN/deleteHotspotButton.png" alt="Delete hotspot button" %}

Then click on the hotspot you want to delete.<br />
In the following example, I take the Guéry Lake's hotspot created in the "Add a hotspot" section.<br />
A window will open asking if you are sure you want to delete the selected hotspot.

{% include figure image_path="/assets/images/userGuideImagesEN/windowDeleteHotspot.png" alt="Window delete hotspot" %}

Click on "Delete" to confirm your choice.

### Delete all hotspots

You also have the possibility to delete all the hotspots of an image, by clicking on the "Delete all hotspots" button.

{% include figure image_path="/assets/images/userGuideImagesEN/deleteAllHotspotsButton.png" alt="Delete all hotspots button" %}

Clicking on this button will bring up a confirmation window. To confirm your choice, click on "Yes".

## "Manage Scenes" Bouton

{% include figure image_path="/assets/images/userGuideImagesEN/manageScenesButton.png" alt="Manage scenes button" caption="This button is used to manage our scenes and images." %}

Once you have clicked on it, 5 new buttons appear and allow:

* To hide an image. If this is the only image in the scene then the scene is also hidden.
* To remove an image. If this is the only image in the scene then the scene is also removed.
* To rename an image and/or the current scene.
* To export a scene.
* Import a scene.

{% include figure image_path="/assets/images/userGuideImagesEN/buttonsManageScenes.png" alt="All buttons of manage scene" %}

### Hide image

To hide an image, you must click on the "Hide" button.

{% include figure image_path="/assets/images/userGuideImagesEN/hideButton.png" alt="Hide button" %}

A window appears asking us if we are sure we want to hide the chosen image.

{% include figure image_path="/assets/images/userGuideImagesEN/windowHideImage.png" alt="Window hide image" %}

If we accept, then the chosen image becomes less opaque in "Manage Scenes".

{% include figure image_path="/assets/images/userGuideImagesEN/opaqueImage.png" alt="Opaque image" %}

In the others modes, the image is no longer visible.

If you click on the "Hide" button to hide an already hidden image, then it becomes visible again.

### Remove image

To remove an image, you must click on the "Remove" button.

{% include figure image_path="/assets/images/userGuideImagesEN/removeButton.png" alt="Remove button" %}

A window appears asking us if we are sure we want to remove the selected image.

{% include figure image_path="/assets/images/userGuideImagesEN/windowRemoveImage.png" alt="Window remove image" %}

### Rename image and/or a scene

To rename an image, you must click on the "Rename" button.

{% include figure image_path="/assets/images/userGuideImagesEN/renameButton.png" alt="Rename button" %}

A window appears asking us what new name we want to give to our image and our scene. You can decide to rename only the image or only the scene.

{% include figure image_path="/assets/images/userGuideImagesEN/windowRenameImage.png" alt="Window rename image" %}

### Export scene

You can export the current scene in JSON format.<br />
To do this, you must click on the "Export" button.

{% include figure image_path="/assets/images/userGuideImagesEN/exportButton.png" alt="Export button" %}

Then, we are asked to choose a name for the exported file and will be directly downloaded.

### Import scene

You can import a scene.<br />
To do this, you must click on the "Import" button.

{% include figure image_path="/assets/images/userGuideImagesEN/importButton.png" alt="Import button" %}

Then a window appears, asking us which file we want to import.

{% include figure image_path="/assets/images/userGuideImagesEN/windowImport.png" alt="Window import" %}

## "Draw" Button

{% include figure image_path="/assets/images/userGuideImagesEN/drawButton.png" alt="Draw button" caption="This button allows you to draw on our images." %}

Once you have clicked on it, a drawing panel appears:

* Three buttons (small, medium and large) to choose the size of the pencil and the eraser.
* 10 differents colors: White, Black, Brown, Red, Orange, Yellow, Blue, Purple, Pink and Green.
* A button to select the eraser and erase your draws.
* A button to clear all draws made on your image.

{% include figure image_path="/assets/images/userGuideImagesEN/buttonsDraw.png" alt="All buttons of draw" %}

### Select the size

{% include figure image_path="/assets/images/userGuideImagesEN/drawSizeButtons.png" alt="Size buttons" %}

These three buttons will allow you to choose the size of the pencil and the eraser between small, medium and large.

### Color palette

To draw, you must first click on one of the 10 available colors.

{% include figure image_path="/assets/images/userGuideImagesEN/colorsButton.png" alt="Colors button" %}

Then, we must click on our image and, while we keep the click pressed, make the trace of the drawing that we want.

In the example below, I draw a red square surrounded by a green circle.

{% include figure image_path="/assets/images/userGuideImagesEN/exampleDrawing.png" alt="Example drawing" %}

### Erase

To erase, you must first click on the button with eraser icon.

{% include figure image_path="/assets/images/userGuideImagesEN/eraseButton.png" alt="Erase button" %}

Then, we must click on our image and, while we keep the click pressed, go over the parts of the drawing that we want to erase.
In the example below, I take the drawing made in the "Color palette" section and I erase the green circle.

{% include figure image_path="/assets/images/userGuideImagesEN/exampleErase.png" alt="Example erase drawing" %}

### Clear

To clear everything, click on the "Clear" button.

{% include figure image_path="/assets/images/userGuideImagesEN/clearButton.png" alt="Clear button" %}

Once clicked, it removes all the drawings made on the image.

## "Reset" Button

{% include figure image_path="/assets/images/userGuideImagesEN/removeAllScenes.png" alt="Reset button" %}

This button allows you to remove all the scenes with a single click. Click on it, and a confirmation window will appear. Then, click on "Yes" to confirm your choice.

## Tutorial

{% include figure image_path="/assets/images/userGuideImagesEN/tutorialButton.png" alt="Bouton tutoriel" %}

By clicking on this button, you will find the application tutorial, the same you are reading now.

## Settings

To access the settings, click on the "Settings" button at the top right of the screen.

{% include figure image_path="/assets/images/userGuideImagesEN/settingsButton.png" alt="Settings button" %}

We then arrive on this page:

{% include figure image_path="/assets/images/userGuideImagesEN/settingsPage.png" alt="Settings page" %}

We can then:

* Activate / Deactivate the vocal synthesis.
* Adjust the application volume.
* Activate / Deactivate Dwell-Time.
* Choose the duration of the Dwell-Time.
* Select the application language (English or French).
* Reset the settings.
* Go back to the main page via the "Back" button at the top left.

## Hide/Show toolbar

You can hide or show the toolbar with the triangle-shaped button pointing up (to hide) or down (to display), below the "Settings" button.

{% include figure image_path="/assets/images/userGuideImagesEN/hideShowButton.png" alt="Show or Hide button" %}

## Full screen

You can put or exit full screen with the square button below the "Hide and Show toolbar" button.

{% include figure image_path="/assets/images/userGuideImagesEN/fullScreenButton.png" alt="Fullscreen button" %}

## Zoom in / Zoom out

Below again, you will find the zoom in and zoom out buttons that allows you to zoom in and zoom out your images.

{% include figure image_path="/assets/images/userGuideImagesEN/zoomButtons.png" alt="Zoom buttons" %}
