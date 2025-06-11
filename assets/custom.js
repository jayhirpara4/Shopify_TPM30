$(function(){

  //Check for sku
  function getUrlVarsCust()
  {
      var vars = [], hash;
      var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
      for(var i = 0; i < hashes.length; i++)
      {
          hash = hashes[i].split('=');
          vars.push(hash[0]);
          vars[hash[0]] = hash[1];
      }
      return vars;
  }

  var _activeSh = getUrlVarsCust()['filter.v.option.shape'];
  
  //Remove filter
  $(document).on('click','.remvefilter , .reset-filter',function(e){
    e.preventDefault();
    var remIndex = $(this).attr('data-index');
  });
  //Price filter
  $(document).on('change','.pricechange',function(e){
    var curVal = $(this).val();
    if($(this).parent().parent('li').length>0){
      $(this).parent().parent('li').toggleClass('slide-active');
    }
    $('input[name="filter.p.tag"][value="'+curVal+'"]').click();
  });
  //Metal filter
  $(document).on('click','.filtermetal',function(e){
    var curVal = $(this).attr('data-tag');
    $(this).toggleClass('r-active');
    $('input[name="filter.v.option.color"][value="'+curVal+'"]').click();
  });
  $(document).on('click','.filtermetalmobile',function(e){
    var curVal = $(this).attr('data-tag');
    $(this).toggleClass('slide-active');
    $('input[name="filter.v.option.color"][value="'+curVal+'"]').click();
  });
  
  //Style filter
  $(document).on('click','.stylefilter',function(e){
    var curVal = $(this).attr('data-tag');
    $(this).toggleClass('slide-active');
    $('input[name="filter.p.tag"][value="'+curVal+'"]').click();
  });
  $(document).on('change','input[name="filter.p.tag"]',function () {
      if (!this.checked) {
          var thisVal = this.value;
          if( $("div[data-tag='" + thisVal +"']").length>0 ){
            $("div[data-tag='" + thisVal +"']").removeClass('slide-active');
            $("li[data-tag='" + thisVal +"']").removeClass('slide-active');
          }
      }
  });
  
  //Shape filter
  $(document).on('click','.shapefilter',function(e){
    var $clicked = $(this);
    var curVal = $clicked.attr('data-tag');
    /*if(curVal=='Moval' || curVal=='Dutch Marquise' || curVal=='Elongated Hexagon'){
      if( curVal=='Moval'){
        if( $('input[name="filter.p.tag"][value="Elongated Hexagon"]').is(':checked') ){
          $('input[name="filter.p.tag"][value="Elongated Hexagon"]').click();
        }
        if( $('input[name="filter.p.tag"][value="Dutch Marquise"]').is(':checked') ){
          $('input[name="filter.p.tag"][value="Dutch Marquise"]').click();
        }
      }
      if( curVal=='Dutch Marquise'){
        if( $('input[name="filter.p.tag"][value="Elongated Hexagon"]').is(':checked') ){
          $('input[name="filter.p.tag"][value="Elongated Hexagon"]').click();
        }
        if( $('input[name="filter.p.tag"][value="Moval"]').is(':checked') ){
          $('input[name="filter.p.tag"][value="Moval"]').click();
        }
      }
      if( curVal=='Elongated Hexagon'){
        if( $('input[name="filter.p.tag"][value="Dutch Marquise"]').is(':checked') ){
          $('input[name="filter.p.tag"][value="Dutch Marquise"]').click();
        }
        if( $('input[name="filter.p.tag"][value="Moval"]').is(':checked') ){
          $('input[name="filter.p.tag"][value="Moval"]').click();
        }
      }
      
      $clicked.toggleClass('slide-active');
      $('input[name="filter.p.tag"][value="'+curVal+'"]').click();
      return;
    }
    */
    if( curVal=='Moval'){
      curVal = 'Oval';
      $clicked = $('[data-tag="Oval"]');
    }
    if( curVal=='Dutch Marquise' || curVal=='Elongated Hexagon'){
       curVal = 'Marquise';
       $clicked = $('[data-tag="Marquise"]');
    }

    if( $clicked.hasClass('mobileshapefilter')  ){
      if($clicked.hasClass('slide-active')){
        $(".mobileshapefilter").removeClass('slide-active');
      }else{
        $(".mobileshapefilter").removeClass('slide-active');
        $clicked.addClass('slide-active');
      }
    }else{
      $clicked.toggleClass('slide-active');
    }
    if( $clicked.hasClass('slide-active') ){
      $('input[name="filter.v.option.shape"]').not(this).prop("checked", false);
      $('input[name="filter.v.option.shape"]').not(this).removeAttr("checked");
    }
    
    $('input[name="filter.v.option.shape"][value="'+curVal+'"]').click();
  });
  
  $(document).on('change','input[name="filter.v.option.shape"]',function () {
      if (!this.checked) {
          var thisVal = this.value;
          $("div[data-tag='" + thisVal +"']").removeClass('slide-active');
          $("li[data-tag='" + thisVal +"']").removeClass('slide-active');
      }
  });
  //sort by
  $(document).on('click','.sortdrop',function () {
      var thisVal = $(this).attr('value');
      var sel = document.getElementById('filterField');
      $('#filterField').val(thisVal).change();
      $('#filterField').trigger('change');
      if ("createEvent" in document) {
          var evt = document.createEvent("HTMLEvents");
          evt.initEvent("change", false, true);
          sel.dispatchEvent(evt);
      }
      else {
          sel.fireEvent("onchange");
      }
  });

  //change product images on varient selection
  $(document).on('click','.changeele',function(e){
    e.preventDefault();
    var imgsrc = $(this).attr('data-variant-image');
    var href = $(this).attr('data-href');
    var name = $(this).attr('data-value');
    var alt = $(this).attr('aria-label');
    var pid = $(this).attr('data-product-id');
    var preview = $(this).attr('data-preview');
    var previewtour = $(this).attr('data-previewtour');
    var price = $(this).attr('data-variant-price');
    $('#pro'+pid).find('.loader').show();
    $('#imgtour'+pid).hide();
    $('#img'+pid).show();
    $('#pro'+pid).find('a').attr('href',href);
    $('#pro'+pid).find('.custmainimg').attr('alt',alt);
    $('#pro'+pid).find('.custmainimg').attr('src',imgsrc);
    $('#pro'+pid).find('.custmainimg').attr('srcset',imgsrc);
    $('#proset'+pid).text(name);
    $('#proprice'+pid).text(price);
    $('#pro'+pid).find('.first-thumbnil').attr('data-image',imgsrc);
    $('#pro'+pid).find('.variant-first-image').attr('src',imgsrc);
    if(preview){
      $('#pro'+pid).find('.third-thumbnil').attr('data-image',preview);
      $('#pro'+pid).find('.variant-modal-image').attr('src',preview);
      $('#pro'+pid).find('.third-thumbnil').show();
    }else{
      $('#pro'+pid).find('.third-thumbnil').hide();
    }
    if(previewtour){
      $('#pro'+pid).find('.second-thumbnil').show();
      $('#pro'+pid).find('.second-thumbnil').attr('data-iframe',previewtour);
    }else{
      $('#pro'+pid).find('.second-thumbnil').hide();
    }
    setTimeout(function () {
      $('#pro'+pid).find('.loader').hide();
    },1200);
  });
  //first thumb click
  $(document).on('click','.first-thumbnil',function(){
    var pid = $(this).attr('data-id');
    var imgsrc = $(this).attr('data-image');
    $('#imgtour'+pid).hide();
    $('#img'+pid).show();
    $('#pro'+pid).find('.loader').show();
    $('#pro'+pid).find('.custmainimg').attr('src',imgsrc);
    $('#pro'+pid).find('.custmainimg').attr('srcset',imgsrc);
    setTimeout(function () {
      $('#pro'+pid).find('.loader').hide();
    },1000);
  });
  //second thumb click
  $(document).on('click','.second-thumbnil',function(){
    var pid = $(this).attr('data-id');
    var framesrc = $(this).attr('data-iframe');
    $('#img'+pid).hide();
    $('#imgtour'+pid).find('iframe').attr('src',framesrc);
    $('#imgtour'+pid).show();
    $('#pro'+pid).find('.loader').show();
    setTimeout(function () {
      $('#pro'+pid).find('.loader').hide();
    },1300);
  });
  //third thumb click
  $(document).on('click','.third-thumbnil',function(){
    var pid = $(this).attr('data-id');
    var imgsrc = $(this).attr('data-image');
    $('#imgtour'+pid).hide();
    $('#img'+pid).show();
    $('#pro'+pid).find('.loader').show();
    $('#pro'+pid).find('.custmainimg').attr('src',imgsrc);
    $('#pro'+pid).find('.custmainimg').attr('srcset',imgsrc);
    setTimeout(function () {
      $('#pro'+pid).find('.loader').hide();
    },1000);
  });

  //Hide mobile filter
  $(document).on('click','#mobFilterClose',function(){
    $('#mobFilterDropdown').toggleClass('show');
  });

  //Related product slider
  setTimeout(function() {
    if($('.relatedproductsslider').length>0){
      $('.relatedproductsslider').slick({
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true,
        autoplaySpeed: 2000,
        infinite: true,
        responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
        // Add any additional configuration options as needed
      });
    }
  }, 1500); // Change the delay time (in milliseconds) as needed 
  
  //top selling product slider
  setTimeout(function() {
    if($('.topsellingslider').length>0){
      $('.topsellingslider').slick({
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true,
        autoplaySpeed: 2000,
        infinite: true,
          responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
        // Add any additional configuration options as needed
      });
    }
  }, 1500); // Change the delay time (in milliseconds) as needed 
  //Recet view slider
  if($('.recentviewwslider').length>0 ){
      var interval;
      if($('.recentviewwslider').hasClass('slick-initialized ')){
          // $('.recentviewwslider').slick('destroy');
      }
      interval = setTimeout(function(){
        
          $('.recentviewwslider').slick({
            slidesToShow: 4,
            slidesToScroll: 4,
            autoplay: true,
            autoplaySpeed: 2000,
            infinite: true,
              responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 3,
            }
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 2,
            }
          },
          {
            breakpoint: 425,
            settings: {
              slidesToShow: 2,
            }
          }
        ]
            // Add any additional configuration options as needed
      });
        if($('.recentviewwslider').hasClass('slick-initialized ')){
            //clearInterval(interval);
        }
        
      }, 5000); // Change the delay time (in milliseconds) as needed 
    }

   $(document).on("click", function(event){
        var $trigger = $(".filter-list");
        if($trigger !== event.target && !$trigger.has(event.target).length){
          if( $(".dropdown-filter-option").hasClass('show') ){
            $(".dropdown-filter-option").removeClass("show");
          }
            
        }            
    });

    //Cookies Settings start

    //Redirect to page
    $(document).on('click', '.step-container' , function(e){
      var hrefred = $(this).parent().find('.change').attr('data-uw-original-href');
      var datastep = $(this).parent().attr('data-step');
      var datatype = $(this).attr('data-type');
      if(hrefred){
        window.location.href = hrefred;
      }else{
        if( datatype == 'Ring'){
          if(datastep=='ring-setting'){
            window.location.href = '/collections/engagement-rings';
          }else if(datastep=='diamonds'){
            window.location.href = '/collections/lab-diamonds';
          }
       }else if( datatype == 'Earring' ){
          if(datastep=='ring-setting'){
            window.location.href = '/collections/create-your-own-earring';
          }else if(datastep=='diamonds'){
            window.location.href = '/collections/earring-lab-diamonds';
          }
       }else if( datatype == 'Necklace' ){
          if(datastep=='ring-setting'){
            window.location.href = '/collections/create-your-own-necklaces';
          }else if(datastep=='diamonds'){
            window.location.href = '/collections/necklace-lab-diamonds';
          }
       }else{
          if(datastep=='ring-setting'){
            window.location.href = '/collections/engagement-rings';
          }else if(datastep=='diamonds'){
            window.location.href = '/collections/lab-diamonds';
          }
       }
      }
       
    });
   //close popups
   $(document).on('click', '.close-popup , .close-button' , function(e){
      $('#select-diamond-type-popup').removeClass('show-popup-content');
      $('#website-video-appointment').removeClass('show-popup-content');
      $('#start-over-popup').removeClass('show-popup-content');
      $("body").removeClass("show-website-popup"),
      $(this).closest(".popup-overlay-content").removeClass("show-popup-content");
    });
  
    // Remove Cookies
    $(document).on('click', '.diamondremove' , function(e){
      e.preventDefault();
      e.stopPropagation();
      var type = $(this).attr('data-uw-rm-brl');
      if(type == 'PR'){
        $.removeCookie('_ring', { path: '/' });
        $.removeCookie('_diamonmd', { path: '/' });
        $.removeCookie('_selectedShapes', { path: '/' });
      }else{
        $.removeCookie('_diamonmd', { path: '/' });
        if(! $.cookie("_ring")) {
          $.removeCookie('_selectedShapes', { path: '/' });
        }
      }
      //$.removeCookie("_diamonmd");
      var hrefred = $(this).attr('data-uw-original-href');
      window.location.href = hrefred; 
    });

    //Add ring in cookie
    $(document).on('click', '#choosethissetting' , function(e){
      var _oldRing = $.cookie("_ring");
      if(_oldRing){
        _oldRingData = $.parseJSON(_oldRing);
        var _oldPtype = _oldRingData.productType;
      }else{
        var _oldPtype = '';
      }
      var productType = $(this).attr('data-type');
      productType = (productType == '') ? 'Ring' : productType;
      productType = (productType=='Rings') ? 'Ring' : productType;
      if(productType=='Necklace' || productType=='Necklaces'){
        $('.choosediamondbox').hide();
        $('#necklacecontainer').show();
      }else if(productType=='Earring' || productType=='Earrings'){
        $('.choosediamondbox').hide();
        $('#earingcontainer').show();
      }else{
        $('.choosediamondbox').hide();
        $('#diamondcontainer').show();
      }
      //var checkedValue = $('#pv-frontend-block-1').find('.ant-radio-checked').find('input').val();
      var checkedValue = $('input[name="Shape"]:checked').val();
      var allshapes = $('#allshapes').val();
      var activeshape = '';
      if(allshapes!=''){
        allshapes = allshapes.split(',');
        activeshape = allshapes[checkedValue];
      }
      activeshape = checkedValue;
      //activeshape = $('#currentshape').val();
      //$(this).parent().parent().addClass('button-active');
      var pid = $(this).attr('data-id');
      var handle = $(this).attr('data-handle');
      var collection = $(this).attr('data-collection');
      var collectionTitle = $(this).attr('data-collection-title');
      var vid = $('[name="id"]').val();
      var image = $('.product-main-slide.is-selected').find('img').attr('src');
      var _dData = {
        "id" : pid,
        "vid" : vid,
        "handle" : handle,
        "collection" :collection,
        "collectionTitle" : collectionTitle,
        "productType" : productType,
        "image" : image,
      };
      $.removeCookie('_ring', { path: '/' });
      if(_oldPtype !='' && _oldPtype!=productType){
        $.removeCookie('_diamonmd', { path: '/' });
      }

      //Comapre ring + diamond type
      var __diamonmd = $.cookie("_diamonmd");
      if(__diamonmd){
        var __diamonmdData = $.parseJSON(__diamonmd);
        if(__diamonmdData.shape=='Moval'){
          __diamonmdData.shape = 'Oval';
        }
        if(__diamonmdData.shape=='Elongated Hexagon' || __diamonmdData.shape=='Dutch Marquise'){
          __diamonmdData.shape = 'Marquise';
        }
        if( __diamonmdData.shape != activeshape ){
          $.removeCookie('_diamonmd', { path: '/' });
        }
      }
      
      $.cookie("_ring", JSON.stringify(_dData), { expires: 7 ,  path: '/' });
      var _cSlectedShape = {
        "_activeShape" : activeshape,
        "_allShapes" : $('#allshapes').val()
      };
      $.cookie("_selectedShapes", JSON.stringify(_cSlectedShape), { expires: 7 ,  path: '/' });
      
      //check selected diamond
      var _selectedDiamond = $.cookie("_diamonmd");
      if(_selectedDiamond){
        _diamondData = $.parseJSON(_selectedDiamond);
        var newhref = _dData.handle+'?variant='+_dData.vid+'&view=final-ring&diamond='+_diamondData.sku;
        window.location.href = newhref; 
      }else{
        $('#select-diamond-type-popup').addClass('show-popup-content');
      }

    });
    
      
    //check selected diamond
    var _selectedRing = $.cookie("_ring");
    var _selectedDiamond = $.cookie("_diamonmd");
    //console.log(_selectedDiamond);
    if(_selectedDiamond){
      //console.log(_selectedDiamond);
      _diamondData = $.parseJSON(_selectedDiamond);
      if( _selectedRing){
        _ringData = $.parseJSON(_selectedRing);
        var _ProductType = _ringData.productType;
        _ProductType = (_ProductType == '') ? 'Ring' : _ProductType;
        if(_ProductType == 'Ring' || _ProductType == 'Rings'){
          var _linkStr = '';
        }else if(_ProductType== 'Earrings' || _ProductType== 'Earring'){
          var _linkStr = 'earring-';
        }else if(_ProductType== 'Necklace' || _ProductType== 'Necklaces'){
          var _linkStr = 'necklace-';
        }
      }else{
        var _linkStr = '';
      }
      
      //console.log(_diamondData);
      var _dhtml = '<div class="current-diamond-option">\
          <div class="product-img">';
              if( _diamondData.cover_pic.indexOf("http") == 0 ){
                  _dhtml += '<img src="'+_diamondData.cover_pic+'" alt="">';
              }else{
                  _dhtml += '<img src="'+theme.settings.assetUrl+_diamondData.cover_pic+'" alt="">';
              }
          _dhtml += '</div>\
          <div class="product-link">';
              if(_diamondData.type=='LabGrown'){
                _dhtml += '<a href="/collections/'+_linkStr+'lab-diamonds" class="change" data-uw-rm-brl="PD" data-uw-original-href="/collections/'+_linkStr+'lab-diamonds">Change</a>';
              }else{
                _dhtml += '<a href="/collections/'+_linkStr+'natural-diamonds" class="change" data-uw-rm-brl="PD" data-uw-original-href="/collections/'+_linkStr+'natural-diamonds">Change</a>';
              }
              _dhtml += '<span>|</span>';
              if(_diamondData.type=='LabGrown'){
                _dhtml += '<a href="javascript:void(0)" class="diamondremove remove" data-uw-rm-brl="PD" data-uw-original-href="/collections/'+_linkStr+'lab-diamonds">Remove</a>';
              }else{
                _dhtml += '<a href="javascript:void(0)" class="diamondremove remove" data-uw-rm-brl="PD" data-uw-original-href="/collections/'+_linkStr+'natural-diamonds">Remove</a>';
              }
          _dhtml += '</div>\
      </div>';
      $('#addeddiamond').empty('').html(_dhtml);
    }

    if(_selectedRing){
      _ringData = $.parseJSON(_selectedRing);
      //console.log(_ringData);
      var _dhtml = '<div class="current-diamond-option">\
          <div class="product-img">\
              <img src="'+_ringData.image+'" alt="Change" >\
          </div>\
          <div class="product-link">\
              <a href="'+_ringData.collection+'" class="change" data-uw-rm-brl="PR" data-uw-original-href="'+_ringData.collection+'">Change</a>\
              <span>|</span>\
                <a href="'+_ringData.collection+'" class="diamondremove remove" data-uw-rm-brl="PR" data-uw-original-href="'+_ringData.collection+'">Remove</a>\
          </div>\
      </div>';
      $('#addedring').empty('').html(_dhtml);
    }
    //console.log(_selectedRing);

    //check both selected
    if(_selectedRing && _selectedDiamond){
       _ringData = $.parseJSON(_selectedRing);
      _diamondData = $.parseJSON(_selectedDiamond);
      var _dhtml = '<div class="current-diamond-option">\
          <div class="product-img">\
              <img src="'+_ringData.image+'" alt="Change" >\
          </div>\
          <div class="product-link">\
              <a href="'+_ringData.handle+'?variant='+_ringData.vid+'&view=final-ring&diamond='+_diamondData.sku+'" class="change" data-uw-rm-brl="CR" data-uw-original-href="'+_ringData.handle+'?variant='+_ringData.vid+'&view=final-ring&diamond='+_diamondData.sku+'">Complete purchase</a>\
          </div>\
      </div>';
      $('#completering').empty('').html(_dhtml);
    }
    //Cookies Settings End

    //Check selected  shapes
    var _selectedShapes = $.cookie("_selectedShapes");
    
    if(_selectedShapes){
      _shapesData = $.parseJSON(_selectedShapes);
      var _activeShape = _shapesData._activeShape;
      console.log(_activeShape);
      if( $('#diamondtable').length>0){
        setTimeout(function(){
          if( !$('[data-value="'+_activeShape+'"]').hasClass('slide-active') ){
             $('[data-value="'+_activeShape+'"]').click();
          }
          getData();
        },1000);
        var allShapes = _shapesData._allShapes;
        allShapes = allShapes.split(',');
        //console.log(allShapes+' - Shapes');
        if(allShapes[0]!=''){
          $('.diamondfilter').hide();
          var alength = allShapes.length - 1;
          for(var i=0; i<alength; i++){
            //console.log(allShapes[i]);
            //console.log( $('[data-value="'+allShapes[i]+'"]') );
            $('[data-value="'+allShapes[i]+'"]').show();
            if(allShapes[i]=='Oval'){
              $('[data-value="Moval"]').show();
            }
            if(allShapes[i]=='Marquise'){
              $('[data-value="Dutch Marquise"]').show();
              $('[data-value="Elongated Hexagon"]').show();
            }
          }
        }
      }
    }

    if( $('#CollectionAjaxContent').length>0 ){
      var _selectedDiamondShapes = $.cookie("_diamonmd");
      if(_selectedDiamondShapes){
        _selectedDiamondShapesData = $.parseJSON(_selectedDiamondShapes);
        var _activeDiamondShape = _selectedDiamondShapesData.shape;
        console.log(_activeDiamondShape);
        if(_activeSh){
          //$('[data-tag="'+_activeDiamondShape+'"]').click();
          $('[data-tag="'+_activeDiamondShape+'"]').addClass('slide-active');
        }else{
          $('[data-tag="'+_activeDiamondShape+'"]').click();
          $('[data-tag="'+_activeDiamondShape+'"]').addClass('slide-active');
        }
        
        
      }
    }

  //add start over button 
  if(_selectedRing || _selectedDiamond){
    $('#start-over').show();
  }else{
    $('#start-over').hide();
  }
  // Remove Cookies
  $(document).on('click', '#start-over' , function(e){
      e.preventDefault();
      e.stopPropagation();
      if(_selectedRing){
        var _ringData = $.parseJSON(_selectedRing);
        var _ProductType = _ringData.productType;
        _ProductType = (_ProductType == '') ? 'Ring' : _ProductType;
        if(_ProductType == 'Ring' || _ProductType == 'Rings'){
          var hlink = '/collections/engagement-rings';
        }else if(_ProductType== 'Earrings' || _ProductType== 'Earring'){
          var hlink = '/collections/create-your-own-earring';
        }else if(_ProductType== 'Necklace' || _ProductType== 'Necklaces'){
          var hlink = '/collections/create-your-own-necklaces';
        }else{
            var hlink = '/collections/engagement-rings';
        }
      }else{
        var hlink = '/collections/engagement-rings';
      }
      $('#confirmReset').attr('data-href',hlink);
      $('#start-over-popup').addClass('show-popup-content');
    });
    $(document).on('click', '#confirmReset' , function(e){
      e.preventDefault();
      e.stopPropagation();
      $.removeCookie('_ring', { path: '/' });
      $.removeCookie('_diamonmd', { path: '/' });
      $.removeCookie('_selectedShapes', { path: '/' });
      var hlink = $('#confirmReset').attr('data-href');
      window.location.href = hlink; 
    });
}); 



