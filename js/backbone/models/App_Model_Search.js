/*
 *   @author: igor.caviroski
 *   Backbone, Model, Search
 */


App.Models = App.Models || {};

(function () {

    // Search users by birth place
    App.Models.Search = Backbone.Model.extend({
        defaults: {
            id: 0,
            matchedUsers: []
        },

        initialize:function() {
            $('#search-results-table').hide();
            $('.search-container .submit').on('click', this.searchUsers.bind(this));
            $('.search-container input').on('keyup', this.presEnter.bind(this));
        },

        // search on enter pressed for input
        presEnter:function(e){
            if(e.keyCode === 13){
                this.searchUsers();
            }
        },

        searchUsers:function(e) {

            // view should empty previous search results
            vent.trigger('emptySearchResults');

            // hide table
            $('#search-results-table').hide();

            // empty validation message
            $('.search-container .validation-message').text('');

            var renderList = false;
            this.matchedUsers = [];

            // get input value, compare in lowercase
            var inputValue = $('.search-container input[name="search-input"]').val();
            // regex for searching whole words, word begging and end must match (whole word)
            var regEx = '\\b' + inputValue + '\\b';

            if (inputValue === undefined || inputValue === null || inputValue === ""){
                // if no term is entered
                $('.search-container .validation-message').text('Please enter search term.');
            } else {
                for (var i=0; i<Teradata.Users.models.length; i++){
                    var placeOfBirth = Teradata.Users.models[i].get('born');
                    // if match is found
                    if (new RegExp(regEx, "i").test(placeOfBirth)) {
                        renderList = true;
                        this.matchedUsers.push(Teradata.Users.models[i]);
                    }
                }
            }

            // if there is match
            if (renderList) {
                $('#search-results-table').show();
                vent.trigger('displaySearch');
            }

        }
    });

})();