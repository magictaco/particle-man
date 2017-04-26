var TICK_FREQ_IN_MS = 500;

var isRunning = false;

// A $( document ).ready() block.
$( document ).ready(function() {
    
   // Initialize controls /////////////////////////////////////////////////////
   
   // Initialize the particle-effect-select.
   $("#particle-effect-select").change(function() {
      $(".game-canvas").html("");
   });
   
   $("#pause-button").hide().click(function() {
      isRunning = false;
      $(".game-canvas span").stop().remove();
      $("#pause-button, #play-button").toggle();
      $("#status").text("");
   });
   
   $("#play-button").click(function() {
      isRunning = true;
      $("#pause-button, #play-button").toggle();
   });
   
   $("#play-button").click(function() {
      isRunning = true;
      $("#pause-button, #play-button").toggle();
   });
   
   $("#wind-button").click(function() {
      $(".game-canvas span").each(function() {
         var currLeft = $(this).css("left");
         var newLeft = currLeft.substring(0, currLeft.indexOf("px"));
         newLeft = (parseFloat(newLeft) + 100.0) + "px"; 
         $(this).animate({
            left: newLeft
         }, { duration: 500, queue: false });
      });
   });
   
   setInterval(performTick, TICK_FREQ_IN_MS);
   
});

performTick = function() {
   if (isRunning) {
      var effect = $("#particle-effect-select option:selected");
      
      var newParticleHtml = "<span class=\"" + effect.data("effect") + "\">";
      if (effect.data("char"))
         newParticleHtml += effect.data("char");
      newParticleHtml += "</span>";
      
      var newParticle = $(newParticleHtml).appendTo(".game-canvas");
      newParticle.css("left", (Math.random() * 100) + "%")

      newParticle.css("top", "-10%");
      newParticle.animate({
         top: "110%"
      }, parseInt(effect.data("duration")), "swing", function() {
         newParticle.remove();
      });      
      
      $("#status").text("Particle Count: " + $(".game-canvas span").length);
   } //endif - check for isRunning
   
}; //fnend - end performTick