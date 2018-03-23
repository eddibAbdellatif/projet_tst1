var plugin;
(function(plugin){
    var elements = {
        'pack'        : $('select#choose-pack'),
        'provider'    : $('select#id_fournisseur'),
        'packNumber'  : $('input#pack-number'),
        'modal'       : $('div#add-ebf'),
        'error'       : $('div.error-message'),
        'form'        : $('form.add-ebf-form')
    };

    plugin.create = function(){
        //click event sur le button ajouter ebf par un pack
        $('button.add-provider-link').on('click', plugin.addEBFByPack);
        //bootstrap hidden event sur la modal
        elements.modal.on("hidden.bs.modal", plugin.addListProviders);
        //Event on submit button(ajouter ebf)
        elements.form.on('submit', event, plugin.validateData);
    };
    plugin.addEBFByPack = function() {
        plugin.clearErrors();
        $('div#add-ebf div.providers').html($('div.select-provider').find('div.list-providers'));
        elements.modal.modal('show');
    };
    plugin.addListProviders = function () {
        $('div.select-provider').html(elements.modal.find('div.list-providers'));
    };
    plugin.validateData = function(e){
        //clear error messages
        plugin.clearErrors();
        var errors      = [];
        var $packNumber = parseFloat(elements.packNumber.val());
        if (!elements.pack.val()) {
            errors.push('Veuillez choisir un pack.<br/>');
        }
        if (!elements.provider.val()) {
            errors.push('Veuillez choisir un fournisseur.<br/>');
        }
        if (isNaN($packNumber) || $packNumber <= 0) {
            errors.push('Veuillez choisir un nombre de pack valide.');
        }

        if (errors.length > 0) {
            e.preventDefault();
            plugin.appendErrors(errors);
        }
    };
    plugin.appendErrors = function(errors){
        errors.forEach(function(element){
            elements.error.append(element);
        });
    };
    plugin.clearErrors = function(){
        elements.error.html('');
    };
    plugin.create();
})(plugin || (plugin = {}));