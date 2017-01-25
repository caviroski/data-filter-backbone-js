/*
 *   @author: igor.caviroski
 *   Backbone, View, Display Profile
 */


App.Views = App.Views || {};

(function () {

    App.Views.DisplayProfile = Backbone.View.extend({

        el: '.displayed-profile-row',

        template: _.template($('#display-profile-template').text()),

        initialize: function() {
            // render the profile on event
            vent.on('displayProfile', this.render.bind(this));
        },

        render: function(e) {

            // render data in the profile template from the clicked profile

            var _model = e.model;

            // empty previous displayed profile
            this.$el.html('');

            var compiled = this.template(_model.toJSON());

            // append the compiled markup to the DOM
            this.$el.append(compiled);

            return this;

        }
    })

})();
