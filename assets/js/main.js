(function($){
    //Gestion du sidebar
    var str      = $('input#active-tree-view').val();
    if (typeof str !== "undefined") {
        var arrayStr = str.split('-');
        var $elt     = $('ul li[data-class="'+arrayStr[0]+'"]');
        $elt.addClass('active');
        $elt.find('ul li[data-class="'+arrayStr[1]+'"]').addClass('active');
    }
})(jQuery);

