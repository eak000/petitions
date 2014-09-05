$(document).ready(function() {

	$('form').submit (function(event) {
		event.preventDefault();
		//get search term values
		var searchTags = $('#tags').val();
		//show user search is happening
		$('#search').prop("disabled", true);
  	$('#submit').attr("disabled", true).val("searching....");

  	// AJAX request to API
  	var request = {
  			isSignable: true,
  			title: searchTags,
  			body: searchTags,
  			site: 'whitehouse'
  	};

  	var result = $.ajax({
  		url: 'https://api.whitehouse.gov/v1/petitions.jsonp',
  		data: request,
  		dataType: "jsonp",
  		type: "GET"
  	})
  	.done(function(result) {

  		$.each(result.results, function(i, result){
  			$('#results').show();
  			$('#resultsList').append('<li>'+ result.results.title + '<a href = "' + result.results.url + '"></a></li>');

  		}); //end each

  		$('#search').prop("disabled", false);
  		$('#submit').attr("disabled", false).val("Search");
  	})

  
	}); //end submit function


}); //end ready function