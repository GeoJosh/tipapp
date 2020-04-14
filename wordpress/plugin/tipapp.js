function loadTip(element, api_base) {
    jQuery.getJSON((api_base || jQuery(element).data('apiBase')) + '/application', function(data) {
        jQuery(element)
            .next('div.tipapp-display-container')
            .remove();

        jQuery(element)
            .after(' \
                <div class="tipapp-display-container"> \
                    <div class="tipapp-display-first_name">' + data['first_name'] + '</div> \
                    <div class="tipapp-display-employer">' + 'Employee of ' + data['employer'] + '</div> \
                    <div class="tipapp-display-employment_information">' + data['employment_information'] + '</div> \
                    <div class="tipapp-display-venmo_username"> \
                        <a class="button tipapp-action-button" href="https://venmo.com/' + data['venmo_username'] + '"> \
                        <img src="' + tipapp_configuration.logo_url + '"/> \
                        </a> \
                    </div> \
                    <div class="tipapp-disclaimer">Disclaimer: Tip Northshore and Northshore Parent assumes zero liability. This is on the honor system here, and we will not be vetting each person in the database.</div> \
                </div> \
                ')
            .next('div.tipapp-display-container')
            .dialog({
                autoOpen: true,
                modal: true,
                title: 'Send a tip to:',
            });
    });
}

jQuery(document).ready( function() {
    jQuery('.tipapp-action-button-block')
        .click((function(e) {
            loadTip(this);
         }));
})