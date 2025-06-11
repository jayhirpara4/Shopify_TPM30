$(function(){
  var _diamonmd = '';
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

var _sku = getUrlVars()['sku'];
if(_sku){
     $('#noproduct').hide();
    
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


  
    //Get diamond data
    async function getData(){
    doloader('show');
    var user = 'fooPalawat';
    var pass = 'barPalawat';
    var authorizationBasic = window.btoa(user + ':' + pass);
    const config = {
        headers: { 'content-type': 'multipart/form-data' ,"Authorization": "Basic " + authorizationBasic }
    }
    await axios.get(`${theme.settings.apiUrl}/diamond/${_sku}?type=${_productType}` , config).then(response=>{
        //console.log(response.data.Diamond);
        var diamondData = response.data.Diamond;
        if(diamondData){
            var value = diamondData;
            var _diamondUpdate = $('#diamondupdatetab').html();
            var shipByDate = Date.today().addDays(1);
            var shipInDate = Date.today().addDays(21);
            if (shipByDate.is().saturday() || shipByDate.is().sunday()) {
              //shipByDate = shipByDate.next().monday();
            }
            if (shipInDate.is().saturday() || shipInDate.is().sunday()) {
              //shipInDate = shipInDate.next().monday();
            }
            _diamonmd = diamondData;

            var _diamondFor = ( _diamonmd.final_price ) ? 'Earring' : '';
            if(_diamondFor != 'Earring'){
              var productHtml = '<div class="grid__item product-single__diamond-group medium-up--two-thirds" data-product-single-media-group="">\
                <div class="diamond-image-wrapper">\
                    <div class="diamond-image">\
                        <div class="diamondimg diamond-image-grid">\
                            <div class="image-wrapper">';
                                if( value.cover_pic.indexOf("http") == 0 ){
                                    productHtml +='<img src="'+value.cover_pic+'" alt="'+value.title+'">';
                                }else{
                                    productHtml +='<img src="'+theme.settings.assetUrl+value.cover_pic+'" alt="'+value.title+'">';
                                }
                            productHtml +='</div>\
                        </div>\
                    </div>\
                    <div class="diamond-iframe">\
                        <div class="diamond-image-grid">\
                            <iframe width="600px" height="600px" data-uw-rm-iframe="un"></iframe>\
                        </div>\
                    </div>\
                    <div class="diamond-fingure-view">\
                        <div class="diamond-image-grid">\
                            <div class="image-wrapper">\
                                <img alt="Loose Diamond" class="thubnil-img lazyloaded" src="https://cdn.shopify.com/s/files/1/0599/0839/0973/files/loose-diamond-hand-large_1.webp?v=1716216116">\
                            </div>\
                            <div class="diamond-on-hand">\
                                <span class="hand_diamond_img oval" style="background-size: 41.85%;background-image: url('+theme.settings.assetUrl+value.raw_diamond+');"></span>\
                            </div>\
                            <div id="slider" class="ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content">\
                                <div id="custom-handle" class="ui-slider-handle ui-corner-all ui-state-default" tabindex="0" style="left: 2.93103%;"><span id="carattxt">0.37 Ct</span></div>\
                            </div>\
                        </div>\
                    </div>\
                    <div class="diamond-certificate">\
                        <div class="diamond-image-grid">\
                            <div class="image-wrapper">\
                                <img class="thubnil-img lazyloaded" alt="IGI Certified" src="https://cdn.shopify.com/s/files/1/0599/0839/0973/files/IGI_Icon_d7510f13-1b92-4a59-9ae5-4bf69426e48d.avif?v=1716216076">\
                            </div>\
                        </div>\
                    </div>\
                </div>\
                <div class="diamond-thumbnil-wrapper">\
                    <div class="diamond-thumbnil diamond-image active" data-type="diamond-image">';
                        if( value.cover_pic.indexOf("http") == 0 ){
                            productHtml +='<img src="'+value.cover_pic+'" alt="'+value.title+'">';
                        }else{
                            productHtml +='<img src="'+theme.settings.assetUrl+value.cover_pic+'" alt="'+value.title+'">';
                        }
                    productHtml +='</div>';
                    if( value.workshop_preview_url ){
                    productHtml +='<div class="diamond-thumbnil diamond-360" data-frame="'+value.workshop_preview_url+'" data-type="diamond-iframe">\
                        <img alt="Diamond Video" class="thubnil-img ls-is-cached lazyloaded"  src="https://cdn.shopify.com/s/files/1/0599/0839/0973/files/video_play.png?v=1716214635" >\
                    </div>';
                    }
                  if( value.raw_diamond ){
                    productHtml +='<div class="diamond-thumbnil diamond-size-preivew" data-carat="'+value.carat+'" data-type="diamond-fingure-view">\
                        <img alt="Loose Diamond" class="thubnil-img ls-is-cached lazyloaded" src="https://cdn.shopify.com/s/files/1/0599/0839/0973/files/loose-diamond-hand.webp?v=1716214787">\
                        <div class="diamond-on-hand">\
                            <span class="hand_diamond_img round oval" style="background-size: 41.85%;background-image: url('+theme.settings.assetUrl+value.raw_diamond+');"></span>\
                        </div>\
                    </div>';
                  }
                    productHtml +='<div class="diamond-thumbnil diamond-certificate" data-type="diamond-certificate">\
                        <a href="'+value.lab_url+'" target="_blank" rel="null noopener" aria-describedby="a11y-new-window-message" data-uw-original-href="'+value.lab_url+'">';
                        if(value.lab=='GIA'){
                            productHtml +='<img alt="GIA Certified" src="https://cdn.shopify.com/s/files/1/0599/0839/0973/files/GIA_Icon_60d07140-6c0d-4f9d-8321-89b0bd69240a.webp?v=1716216022">';
                        }else{
                          productHtml +='<img alt="IGI Certified" src="https://cdn.shopify.com/s/files/1/0599/0839/0973/files/IGI_Icon_d7510f13-1b92-4a59-9ae5-4bf69426e48d_1.avif?v=1716382531">'
                        }
                        productHtml +='</a>\
                    </div>\
                </div>\
            </div>\
            <div class="grid__item product-single__information medium-up--one-third product-single__description-container">\
                <div class="product-single__meta">\
                    <h1 class="product-single__title" role="heading" aria-level="2" data-uw-rm-heading="level">'+value.title+'</h1>\
                    <div class="product-single__sku">Certificate Number#:\
                        <span>'+value.cert_num+'</span>\
                    </div>\
                    <div class="product-single__price">\
                        <div class="prodcut__price">';
                            if(value.sale_price){
                              productHtml +='<div class="price__on-sale" data-uw-rm-sr="">'+theme.Currency.formatMoney( Currency.convert(value.sale_price * 100, 'USD' , theme.settings.shopCurrency) , theme.settings.moneyFormat)+'</div>';
                              productHtml +='<div class="price__regular" data-uw-rm-sr="price" aria-label="Previous price was '+theme.Currency.formatMoney( Currency.convert(value.original_price * 100, 'USD' , theme.settings.shopCurrency) , theme.settings.moneyFormat)+'">'+theme.Currency.formatMoney( Currency.convert(value.original_price * 100, 'USD' , theme.settings.shopCurrency) , theme.settings.moneyFormat)+'</div>';
                              productHtml +='<div class="precentage_off" data-uw-rm-sr="">('+theme.Currency.formatMoney( Currency.convert( (value.original_price - value.sale_price) * 100, 'USD' , theme.settings.shopCurrency) , theme.settings.moneyFormat)+' OFF)</div>';
                            }
                            if( (value.sale_price==0 || value.sale_price=='' ) && value.original_price!='' ){
                              productHtml +='<div class="price__on-sale" data-uw-rm-sr="">'+theme.Currency.formatMoney( Currency.convert(value.original_price * 100, 'USD' , theme.settings.shopCurrency) , theme.settings.moneyFormat)+'</div>';
                            }
                            productHtml +='<div class="diamond__only">(Diamond Only)</div>\
                        </div>\
                        <!--<div class="bank-wire-price" data-uw-rm-sr="">BANK WIRE PRICE $359</div>-->\
                    </div>\
                    <!--<div class="affirm-info-wrapper">\
                        <p class="affirm-as-low-as" >Starting at <span class="affirm-ala-price" data-uw-rm-sr="">$34</span>/mo or 0% APR with <span class="__affirm-logo __affirm-logo-blue __ligature__affirm_full_logo__ __processed">Affirm</span>. <a class="affirm-modal-trigger" aria-label="See if you qualify - Learn more about Affirm Financing (opens in modal)"\
                            href="javascript:void(0)">See if you qualify</a>\
                        </p>\
                    </div>-->\
                    <div class="product__addon-info">\
                        <p class="extented-returns-popup-button">Free Insured Shipping. <span class="extented-returns-title">15 Day Returns.</span></p>\
                    </div>\
                    <div class="diamond-short-information">\
                        <div class="diamond-info-wrapper">\
                            <div class="diamond-info">Shape:\
                                <span class="shape-info">'+value.shape+'</span>\
                            </div>\
                            <div class="diamond-info">Color:\
                                <span class="color-info">'+value.color+'</span>\
                            </div>\
                            <div class="diamond-info">Carat:\
                                <span class="carat-info">'+value.carat+'</span>\
                            </div>\
                            <div class="diamond-info">Clarity:\
                                <span class="clarity-info">'+value.clarity+'</span>\
                            </div>\
                            <div class="diamond-info">Cut:\
                                <span class="cut-info">'+value.cut+'</span>\
                            </div>\
                            <div class="diamond-info">Certificate:\
                                <span class="certificate-type-info">'+value.lab+'</span>\
                            </div>\
                        </div>\
                        <div class="diamond-more-info">\
                            <p class="more-info-button">MORE DETAILS</p>\
                        </div>\
                    </div>\
                    <div class="purchase-advantage diamond-pdp-advantage hide">\
                        <span class="free-return-info">\
                        <span></span>30 - day Return Period</span> <span class="free-shipping-info">\
                        <span></span>Free Shipping</span>\
                    </div>\
                    <!--<div class="holiday-diamond-event flex">\
                        <div class="image-wrapper">\
                            <img src="https://cdn.shopify.com/s/files/1/0599/0839/0973/files/PDP-mothers-day_2024_2x_5537c5e8-ffac-4dd3-bad7-7b2bd1661602.avif?v=1716216301" class="d-block" alt="Mother\'s day" data-uw-rm-alt-original="Mother\'s day" data-uw-rm-alt="ALT">\
                        </div>\
                        <div class="content">\
                            <span class="sub-title hide">LAST DAY</span>\
                            <h3><span>Offer</span> Extended</h3>\
                            <p data-uw-rm-sr=""><strong>Get 1/4 CTW. Diamond Bar Pendant </strong>with purchase over $1,000.</p>\
                            <p data-uw-rm-sr=""><strong>Get 1/2 CTW. Diamond Bolo Bracelet </strong>with purchase over $3,000.</p>\
                            <p id="schedule-appointment-btn"></p>\
                            <span class="holiday-diamond-event-popup-btn">*TERMS APPLY</span>\
                        </div>\
                    </div>-->\
                    <form method="post" action="/cart/add" id="product_form_8281019023643" accept-charset="UTF-8" enctype="multipart/form-data" novalidate="novalidate" data-product-form="">\
                        <input type="hidden" name="form_type" value="product">\
                        <input type="hidden" name="utf8" value="✓">\
                        <div class="product-form__controls-group product-form__controls-group--submit">\
                            <div class="product-form__item product-form__item--submit">\
                                <div class="product-form__add-to-setting">\
                                    <div class="ship-timeline-n-tracking">\
                                        <p class="product-form_ship-in-ring-timeline ship-msg">Ships in a ring by\
                                            <b>'+shipInDate.toString('ddd, MMMM d')+'</b>\
                                        </p>\
                                        <p class="realtime-track">Track in real time before it ships</p>\
                                    </div>\
                                    <div class="sticky-button-price-wrapper ">\
                                        <div class="product-sticky-price engagement-ring hide medium-up--hide">\
                                            <div class="product-single__price">\
                                                <div class="prodcut__price">\
                                                    <div class="price__on-sale" data-uw-rm-sr="">$366</div>\
                                                    <div class="diamond__only">(Diamond Only)</div>\
                                                </div>\
                                                <!--<div class="bank-wire-price" data-uw-rm-sr="">BANK WIRE PRICE $359</div>-->\
                                            </div>\
                                        </div>\
                                        <button type="button" name="add" id="addtoring" data-product="'+_diamondFor+'" data-sku="'+value.sku+'" class="btn"><span class="rsloading-spinner" data-loader=""></span><span id="btntxtcart" data-add-to-cart-text="">'+_btnTxt+'</span></button>\
                                    </div>\
                                </div>\
                                <div class="product-form__buy-loose">\
                                    <p class="product-form_ship-loose-timeline ship-msg">\
                                        Ships Loose By\
                                        <b>'+shipByDate.toString('ddd, MMMM d')+'</b>\
                                    </p>\
                                    <input type="hidden" name="properties[SKU]" id="properties-color" value="'+value.sku+'">\
                                    <input type="hidden" name="properties[COLOR]" id="properties-color" value="'+value.color+'">\
                                    <input type="hidden" name="properties[CLARITY]" id="properties-clarty" value="'+value.clarity+'">\
                                    <input type="hidden" name="properties[LAB]" id="properties-lab" value="'+value.lab+'">\
                                    <input type="hidden" name="properties[DIMENSION]" id="properties-color" value="'+value.measurement+'">\
                                    <input type="hidden" name="properties[Ship by]" id="properties-ship-by" value="'+shipByDate.toString('ddd, MMMM d')+'">\
                                    <input type="hidden" name="product-id" id="productid" value="">\
                                    <input type="hidden" name="id" id="mainvid" value="">\
                                    <input type="hidden" name="section-id" value="template--15762090885181__main">\
                                    <button type="button" name="add" aria-label="Add to cart" id="createproduct" class="btn btn--secondary-accent">\
                                        <span class="rsloading-spinner" data-loader=""></span>\
                                        <span data-add-to-cart-text="">Buy Loose</span>\
                                    </button>\
                                </div>\
                            </div>\
                        </div>\
                        <input type="hidden" name="product-id" value="">\
                        <input type="hidden" name="section-id" value="diamond-product-template">\
                    </form>\
                    <div class="product_description--accordion">\
                        <div class="accordion-header active">\
                            <h4>DIAMOND DETAILS</h4>\
                            <span class="arrow"><svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-chevron-down" viewBox="0 0 9 9"><path d="M8.542 2.558a.625.625 0 0 1 0 .884l-3.6 3.6a.626.626 0 0 1-.884 0l-3.6-3.6a.625.625 0 1 1 .884-.884L4.5 5.716l3.158-3.158a.625.625 0 0 1 .884 0z" fill="#fff"></path></svg></span>\
                        </div>\
                        <div class="accordion-content" style="display: block;">\
                            <div class="pair-first-diamond">\
                                <p>\
                                    <span class="meta__title">Lab</span>\
                                    <span class="meta-info-desc metal-variant-info">\
                                          <a class="diamond-certificate-link" target="_blank" href="'+value.lab_url+'" rel="null noopener" aria-describedby="a11y-new-window-message" aria-label="GIA - open in a new tab" data-uw-rm-ext-link="" uw-rm-external-link-id="'+value.lab_url+'" data-uw-rm-brl="PR" data-uw-original-href="'+value.lab_url+'">\
                                          <span class="lab-name">'+value.lab+'</span>\
                                          </a>\
                                    </span>\
                                </p>\
                                <p>\
                                    <span class="meta__title">Certificate Number</span>\
                                    <span class="meta-info-desc metal-variant-info">\
                                        <a class="diamond-certificate-link" target="_blank" href="'+value.lab_url+'" rel="null noopener" aria-describedby="a11y-new-window-message" aria-label="'+value.cert_num+' - open in a new tab" data-uw-rm-ext-link="" uw-rm-external-link-id="'+value.lab_url+'" data-uw-rm-brl="PR" data-uw-original-href="'+value.lab_url+'">\
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
                            </div>\
                        </div>\
                        <div class="accordion-header price-match-guarantee" style="display: none;">\
                            <h4>DIAMOND PRICE GUARANTEE</h4>\
                            <span class="arrow"><svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-chevron-down" viewBox="0 0 9 9"><path d="M8.542 2.558a.625.625 0 0 1 0 .884l-3.6 3.6a.626.626 0 0 1-.884 0l-3.6-3.6a.625.625 0 1 1 .884-.884L4.5 5.716l3.158-3.158a.625.625 0 0 1 .884 0z" fill="#fff"></path></svg></span>\
                        </div>\
                        <div class="accordion-content">\
                            <p class="learn--more">Our large inventory of exclusive diamonds is fair priced! Therefore, if you find the same diamond with a matching GIA or IGI certificate, we will honor the price.\
                                <span>\
                                  <a href="#" data-uw-rm-brl="PR" data-uw-original-href="#"  >Learn more.</a>\
                                </span>\
                            </p>\
                        </div>\
                        <div class="accordion-header lifetime-diamond-upgrade">\
                            <h4>LIFETIME DIAMOND UPGRADE</h4>\
                            <span class="arrow"><svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-chevron-down" viewBox="0 0 9 9"><path d="M8.542 2.558a.625.625 0 0 1 0 .884l-3.6 3.6a.626.626 0 0 1-.884 0l-3.6-3.6a.625.625 0 1 1 .884-.884L4.5 5.716l3.158-3.158a.625.625 0 0 1 .884 0z" fill="#fff"></path></svg></span>\
                        </div>\
                        <div class="accordion-content">\
                            <p>'+_diamondUpdate+'</p>\
                        </div>\
                    </div>\
                </div>\
            </div>';
          }else{

              var productHtml = '<div class="grid__item product-single__diamond-group medium-up--two-thirds" data-product-single-media-group="">\
                <div class="diamond-image-wrapper">\
                    <div class="diamond-image">\
                        <div class="diamondimg diamond-image-grid">\
                            <div class="image-wrapper">';
                                if( value.cover_pic.indexOf("http") == 0 ){
                                    productHtml +='<img src="'+value.cover_pic+'" alt="'+value.title+'">';
                                }else{
                                    productHtml +='<img src="'+theme.settings.assetUrl+value.cover_pic+'" alt="'+value.title+'">';
                                }
                             productHtml +='</div>\
                        </div>\
                    </div>\
                    <div class="diamond-iframe">\
                        <div class="diamond-image-grid">\
                            <iframe width="600px" height="600px" data-uw-rm-iframe="un"></iframe>\
                        </div>\
                    </div>\
                    <div class="diamond-fingure-view">\
                        <div class="diamond-image-grid">\
                            <div class="image-wrapper">\
                                <img alt="Loose Diamond" class="thubnil-img lazyloaded" src="https://cdn.shopify.com/s/files/1/0599/0839/0973/files/loose-diamond-hand-large_1.webp?v=1716216116">\
                            </div>\
                            <div class="diamond-on-hand">\
                                <span class="hand_diamond_img oval" style="background-size: 41.85%;background-image: url('+theme.settings.assetUrl+value.raw_diamond+');"></span>\
                            </div>\
                            <div id="slider" class="ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content">\
                                <div id="custom-handle" class="ui-slider-handle ui-corner-all ui-state-default" tabindex="0" style="left: 2.93103%;"><span>0.37 Ct</span></div>\
                            </div>\
                        </div>\
                    </div>\
                    <div class="diamond-certificate">\
                        <div class="diamond-image-grid">\
                            <div class="image-wrapper">\
                                <img alt="IGI Certified" class="thubnil-img lazyloaded"  src="https://cdn.shopify.com/s/files/1/0599/0839/0973/files/IGI_Icon_d7510f13-1b92-4a59-9ae5-4bf69426e48d.avif?v=1716216076">\
                            </div>\
                        </div>\
                    </div>\
                </div>\
                <div class="diamond-thumbnil-wrapper">\
                    <div class="diamond-thumbnil diamond-image active" data-type="diamond-image">';
                        if( value.cover_pic.indexOf("http") == 0 ){
                              productHtml +='<img src="'+value.cover_pic+'" alt="'+value.title+'">';
                          }else{
                              productHtml +='<img src="'+theme.settings.assetUrl+value.cover_pic+'" alt="'+value.title+'">';
                          }
                    productHtml +='</div>';
                    if( value.workshop_preview_url ){
                    productHtml +='<div class="diamond-thumbnil diamond-360" data-frame="'+value.workshop_preview_url+'" data-type="diamond-iframe">\
                        <img alt="Diamond Video" class="thubnil-img ls-is-cached lazyloaded"  src="https://cdn.shopify.com/s/files/1/0599/0839/0973/files/video_play.png?v=1716214635" >\
                    </div>';
                    }
                  if( value.raw_diamond ){
                    productHtml +='<div class="diamond-thumbnil diamond-size-preivew" data-carat="'+value.carat+'" data-type="diamond-fingure-view">\
                        <img alt="Loose Diamond" class="thubnil-img ls-is-cached lazyloaded" src="https://cdn.shopify.com/s/files/1/0599/0839/0973/files/loose-diamond-hand.webp?v=1716214787">\
                        <div class="diamond-on-hand">\
                            <span class="hand_diamond_img round oval" style="background-size: 41.85%;background-image: url('+theme.settings.assetUrl+value.raw_diamond+');"></span>\
                        </div>\
                    </div>';
                  }
                    productHtml +='<div class="diamond-thumbnil diamond-certificate" data-type="diamond-certificate">\
                        <a href="'+value.lab_url+'" target="_blank" rel="null noopener" aria-describedby="a11y-new-window-message" data-uw-original-href="'+value.lab_url+'">';
                        if(value.lab=='GIA'){
                            productHtml +='<img alt="GIA Certified" src="https://cdn.shopify.com/s/files/1/0599/0839/0973/files/GIA_Icon_60d07140-6c0d-4f9d-8321-89b0bd69240a.webp?v=1716216022">';
                        }else{
                          productHtml +='<img alt="IGI Certified" src="https://cdn.shopify.com/s/files/1/0599/0839/0973/files/IGI_Icon_d7510f13-1b92-4a59-9ae5-4bf69426e48d_1.avif?v=1716382531">'
                        }
                        productHtml +='</a>\
                    </div>\
                </div>\
                <div class="diamond-thumbnil-wrapper" style="margin-top:10px;">\
                    <div class="diamond-thumbnil diamond-image active" data-type="diamond-image">';
                        if( value.cover_pic_two.indexOf("http") == 0 ){
                              productHtml +='<img src="'+theme.settings.assetUrl+value.cover_pic_two+'" alt="'+value.title+'">';
                          }else{
                              productHtml +='<img src="'+value.cover_pic_two+'" alt="'+value.title+'">';
                          }
                    productHtml +='</div>';
                    if( value.workshop_preview_url_two ){
                    productHtml +='<div class="diamond-thumbnil diamond-360" data-frame="'+value.workshop_preview_url_two+'" data-type="diamond-iframe">\
                        <img alt="Diamond Video" class="thubnil-img ls-is-cached lazyloaded"  src="https://cdn.shopify.com/s/files/1/0599/0839/0973/files/video_play.png?v=1716214635" >\
                    </div>';
                    }
                  if( value.raw_diamond_two ){
                    productHtml +='<div class="diamond-thumbnil diamond-size-preivew" data-carat="'+value.carat_two+'" data-type="diamond-fingure-view">\
                        <img alt="Loose Diamond" class="thubnil-img ls-is-cached lazyloaded" src="https://cdn.shopify.com/s/files/1/0599/0839/0973/files/loose-diamond-hand.webp?v=1716214787">\
                        <div class="diamond-on-hand">\
                            <span class="hand_diamond_img round oval" style="background-size: 41.85%;background-image: url('+theme.settings.assetUrl+value.raw_diamond_two+');"></span>\
                        </div>\
                    </div>';
                  }
                    productHtml +='<div class="diamond-thumbnil diamond-certificate" data-type="diamond-certificate">\
                        <a href="'+value.lab_url_two+'" target="_blank" rel="null noopener" aria-describedby="a11y-new-window-message" data-uw-original-href="'+value.lab_url_two+'">';
                        if(value.lab=='GIA'){
                            productHtml +='<img alt="GIA Certified" src="https://cdn.shopify.com/s/files/1/0599/0839/0973/files/GIA_Icon_60d07140-6c0d-4f9d-8321-89b0bd69240a.webp?v=1716216022">';
                        }else{
                          productHtml +='<img alt="IGI Certified" src="https://cdn.shopify.com/s/files/1/0599/0839/0973/files/IGI_Icon_d7510f13-1b92-4a59-9ae5-4bf69426e48d_1.avif?v=1716382531">'
                        }
                        productHtml +='</a>\
                    </div>\
                </div>\
            </div>\
            <div class="grid__item product-single__information medium-up--one-third product-single__description-container">\
                <div class="product-single__meta">\
                    <h1 class="product-single__title" role="heading" aria-level="2" data-uw-rm-heading="level">'+value.title+'</h1>\
                    <div class="product-single__sku">Certificate Number#:\
                        <span>'+value.cert_num+'</span>\
                    </div>\
                    <div class="product-single__price">\
                        <div class="prodcut__price">';
                            productHtml +='<div class="price__on-sale" data-uw-rm-sr="">'+theme.Currency.formatMoney( Currency.convert(value.final_price * 100, 'USD' , theme.settings.shopCurrency) , theme.settings.moneyFormat)+'</div>';
                            productHtml +='<div class="diamond__only">(Diamond Only)</div>\
                        </div>\
                        <!--<div class="bank-wire-price" data-uw-rm-sr="">BANK WIRE PRICE $359</div>-->\
                    </div>\
                    <!--<div class="affirm-info-wrapper">\
                        <p class="affirm-as-low-as" >Starting at <span class="affirm-ala-price" data-uw-rm-sr="">$34</span>/mo or 0% APR with <span class="__affirm-logo __affirm-logo-blue __ligature__affirm_full_logo__ __processed">Affirm</span>. <a class="affirm-modal-trigger" aria-label="See if you qualify - Learn more about Affirm Financing (opens in modal)"\
                            href="javascript:void(0)">See if you qualify</a>\
                        </p>\
                    </div>-->\
                    <div class="product__addon-info">\
                        <p class="extented-returns-popup-button">Free Insured Shipping. <span class="extented-returns-title">30 Day Returns.</span></p>\
                    </div>\
                    <div class="diamond-short-information">\
                        <p class="">Diamond Details 1</p>\
                        <div class="diamond-info-wrapper">\
                            <div class="diamond-info">Shape:\
                                <span class="shape-info">'+value.shape+'</span>\
                            </div>\
                            <div class="diamond-info">Color:\
                                <span class="color-info">'+value.color+'</span>\
                            </div>\
                            <div class="diamond-info">Carat:\
                                <span class="carat-info">'+value.carat+'</span>\
                            </div>\
                            <div class="diamond-info">Clarity:\
                                <span class="clarity-info">'+value.clarity+'</span>\
                            </div>\
                            <div class="diamond-info">Cut:\
                                <span class="cut-info">'+value.cut+'</span>\
                            </div>\
                            <div class="diamond-info">Certificate:\
                                <span class="certificate-type-info">'+value.lab+'</span>\
                            </div>\
                        </div>\
                        <div class="diamond-more-info">\
                            <p class="more-info-button">MORE DETAILS</p>\
                        </div>\
                    </div>\
                    <div class="diamond-short-information">\
                        <p class="">Diamond Details 2</p>\
                        <div class="diamond-info-wrapper">\
                            <div class="diamond-info">Shape:\
                                <span class="shape-info">'+value.shape_two+'</span>\
                            </div>\
                            <div class="diamond-info">Color:\
                                <span class="color-info">'+value.color_two+'</span>\
                            </div>\
                            <div class="diamond-info">Carat:\
                                <span class="carat-info">'+value.carat_two+'</span>\
                            </div>\
                            <div class="diamond-info">Clarity:\
                                <span class="clarity-info">'+value.clarity_two+'</span>\
                            </div>\
                            <div class="diamond-info">Cut:\
                                <span class="cut-info">'+value.cut_two+'</span>\
                            </div>\
                            <div class="diamond-info">Certificate:\
                                <span class="certificate-type-info">'+value.lab_two+'</span>\
                            </div>\
                        </div>\
                        <div class="diamond-more-info">\
                            <p class="more-info-button">MORE DETAILS</p>\
                        </div>\
                    </div>\
                    <div class="purchase-advantage diamond-pdp-advantage hide">\
                        <span class="free-return-info">\
                        <span></span>30 - day Return Period</span> <span class="free-shipping-info">\
                        <span></span>Free Shipping</span>\
                    </div>\
                    <!--<div class="holiday-diamond-event flex">\
                        <div class="image-wrapper">\
                            <img src="https://cdn.shopify.com/s/files/1/0599/0839/0973/files/PDP-mothers-day_2024_2x_5537c5e8-ffac-4dd3-bad7-7b2bd1661602.avif?v=1716216301" class="d-block" alt="Mother\'s day" data-uw-rm-alt-original="Mother\'s day" data-uw-rm-alt="ALT">\
                        </div>\
                        <div class="content">\
                            <span class="sub-title hide">LAST DAY</span>\
                            <h3><span>Offer</span> Extended</h3>\
                            <p data-uw-rm-sr=""><strong>Get 1/4 CTW. Diamond Bar Pendant </strong>with purchase over $1,000.</p>\
                            <p data-uw-rm-sr=""><strong>Get 1/2 CTW. Diamond Bolo Bracelet </strong>with purchase over $3,000.</p>\
                            <p id="schedule-appointment-btn"></p>\
                            <span class="holiday-diamond-event-popup-btn">*TERMS APPLY</span>\
                        </div>\
                    </div>-->\
                    <form method="post" action="/cart/add" id="product_form_8281019023643" accept-charset="UTF-8" enctype="multipart/form-data" novalidate="novalidate" data-product-form="">\
                        <input type="hidden" name="form_type" value="product">\
                        <input type="hidden" name="utf8" value="✓">\
                        <div class="product-form__controls-group product-form__controls-group--submit">\
                            <div class="product-form__item product-form__item--submit">\
                                <div class="product-form__add-to-setting">\
                                    <div class="ship-timeline-n-tracking">\
                                        <p class="product-form_ship-in-ring-timeline ship-msg">Ships in a ring by\
                                            <b>'+shipInDate.toString('ddd, MMMM d')+'</b>\
                                        </p>\
                                        <p class="realtime-track">Track in real time before it ships</p>\
                                    </div>\
                                    <div class="sticky-button-price-wrapper ">\
                                        <div class="product-sticky-price engagement-ring hide medium-up--hide">\
                                            <div class="product-single__price">\
                                                <div class="prodcut__price">\
                                                    <div class="price__on-sale" data-uw-rm-sr="">$366</div>\
                                                    <div class="diamond__only">(Diamond Only)</div>\
                                                </div>\
                                                <!--<div class="bank-wire-price" data-uw-rm-sr="">BANK WIRE PRICE $359</div>-->\
                                            </div>\
                                        </div>\
                                        <button type="button" name="add" id="addtoring" data-product="Earring" data-sku="'+value.sku+'" class="btn"><span class="rsloading-spinner" data-loader=""></span><span id="btntxtcart" data-add-to-cart-text="">'+_btnTxt+'</span></button>\
                                    </div>\
                                </div>\
                                <div class="product-form__buy-loose">\
                                    <p class="product-form_ship-loose-timeline ship-msg">\
                                        Ships Loose By\
                                        <b>'+shipByDate.toString('ddd, MMMM d')+'</b>\
                                    </p>\
                                    <input type="hidden" name="properties[COLOR]" id="properties-color" value="'+value.color+'">\
                                    <input type="hidden" name="properties[CLARITY]" id="properties-clarty" value="'+value.clarity+'">\
                                    <input type="hidden" name="properties[LAB]" id="properties-lab" value="'+value.lab+'">\
                                    <input type="hidden" name="properties[Ship by]" id="properties-ship-by" value="'+shipByDate.toString('ddd, MMMM d')+'">\
                                    <input type="hidden" name="product-id" id="productid" value="">\
                                    <input type="hidden" name="id" id="mainvid" value="">\
                                    <input type="hidden" name="section-id" value="template--15762090885181__main">\
                                    <button type="button" name="add" aria-label="Add to cart" id="createproduct" class="btn btn--secondary-accent">\
                                        <span class="rsloading-spinner" data-loader=""></span>\
                                        <span data-add-to-cart-text="">Buy Loose</span>\
                                    </button>\
                                </div>\
                            </div>\
                        </div>\
                        <input type="hidden" name="product-id" value="">\
                        <input type="hidden" name="section-id" value="diamond-product-template">\
                    </form>\
                    <div class="product_description--accordion">\
                        <div class="accordion-header active">\
                            <h4>DIAMOND DETAILS</h4>\
                            <span class="arrow"><svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-chevron-down" viewBox="0 0 9 9"><path d="M8.542 2.558a.625.625 0 0 1 0 .884l-3.6 3.6a.626.626 0 0 1-.884 0l-3.6-3.6a.625.625 0 1 1 .884-.884L4.5 5.716l3.158-3.158a.625.625 0 0 1 .884 0z" fill="#fff"></path></svg></span>\
                        </div>\
                        <div class="accordion-content" style="display: block;">\
                            <p class="diamond-details-title">Diamond 1 details</p>\
                            <div class="pair-first-diamond">\
                                <p>\
                                    <span class="meta__title">Lab</span>\
                                    <span class="meta-info-desc metal-variant-info">\
                                          <a class="diamond-certificate-link" target="_blank" href="'+value.lab_url+'" rel="null noopener"  >\
                                          <span class="lab-name">'+value.lab+'</span>\
                                          </a>\
                                    </span>\
                                </p>\
                                <p>\
                                    <span class="meta__title">Certificate Number</span>\
                                    <span class="meta-info-desc metal-variant-info">\
                                        <a class="diamond-certificate-link" target="_blank" href="'+value.lab_url+'" rel="null noopener" >\
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
                            </div>\
                              <p class="diamond-details-title">Diamond 2 details</p>\
                            <div class="pair-first-diamond">\
                                <p>\
                                    <span class="meta__title">Lab</span>\
                                    <span class="meta-info-desc metal-variant-info">\
                                          <a class="diamond-certificate-link" target="_blank" href="'+value.lab_url_two+'" rel="null noopener"  >\
                                          <span class="lab-name">'+value.lab_two+'</span>\
                                          </a>\
                                    </span>\
                                </p>\
                                <p>\
                                    <span class="meta__title">Certificate Number</span>\
                                    <span class="meta-info-desc metal-variant-info">\
                                        <a class="diamond-certificate-link" target="_blank" href="'+value.lab_url_two+'" rel="null noopener" >\
                                          <span class="certificate-number">'+value.cert_num_two+'</span>\
                                        </a>\
                                    </span>\
                                </p>\
                                <p>\
                                    <span class="meta__title">SHAPE</span>\
                                    <span class="meta-info-desc shape-info">'+value.shape_two+'</span>\
                                </p>\
                                <p>\
                                    <span class="meta__title">CARAT</span>\
                                    <span class="meta-info-desc carat-info">'+value.carat_two+'</span>\
                                </p>\
                                <p>\
                                    <span class="meta__title">Cut</span>\
                                    <span class="meta-info-desc cut-info">'+value.cut_two+'</span>\
                                </p>\
                                <p>\
                                    <span class="meta__title">Color</span>\
                                    <span class="meta-info-desc color-info">'+value.color_two+'</span>\
                                </p>\
                                <p>\
                                    <span class="meta__title">Clarity</span>\
                                    <span class="meta-info-desc clarity-info">'+value.clarity_two+'</span>\
                                </p>\
                                <p>\
                                    <span class="meta__title">Polish</span>\
                                    <span class="meta-info-desc polish-info">'+value.polish_two+'</span>\
                                </p>\
                                <p>\
                                    <span class="meta__title">Symmetry</span>\
                                    <span class="meta-info-desc symmetry-info">'+value.symmetry_two+'</span>\
                                </p>\
                                <p>\
                                    <span class="meta__title">Fluorescence</span>\
                                    <span class="meta-info-desc fluorescence-info">'+value.fluorescence_two+'</span>\
                                </p>\
                                <p>\
                                    <span class="meta__title">TABLE</span>\
                                    <span class="meta-info-desc table-info">'+value.table_two+'%</span>\
                                </p>\
                                <p>\
                                    <span class="meta__title">DEPTH</span>\
                                    <span class="meta-info-desc depth-info">'+value.depth_two+'%</span>\
                                </p>\
                                <p>\
                                    <span class="meta__title">MEASUREMENT</span>\
                                    <span class="meta-info-desc measurements-info">'+value.measurement_two+'</span>\
                                </p>\
                                <p>\
                                    <span class="meta__title">L/W RATIO</span>\
                                    <span class="meta-info-desc l-w-ratio-info">'+value.lw_ratio_two+'</span>\
                                </p>\
                            </div>\
                        </div>\
                        <div class="accordion-header price-match-guarantee" style="display: none;">\
                            <h4>DIAMOND PRICE GUARANTEE</h4>\
                            <span class="arrow"><svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-chevron-down" viewBox="0 0 9 9"><path d="M8.542 2.558a.625.625 0 0 1 0 .884l-3.6 3.6a.626.626 0 0 1-.884 0l-3.6-3.6a.625.625 0 1 1 .884-.884L4.5 5.716l3.158-3.158a.625.625 0 0 1 .884 0z" fill="#fff"></path></svg></span>\
                        </div>\
                        <div class="accordion-content">\
                            <p class="learn--more">Our large inventory of exclusive diamonds is fair priced! Therefore, if you find the same diamond with a matching GIA or IGI certificate, we will honor the price.\
                                <span>\
                                  <a href="#" data-uw-rm-brl="PR" data-uw-original-href="#"  >Learn more.</a>\
                                </span>\
                            </p>\
                        </div>\
                        <div class="accordion-header lifetime-diamond-upgrade">\
                            <h4>LIFETIME DIAMOND UPGRADE</h4>\
                            <span class="arrow"><svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-chevron-down" viewBox="0 0 9 9"><path d="M8.542 2.558a.625.625 0 0 1 0 .884l-3.6 3.6a.626.626 0 0 1-.884 0l-3.6-3.6a.625.625 0 1 1 .884-.884L4.5 5.716l3.158-3.158a.625.625 0 0 1 .884 0z" fill="#fff"></path></svg></span>\
                        </div>\
                        <div class="accordion-content">\
                            <p>'+_diamondUpdate+'</p>\
                        </div>\
                    </div>\
                </div>\
            </div>';
          
          }
          doloader('hide');
          $('#mainproduct').empty('').append(productHtml).show();
          var handle = $( "#custom-handle" );
          $( "#slider" ).slider({
            min: 0.20,
            max: 6,
            step: 0.01,
            create: function() {
              handle.html( '<span>'+$( this ).slider( "value" )+' Ct.<span>' );
            },
            slide: function( event, ui ) {
              //console.log(event);
              handle.html( '<span>'+ui.value+' Ct.<span>'  );
              $('.hand_diamond_img').css('background-size', 41 + (ui.value * 5)+'%' );
            }
          });
      }else{
          doloader('hide');
          $('#noproduct').css('display','flex');
      }
      
    }).catch(error=>{
        console.log(error)
        
    })
  }
  getCart();
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

//accordians
$(document).on('click','.diamond-360',function(){
  $('.diamond-thumbnil').removeClass('active');
  $(this).addClass('active');
  $('.diamondimg').hide();
  $('.diamond-fingure-view').hide();
  $('.diamond-iframe').show().find('iframe').attr('src',$(this).attr('data-frame'));
});
$(document).on('click','.diamond-size-preivew',function(){
  $('.diamond-thumbnil').removeClass('active');
  $(this).addClass('active');
  $('.diamondimg').hide();
  $('.diamond-iframe').hide().find('iframe').attr('src','');
  $('.diamond-fingure-view').show();
  $("#slider").slider('value',parseFloat($(this).attr('data-carat') ));
  var handle = $( "#custom-handle" );
  handle.html( '<span>'+$(this).attr('data-carat')+' Ct.<span>'  );
});
$(document).on('click','.diamond-image',function(){
  $('.diamond-thumbnil').removeClass('active');
  $(this).addClass('active');
  $('.diamond-iframe').hide().find('iframe').attr('src','');
  $('.diamond-fingure-view').hide();
  $('.diamondimg').show();
});

//Create product
$(document).on('click', '#createproduct' , function(e){
  e.preventDefault();
  $(this).parent().addClass('button-active');
  //$(this).text('Wait...');
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
  
  axios.get(`${theme.settings.apiUrl}/createproduct/${_sku}?type=${_productType}` , config).then(response=>{
      console.log(response.data.Diamond);
      var diamondData = response.data.Diamond;
      if(diamondData){
        $('#productid').val(diamondData.shopify_id);
        $('#mainvid').val(diamondData.shopify_res.product.variants[0].id);
      }
      $('#product_form_8281019023643').submit();
      $(this).parent().removeClass('button-active');
    }).catch(error=>{
        console.log(error);
        $(this).parent().removeClass('button-active');
    })
});

//Set product in cookies
$(document).on('click', '#addtoring' , function(e){
  $(this).parent().addClass('button-active');
    //Comapre ring + diamond type
    var ___selectedShapes = $.cookie("_selectedShapes");
    _mainShape = _diamonmd.shape;
    if(_diamonmd.shape=='Moval'){
      _diamonmd.shape = 'Oval';
    }
    if( (_diamonmd.shape=='Dutch Marquise' || _diamonmd.shape=='Elongated Hexagon' )  ){
      _diamonmd.shape = 'Marquise';
    }
    if(___selectedShapes){
      var ___selectedShapesData = $.parseJSON(___selectedShapes);
      if( ___selectedShapesData._activeShape != _diamonmd.shape ){
        $.removeCookie('_ring', { path: '/' });
      }
    }
  //_diamonmd.shape = _mainShape;
  var sku = $(this).attr('data-sku');
  var _diamondFor = $(this).attr('data-product');
  var diamondImg = $('#diamondimg').find('img').attr('src');
   if(_diamonmd.shape.indexOf('Antique') !== -1){
      _diamonmd.shape = 'Antique Cuts';
   }
  var _dData = {
    "sku" : _diamonmd.sku,
    "shape" : _mainShape,
    "cover_pic" : _diamonmd.cover_pic,
    "type" : _diamonmd.type,
  };
  $.removeCookie("_diamonmd");
  $.cookie("_diamonmd", JSON.stringify(_dData), { expires: 7 ,  path: '/' });

  //check selected diamond
  var _selectedRing = $.cookie("_ring");
  if(_selectedRing){
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
    if(_diamondFor=='' && ( _ProductType== 'Earrings' || _ProductType== 'Earring' ) ){
      $.removeCookie('_ring', { path: '/' });
      //window.location.href = _ringData.handle;
        window.location.href = '/collections/engagement-rings?filter.v.option.shape='+_diamonmd.shape;

      
      /*if(_diamonmd.type=='LabGrown'){
         window.location.href = '/collections/'+_linkStr+'lab-diamonds';
      }else{
         window.location.href = '/collections/'+_linkStr+'natural-diamonds';
      }
      */
      return;
    }
    
    var newhref = _ringData.handle+'?variant='+_ringData.vid+'&view=final-ring&diamond='+_diamonmd.sku;
    window.location.href = newhref; 
  }else{
    if(_diamondFor=='Earring'){
      window.location.href = '/collections/create-your-own-earrings?filter.v.option.shape='+_diamonmd.shape;
    }else{
      window.location.href = '/collections/engagement-rings?filter.v.option.shape='+_diamonmd.shape;
    }
    
  }
  //$(this).parent().removeClass('button-active');
});

});