$(document).ready(function(){
    $("#show-more-filter").click(function(){
        $("#advance-filter-container").slideToggle("slow");
        $(this).text(function(i, v){
          return v === 'Show Advance' ? 'Hide Advance' : 'Show Advance'
      })
    });

   // Appointment
    $(document).on("click", ".schedule-appointment-btn,.site-header__book-appointment,.Schedule-an-appointment,.product__addon-schedule-appointment , [href='#bookappointment']", function (e) {
        e.preventDefault(), $("body").addClass("show-website-popup"), $("#website-video-appointment").addClass("show-popup-content");
    });

   $(".virtual-appointmet-btn").on("click", function () {
        return (
            $("body").removeClass("show-website-popup"), 
          $(this).closest(".popup-overlay-content").removeClass("show-popup-content"), 
          Calendly.initPopupWidget({ url: "https://calendly.com/general-stienhardt/30min" }), !1
        );
    });
    $(".store-appointmet-btn,#shopify-section-08102c87-6898-43ec-b1ef-ac5d6e1371b9 .btn").on("click", function (e) {
        return (
            e.preventDefault(),
            $("body").removeClass("show-website-popup"),
            $(this).closest(".popup-overlay-content").removeClass("show-popup-content"),
            Calendly.initPopupWidget({ url: "https://calendly.com/general-stienhardt/30min" }),
            !1
        );
    });

  // Hint 
    $(document).on("click", ".dropahintnow", function (e) {
        e.preventDefault();
        $("body").css('overflow','hidden');
        //$("body").css('position','relative');
        $('#hint_modal').show();
    });
    $(document).on("click", ".u-close-button", function (e) {
        e.preventDefault();
        $('#hint_modal').hide();
        $("body").css('overflow','initial');
    });

    if($('.variant-input').length>0){
      //setTimeout(function () {
      showVariants();
      //}, 1000);
      function showVariants() {
        var data = [];
        $('.rvariantswatch').each(function() {
            if( $(this).is(":checked") ){
                var thisval = this.value.toLowerCase().replace(/\s+/g,"_").replace(/\//g, "_").replace(/[^a-zA-Z0-9]/g,'_').replace(/\_+/g, '_');
                console.log(thisval);
                data.push(thisval);
                
                
            }
        });
        var varientstr = data.join('_'); 
        var result = 'no';
        $('.product__thumb-item').each(function() {
            if($(this).hasClass(varientstr)){
              result = 'yes';
            }
        });
        if(result=='no'){
          //$('.product__thumb-item').removeClass('rshide');
        }
        $('.all').removeClass('rshide');
        $('.'+varientstr).removeClass('rshide');
        console.log(varientstr);
      }

      $('.rvariantswatch').on('change',function(){
        $('.product__thumb-item').addClass('rshide');
        showVariants();
        console.log($(this).val());
      })
    }
});