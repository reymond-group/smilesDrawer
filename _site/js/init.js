(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('select').material_select();

    $(function() {
      $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 1000);
            return false;
          }
        }
      });
    });

  }); // end of document ready
})(jQuery); // end of jQuery name space

var input = document.getElementById('input');
  var debugCheckbox = document.getElementById('debug');
  var themeCheckbox = document.getElementById('theme');
  var canvasSizeInput = document.getElementById('canvasSize');
  var bondLengthInput = document.getElementById('bondLength');
  var shortBondLengthInput = document.getElementById('shortBondLength');
  var bondSpacingInput = document.getElementById('bondSpacing');
  var atomSelect = document.getElementById('atom');
  var theme = 'light'

  var options = {
    debug: false,
    bondLength: 16,
    shortBondLength: 9,
    bondSpacing: 4,
    atomVisualization: 'default'
  }

  var smilesDrawer = new SmilesDrawer(options);
  var input = document.getElementById('input');

  function draw() {
    let t = performance.now();

    var data = SmilesDrawer.parse(input.value, function(err) {
      console.log(err);
    });

    console.log(data);

    smilesDrawer.draw(data, 'output-canvas', theme, false);

    let td = performance.now() - t;

    document.getElementById('speed-info-value').innerHTML = Math.round(td * 100) / 100;
    document.getElementById('overlap-info-value').innerHTML = Math.round(smilesDrawer.getOverlapScore().total * 100) / 100;
  }

  function updateOptions() {
    smilesDrawer = new SmilesDrawer(options);
    draw();
  }

  document.addEventListener('DOMContentLoaded', function (event) {
    input.addEventListener('input', function () {
      draw();
    });

    // Initial draw
    draw();
    draw();

    canvasSizeInput.addEventListener('input', function () {
      let canvasSize = parseInt(canvasSizeInput.value);
      let canvas = document.getElementById('output-canvas');
      canvas.setAttribute('width', canvasSize);
      canvas.setAttribute('height', canvasSize)

      updateOptions();
    });

    bondLengthInput.addEventListener('input', function () {
      options.bondLength = parseInt(bondLengthInput.value);
      shortBondLengthInput.max = options.bondLength;
      updateOptions();
    });

    shortBondLengthInput.addEventListener('input', function () {
      options.shortBondLength = parseInt(shortBondLengthInput.value);
      updateOptions();
    });

    bondSpacingInput.addEventListener('input', function () {
      options.bondSpacing = parseInt(bondSpacingInput.value);
      updateOptions();
    });

    $("#atom").on('change', function() {
      options.atomVisualization = $(this).val();
      updateOptions();
    });

    themeCheckbox.addEventListener('click', function () {
      theme = themeCheckbox.checked ? 'dark' : 'light';

      if (theme === 'light') {
        document.getElementById('canvas-container').style.backgroundColor = '#fff';
      } else {
        document.getElementById('canvas-container').style.backgroundColor = '#222';
      }

      updateOptions();
    });

    debugCheckbox.addEventListener('click', function () {
      options.debug = debugCheckbox.checked ? true : false;
      updateOptions();
    });
  });