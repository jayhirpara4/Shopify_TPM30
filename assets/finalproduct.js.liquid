
$(function(){
  //Check for sku
  function getUrlVars()
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

function doloader(type){
    if(type=='show'){
      $('#skel').show();
    }else{
      $('#skel').hide();
    }
}
var _selectedRing = $.cookie("_ring");
var _selectedDiamond = $.cookie("_diamonmd");
var _sku = getUrlVars()['diamond'];
if(_sku && _selectedRing && _selectedDiamond ){
    //Get cookies 
    _ringData = $.parseJSON(_selectedRing);
    _diamondData = $.parseJSON(_selectedDiamond);
    if(_ringData){
        var _productType = _ringData.productType
      _productType = (_productType=='Rings') ? 'Ring' : _productType;
    }else{
      var _productType = 'Ring';
    }
  
    $('#collectionTitle').text('YOUR '+_ringData.collectionTitle.toUpperCase());
     $('#noproduct').hide();
    //Get diamond data
    async function getData(){
      doloader('show');
      var user = 'fooPalawat';
      var pass = 'barPalawat';
      var authorizationBasic = window.btoa(user + ':' + pass);
      const config = {
          headers: { 'content-type': 'multipart/form-data' ,"Authorization": "Basic " + authorizationBasic }
      }
      //check main product type
      var _selectedRing = $.cookie("_ring");
      if(_selectedRing){
        _ringData = $.parseJSON(_selectedRing);
        var _productType = _ringData.productType
        _productType = (_productType=='Rings') ? 'Ring' : _productType;
        var _btnTxt = 'Add to '+_productType;
      }else{
        var _btnTxt = 'Add to Ring';
        var _productType = 'Ring';
      }
      await axios.get(`${theme.settings.apiUrl}/diamond/${_sku}?type=${_productType}` , config).then(response=>{
          //console.log(response.data.Diamond);
          var diamondData = response.data.Diamond;
          if(diamondData){
              var value = diamondData;
              var _diamondUpdate = $('#diamondupdatetab').html();
              var shipByDate = Date.today().addDays(21);
              var shipInDate = Date.today().addDays(1);
              if (shipByDate.is().saturday() || shipByDate.is().sunday()) {
                //shipByDate = shipByDate.next().monday();
              }
              if (shipInDate.is().saturday() || shipInDate.is().sunday()) {
                //shipInDate = shipInDate.next().monday();
              }
              var price = $('#productprice').attr('data-price'); 
              price = parseInt(price);
              $('#shipByDate').text(shipByDate.toString('ddd, MMMM d'));
              $('#shipBy').val(shipByDate.toString('ddd, MMMM d'));
              $('#shapeProp').val(value.shape);
              $('#diamond-name').text(value.title);
              $('#color-info').text(value.color);
              $('#clarity-info').text(value.clarity);
              $('#cut-info').text(value.cut);
              if( value.cover_pic.indexOf("http") == 0 ){
                  $('.diamond-image').find('img').attr('src',value.cover_pic);
              }else{
                  $('.diamond-image').find('img').attr('src',theme.settings.assetUrl+value.cover_pic);
              }
              
              var _dShortInfo = '<p class="product-single__para">DIAMOND</p>\
              <p class="diamond__info">\
                <span>'+value.carat+' CT | '+value.shape+' | '+value.cut+' Cut </span>\
                <span>'+value.color+' Color | '+value.clarity+' Clarity</span>\
              </p>\
              <div class="product-single__diamond-price">';
              if(!value.final_price){
                if(value.sale_price){
                    price = (price + Currency.convert(value.sale_price * 100, 'USD' , theme.settings.shopCurrency));
                    //console.log(value.sale_price * 100);
                    _dShortInfo +='<div class="price__on-sale" data-uw-rm-sr="">'+theme.Currency.formatMoney( Currency.convert(value.sale_price * 100, 'USD' , theme.settings.shopCurrency) , theme.settings.moneyFormat)+'</div>';
                    _dShortInfo +='<div class="price__regular" style="display:none;" data-uw-rm-sr="price" aria-label="Previous price was '+theme.Currency.formatMoney( Currency.convert(value.original_price * 100, 'USD' , theme.settings.shopCurrency) , theme.settings.moneyFormat)+'">'+theme.Currency.formatMoney( Currency.convert(value.original_price * 100, 'USD' , theme.settings.shopCurrency) , theme.settings.moneyFormat)+'</div>';
                    _dShortInfo +='<div class="precentage_off" style="display:none;" data-uw-rm-sr="">('+theme.Currency.formatMoney( Currency.convert( (value.original_price - value.sale_price ) * 100, 'USD' , theme.settings.shopCurrency) , theme.settings.moneyFormat)+' OFF)</div>';
                  }
                  if( (value.sale_price==0 || value.sale_price=='' ) && value.original_price!='' ){
                    price = (price + Currency.convert(value.original_price * 100, 'USD' , theme.settings.shopCurrency) )
                    _dShortInfo +='<div class="price__on-sale" data-uw-rm-sr="">'+theme.Currency.formatMoney( Currency.convert(value.original_price * 100, 'USD' , theme.settings.shopCurrency) , theme.settings.moneyFormat)+'</div>';
                  }
              }else{
                price = (price + Currency.convert(value.final_price * 100, 'USD' , theme.settings.shopCurrency))
                _dShortInfo +='<div class="price__on-sale" data-uw-rm-sr="">'+theme.Currency.formatMoney( Currency.convert(value.final_price * 100, 'USD' , theme.settings.shopCurrency) , theme.settings.moneyFormat)+'</div>';
              }
              _dShortInfo +='</div>';
              $('#diamondInfo').empty('').html(_dShortInfo);
              $('#productprice').empty('').text(theme.Currency.formatMoney(price, theme.settings.moneyFormat));
              var _dDetails = '<div class="pair-first-diamond">\
                    <p>\
                        <span class="meta__title">Lab</span>\
                        <span class="meta-info-desc metal-variant-info">\
                            <a class="diamond-certificate-link " target="_blank" href="'+value.lab_url+'"  >\
                                <span class="lab-name">'+value.lab+'</span>\
                            </a>\
                        </span>\
                    </p>\
                    <p>\
                        <span class="meta__title">Certificate Number</span>\
                        <span class="meta-info-desc metal-variant-info">\
                            <a class="diamond-certificate-link" target="_blank" href="'+value.lab_url+'">\
                                <span class="certificate-number">'+value.cert_num+'</span>\
                            </a>\
                        </span>\
                    </p>\
                    <p>\
                        <span class="meta__title">SHAPE</span>\
                        <span class="meta-info-desc shape-info">'+value.shape+'</span>\
                    </p>\
                    <p>\
                        <span class="meta__title">CARAT</span>\
                        <span class="meta-info-desc carat-info">'+value.carat+'</span>\
                    </p>\
                    <p>\
                        <span class="meta__title">Cut</span>\
                        <span class="meta-info-desc cut-info">'+value.cut+'</span>\
                    </p>\
                    <p>\
                        <span class="meta__title">Color</span>\
                        <span class="meta-info-desc color-info">'+value.color+'</span>\
                    </p>\
                    <p>\
                        <span class="meta__title">Clarity</span>\
                        <span class="meta-info-desc clarity-info">'+value.clarity+'</span>\
                    </p>\
                    <p>\
                        <span class="meta__title">Polish</span>\
                        <span class="meta-info-desc polish-info">'+value.polish+'</span>\
                    </p>\
                    <p>\
                        <span class="meta__title">Symmetry</span>\
                        <span class="meta-info-desc symmetry-info">'+value.symmetry+'</span>\
                    </p>\
                    <p>\
                        <span class="meta__title">Fluorescence</span>\
                        <span class="meta-info-desc fluorescence-info">'+value.fluorescence+'</span>\
                    </p>\
                    <p>\
                        <span class="meta__title">TABLE</span>\
                        <span class="meta-info-desc table-info">'+value.table+'%</span>\
                    </p>\
                    <p>\
                        <span class="meta__title">DEPTH</span>\
                        <span class="meta-info-desc depth-info">'+value.depth+'%</span>\
                    </p>\
                    <p>\
                        <span class="meta__title">MEASUREMENT</span>\
                        <span class="meta-info-desc measurements-info">'+value.measurement+'</span>\
                    </p>\
                    <p>\
                        <span class="meta__title">L/W RATIO</span>\
                        <span class="meta-info-desc l-w-ratio-info">'+value.lw_ratio+'</span>\
                    </p>\
                </div>';
                doloader('hide');
                $('#finalmainsection').show();
                $('#diamondinfoall').empty('').html(_dDetails);
                $('.zoomtarget').izoomify();
          }else{
              doloader('hide');
              $('#noproduct').css('display','flex');
          }
        
      }).catch(error=>{
          console.log(error)
          
      })
  }
  //getCart();
  getData();
}else{
     setTimeout(() => {
      doloader('hide');
      $('#noproduct').css('display','flex');
    }, 1000);
}

async function getCart() {
    axios.get(`/cart.js`).then(response=>{
      //console.log(response);
    }).catch(error=>{
        //console.log(error);
    })
}
//accordians
$(document).on('click','.accordion-header',function(){
  
  if( $(this).hasClass('active') ){
    $(this).removeClass('active');
    $(this).next('.accordion-content').slideToggle();
  }else{
    $('.accordion-header').removeClass('active');
    $('.accordion-content').slideUp("slow");
    $(this).addClass('active');
    $(this).next('.accordion-content').slideToggle();
  }
});

//Size change
$(document).on('change','#product-single__ring-size',function(){
  $('#RingSize').val($(this).val())
});
$(document).on('input','.engraving-field',function(){
  $('#Engrave').val($(this).val())
});

//Create product
$(document).on('click', '#addToCart' , function(e){
  e.preventDefault();
  if($('#product-single__ring-size').length>0){
    var rsize = $('#product-single__ring-size').val();
    if(rsize==''){
      $('.error-msg').show();
      return;
    }else{
      $('.error-msg').hide();
    }
    
  }
  $(this).parent().parent().addClass('button-active');
  //$(this).text('Wait...');
  var user = 'fooPalawat';
  var pass = 'barPalawat';
  var authorizationBasic = window.btoa(user + ':' + pass);
  const config = {
      headers: { 'content-type': 'multipart/form-data' ,"Authorization": "Basic " + authorizationBasic }
  }
  axios.get(`${theme.settings.apiUrl}/createproduct/${_sku}` , config).then(response=>{
      console.log(response.data.Diamond);
      var diamondData = response.data.Diamond;
      if(diamondData){
        var shipByDate = Date.today().addDays(21);
        var shipInDate = Date.today().addDays(1);
        if (shipByDate.is().saturday() || shipByDate.is().sunday()) {
          //shipByDate = shipByDate.next().monday();
        }
        let formData = {
         'items': [
          {
            'id': diamondData.shopify_res.product.variants[0].id,
            'quantity': 1,
            'properties': {
                'SKU'  : diamondData.sku,
                'COLOR'  : diamondData.color,
                'CLARITY': diamondData.clarity,
                'LAB'    : diamondData.lab,
                'DIMENSION'    : diamondData.measurement,
                'SHIP BY': shipByDate.toString('ddd, MMMM d'),
            }
          }
        ]
        };
        fetch(window.Shopify.routes.root + 'cart/add.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        .then(response => {
          console.log(response);
          $('#product_form_8281019023643').submit();
          //return response.json();
        })
        .catch((error) => {
          //console.error('Error:', error);
        });
        
        //$('#productid').val(diamondData.shopify_id);
        //$('#mainvid').val(diamondData.shopify_res.product.variants[0].id);
      }
      
      $(this).parent().parent().removeClass('button-active');
    }).catch(error=>{
        console.log(error);
        $(this).parent().parent().removeClass('button-active');
    })
});
});

