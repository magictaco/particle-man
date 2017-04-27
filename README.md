# Particle Man!

Introduction
------------
Particle Man! is a DOM-based environmental particle simulator that runs in a browser using only pure HTML5+Javascript+CSS.

How to Run this Example
-----------------------
1. Clone or download this repository.
2. Open index.html in a web browser.
3. Press Play!

Extending Particle Man!
-----------------------
Adding a new effect to this demo is as easy as adding a new option to the Effect drop-down menu. The characteristics of each effect are defined using HTML5 data attributes in the tag itself. The effect can be further refined via CSS, including standard CSS animations.

### Effect Attributes ###

|Attribute      |Required?|Description
|---------------|---------|------------
|effect         |Yes      |The class of the particle element that will be added to the DOM (this can be used to style the particle via CSS!)
|duration       |Yes      |The duration of this particle in ms (i.e. how long it will take to fall to the bottom of the canvas).
|wind-resistance|Yes      |How resistant the particle is to gusts of wind.
|text           |No       |Text to be displayed in the particle element.
|altclass       |No       |An alternative class for the particle element (if defined, new particles will randomly be given either the effect attribute value as the class or the altclass attribute value)

