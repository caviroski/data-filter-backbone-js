/*
 *   @author: igor.caviroski
 *   Backbone, View, Search
 */

App.Views = App.Views || {};

(function () {

    App.Views.Search = Backbone.View.extend({

        el: '.search-profile-row',

        template: _.template($('#search-profile-row-template').text()),

        initialize: function () {
            // re-render the view if the model changes
            vent.on('displaySearch', this.render, this);
            // empty previous search results
            vent.on('emptySearchResults', this.emptySearchResults, this);
        },

        render:function() {

            // empty previous search results
            this.$el.html('');

            var matchedUsersArray = this.model.matchedUsers;

            for (var i=0; i<matchedUsersArray.length; i++){
                var compiled = this.template(matchedUsersArray[i].toJSON());
                // append the compiled markup to the DOM
                this.$el.append(compiled);
            }

            return this;
        },

        emptySearchResults:function() {
            this.$el.html('');
        }

    });
})();