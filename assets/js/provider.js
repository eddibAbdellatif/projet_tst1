var plugin;

(function (plugin, $) {
    var elements = {
        'error': $("div#changeReference div.error-message"),
        'modal': $("div#changeReference"),
        'family': $("table#data-table tbody tr.famille"),
        'allMaterialSelect': $("input#select-all-checkbox"),
        'buttonReference': $("td.changeReferenceToggle"),
        'buttonModal': $("div#changeReference button.changeReferenceButton"),
        'reference': $("div#changeReference input#reference"),
        'material': $("div#changeReference input#materiel"),
        'modifierButton': $("#modifierButton")
    };
    plugin.create = function () {
        //Gestion du click sur la famille des materiels
        elements.family.on("click", plugin.materialFamily);
        //Gestion du click sur select all materials
        elements.allMaterialSelect.on("click", plugin.checkAllMaterials);
        //Gestion du click sur modal(changer reference fabriquant)
        elements.buttonReference.on("click", plugin.showModal);
        //Gestion du click sur la button changer reference du modal
        elements.buttonModal.on("click", plugin.changeReference);

        //Evenement focus sur le champ référence
        elements.reference.on('focus', plugin.clearErrors);
        elements.modifierButton.on("click", plugin.modifierFunction);
    };

    plugin.modifierFunction = function () {

        var materielToAdd = [];
        var materielToUpdateQuantite = [];
        var materielToUpdateReference = [];
        var materielToDelete = [];
        var id_agent = $("table").data("id-agent");
        var url = $("table").data("url");

        $($(".liste_fournisseur_materiel")).each(function () {
            var id_materiel = $(this).data("id-materiel");
            var id_agent_materiel = $(this).data("id-agent-materiel");
            var quantite = $(this).val();
            var old_quantite = $(this).data("old-quantite");
            var reference = $("table tbody td[data-materiel='" + id_materiel + "']").text();
            var old_reference = $("table tbody td[data-materiel='" + id_materiel + "']").data("reference-fabriqant");

            if (quantite != old_quantite) {
                if (id_agent_materiel) {
                    var materiel = {
                        'id': id_agent_materiel,
                        'quantite': quantite,
                        'id_agent': id_agent,
                        'id_materiel': id_materiel
                    };
                    materielToUpdateQuantite.push(materiel);
                } else {
                    var materiel = {
                        'id_materiel': id_materiel,
                        'quantite': quantite,
                        'reference': reference,
                        'id_agent': id_agent
                    };
                    materielToAdd.push(materiel);
                }
            }


            if (reference != old_reference) {
                if (id_agent_materiel) {
                    var materiel = {
                        'id': id_agent_materiel,
                        'reference': reference,
                        'id_agent': id_agent,
                        'id_materiel': id_materiel
                    };
                    materielToUpdateReference.push(materiel);
                } else {
                    var materiel = {
                        'id_materiel': id_materiel,
                        'quantite': quantite,
                        'reference': reference,
                        'id_agent': id_agent
                    };
                    materielToAdd.push(materiel);
                }
            }
        })

        var data = {
            "materielToAdd": materielToAdd,
            "materielToUpdateQuantite": materielToUpdateQuantite,
            "materielToUpdateReference": materielToUpdateReference,
            "materielToDelete": materielToDelete
        }

        console.log(data);

        $.ajax({
            type: "POST",
            url: url,
            data: data,
            cache: false,
            success: function (response) {
                console.log(response);
                window.location.reload();
            }
        });
    }

    plugin.materialFamily = function () {
        $("." + $(this).data("id-famille")).toggle();
    };
    plugin.showModal = function () {
        console.log("showModal");
        var $materiel = $(this).data('materiel');
        elements.material.val($materiel);
        elements.reference.val($("table tbody td[data-materiel='" + $materiel + "']").text());
        //Suppression message d'erreur
        plugin.clearErrors();
        elements.modal.modal('show');
    };
    plugin.changeReference = function () {
        console.log("changeReference");
        var $reference = elements.reference.val().trim();
        var $materiel = elements.material.val();
        //Check if the user have set a value
        if ($reference) {
            $("input[data-materiel='" + $materiel + "']").val($reference);
            $("table tbody td[data-materiel='" + $materiel + "']").text($reference);
            //We set the checkbox of materiel checked if not
            $("table tbody input[name='fournisseurMateriels_" + $materiel + "']").prop('checked', true);
            $("table tbody input#" + $materiel).prop('checked', true);
            elements.modal.modal('hide');
        } else {
            //On affiche un message d'erreur
            plugin.appendErrors();
        }
    };

    plugin.checkAllMaterials = function () {
        var $this = $(this);
        if ($this.prop('checked') == true) {
            $('input.' + $this.data('class')).each(function () {
                $(this).prop('checked', true);
            });
        } else {
            $('input.' + $this.data('class')).each(function () {
                $(this).prop('checked', false);
            });
        }
    };
    plugin.appendErrors = function () {
        elements.error.text('Veuillez saisir une valeur.');
    };
    plugin.clearErrors = function () {
        elements.error.text('');
    };

    plugin.create();
})(plugin || (plugin = {}), jQuery);