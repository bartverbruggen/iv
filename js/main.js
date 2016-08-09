(function() {
  var pokemonSelector = document.getElementById('pokemon');
  var trainerLevelSlider = document.getElementById('trainer-level');
  var trainerLevelPreview = document.getElementById('trainer-level-preview');
  var pokemonLevelSlider = document.getElementById('pokemon-level');
  var pokemonLevelPreview = document.getElementById('pokemon-level-preview');
  var screenshotFile = document.getElementById('screenshot');
  var screenshotPreview = document.getElementById('preview');

  var pk_id = 1;

  var init = function() {
    fillPokemonList();
    trainerLevelSlider.addEventListener('input', handleTrainerLevel);
    trainerLevelSlider.addEventListener('change', handleTrainerLevel);
    pokemonLevelSlider.addEventListener('input', handlePokemonLevel);
    pokemonLevelSlider.addEventListener('change', handlePokemonLevel);
    screenshotFile.addEventListener('change', handleScreenshot);
  };

  var fillPokemonList = function() {
    Array.prototype.forEach.call(pokemon, function(item, i) {
      if (item.Id === undefined) return;

      var opt = document.createElement("option");
      opt.value= item.Id;
      opt.innerHTML = item.Name;
      pokemonSelector.appendChild(opt);
    });

    // pokemonSelector
  };

  var handleTrainerLevel = function() {
    var level = this.value;
    trainerLevelPreview.innerHTML = level;
    pokemonLevelSlider.max = Math.min(parseInt(level) + 1.5, 40);
    drawImage();
  };

  var handlePokemonLevel = function() {
    var level = this.value;
    pokemonLevelPreview.innerHTML = level;
    drawImage();
  };

  var handleScreenshot = function() {
    var files = this.files;
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      var imageType = /^image\//;

      if (!imageType.test(file.type)) {
        continue;
      }

      var img = document.createElement("img");
      img.classList.add("obj");
      img.file = file;
      img.classList.add('screenshot__img')
      screenshotPreview.appendChild(img);

      var reader = new FileReader();
      reader.onload = (function(aImg) {
        return function(e) {
          aImg.src = e.target.result;
          screenshotPreview.classList.remove('hidden');
          drawImage();
        };
      })(img);
      reader.readAsDataURL(file);
    }
  };

  var drawImage = function() {
    var arc = document.getElementById("arc");

    while (arc.firstChild) {
      arc.removeChild(arc.firstChild);
    }

    var trainerLevel = trainerLevelSlider.value;
    var pokemonLevel = pokemonLevelSlider.value;

    pokemonLevelSlider.max = Math.min(parseInt(trainerLevel) + 1.5, 40);

    var min_cp = Math.max(Math.floor(pokemon[pk_id].BaseAttack * Math.sqrt(pokemon[pk_id].BaseDefense) * Math.sqrt(pokemon[pk_id].BaseStamina) * Math.pow(CpM[pokemonLevel*2-2], 2) / 10), 10);
    var max_cp = Math.max(Math.floor((pokemon[pk_id].BaseAttack+15) * Math.sqrt(pokemon[pk_id].BaseDefense+15) * Math.sqrt(pokemon[pk_id].BaseStamina+15) * Math.pow(CpM[pokemonLevel*2-2], 2) / 10), 10);

    var min_hp = Math.max(Math.floor((pokemon[pk_id].BaseStamina) * CpM[pokemonLevel*2-2]), 10);
    var max_hp = Math.max(Math.floor((pokemon[pk_id].BaseStamina+15) * CpM[pokemonLevel*2-2]), 10);

    var total_attack = pokemon[pk_id].BaseAttack + 7;
    var total_defense = pokemon[pk_id].BaseDefense + 7;
    var total_stamina = pokemon[pk_id].BaseStamina + 7;

    console.log(pokemon[pk_id], min_cp, max_cp, min_hp, max_hp);
    console.log(total_attack, total_defense, total_stamina);

    var width = screenshotPreview.offsetWidth;
    arc.setAttribute('width', width);
    arc.setAttribute('height', width);
    // arc.setAttribute('height', (width / 2 + 8));

    for (var i = 0; i < Math.min((trainerLevel) * 2 + 2, 79); i++) {
      var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      if ((i/2 + 1) % 10 == 0) {
        path.setAttribute("stroke", "hsla(0, 0%, 100%, .2)");
        length = 50;
      } else if ((i/2 + 1) % 1 == 0) {
        path.setAttribute("stroke", "hsla(0, 0%, 100%, .2)");
        length = 30;
      } else {
        path.setAttribute("stroke", "hsla(0, 0%, 100%, .2)");
        length = 10;
      }
      path.setAttribute("fill", "hsla(0, 0%, 0%, 0)");
      path.setAttribute("stroke-width", "2");
      path.setAttribute("stroke-linecap", "round");
      path.setAttribute("d", arcNode(width/2, width/2, 129, 91, 91 + ((CpM[i]-0.094)*202.037116/CpM[trainerLevel*2-2]), length));
      arc.appendChild(path);
    }

    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("stroke", "rgba(10, 255, 60, 1)");
    path.setAttribute("fill", "hsla(0, 0%, 0%, 0)");
    path.setAttribute("stroke-width", "3");
    path.setAttribute("stroke-linecap", "round");
    // path.setAttribute("d", backArc(width/2, width/2, width/2-31, 91, 270) );
    path.setAttribute("d", backArc(width/2, width/2, 129, 91, 269) );
    // 256.5
    // backArc(x, y, radius, startAngle, endAngle)
    // arc.appendChild(path);

    var start = polarToCartesian(width/2, width/2, width/2-31, 91 + ((CpM[pokemonLevel*2-2]-0.094)*202.037116/CpM[trainerLevel*2-2]));

    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("stroke", "hsla(0, 0%, 100%, 1)");
    path.setAttribute("fill", "hsla(0, 0%, 0%, 0)");
    path.setAttribute("stroke-width", "4");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("d", backArc(width/2, width/2, 129, 91, 91 + ((CpM[pokemonLevel*2-2]-0.094)*202.037116/CpM[trainerLevel*2-2])) );
    // arc.appendChild(path);

    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("stroke", "rgba(0, 0, 255, 0)");
    circle.setAttribute("fill", "rgba(10, 255, 60, 1)");
    circle.setAttribute("stroke-width", "0");
    circle.setAttribute("cx", start.x);
    circle.setAttribute("cy", start.y);
    circle.setAttribute("r", "4");
    arc.appendChild(circle);
  };

  init();
})();


function polarToCartesian(centerX,centerY,radius,angleInDegrees) {
  var angleInRadians = (angleInDegrees + 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function backArc(x,y,radius,startAngle,endAngle){
  var start = polarToCartesian(x,y,radius,endAngle);
  var end = polarToCartesian(x,y,radius,startAngle);

  var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

  var d = [
    "M",start.x, start.y,
    "A", radius, radius, 0, arcSweep, 0, end.x, end.y
  ].join(" ");

  return d;
}

function arcNode(x, y, radius, startAngle, endAngle, length){
  var start = polarToCartesian(x, y, radius - 3, endAngle);
  var linestart = polarToCartesian(x, y, radius - length, endAngle);
  var end = polarToCartesian(x, y, radius, startAngle);

  var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

  var d = [
    "M", linestart.x, linestart.y,
    "L", start.x, start.y
  ].join(" ");

  return d;
}
