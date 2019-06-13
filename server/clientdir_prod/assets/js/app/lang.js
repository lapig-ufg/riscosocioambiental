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
		_en:'Welcome to the Socioenvironmental Risk portal. Here you can identify potential environmental and social impacts linked to agricultural production in Brazil.'
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
	},

	//layers
	area_plantada_algodao: {
		_pt:'Área Plantada de Algodão',
		_en:'Cotton planted area'
	},
	area_plantada_algodao_description: {
		_pt:'Áreas de plantação de algodão em caroço por municípios do Brasil, por hectares, no período de 2000 a 2015, conforme dados censitários do IBGE.',
		_en:'Cotton planted areas by municipality in Brazil from 2000-2015, per hectare, according to IBGE Census Data. '
	},
	area_plantada_cana: {
		_pt:'Área plantada de cana-de-açúcar',
		_en:'Sugarcane planted area'
	},
	area_plantada_cana_description: {
		_pt:'Áreas de plantação de cana-de-açúcar por municípios do Brasil, por hectares, no período de 2000 a 2015, conforme dados censitários do IBGE.',
		_en:'Sugarcane planted areas by municipality in Brazil from 2000-2015, per hectare, according to IBGE census data.'
	},
	area_plantada_milho: {
		_pt:'Área Plantada de Milho',
		_en:'Corn planted area'
	},
	area_plantada_milho_description: {
		_pt:'Áreas de plantação de Milho em grão por municípios do Brasil, por hectares, no período de 2000 a 2015, conforme dados censitários do IBGE.',
		_en:'Corn planted areas by municipality in Brazil from 2000-2015, per hectare, according to IBGE census data.'
	},
	area_queimada: {
		_pt:'Áreas de queimadas',
		_en:'Areas cleared by burning'
	},
	area_queimada_description: {
		_pt:'Dados de queimadas ocorridos no Brasil, para o período de 2002 à 2015, produzidos a partir de imagens MODIS (MCD45A1).',
		_en:'Areas cleared by burning in Brazil from 2002 to 2015, produced from MODIS images (MCD45A1).'
	},
	area_soja: {
		_pt:'Área Plantada de Soja',
		_en:'Soybean planted area'
	},
	area_soja_description: {
		_pt:'Áreas de plantação de Soja em grão, por hectares, no período de 2000 a 2015, conforme dados censitários do IBGE.',
		_en:'Soybean planted areas per hectare from 2000-2015, according to IBGE census data.'
	},
	areas_embargadas: {
		_pt:'Áreas Embargadas',
		_en:'Restricted areas'
	},
	areas_embargadas_description: {
		_pt:'Áreas que sofrerão sanções administrativas e/ou medidas cautelar, tendo por objetivo propiciar a regeneração do meio ambiente e dar viabilidade à recuperação da área degradada, fonte IBAMA.',
		_en:'Areas regulated by administrative and / or precautionary measures, aiming to facilitate the regeneration of the environment and revitalize the recovery of degraded areas (Source: IBAMA).'
	},
	areas_prioritarias_biodiversidade: {
		_pt:'Áreas prioritárias para conservação da biodiversidade',
		_en:'Priority biodiversity conservation areas'
	},
	areas_prioritarias_biodiversidade_description: {
		_pt:'Revisão de áreas prioritárias para a conservação da biodiversidade, classificadas quanto a importância biológica. Produzido pelo Minitério do Meio Ambiente (MMA)',
		_en:'Review of priority areas for biodiversity conservation, classified according to biological importance. Produced by the Ministry of Environment (Minitério do Meio Ambiente (MMA)).'
	},
	areas_terras_indigenas: {
		_pt:'Áreas de terras indígenas',
		_en:'Indigenous land areas'
	},
	areas_terras_indigenas_description: {
		_pt:'Áreas de terras indígenas brasileiras incluindo situação (regularizada, delimitada, etc), produzidos pela Fundação Nacional do Índio (FUNAI).',
		_en:'Areas of Brazilian indigenous lands including classification (regularized, delimited, etc.), produced by the National Indigenous Foundation (Fundação Nacional do Índio (FUNAI)).'
	},
	armazens: {
		_pt:'Armazéns',
		_en:'Agricultural storage facilities'
	},
	armazens_description: {
		_pt:'Número de armazéns destinados a armazenamento e controle de produção no Brasil. Gerado a partir da compilação de dados da Agrosatélite e da CONAB – Companhia Nacional de Abastecimento, espacializados pelo LAPIG – Laboratório de Processamento de Imagens e Geoporcessamento.',
		_en:"Number of warehouses for the storage and control of agricultural production in Brazil. Generated from data compiled by Agrosatélite and CONAB - National Supply Company, spatialized by the Federal University of Goiás' Image Processing and GIS Lab (Laboratório de Processamento de Imagens e Geoporcessamento (LAPIG))."
	},
	assentamentos_rurais: {
		_pt:'Assentamentos Rurais',
		_en:'Rural settlements'
	},
	assentamentos_rurais_description: {
		_pt:'Localização dos assentamentos rurais, produzido pelo Instituto Nacional de Colonização e Reforma Agrária (INCRA).',
		_en:'Location of rural settlements, produced by the National Institute of Colonization and Agrarian Reform (Instituto Nacional de Colonização e Reforma Agrária (INCRA)).'
	},
	centrais_hidreletricas: {
		_pt:'Centrais hidrelétricas',
		_en:'Hydropower plants'
	},
	centrais_hidreletricas_description: {
		_pt:'Localização de pequenas centrais hidrelétricas, dado produzido pela Agência Nacional de Energia Elétrica (ANEEL).',
		_en:'Location of small hydropower plants, data produced by the National Electric Energy Agency (Agência Nacional de Energia Elétrica (ANEEL)).'
	},
	conflitos_agua_ocorrencias: {
		_pt:'Conflitos por água (n° ocorrências)',
		_en:'Water-related conflicts (number of occurrences)'
	},
	conflitos_agua_ocorrencias_description: {
		_pt:'Número de ocorrências de ações de resistência por município, em geral coletivas, que visam garantir o uso e a preservação das águas, no período de 2006 á 2015, produzidos pela CPT - Comissão Pastoral da Terra - espacializados pelo Lapig.',
		_en:"Number of occurrences of water-related acts of resistence by municipality: in general, collective actions intended to ensure the use and preservation of water, from 2006 to 2015. Produced by Pastoral Land Commission (Comissão Pastoral da Terra, CPT), and spatialized by the Federal University of Goiás' Image Processing and GIS Lab (Laboratório de Processamento de Imagens e Geoporcessamento (LAPIG))."
	},
	conflitos_terras_ocorrencias: {
		_pt:'Conflitos por terra (n° ocorrências)',
		_en:'Land-related conflicts (number of occurrences)'
	},
	conflitos_terras_ocorrencias_description: {
		_pt:'Número de conflitos por município em ações de resistência e enfrentamento pela posse, uso e propriedade da terra e pelo acesso aos recursos naturais, no período de 2010 á 2015, produzidos pela CPT - Comissão Pastoral da Terra - espacializados pelo Lapig.',
		_en:"Number of conflicts per municipality during acts of resistance vying for the possession, use and ownership of land and access to natural resources in the period of 2010 to 2015. Produced by Pastoral Land Commission (Comissão Pastoral da Terra, CPT), and spatialized by the Federal University of Goiás' Image Processing and GIS Lab (Laboratório de Processamento de Imagens e Geoporcessamento (LAPIG))."
	},
	conflitos_terras_pessoas: {
		_pt:'Conflitos por terra (n° pessoas)',
		_en:'Land-related conflicts (number of people involved)'
	},
	conflitos_terras_pessoas_description: {
		_pt:'Número de pessoas envolvidas em conflitos ocorridos por município, em ações de resistência e enfrentamento pela posse, uso e propriedade da terra e pelo acesso aos recursos naturais, no período de 2010 á 2015, produzidos pela CPT - Comissão Pastoral da Terra - espacializados pelo Lapig.',
		_en:"Number of people involved in conflicts during acts of resistance vying for the possession, use and ownership of land and access to natural resources per municipality, in the period of 2010 to 2015. Produced by Pastoral Land Commission (Comissão Pastoral da Terra, CPT), and spatialized by the Federal University of Goiás' Image Processing and GIS Lab (Laboratório de Processamento de Imagens e Geoporcessamento (LAPIG))."
	},
	corpos_agua: {
		_pt:"Corpos d'água",
		_en:'Bodies of water'
	},
	corpos_agua_description: {
		_pt:"Mapeamento dos corpos de água dos biomas: Caatinga (2008/2009), Mata Atlântica (2008/2009), Cerrado (2008/2009/2010), Pampa (2008/2009) e Pantanal (2008/2009) com base no Projeto de Monitoramento do Desmatamento dos Biomas Brasileiros por Satélite (PMDBBS).",
		_en:'Map of bodies of water in each biome: Caatinga (2008/2009), Atlantic Forest (2008/2009), Cerrado (2008/2009/2010), Pampa (2008/2009) and Pantanal (2008/2009). Based on the Project Monitoring Deforestation of Brazilian Biomes by Satellite (Projeto de Monitoramento do Desmatamento dos Biomas Brasileiros por Satélite (PMDBBS)).'
	},
	deficit_app: {
		_pt:'Déficit de APP',
		_en:'Permanent Protection Area Deficit'
	},
	deficit_app_description: {
		_pt:'Dado produzido pelo CSR/UFMG e LAGESA/UFMG com o apoio da Climate and Land Use Alliance, com abrangência territorial para todo Brasil.',
		_en:'Data produced by CSR / UFMG and LAGESA / UFMG, supported by the Climate and Land Use Alliance, with territorial coverage for all Brazil.'
	},
	deficit_hidrico: {
		_pt:'Déficit hídrico',
		_en:'Water deficit'
	},
	deficit_hidrico_description: {
		_pt:'Dados acumulados do ano de 2012 do máximo de água doce disponível para infiltração e escoamento (Blue Water) para as ottobacias de nível 6 localizadas no Brasil, produzidos a partir de imagens do produto MOD16A2 e satélite TRMM.',
		_en:'2012 data of the maximum freshwater available for infiltration and runoff (Blue Water) to level six Pfafstetter basins located in Brazil, produced from images by the MOD16A2 product and the TRMM satellite.'
	},
	deficit_rl: {
		_pt:'Déficit de Reserva Legal',
		_en:'Deficit of legal reserves'
	},
	deficit_rl_description: {
		_pt:'Dado produzido pelo CSR/UFMG e LAGESA/UFMG com o apoio da Climate and Land Use Alliance, com abrangência territorial para todo Brasil.',
		_en:'Data produced by CSR / UFMG and LAGESA / UFMG, supported by the Climate and Land Use Alliance, with territorial coverage for all Brazil.'
	},
	desmatamento: {
		_pt:'Desmatamento',
		_en:'Deforestation'
	},
	desmatamento_description: {
		_pt:'Dados de desmatamentos ocorridos, produzidos a partir de compilação de dados do PRODES(Bioma Amazônia: 2005 - 2016), SIAD(Bioma Cerrado: 2003 - 2016) e SOS Mata Atlântica(Bioma Mata Atlântica: 2011 - 2016).',
		_en:'Deforestation data, compiled from PRODES (Amazon Biome: 2005-2016), SIAD (Cerrado: 2003-2016) and SOS Mata Atlantica (Atlantic Forest Biome: 2011-2016).'
	},
	desmatamento_acumulado: {
		_pt:'Desmatamento Acumulado',
		_en:'Accumulated deforestation (2012-2016)'
	},
	desmatamento_acumulado_description: {
		_pt:'Desmatamento acumulado nos últimos 5 anos (2012 a 2016), nos Biomas Amazônia, Cerrado e Mata atlântica. Utilizando dados do PRODES/INPE para a Amazônia, SIAD/LAPIG para o Cerrado, SOS Mata Atlântica para a Mata Atlântica.',
		_en:"Deforestation in the last five years (2012-2016) in the Amazon, Cerrado and Atlantic Forest biomes. Compiled from Prodes / INPE's data on the Amazon, SIAD / LAPIG (Cerrado), and SOS Mata Atlantica (Atlantic Forest)."
	},
	floresta_plantada: {
		_pt:'Floresta plantada',
		_en:'Replanted forest'
	},
	floresta_plantada_description: {
		_pt:'Dados produzido pela ONG Transparent World com o apoio do WRI, com abrangência territorial para todo o Brasil.',
		_en:'Data produced by the NGO Transparent World with support from WRI, with territorial coverage throughout Brazil.'
	},
	frigorificos: {
		_pt:'Frigoríficos e matadouros',
		_en:'Slaughterhouses and meat processing plants'
	},
	frigorificos_description: {
		_pt:'Dado produzido a partir de informações de Matadouros e/ou Frigoríficos Bovinos do Brasil aptos a exportação, inspecionados visualmente pelo LAPIG.',
		_en:'Data produced from information on slaughterhouses and / or meat processing plants of Brazil able to export, visually inspected by LAPIG.'
	},
	idh: {
		_pt:'Índice de Desenvolvimento Humano',
		_en:'Human Development Index'
	},
	idh_description: {
		_pt:'Índice de Desenvolvimento Humano Municipal, calculado pela média geométrica dos índices das dimensões de Renda, Educação e Longevidade. Esse cálculo foi realizado a partir das informações dos 3 últimos Censos Demográficos do IBGE – 1991, 2000 e 2010 e espacializado pelo LAPIG.',
		_en:'Municipal Human Development Index, calculated by the mean of the indices of the dimensions income, education and longevity. This calculation was based on the information of the last 3 Demographic Censuses conducted by IBGE - 1991, 2000 and 2010 and for spatialized by LAPIG.'
	},
	pastagem: {
		_pt:'Áreas de pastagens',
		_en:'Pasture areas'
	},
	pastagem_description: {
		_pt:'Mapeamento de áreas de pastagem, a partir de compilação de dados TerraClass Amazon; Funcate; PROBIO; Canasat e TNC. A área de pastagem mapeada é de 175.396.874 ha, os mapeamentos que compõem são: Bioma Pantanal - Mapeamento da Bacia do Alto Paraguai para 2014; Bioma Caatinga ( Mapeamento Lapig - Versão 2 2014-2016) - Esse mapeamento classificou as áreas de pasto limpo, pasto sujo e área degradada (solo exposto); Bioma Mata Atlântica (Mapeamento Lapig 2014-2016) - Esse mapeamento classificou as áreas de pasto limpo, pasto sujo e área degradada (solo exposto); Bioma Pampa - Mapeamento realizado pelo IBGE para o estado do Rio Grande do Sul (2012); Bioma Amazônia - Mapeamento TerraClass Amazônia 2014; Bioma Cerrado - Mapeamento TerraClass Cerrado 2013.',
		_en:'Pasture maps. Compiled from TerraClass Amazon data; FUNCATE; PROBIO; Canasat and TNC. The mapped pasture area is 175 396 874 ha, made up of the following maps: Biome Pantanal - Upper Paraguay River Basin Mapping (2014); Caatinga biome (LAPIG Mapping - 2014-2016 Version 2) - This map classifies areas as clean pasture, dirty pasture, and degraded area (above ground); Atlantic Forest (Map LAPIG 2014-2016) - This map classifies areas as clean pasture, dirsty pasture, and degraded area (above ground); Biome Pampa - Mapped by IBGE for the state of Rio Grande do Sul (2012); Amazon Biome - Mapping TerraClass Amazon 2014; Cerrado - Mapping TerraClass Cerrado 2013.'
	},
	pivos_centrais: {
		_pt:'Pivôs centrais',
		_en:'Center pivot irrigation systems'
	},
	pivos_centrais_description: {
		_pt:'Mapeamento realizado pela Embrapa da área irrigada e do número de equipamentos de irrigação por pivô central no Brasil em 2013.',
		_en:'Irrigated area and the pieces of irrigation equipment per center pivot in Brazil in 2013, mapped by Embrapa.'
	},
	producao_algodao_quantidade: {
		_pt:'Produção de Algodão - ton',
		_en:'Cotton production, by ton'
	},
	producao_algodao_quantidade_description: {
		_pt:'Quantidade de algodão em caroço produzido por municípios do brasil, em Toneladas, no período de 2000 a 2015, conforme dados censitários do IBGE.',
		_en:'Quantity of cotton produced by Brazilian municipalities in tons from 2000 to 2015, according to census data from IBGE.'
	},
	producao_cana_quantidade: {
		_pt:'Produção de cana-de-açúcar - ton',
		_en:'Sugarcane production, by ton'
	},
	producao_cana_quantidade_description: {
		_pt:'Quantidade de cana-de-açúcar produzida por municípios do brasil, em Toneladas, no período de 2000 a 2015, conforme dados censitários do IBGE.',
		_en:'Quantity of sugarcane produced by Brazilian municipalities, in tons, from 2000 to 2015, according to census data from IBGE.'
	},
	producao_leite_quantidade: {
		_pt:'Produção de leite - lt',
		_en:'Milk production, by liter'
	},
	producao_leite_quantidade_description: {
		_pt:'Quantidade de leite em litros produzido por municípios do brasil, no período de 2000 a 2015, conforme dados censitários do IBGE.',
		_en:'Amount of milk in liters produced by Brazilian municipalities, from 2000 to 2015, according to census data from IBGE.'
	},
	producao_lenha_quantidade: {
		_pt:'Produção de Lenha - m³',
		_en:'Lumber production, by cubic meter'
	},
	producao_lenha_quantidade_description: {
		_pt:'Quantidade de Lenha produzida por municípios do brasil, em Metros Cúbicos, no período de 2000 a 2015, conforme dados censitários do IBGE.',
		_en:'Lumber produced by Brazilian municipalities in Cubic Meters, from 2000 to 2015, according to census data from IBGE.'
	},
	producao_milho_quantidade: {
		_pt:'Produção de Milho - ton',
		_en:'Corn production, by ton'
	},
	producao_milho_quantidade_description: {
		_pt:'Quantidade de milho em grão produzido por municípios do brasil, em Toneladas, no período de 2000 a 2015, conforme dados censitários do IBGE.',
		_en:'Quantity of corn produced by Brazilian municipalities, in tons, from 2000 to 2015, according to census data from IBGE.'
	},
	producao_soja_quantidade: {
		_pt:'Produção de Soja - ton',
		_en:'Soybean production, by ton'
	},
	producao_soja_quantidade_description: {
		_pt:'Quantidade de soja em grão produzida por municípios do brasil, em Toneladas, no período de 2000 a 2015, conforme dados censitários do IBGE.',
		_en:'Quantity of soy beans produced by Brazilian municipalities, in tons, from 2000 to 2015, according to census data from IBGE.'
	},
	quilombos: {
		_pt:'Quilombos',
		_en:'Quilombos'
	},
	quilombos_description: {
		_pt:'Áreas de Quilombos que possuem titulação de territórios quilombolas, produzido pelo Instituto Nacional de Colonização e Reforma Agrária (INCRA).',
		_en:'Quilombo areas that possess the title of Quilombo Territories, produced by the Instituto Nacional de Colonização e Reforma Agrária (INCRA).'
	},
	rebanho_bovino: {
		_pt:'Rebanho bovino',
		_en:'Cattle herds'
	},
	rebanho_bovino_description: {
		_pt:'Quantidade de bovinos nos municípios brasileiros. Informação produzida pelo Instituto Brasileiro de Geografia e Estatística (IBGE) e espacializada pelo LAPIG.',
		_en:'Quantity of cattle in Brazilian municipalities. Information produced by the Brazilian Institute of Geography and Statistics (Instituto Brasileiro de Geografia e Estatística (IBGE) ) and mapped by LAPIG.'
	},
	terras_indigenas: {
		_pt:'Terras indígenas',
		_en:'Indigenous lands'
	},
	terras_indigenas_description: {
		_pt:'Quantidade de terras indígenas por município do Brasil até o ano de 2015, segundo dados produzidos pela Fundação Nacional do Índio(FUNAI) e espacializados pelo LAPIG.',
		_en:'Amount of indigenous land per municipality of Brazil until 2015, according to data produced by the National Indian Foundation (Fundação Nacional do Índio(FUNAI)) and mapped by LAPIG.'
	},
	trabalho_escravo: {
		_pt:'Trabalho Escravo',
		_en:'Forced labor'
	},
	trabalho_escravo_description: {
		_pt:'Número de pessoas envolvidas por município, em ações de trabalhos forçados, jornada exaustiva ou por sujeitá-lo á condições degradantes de trabalho, no período de 2000/2002 e de 2008 a 2016, produzidos pela Comissão Pastoral da Terra (CPT) e espacializados pelo LAPIG.',
		_en:'Number of people involved by municipality, in forced labor, exhaustive working day or subjected to degrading working conditions from 2000-2002, and from 2008 to 2016. Produced by the Pastoral Land Commission (Comissão Pastoral da Terra (CPT)) and mapped by LAPIG.'
	},
	unidades_conservacao_integral: {
		_pt:'Unidades de Conservação de Proteção Integral',
		_en:'Conservation areas'
	},
	unidades_conservacao_integral_description: {
		_pt:'Localização das unidades de conservação de proteção integral brasileiras, incluindo a Base ao Milionésimo do IBGE de 2014.',
		_en:'Location of conservation areas designated "areas of integral protection," including the 2014 IBGE with 1:1,000,000 cartographic base.'
	},
	vegetacao: {
		_pt:'Cobertura vegetal remanescente',
		_en:'Remaining native vegetation'
	},
	vegetacao_description: {
		_pt:'Compilação de mapeamentos de vegetação nativa organizado pelo LAPIG/UFG.Para o bioma Amazônia considerou-se os dados do TerraClass Amazônia, com referência em 2012. Para o bioma Cerrado utilizou-se os dados TerraClass Cerrado, com referência em 2012. Os dados produzidos pela SOS Mata Atlântica, com referência em 2014, foram utilizados no bioma Mata Atlântica. O Mapeamento da cobertura vegetal da Bacia do Alto Paraguai, com referência em 2014, foi utilizado para o bioma Pantanal. Nos biomas Caatinga e Pampa considerou-se os dados produzidos no âmbito do PMDBBS, com referência em 2008',
		_en:'Compilation of maps showing native vegetation, organized by LAPIG / UFG. Amazon biome data sourced from 2012 TerraClass data. Cerrado data from 2012 TerraClass data. Atlantic Forest data from 2014 SOS Atlantic data. Pantanal data from 2014 mapping of vegetation cover in the Upper Paraguay Basin. Catinga and Pampa data produced by PMDBBS, 2008.'
	}
}
