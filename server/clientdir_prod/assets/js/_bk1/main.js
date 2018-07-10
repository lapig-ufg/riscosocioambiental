console.log('--- main.js')

// /////////////////////// VARS  /////////////////////////

var i,a,b,c,d
var json

var win_w, win_h, med_w, med_h

// transitions
var animate1 = 100
var animate2 = 200
var animate3 = 300
var animate4 = 400

var in_out = "easeInOutQuart"
_out = "easeOutQuart"
in_ = "easeInQuart"

var preloader

// /////////////////////// NESTED OBJECTS /////////////////////////

function get (id) {
	return document.getElementById(id)
}

function set (obj) {
	window[obj] = get(obj)
	return window[obj]
}

function elem(type, opt) {
	var e = document.createElement(type)
	if(opt){
		if(opt.cls) $(e).addClass(opt.cls)
		if(opt.id) $(e).attr('id',opt.id)
		if(opt.html) $(e).html(opt.html)
		if(opt.apnd) $(e).append(opt.apnd)
		if(opt.trg) $(opt.trg).append(e)
	}
	return e
}

function call( OBJ, func, args ){
	OBJ[func].apply(null,args)
}

//////////////////////////// objects

var dbody = document.body
var dhead = document.head

set('menu_bt')
set('logo_wwf')
set('logo_lapig')

//////////////////////////// functions


function strip_get(remove){
	var get = document.location.href.split('?')[1]
	var new_get = ''
	if(get){
		var params = get.split('&')
		$(params).each(function(i,d){
			var param = d.split('=')
			var and = i == 0 ? '' : '&'
			if(param[0] != remove ) new_get += and + d
 		})
	}
	return new_get
}

var meses = [ null,
	{ min:'JAN', label:'JANEIRO'},
	{ min:'FEV', label:'FEVEREIRO'},
	{ min:'MAR', label:'MARÇO' },
	{ min:'ABR', label:'ABRIL' },
	{ min:'MAI', label:'MAIO'},
	{ min:'JUN', label:'JUNHO' },
	{ min:'JUL', label:'JULHO' },
	{ min:'AGO', label:'AGOSTO' },
	{ min:'SET', label:'SETEMBRO'},
	{ min:'OUT', label:'OUTUBRO' },
	{ min:'NOV', label:'NOVEMBRO' },
	{ min:'DEZ', label:'DEZEMBRO' }
]

function format_date(dt, format, sep){
	dt = dt + ' 00:00:00'
	switch(format){
		case 'mmyyyy' : return meses[Number($.format.date(dt, 'MM'))].min  + sep +  $.format.date(dt, 'yyyy')
		case 'ddmmyyyy' : return $.format.date(dt, 'dd')  + sep +  $.format.date(dt, 'MM') + sep +  $.format.date(dt, 'yyyy')
	}
}

function format_number(nStr){
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }
    return x1 + x2;
}


//////////////////////////// preloader

function set_preloader(){
	preloader = elem('div', {trg: dbody, id:'preloader', cls: 'animate3'})
	loader = elem('div', {trg: preloader, cls: 'loader'})
	elem('span', {trg: loader})
	elem('span', {trg: loader})
	elem('span', {trg: loader})
	elem('span', {trg: loader})
	elem('span', {trg: loader})
	$(dbody).addClass('preloader_mode')
}

function remove_preloader(){
	$(dbody).removeClass('preloader_mode')
	setTimeout( function(){
		$(preloader).remove()
	}, animate4)
}

//////////////////////////// data functions

function $_GET () {
	var vars = {}
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
		vars[key] = value
	})
	return vars
}

function ajax( url, qr, OBJ, cb, args ){

	set_preloader()
	$.ajax({
		 url: url,
		 type: "POST",
		 crossDomain: true,
	   data:JSON.stringify(qr),
		 dataType: 'text',
		 success: function (response) {
	 			OBJ.json = JSON.parse(response)
				OBJ[cb].apply(null, args)
				remove_preloader()
		 },
		 error: function (xhr, status) {
				 console.log("error")
		 }
	})
}

function ajax_get( url, OBJ, cb, args ){
	$.ajax({
		 url: url,
		 type: "GET",
		 crossDomain: true,
		 dataType: 'text',
		 success: function (response) {
	 			OBJ.json = JSON.parse(response)
				OBJ[cb].apply(null, args)
		 },
		 error: function (xhr, status) {
				 console.log("error" )
		 }
	})
}

//////////////////////////// map functions

var map_center
var map_zoom = 4
var map
var map_type = 0
var map_types = []

function reload_map(delay){
	setTimeout(function(){ google.maps.event.trigger(map, 'resize'); }, delay)
}

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

	if(page != 0){

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

//////////////////////////// generic functions



function sort_on(trg, attr1, attr2, reverse) {
	trg.sort(function(a, b) {
		if (a[attr1] > b[attr1])
		return reverse ? -1 : 1
		if (a[attr1] < b[attr1])
		return reverse ? 1 : -1
		if (a[attr1] == b[attr1]) {
			if (a[attr2] > b[attr2])
			return reverse ? -1 : 1
			if (a[attr2] < b[attr2])
			return reverse ? 1 : -1
		}
	})
}

function scroll_to(para, shift){
	if(para) {
		destino = $(para).offset().top - shift
	}else{
		destino = 0
	}
	$(dbody).stop(true).scrollTo( destino, {duration:animate4, esaing:in_out, axis:'y'});
}

window.onkeydown = function (event) {
	if(event.which == 27){
		console.log('esc')
	}
	if(event.which == 13){
		console.log('enter')

	}
}

window.onscroll = verifica_scroll;

function verifica_scroll(){
	page_y = $(window).scrollTop()

}

window.onresize = resize;

function resize() {
  win_w = $(window).width();
  win_h = $(window).height();
  med_w = win_w / 2;
  med_h = win_h / 2;
}

function load_icons(){
	var sizes = [15,25,35,45,55,65,'_auto']
	$(sizes).each(function(ii,dd){
		$('.icon' + dd).each(function (i, d) {
			icon_id = d.className.split('-')[1]
			$(d).append(icons[icon_id])
		})
	})
}
