var TICK_FREQ_IN_MS = 300;
var WIND_GUST_STRENGTH_IN_PX = 600.0;

var isRunning = false;

$( document ).ready(function() {
    
   // Initialize controls /////////////////////////////////////////////////////
   
   // Initialize the effect drop-down.
   $("#particle-effect-select").change(function() {
      $(".game-canvas span").remove();
   });
   
   // Initialize the pause button.
   $("#pause-button").hide().click(function() {
      isRunning = false;
      $(".game-canvas span").stop().remove();
      $("#pause-button, #play-button").toggle();
      $("#status").text("");
   });
   
   // Initialize the play button.
   $("#play-button").click(function() {
      isRunning = true;
      $("#pause-button, #play-button").toggle();
   });
   
   // Initialize the wind gust button.
   $("#wind-button").click(function() {
      $(".game-canvas span").each(function() {
         var currLeft = $(this).css("left");
         var newLeft = currLeft.substring(0, currLeft.indexOf("px"));
         // Scale the wind strength based on which effect is selected and add 
         // a little randomn jitter to make a nice effect.
         var windDist = WIND_GUST_STRENGTH_IN_PX * (1.0 - getEffectOptions().windresistance) * (Math.random() * 0.8);
         newLeft = (parseFloat(newLeft) + windDist) + "px"; 
         $(this).animate({
            left: newLeft
         }, { duration: 500, queue: false });
      });
   });
   
   // Start the tick cycle.
   setInterval(performTick, TICK_FREQ_IN_MS);
   
});

/**
 * Get the attributes for the currently selected effect.
 */
getEffectOptions = function() {
   var effect = $("#particle-effect-select option:selected");
   var fxOpts = new Object();
   // Required options.
   fxOpts.effect = effect.data("effect");
   fxOpts.duration = effect.data("duration");
   fxOpts.windresistance = effect.data("wind-resistance");
   // Optional options.
   fxOpts.text = effect.data("text");
   fxOpts.altclass = effect.data("altclass");
   return fxOpts;
}; //fnend - getEffectOptions

/**
 * Perform a tick of the simulation.
 */
performTick = function() {
   // Check that the simulation is not paused.
   if (isRunning) {
      
      var fxOpts = getEffectOptions();
      
      // Determine the effect class.
      var effectClass = fxOpts.effect;
      if (fxOpts.altclass && Math.random()>=0.5)
         effectClass = fxOpts.altclass;
      
      // Assign a z-index between 0 and 9.
      var zIndex = parseInt(Math.round(Math.random() * 10));
      
      // Build the HTML for the new particle element.
      var newParticleHtml = "<span class=\"" + effectClass + "\" style=\"z-index:" + zIndex + "\">";
      if (fxOpts.text)
         newParticleHtml += fxOpts.text;
      newParticleHtml += "</span>";
      
      // Add the new particle DOM element to the canvas.
      var newParticle = $(newParticleHtml).appendTo(".game-canvas");
      // Position it at a random horizontal location.
      newParticle.css("left", (Math.random() * 100) + "%")

      // Start the particle above the canvas.
      newParticle.css("top", "-20%");
      // Use standard jQuery animation to move the particle to the bottom of the canvas.
      newParticle.animate(
         { top: "120%" },
         parseInt(fxOpts.duration), 
         "swing",
         function() {
            // This is the callback function for after the animation is complete, which removes the particle from the DOM.
            newParticle.remove();
         }
      );
      
      // Update the status with the current particle count (this shows that the particles are being deleted after they're no longer in view).
      $("#status").text("Particle Count: " + $(".game-canvas span").length);
   } //endif - check for isRunning
   
}; //fnend - end performTick