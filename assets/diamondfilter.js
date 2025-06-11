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
  for (var i = idx[0]; i <= idx[1]; i++) {
    cutArray.push(cutValueForSlider[i]);
  }
  $("#diamondcut").val(cutArray);
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
  console.log(value);
  //console.log(colorArray);
  console.log(data);
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
    //clrtyArray.push(clarityValuesForSlider[i]);
    if (clarityValuesForSlider[i] != "") {
      clrtyArray.push(clarityValuesForSlider[i]);
    }
  }
  clrtyArray = clrtyArray.filter(function (element) {
    return element !== undefined;
  });
  $("#diamondclarity").val(clrtyArray);
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
  for (var i = idx[0]; i <= idx[1]; i++) {
    polishArray.push(polishValuesForSlider[i]);
  }
  $("#diamondpolish").val(polishArray);
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
  for (var i = idx[0]; i <= idx[1]; i++) {
    symArray.push(symmetryValuesForSlider[i]);
  }
  $("#diamondsymetry").val(symArray);
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
  for (var i = idx[0]; i <= idx[1]; i++) {
    fluArray.push(fluorescenceValuesForSlider[i]);
  }
  $("#diamondflurence").val(fluArray);
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
  } else {
    $("#slide-min-lw-ratio").val(value);
    $("#lwfrom").val(value);
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
  } else {
    $("#slide-min-table").val(value);
    $("#tablefrom").val(value);
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
  } else {
    $("#slide-min-depth").val(value);
    $("#depthfrom").val(value);
  }
  //getData();
});

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
  getData();
});
//Set price value
$("#slide-min-price").on("blur", function () {
  if ($.isNumeric(this.value)) {
    $("#pricefrom").val(this.value);
    $("#diamonds-price-slider")[0].noUiSlider.set([this.value]);
    getData();
  } else {
    $(this).val("");
  }
});
$("#slide-max-price").on("blur", function () {
  if ($.isNumeric(this.value)) {
    $("#priceto").val(this.value);
    $("#diamonds-price-slider")[0].noUiSlider.set([
      $("#slide-min-carat").val(),
      this.value,
    ]);
    getData();
  } else {
    $(this).val("");
  }
});

//Set carat value
$("#slide-min-carat").on("blur", function () {
  if ($.isNumeric(this.value)) {
    $("#caratfrom").val(this.value);
    $("#diamonds-carat-slider")[0].noUiSlider.set([this.value]);
    getData();
  } else {
    $(this).val("");
  }
});
$("#slide-max-carat").on("blur", function () {
  if ($.isNumeric(this.value)) {
    $("#caratto").val(this.value);
    $("#diamonds-carat-slider")[0].noUiSlider.set([
      $("#slide-min-carat").val(),
      this.value,
    ]);
    getData();
  } else {
    $(this).val("");
  }
});

//Set lw value
$("#slide-min-lw-ratio").on("blur", function () {
  if ($.isNumeric(this.value)) {
    $("#lwfrom").val(this.value);
    $("#diamonds-lw-ratio-slider")[0].noUiSlider.set([this.value]);
    getData();
  } else {
    $(this).val("");
  }
});
$("#slide-max-lw-ratio").on("blur", function () {
  if ($.isNumeric(this.value)) {
    $("#lwto").val(this.value);
    $("#diamonds-lw-ratio-slider")[0].noUiSlider.set([
      $("#lwfrom").val(),
      this.value,
    ]);
    getData();
  } else {
    $(this).val("");
  }
});

//Set table value
$("#slide-min-table").on("blur", function () {
  if ($.isNumeric(this.value)) {
    $("#tablefrom").val(this.value);
    $("#diamonds-table-slider")[0].noUiSlider.set([this.value]);
    getData();
  } else {
    $(this).val("");
  }
});
$("#slide-max-table").on("blur", function () {
  if ($.isNumeric(this.value)) {
    $("#tableto").val(this.value);
    $("#diamonds-table-slider")[0].noUiSlider.set([
      $("#tablefrom").val(),
      this.value,
    ]);
    getData();
  } else {
    $(this).val("");
  }
});

//Set table value
$("#slide-min-depth").on("blur", function () {
  if ($.isNumeric(this.value)) {
    $("#depthfrom").val(this.value);
    $("#diamonds-depth-slider")[0].noUiSlider.set([this.value]);
    getData();
  } else {
    $(this).val("");
  }
});
$("#slide-max-depth").on("blur", function () {
  if ($.isNumeric(this.value)) {
    $("#depthto").val(this.value);
    $("#diamonds-depth-slider")[0].noUiSlider.set([
      $("#depthfrom").val(),
      this.value,
    ]);
    getData();
  } else {
    $(this).val("");
  }
});

//Featured deal
$(".diamond__featured-deal").on("click", function () {
  if ($(this).hasClass("quick-active")) {
    $(this).removeClass("quick-active");
    $("#featureddeal").val(0);
  } else {
    $(this).addClass("quick-active");
    $("#featureddeal").val(1);
  }
  getData();
});

//Quick ship deal
$(".diamond__quick-shop-tab").on("click", function () {
  if ($(this).hasClass("quick-active")) {
    $(this).removeClass("quick-active");
    $("#quickship").val(0);
  } else {
    $(this).addClass("quick-active");
    $("#quickship").val(1);
  }
  getData();
});

// Sort dropdown
$(document).on(
  "click",
  ".select-dropdown__button, .report-dropdown__button",
  function () {
    $(this).next(".select-dropdown__list").slideToggle(200);
  }
);

// Handle item selection for "Sort by"
$(document).on("click", "#diamond__sort-by li", function () {
  var button = $(".select-dropdown__button");
  var list = button.next(".select-dropdown__list");

  // Update button text and hidden input
  button.find(".sort_by-title").text($(this).text());
  $("#sortby").val($(this).attr("data-value"));

  // Close the dropdown
  list.slideUp(200);

  // Get data
  getData();
});

// Handle item selection for "By report"
$(document).on("click", "#diamond__report-list li", function () {
  var button = $(".report-dropdown__button");
  var list = button.next(".select-dropdown__list");

  // Update button text and hidden input
  button.find(".sort_by-title").text($(this).text());
  $("#reportby").val($(this).attr("data-value"));

  // Close the dropdown
  list.slideUp(200);

  // Get data
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
  getData();
});
$("#diamonds-carat-slider")[0].noUiSlider.on("change", function (v, handle) {
  getData();
});
$("#diamonds-cut-slider")[0].noUiSlider.on("change", function (v, handle) {
  getData();
});
$("#diamonds-color-slider")[0].noUiSlider.on("change", function (v, handle) {
  getData();
});
$("#diamonds-clarity-slider")[0].noUiSlider.on("change", function (v, handle) {
  getData();
});
$("#diamonds-polish-slider")[0].noUiSlider.on("change", function (v, handle) {
  getData();
});
$("#diamonds-symmetry-slider")[0].noUiSlider.on("change", function (v, handle) {
  getData();
});
$("#diamonds-fluorescence-slider")[0].noUiSlider.on(
  "change",
  function (v, handle) {
    getData();
  }
);
$("#diamonds-lw-ratio-slider")[0].noUiSlider.on("change", function (v, handle) {
  getData();
});
$("#diamonds-table-slider")[0].noUiSlider.on("change", function (v, handle) {
  getData();
});
$("#diamonds-depth-slider")[0].noUiSlider.on("change", function (v, handle) {
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
  getData();
} else {
  setTimeout(() => {
    getData();
  }, 1000);
}
//});
