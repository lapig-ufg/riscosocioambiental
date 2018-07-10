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
			set_lang(this.lg, true)
		})
		d.li = lg_li
		lg_li.lg = d.lg
	})
}

function set_lang(lg, reload){

	sessionStorage.setItem('lang', lg);

	if(reload){
		document.location.href = 'index.html'
	} else{
		$(lg_bts).each(function(i,d){
			if( d.lg == lg ) $(d.li).addClass('selected')
			else $(d.li).removeClass('selected')
		})

		lang = lg
		console.log('>>> lang: ' + lang)

		for(d in language){
			$('.lg_' + d).html(language[d][lang])
		}

		$(dbody).addClass(lang)
	}

}

var language = {
	terrain:{
		_pt:'TERRENO',
		_en:'TERRAIN'
	},
	hybrid:{
		_pt:'HÍBRIDO',
		_en:'HYBRID'
	},
	satellite:{
		_pt:'SATÉLITE',
		_en:'SATELLITE'
	},
	monochrome:{
		_pt:'MONOCROMÁTICO',
		_en:'MONOCHROME'
	},
	roadmap:{
		_pt:'ESTRADAS',
		_en:'ROADMAP'
	},
	new_layer:{
		_pt:'NOVA CAMADA',
		_en:'NEW LAYER'
	},
	add:{
		_pt:'EXIBIR',
		_en:'ADD'
	},
	remove:{
		_pt:'REMOVER',
		_en:'REMOVE'
	},
	download:{
		_pt:'BAIXAR',
		_en:'DOWNLOAD'
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
	no_data:{
		_pt:'sem dados',
		_en:'no data'
	},
	report:{
		_pt:'RELATÓRIO',
		_en:'REPORT'
	},
	download_report:{
		_pt:'BAIXAR RELATÓRIO (csv)',
		_en:'DOWNLOAD REPORT (csv)'
	},
	about:{
		_pt:'SOBRE',
		_en:'ABOUT'
	},
	layers:{
		_pt:'CAMADAS',
		_en:'LAYERS'
	},
	generate_report:{
		_pt:'GERAR RELATÓRIO',
		_en:'GENERATE REPORT'
	},
	close_report:{
		_pt:'FECHAR RELATÓRIO',
		_en:'CLOSE REPORT'
	},
	all_indicators:{
		_pt:'TODOS OS INDICADORES',
		_en:'ALL INDICATORS'
	},
	selected_indicators:{
		_pt:'INDICADORES SELECIONADOS',
		_en:'SELECTED INDICATORS'
	},
	selected:{
		_pt:'SELECIONADOS',
		_en:'SELECTED'
	},
	remove_all_indicators:{
		_pt:'REMOVER TODOS OS INDICADORES',
		_en:'REMOVE ALL INDICATORS'
	},
	clear_filters:{
		_pt:'REMOVER FILTROS',
		_en:'CLEAR FILTERS'
	},
	clear:{
		_pt:'LIMPAR ',
		_en:'CLEAR'
	},
	search:{
		_pt:'BUSCAR ',
		_en:'SEARCH'
	},
	search_city:{
		_pt:'Buscar município',
		_en:'Search city'
	},
	city_ranking:{
		_pt:'RANKING DE MUNICÍPIOS',
		_en:'CITY RANKING'
	},
	evolution:{
		_pt:'EVOLUÇÃO',
		_en:'EVOLUTION'
	},
	indicators:{
		_pt:'INDICADORES',
		_en:'INDICATORS'
	},
	no_indicators:{
		_pt:'NENHUM INDICADOR SELECIONADO',
		_en:'NO INDICATOR SELECTED'
	},
	sort_msg:{
		_pt:'CLIQUE E ARRASTE PARA REORDENAR AS CAMADAS &darr;',
		_en:'CLICK AND DRAG TO SORT LAYERS &darr;'
	},
	area:{
		_pt:'ÁREA',
		_en:'AREA'
	},
	all:{
		_pt:'TODOS',
		_en:'ALL'
	},
	edit:{
		_pt:'EDITAR',
		_en:'EDIT'
	},
	opacity:{
		_pt:'OPACIDADE',
		_en:'OPACITY'
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
		_pt:'Bem-vindos ao portal Risco Socioambiental. Aqui você poderá identificar potenciais impactos ambientais e sociais ligados à produção agrícola no Brasil.',
		_en:'Lorem ipsum dolor en. Sit amet voluptas venenatis amet sit. Pellentesque ante mus sed tellus suspendisse excepteur vestibulum sed sem vel feugiat. Nulla leo dis odio iaculis venenatis. Tellus quis magna maecenas ligula euismod praesent pariatur diam.'
	},

	// labels lapig

	agricultura:{
		_pt:'AGRICULTURA',
		_en:'AGRICULTURE'
	},
	pecuaria:{
		_pt:'PECUÁRIA',
		_en:'LIVESTOCK'
	},
	economico:{
		_pt:'ECONÔMICO',
		_en:'ECONOMIC'
	},
	social:{
		_pt:'SOCIAL',
		_en:'SOCIAL'
	},
	ambiental:{
		_pt:'AMBIENTAL',
		_en:'AMBIENTAL'
	},
	estado:{
		_pt:'ESTADO',
		_en:'STATE'
	},
	estados:{
		_pt:'ESTADOS',
		_en:'STATES'
	},
	regiao:{
		_pt:'REGIÃO',
		_en:'REGION'
	},
	regioes:{
		_pt:'REGIÕES',
		_en:'REGIONS'
	},
	bacia:{
		_pt:'BACIA HIDROGRÁFICA',
		_en:'WATERSHED'
	},
	bacias:{
		_pt:'BACIAS HIDROGRÁFICAS',
		_en:'WATERSHEDS'
	},
	biomas:{
		_pt:'BIOMAS',
		_en:'BIOMES'
	},
	municipios:{
		_pt:'MUNICÍPIOS',
		_en:'CITIES'
	},
	municipio:{
		_pt:'MUNICÍPIO',
		_en:'CITY'
	},
	bioma:{
		_pt:'BIOMA',
		_en:'BIOME'
	},
	brasil:{
		_pt:'BRASIL',
		_en:'BRAZIL'
	}
}
