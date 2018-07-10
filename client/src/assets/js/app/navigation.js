console.log('--- navigation.js');

// menu
var pages = [
	{
		page:'home',
		lg: 'home',
		icon: 'home',
		module:'home.js',
		map:true
	},
	{
		page:'map',
		lg: 'map',
		icon: 'brasil',
		module:'map.js',
		map:true
	},
	{
		page:'about',
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
			 if(d.module) {
				 if(minify) require(['assets/js/min/' + d.module])
				 else require(['assets/js/app/' + d.module])
			 }
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

// top_bar

set('logo_rsa_top')

if(logo_rsa_top){
	$(logo_rsa_top).on('click', function(){
		navigate(0, animate1, '')
	})
}

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

function share_window(url, winWidth, winHeight) {
	var winTop = (screen.height / 2) - (winHeight / 2);
	var winLeft = (screen.width / 2) - (winWidth / 2);
	window.open(url, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
}

var share_url = 'http://riscosocioambiental.org/'
var share_title = {
	_pt:'Risco Socioambiental para Commodities',
	_en:'Environmental & Social Risk for Commodities'
}

var share_pages = [
	{ label: 'FACEBOOK', id: 'fbook', url:'https://www.facebook.com/share.php?u='+share_url+'&title=' + share_title[lang] },
	{ label: 'TWITTER', id: 'twitter', url:'https://twitter.com/intent/tweet?status='+ share_title[lang] + ' ' + share_url }
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
		share_window(this.url, 550, 300)
	})

	share_li.id = d.id
	share_li.url = d.url

	var icon = elem('div', {trg:share_li})
	$(icon)
	.addClass('icon')
	.addClass('icon25')
	.addClass('animate1')
	.addClass('icon-' + d.id )
})


// close

function open_menu(){
	menu.open = true
	$(dbody).addClass('menu_mode')
	resize_map(animate4)
}

function close_menu(){
	menu.open = false
	$(dbody).removeClass('menu_mode')
	resize_map(animate4)
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
.addClass('icon')
.addClass('animate1')
.addClass('icon25')
.append(icons.menu)

var icon2 = elem('div', {id:'menu_bt_icon2', trg:menu_bt})
$(icon2)
.addClass('icon')
.addClass('animate1')
.addClass('icon35')
.append(icons.leftMenu)

// lang

var lang = sessionStorage.getItem('lang') || '_pt'

// start
console.log('>>> start')

resize()
verifica_scroll()
load_icons()
load_lg_bts()
set_lang(lang, false)

// set current_page
load_page_module()
