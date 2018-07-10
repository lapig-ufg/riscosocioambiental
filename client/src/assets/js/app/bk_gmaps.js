
/*


function initMap() {
	map = L.map('map', {
		zoomControl: false
	})

	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
			 attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	 }).addTo(map);

}


*/

function resize_map(delay){
	// var strech = setInterval(function(){
	// 	google.maps.event.trigger(map, 'resize');
	// }, 2 )
	// setTimeout(function(){
	// 	clearInterval(strech)
	// }, delay)
}


// gmaps
/*
function initMap() {
	console.log('--- map_api');
	map = new google.maps.Map( document.getElementById('map'), {
		center: {lat: -16.0342763, lng: -54.2912296},
		scrollwheel: true,
		zoom: 4,
		panControl:false,
		mapTypeControl:false,
		streetViewControl:false,
		scaleControl: true,
		overviewMapControl:false,
		rotateControl:false,
		zoomControl:false,
  	mapTypeId: google.maps.MapTypeId.TERRAIN,
		scaleControlOptions: {
    	position: google.maps.ControlPosition.BOTTOM_LEFT
 		}
	});

	if(page == 1){

		google.maps.event.addDomListener(map, 'idle', function() {
			map_center = map.getCenter();
		})

		google.maps.event.addDomListener(map, 'resize', function() {
		  map.setCenter(map_center);
		})

		map_types = [
			{ bt:map_terrain, type:google.maps.MapTypeId.TERRAIN },
			{ bt:map_road, type:google.maps.MapTypeId.ROADMAP },
			{ bt:map_satellite, type:google.maps.MapTypeId.SATELLITE }
		]

		google.maps.event.addListener(map, 'dragstart', function() {

		})

		google.maps.event.addListener(map, 'dragend', function() {
			map_center = map.getCenter()
		})

		google.maps.event.addListener(map,'zoom_changed', function ()  {
			map_zoom = map.getZoom()
		})

		// MAP TYPE


		$(map_types).each(function(i,d){
			d.bt.type = d.type
			d.bt.id = i
			$(d.bt).on('click', function(){
				console.log('>>> map_type: ' + this.type);
				map.setMapTypeId(this.type)
				select_map_type(this.id)
			})
		})

		zoom_in.onclick = function(){
			map_zoom ++
			map.setZoom(map_zoom)
		}

		zoom_out.onclick = function(){
			map_zoom --
			map.setZoom(map_zoom)
		}
	}
}

function center_map(){
 	map.setCenter(map_center)
}

function select_map_type(id){
	$(map_types).each(function(i,d){
		if(i == id) $(d.bt).addClass('selected')
		else $(d.bt).removeClass('selected')
	})
}


$(logo_wwf).on('click', function(){
  window.open('http://www.wwf.org.br')
})

$(logo_lapig).on('click', function(){
  window.open('https://www.lapig.iesa.ufg.br/lapig/')
})
*/
