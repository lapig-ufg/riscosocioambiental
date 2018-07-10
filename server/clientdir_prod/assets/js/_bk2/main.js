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
		if(opt.apd) $(e).append(opt.apd)
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
    return x1;
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

function ajax( url, OBJ, cback, args ){
	// set_preloader()
	$.ajax({
		 url: url,
		 type: "POST",
		 crossDomain: true,
		 dataType: 'json',
		 success: function (response) {

				// OBJ.json = response
				// console.log(OBJ.json); // FUNCIONOU!!!

				OBJ.json = response
				OBJ[cback].apply(null, args)  // NÃO FUNCIONA VIA http://maps.lapig.iesa
				// colcoar JSON.parse!
				// remove_preloader()
		 },
		 error: function (xhr, status) {
				 console.log("error")
		 }
	})
}
//
// $.ajax({
//     	url: "http://maps.lapig.iesa.ufg.br/indicadores/lista",
//     	type: "GET",
//  			crossDomain: true,
//     	dataType: 'json',
//     	success: function(result){
//             console.log(result)
//     	},
//     	error:function(xhr, status){
//      		 console.log("error")
//  		}
//  });



function $_GET () {
	var vars = {}
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
		vars[key] = value
	})
	return vars
}

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

var accents_map = {
	in:["À", "Á", "Â", "Ã", "Ä", "Å", "à", "á", "â", "ã", "ä", "å", "Ò", "Ó", "Ô", "Õ", "Õ", "Ö", "Ø", "ò", "ó", "ô", "õ", "ö", "ø", "È", "É", "Ê", "Ë", "è", "é", "ê", "ë", "ð", "Ç", "ç", "Ð", "Ì", "Í", "Î", "Ï", "ì", "í", "î", "ï", "Ù", "Ú", "Û", "Ü", "ù", "ú", "û", "ü", "Ñ", "ñ", "Š", "š", "Ÿ", "ÿ", "ý", "Ž", "ž"],
	out:["A", "A", "A", "A", "A", "A", "a", "a", "a", "a", "a", "a", "O", "O", "O", "O", "O", "O", "O", "o", "o", "o", "o", "o", "o", "E", "E", "E", "E", "e", "e", "e", "e", "e", "C", "c", "D", "I", "I", "I", "I", "i", "i", "i", "i", "U", "U", "U", "U", "u", "u", "u", "u", "N", "n", "S", "s", "Y", "y", "y", "Z", "z"]
}

function removeAccents(str) {
	str = str.split('')
	var i, x
	for (i = 0; i < str.length; i++) {
		if ((x = accents_map.in.indexOf(str[i])) != -1) {
			str[i] = accents_map.out[x]
		}
	}
	return str.join('')
}

//////////////////////////// map functions

var map
var map_center
var map
var map_type = 0
var map_types = []
var map_layers = [] // recebe os objetos aplicados ao mapa, para eviar erro circular structure


set('zoom_in')
set('zoom_out')
set('map_type')
set('map_type_ul')

$(map_type).on('mouseover', function(){
	$(this).css({height: map_tiles.length * 25 + 20 })
}).on('mouseout', function(){
	$(this).css({height: 45 })
})

function initMap(){

	map = L.map('map', {
		 crs: L.CRS.EPSG900913,
		 zoomControl: false,
		 center: [-14.3186481,-56.0420371],
		 zoom: 5,
		 minZoom:3,
		 maxZoom:15
	 })

 	// zoom
  $(zoom_in).click(function(){
		var c = map.getCenter()
    map.setZoom(map.getZoom() + 1)
		map.setView(c)
		console.log('zoom: ' + map.getZoom());
  })

  $(zoom_out).click(function(){
		var c = map.getCenter()
    map.setZoom(map.getZoom() - 1)
		map.setView(c)
		console.log('zoom: ' + map.getZoom());
  })

	// map.panTo(new L.LatLng(40.737, -73.923));
	// map tiles

	$(map_tiles).each( function(i,d){

		var tile_bt = elem( 'li', {trg: map_type_ul})
		$(tile_bt)
		.addClass('map_type_bt')
		.addClass('animate1')
		.addClass('lg_' + d.label)
		.html(d.source + ': ' + language[d.label][lang])
		.on('click', function(){
			set_tile(this.id)
		})

		tile_bt.id = i
		d.bt = tile_bt

	})

	// default tile
	resize_map(200)
	set_tile(0)

}

