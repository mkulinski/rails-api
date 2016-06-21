$(function() {

  //grabs a task from the database and adds to in html to the page
  function taskHTML(task) {
    var checkedStatus = task.done ? "checked" : "";
    var liClass = task.done ? "completed" : "";
    var liElement = '<li id="listItem-' + task.id +'" class = "' + liClass + '">' + 
    	'<div class="view"><input class="toggle" type="checkbox"' +
      " data-id='" + task.id + "'" +
      checkedStatus +
      '><label>' +
      task.title +
      '</label></div></li>';

    return liElement;
  }

  //when an item is clicked, it sends that info to the database
  function toggleTask(e) {
   var itemId = $(e.target).data("id");

    var doneValue = Boolean($(e.target).is(':checked'));
    
    $.post("/tasks/" + itemId, {
      _method: "PUT",
      task: {
        done: doneValue
      }
    }).success(function(data) {
    	var LiHtml = taskHTML(data);
    	var $li = $("#listItem-" + data.id);
    	$li.replaceWith(LiHtml);
    	$('.toggle').change(toggleTask);
    });
  }

  $.get("/tasks").success( function( data ) {
    var htmlString = "";

    $.each(data, function(index,  task) {

      htmlString += taskHTML(task);
    });
    var ulTodos = $('.todo-list');
    ulTodos.html(htmlString);

    $('.toggle').change(toggleTask);

  });

  //Allows the user to submit a new task. The new task is then added to the interface.
  $('#new-form').submit(function(event) {
    event.preventDefault();
    var textbox = $('.new-todo');
    var payload = {
      task: {
        title: textbox.val()
      }
    };
    $.post("/tasks", payload).success(function(data) {
      var htmlString = taskHTML(data);
      var ulTodos = $('.todo-list');
      ulTodos.append(htmlString);
      $('.toggle').click(toggleTask);
    });
    textbox.val(''); 
  });

});