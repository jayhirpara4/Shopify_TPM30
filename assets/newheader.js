
class LocalizationForm extends HTMLElement {
  constructor() {
    super();
    this.elements = {
      input: this.querySelector('input[name="language_code"], input[name="country_code"]'),
      button: this.querySelector('button'),
      panel: this.querySelector('ul'),
    };
    this.elements.button.addEventListener('click', this.openSelector.bind(this));
    this.elements.button.addEventListener('focusout', this.closeSelector.bind(this));
    this.addEventListener('keyup', this.onContainerKeyUp.bind(this));

    this.querySelectorAll('a').forEach(item => item.addEventListener('click', this.onItemClick.bind(this)));
  }

  hidePanel() {
    this.elements.button.setAttribute('aria-expanded', 'false');
    this.elements.panel.setAttribute('hidden', true);
  }

  onContainerKeyUp(event) {
    if (event.code.toUpperCase() !== 'ESCAPE') return;

    this.hidePanel();
    this.elements.button.focus();
  }

  onItemClick(event) {
    event.preventDefault();
    const form = this.querySelector('form');
    this.elements.input.value = event.currentTarget.dataset.value;
    //if (form) form.submit();
    console.log('comes...');
    //form.submit();
    
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
     // some code..
      $('#localization_form_Mobile').submit();
    }else{
      form.submit();
    }
  }

  openSelector() {
    this.elements.button.focus();
    this.elements.panel.toggleAttribute('hidden');
    this.elements.button.setAttribute('aria-expanded', (this.elements.button.getAttribute('aria-expanded') === 'false').toString());
  }

  closeSelector(event) {
    const shouldClose = event.relatedTarget && event.relatedTarget.nodeName === 'BUTTON';
    if (event.relatedTarget === null || shouldClose) {
      //this.hidePanel();
      if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
       // some code..
      }else{
        this.hidePanel();
      }
    }
  }
}
customElements.define('localization-form', LocalizationForm);



$(document).ready(function () {
  const mobile_nav = {
  expand_nav: function () {
    $(".menu-nav__with-dropdown .toggle-icon").on("click", function () {
      $(this).closest(".menu-nav__with-dropdown").toggleClass("active");
      const menu_to_toggle = $(this)
        .closest(".menu-nav__with-dropdown")
        .data("sttitle");
      $(`[data-parent="${menu_to_toggle}"]`).slideToggle();
    });
  },
  open_nav: function () {
    $(".mobile-nav--open").on("click", function () {
      $("body").addClass("show-menu-drawer");
    }),
      $(".popup-overlay").on("click", function () {
        $("body").removeClass("show-menu-drawer");
      });
  },
  };
  const search_bar = {
  open_bar: function () {
    $(".js-search-header").on("click", function () {
      $('#SearchDrawer').css('height','135px');
      $("body").addClass("page_ js-drawer-open js-drawer-open-top prevent-scrolling");
    }),
    $(".search-bar__input").on("input", function () {
      //$('#SearchDrawer').css('height','135px');
      $('#Search').val(this.value).focus();
      $("body").addClass("page_ js-drawer-open js-drawer-open-top prevent-scrolling");
    }),
    $(".js-drawer-close").on("click", function () {
        $('#SearchDrawer').css('height','');
        $('#Search').val('').focus();
        $('.btn--close-search').click();
        $("body").removeClass("page_ js-drawer-open js-drawer-open-top prevent-scrolling");
    });
  },
  };
  mobile_nav.expand_nav(), mobile_nav.open_nav();
  search_bar.open_bar();
});

$('.mobilecountry').on('click',function(e){
  setTimeout(function () {
    var curr = $('#localization_form_Mobile').find('input[name="country_code"]').val();
    if(curr!=''){
       console.log(curr);
      //$('#localization_form_Mobile').submit();
    }
  }, 1500);
});
