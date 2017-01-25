/*
 *   @author: igor.caviroski
 *   Backbone, Collection, Users
 */

App.Collections = App.Collections || {};

(function () {

    App.Collections.Users = Backbone.Collection.extend({

        // collection for the User model
        model: App.Models.User

    });

})();