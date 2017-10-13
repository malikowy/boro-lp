// CUSTOM SCRIPTS

$('.vid-clickJS').click(function(e) {
	e.preventDefault();
	var video_link = $(this).attr('data-video');

	$('#_vid_inner').html('');

	var shop = '<iframe src="' + video_link + '" allowfullscreen></iframe>';
	$('#_vid_inner').append(shop);


	var html = document.getElementById("video_modal").innerHTML;
	var modal = tiModal.create(html, {
		events: {
			'click .mfp-close': onCancel
		}
	}).show();
});





$(function() {
	$('a[href*="#"]:not([href="#"])').click(function() {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			var minusOffset = 70;
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: target.offset().top - minusOffset
				}, 1000);
				return false;
			}
		}
	});
});

<!-- MODAL WTB -->

$('.gallery_models_container ul.product-selector li').click(function() {

	var product_code = $(this).attr('data-sku');

	$(this).parent().children().removeClass('active');
	$(this).addClass('active');
	$(this).parent().parent().find(".netflix_btn").attr('data-sku', product_code);
})



$('.netflix_btn').click(function(e) {

	e.preventDefault();

	var modelName = $(this).attr('data-sku');

	$('#_retailers').html('');

	$.ajax({
		url: '//www.samsung.com/pl/data-consumer/online-retailer?mType=json',
		type: 'POST',
		// dataType: 'json',
		cache: false,
		crossDomain: true,
		dataType: 'json',

		data: { modelCode: modelName, iaCode: '07011900' },
		success: function(data) {
			console.log('success');

			var retailers = data.xmlData.buyonline.onlineRetailerList;

			$(retailers).each(function(i, v) {
				if (v.instock == "true") {
					var shop = '<div class="retailer"> \
                     <div class="img"> \
                       <img src="' + v.logoUrl + '" alt="" style="" class=""> \
                     </div> \
                     <div class="link" style="margin-top: 5px"> \
                       <a href="' + v.deeplinkUrl + '" target="_blank" title="Otwórz w nowym oknie" class="button pop-up-wtb-link" data-partner="' + v.name + '" data-sku="' + modelName + '">Sprawdź <span>&gt;</span></a> \
                     </div> \
                   </div>';
					$('#_retailers').append(shop);
				}
			});
			var html = document.getElementById("default-modal").innerHTML;
			var modal = tiModal.create(html, {
				events: {
					'click .mfp-close': onCancel
				}
			}).show();
		},
		error: function(jqXHR, textStatus, errorThrown) {
			$('#_retailers p').html('Błąd serwera.');
			return false;
		}
	});

});

</script>