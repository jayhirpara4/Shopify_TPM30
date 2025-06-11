function getUrlVars() {
  var vars = [],
    hash;
  var hashes = decodeURI(window.location.href)
    .slice(window.location.href.indexOf("?") + 1)
    .split("&");
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split("=");
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars;
}

function updateQueryStringParameter(uri, key, value) {
  var re = new RegExp("([?&])" + key + "=.*?(&|#|$)", "i");
  if (value === undefined) {
    if (uri.match(re)) {
      return uri
        .replace(re, "$1$2")
        .replace(/[?&]$/, "")
        .replaceAll(/([?&])&+/g, "$1")
        .replace(/[?&]#/, "#");
    } else {
      return uri;
    }
  } else {
    if (uri.match(re)) {
      return uri.replace(re, "$1" + key + "=" + value + "$2");
    } else {
      var hash = "";
      if (uri.indexOf("#") !== -1) {
        hash = uri.replace(/.*#/, "#");
        uri = uri.replace(/#.*/, "");
      }
      var separator = uri.indexOf("?") !== -1 ? "&" : "?";
      return uri + separator + key + "=" + value + hash;
    }
  }
}
function changeUri(data, key) {
  var urlElement = window.location.href;
  //var value = data.length<0 ? undefined : data;
  var newUrl = updateQueryStringParameter(urlElement, key, data);
  window.history.pushState({ path: newUrl }, "", newUrl);
}
var alreadydone = false;
var lastpage = 0;
//$(function(){
//Price Slider
var priceSlider = document.getElementById("diamonds-price-slider");
noUiSlider.create(priceSlider, {
  // start values are parsed by 'format'
  start: [0, 25000],
  range: {
    min: 0,
    "30%": [2e3, 100],
    "70%": [1e4, 500],
    "90%": [2e4, 1e3],
    max: 25000,
  },
  step: 100,
  tooltips: false,
  connect: true,
  //format: format,
  //pips: { mode: 'steps', format: format, density: 50 },
});
priceSlider.noUiSlider.on("update", function (values, handle) {
  var value = values[handle];
  if (handle) {
    $("#slide-max-price").val(value);
    $("#priceto").val(value);
  } else {
    $("#slide-min-price").val(value);
    $("#pricefrom").val(value);
  }
  //getData();
});

//Carat slider
var caratSlider = document.getElementById("diamonds-carat-slider");
noUiSlider.create(caratSlider, {
  // start values are parsed by 'format'
  start: [0, 15],
  range: { min: 0, max: 15 },
  step: 0.01,
  connect: true,
  tooltips: false,
});
caratSlider.noUiSlider.on("update", function (values, handle) {
  var value = values[handle];
  //if(!nosetcarat || nosetcarat=='0.2'){
  if (handle) {
    $("#slide-max-carat").val(value);
    $("#caratto").val(value);
  } else {
    $("#slide-min-carat").val(value);
    $("#caratfrom").val(value);
  }
  //}
  //getData();
});

//Cut slider
var cutSlider = document.getElementById("diamonds-cut-slider");
var cutValueForSlider = ["Good", "Very Good", "Excellent", "Ideal", "8X"];
var format = {
  to: function (value) {
    return cutValueForSlider[Math.round(value)];
  },
  from: function (value) {
    return cutValueForSlider.indexOf(value);
  },
};

noUiSlider.create(cutSlider, {
  // start values are parsed by 'format'
  start: [0, 5],
  range: { min: 0, max: 5 },
  step: 1,
  margin: 1,
  tooltips: false,
  connect: true,
  //format: format,
  //pips: { mode: 'steps', format: format, density: 50 },
});
cutSlider.noUiSlider.on("update", function (values, handle) {
  var value = values[handle];
  var idx = cutSlider.noUiSlider.get(true);
  var cutArray = [];
  for (var i = Math.round(idx[0]); i < Math.round(idx[1]); i++) {
    if (cutValueForSlider[i] != "" && cutValueForSlider[i] != "undefined") {
      cutArray.push(cutValueForSlider[i]);
    }
  }
  data = cutArray.filter(function (element) {
    return element !== undefined;
  });
  //console.log(data);
  $("#diamondcut").val(data);
  //getData();
});

//Color slider
var arbitraryValuesSlider = document.getElementById("diamonds-color-slider");
var arbitraryValuesForSlider = ["L", "K", "J", "I", "H", "G", "F", "E", "D"];

var format = {
  to: function (value) {
    return arbitraryValuesForSlider[Math.round(value)];
  },
  from: function (value) {
    return arbitraryValuesForSlider.indexOf(value);
  },
};

noUiSlider.create(arbitraryValuesSlider, {
  // start values are parsed by 'format'
  start: [0, 9],
  range: { min: 0, max: 9 },
  step: 1,
  margin: 1,
  tooltips: false,
  connect: true,
  //format: format,
  //pips: { mode: 'steps', format: format, density: 50 },
});
arbitraryValuesSlider.noUiSlider.on("update", function (values, handle) {
  var value = values[handle];
  var idx = arbitraryValuesSlider.noUiSlider.get(true);
  var colorArray = [];
  for (var i = Math.round(idx[0]); i < Math.round(idx[1]); i++) {
    if (
      arbitraryValuesForSlider[i] != "" &&
      arbitraryValuesForSlider[i] != "undefined"
    ) {
      colorArray.push(arbitraryValuesForSlider[i]);
    }
  }
  data = colorArray.filter(function (element) {
    return element !== undefined;
  });
  //console.log(data)
  $("#diamondcolor").val(data);
  //$('#diamondcolor').val(colorArray);
  //getData();
});

//Clairty slider
var clarityValuesSlider = document.getElementById("diamonds-clarity-slider");
var clarityValuesForSlider = [
  "I1",
  "SI2",
  "SI1",
  "VS2",
  "VS1",
  "VVS2",
  "VVS1",
  "IF",
  "FL",
];

var format = {
  to: function (value) {
    return clarityValuesForSlider[Math.round(value)];
  },
  from: function (value) {
    return clarityValuesForSlider.indexOf(value);
  },
};

noUiSlider.create(clarityValuesSlider, {
  // start values are parsed by 'format'
  start: [0, 9],
  range: { min: 0, max: 9 },
  step: 1,
  margin: 1,
  tooltips: false,
  connect: true,
  //format: format,
  //pips: { mode: 'steps', format: format, density: 50 },
});
clarityValuesSlider.noUiSlider.on("update", function (values, handle) {
  var value = values[handle];
  var idx = clarityValuesSlider.noUiSlider.get(true);
  var clrtyArray = [];
  for (var i = Math.round(idx[0]); i < Math.round(idx[1]); i++) {
    if (
      clarityValuesForSlider[i] != "" &&
      clarityValuesForSlider[i] != "undefined"
    ) {
      clrtyArray.push(clarityValuesForSlider[i]);
    }
  }
  data = clrtyArray.filter(function (element) {
    return element !== undefined;
  });
  //console.log(data)
  $("#diamondclarity").val(data);
  //getData();
});

//Polish Filter
var ploishValuesSlider = document.getElementById("diamonds-polish-slider");
var polishValuesForSlider = ["Fair", "Good", "Very Good", "Excellent"];

var format = {
  to: function (value) {
    return polishValuesForSlider[Math.round(value)];
  },
  from: function (value) {
    return polishValuesForSlider.indexOf(value);
  },
};
noUiSlider.create(ploishValuesSlider, {
  // start values are parsed by 'format'
  start: [0, 4],
  range: { min: 0, max: 4 },
  step: 1,
  margin: 1,
  tooltips: false,
  connect: true,
  //format: format,
  //pips: { mode: 'steps', format: format, density: 50 },
});
ploishValuesSlider.noUiSlider.on("update", function (values, handle) {
  var value = values[handle];
  var idx = ploishValuesSlider.noUiSlider.get(true);
  var polishArray = [];
  for (var i = Math.round(idx[0]); i < Math.round(idx[1]); i++) {
    if (
      polishValuesForSlider[i] != "" &&
      polishValuesForSlider[i] != "undefined"
    ) {
      polishArray.push(polishValuesForSlider[i]);
    }
  }
  data = polishArray.filter(function (element) {
    return element !== undefined;
  });
  $("#diamondpolish").val(data);
  //getData();
});

//symmetry Filter
var symmetryValuesSlider = document.getElementById("diamonds-symmetry-slider");
var symmetryValuesForSlider = ["Fair", "Good", "Very Good", "Excellent"];

var format = {
  to: function (value) {
    return symmetryValuesForSlider[Math.round(value)];
  },
  from: function (value) {
    return symmetryValuesForSlider.indexOf(value);
  },
};
noUiSlider.create(symmetryValuesSlider, {
  // start values are parsed by 'format'
  start: [0, 4],
  range: { min: 0, max: 4 },
  step: 1,
  margin: 1,
  tooltips: false,
  connect: true,
  //format: format,
  //pips: { mode: 'steps', format: format, density: 50 },
});
symmetryValuesSlider.noUiSlider.on("update", function (values, handle) {
  var value = values[handle];
  var idx = symmetryValuesSlider.noUiSlider.get(true);
  var symArray = [];
  for (var i = Math.round(idx[0]); i < Math.round(idx[1]); i++) {
    if (
      symmetryValuesForSlider[i] != "" &&
      symmetryValuesForSlider[i] != "undefined"
    ) {
      symArray.push(symmetryValuesForSlider[i]);
    }
  }
  data = symArray.filter(function (element) {
    return element !== undefined;
  });
  $("#diamondsymetry").val(data);
  //getData();
});

//fluorescence Filter
var fluorescenceValuesSlider = document.getElementById(
  "diamonds-fluorescence-slider"
);
var fluorescenceValuesForSlider = ["Strong", "Medium", "Faint", "None"];

var format = {
  to: function (value) {
    return fluorescenceValuesForSlider[Math.round(value)];
  },
  from: function (value) {
    return fluorescenceValuesForSlider.indexOf(value);
  },
};
noUiSlider.create(fluorescenceValuesSlider, {
  // start values are parsed by 'format'
  start: [0, 4],
  range: { min: 0, max: 4 },
  step: 1,
  margin: 1,
  tooltips: false,
  connect: true,
  //format: format,
  //pips: { mode: 'steps', format: format, density: 50 },
});
fluorescenceValuesSlider.noUiSlider.on("update", function (values, handle) {
  var value = values[handle];
  var idx = fluorescenceValuesSlider.noUiSlider.get(true);
  var fluArray = [];
  for (var i = Math.round(idx[0]); i < Math.round(idx[1]); i++) {
    if (
      fluorescenceValuesForSlider[i] != "" &&
      fluorescenceValuesForSlider[i] != "undefined"
    ) {
      fluArray.push(fluorescenceValuesForSlider[i]);
    }
  }
  data = fluArray.filter(function (element) {
    return element !== undefined;
  });

  $("#diamondflurence").val(data);
  //getData();
});

//LW Filter
var lwSlider = document.getElementById("diamonds-lw-ratio-slider");
noUiSlider.create(lwSlider, {
  // start values are parsed by 'format'
  start: [0.8, 3.0],
  range: { min: 0.8, max: 3.0 },
  step: 0.01,
  tooltips: false,
  connect: true,
});
lwSlider.noUiSlider.on("update", function (values, handle) {
  var value = values[handle];
  if (handle) {
    $("#slide-max-lw-ratio").val(value);
    $("#lwto").val(value);
    var value = value > 0 ? value : undefined;
    //changeUri(value,'lwto');
  } else {
    $("#slide-min-lw-ratio").val(value);
    $("#lwfrom").val(value);
    var value = value > 0 ? value : undefined;
    //changeUri(value,'lwfrom');
  }
  //getData();
});

//table Filter
var tableSlider = document.getElementById("diamonds-table-slider");
noUiSlider.create(tableSlider, {
  // start values are parsed by 'format'
  start: [40, 90],
  range: { min: 40, max: 90 },
  step: 0.01,
  connect: true,
  tooltips: false,
});
tableSlider.noUiSlider.on("update", function (values, handle) {
  var value = values[handle];
  if (handle) {
    $("#slide-max-table").val(value);
    $("#tableto").val(value);
    var value = value > 0 ? value : undefined;
    //changeUri(value,'tableto');
  } else {
    $("#slide-min-table").val(value);
    $("#tablefrom").val(value);
    var value = value > 0 ? value : undefined;
    //changeUri(value,'tablefrom');
  }
  //getData();
});

//Depth Filter
var depthSlider = document.getElementById("diamonds-depth-slider");
noUiSlider.create(depthSlider, {
  // start values are parsed by 'format'
  start: [40, 90],
  range: { min: 40, max: 90 },
  step: 0.01,
  connect: true,
  tooltips: false,
});
depthSlider.noUiSlider.on("update", function (values, handle) {
  var value = values[handle];
  if (handle) {
    $("#slide-max-depth").val(value);
    $("#depthto").val(value);
    var value = value > 0 ? value : undefined;
    //changeUri(value,'depthto');
  } else {
    $("#slide-min-depth").val(value);
    $("#depthfrom").val(value);
    var value = value > 0 ? value : undefined;
    //changeUri(value,'depthfrom');
  }
  //getData();
});

//Get Query params and set filter
var q_shape = getUrlVars()["shape"];
var q_diamondcut = getUrlVars()["diamondcut"];
var q_diamondcolor = getUrlVars()["diamondcolor"];
var q_diamondclarity = getUrlVars()["diamondclarity"];
var q_diamondpolish = getUrlVars()["diamondpolish"];
var q_diamondsymetry = getUrlVars()["diamondsymetry"];
var q_diamondflurence = getUrlVars()["diamondflurence"];
var q_pricefrom = getUrlVars()["pricefrom"];
var q_priceto = getUrlVars()["priceto"];
var q_caratfrom = getUrlVars()["caratfrom"];
var q_caratto = getUrlVars()["caratto"];
var q_lwfrom = getUrlVars()["lwfrom"];
var q_lwto = getUrlVars()["lwto"];
var q_tablefrom = getUrlVars()["tablefrom"];
var q_tableto = getUrlVars()["tableto"];
var q_depthfrom = getUrlVars()["depthfrom"];
var q_depthto = getUrlVars()["depthto"];
var q_featureddeal = getUrlVars()["featureddeal"];
var q_quickship = getUrlVars()["quickship"];

setTimeout(function () {
  //shapes
  if (q_shape) {
    var QueryShapes = q_shape.split(",");
    if (QueryShapes.length > 1 && QueryShapes[0] != "") {
      var Querylength = QueryShapes.length;
      for (var i = 0; i < Querylength; i++) {
        $('[data-value="' + QueryShapes[i] + '"]').trigger("click");
      }
    } else {
      $('[data-value="' + q_shape + '"]').trigger("click");
    }
    //console.log(q_shape);
  }

  //diamondcut
  if (q_diamondcut) {
    var QueryCuts = q_diamondcut.split(",");
    if (QueryCuts.length > 1 && QueryCuts[0] != "") {
      var QueryCutlength = QueryCuts.length;
      var startindex = cutValueForSlider.indexOf(QueryCuts[0]);
      var endindex = cutValueForSlider.indexOf(QueryCuts[QueryCutlength - 1]);
      $("#diamonds-cut-slider")[0].noUiSlider.set([startindex, endindex + 1]);
    }
  }

  //q_diamondcolor
  if (q_diamondcolor) {
    var QueryColor = q_diamondcolor.split(",");
    if (QueryColor.length > 1 && QueryColor[0] != "") {
      var QueryColorlength = QueryColor.length;
      var startindex = arbitraryValuesForSlider.indexOf(QueryColor[0]);
      var endindex = arbitraryValuesForSlider.indexOf(
        QueryColor[QueryColorlength - 1]
      );
      $("#diamonds-color-slider")[0].noUiSlider.set([startindex, endindex + 1]);
    }
  }

  //q_diamondclarity
  if (q_diamondclarity) {
    var QueryClarity = q_diamondclarity.split(",");
    if (QueryClarity.length > 1 && QueryClarity[0] != "") {
      var QueryClaritylength = QueryClarity.length;
      var startindex = clarityValuesForSlider.indexOf(QueryClarity[0]);
      var endindex = clarityValuesForSlider.indexOf(
        QueryClarity[QueryClaritylength - 1]
      );
      $("#diamonds-clarity-slider")[0].noUiSlider.set([
        startindex,
        endindex + 1,
      ]);
    }
  }

  //q_diamondpolish
  if (q_diamondpolish) {
    var QueryPolish = q_diamondpolish.split(",");
    if (QueryPolish.length > 1 && QueryPolish[0] != "") {
      var QueryPolishlength = QueryPolish.length;
      var startindex = polishValuesForSlider.indexOf(QueryPolish[0]);
      var endindex = polishValuesForSlider.indexOf(
        QueryPolish[QueryPolishlength - 1]
      );
      $("#diamonds-polish-slider")[0].noUiSlider.set([
        startindex,
        endindex + 1,
      ]);
    }
  }

  //q_diamondsymetry
  if (q_diamondsymetry) {
    var QuerySym = q_diamondsymetry.split(",");
    if (QuerySym.length > 1 && QuerySym[0] != "") {
      var QuerySymlength = QuerySym.length;
      var startindex = symmetryValuesForSlider.indexOf(QuerySym[0]);
      var endindex = symmetryValuesForSlider.indexOf(
        QuerySym[QuerySymlength - 1]
      );
      $("#diamonds-symmetry-slider")[0].noUiSlider.set([
        startindex,
        endindex + 1,
      ]);
    }
  }

  //q_diamondflurence
  if (q_diamondflurence) {
    var QueryFlu = q_diamondflurence.split(",");
    if (QueryFlu.length > 1 && QueryFlu[0] != "") {
      var QueryFlulength = QueryFlu.length;
      var startindex = fluorescenceValuesForSlider.indexOf(QueryFlu[0]);
      var endindex = fluorescenceValuesForSlider.indexOf(
        QueryFlu[QueryFlulength - 1]
      );
      $("#diamonds-fluorescence-slider")[0].noUiSlider.set([
        startindex,
        endindex + 1,
      ]);
    }
  }

  //Price
  if (q_pricefrom && !q_priceto) {
    $("#diamonds-price-slider")[0].noUiSlider.set([q_pricefrom, 25000]);
  }
  if (!q_pricefrom && q_priceto) {
    $("#diamonds-price-slider")[0].noUiSlider.set([0, q_priceto]);
  }
  if (q_pricefrom && q_priceto) {
    $("#diamonds-price-slider")[0].noUiSlider.set([q_pricefrom, q_priceto]);
  }

  //Carat
  if (!q_caratfrom && q_caratto) {
    $("#diamonds-carat-slider")[0].noUiSlider.set([0, q_caratto]);
  }
  if (q_caratfrom && !q_caratto) {
    $("#diamonds-carat-slider")[0].noUiSlider.set([q_caratfrom, 15]);
  }
  if (q_caratfrom && q_caratto) {
    $("#diamonds-carat-slider")[0].noUiSlider.set([q_caratfrom, q_caratto]);
  }

  //L&W
  if (q_lwfrom && !q_lwto) {
    $("#diamonds-lw-ratio-slider")[0].noUiSlider.set([q_lwfrom, 3]);
  }
  if (!q_lwfrom && q_lwto) {
    $("#diamonds-lw-ratio-slider")[0].noUiSlider.set([0.8, q_lwto]);
  }
  if (q_lwfrom && q_lwto) {
    $("#diamonds-lw-ratio-slider")[0].noUiSlider.set([q_lwfrom, q_lwto]);
  }

  //Table
  if (q_tablefrom && !q_tableto) {
    $("#diamonds-table-slider")[0].noUiSlider.set([q_tablefrom, 90]);
  }
  if (!q_tablefrom && q_tableto) {
    $("#diamonds-table-slider")[0].noUiSlider.set([40, q_tableto]);
  }
  if (q_tablefrom && q_tableto) {
    $("#diamonds-table-slider")[0].noUiSlider.set([q_tablefrom, q_tableto]);
  }

  //Depth
  if (!q_depthfrom && q_depthto) {
    $("#diamonds-depth-slider")[0].noUiSlider.set([40, q_depthto]);
  }
  if (q_depthfrom && !q_depthto) {
    $("#diamonds-depth-slider")[0].noUiSlider.set([q_depthfrom, 90]);
  }
  if (q_depthfrom && q_depthto) {
    $("#diamonds-depth-slider")[0].noUiSlider.set([q_depthfrom, q_depthto]);
  }
  getData();
}, 500);
// set filter end

//Submit filter data
$(".diamondfilter").on("click", function () {
  if ($(this).hasClass("slide-active")) {
    $(this).removeClass("slide-active");
  } else {
    $(this).addClass("slide-active");
  }
  var alltypes = [];
  $(".diamondfilter").each(function (i, obj) {
    if ($(this).hasClass("slide-active")) {
      alltypes.push($(this).attr("data-value"));
    }
  });
  $("#diamondtype").val(alltypes);
  //var urlElement = window.location.href;
  var value = alltypes.length < 0 ? undefined : alltypes;
  //var newUrl = updateQueryStringParameter( urlElement, 'shape', value );
  //window.history.pushState({ path: newUrl }, '', newUrl);
  changeUri(alltypes, "shape");
  getData();
});
//Set price value
$("#slide-min-price").on("blur", function () {
  if ($.isNumeric(this.value)) {
    $("#pricefrom").val(this.value);
    $("#diamonds-price-slider")[0].noUiSlider.set([this.value]);
    var value = this.value > 0 ? this.value : undefined;
    changeUri(value, "pricefrom");
    getData();
  } else {
    $(this).val("");
    changeUri(0.0, "pricefrom");
  }
});
$("#slide-max-price").on("blur", function () {
  if ($.isNumeric(this.value)) {
    $("#priceto").val(this.value);
    $("#diamonds-price-slider")[0].noUiSlider.set([
      $("#slide-min-carat").val(),
      this.value,
    ]);
    var value = this.value > 0 ? this.value : undefined;
    changeUri(value, "priceto");
    getData();
  } else {
    $(this).val("");
    changeUri(25000.0, "priceto");
  }
});

//Set carat value
$("#slide-min-carat").on("blur", function () {
  if ($.isNumeric(this.value)) {
    $("#caratfrom").val(this.value);
    $("#diamonds-carat-slider")[0].noUiSlider.set([this.value]);
    var value = this.value > 0 ? this.value : undefined;
    changeUri(value, "caratfrom");
    getData();
  } else {
    $(this).val("");
    changeUri(0.0, "caratfrom");
  }
});
$("#slide-max-carat").on("blur", function () {
  if ($.isNumeric(this.value)) {
    $("#caratto").val(this.value);
    $("#diamonds-carat-slider")[0].noUiSlider.set([
      $("#slide-min-carat").val(),
      this.value,
    ]);
    var value = this.value > 0 ? this.value : undefined;
    changeUri(value, "caratto");
    getData();
  } else {
    $(this).val("");
    changeUri(15.0, "caratto");
  }
});

//Set lw value
$("#slide-min-lw-ratio").on("blur", function () {
  if ($.isNumeric(this.value)) {
    $("#lwfrom").val(this.value);
    $("#diamonds-lw-ratio-slider")[0].noUiSlider.set([this.value]);
    var value = this.value > 0 ? this.value : undefined;
    changeUri(value, "lwfrom");
    getData();
  } else {
    $(this).val("");
    changeUri(0.8, "lwfrom");
  }
});
$("#slide-max-lw-ratio").on("blur", function () {
  if ($.isNumeric(this.value)) {
    $("#lwto").val(this.value);
    $("#diamonds-lw-ratio-slider")[0].noUiSlider.set([
      $("#lwfrom").val(),
      this.value,
    ]);
    var value = this.value > 0 ? this.value : undefined;
    changeUri(value, "lwto");
    getData();
  } else {
    $(this).val("");
    changeUri(3.0, "lwto");
  }
});

//Set table value
$("#slide-min-table").on("blur", function () {
  if ($.isNumeric(this.value)) {
    $("#tablefrom").val(this.value);
    $("#diamonds-table-slider")[0].noUiSlider.set([this.value]);
    var value = this.value > 0 ? this.value : undefined;
    changeUri(value, "tablefrom");
    getData();
  } else {
    $(this).val("");
    changeUri(40.0, "tablefrom");
  }
});
$("#slide-max-table").on("blur", function () {
  if ($.isNumeric(this.value)) {
    $("#tableto").val(this.value);
    $("#diamonds-table-slider")[0].noUiSlider.set([
      $("#tablefrom").val(),
      this.value,
    ]);
    var value = this.value > 0 ? this.value : undefined;
    changeUri(value, "tableto");
    getData();
  } else {
    $(this).val("");
    changeUri(90.0, "tableto");
  }
});

//Set table value
$("#slide-min-depth").on("blur", function () {
  if ($.isNumeric(this.value)) {
    $("#depthfrom").val(this.value);
    $("#diamonds-depth-slider")[0].noUiSlider.set([this.value]);
    var value = this.value > 0 ? this.value : undefined;
    changeUri(value, "depthfrom");
    getData();
  } else {
    $(this).val("");
    changeUri(40.0, "depthfrom");
  }
});
$("#slide-max-depth").on("blur", function () {
  if ($.isNumeric(this.value)) {
    $("#depthto").val(this.value);
    $("#diamonds-depth-slider")[0].noUiSlider.set([
      $("#depthfrom").val(),
      this.value,
    ]);
    var value = this.value > 0 ? this.value : undefined;
    changeUri(value, "depthto");
    getData();
  } else {
    $(this).val("");
    changeUri(90.0, "depthto");
  }
});

//Featured deal
$(".diamond__featured-deal").on("click", function () {
  if ($(this).hasClass("quick-active")) {
    $(this).removeClass("quick-active");
    $("#featureddeal").val(0);
    changeUri(undefined, "featureddeal");
  } else {
    $(this).addClass("quick-active");
    $("#featureddeal").val(1);
    changeUri(1, "featureddeal");
  }
  getData();
});

//Quick ship deal
$(".diamond__quick-shop-tab").on("click", function () {
  if ($(this).hasClass("quick-active")) {
    $(this).removeClass("quick-active");
    $("#quickship").val(0);
    changeUri(undefined, "quickship");
  } else {
    $(this).addClass("quick-active");
    $("#quickship").val(1);
    changeUri(1, "quickship");
  }
  getData();
});

//Sort dropdown
$(".select-dropdown__button , .report-dropdown__button").on(
  "click",
  function () {
    $(this).next(".select-dropdown__list").toggleClass("active");
  }
);
$("#diamond__report-list li").on("click", function () {
  $(this).parent().parent().find(".sort_by-title").text($(this).text());
  $("#reportby").val($(this).attr("data-value"));
  $(".report-dropdown__button")
    .next(".select-dropdown__list")
    .removeClass("active");
  getData();
});
$("#diamond__sort-by li").on("click", function () {
  $(this).parent().parent().find(".sort_by-title").text($(this).text());
  $("#sortby").val($(this).attr("data-value"));
  $(".select-dropdown__button")
    .next(".select-dropdown__list")
    .removeClass("active");
  getData();
});

//compare
$(".comparenow").on("click", function () {
  if ($(this).hasClass("quick-active")) {
    $(this).removeClass("quick-active");
    $("#blankcpmtable").hide();
    $("#diamondtable").show();
    $(".diamond-list").show();
    $(".addcmp").show();
  } else {
    $(this).addClass("quick-active");
    if ($(".diamond-compare.active").length <= 0) {
      $("#blankcpmtable").show();
      $("#diamondtable").hide();
    } else {
      $(".diamond-list").hide();
      $(".addcmp").show();
    }
  }
});
$(document).on("click", ".diamond-compare", function () {
  if ($(this).hasClass("active")) {
    $(this).parent().removeClass("addcmp");
    $(this).removeClass("active");
    $("#totalCmp").text($(".diamond-compare.active").length);
  } else {
    $(this).addClass("active");
    $(this).parent().addClass("addcmp");
    $("#totalCmp").text($(".diamond-compare.active").length);
  }
});

//Certificiate search
$("#certsearch").on("click", function () {
  $("#certnum").val($("#searchinp").val());
  getData();
});
//Range change events
$("#diamonds-price-slider")[0].noUiSlider.on("change", function (v, handle) {
  var value = v[handle];
  if (handle) {
    var value = value > 0 ? value : 25000.0;
    changeUri(value, "priceto");
  } else {
    var value = value > 0 ? value : 0.0;
    changeUri(value, "pricefrom");
  }
  getData();
});
$("#diamonds-carat-slider")[0].noUiSlider.on("change", function (v, handle) {
  var value = v[handle];
  if (handle) {
    var value = value > 0 ? value : 15.0;
    changeUri(value, "caratto");
  } else {
    var value = value > 0 ? value : 0.0;
    changeUri(value, "caratfrom");
  }
  getData();
});
$("#diamonds-cut-slider")[0].noUiSlider.on("change", function (v, handle) {
  var value = v[handle];
  var idx = cutSlider.noUiSlider.get(true);
  var cutArray = [];
  for (var i = Math.round(idx[0]); i < Math.round(idx[1]); i++) {
    if (cutValueForSlider[i] != "" && cutValueForSlider[i] != "undefined") {
      cutArray.push(cutValueForSlider[i]);
    }
  }
  data = cutArray.filter(function (element) {
    return element !== undefined;
  });
  var value =
    data.length > 0 && cutValueForSlider.length != data.length
      ? data
      : undefined;
  changeUri(value, "diamondcut");
  getData();
});
$("#diamonds-color-slider")[0].noUiSlider.on("change", function (v, handle) {
  var value = v[handle];
  var idx = arbitraryValuesSlider.noUiSlider.get(true);
  var colorArray = [];
  for (var i = Math.round(idx[0]); i < Math.round(idx[1]); i++) {
    if (
      arbitraryValuesForSlider[i] != "" &&
      arbitraryValuesForSlider[i] != "undefined"
    ) {
      colorArray.push(arbitraryValuesForSlider[i]);
    }
  }
  data = colorArray.filter(function (element) {
    return element !== undefined;
  });
  var value =
    data.length > 0 && arbitraryValuesForSlider.length != data.length
      ? data
      : undefined;
  changeUri(value, "diamondcolor");
  getData();
});
$("#diamonds-clarity-slider")[0].noUiSlider.on("change", function (v, handle) {
  var value = v[handle];
  var idx = clarityValuesSlider.noUiSlider.get(true);
  var clartyArray = [];
  for (var i = Math.round(idx[0]); i < Math.round(idx[1]); i++) {
    if (
      clarityValuesForSlider[i] != "" &&
      clarityValuesForSlider[i] != "undefined"
    ) {
      clartyArray.push(clarityValuesForSlider[i]);
    }
  }
  data = clartyArray.filter(function (element) {
    return element !== undefined;
  });
  var value =
    data.length > 0 && clarityValuesForSlider.length != data.length
      ? data
      : undefined;
  changeUri(value, "diamondclarity");
  getData();
});
$("#diamonds-polish-slider")[0].noUiSlider.on("change", function (v, handle) {
  var value = v[handle];
  var idx = ploishValuesSlider.noUiSlider.get(true);
  var polishArray = [];
  for (var i = Math.round(idx[0]); i < Math.round(idx[1]); i++) {
    if (
      polishValuesForSlider[i] != "" &&
      polishValuesForSlider[i] != "undefined"
    ) {
      polishArray.push(polishValuesForSlider[i]);
    }
  }
  data = polishArray.filter(function (element) {
    return element !== undefined;
  });
  var value =
    data.length > 0 && polishValuesForSlider.length != data.length
      ? data
      : undefined;
  changeUri(value, "diamondpolish");
  getData();
});
$("#diamonds-symmetry-slider")[0].noUiSlider.on("change", function (v, handle) {
  var value = v[handle];
  var idx = symmetryValuesSlider.noUiSlider.get(true);
  var symArray = [];
  for (var i = Math.round(idx[0]); i < Math.round(idx[1]); i++) {
    if (
      symmetryValuesForSlider[i] != "" &&
      symmetryValuesForSlider[i] != "undefined"
    ) {
      symArray.push(symmetryValuesForSlider[i]);
    }
  }
  data = symArray.filter(function (element) {
    return element !== undefined;
  });
  var value =
    data.length > 0 && symmetryValuesForSlider.length != data.length
      ? data
      : undefined;
  changeUri(value, "diamondsymetry");
  getData();
});
$("#diamonds-fluorescence-slider")[0].noUiSlider.on(
  "change",
  function (v, handle) {
    var value = v[handle];
    var idx = fluorescenceValuesSlider.noUiSlider.get(true);
    var floArray = [];
    for (var i = Math.round(idx[0]); i < Math.round(idx[1]); i++) {
      if (
        fluorescenceValuesForSlider[i] != "" &&
        fluorescenceValuesForSlider[i] != "undefined"
      ) {
        floArray.push(fluorescenceValuesForSlider[i]);
      }
    }
    data = floArray.filter(function (element) {
      return element !== undefined;
    });
    var value =
      data.length > 0 && fluorescenceValuesForSlider.length != data.length
        ? data
        : undefined;
    changeUri(value, "diamondflurence");
    getData();
  }
);
$("#diamonds-lw-ratio-slider")[0].noUiSlider.on("change", function (v, handle) {
  var value = v[handle];
  if (handle) {
    var value = value > 0 ? value : 3.0;
    changeUri(value, "lwto");
  } else {
    var value = value > 0 ? value : 0.8;
    changeUri(value, "lwfrom");
  }
  getData();
});
$("#diamonds-table-slider")[0].noUiSlider.on("change", function (v, handle) {
  var value = v[handle];
  if (handle) {
    var value = value > 0 ? value : 90.0;
    changeUri(value, "tableto");
  } else {
    var value = value > 0 ? value : 40.0;
    changeUri(value, "tablefrom");
  }
  getData();
});
$("#diamonds-depth-slider")[0].noUiSlider.on("change", function (v, handle) {
  var value = v[handle];
  if (handle) {
    var value = value > 0 ? value : 90.0;
    changeUri(value, "depthto");
  } else {
    var value = value > 0 ? value : 40.0;
    changeUri(value, "depthfrom");
  }
  getData();
});
//Range change events end

function doloader(type) {
  if (type == "show") {
    $(".mainloader").show();
  } else {
    $(".mainloader").hide();
  }
}

async function getData(page = 1) {
  doloader("show");
  var user = "fooPalawat";
  var pass = "barPalawat";
  var authorizationBasic = window.btoa(user + ":" + pass);
  const config = {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: "Basic " + authorizationBasic,
    },
  };
  //axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
  var form = document.getElementById("filterform");
  let formData = new FormData(form);
  await axios
    .post(`${theme.settings.apiUrl}/search?page=${page}`, formData, config)
    .then((response) => {
      //console.log(response.data.Diamonds);
      $("#diamond-total-count").text("of " + response.data.total);
      $("#diamond-count").text(response.data.Diamonds.total);
      var diamondData = response.data.Diamonds.data;
      var diamondNext = response.data.Diamonds.next_page_url;
      if (diamondNext) {
        var result = diamondNext.split("?page=");
        $("#nextpage").attr("data-href", result[1]);
      } else {
        $("#nextpage").attr("data-href", "");
      }
      var diamondRow = "";
      var dlastid = 0;
      //console.log(Currency.convert(100, 'USD', 'INR')/100).toFixed(2);
      if (diamondData.length > 0) {
        if (response.data.type != "Earring") {
          $.each(diamondData, function (key, value) {
            dlastid = value.id;
            diamondRow +=
              '<div class="diamond-list drlist no-pair-diamond" id="diamondcomes' +
              value.id +
              '">\
                <div class="diamond-compare"><div><span></span></div></div>\
                <div class="diamond-image-wrapper">\
                    <a href="/products/diamonds?sku=' +
              value.sku +
              '">';
            if (value.is_featured > 0) {
              diamondRow += "<p>Featured deal</p>";
            }
            diamondRow += '<div class="diamond-image">';
            if (value.cover_pic.indexOf("http") == 0) {
              diamondRow +=
                '<img src="' + value.cover_pic + '" alt="' + value.title + '">';
            } else {
              diamondRow +=
                '<img src="' +
                theme.settings.assetUrl +
                value.cover_pic +
                '" alt="' +
                value.title +
                '">';
            }
            diamondRow +=
              '</div>\
                    </a>\
                </div>\
                <div class="medium-up--hide diamond-mobile-info">\
                    <a href="/products/diamonds?sku=' +
              value.sku +
              '">\
                        <p>' +
              value.title +
              '</p>\
                        <p class="extra-info">' +
              value.cut +
              " / " +
              value.color +
              " / " +
              value.clarity +
              '</p>\
                        <div class="extra-price-html diamond-price">';
            if (value.sale_price > 0) {
              diamondRow +=
                '<span class="main-price">' +
                theme.Currency.formatMoney(
                  Currency.convert(
                    value.sale_price * 100,
                    "USD",
                    theme.settings.shopCurrency
                  ),
                  theme.settings.moneyFormat
                ) +
                "</span>";
            } else {
              diamondRow +=
                '<span class="main-price">' +
                theme.Currency.formatMoney(
                  Currency.convert(
                    value.original_price * 100,
                    "USD",
                    theme.settings.shopCurrency
                  ),
                  theme.settings.moneyFormat
                ) +
                "</span>";
            }

            diamondRow +=
              '</div>\
                    </a>\
                </div>\
                <div class="small--hide">\
                    <a href="/products/diamonds?sku=' +
              value.sku +
              '">' +
              value.shape +
              '</a>\
                </div>\
                <div class="small--hide">\
                    <a href="/products/diamonds?sku=' +
              value.sku +
              '" >' +
              value.carat +
              '</a>\
                </div>\
                <div class="small--hide">\
                    <a href="/products/diamonds?sku=' +
              value.sku +
              '" >' +
              value.color +
              '</a>\
                </div>\
                <div class="small--hide">\
                    <a href="/products/diamonds?sku=' +
              value.sku +
              '" >' +
              value.clarity +
              '</a>\
                </div>\
                <div class="small--hide">\
                    <a href="/products/diamonds?sku=' +
              value.sku +
              '" >' +
              value.cut +
              '</a>\
                </div>\
                <div class="small--hide">\
                    <a href="/products/diamonds?sku=' +
              value.sku +
              '" >' +
              value.lab +
              '</a>\
                </div>\
                <div class="additional-field  small--hide">\
                    <a href="/products/diamonds?sku=' +
              value.sku +
              '" >' +
              value.symmetry +
              '</a>\
                </div>\
                <div class="additional-field small--hide">\
                    <a href="/products/diamonds?sku=' +
              value.sku +
              '" >' +
              value.polish +
              '</a>\
                </div>\
                <div class="additional-field small--hide">\
                    <a href="/products/diamonds?sku=' +
              value.sku +
              '" >' +
              value.culet +
              '</a>\
                </div>\
                <div class="additional-field small--hide">\
                    <a href="/products/diamonds?sku=' +
              value.sku +
              '" >' +
              value.fluorescence +
              '</a>\
                </div>\
                <div class="additional-field small--hide">\
                    <a href="/products/diamonds?sku=' +
              value.sku +
              '" >' +
              value.lw_ratio +
              '</a>\
                </div>\
                <div class="additional-field small--hide">\
                    <a href="/products/diamonds?sku=' +
              value.sku +
              '" >' +
              value.depth +
              '</a>\
                </div>\
                <div class="additional-field small--hide">\
                    <a href="/products/diamonds?sku=' +
              value.sku +
              '" >' +
              value.table +
              '</a>\
                </div>\
                <div class="small--hide">\
                    <a href="/products/diamonds?sku=' +
              value.sku +
              '">';
            if (value.is_quickship > 0) {
              diamondRow += '<span class="quick-ship"></span>';
            } else {
              diamondRow += '<span class="no-quick-ship"></span>';
            }
            diamondRow +=
              '</a>\
                </div>\
                <div class="diamond-price small--hide">\
                    <a href="/products/diamonds?sku=' +
              value.sku +
              '">';
            if (value.sale_price > 0) {
              diamondRow +=
                '<span class="main-price">' +
                theme.Currency.formatMoney(
                  Currency.convert(
                    value.sale_price * 100,
                    "USD",
                    theme.settings.shopCurrency
                  ),
                  theme.settings.moneyFormat
                ) +
                '</span><small><del class="other-price">' +
                theme.Currency.formatMoney(
                  Currency.convert(
                    value.original_price * 100,
                    "USD",
                    theme.settings.shopCurrency
                  ),
                  theme.settings.moneyFormat
                ) +
                "</del></small>";
            } else {
              diamondRow +=
                '<span class="main-price">' +
                theme.Currency.formatMoney(
                  Currency.convert(
                    value.original_price * 100,
                    "USD",
                    theme.settings.shopCurrency
                  ),
                  theme.settings.moneyFormat
                ) +
                "</span>";
            }
            diamondRow +=
              '</a>\
                </div>\
                <div class="arrow-wrapper">\
                    <a href="/products/diamonds?sku=' +
              value.sku +
              '">\
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" viewBox="0 0 16.67 25.761">\
                            <path  id="Union_33" data-name="Union 33" d="M11.931,13.935l-.7.821.7-.821L0,0,11.931,13.935,23.862,0,11.931,13.935l.7.821Z" \
                              transform="translate(0.813 24.811) rotate(-90)" fill="none" stroke="#1c3348" stroke-width="2.5"\
                            ></path>\
                        </svg>\
                    </a>\
                </div>\
            </div>';
          });
        } else {
          $.each(diamondData, function (key, value) {
            dlastid = value.id;
            diamondRow +=
              '<div class="diamond-list drlist earring-diamond-list " id="diamondcomes' +
              value.id +
              '" >\
                  <div class="diamond-compare">\
                        <div><span></span></div>\
                    	</div>\
                <div class="diamondbox">\
                    <div class="pair-daimond-1 pair-diamond-wrapper">\
                        <div class="diamond-image-wrapper ">\
                            <a href="/products/diamonds?sku=' +
              value.sku +
              '">';
            if (value.is_featured > 0) {
              diamondRow += "<p>Featured deal</p>";
            }

            diamondRow += '<div class="diamond-image">';
            if (value.cover_pic.indexOf("http") == 0) {
              diamondRow +=
                '<img src="' + value.cover_pic + '" alt="' + value.title + '">';
            } else {
              diamondRow +=
                '<img src="' +
                theme.settings.assetUrl +
                value.cover_pic +
                '" alt="' +
                value.title +
                '">';
            }
            diamondRow +=
              '</div>\
                            </a>\
                        </div>\
                        <div class="medium-up--hide diamond-mobile-info">\
                            <a href="/products/diamonds?sku=' +
              value.sku +
              '">\
                                <p>' +
              value.title +
              '</p>\
                                <p class="extra-info">' +
              value.cut +
              " / " +
              value.color +
              " / " +
              value.clarity +
              '</p>\
                                <div class="extra-price-html diamond-price">';
            diamondRow +=
              '<span class="main-price">' +
              theme.Currency.formatMoney(
                Currency.convert(
                  value.sale_price * 100,
                  "USD",
                  theme.settings.shopCurrency
                ),
                theme.settings.moneyFormat
              ) +
              "</span>";
            diamondRow +=
              '</div>\
                            </a>\
                        </div>\
                        <div class="small--hide">\
                            <a href="/products/diamonds?sku=' +
              value.sku +
              '">' +
              value.shape +
              '</a>\
                        </div>\
                        <div class="small--hide">\
                            <a href="/products/diamonds?sku=' +
              value.sku +
              '" >' +
              value.carat +
              '</a>\
                        </div>\
                        <div class="small--hide">\
                            <a href="/products/diamonds?sku=' +
              value.sku +
              '" >' +
              value.color +
              '</a>\
                        </div>\
                        <div class="small--hide">\
                            <a href="/products/diamonds?sku=' +
              value.sku +
              '" >' +
              value.clarity +
              '</a>\
                        </div>\
                        <div class="small--hide">\
                            <a href="/products/diamonds?sku=' +
              value.sku +
              '" >' +
              value.cut +
              '</a>\
                        </div>\
                        <div class="small--hide">\
                            <a href="/products/diamonds?sku=' +
              value.sku +
              '" >' +
              value.lab +
              '</a>\
                        </div>\
                        <div class="additional-field  small--hide">\
                            <a href="/products/diamonds?sku=' +
              value.sku +
              '" >' +
              value.symmetry +
              '</a>\
                        </div>\
                        <div class="additional-field small--hide">\
                            <a href="/products/diamonds?sku=' +
              value.sku +
              '" >' +
              value.polish +
              '</a>\
                        </div>\
                        <div class="additional-field small--hide">\
                            <a href="/products/diamonds?sku=' +
              value.sku +
              '" >' +
              value.culet +
              '</a>\
                        </div>\
                        <div class="additional-field small--hide">\
                            <a href="/products/diamonds?sku=' +
              value.sku +
              '" >' +
              value.fluorescence +
              '</a>\
                        </div>\
                        <div class="additional-field small--hide">\
                            <a href="/products/diamonds?sku=' +
              value.sku +
              '" >' +
              value.lw_ratio +
              '</a>\
                        </div>\
                        <div class="additional-field small--hide">\
                            <a href="/products/diamonds?sku=' +
              value.sku +
              '" >' +
              value.depth +
              '</a>\
                        </div>\
                        <div class="additional-field small--hide">\
                            <a href="/products/diamonds?sku=' +
              value.sku +
              '" >' +
              value.table +
              '</a>\
                        </div>\
                        <div class="small--hide">\
                            <a href="/products/diamonds?sku=' +
              value.sku +
              '">';
            if (value.is_quickship > 0) {
              diamondRow += '<span class="quick-ship"></span>';
            } else {
              diamondRow += '<span class="no-quick-ship"></span>';
            }
            diamondRow +=
              '</a>\
                        </div>\
                        <div class="diamond-price small--hide">\
                            <a href="/products/diamonds?sku=' +
              value.sku +
              '">';
            diamondRow +=
              '<span class="main-price">' +
              theme.Currency.formatMoney(
                Currency.convert(
                  value.original_price * 100,
                  "USD",
                  theme.settings.shopCurrency
                ),
                theme.settings.moneyFormat
              ) +
              "</span>";
            diamondRow +=
              '</a>\
                        </div>\
                    </div>\
                    <div class="pair-daimond-2 pair-diamond-wrapper">\
                        <div class="diamond-image-wrapper ">\
                            <a href="/products/diamonds?sku=' +
              value.sku +
              '">';
            if (value.is_featured > 0) {
              diamondRow += "<p>Featured deal</p>";
            }
            diamondRow +=
              '<div class="diamond-image">\
                                    <img src="' +
              theme.settings.assetUrl +
              value.cover_pic_two +
              '" alt="' +
              value.title +
              '">\
                                </div>\
                            </a>\
                        </div>\
                        <div class="medium-up--hide diamond-mobile-info">\
                            <a href="/products/diamonds?sku=' +
              value.sku +
              '">\
                                <p>' +
              value.title +
              '</p>\
                                <p class="extra-info">' +
              value.cut_two +
              " / " +
              value.color_two +
              " / " +
              value.clarity_two +
              '</p>\
                                <div class="extra-price-html diamond-price">';
            diamondRow +=
              '<span class="main-price">' +
              theme.Currency.formatMoney(
                Currency.convert(
                  value.original_price * 100,
                  "USD",
                  theme.settings.shopCurrency
                ),
                theme.settings.moneyFormat
              ) +
              "</span>";
            diamondRow +=
              '</div>\
                            </a>\
                        </div>\
                        <div class="small--hide">\
                            <a href="/products/diamonds?sku=' +
              value.sku +
              '">' +
              value.shape_two +
              '</a>\
                        </div>\
                        <div class="small--hide">\
                            <a href="/products/diamonds?sku=' +
              value.sku +
              '" >' +
              value.carat_two +
              '</a>\
                        </div>\
                        <div class="small--hide">\
                            <a href="/products/diamonds?sku=' +
              value.sku +
              '" >' +
              value.color_two +
              '</a>\
                        </div>\
                        <div class="small--hide">\
                            <a href="/products/diamonds?sku=' +
              value.sku +
              '" >' +
              value.clarity_two +
              '</a>\
                        </div>\
                        <div class="small--hide">\
                            <a href="/products/diamonds?sku=' +
              value.sku +
              '" >' +
              value.cut_two +
              '</a>\
                        </div>\
                        <div class="small--hide">\
                            <a href="/products/diamonds?sku=' +
              value.sku +
              '" >' +
              value.lab_two +
              '</a>\
                        </div>\
                        <div class="additional-field  small--hide">\
                            <a href="/products/diamonds?sku=' +
              value.sku +
              '" >' +
              value.symmetry_two +
              '</a>\
                        </div>\
                        <div class="additional-field small--hide">\
                            <a href="/products/diamonds?sku=' +
              value.sku +
              '" >' +
              value.polish_two +
              '</a>\
                        </div>\
                        <div class="additional-field small--hide">\
                            <a href="/products/diamonds?sku=' +
              value.sku +
              '" >' +
              value.culet_two +
              '</a>\
                        </div>\
                        <div class="additional-field small--hide">\
                            <a href="/products/diamonds?sku=' +
              value.sku +
              '" >' +
              value.fluorescence_two +
              '</a>\
                        </div>\
                        <div class="additional-field small--hide">\
                            <a href="/products/diamonds?sku=' +
              value.sku +
              '" >' +
              value.lw_ratio_two +
              '</a>\
                        </div>\
                        <div class="additional-field small--hide">\
                            <a href="/products/diamonds?sku=' +
              value.sku +
              '" >' +
              value.depth_two +
              '</a>\
                        </div>\
                        <div class="additional-field small--hide">\
                            <a href="/products/diamonds?sku=' +
              value.sku +
              '" >' +
              value.table_two +
              '</a>\
                        </div>\
                        <div class="small--hide">\
                            <a href="/products/diamonds?sku=' +
              value.sku +
              '">';
            if (value.is_quickship > 0) {
              diamondRow += '<span class="quick-ship"></span>';
            } else {
              diamondRow += '<span class="no-quick-ship"></span>';
            }
            diamondRow +=
              '</a>\
                        </div>\
                        <div class="diamond-price small--hide">\
                            <a href="/products/diamonds?sku=' +
              value.sku +
              '">';
            diamondRow +=
              '<span class="main-price">' +
              theme.Currency.formatMoney(
                Currency.convert(
                  value.original_price * 100,
                  "USD",
                  theme.settings.shopCurrency
                ),
                theme.settings.moneyFormat
              ) +
              "</span>";
            diamondRow +=
              '</a>\
                        </div>\
                    </div>\
                  </div>\
                  <div class="arrow-wrapper">\
                      <a href="/products/diamonds?sku=' +
              value.sku +
              '">\
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" viewBox="0 0 16.67 25.761">\
                              <path  id="Union_33" data-name="Union 33" d="M11.931,13.935l-.7.821.7-.821L0,0,11.931,13.935,23.862,0,11.931,13.935l.7.821Z" \
                                transform="translate(0.813 24.811) rotate(-90)" fill="none" stroke="#1c3348" stroke-width="2.5"\
                              ></path>\
                          </svg>\
                      </a>\
                  </div>\
              </div>';
          });
        }
      } else {
        if ($(".empty-diamond").length <= 0) {
          diamondRow += '<p class="empty-diamond">No Diamonds Found.</p>';
        }
      }
      if (page == 1) {
        $("#diamondtable").empty("");
      }

      console.log(page);
      if ($("#diamondcomes" + dlastid).length <= 0) {
        $("#diamondtable").append(diamondRow);
      }

      lastpage = page;
      alreadydone = true;
      setTimeout(() => {
        doloader("hide");
        //$('.empty-diamond').remove();
      }, 1000);
    })
    .catch((error) => {
      console.log(error);
    });
}

$(document).on("click", ".reset-diamond-filter", function () {
  //Range change events
  $("#diamonds-price-slider")[0].noUiSlider.reset();
  $("#diamonds-carat-slider")[0].noUiSlider.reset();
  $("#diamonds-cut-slider")[0].noUiSlider.reset();
  $("#diamonds-color-slider")[0].noUiSlider.reset();
  $("#diamonds-clarity-slider")[0].noUiSlider.reset();
  $("#diamonds-polish-slider")[0].noUiSlider.reset();
  $("#diamonds-symmetry-slider")[0].noUiSlider.reset();
  $("#diamonds-fluorescence-slider")[0].noUiSlider.reset();
  $("#diamonds-lw-ratio-slider")[0].noUiSlider.reset();
  $("#diamonds-table-slider")[0].noUiSlider.reset();
  $("#diamonds-depth-slider")[0].noUiSlider.reset();
  $(".diamondfilter").removeClass("slide-active");
  $(".searchinp").val("");
  $("#diamondtype").val("");
  var urlElement = window.location.href.split("?")[0];
  window.history.pushState({ path: urlElement }, "", urlElement);
  getData();
  //Range change events end
});
$(window).scroll(function () {
  var hT = $("#nextpage").offset().top,
    hH = $("#nextpage").outerHeight(),
    wH = $(window).height(),
    wS = $(this).scrollTop();
  if (wS > hT + hH - wH && wS < hT + hH - wH + 100) {
    console.log("H1 on the view!");
    var page = $("#nextpage").attr("data-href");
    if (page) {
      getData(page);
    }
  }
});

var _selectedShapes = $.cookie("_selectedShapes");
if (_selectedShapes) {
  setTimeout(() => {
    getData();
  }, 1000);
  //getData();
} else {
  setTimeout(() => {
    getData();
  }, 1000);
}
//});
