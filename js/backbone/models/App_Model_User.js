/*
 *   @author: igor.caviroski
 *   Backbone, Model, User
 */

App.Models = App.Models || {};

(function () {

    // User model
    App.Models.User = Backbone.Model.extend({
        defaults:{
            userid: 0,
            name: "",
            surname: "",
            age: 0,
            born: ""
        }
    });

})();