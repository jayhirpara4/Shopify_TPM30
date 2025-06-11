var alreadydone = false;
var lastpage = 0;
//$(function(){
    //Price Slider
    var priceSlider = document.getElementById('diamonds-price-slider');
    noUiSlider.create(priceSlider, {
        // start values are parsed by 'format'
        start: [0, 25000],
        range: { min: 0, "30%": [2e3, 100], "70%": [1e4, 500], "90%": [2e4, 1e3], max: 25000 },
        step: 100,
        tooltips: false,
        connect: true,
        //format: format,
        //pips: { mode: 'steps', format: format, density: 50 },
    });
    priceSlider.noUiSlider.on('update', function (values, handle) {
        var value = values[handle];
        if (handle) {
            $('#slide-max-price').val(value);
            $('#priceto').val(value);
        } else {
            $('#slide-min-price').val(value);  
             $('#pricefrom').val(value);
        }
        //getData();
    });
    
    //Carat slider
    var caratSlider = document.getElementById('diamonds-carat-slider');
    noUiSlider.create(caratSlider, {
        // start values are parsed by 'format'
        start: [0, 15],
        range: { min: 0,  max: 15 },
        step: 0.01,
        connect: true,
        tooltips: false,
    });
    caratSlider.noUiSlider.on('update', function (values, handle) {
        var value = values[handle];
        //if(!nosetcarat || nosetcarat=='0.2'){
          if (handle) {
              $('#slide-max-carat').val(value);
              $('#caratto').val(value);
          } else {
              $('#slide-min-carat').val(value);  
              $('#caratfrom').val(value);
          }
        //}
       //getData();
    });
      
  
    //Submit filter data
    $('.diamondfilter').on('click',function(){
      
      if($(this).hasClass('slide-active')){
        $(this).removeClass('slide-active');
      }else{
        $(this).addClass('slide-active');
      }
      var alltypes = [];
      $('.diamondfilter').each(function(i, obj) {
        if($(this).hasClass('slide-active')){
          alltypes.push($(this).attr('data-value'));
        }
      });
      $('#diamondtype').val(alltypes);
      getData();
    });
    //Color filter
    $('.colorfilter').on('click',function(){
      //$('.colorfilter').removeClass('slide-active');
      if($(this).hasClass('slide-active')){
        $(this).removeClass('slide-active');
      }else{
        $('.colorfilter').removeClass('slide-active');
        $(this).addClass('slide-active');
      }
      $('.filter-diamond-intensity').attr('data-color' , $(this).attr('data-value'));
      $('#diamondcolor').val($(this).attr('data-value'));
      getData();
    });

    //intensity filter
    $('.intensityfilter').on('click',function(){
      if($(this).hasClass('active')){
        $(this).removeClass('active');
      }else{
        $(this).addClass('active');
      }
      var alltypes = [];
      $('.intensityfilter').each(function(i, obj) {
        if($(this).hasClass('active')){
          alltypes.push($(this).attr('data-value'));
        }
      });
      
      $('#diamondintensity').val(alltypes);
      getData();
    });
 
    //Set price value
    $('#slide-min-price').on('blur',function(){
      if( $.isNumeric(this.value) ){
        $('#pricefrom').val(this.value);
        $('#diamonds-price-slider')[0].noUiSlider.set([ this.value ]);
        getData();
      }else{
       $(this).val('');
      }
      
    });
    $('#slide-max-price').on('blur',function(){
      if( $.isNumeric(this.value) ){
        $('#priceto').val(this.value);
        $('#diamonds-price-slider')[0].noUiSlider.set([ $('#slide-min-carat').val() , this.value ]);
        getData();
      }else{
       $(this).val('');
      }
    });

    //Set carat value
    $('#slide-min-carat').on('blur',function(){
      if( $.isNumeric(this.value) ){
        $('#caratfrom').val(this.value);
        $('#diamonds-carat-slider')[0].noUiSlider.set([ this.value ]);
        getData();
      }else{
       $(this).val('');
      }
    });
    $('#slide-max-carat').on('blur',function(){
      if( $.isNumeric(this.value) ){
        $('#caratto').val(this.value);
        $('#diamonds-carat-slider')[0].noUiSlider.set([ $('#slide-min-carat').val() , this.value ]);
        getData();
      }else{
       $(this).val('');
      }
    });



    //Featured deal
    $('.diamond__featured-deal').on('click',function(){
      if($(this).hasClass('quick-active')){
        $(this).removeClass('quick-active');
        $('#featureddeal').val(0);
      }else{
        $(this).addClass('quick-active');
        $('#featureddeal').val(1);
      }
      getData();
    });

    //Quick ship deal
    $('.diamond__quick-shop-tab').on('click',function(){
      if($(this).hasClass('quick-active')){
        $(this).removeClass('quick-active');
        $('#quickship').val(0);
      }else{
        $(this).addClass('quick-active');
        $('#quickship').val(1);
      }
      getData();
    });

    //Sort dropdown
    $('.select-dropdown__button , .report-dropdown__button').on('click',function(){
      $(this).next('.select-dropdown__list').toggleClass('active');
    });
    $('#diamond__report-list li').on('click',function(){
      $(this).parent().parent().find('.sort_by-title').text($(this).text());
      $('#reportby').val($(this).attr('data-value'));
      $('.report-dropdown__button').click();
      getData();
    });
    $('#diamond__sort-by li').on('click',function(){
      $(this).parent().parent().find('.sort_by-title').text($(this).text());
      $('#sortby').val($(this).attr('data-value'));
      $('.select-dropdown__button').click();
      getData();
    });

    //compare
    $('.comparenow').on('click',function(){
      if($(this).hasClass('quick-active')){
        $(this).removeClass('quick-active');
          $('#blankcpmtable').hide();
          $('#diamondtable').show();
          $('.diamond-list').show();
          $('.addcmp').show();
      }else{
        $(this).addClass('quick-active');
        if( $('.diamond-compare.active').length<=0 ){
          $('#blankcpmtable').show();
          $('#diamondtable').hide();
        }else{
          $('.diamond-list').hide();
          $('.addcmp').show();
        }
      }
    });
    $(document).on('click','.diamond-compare',function(){
      if($(this).hasClass('active')){
           $(this).parent().removeClass('addcmp');
          $(this).removeClass('active');
          $('#totalCmp').text($('.diamond-compare.active').length);
      }else{
          $(this).addClass('active');
          $(this).parent().addClass('addcmp');
          $('#totalCmp').text($('.diamond-compare.active').length);
      }
    });

    //Certificiate search
    $('#certsearch').on('click',function(){
      $('#certnum').val($('#searchinp').val());
      getData();
    });
    //Range change events
    $('#diamonds-price-slider')[0].noUiSlider.on('change',function(v,handle){
        getData();
    });
    $('#diamonds-carat-slider')[0].noUiSlider.on('change',function(v,handle){
        getData();
    });
    
    //Range change events end

    function doloader(type){
      if(type=='show'){
        $('.mainloader').show();
      }else{
        $('.mainloader').hide();
      }
    }
  
  async function getData( page=1){
    doloader('show');
    var user = 'fooPalawat';
    var pass = 'barPalawat';
    var authorizationBasic = window.btoa(user + ':' + pass);
    const config = {
        headers: { 'content-type': 'multipart/form-data' ,"Authorization": "Basic " + authorizationBasic }
    }
    //axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
    var form = document.getElementById('filterform');
    let formData = new FormData(form);
    await axios.post(`${theme.settings.apiUrl}/search?page=${page}`,formData , config).then(response=>{
        //console.log(response.data.Diamonds);
        $('#diamond-total-count').text('of '+response.data.total);
        $('#diamond-count').text(response.data.Diamonds.total);
        var diamondData = response.data.Diamonds.data;
        var diamondNext = response.data.Diamonds.next_page_url;
        if(diamondNext){
          var result = diamondNext.split('?page=');
          $('#nextpage').attr('data-href',result[1]);
        }else{
          $('#nextpage').attr('data-href','');
        }
        var diamondRow = '';
        var dlastid = 0; 
        if(diamondData.length>0){
          if( response.data.type != 'Earring' ){
            $.each(diamondData, function(key,value){
              dlastid = value.id;
              diamondRow += '<div class="diamond-list drlist no-pair-diamond" id="diamondcomes'+value.id+'">\
                <div class="diamond-compare"><div><span></span></div></div>\
                <div class="diamond-image-wrapper">\
                    <a href="/products/diamonds?sku='+value.sku+'">';
                        if(value.is_featured>0){
                         diamondRow +='<p>Featured deal</p>';
                        }
                        diamondRow +='<div class="diamond-image">';
                            if( value.cover_pic.indexOf("http") == 0 ){
                                diamondRow +='<img src="'+value.cover_pic+'" alt="'+value.title+'">';
                            }else{
                                diamondRow +='<img src="'+theme.settings.assetUrl+value.cover_pic+'" alt="'+value.title+'">';
                            }
                        diamondRow +='</div>\
                    </a>\
                </div>\
                <div class="medium-up--hide diamond-mobile-info">\
                    <a href="/products/diamonds?sku='+value.sku+'">\
                        <p>'+value.title+'</p>\
                        <p class="extra-info">'+value.cut+' / '+value.color+' / '+value.clarity+'</p>\
                        <div class="extra-price-html diamond-price">';
                            if( value.sale_price>0){
                              diamondRow +='<span class="main-price">'+theme.Currency.formatMoney(value.sale_price * 100, theme.settings.moneyFormat)+'</span>';
                            }else{
                              diamondRow +='<span class="main-price">'+theme.Currency.formatMoney(value.original_price * 100, theme.settings.moneyFormat)+'</span>';
                            }
                              
                        diamondRow +='</div>\
                    </a>\
                </div>\
                <div class="small--hide">\
                    <a href="/products/diamonds?sku='+value.sku+'">'+value.shape+'</a>\
                </div>\
                <div class="small--hide">\
                    <a href="/products/diamonds?sku='+value.sku+'" >'+value.carat+'</a>\
                </div>\
                <div class="small--hide">\
                    <a href="/products/diamonds?sku='+value.sku+'" >'+value.color+'</a>\
                </div>\
                <div class="small--hide">\
                    <a href="/products/diamonds?sku='+value.sku+'" >'+value.culet+'</a>\
                </div>\
                <div class="small--hide">\
                    <a href="/products/diamonds?sku='+value.sku+'" >'+value.clarity+'</a>\
                </div>\
                <div class="small--hide">\
                    <a href="/products/diamonds?sku='+value.sku+'" >'+value.cut+'</a>\
                </div>\
                <div class="small--hide">\
                    <a href="/products/diamonds?sku='+value.sku+'" >'+value.lab+'</a>\
                </div>\
                <div class="additional-field  small--hide">\
                    <a href="/products/diamonds?sku='+value.sku+'" >'+value.symmetry+'</a>\
                </div>\
                <div class="additional-field small--hide">\
                    <a href="/products/diamonds?sku='+value.sku+'" >'+value.polish+'</a>\
                </div>\
                <div class="additional-field small--hide">\
                    <a href="/products/diamonds?sku='+value.sku+'" >'+value.culet+'</a>\
                </div>\
                <div class="additional-field small--hide">\
                    <a href="/products/diamonds?sku='+value.sku+'" >'+value.fluorescence+'</a>\
                </div>\
                <div class="additional-field small--hide">\
                    <a href="/products/diamonds?sku='+value.sku+'" >'+value.lw_ratio+'</a>\
                </div>\
                <div class="additional-field small--hide">\
                    <a href="/products/diamonds?sku='+value.sku+'" >'+value.depth+'</a>\
                </div>\
                <div class="additional-field small--hide">\
                    <a href="/products/diamonds?sku='+value.sku+'" >'+value.table+'</a>\
                </div>\
                <div class="small--hide">\
                    <a href="/products/diamonds?sku='+value.sku+'">';
                        if(value.is_quickship>0){
                        diamondRow +='<span class="quick-ship"></span>';
                        }else{
                        diamondRow +='<span class="no-quick-ship"></span>';
                        }
                    diamondRow +='</a>\
                </div>\
                <div class="diamond-price small--hide">\
                    <a href="/products/diamonds?sku='+value.sku+'">';
                        if( value.sale_price>0){
                            diamondRow +='<span class="main-price">'+theme.Currency.formatMoney(value.sale_price * 100, theme.settings.moneyFormat)+'</span><small><del class="other-price">'+theme.Currency.formatMoney(value.original_price * 100, theme.settings.moneyFormat)+'</del></small>';
                          }else{
                            diamondRow +='<span class="main-price">'+theme.Currency.formatMoney(value.original_price * 100, theme.settings.moneyFormat)+'</span>';
                          }
                    diamondRow +='</a>\
                </div>\
                <div class="arrow-wrapper">\
                    <a href="/products/diamonds?sku='+value.sku+'">\
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" viewBox="0 0 16.67 25.761">\
                            <path  id="Union_33" data-name="Union 33" d="M11.931,13.935l-.7.821.7-.821L0,0,11.931,13.935,23.862,0,11.931,13.935l.7.821Z" \
                              transform="translate(0.813 24.811) rotate(-90)" fill="none" stroke="#1c3348" stroke-width="2.5"\
                            ></path>\
                        </svg>\
                    </a>\
                </div>\
            </div>'
            });
          }else{
            $.each(diamondData, function(key,value){
              dlastid = value.id;
              diamondRow += '<div class="diamond-list drlist earring-diamond-list " id="diamondcomes'+value.id+'" >\
                  <div class="diamond-compare">\
                        <div><span></span></div>\
                    	</div>\
                <div class="diamondbox">\
                    <div class="pair-daimond-1 pair-diamond-wrapper">\
                        <div class="diamond-image-wrapper ">\
                            <a href="/products/diamonds?sku='+value.sku+'">';
                                if(value.is_featured>0){
                                 diamondRow +='<p>Featured deal</p>';
                                }

                                 diamondRow +='<div class="diamond-image">';
                                    if( value.cover_pic.indexOf("http") == 0 ){
                                        diamondRow +='<img src="'+value.cover_pic+'" alt="'+value.title+'">';
                                    }else{
                                        diamondRow +='<img src="'+theme.settings.assetUrl+value.cover_pic+'" alt="'+value.title+'">';
                                    }
                                diamondRow +='</div>\
                            </a>\
                        </div>\
                        <div class="medium-up--hide diamond-mobile-info">\
                            <a href="/products/diamonds?sku='+value.sku+'">\
                                <p>'+value.title+'</p>\
                                <p class="extra-info">'+value.cut+' / '+value.color+' / '+value.clarity+'</p>\
                                <div class="extra-price-html diamond-price">';
                                      diamondRow +='<span class="main-price">'+theme.Currency.formatMoney(value.sale_price * 100, theme.settings.moneyFormat)+'</span>';    
                                diamondRow +='</div>\
                            </a>\
                        </div>\
                        <div class="small--hide">\
                            <a href="/products/diamonds?sku='+value.sku+'">'+value.shape+'</a>\
                        </div>\
                        <div class="small--hide">\
                            <a href="/products/diamonds?sku='+value.sku+'" >'+value.carat+'</a>\
                        </div>\
                        <div class="small--hide">\
                            <a href="/products/diamonds?sku='+value.sku+'" >'+value.color+'</a>\
                        </div>\
                        <div class="small--hide">\
                            <a href="/products/diamonds?sku='+value.sku+'" >'+value.clarity+'</a>\
                        </div>\
                        <div class="small--hide">\
                            <a href="/products/diamonds?sku='+value.sku+'" >'+value.cut+'</a>\
                        </div>\
                        <div class="small--hide">\
                            <a href="/products/diamonds?sku='+value.sku+'" >'+value.lab+'</a>\
                        </div>\
                        <div class="additional-field  small--hide">\
                            <a href="/products/diamonds?sku='+value.sku+'" >'+value.symmetry+'</a>\
                        </div>\
                        <div class="additional-field small--hide">\
                            <a href="/products/diamonds?sku='+value.sku+'" >'+value.polish+'</a>\
                        </div>\
                        <div class="additional-field small--hide">\
                            <a href="/products/diamonds?sku='+value.sku+'" >'+value.culet+'</a>\
                        </div>\
                        <div class="additional-field small--hide">\
                            <a href="/products/diamonds?sku='+value.sku+'" >'+value.fluorescence+'</a>\
                        </div>\
                        <div class="additional-field small--hide">\
                            <a href="/products/diamonds?sku='+value.sku+'" >'+value.lw_ratio+'</a>\
                        </div>\
                        <div class="additional-field small--hide">\
                            <a href="/products/diamonds?sku='+value.sku+'" >'+value.depth+'</a>\
                        </div>\
                        <div class="additional-field small--hide">\
                            <a href="/products/diamonds?sku='+value.sku+'" >'+value.table+'</a>\
                        </div>\
                        <div class="small--hide">\
                            <a href="/products/diamonds?sku='+value.sku+'">';
                                if(value.is_quickship>0){
                                diamondRow +='<span class="quick-ship"></span>';
                                }else{
                                diamondRow +='<span class="no-quick-ship"></span>';
                                }
                            diamondRow +='</a>\
                        </div>\
                        <div class="diamond-price small--hide">\
                            <a href="/products/diamonds?sku='+value.sku+'">';
                                    diamondRow +='<span class="main-price">'+theme.Currency.formatMoney(value.original_price * 100, theme.settings.moneyFormat)+'</span>';
                            diamondRow +='</a>\
                        </div>\
                    </div>\
                    <div class="pair-daimond-2 pair-diamond-wrapper">\
                        <div class="diamond-image-wrapper ">\
                            <a href="/products/diamonds?sku='+value.sku+'">';
                                if(value.is_featured>0){
                                 diamondRow +='<p>Featured deal</p>';
                                }
                                 diamondRow +='<div class="diamond-image">\
                                    <img src="'+theme.settings.assetUrl+value.cover_pic_two+'" alt="'+value.title+'">\
                                </div>\
                            </a>\
                        </div>\
                        <div class="medium-up--hide diamond-mobile-info">\
                            <a href="/products/diamonds?sku='+value.sku+'">\
                                <p>'+value.title+'</p>\
                                <p class="extra-info">'+value.cut_two+' / '+value.color_two+' / '+value.clarity_two+'</p>\
                                <div class="extra-price-html diamond-price">';
                                      diamondRow +='<span class="main-price">'+theme.Currency.formatMoney(value.original_price_two * 100, theme.settings.moneyFormat)+'</span>';    
                                diamondRow +='</div>\
                            </a>\
                        </div>\
                        <div class="small--hide">\
                            <a href="/products/diamonds?sku='+value.sku+'">'+value.shape_two+'</a>\
                        </div>\
                        <div class="small--hide">\
                            <a href="/products/diamonds?sku='+value.sku+'" >'+value.carat_two+'</a>\
                        </div>\
                        <div class="small--hide">\
                            <a href="/products/diamonds?sku='+value.sku+'" >'+value.color_two+'</a>\
                        </div>\
                        <div class="small--hide">\
                            <a href="/products/diamonds?sku='+value.sku+'" >'+value.clarity_two+'</a>\
                        </div>\
                        <div class="small--hide">\
                            <a href="/products/diamonds?sku='+value.sku+'" >'+value.cut_two+'</a>\
                        </div>\
                        <div class="small--hide">\
                            <a href="/products/diamonds?sku='+value.sku+'" >'+value.lab_two+'</a>\
                        </div>\
                        <div class="additional-field  small--hide">\
                            <a href="/products/diamonds?sku='+value.sku+'" >'+value.symmetry_two+'</a>\
                        </div>\
                        <div class="additional-field small--hide">\
                            <a href="/products/diamonds?sku='+value.sku+'" >'+value.polish_two+'</a>\
                        </div>\
                        <div class="additional-field small--hide">\
                            <a href="/products/diamonds?sku='+value.sku+'" >'+value.culet_two+'</a>\
                        </div>\
                        <div class="additional-field small--hide">\
                            <a href="/products/diamonds?sku='+value.sku+'" >'+value.fluorescence_two+'</a>\
                        </div>\
                        <div class="additional-field small--hide">\
                            <a href="/products/diamonds?sku='+value.sku+'" >'+value.lw_ratio_two+'</a>\
                        </div>\
                        <div class="additional-field small--hide">\
                            <a href="/products/diamonds?sku='+value.sku+'" >'+value.depth_two+'</a>\
                        </div>\
                        <div class="additional-field small--hide">\
                            <a href="/products/diamonds?sku='+value.sku+'" >'+value.table_two+'</a>\
                        </div>\
                        <div class="small--hide">\
                            <a href="/products/diamonds?sku='+value.sku+'">';
                                if(value.is_quickship>0){
                                diamondRow +='<span class="quick-ship"></span>';
                                }else{
                                diamondRow +='<span class="no-quick-ship"></span>';
                                }
                            diamondRow +='</a>\
                        </div>\
                        <div class="diamond-price small--hide">\
                            <a href="/products/diamonds?sku='+value.sku+'">';
                                    diamondRow +='<span class="main-price">'+theme.Currency.formatMoney(value.original_price_two * 100, theme.settings.moneyFormat)+'</span>';
                            diamondRow +='</a>\
                        </div>\
                    </div>\
                  </div>\
                  <div class="arrow-wrapper">\
                      <a href="/products/diamonds?sku='+value.sku+'">\
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
        }else{
          if($('.empty-diamond').length<=0){
            diamondRow +='<p class="empty-diamond">No Diamonds Found.</p>';
          }
          
        }
        if(page==1){
          $('#diamondtable').empty('');
        }
        
        console.log(page);
        if($('#diamondcomes'+dlastid).length<=0){
          $('#diamondtable').append(diamondRow);
        }

        lastpage = page;
        alreadydone = true;
        setTimeout(() => {
          doloader('hide');
          //$('.empty-diamond').remove();
        }, 1000);
    }).catch(error=>{
        console.log(error)
        
    })
  }

  $(document).on('click','.reset-diamond-filter',function(){
    //Range change events
    $('#diamonds-price-slider')[0].noUiSlider.reset();
    $('#diamonds-carat-slider')[0].noUiSlider.reset();
    $('#diamonds-cut-slider')[0].noUiSlider.reset();
    $('#diamonds-color-slider')[0].noUiSlider.reset();
    $('#diamonds-clarity-slider')[0].noUiSlider.reset();
    $('#diamonds-polish-slider')[0].noUiSlider.reset();
    $('#diamonds-symmetry-slider')[0].noUiSlider.reset();
    $('#diamonds-fluorescence-slider')[0].noUiSlider.reset();
    $('#diamonds-lw-ratio-slider')[0].noUiSlider.reset();
    $('#diamonds-table-slider')[0].noUiSlider.reset();
    $('#diamonds-depth-slider')[0].noUiSlider.reset();
    $('.diamondfilter').removeClass('slide-active');
    $('.searchinp').val('');
    $('#diamondtype').val('');
    getData();
    //Range change events end
  })
  $(window).scroll(function() {
     var hT = $('#nextpage').offset().top,
         hH = $('#nextpage').outerHeight(),
         wH = $(window).height(),
         wS = $(this).scrollTop();
     if ( wS > (hT+hH-wH) &&  wS < (hT+hH-wH)+100){
         console.log('H1 on the view!');
         var page = $('#nextpage').attr('data-href');
         if(page){
           getData(page);
         }
         
     }
  });
  
  //setTimeout(() => {
      getData();
  //}, 1200);
//});