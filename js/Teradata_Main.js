/*
 *   @author: igor.caviroski
 *   Main Code for the Site
 */


window.App = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        // Initialize Backbone.js
        Backbone.history.start();

        //Models
        Teradata.User = new App.Models.User();
        Teradata.AddNewUser = new App.Models.AddNewUser();
        Teradata.Search = new App.Models.Search();

        //Collections
        Teradata.Users = new App.Collections.Users;

        //Views
        Teradata.DisplayProfile = new App.Views.DisplayProfile();
        Teradata.SearchView = new App.Views.Search({model:Teradata.Search});
    }
};

window.Teradata = {};
window.vent = _.extend({}, Backbone.Events);

$(document).ready(function () {

    'use strict';
    App.init();

    // get users from json
    $.ajax({type : 'GET',
        dataType : 'json',
        url: 'data/json/users.json',
        success : function(data) {
            $.each(data, function() {
                $.each(this, function(index, obj) {
                    Teradata.Users.add(new App.Models.User(obj));
                });
            });
            Teradata.UsersTableRow = new App.Views.TableRow({collection : Teradata.Users});
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });

});
