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

      //empty results from previous search if any
      $('.resultsList').empty();
        $('#results').show();

      if(result.results === " "){
        $('#results').text("There are no petitions on that issue at the moment.")
      } else {

        //show results div and add results to list
    		$.each(result.results, function(i, result){
    		
    			$('.resultsList').append('<li><a href = "' + result.url + '" target = "_blank">'+ result.title + '</a></li>');

    		}); //end each
      };

      //clear search field
      $('#tags').val(" ");
      //change search button text back to search
  		$('#search').prop("disabled", false);
  		$('#submit').attr("disabled", false).val("Search");
  	}) //end done function

  
	}); //end submit function


}); //end ready function