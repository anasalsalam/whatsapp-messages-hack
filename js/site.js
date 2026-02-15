(function(root, factory){
  if(typeof module !== 'undefined' && module.exports){
    module.exports = factory();
  } else {
    root.Site = factory();
  }
})(this, function(){
  'use strict';

  function normalizePhone(v){
    return v ? String(v).replace(/[^0-9+]/g, '') : '';
  }

  function buildWhatsAppHref(phone){
    var p = normalizePhone(phone).replace(/^\+/, '');
    return 'https://wa.me/' + p + '?text=' + encodeURIComponent('Hello');
  }

  function hidePreloader(){
    var p = document.querySelector('.preload');
    if(!p) return;
    try{ if(window.jQuery){ $('.preload').fadeOut(); return; } }catch(e){}
    p.style.display = 'none';
  }

  return {
    normalizePhone: normalizePhone,
    buildWhatsAppHref: buildWhatsAppHref,
    hidePreloader: hidePreloader
  };
});
