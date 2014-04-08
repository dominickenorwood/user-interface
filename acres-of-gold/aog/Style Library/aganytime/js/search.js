window.search = function()
{
	var selectedItems = [];

	function ui() {
		// wire up buttons
		$('#advanced-search .list a').click(function(e)
		{
			e.preventDefault();
			
			if ( !$(this).hasClass('selected') )
			{
				selectedItems.push( { "text": $(this).text().toLowerCase(), "type": $(this).closest('.list').attr('id') } );
				drawSelectedItems();
			}
			else 
			{
				var text = $(this).text().toLowerCase();
				var find = $('#advanced-search #selected-items .item:contains(' + text + ')').index();
				selectedItems.splice(find, 1);
				drawSelectedItems();
			}
		});

		$('#advanced-search #selected-items').on('click', '.item', function()
		{
			var index = $(this).index();
			selectedItems.splice(index, 1);
			drawSelectedItems();
		});

		$('#advanced-search #add-zip').click(function()
		{
			selectedItems.push( { "text": $('#advanced-search #zip').val(), "type": "zip" } );
			$('#advanced-search #zip').val('');
			drawSelectedItems();
		});

		$('#advanced-search #zip').keyup(function(e)
		{
			if (e.keyCode === 13)
			{
				selectedItems.push( { "text": $('#advanced-search #zip').val(), "type": "zip" } );
				$('#advanced-search #zip').val('');
				drawSelectedItems();
			}
		});

		$('#search-submit').click(function(e)
		{
			e.preventDefault();
			selectedItems.push( { "text": $('.search #keywords').val(), "type": 'keyword' } );
			buildURL();
		});
	}

	// class methods
	function drawSelectedItems()
	{
		$('.search #selected-items').html('');
		$('#advanced-search .list a').removeClass('selected');

		for (x = 0, l = selectedItems.length; x < l; x++)
		{
			$('.search #selected-items').append('<div class="item">' + selectedItems[x].text + '</div>');
			$('#advanced-search .list a').filter(function()
			{
				if ( $(this).text().toLowerCase() === selectedItems[x].text )
				{
					$(this).addClass('selected');
				}
			});
		}
	}

	function buildURL()
	{
		var url = window.location.origin + '/search.html?',
			crops = [],
			keywords = [],
			seasons = [],
			zips = [];

		for ( var x = 0, l = selectedItems.length; x < l; x++ )
		{
			if ( selectedItems[x].type === 'crop' )
			{
				crops.push(selectedItems[x].text);
			}
			else if ( selectedItems[x].type === 'season' )
			{
				seasons.push(selectedItems[x].text);
			}
			else if ( selectedItems[x].type === 'zip' )
			{
				zips.push(selectedItems[x].text);
			}
			else if ( selectedItems[x].type === 'keyword' )
			{
				keywords.push(selectedItems[x].text);
			}
		}

		if ( crops.length > 0 ) { url += '&c=' + crops.toString().replace(/,/g , ";") }
		if ( keywords.length > 0 ) { url += '&k=' + keywords.toString().replace(/,/g , ";") }
		if ( seasons.length > 0 ) { url += '&s=' + seasons.toString().replace(/,/g , ";") }
		if ( zips.length > 0 ) { url += '&z=' + zips.toString().replace(/,/g , ";") }

		window.location.replace(url);
	}

	// go!
	ui();
}