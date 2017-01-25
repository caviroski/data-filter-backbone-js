/*
 *   @author: igor.caviroski
 *   Backbone, Model, Add New User
 */


App.Models = App.Models || {};

(function () {

    // Adding user validation
    App.Models.AddNewUser = Backbone.Model.extend({
        defaults:{
            userid: 0,
            name: "",
            surname: "",
            age: 0,
            born: ""
        },

        initialize:function() {
            $('.add-user-container .submit').on('click', this.submitUser.bind(this));
        },

        submitUser:function(e) {

            $('.add-user-container .validation-message').text('');

            var _this = this,
                validationPassed = true,
                // get form data
                formFields = $('.add-user-container form').serializeArray(),
                userObj = {};

            $.each(formFields, function(index,obj){

                // remove previous validations
                $('.add-user-container form input[name="'+obj['name']+'"]').removeClass('validation-failed').removeClass('validation-passed');
                // used latter for setting user in collection
                userObj[obj['name']] = obj['value'];

                if (obj['name'] === 'name' || obj['name'] === 'surname' || obj['name'] === 'born') {
                    // validate text
                    if (!_this.validateTextInput(obj['name'], obj['value'])) validationPassed = false;
                } else if (obj['name'] === 'age') {
                    // validate number
                    if (!_this.validateNumberInput(obj['name'], obj['value'])) validationPassed = false;
                }
            });

            if (validationPassed) {
                $('.add-user-container form input').val('')
                    .removeClass('validation-failed')
                    .removeClass('validation-passed');
                Teradata.Users.add(new App.Models.User(userObj));
            } else {
                $('.add-user-container .validation-message').text('All fields are mandatory, only number for age and only space separated words for the other fields.');
            }

        },

        // text validation, only letters and empty spaces
        validateTextInput:function(name, input) {
            if (input !== null &&
                input !== undefined &&
                input !== "" &&
                input.match(/^[a-zA-Z ]*$/g) !== null)
            {
                $('.add-user-container form input[name="'+name+'"]').addClass('validation-passed');
                return true;
            } else {
                $('.add-user-container form input[name="'+name+'"]').addClass('validation-failed');
                return false;
            }
        },

        // numbers validation, only numbers, no empty spaces
        validateNumberInput:function(name, input) {
            if (input !== null &&
                input !== undefined &&
                input !== "" &&
                input.match(/^\d+$/g) !== null)
            {
                $('.add-user-container form input[name="'+name+'"]').addClass('validation-passed');
                return true;
            } else {
                $('.add-user-container form input[name="'+name+'"]').addClass('validation-failed');
                return false;
            }
        }

    });

})();