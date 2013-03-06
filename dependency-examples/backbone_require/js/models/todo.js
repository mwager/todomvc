define([
	'underscore',
	'backbone'
], function( _, Backbone ) {

	var TodoModel = Backbone.Model.extend({
		// Default attributes for the todo
		// and ensure that each todo created has `title` and `completed` keys.
		defaults: {
			title: '',
			completed: false
		},

		// Toggle the `completed` state of this todo item.
		toggle: function() {
			this.save({
				completed: !this.get('completed')
			});
		},

        // Modelattribute können validiert werden indem die validate()
        // Methode implementiert wird. !void bedeutet validation fails.
        // Rückgabewert ist dann eine Fehlermeldung oder was immer man will.
        // Siehe todo.spec.js
        validate: function(attr) {
            if(attr.title.length <= 0) {
                return 'title cannot be empty';
            }
        }
	});

	return TodoModel;
});
