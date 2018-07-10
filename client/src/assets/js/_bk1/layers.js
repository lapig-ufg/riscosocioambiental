console.log('--- layers.js');

if( page == 1 ){

var layers = elem('div', {trg:dbody})
$(layers)
.attr('id','layers')
.addClass('l1')
.addClass('animate2')

layers.open = false

var layers_bt = elem('div', {trg:layers})
$(layers_bt)
.attr('id','layers_bt')
.addClass('animate1')
.on('click',function(){
	if(layers.open) close_layers()
	else open_layers()
})

var icon1 = elem('div', {id:'layers_bt_icon1', trg:layers_bt})
$(icon1)
.addClass('layer_icon')
.addClass('icon25')
.append(icons.layers)

var icon2 = elem('div', {id:'layers_bt_icon2', trg:layers_bt})
$(icon2)
.addClass('layer_icon')
.addClass('icon25')
.append(icons.rightMenu)

var label = elem('span', {cls:'lg_layers', id:'layers_bt_label', trg:layers_bt})
var n_layers = elem('span', { id:'n_layers', trg:layers_bt })

// levels

var level1 = elem('div', {id:'level1', cls:'level animate2', trg:layers})
var level2 = elem('div', {id:'level2', cls:'level animate2', trg:layers})
var level3 = elem('div', {id:'level3', cls:'level animate2', trg:layers})
var level4 = elem('div', {id:'level4', cls:'level animate2', trg:layers})

level_lists = []

var layer_types = [
	{label:'geographic_layers'},
	{label:'thematic_layers'},
	{label:'extra_layers'}
]

$(layer_types).each( function(i,d){
	var n = i+1
	var layer_title = elem( 'div', { id:'layers'+ n +'_title', trg:level1 })
	$(layer_title)
	.addClass('layer_title')
	.addClass('lg_' + d.label)
	.html(language[d.label][lang])

	layers['group' + n ] = elem('div', { trg:level1 })

})

// level navigation

var level_nav = [
	{ label: 'geographic_layers',
		list: [
			{ label: 'REGIÕES' },
			{ label: 'ESTADOS' },
			{ label: 'MUNICÍPIOS' },
			{ label: 'BIOMAS' },
			{ label: 'BACIAS HIDROGRÁFICAS' }
		]
	},{
		label: 'thematic_layers',
		list: [
			{ label: 'DESMATAMENTO' },
			{ label: 'AGRICULTURA' },
			{ label: 'PECUÁRIA' },
			{ label: 'ALGODÃO' },
			{ label: 'CANA DE AÇÚCAR ' },
			{ label: 'CONFLITOS DE TERRAS' },
			{ label: 'PRODUÇÃO DE LEITE' },
			{ label: 'SOJA' },
			{ label: 'MILHO' }
		]
	},{
		label: 'extra_layers',
		list: [
			{ label: 'IMAGENS AÉREAS' },
			{ label: 'AGRICULTURA' },
			{ label: 'BIODIVERSIDADE' },
			{ label: 'QUEIMADAS' },
			{ label: 'DESMATAMENTO' },
			{ label: 'GEOPOLÍTICA' },
			{ label: 'INFRAESTRUTURA' },
			{ label: 'USO DA TERRA' },
			{ label: 'PASTAGENS' },
			{ label: 'SOCIAL' },
			{ label: 'VEGETAÇÃO' },
			{ label: 'ÁGUA' }
		]
	}
]

var list = elem('ul', { cls:'list_ul', trg:level2 })

$(level_nav).each(function(i,d){
	create_li( d, list )

	var _list = elem('ul', {cls: 'list_ul', trg:level3})
	_list.id = d.label
	level_lists.push(_list)

	$(d.list).each(function(_i,_d){
		create_li( _d, _list)
	})
})

function call_level( level, label){
	$(layers).addClass('l' + level)
	$(level_lists).each(function(i,d){
		if(d.id != label) $(d).hide()
		else $(d).show()
	})
}

function create_li( d, trg){

	var li = elem('li', {trg:trg})
	$(li)
	.addClass('list_li')
	.addClass('animate1')
	.on('click', function(){
		call_level( this.trg_level, this.label )
	})
	li.id = i
	li.trg_level = 3
	li.label = d.label

	var label = elem('span', { trg:li })
	$(label)
	.addClass('lg_' + d.label)
	.html(d.label.toUpperCase())

	var icon = elem('div', { trg:li })
	$(icon)
	.addClass('icon15')
	.addClass('next')
	.addClass('animate1')
	.css({fill:'#333'})
	.append(icons.right)
}


// level1

var new_layer = elem('div', { trg:level1})
$(new_layer)
.attr('id','new_layer')
.addClass('animate1')
.addClass('layer_section')
.addClass('layer_bt')
.on('click',function(){
	$(layers).addClass('l2')
})

var label = elem('span', { html:language.new_layer[lang], cls:'lg_new_layer', trg:new_layer })

var plus = elem('div', { trg:new_layer })
$(plus)
.addClass('layer_bt_icon')
.addClass('icon25')
.append(icons.plusMini)

var trash = elem('div', { trg:level1})
$(trash)
.attr('id','remove_layers')
.addClass('animate1')
.addClass('layer_section')
.addClass('layer_bt')
.on('click',function(){
	remove_layers()
})

var trash_icon = elem('div', { trg:trash })
$(trash_icon)
.addClass('layer_bt_icon')
.addClass('icon15')
.append(icons.trash)


// level2

var back1 = elem('div', { trg:level2})
$(back1)
.attr('id','back1')
.addClass('back')
.addClass('animate1')
.addClass('layer_section')
.addClass('layer_bt')
.on('click',function(){
	remove_level(2)
})

var label = elem('span', { html:language.back[lang], trg:back1})

var icon = elem('div', { trg:back1 })
$(icon)
.addClass('layer_bt_icon')
.addClass('icon25')
.append(icons.back)

var cancel1 = elem('div', { trg:level2})
$(cancel1)
.attr('id','cancel1')
.addClass('cancel')
.addClass('animate1')
.addClass('layer_section')
.addClass('layer_bt')
.on('click',function(){
	cancel_new_layer()
})

var icon = elem('div', { trg:cancel1 })
$(icon)
.addClass('layer_bt_icon')
.addClass('icon15')
.append(icons.x)

// level3

var back2 = elem('div', { trg:level3})
$(back2)
.attr('id','back1')
.addClass('back')
.addClass('animate1')
.addClass('layer_section')
.addClass('layer_bt')
.on('click',function(){
	remove_level(3)
})

var label = elem('span', { html:language.back[lang], trg:back2})

var icon = elem('div', { trg:back2 })
$(icon)
.addClass('layer_bt_icon')
.addClass('icon25')
.append(icons.back)

var cancel2 = elem('div', { trg:level3})
$(cancel2)
.attr('id','cancel1')
.addClass('cancel')
.addClass('animate1')
.addClass('layer_section')
.addClass('layer_bt')
.on('click',function(){
	cancel_new_layer()
})

var icon = elem('div', { trg:cancel2 })
$(icon)
.addClass('layer_bt_icon')
.addClass('icon25')
.append(icons.xMini)


// FUNCTIONS

function cancel_new_layer(){
	$(layers)
	.removeClass('l2')
	.removeClass('l3')
	.removeClass('l4')
}

function remove_level(n){
	$(layers).removeClass('l' + n)
}


function open_layers(){
	layers.open = true
	menu.open = false
	$(dbody)
	.addClass('layers_visible')
	.removeClass('menu_visible')
	reload_map(animate4)
}

function close_layers(){
	layers.open = false
	$(dbody).removeClass('layers_visible')
	reload_map(animate4)
	setTimeout( function(){
		$(layers)
		.removeClass('l2')
		.removeClass('l3')
	}, animate2)
}

function count_layers(){
	$(n_layers).html( '[' + layer_list.length + ']' )
}

function close_layer(trg){
	trg.open = false
	$(trg).removeClass('open')
	$(trg.content).removeClass('open')
}

function open_layer(trg){
	trg.open = true
	$(trg).addClass('open')
	$(trg.content).addClass('open')
}

function remove_layers(){
	if( confirm( "REMOVER TODAS AS CAMADAS?" )){
		layer_list = []
		$(layers.group1).html('')
		$(layers.group2).html('')
		$(layers.group3).html('')
		count_layers()
	}
}

function create_layer( trg, d ){

	var layer = elem('div', { trg:trg })
	$(layer)
	.addClass('layer')
	.addClass('animate1')
	layer.open = false
	layer.off = false
	d.layer = layer

	var label1 = elem('div', { trg:layer })
	$(label1)
	.addClass('layer_lb1')
	.addClass('animate1')
	.css({color:d.hex} )
	.html(d.lb1[lang])
	layer.label1 = label1

	var label2 = elem('div', { trg:layer })
	$(label2)
	.addClass('layer_lb2')
	.addClass('animate1')
	.css({color:d.hex} )
	.html(d.lb2[lang])
	layer.label2 = label2

	var eye = elem('div', { trg:layer })
	$(eye)
	.css({backgroundColor: d.hex})
	.addClass('eye')
	.addClass('animate1')
	.addClass('icon15')
	.append( icons.eye )
	.on('click', function(){
		if(this.layer.off){
			this.layer.off = false
			$(this.layer).removeClass('off')
		}else{
			this.layer.off = true
			$(this.layer).addClass('off')
			if(this.layer.open){
				close_layer(this.layer)
			}
		}
	})
	eye.layer = layer

	var arrow = elem('div', { trg:layer })
	$(arrow)
	.addClass('arrow')
	.addClass('animate1')
	.css({fill: d.hex})
	.addClass('icon15')
	.append( icons.down )

	var content = elem('div', {trg:trg})
	$(content)
	.addClass('layer_content')
	.addClass('animate1')
	layer.content = content

	var hit = elem('div', { trg:layer })
	$(hit)
	.addClass('layer_hit')
	.on('click', function(){
		if(this.layer.open ){
			close_layer(this.layer)
		}else{
			if(!this.layer.off) open_layer(this.layer)
		}
	})
	hit.layer = layer

	count_layers()

}





//FAKE LAYERS

var layer_list = [
	{
		lb1: {_pt:'BRASIL', _en:'BRASIL en'},
		lb2: {_pt:'LIMITES ESTADUAIS', _en:'LIMITES ESTADUAIS en'},
		hex:'#307f81',
		group:1
	},{
		lb1: {_pt:'BRASIL', _en:'BRASIL en'},
		lb2: {_pt:'PASTAGENS', _en:'PASTAGENS EN'},
		hex:'#fed574',
		group:1
	},{
		lb1: {_pt:'BRASIL', _en:'BRASIL en'},
		lb2: {_pt:'LIMITES ESTADUAIS', _en:'LIMITES ESTADUAIS en'},
		hex:'#307f81',
		group:2
	},{
		lb1: {_pt:'BRASIL', _en:'BRASIL en'},
		lb2: {_pt:'PASTAGENS', _en:'PASTAGENS EN'},
		hex:'#fed574',
		group:2
	},{
		lb1: {_pt:'CAATINGA', _en:'CAATINGA en'},
		lb2: {_pt: 'COLHEITA ANUAL (2014)', _en:'COLHEITA ANUAL (2014) en'},
		hex:'#f6353a',
		group:3
	},{
		lb1: {_pt:'CAATINGA', _en:'CAATINGA en'},
		lb2: {_pt:'DESMATAMENTO', _en:'DESMATAMENTO en'},
		hex:'#a2464a',
		group:3
	},{
		lb1: {_pt:'CACHOEIRINHA - PE', _en:'CACHOEIRINHA - PE en'},
		lb2: {_pt:'ÁREAS DE PROTEÇÃO PERMANENTE - PE', _en:'ÁREAS DE PROTEÇÃO PERMANENTE - PE en'},
		hex:'#f70d1a',
		group:3
	}
]


// start layers


$(layer_list).each( function(i,d){
	create_layer(layers['group' + d.group], d )
})

count_layers()


} // IF PAGE = 1
