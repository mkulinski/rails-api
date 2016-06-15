function getData() {
	$.get("/tasks").success( function(data) {
		var htmlString = "";
		
		$.each(data, function(index, task) {
			var liElement = '<li><div class="view"><input class="toggle" type="checkbox"><label>' +
				task.title +
				'</label></div></li>';
				htmlString += liElement;
		});
		var ulTodos = $('.todo-list');
		ulTodos.html(htmlString);
	});
}