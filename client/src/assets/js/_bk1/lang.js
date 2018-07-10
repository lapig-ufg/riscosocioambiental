console.log('--- lang.js');

var lang = sessionStorage.getItem('lang')
if(lang != '_pt' && lang != '_en') lang = '_pt'

// lb bts
var lg_bts=[
	{ lg:'_pt', label:'PT', id:'lg_pt' },
	{ lg:'_en', label:'EN', id:'lg_en' }
]

function load_lg_bts(){
	var lang_ul = elem('ul', {id:'lang_ul', trg:menu})

	$(lg_bts).each(function(i,d){
		var lg_li = elem('li', {id:d.id, trg:lang_ul})
		$(lg_li)
		.addClass('lg_bt')
		.addClass('animate1')
		.html(d.label)
		.on('click', function(){
			set_lang(this.lg)
		})
		d.li = lg_li
		lg_li.lg = d.lg
	})
}

function set_lang(lg){
	$(lg_bts).each(function(i,d){
		if( d.lg == lg ) $(d.li).addClass('selected')
		else $(d.li).removeClass('selected')
	})

	lang = lg
	console.log('>>> lang: ' + lang)

	for(d in language){
		$('.lg_' + d).html(language[d][lang])
	}

	sessionStorage.setItem('lang', lg);

	//layers
	if(layer_list){
		$(layer_list).each( function(i,d){
			$(d.layer.label1).html( d.lb1[lang] )
			$(d.layer.label2).html( d.lb2[lang] )
		})
	}

}

var language = {
	terrain:{
		_pt:'TERRENO',
		_en:'TERRAIN'
	},
	satellite:{
		_pt:'SATÉLITE',
		_en:'SATELLITE'
	},
	roadmap:{
		_pt:'ESTRADAS',
		_en:'ROADMAP'
	},
	new_layer:{
		_pt:'NOVA CAMADA',
		_en:'NEW LAYER'
	},
	remove_layers:{
		_pt:'REMOVER CAMADAS',
		_en:'REMOVE LAYERS'
	},
	geographic_layers:{
		_pt:'CAMADAS GEOGRÁFICAS',
		_en:'GEOGRAPHIC LAYERS'
	},
	thematic_layers:{
		_pt:'CAMADAS TEMÁTICAS',
		_en:'THEMATIC LAYERS'
	},
	extra_layers:{
		_pt:'CAMADAS COMPLEMENTARES',
		_en:'EXTRA LAYERS'
	},
	cancel:{
		_pt:'CANCELAR',
		_en:'CANCEL'
	},
	back:{
		_pt:'VOLTAR',
		_en:'BACK'
	},
	home:{
		_pt:'INÍCIO',
		_en:'HOME'
	},
	map:{
		_pt:'MAPA',
		_en:'MAP'
	},
	report:{
		_pt:'RELATÓRIO',
		_en:'REPORT'
	},
	about:{
		_pt:'SOBRE',
		_en:'ABOUT'
	},
	layers:{
		_pt:'CAMADAS',
		_en:'LAYERS'
	},
	read_more:{
		_pt:'SAIBA MAIS',
		_en:'READ MORE'
	},
	explore_map:{
		_pt:'EXPLORAR MAPA',
		_en:'EXPLORE MAP'
	},
	intro:{
		_pt:'Lorem ipsum dolor pt. Sit amet voluptas venenatis amet sit. Pellentesque ante mus sed tellus suspendisse excepteur vestibulum sed sem vel feugiat. Nulla leo dis odio iaculis venenatis. Tellus quis magna maecenas ligula euismod praesent pariatur diam.',
		_en:'Lorem ipsum dolor en. Sit amet voluptas venenatis amet sit. Pellentesque ante mus sed tellus suspendisse excepteur vestibulum sed sem vel feugiat. Nulla leo dis odio iaculis venenatis. Tellus quis magna maecenas ligula euismod praesent pariatur diam.'
	}
}
