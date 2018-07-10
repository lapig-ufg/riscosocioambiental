console.log('--- navigation.js');

// menu
var pages = [
	{
		page:'index.html',
		lg: 'home',
		icon: 'home',
		module:'home.js',
		map:true
	},
	{
		page:'map.html',
		lg: 'map',
		icon: 'brasil',
		module:'mapa.js',
		map:true
	},
	{
		page:'report.html',
		lg: 'report',
		icon: 'report',
		module:'report.js',
		map:true
	},
	{
		page:'about.html',
		lg: 'about',
		icon: 'about',
		module:false,
		map:false
	}
]

function load_page_module(){
	// menu
	$(pages).each(function(i,d){
		if(i == page){
			 $(d.li).addClass('selected')
			 if(d.module) require(['js/min/' + d.module])
		}
	})
}

function navigate(id, delay, get){
	var trg = pages[id]
	$(pages).each(function(i,d){
		if(d.li == trg) $(d.li).addClass('selected')
		else $(d.li).removeClass('selected')
	})
	var dest = trg.page
	if(get) dest += '?' + get
	setTimeout( function(){	close_menu()}, delay)
	setTimeout( function(){document.location.href = dest }, delay*4 )
}

var menu = elem('div')
$(menu)
.attr('id','menu')
.addClass('animate2')


// nav bts

menu.open = false
$(dbody).append(menu)

var menu_ul = elem('ul')
$(menu_ul)
.attr('id','menu_ul')
.css({ height: pages.length * 81 })

$(menu).append(menu_ul)

$(pages).each(function(i,d){
	var menu_li = elem('li', { trg:menu_ul })
	$(menu_li)
	.addClass('menu_li')
	.addClass('animate1')
	.html(d.label)
	.on('click', function(){
		if( page == this.id ) close_menu()
		else navigate(this.id, animate1, this.get)
	})

	menu_li.get = d.get
	menu_li.page = d.page
	menu_li.id = i
	d.li = menu_li

	var label = elem('div', {trg:menu_li})
	$(label)
	.addClass('lg_' + d.lg)
	.addClass('menu_lb')

	var icon = elem('div')

	$(icon)
	.addClass('icon')
	.addClass('icon35')
	.addClass('animate1')
	.addClass('icon-' + d.icon )
	$(menu_li).append(icon)
})

// share

var share_pages = [
	{ label: 'FACEBOOK', id: 'fbook' },
	{ label: 'TWITTER', id: 'twitter' }
]

var share_ul = elem('ul', {trg:menu})
$(share_ul)
.attr('id','share_ul')

$(share_pages).each(function(i,d){
	var share_li = elem('div', {id:'share_bt', trg:share_ul})
	$(share_li)
	.addClass('share_li')
	.addClass('animate1')
	.on('click', function(){
		console.log('share ' + this.id);
	})

	share_li.id = d.id

	var icon = elem('div', {trg:share_li})
	$(icon)
	.addClass('icon')
	.addClass('icon25')
	.addClass('animate1')
	.addClass('icon-' + d.id )
})


// close

function reset_screen(){
	$(dbody)
	.removeClass('menu_visible')
	.removeClass('list_visible')
	reload_map(animate4)
}

function open_menu(){
	menu.open = true
	if(layers) layers.open = false
	$(dbody)
	.addClass('menu_visible')
	.removeClass('layers_visible')
	reload_map(animate4)
}

function close_menu(){
	menu.open = false
	$(dbody).removeClass('menu_visible')
	reload_map(animate4)
}

var menu_bt = elem('div', {trg:menu})
$(menu_bt)
.attr('id','menu_bt')
.addClass('animate1')
.on('click',function(){
	if(menu.open) close_menu()
	else open_menu()
})

var icon1 = elem('div', {id:'menu_bt_icon1', trg:menu_bt})
$(icon1)
.addClass('icon25')
.append(icons.menu)

var icon2 = elem('div', {id:'menu_bt_icon2', trg:menu_bt})
$(icon2)
.addClass('icon35')
.append(icons.leftMenu)


// start
console.log('>>> start')

resize()
verifica_scroll()
load_icons()
load_lg_bts()
set_lang(lang)

// load map
if( pages[page].map ){
	var map_script = elem('script',{trg:dhead})
	map_script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAoe50CZwLsxN4iRzBFmtECgl3cQw7c4zg&callback=initMap'
}

// set current_page
load_page_module()
