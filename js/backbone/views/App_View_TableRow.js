/*
 *   @author: igor.caviroski
 *   Backbone, View, Display Table Row
 */

App.Views = App.Views || {};

(function () {

    App.Views.TableRow = Backbone.View.extend({

        el: '#user-table-body',

        template: _.template($('#user-template').text()),

        events: {
            'click .user-row': 'displayProfile'
        },

        initialize: function() {
            // re-render the view if the model changes
            this.collection.on('add', this.render, this);
            this.collection.on('remove', this.render, this);

            this.render();
        },

        render: function() {

            // remove previous results
            this.$el.html('');

            // set useid's that will be used for click on table row
            for (var i=0; i< this.collection.models.length; i++){
                this.collection.models[i].set({userid:i});
            }

            var collection = this.collection.toJSON();

            for (var j=0; j< collection.length; j++){
                var compiled = this.template(collection[j]);
                // append the compiled markup to the DOM
                this.$el.append(compiled);
            }

            return this;
        },

        displayProfile: function(e) {
            // trigger event that will display the clicked user
            vent.trigger('displayProfile', {model: this.collection.models[$(e.currentTarget).data('userid')]});
        }

    })
})();