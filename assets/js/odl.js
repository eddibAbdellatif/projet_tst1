var plugin;
(function(plugin, $){
    var elements = {
        'family'                    : $('table#data-table tbody tr.famille'),
        'form'                      : $('form.addTrackingNumber'),
        'modal'                     : $('div#changeTrackingNumber'),
        'changeStatus'              : $('form button#odl-expedie'),
        'error'                     : $('div.error-message'),
        'trackingNumber'            : $('input[name="trackingNumber"]'),
        'deliveryDate'              : $('input[name="delivery-date"]'),
        'restockButton'             : $('button#restock-odl'),
        'restockModal'              : $('div#restock-modal'),
        'partiallyAcquittedButton'  : $('button#partially-acquitted'),
        'partiallyAcquittedModal'   : $('div#partially-acquitted-modal'),
        'partiallyAcquittedConfirm' : $('button#confirm-partially-acquitted'),
        'partiallyAcquittedForm'    : $('form#partially-acquitted-form'),
        'quantityReceived'          : $('input.quantity-received'),
        'odl'                       : $('input#odl'),
        'provider'                  : $('input#provider'),
        'changeProviderModal'       : $('div#change-provider'),
        'changerFournisseur'        : $('button#changer-fournisseur'),
        'deliveryForm'              : $('input#delivery-form'),
        'deliveryFormModal'         : $('div#add-delivery-form'),
        'acquittedButton'           : $('button#acquitted-button')
    };

    plugin.create = function(){
        //événement click sur button changer fournisseur
        elements.changerFournisseur.on("click", function(){
            elements.changeProviderModal.modal('show');
        });
        //Gestion du click sur la famille des materiels
        elements.family.on('click', plugin.materialFamily);
        //Gestion du click sur button "changer odl statut" si l'odl est à expédié
        elements.changeStatus.on('click', event, plugin.showModal);
        //Show restock modal
        elements.restockButton.on('click', plugin.showRestockModal);
        //Affichage du modal de confirmation => ODL partiellement acquitte
        //elements.partiallyAcquittedButton.on('click', plugin.showConfirmPartiallyAcquitted);
        elements.partiallyAcquittedForm.on('submit', event, plugin.showConfirmPartiallyAcquitted);
        //partially acquitted odl: click event
        elements.partiallyAcquittedConfirm.on('click', event, plugin.partiallyAcquitted);
        //event click on acquitted button
        elements.acquittedButton.on('click', event, plugin.acquittedShowModal);
        //modal
        $.fn.modal.Constructor.prototype.enforceFocus = function () {};
        //Gestion de l'événement submit du form d'ajout de numero de suivi
        elements.form.on('submit', event, plugin.validateData);
        //Enable datepicker
        elements.deliveryDate.datepicker({
            'startDate': new Date(),
            'format'   : 'yyyy-mm-dd'
        });
    };

    /**
     * Toggle famille materiel
     */
    plugin.materialFamily = function(){
        $("." + $(this).data("id-famille")).toggle();
    };

    /**
     * Fonction appele pour afficher la modal lors de l'expedition de l'odl
     * @param event
     */
    plugin.showModal = function(event){
        event.preventDefault();
        //Suppression message d'erreur
        plugin.clearErrors();
        //On affiche un modal pour ajouter le numéro de suivi et le dépôt
        elements.modal.modal('show');
    };

    /**
     * Fonction appele pour afficher la modal de restock
     */
    plugin.showRestockModal = function(){
        elements.restockModal.modal('show');
    };

    /**
     * Affichage du modal pour confirmation, ODL partiellement acquitte
     */
    plugin.showConfirmPartiallyAcquitted = function(event){
        event.preventDefault();
        plugin.clearErrors();
        elements.partiallyAcquittedModal.modal('show');
    };

    /**
     * Affichage du modal(upload bon livraison) lorsque
     * le button acquitte est clicke
     * @param event
     */
    plugin.acquittedShowModal = function(event){
        event.preventDefault();
        elements.deliveryFormModal.modal('show');
    };

    /**
     * Valider les donnees et faire un requete ajax si l'odl est
     * partiellement acquitte
     */
    plugin.partiallyAcquitted = function(){
        var quantities = [];
        var success    = true;
        $.each(elements.quantityReceived, function(){
            var $this = $(this);
            //Verifier les valeurs des quantites recues
            if ($this.val() < 0 || isNaN(parseFloat($this.val()))) {
                plugin.appendErrors(['Quantités reçues doivent être saisie et non négative.']);
                success = false;
                return false; //break
            }
            if (!elements.deliveryForm[0].files[0]) {
                plugin.appendErrors(['Veuillez uploader le bon de livraison.']);
                success = false;
                return false; //break
            }

            //On rempli notre tableau par les données
            quantities.push(
                {
                    'quantity_received' : $this.val(),
                    'odl_material'      : $this.data('odl-material'),
                    'quantity_expected' : $('td[data-id="'+$this.data('odl-material')+'"]').text(),
                    'material'          : $('input[id="'+$this.data('odl-material')+'"]').val()
                }
            );
        });
        console.log(quantities);
        if (success && quantities.length > 0) {
            var formData = new FormData(elements.partiallyAcquittedForm[0]);
            formData.append('delivery-form', elements.deliveryForm[0].files[0]);
            formData.append('data', JSON.stringify(quantities));
            formData.append('odl', elements.odl.val());
            formData.append('provider', elements.provider.val());
            //{'data': quantities, 'odl': elements.odl.val(), 'provider': elements.provider.val()}
            //make request
            plugin.makeRequest(
                {
                    'action' : elements.partiallyAcquittedConfirm.data('url'),
                    'method' : 'POST',
                    'data'   : formData
                }
            );
        }
    };

    /**
     * Valider les données
     * @param event
     */
    plugin.validateData = function(event){
        var errors = [];
        //Si utilisateur n'a pas saisi le numéro de suivi, on affiche un message d'erreur
        if (!elements.trackingNumber.val()) {
            errors.push('Veuillez saisir le numéro de suivi.<br/>');
        }
        //Si l'utilisateur n'a pas saisi la date de livraison
        if (!elements.deliveryDate.val()) {
            errors.push('Veuillez saisir la date de livraison.');
        }

        if (errors.length > 0) {
            event.preventDefault();
            plugin.appendErrors(errors);
        }
    };

    /**
     * Faire un appel ajax
     * @param data
     */
    plugin.makeRequest = function(data){
        $.ajax({
           url : data.action,
           type: data.method,
           data: data.data,
           processData: false,
           contentType: false,
           success: function(response){
               console.log(response);
               if (response.errors != '') {
                   plugin.appendErrors([response.errors]);
               } else {
                   window.location.href = response.action;
               }
           },
           error: function(){
               plugin.appendErrors(['Une erreur est survenue.']);
           }
        });
    };

    /**
     * Display errors
     * @param errors
     */
    plugin.appendErrors = function(errors){
        //Clear errors
        plugin.clearErrors();
        [].forEach.call(errors, function(el){
            elements.error.append(el);
        });
    };

    /**
     * Remove errors
     */
    plugin.clearErrors = function(){
        elements.error.text('');
    };
    plugin.create();
})(plugin || (plugin = {}), jQuery);