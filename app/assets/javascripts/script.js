function getData() {
	$.get("/tasks").success( function(data) {
		var htmlString = "";
		
		$.each(data, function(index, task) {
			var checkedStatus = task.done ? "checked" : "";
			var liElement = '<li><div class="view"><input class="toggle" type="checkbox"'+ checkedStatus + '><label>' +
				task.title +
				'</label></div></li>';
				htmlString += liElement;
		});
		var ulTodos = $('.todo-list');
		ulTodos.html(htmlString);
	});
}