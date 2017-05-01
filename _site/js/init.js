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
  var terminalCarbonsCheckbox = document.getElementById('terminalCarbons');
  var canvasSizeInput = document.getElementById('canvasSize');
  var bondLengthInput = document.getElementById('bondLength');
  var shortBondLengthInput = document.getElementById('shortBondLength');
  var bondSpacingInput = document.getElementById('bondSpacing');
  var fontSizeLargeInput = document.getElementById('fontSizeLarge');
  var fontSizeSmallInput = document.getElementById('fontSizeSmall');
  var atomSelect = document.getElementById('atom');
  var theme = 'light'

  var options = {
    debug: false,
    bondLength: 16,
    shortBondLength: 9,
    bondSpacing: 4,
    fontSizeLarge: 6,
    fontSizeSmall: 4,
    atomVisualization: 'default',
    terminalCarbons: false
  }

  var smilesDrawer = new SmilesDrawer(options);
  var input = document.getElementById('input');

  function draw() {
    let t = performance.now();

    var data = SmilesDrawer.parse(input.value, function(tree) {
      smilesDrawer.draw(tree, 'output-canvas', theme, false);

      let td = performance.now() - t;

      document.getElementById('speed-info-value').innerHTML = Math.round(td * 100) / 100;
      document.getElementById('overlap-info-value').innerHTML = Math.round(smilesDrawer.getOverlapScore().total * 100) / 100;
      document.getElementById('error-info').classList.add('hidden');
    }, function(err) {
      let element = document.getElementById('error-info');
      let str = input.value;
      console.log(err);
      let from = err.location.start.column - 1;
      let to = err.location.end.column + 5;
      str = [str.slice(0, from), '<span>', str.slice(from)].join('');
      str = [str.slice(0, to), '<span>' + err.message + '</span></span>', str.slice(to)].join('');
      element.innerHTML = str;
      element.classList.remove('hidden');
    });
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

    fontSizeLargeInput.addEventListener('input', function () {
      options.fontSizeLarge = parseInt(fontSizeLargeInput.value);
      updateOptions();
    });

    fontSizeSmallInput.addEventListener('input', function () {
      options.fontSizeSmall = parseInt(fontSizeSmallInput.value);
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

    terminalCarbonsCheckbox.addEventListener('click', function () {
      options.terminalCarbons = terminalCarbonsCheckbox.checked ? true : false;
      updateOptions();
    });
  });