var search;
(function($, search){
    var elements = {
        'datatable'      : $('table.table-search'),
        'tooltip'        : $('[data-toggle="tooltip"]')
    }, table = null;

    var classes = {
        'datatableSearch': '.dataTables_filter input'
    };

    /**
     * Enable the plugin
     */
    search.create = function(){
        //Enable Datateble plugin
        table = elements.datatable.DataTable(
            {
                "autoWidth" : false,
                "responsive": true,
                "ordering"  : false,
                "bPaginate" : false,
                "bInfo"     : false
            }
        );
        //Event search on datatable
        table.on('search.dt', search.showMaterial);
        //Enable the tooltip feature
        elements.tooltip.tooltip();
    };

    /**
     * Fonction qui permet d'afficher les materiels cachés
     * lors de la recherche sur le datatable
     */
    search.showMaterial = function(){
        //Get searched value
        var $value = $(classes.datatableSearch).val(),
            //number of filtered rows
            $length = table.rows( { filter : 'applied'} ).nodes().length,
            //filtred elements
            $nodes  = table.rows( { filter : 'applied'} ).nodes();
        //Si $value est null
        if ($value === "") {
            //Iterate over materials
            for (var j=0; j<$length; j++) {
                var $node = $($nodes[j]);
                if (!$node.hasClass('famille')) {
                    if (!$node.hasClass('aucune_famille')) {
                        //Add style display none
                        $node.css('display', 'none');
                    }
                    //Remove tooltip information
                    $node.removeAttr('title');
                    $node.removeAttr('data-toggle');
                } else {
                    //show material category
                    $node.css('display', 'table-row');
                }
            }
        } else {
            for (var i=0; i<$length; i++) {
                $node = $($nodes[i]);
                if (!$node.hasClass('famille')) {
                    var title = $node.data('category');
                    if ($node.hasClass('aucune_famille')) {
                        title = 'Aucune';
                    }
                    $node.attr('title', 'Famille: '+title);
                    //remove display none to tr
                    $node.css('display', 'table-row');
                    //Add tooltip information
                    $node.attr('data-toggle', 'tooltip');
                } else {
                    //Hide material category
                    $node.css('display', 'none');
                }
            }
        }
    };
    //Enable
    search.create();
})(jQuery, search||(search = {}));