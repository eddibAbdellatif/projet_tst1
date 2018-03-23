var plugin;
(function(plugin, $){
    var elements  = {
        'family'          : $("table#listeDevisTable tbody tr.famille"),
        'form'            : $("form#update"),
        'error'           : $("span#message_text"),
        'errorContainer'  : $("div#message_box"),
        'price'           : $("input.price"),
        'totalPrice'      : $("span#total-price"),
        'materialPrice'   : $("span.total")
    };
    plugin.create = function(){
        //Gestion du click sur la famille des materiels
        elements.family.on("click", plugin.materialFamily);
        //Event on submit form
        elements.form.on('submit', event, plugin.validateData);
        //event input on input price
        elements.price.on('input', plugin.changePrice);
    };
    plugin.materialFamily = function () {
        $("." + $(this).data("id-famille")).toggle();
    };
    plugin.validateData = function(e){
        elements.price.each(function(){
            var $price = parseInt($(this).val());
            if (isNaN($price) || $price < 0) {
                e.preventDefault();
                plugin.appendErrors();
            }
        });
    };
    plugin.appendErrors = function(){
        elements.error.html('Veuillez saisir un prix valide.');
        elements.errorContainer.removeClass('hidden');
    };
    plugin.changePrice = function() {
        var $this  = $(this);
        var $price = parseFloat($this.val());
        var $deviseMateriel = $('span.mt-to-'+$this.data('devise-materiel'));
        if (isNaN($price) || $price < 0) {
            $deviseMateriel.text('---');
            elements.totalPrice.text('---');
        } else {
            $deviseMateriel.text($price * parseFloat($('td.mt-qt-'+$this.data('devise-materiel')).text()));
        }
        var total  = 0;
        var length = elements.materialPrice.length;
        var totalPrice = elements.materialPrice.each(function(index){
            var $price = parseFloat($(this).text());
            if (isNaN($price)) {
                return false;
            }
           total += $price;
            //Last iteration => return total
           if (index === (length-1)) {
                return total;
           }
        });
        if (totalPrice) {
            elements.totalPrice.text(total);
        }
    };
    plugin.create();
})(plugin || (plugin = {}), jQuery);