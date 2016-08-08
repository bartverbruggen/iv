

function polarToCartesian(centerX,centerY,radius,angleInDegrees) {
  var angleInRadians = (angleInDegrees + 90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function backArc(x,y,radius,startAngle,endAngle) {
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

function setAdvancedMode(on) {
  var elements = document.getElementsByClassName("advanced");
  for (var i = 0; i < elements.length; i++) {
    if (on) {
      elements[i].setAttribute("style", "display: block;");
    } else {
      elements[i].removeAttribute("style");
    }
  }
  var elements = document.getElementsByClassName("basic");
  for (var i = 0; i < elements.length; i++) {
    if (on) {
      elements[i].setAttribute("style", "display: none;");
    } else {
      elements[i].removeAttribute("style");
    }
  }
}


ind_attack = 7;
ind_defense = 7;
ind_stamina = 7;
user_cp = 112;
user_cp = 36;

var pokemon_id_slider = document.getElementById("pokemon_id");
pokemon_id_slider.addEventListener("mousemove",  function(data) {
  if (pokemon_id_slider.value != pk_id) {
    drawImage();
  }
});
pokemon_id_slider.addEventListener("touchmove",  function(data) {
  if (pokemon_id_slider.value != pk_id) {
    drawImage();
  }
});
pokemon_id_slider.addEventListener("change", drawImage);

var trainer_level_slider = document.getElementById("trainer_level");
trainer_level_slider.addEventListener("mousemove",  function(data) {
  if (trainer_level_slider.value != trainer_level) {
    drawImage();
  }
});
trainer_level_slider.addEventListener("touchmove",  function(data) {
  if (trainer_level_slider.value != trainer_level) {
    drawImage();
  }
});
trainer_level_slider.addEventListener("change", drawImage);

var pokemon_level_slider = document.getElementById("pokemon_level");
pokemon_level_slider.addEventListener("mousemove", function(data) {
  if (pokemon_level_slider.value != pokemon_level) {
    drawImage();
  }
});
pokemon_level_slider.addEventListener("touchmove", function(data) {
  if (pokemon_level_slider.value != pokemon_level) {
    drawImage();
  }
});
pokemon_level_slider.addEventListener("change", drawImage);

var pokemon_cp_slider = document.getElementById("pokemon_cp");
pokemon_cp_slider.addEventListener("mousemove", function(data) {
  if (pokemon_cp_slider.value != user_cp) {
    drawImage();
  }
});
pokemon_cp_slider.addEventListener("touchmove", function(data) {
  if (pokemon_cp_slider.value != user_cp) {
    drawImage();
  }
});
pokemon_cp_slider.addEventListener("change", drawImage);

var pokemon_hp_slider = document.getElementById("pokemon_hp");
pokemon_hp_slider.addEventListener("mousemove", function(data) {
  if (pokemon_hp_slider.value != user_hp) {
    drawImage();
  }
});
pokemon_hp_slider.addEventListener("touchmove", function(data) {
  if (pokemon_hp_slider.value != user_hp) {
    drawImage();
  }
});
pokemon_hp_slider.addEventListener("change", drawImage);


document.getElementById("pokemon_image").addEventListener("click", function() {
  openMenu();
});

document.getElementById("dec_attack").addEventListener("click", function() {
  ind_attack = Math.max(ind_attack - 1, 0);
  drawImage();
});
document.getElementById("dec_defense").addEventListener("click", function() {
  ind_defense = Math.max(ind_defense - 1, 0);
  drawImage();
});
document.getElementById("dec_stamina").addEventListener("click", function() {
  ind_stamina = Math.max(ind_stamina - 1, 0);
  drawImage();
});
document.getElementById("inc_attack").addEventListener("click", function() {
  ind_attack = Math.min(ind_attack + 1, 15);
  drawImage();
});
document.getElementById("inc_defense").addEventListener("click", function() {
  ind_defense = Math.min(ind_defense + 1, 15);
  drawImage();
});
document.getElementById("inc_stamina").addEventListener("click", function() {
  ind_stamina = Math.min(ind_stamina + 1, 15);
  drawImage();
});

window.onresize = function(event) {
  drawImage();
};

pk_id = 1;


function drawImage() {

  var arc = document.getElementById("arc");
  while (arc.firstChild) {
      arc.removeChild(arc.firstChild);
  }

  var trainer_level = trainer_level_slider.value;
  document.getElementById("trainer_level_label").innerHTML = trainer_level;
  document.getElementById("exp_req_label").innerHTML = exp_req[[trainer_level-1]];
  pokemon_level_slider.max = Math.min(parseInt(trainer_level) + 1.5, 40);
  var pokemon_level = pokemon_level_slider.value;
  document.getElementById("pokemon_level_label").innerHTML = pokemon_level;
  document.getElementById("pokemon_ecpm_label").innerHTML = CpM[pokemon_level*2-2];
  document.getElementById("candy").innerHTML = candy[Math.floor(pokemon_level-1)];
  document.getElementById("stardust").innerHTML = stardust[Math.floor(pokemon_level-1)];

  var pk_id = pokemon_id_slider.value;
  document.getElementById("pokemon_image").className = "pkm pokemon_image pkm" + pk_id; // ALTERED BY TSR
  document.getElementById("pokemon_image2").className = "pkm pokemon_image pkm" + pk_id; // ADDED BY TSR
  document.getElementById("pokemon_image3").className = "pkm pokemon_image pkm" + pk_id; // ADDED BY TSR
  document.getElementById("pokemon_name").innerHTML = pokemon[pk_id].Name;
  // document.getElementById("background").className = pokemon[pk_id].Type1;

  min_cp = Math.max(Math.floor(pokemon[pk_id].BaseAttack * Math.sqrt(pokemon[pk_id].BaseDefense) * Math.sqrt(pokemon[pk_id].BaseStamina) * Math.pow(CpM[pokemon_level*2-2], 2) / 10), 10);
  max_cp = Math.max(Math.floor((pokemon[pk_id].BaseAttack+15) * Math.sqrt(pokemon[pk_id].BaseDefense+15) * Math.sqrt(pokemon[pk_id].BaseStamina+15) * Math.pow(CpM[pokemon_level*2-2], 2) / 10), 10);
  document.getElementById("min_cp").innerHTML = min_cp;
  document.getElementById("max_cp").innerHTML = max_cp;
  document.getElementById("user_min_cp").innerHTML = min_cp;
  document.getElementById("user_max_cp").innerHTML = max_cp;
  document.getElementById("pokemon_cp").min = min_cp;
  document.getElementById("pokemon_cp").max = max_cp;
  document.getElementById("cp_rank").innerHTML = pokemon[pk_id]["CP Rank"];
  document.getElementById("cp_norm").innerHTML = ((pokemon[pk_id]["CP Normalised"] - 1)*100).toPrecision(3);

  user_cp = parseInt(document.getElementById("pokemon_cp").value);
  document.getElementById("pokemon_cp_label").innerHTML = user_cp;


  min_hp = Math.max(Math.floor((pokemon[pk_id].BaseStamina) * CpM[pokemon_level*2-2]), 10);
  max_hp = Math.max(Math.floor((pokemon[pk_id].BaseStamina+15) * CpM[pokemon_level*2-2]), 10);
  document.getElementById("min_hp").innerHTML = min_hp;
  document.getElementById("max_hp").innerHTML = max_hp;
  document.getElementById("user_min_hp").innerHTML = min_hp;
  document.getElementById("user_max_hp").innerHTML = max_hp;
  document.getElementById("pokemon_hp").min = min_hp;
  document.getElementById("pokemon_hp").max = max_hp;
  document.getElementById("hp_rank").innerHTML = pokemon[pk_id]["HP Rank"];
  document.getElementById("hp_norm").innerHTML = ((pokemon[pk_id]["HP Normalised"] - 1)*100).toPrecision(3);

  user_hp = parseInt(document.getElementById("pokemon_hp").value);
  document.getElementById("pokemon_hp_label").innerHTML = user_hp;

  if (pokemon[pk_id].Type2 == "None")
    types = pokemon[pk_id].Type1;
  else
    types = pokemon[pk_id].Type1 + " / " + pokemon[pk_id].Type2;
  document.getElementById("types").innerHTML = types;

  document.getElementById("weight").innerHTML = pokemon[pk_id].PokedexWeightKg;
  document.getElementById("height").innerHTML = pokemon[pk_id].PokedexHeightM;


  document.getElementById("base_attack").innerHTML = pokemon[pk_id].BaseAttack;
  document.getElementById("base_defense").innerHTML = pokemon[pk_id].BaseDefense;
  document.getElementById("base_stamina").innerHTML = pokemon[pk_id].BaseStamina;

  document.getElementById("ind_attack").innerHTML = ind_attack;
  document.getElementById("ind_defense").innerHTML = ind_defense;
  document.getElementById("ind_stamina").innerHTML = ind_stamina;

  total_attack = pokemon[pk_id].BaseAttack + ind_attack;
  total_defense = pokemon[pk_id].BaseDefense + ind_defense;
  total_stamina = pokemon[pk_id].BaseStamina + ind_stamina;

  var total_attacks = document.getElementsByClassName("total_attack");
  for (var i = 0; i < total_attacks.length; i++) {
    total_attacks[i].innerHTML = total_attack;
  }
  var total_defenses = document.getElementsByClassName("total_defense");
  for (var i = 0; i < total_defenses.length; i++) {
    total_defenses[i].innerHTML = total_defense;
  }
  var total_staminas = document.getElementsByClassName("total_stamina");
  for (var i = 0; i < total_staminas.length; i++) {
    total_staminas[i].innerHTML = total_stamina;
  }

  calc_cp = total_attack * Math.sqrt(total_defense) * Math.sqrt(total_stamina) * Math.pow(CpM[pokemon_level*2-2], 2) / 10;
  rounded_calc_cp = Math.max(Math.floor(calc_cp), 10);
  document.getElementById("calc_cp").innerHTML = calc_cp.toPrecision(5);
  document.getElementById("rounded_calc_cp").innerHTML = rounded_calc_cp;

  calc_hp = total_stamina * CpM[pokemon_level*2-2];
  rounded_calc_hp = Math.max(Math.floor(calc_hp), 10);
  document.getElementById("calc_hp").innerHTML = calc_hp.toPrecision(5);
  document.getElementById("rounded_calc_hp").innerHTML = rounded_calc_hp;

  width = document.getElementById("arc_section").offsetWidth;

  arc.setAttribute('width', width + "px");
  arc.setAttribute('height', (width / 2 + 8) + "px");

  for (var i = 0; i < Math.min((trainer_level) * 2 + 2, 79); i++) {
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
    path.setAttribute("d", arcNode(width/2, width/2, width/2-40, 90, 90 + ((CpM[i]-0.094)*202.037116/CpM[trainer_level*2-2]), length));
    arc.appendChild(path);
  }

  var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("stroke", "hsla(0, 0%, 100%, .2)");
  path.setAttribute("fill", "hsla(0, 0%, 0%, 0)");
  path.setAttribute("stroke-width", "4");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("d", backArc(width/2, width/2, width/2-40, 90, 270) );
  arc.appendChild(path);

  var start = polarToCartesian(width/2, width/2, width/2-40, 90 + ((CpM[pokemon_level*2-2]-0.094)*202.037116/CpM[trainer_level*2-2]));

  var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("stroke", "hsla(0, 0%, 100%, 1)");
  path.setAttribute("fill", "hsla(0, 0%, 0%, 0)");
  path.setAttribute("stroke-width", "4");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("d", backArc(width/2, width/2, width/2-40, 90, 90 + ((CpM[pokemon_level*2-2]-0.094)*202.037116/CpM[trainer_level*2-2])) );
  arc.appendChild(path);

  var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("stroke", "hsla(0, 0%, 0%, 0)");
  circle.setAttribute("fill", "hsla(0, 0%, 100%, 1)");
  circle.setAttribute("stroke-width", "0");
  circle.setAttribute("cx", start.x);
  circle.setAttribute("cy", start.y);
  circle.setAttribute("r", "3");
  arc.appendChild(circle);

  // cry = new Audio('audio/pv' + pk_id + '.wav');

  var cp_results = document.getElementById("cp_results");
  while (cp_results.firstChild) {
      cp_results.removeChild(cp_results.firstChild);
  }

  card_width = document.getElementById("cp_results_cont").offsetWidth;
  cp_results.setAttribute('width', card_width + "px");

  mobile_vert_offset = 80;

  if (card_width < 450) {
    cp_results.setAttribute('height', "235px");
  } else {
    cp_results.setAttribute('height', "160px");
  }

  cr_center_y = 50.5;
  cr_line_offset = 30.5;
  cr_min_x = cr_line_offset;
  cr_max_x = card_width - cr_line_offset;

  var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("stroke", "hsla(0, 0%, 0%, .33)");
  path.setAttribute("stroke-width", "1");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("d", ["M", cr_min_x, cr_center_y, "L", cr_max_x, cr_center_y].join(" ") );
  cp_results.appendChild(path);


  // min cp


  function cr_cp_x(cp) {
    return (cr_max_x - cr_min_x) / (max_cp - min_cp) * ( parseInt(cp) - min_cp) + cr_min_x;
  }

  var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("stroke", "hsla(0, 0%, 0%, .33)");
  path.setAttribute("stroke-width", "1");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("d", ["M", cr_min_x, cr_center_y + 10, "L", cr_min_x, cr_center_y - 10].join(" ") );
  cp_results.appendChild(path);

  var path = document.createElementNS("http://www.w3.org/2000/svg", "text");
  path.innerHTML = "CP";
  path.setAttribute("font-size", "10px");
  path.setAttribute("fill", "hsla(0, 0%, 0%, .66)");
  path.setAttribute("x", cr_min_x);
  path.setAttribute("y", cr_center_y + 30);
  path.setAttribute("font-family", "Arial");
  path.setAttribute("text-anchor", "middle");
    var subpath = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
    subpath.innerHTML = min_cp;
    subpath.setAttribute("font-size", "14px");
    path.appendChild(subpath);
  cp_results.appendChild(path);

  var path = document.createElementNS("http://www.w3.org/2000/svg", "text");
  path.innerHTML = "MIN for";
  path.setAttribute("font-size", "12px");
  path.setAttribute("fill", "hsla(0, 0%, 0%, .33)");
  path.setAttribute("x", cr_min_x);
  path.setAttribute("y", cr_center_y + 45);
  path.setAttribute("font-family", "Arial");
  path.setAttribute("text-anchor", "middle");
  cp_results.appendChild(path);

  var path = document.createElementNS("http://www.w3.org/2000/svg", "text");
  path.innerHTML = "Level " + pokemon_level;
  path.setAttribute("font-size", "12px");
  path.setAttribute("fill", "hsla(0, 0%, 0%, .33)");
  path.setAttribute("x", cr_min_x);
  path.setAttribute("y", cr_center_y + 58);
  path.setAttribute("font-family", "Arial");
  path.setAttribute("text-anchor", "middle");
  cp_results.appendChild(path);

  // max cp

  var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("stroke", "hsla(0, 0%, 0%, .33)");
  path.setAttribute("stroke-width", "1");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("d", ["M", cr_max_x, cr_center_y + 10, "L", cr_max_x, cr_center_y - 10].join(" ") );
  cp_results.appendChild(path);

  var path = document.createElementNS("http://www.w3.org/2000/svg", "text");
  path.innerHTML = "CP";
  path.setAttribute("font-size", "10px");
  path.setAttribute("fill", "hsla(0, 0%, 0%, .66)");
  path.setAttribute("x", cr_max_x);
  path.setAttribute("y", cr_center_y + 30);
  path.setAttribute("font-family", "Arial");
  path.setAttribute("text-anchor", "middle");
    var subpath = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
    subpath.innerHTML = max_cp;
    subpath.setAttribute("font-size", "14px");
    path.appendChild(subpath);
  cp_results.appendChild(path);

  var path = document.createElementNS("http://www.w3.org/2000/svg", "text");
  path.innerHTML = "MAX for";
  path.setAttribute("font-size", "12px");
  path.setAttribute("fill", "hsla(0, 0%, 0%, .33)");
  path.setAttribute("x", cr_max_x);
  path.setAttribute("y", cr_center_y + 45);
  path.setAttribute("font-family", "Arial");
  path.setAttribute("text-anchor", "middle");
  cp_results.appendChild(path);

  var path = document.createElementNS("http://www.w3.org/2000/svg", "text");
  path.innerHTML = "Level " + pokemon_level;
  path.setAttribute("font-size", "12px");
  path.setAttribute("fill", "hsla(0, 0%, 0%, .33)");
  path.setAttribute("x", cr_max_x);
  path.setAttribute("y", cr_center_y + 58);
  path.setAttribute("font-family", "Arial");
  path.setAttribute("text-anchor", "middle");
  cp_results.appendChild(path);

  // document.getElementById("cp_resutls_output").src = cp_results.toDataURL("image/png");
  for (var i = min_cp + 1; i < max_cp; i++) {
      var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("stroke", "hsla(0, 0%, 0%, .33)");
      path.setAttribute("stroke-width", "1");
      path.setAttribute("stroke-linecap", "round");
    if (i % 10 == 0) {
      path.setAttribute("d", ["M", cr_cp_x(i), cr_center_y + 5, "L", cr_cp_x(i), cr_center_y - 5].join(" ") );
    } else if (max_cp - min_cp < (cr_max_x - cr_min_x) / 4){
      path.setAttribute("d", ["M", cr_cp_x(i), cr_center_y + 2, "L", cr_cp_x(i), cr_center_y - 2].join(" ") );
    }
      cp_results.appendChild(path);
  }

  min_est_total_stamina = (user_hp) / CpM[pokemon_level*2-2];
  est_total_stamina = (user_hp + 0.5) / CpM[pokemon_level*2-2];
  max_est_total_stamina = (user_hp + 1) / CpM[pokemon_level*2-2];
  // est_ind_stamina = est_total_stamina - pokemon[pk_id].BaseStamina;
  min_br_cp = Math.max(Math.max(Math.floor(pokemon[pk_id].BaseAttack * Math.sqrt(pokemon[pk_id].BaseDefense) * Math.sqrt(min_est_total_stamina) * Math.pow(CpM[pokemon_level*2-2], 2) / 10), 10), min_cp);
  max_br_cp = Math.min(Math.max(Math.floor((pokemon[pk_id].BaseAttack + 15) * Math.sqrt(pokemon[pk_id].BaseDefense + 15) * Math.sqrt(max_est_total_stamina) * Math.pow(CpM[pokemon_level*2-2], 2) / 10), 10), max_cp);

  per_diff_cp = (-1 + (user_cp+0.5) / ((pokemon[pk_id].BaseAttack + 7.5) * Math.sqrt(pokemon[pk_id].BaseDefense + 7.5) * Math.sqrt(pokemon[pk_id].BaseStamina + 7.5) * Math.pow(CpM[pokemon_level*2-2], 2) / 10)) * 100;
  per_diff_sta = (-1 + (user_hp+0.5) / ((pokemon[pk_id].BaseStamina + 7.5) * CpM[pokemon_level*2-2])) * 100;
  per_diff_br = (-1 + (user_cp+0.5) / ((pokemon[pk_id].BaseAttack + 7.5) * Math.sqrt(pokemon[pk_id].BaseDefense + 7.5) * Math.sqrt(est_total_stamina) * Math.pow(CpM[pokemon_level*2-2], 2) / 10)) * 100;

  rating_cp = (user_cp - min_cp) / (max_cp - min_cp) * 100;
  rating_sta = (user_hp - min_hp) / (max_hp - min_hp) * 100;
  rating_br = (user_cp - min_br_cp) / (max_br_cp - min_br_cp) * 100;

  updateIVNumbers(rating_br, rating_sta);


  // var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  // path.setAttribute("stroke", "hsla(200, 50%, 50%, 1)");
  // path.setAttribute("stroke-width", "1");
  // path.setAttribute("stroke-linecap", "round");
  // path.setAttribute("fill", "none");
  // path.setAttribute("d", ["M", (cr_max_x - cr_min_x) * .75 + cr_min_x, cr_center_y, "L", (cr_max_x - cr_min_x) * .75 + cr_min_x, cr_center_y + 30].join(" ") );
  // cp_results.appendChild(path);

  var path = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  path.setAttribute("x", cr_cp_x(min_br_cp));
  path.setAttribute("y", cr_center_y - 7.5);
  path.setAttribute("width", cr_cp_x(max_br_cp) - cr_cp_x(min_br_cp));
  path.setAttribute("height", 15);
  path.setAttribute("fill", "hsl(200, 50%, 50%)");
  cp_results.appendChild(path);


  var path = document.createElementNS("http://www.w3.org/2000/svg", "text");
  path.innerHTML = "POSS. CP RANGE INFLUENCED BY HP";
  path.setAttribute("font-size", "10px");
  path.setAttribute("fill", "hsla(0, 0%, 100%, 1)");
  path.setAttribute("x", (cr_cp_x(min_br_cp) + cr_cp_x(max_br_cp)) / 2);
  path.setAttribute("y", cr_center_y + 3);
  path.setAttribute("font-family", "Arial");
  path.setAttribute("text-anchor", "middle");
  cp_results.appendChild(path);

  // var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  // path.setAttribute("stroke", "hsla(200, 50%, 30%, 1)");
  // path.setAttribute("stroke-width", "1");
  // path.setAttribute("stroke-linecap", "round");
  // path.setAttribute("d", ["M", cr_cp_x(min_br_cp), cr_center_y + 7, "L", cr_cp_x(min_br_cp), cr_center_y - 7].join(" ") );
  // cp_results.appendChild(path);

  // var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  // path.setAttribute("stroke", "hsla(200, 50%, 30%, 1)");
  // path.setAttribute("stroke-width", "1");
  // path.setAttribute("stroke-linecap", "round");
  // path.setAttribute("d", ["M", cr_cp_x(max_br_cp), cr_center_y + 7, "L", cr_cp_x(max_br_cp), cr_center_y - 7].join(" ") );
  // cp_results.appendChild(path);


  // actual cp

  var path = document.createElementNS("http://www.w3.org/2000/svg", "text");
  path.innerHTML = "CP";
  path.setAttribute("font-size", "12px");
  path.setAttribute("fill", "hsla(0, 0%, 0%, .66)");
  path.setAttribute("font-weight", "bold");
  path.setAttribute("x", cr_cp_x(user_cp));
  path.setAttribute("y", cr_center_y - 25);
  path.setAttribute("font-family", "Arial");
  path.setAttribute("text-anchor", "middle");
    var subpath = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
    subpath.innerHTML = user_cp;
    subpath.setAttribute("font-size", "16px");
    path.appendChild(subpath);
  cp_results.appendChild(path);

  var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("stroke", "hsla(0, 0%, 0%, .66)");
  path.setAttribute("fill", "hsla(0, 0%, 0%, .66)");
  path.setAttribute("stroke-width", "1");
  // path.setAttribute("stroke-linecap", "round");
  path.setAttribute("d", ["M", cr_cp_x(user_cp), cr_center_y - 10, "L", cr_cp_x(user_cp) + 10, cr_center_y - 20, cr_cp_x(user_cp) - 10, cr_center_y - 20].join(" ") );
  cp_results.appendChild(path);

  // var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  // path.setAttribute("stroke", "hsla(0, 0%, 0%, .66)");
  // path.setAttribute("stroke-width", "1");
  // path.setAttribute("stroke-linecap", "round");
  // path.setAttribute("fill", "none");
  // path.setAttribute("d", ["M", cr_cp_x(user_cp), cr_center_y + 15, "L", (cr_max_x - cr_min_x) * .25 + cr_min_x, cr_center_y + 15, (cr_max_x - cr_min_x) * .25 + cr_min_x, cr_center_y + 30].join(" ") );
  // cp_results.appendChild(path);

  var path = document.createElementNS("http://www.w3.org/2000/svg", "text");
  path.innerHTML = rating_br.toPrecision(3) + "%";
  path.setAttribute("font-size", "16px");
  path.setAttribute("fill", "hsla(0, 0%, 0%, .66)");
  path.setAttribute("font-weight", "bold");
  path.setAttribute("x", (cr_max_x - cr_min_x) * .25 + cr_min_x);
  if (card_width < 450) {
    path.setAttribute("y", cr_center_y + 45 + mobile_vert_offset);
  } else {
    path.setAttribute("y", cr_center_y + 45);
  }
  path.setAttribute("font-family", "Arial");
  path.setAttribute("text-anchor", "middle");
  cp_results.appendChild(path);

  var path = document.createElementNS("http://www.w3.org/2000/svg", "text");
  path.innerHTML = "BATTLE RATING";
  path.setAttribute("font-size", "14px");
  path.setAttribute("fill", "hsla(0, 0%, 0%, .66)");
  path.setAttribute("x", (cr_max_x - cr_min_x) * .25 + cr_min_x);
  if (card_width < 450) {
    path.setAttribute("y", cr_center_y + 62 + mobile_vert_offset);
  } else {
    path.setAttribute("y", cr_center_y + 62);
  }
  path.setAttribute("font-family", "Arial");
  path.setAttribute("text-anchor", "middle");
  cp_results.appendChild(path);

  var path = document.createElementNS("http://www.w3.org/2000/svg", "text");
  path.innerHTML = "Attack & Defense";
  path.setAttribute("font-size", "12px");
  path.setAttribute("fill", "hsla(0, 0%, 0%, .66)");
  path.setAttribute("x", (cr_max_x - cr_min_x) * .25 + cr_min_x);
  if (card_width < 450) {
    path.setAttribute("y", cr_center_y + 78 + mobile_vert_offset);
  } else {
    path.setAttribute("y", cr_center_y + 78);
  }
  path.setAttribute("font-family", "Arial");
  path.setAttribute("text-anchor", "middle");
  cp_results.appendChild(path);

  var path = document.createElementNS("http://www.w3.org/2000/svg", "text");
  path.innerHTML = (per_diff_br > 0?"+":"") + per_diff_br.toPrecision(3) + "% from avg";
  path.setAttribute("font-size", "12px");
  path.setAttribute("fill", "hsla(0, 0%, 0%, .66)");
  path.setAttribute("x", (cr_max_x - cr_min_x) * .25 + cr_min_x);
  if (card_width < 450) {
    path.setAttribute("y", cr_center_y + 94 + mobile_vert_offset);
  } else {
    path.setAttribute("y", cr_center_y + 94);
  }
  path.setAttribute("font-family", "Arial");
  path.setAttribute("text-anchor", "middle");
  cp_results.appendChild(path);




  var path = document.createElementNS("http://www.w3.org/2000/svg", "text");
  path.innerHTML = rating_cp.toPrecision(3) + "%";
  path.setAttribute("font-size", "16px");
  path.setAttribute("fill", "hsla(0, 0%, 0%, .66)");
  path.setAttribute("font-weight", "bold");
  path.setAttribute("x", (cr_max_x - cr_min_x) * .5 + cr_min_x);
  path.setAttribute("y", cr_center_y + 45);
  path.setAttribute("font-family", "Arial");
  path.setAttribute("text-anchor", "middle");
  cp_results.appendChild(path);

  var path = document.createElementNS("http://www.w3.org/2000/svg", "text");
  path.innerHTML = "CP RATING";
  path.setAttribute("font-size", "14px");
  path.setAttribute("fill", "hsla(0, 0%, 0%, .66)");
  path.setAttribute("x", (cr_max_x - cr_min_x) * .5 + cr_min_x);
  path.setAttribute("y", cr_center_y + 62);
  path.setAttribute("font-family", "Arial");
  path.setAttribute("text-anchor", "middle");
  cp_results.appendChild(path);

  var path = document.createElementNS("http://www.w3.org/2000/svg", "text");
  path.innerHTML = "All stats";
  path.setAttribute("font-size", "12px");
  path.setAttribute("fill", "hsla(0, 0%, 0%, .66)");
  path.setAttribute("x", (cr_max_x - cr_min_x) * .5 + cr_min_x);
  path.setAttribute("y", cr_center_y + 78);
  path.setAttribute("font-family", "Arial");
  path.setAttribute("text-anchor", "middle");
  cp_results.appendChild(path);

  var path = document.createElementNS("http://www.w3.org/2000/svg", "text");
  path.innerHTML = (per_diff_cp > 0?"+":"") + per_diff_cp.toPrecision(3) + "% from avg";
  path.setAttribute("font-size", "12px");
  path.setAttribute("fill", "hsla(0, 0%, 0%, .66)");
  path.setAttribute("x", (cr_max_x - cr_min_x) * .5 + cr_min_x);
  path.setAttribute("y", cr_center_y + 94);
  path.setAttribute("font-family", "Arial");
  path.setAttribute("text-anchor", "middle");
  cp_results.appendChild(path);








  var path = document.createElementNS("http://www.w3.org/2000/svg", "text");
  path.innerHTML = rating_sta.toPrecision(3) + "%";
  path.setAttribute("font-size", "16px");
  path.setAttribute("fill", "hsla(0, 0%, 0%, .66)");
  path.setAttribute("font-weight", "bold");
  path.setAttribute("x", (cr_max_x - cr_min_x) * .75 + cr_min_x);
  if (card_width < 450) {
    path.setAttribute("y", cr_center_y + 45 + mobile_vert_offset);
  } else {
    path.setAttribute("y", cr_center_y + 45);
  }
  path.setAttribute("font-family", "Arial");
  path.setAttribute("text-anchor", "middle");
  cp_results.appendChild(path);

  var path = document.createElementNS("http://www.w3.org/2000/svg", "text");
  path.innerHTML = "HP RATING";
  path.setAttribute("font-size", "14px");
  path.setAttribute("fill", "hsla(0, 0%, 0%, .66)");
  path.setAttribute("x", (cr_max_x - cr_min_x) * .75 + cr_min_x);
  if (card_width < 450) {
    path.setAttribute("y", cr_center_y + 62 + mobile_vert_offset);
  } else {
    path.setAttribute("y", cr_center_y + 62);
  }
  path.setAttribute("font-family", "Arial");
  path.setAttribute("text-anchor", "middle");
  cp_results.appendChild(path);

  var path = document.createElementNS("http://www.w3.org/2000/svg", "text");
  path.innerHTML = "Stamina";
  path.setAttribute("font-size", "12px");
  path.setAttribute("fill", "hsla(0, 0%, 0%, .66)");
  path.setAttribute("x", (cr_max_x - cr_min_x) * .75 + cr_min_x);
  if (card_width < 450) {
    path.setAttribute("y", cr_center_y + 78 + mobile_vert_offset);
  } else {
    path.setAttribute("y", cr_center_y + 78);
  }
  path.setAttribute("font-family", "Arial");
  path.setAttribute("text-anchor", "middle");
  cp_results.appendChild(path);


  var path = document.createElementNS("http://www.w3.org/2000/svg", "text");
  path.innerHTML = (per_diff_sta > 0?"+":"") + per_diff_sta.toPrecision(3) + "% from avg";
  path.setAttribute("font-size", "12px");
  path.setAttribute("fill", "hsla(0, 0%, 0%, .66)");
  path.setAttribute("x", (cr_max_x - cr_min_x) * .75 + cr_min_x);
  if (card_width < 450) {
    path.setAttribute("y", cr_center_y + 94 + mobile_vert_offset);
  } else {
    path.setAttribute("y", cr_center_y + 94);
  }
  path.setAttribute("font-family", "Arial");
  path.setAttribute("text-anchor", "middle");
  cp_results.appendChild(path);
}

drawImage();

 // Altered by TSR
var pokemon_selector = document.getElementById("pokemon_selector");
for (var i = 1; i <= 151; i++) {
  var pk = document.createElement("div");
  pk.className = "pkm pokemonOption pokemon pkm" + i;
  pk.id = i+"pkm";
  pk.setAttribute("style", "background-image:url("+ WEBROOT +"img/pokemon/icons/96x96/"+ i +".png);");
  pk.addEventListener("click", function(data) {
    closeMenu(parseInt(data.target.id));
  });
  pokemon_selector.appendChild(pk);
}


function openMenu() {
  pokemon_selector.setAttribute("style", "display: block");
}

function closeMenu(pk) {
  pk_id = pk;
  document.getElementById("pokemon_id").value = pk;
  pokemon_selector.removeAttribute("style");
  drawImage();
}

function updateIVNumbers(rating_br, rating_sta) {
  var textRating = "";
  console.log("rating_br: "+rating_br);
  console.log("rating_sta: "+rating_sta);
  switch (true) {
    case (Math.round((rating_br/100)*30) > 30 || Math.round((rating_sta/100)*15) > 15):
      textRating = "Hm... It looks like you probably better <b>move the arc a little higher</b>, traveler. Your numbers don't add up for this mon!";
      break;
    case (rating_br + rating_sta < 50):
      textRating = "Oh dear.  You ... may want to send this one to the professor. Afraid it's not gonna be competitive, traveler. :/";
      break;
    case (rating_br + rating_sta < 100):
      textRating = "This mon's IV's are a little worse than 'middle of the road' it seems, traveler.";
      break;
    case (rating_br + rating_sta < 150):
      textRating = "Now that's a pretty solid mon, you've got there. Not perfect, but definitely a decent fighter!";
      break;
    case (rating_br + rating_sta < 199):
      textRating = "Now that's a pretty solid mon, you've got there.";
      break;
    case (rating_br + rating_sta >= 200):
      textRating = "Wow, traveler. This mon has PERFECT IV's! Hang on to this one!";
      break;
    default:
      textRating = "Hmm... Something doesn't seem right about those stats. Make sure your HP and CP are correct, and that your Power-Up candy/stardust costs are right!";
      break;
  }
  document.getElementById("ratingText").innerHTML = textRating;
  document.getElementById("battleRatingValueLabel").innerHTML = Math.round((rating_br/100)*30);
  document.getElementById("staminaRatingValueLabel").innerHTML = Math.round((rating_sta/100)*15);

}