// TILES
// http://leaflet-extras.github.io/leaflet-providers/preview/

//Google
var Googleroads = L.gridLayer.googleMutant({
		type: 'roadmap'
});

var GoogleSatellite = L.gridLayer.googleMutant({
		type: 'satellite'
});

var Googlehybrid = L.gridLayer.googleMutant({
		type: 'hybrid'
});

var Googleterrain = L.gridLayer.googleMutant({
		type: 'terrain'
});

//Street e Grayscale
var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
							'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
							'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr}),
		streets  = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: mbAttr});


var map_tiles = [
	{  source:'MAPBOX', label:'monochrome', tile:grayscale },
	{  source:'MAPBOX', label:'terrain', tile:streets },
	{  source:'GOOGLE', label:'terrain', tile:Googleterrain },
	{  source:'GOOGLE', label:'roadmap', tile:Googleroads },
	{  source:'GOOGLE', label:'satellite', tile:GoogleSatellite },
	{  source:'GOOGLE', label:'hybrid', tile:Googlehybrid }
]


function set_tile(id){
	$(map_tiles).each( function(i,d){
		if(i == id){
			$(d.bt).addClass('selected')
			map.addLayer(d.tile)
			d.tile.bringToBack()
		}else{
			$(d.bt).removeClass('selected')
			map.removeLayer(d.tile)
		}
	})
}

function resize_map(delay){
	var strech = setInterval(function(){
		map.invalidateSize()
	}, 2 )
	setTimeout(function(){
		clearInterval(strech)
	}, delay)
}

// google maps

var gmaps_key = 'AIzaSyDOlSqfv8m2kTOq8JuhIiNN8NqKVttRNMA'

var script = document.createElement("script");
script.setAttribute("src",'http://maps.google.com/maps/api/js?key='+gmaps_key+'&v=3&callback=teste_gmaps');
document.getElementsByTagName("head")[0].appendChild(script);

function teste_gmaps(){
	console.log('gmaps v=3.26 loaded!');
}


/*
bk leaflet tiles


	// var imageUrl = 'http://maps.lapig.iesa.ufg.br/ows?LAYERS=area_soja&FORMAT=image%2Fpng&TRANSPARENT=TRUE&VERSION=1.1.1&SERVICE=WMS&REQUEST=GetMap&STYLES=&SRS=EPSG%3A900913&BBOX=-8200300,-3996220,-3190922.915,1013157.085&WIDTH=512&HEIGHT=512&MSFILTER="[ANO]"="2005"',
	//     imageBounds = [[6,-76], [-35,-30]];
	//
	// L.imageOverlay(imageUrl, imageBounds).addTo(map);


var nexrad = L.tileLayer.wms("http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi", {
    layers: 'nexrad-n0r-900913',
    format: 'image/png',
    transparent: true,
    attribution: "Weather data © 2012 IEM Nexrad"
}).addTo(map)

var wmsLayer = L.tileLayer.wms('http://maps.lapig.iesa.ufg.br/ows?LAYERS=desmatamento&FORMAT=image%2Fpng&TRANSPARENT=TRUE&VERSION=1.1.1&SERVICE=WMS&REQUEST=GetMap&STYLES=&SRS=EPSG%3A900913&BBOX=-8200300,-3996220,-3190922.915,1013157.085&WIDTH=512&HEIGHT=512&MSFILTER="[ANO]"="2014"AND"[BIOMA]"="CERRADO"',	{
			layers: 'desmatamento',
			styles: '',
			format:'image/png',
			transparent:true,
			version:'1.1.1',
			crs:null,
			uppercase:false
		}).addTo(map)



// neutro - claro
var CartoDB_Positron = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
	subdomains: 'abcd',
});

// neutro - escuro
var CartoDB_DarkMatter = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
	subdomains: 'abcd',
});

// foto aerea
var Esri_WorldImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

//terreno
var Esri_OceanBasemap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri',
});

var map_tiles = [
	{  label:'terrain', tile:Esri_OceanBasemap, zoom:[false,9] },
	{  label:'satellite', tile:Esri_WorldImagery, zoom:[false,17] },
	{  label:'bright_mono', tile:CartoDB_Positron, zoom:[false,18] },
	{  label:'dark_mono', tile:CartoDB_DarkMatter, zoom:[false,18] }
]
*/
