function close_data(){data_container.open=!1,$(dbody).removeClass("data_mode")}function open_data(){data_container.open=!0,$(dbody).addClass("data_mode")}function open_floating(e){close_floatings(),$(e).addClass("on"),e.list.open=!0,$(e.list).addClass("open")}function close_floatings(){$(indicators_bt).removeClass("on"),$(areas_bt).removeClass("on"),$(area_filters).removeClass("open"),$(category_filter).removeClass("open"),area_filters.open=!1,category_filter.open=!1,AREA.current_list&&hide_list(AREA.current_list)}function check_filters(){CATEG.id>0||AREA.id>0?$(clear_filters).removeClass("off"):$(clear_filters).addClass("off")}function set_preloader(){$(preloader).show(),$(dbody).addClass("preloader_mode")}function remove_preloader(){$(dbody).removeClass("preloader_mode"),setTimeout(function(){$(preloader).hide()},animate2)}function open_layers(){layers.open=!0,$(dbody).addClass("layers_mode"),resize_map(animate2)}function close_layers(){layers.open=!1,$(dbody).removeClass("layers_mode"),resize_map(animate2)}function close_layer(e){e.open=!1,$(e).removeClass("open")}function open_layer(e){reset_layers(),e.open=!0,$(e).addClass("open")}function create_layer(e){var a=elem("li",{id:"layer_"+e.id,trg:layers_list});$(a).addClass("layer").addClass("animate"),a.open=!1,a.off=!1,a.obj=e,layers_list.prepend(a);var t=elem("div",{trg:a,cls:"layer_top animate1"}),r=elem("div",{trg:t});$(r).addClass("lb1").addClass("animate1").html(e.ano),a.label1=r;var i=elem("div",{trg:t});$(i).addClass("lb2").addClass("animate1").html(e.nome),a.label2=i;var o=elem("div",{trg:t});$(o).addClass("eye").addClass("animate1").addClass("icon15").append(icons.eye).on("click",function(){this.layer.off?(this.layer.off=!1,$(this.layer).removeClass("off"),toggle_layer(this.obj,!0)):(this.layer.off=!0,$(this.layer).addClass("off"),toggle_layer(this.obj,!1),this.layer.open&&close_layer(this.layer))}),o.layer=a,o.obj=e;var n=elem("div",{trg:t});$(n).addClass("arrow").addClass("animate1").addClass("icon15").append(icons.down);var l=elem("div",{trg:t});$(l).addClass("handle").addClass("icon15").append(icons.hamburguer);var s=elem("div",{trg:a});$(s).addClass("layer_content").addClass("animate2"),a.content=s;var c=(elem("div",{trg:s,cls:"fill"}),elem("img",{trg:s}));$(c).attr("src","http://ows.lapig.iesa.ufg.br/ows?EXCEPTIONS=application%2Fvnd.ogc.se_xml&TRANSPARENT=TRUE&VERSION=1.1.1&SERVICE=WMS&REQUEST=GetLegendGraphic&LAYER="+e.id+"&format=image%2Fpng");var d=elem("div",{cls:"op_slider",trg:s}),_=(elem("div",{cls:"op_track",trg:d}),elem("div",{cls:"op_label",trg:d,html:language.opacity[lang]}),elem("div",{cls:"ui-slider-handle",trg:d,html:"100%"}));$(d).slider({value:100,slide:function(e,a){$(_).text(a.value+"%"),a.handle.wms_layer.setOpacity(a.value/100)}});var m=elem("div",{trg:a});$(m).addClass("layer_hit").on("click",function(){this.layer.open?close_layer(this.layer):this.layer.off||open_layer(this.layer)}),m.layer=a;var p='"[ANO]"="'+e.ano+'"',g=L.tileLayer.wms("http://ows.lapig.iesa.ufg.br/ows?",{layers:e.id,format:"image/png",transparent:!0,width:512,height:512,srs:"EPSG:900913",MSFILTER:p,updateWhenIdle:!0});map.addLayer(g),g.obj=e,g.layer=a,map_itens.push(g),g.setZIndex(map_itens.length),$(layers_list).sortable("refresh"),_.wms_layer=g}function remove_layer(e){$(map_itens).each(function(a,t){t.obj==e&&($(t.layer).remove(),t.layer=null,map.removeLayer(t),map_itens.splice(map_itens.indexOf(t),1),t=null)})}function toggle_layer(e,a){$(map_itens).each(function(t,r){r.obj==e&&(a?map.addLayer(r):map.removeLayer(r))})}function search_indicator(e){var a;return $(DATA.list).each(function(t,r){e.region==r.region&&e.regionType==r.regionType&&e.id==r.id&&(a=r)}),a}function set_bounds(e){var a=e.split("[[").join("");a=a.split("]]").join("");var t=a.split("], ["),r=[[],[]];$(t).each(function(e,a){var t=a.split(",");$(t).each(function(a,t){r[e].push(Number(t))})}),map.fitBounds(r)}function normalize_categs(e){var a=[];return $(e).each(function(e,t){a.push(removeAccents(t.toLowerCase()))}),a}function get_area_label(e,a){var t="";if("brasil"==e)t=language.brasil[lang].toUpperCase();else switch(convert_lb(e)){case"Estados":$(AREA.json.Estados).each(function(e,r){a==r.UF&&(t=r.ESTADO)});case"Municipios":case"Biomas":case"Regioes":case"Bacias":}return t}function convert_lb(e){switch(e){case"estado":return"Estados";case"municipio":return"Municipios";case"bioma":return"Biomas";case"regiao":return"Regioes";case"bacia":return"Bacias"}}function indicator_data(e,a,t,r){e.ano=a.reverse(),e.valor=t.reverse(),e.val_id=0,e.area=r,$(e.year).html(null),e.ano.length>1?$(e.year).addClass("plus").html(" | "+e.ano[0]+" (+)"):($(e.year).removeClass("plus"),e.ano[0]&&$(e.year).html(" | "+e.ano[0])),$(e.data_select).html(null),$(e.ano).each(function(a,t){var r=elem("option",{trg:e.data_select,cls:"data_opt"});$(r).html(t).attr("value",a),0==a&&$(r).attr("selected","selected")}),e.valor[0]?(indicator_val=format_number(e.valor[0])+" "+e.unidade,"ha"==e.unidade&&(indicator_val+=" ("+percent(e.valor[0],e.area)+")"),$(e.data).removeClass("no_data").html(indicator_val),e.no_data=!1):($(e.data).addClass("no_data").html(language.no_data[lang]),e.no_data=!0)}function percent(e,a){return(e/a*100).toFixed(2)+"%"}function create_indicator(e){var a=elem("li",{trg:indicators_list,cls:"indicator animate2"});a.open=!1,a.selected=!1,a.id=e.id,a.nome=e.nome,a.descricao=e.descricao,a.categ=normalize_categs(e.categ),a.unidade=e.unidade,a.tipo=e.tipo,DATA.list.push(a);var t=elem("div",{trg:a,cls:"icon check animate1 icon20"});$(t).append(icons.cCheckFull),$(t).on("click",function(){toggle_check_indicator(this.indicator)}),t.indicator=a;var r=elem("div",{trg:a,cls:"hit"});$(r).on("click",function(){toggle_open_indicator(this.indicator)}),r.indicator=a;var i=elem("label",{trg:a,cls:"animate1 title"}),o=(elem("span",{trg:i,html:e.nome}),elem("span",{trg:i}));a.year=o;var n=elem("label",{trg:a,cls:"animate1 data"});a.data=n;var l=elem("div",{trg:a,cls:"icon arrow animate1 icon15"});$(l).append(icons.down);var s=elem("div",{trg:a,cls:"data_box"});a.data_box=s;var c=elem("div",{trg:s,cls:"data_description"});$(c).html(e.descricao);var d=elem("div",{trg:s,cls:"data_box_bts"}),_=elem("select",{trg:d,cls:"data_select animate2"});$(_).attr("tabindex",-1).on("change",function(){var e=$(this).val();this.indicator.val_id=e,indicator_val=format_number(this.indicator.valor[e])+" "+this.indicator.unidade,"ha"==this.indicator.unidade&&(indicator_val+=" ("+percent(this.indicator.valor[e],this.indicator.area)+")"),$(this.indicator.data).html(indicator_val),$(this.indicator.year).html(" | "+a.ano[e]+" (+)")}),_.indicator=a,a.data_select=_;var m=elem("div",{trg:d,cls:"data_select_icon icon15"});$(m).append(icons.down);var p=elem("div",{trg:d,cls:"data_add animate2"});$(p).on("click",function(){toggle_check_indicator(this.indicator)}),p.indicator=a,a.data_add=p;var g=(elem("span",{trg:p,cls:"lb_off lg_add_to_report",html:language.map[lang]}),elem("span",{trg:p,cls:"lb_on lg_remove_from_report",html:language.remove[lang]}),elem("div",{trg:p,cls:"icon icon15 animate2"}));$(g).append(icons.plus);var u=elem("div",{trg:d,id:"data_csv",cls:"data_download animate2",html:".CSV"});$(u).on("click",function(){window.open("/service/indicadores/csv?id="+this.indicator.id)}),u.indicator=a;var h=elem("div",{trg:u,cls:"icon icon25"});$(h).append(icons.download);var v=elem("div",{trg:d,id:"data_shp",cls:"data_download animate2",html:".SHP"});$(v).on("click",function(){window.open("http://ows.lapig.iesa.ufg.br/ows?REQUEST=GetFeature&SERVICE=wfs&VERSION=1.0.0&TYPENAME="+this.indicator.id+"_"+this.indicator.ano[this.indicator.val_id]+"&OUTPUTFORMAT=shape-zip")}),v.indicator=a;var f=elem("div",{trg:v,cls:"icon icon25"});$(f).append(icons.download),indicator_data(a,e.ano,e.valor,e.area_ha)}function toggle_open_indicator(e){e.open?close_indicator(e):(reset_indicators(),open_indicator(e))}function open_indicator(e){e.open=!0,$(e).addClass("open").css({height:130+$(e.data_box).height()})}function close_indicator(e){e.open=!1,$(e).removeClass("open").css({height:""})}function reset_indicators(){$(DATA.list).each(function(e,a){a.open&&close_indicator(a)})}function reset_layers(){$(map_itens).each(function(e,a){close_layer(a.layer)})}function set_indicator(e,a){e.selected=a,a?$(e).addClass("selected"):$(e).removeClass("selected")}function toggle_check_indicator(e){e.selected?(set_indicator(e,!1),blink("out")):(set_indicator(e,!0),blink("in")),update_report(e)}function update_report(e){if(e.selected){var a={id:e.id,nome:e.nome,descricao:e.descricao,anos:e.ano,valores:e.valor,ano:e.ano[e.val_id],valor:e.valor[e.val_id],unidade:e.unidade,ranking:e.ranking};create_layer(a),report.list.push(a)}else $(report.list).each(function(a,t){t.id==e.id&&(remove_layer(t),report.list.splice(a,1),t=null)});check_categ(),console.log("update_report: ",report),sessionStorage.setItem("report",JSON.stringify(report)),count_report(),check_layers()}function create_report(e){console.log(e);var a={titulo:e.nome+" ("+e.unidade+")"},t={descricao:e.descricao};report.csv.push(a),report.csv.push(t),report.csv.push({div:language.evolution[lang].toUpperCase()}),$(e.ano).each(function(a,t){var r={ano:t,val:e.valor[a]};report.csv.push(r)}),report.csv.push({div:" "}),report.csv.push({div:"RANKING"});var r=e.ranking_list.ranking.RKmunicipioBR;if(r){var i={posicao:r.RANKING,municipio:r.MUNICIPIO,uf:r.UF,val:r.VALOR};report.csv.push(i),report.csv.push({div:" "})}$(e.ranking_list.ranking.maior).each(function(e,a){var t={posicao:a.RANKING,municipio:a.MUNICIPIO,uf:a.UF,val:a.VALOR};report.csv.push(t)}),report.csv.push({div:"..."}),$(e.ranking_list.ranking.menor).each(function(e,a){var t={posicao:a.RANKING,municipio:a.MUNICIPIO,uf:a.UF,val:a.VALOR};report.csv.push(t)}),report.csv.push({div:" "});var o=elem("li",{trg:report_ul,cls:"indicator"});o.obj=e;var n=(elem("div",{trg:o,cls:"report_hr",html:"&mdash;"}),elem("div",{trg:o,cls:"header"})),l=elem("div",{trg:n,cls:"title"});e.ano[e.val_id]?$(l).html(e.nome+" | "+e.ano[e.val_id]):$(l).html(e.nome);var s=elem("div",{trg:n,cls:"data"});indicator_val=format_number(e.valor[e.val_id])+" "+e.unidade,"ha"==e.unidade&&(indicator_val+=" ("+percent(e.valor[e.val_id],e.area)+")"),e.valor[e.val_id]?$(s).html(indicator_val):$(s).addClass("no_data").html(language.no_data[lang]);elem("div",{trg:o,cls:"text",html:e.descricao});if(e.ano.length>1){var c=(elem("div",{trg:o,cls:"subtitle",html:language.evolution[lang]}),elem("div",{trg:o,cls:"chart"}));c.max=0,c.itens=[],$(e.ano).each(function(a,t){c.max<e.valor[a]&&(c.max=e.valor[a]);var r=elem("div",{trg:c,cls:"item_bar"}),i=(elem("div",{trg:r,cls:"item_lb",html:t}),elem("div",{trg:r,cls:"bar"}));indicator_val=format_number(e.valor[a])+" "+e.unidade,"ha"==e.unidade&&(indicator_val+=" ("+percent(e.valor[a],e.area)+")");elem("div",{trg:r,cls:"label",html:indicator_val});a==e.val_id&&$(r).addClass("selected"),r.bar=i,r.val=e.valor[a],c.itens.push(r)}),c.max*=1.1,$(c.itens).each(function(e,a){$(a.bar).css({width:a.val/c.max*100+"%"})})}var d=(elem("div",{trg:o,cls:"subtitle",html:language.city_ranking[lang]+" ("+e.ano[e.val_id]+")"}),elem("div",{trg:o,cls:"chart"}));d.itens=[];var _=!1;$(e.ranking_list.ranking.maior).each(function(a,t){var r=!1;report.region==t.COD_MUNICI&&(_=!0,r=!0);var i=rk_item(d,e,t,r);d.itens.push(i)}),rk_div(d);var m=elem("li",{trg:d});if($(e.ranking_list.ranking.menor).each(function(a,t){var r=!1;report.region==t.COD_MUNICI&&(_=!0,r=!0);var i=rk_item(d,e,t,r);d.itens.push(i)}),r&&!_){rk_item(m,e,r,!0);rk_div(m)}report_ul.append(o)}function rk_div(e){var a=elem("div",{trg:e,cls:"item"});elem("div",{trg:a,cls:"item_lb",html:"&mdash;"})}function rk_item(e,a,t,r){var i=elem("div",{trg:e,cls:r?"selected item":"item"}),o=(elem("div",{trg:i,cls:"item_lb",html:t.RANKING+"&deg;"}),elem("div",{trg:i,cls:"label"}));elem("span",{trg:o,html:t.MUNICIPIO+" ("+t.UF+") "}),elem("span",{trg:o,cls:"valor",html:format_number(t.VALOR)+" "+a.unidade});return i}function check_layers(){report.list.length>0?($(msg_layers).hide(),$(msg_report).hide(),$(layers_list).show(),$(sort_layers_msg).show()):($(msg_layers).show(),$(msg_report).show(),$(layers_list).hide(),$(sort_layers_msg).hide())}function blink(e){$(report_bt).addClass("blink "+e),$(layers_bt).addClass("blink "+e),setTimeout(function(){$(report_bt).removeClass("blink "+e),$(layers_bt).removeClass("blink "+e)},animate2)}function close_report(){report_container.open=!1,$(report_container).removeClass("open"),$(report_bt_label).text(language.generate_report[lang])}function generate_report(){if(!report.locked){set_preloader(),"brasil"!=report.regionType?$(report_category).html(language[report.regionType.toLowerCase()][lang]):$(report_category).html(""),$(report_area).html(report.title),report.csv=[],$(report_ul).html(null),report_container.open=!0,$(report_container).addClass("open"),$(report_bt_label).text(language.close_report[lang]),report_rankings=[];var e={};$(DATA.list).each(function(a,t){if(t.selected&&!t.no_data){var r="/service/indicadores/ranking?id="+t.id+"&ano="+t.ano[t.val_id];"Brasil"!=report.region&&(r+="&region="+report.region),"brasil"!=report.regionType&&(r+="&regionType="+report.regionType),console.log(r),e=$.get(r,function(e){t.ranking_list=e}),report_rankings.push(e)}}),defCalls()}}function defCalls(){var e=$.Deferred();return $.when.apply(null,report_rankings).done(function(){$(DATA.list).each(function(e,a){a.selected&&!a.no_data&&create_report(a)}),remove_preloader(),setTimeout(function(){e.resolve()},2e3)}),e.promise()}function check_session_report(){var e=sessionStorage.getItem("report");e&&(report=JSON.parse(e)),report.list.length>0&&($(report.list).each(function(e,a){create_layer(a)}),blink("in"))}function check_indicators_on(){$(report.list).each(function(e,a){$(DATA.list).each(function(e,t){a.id==t.id&&set_indicator(t,!0)})})}function count_report(){$(layers_counter).html(report.list.length),$(report_bt_counter).html(report.list.length)}function create_categ_filter(e,a,t){var r=elem("li",{trg:category_filter_ul});$(r).addClass("filter").addClass("animate1").addClass(t?" selected":"").html(language[a][lang]).on("click",function(){set_categ_filter(this)}),r.ID=e,r.lb=a,CATEG.itens.push(r)}function set_categ_filter(e){CATEG.id=e.ID,CATEG.name=e.lb,$(CATEG.itens).each(function(a,t){a==e.ID?$(t).addClass("selected"):$(t).removeClass("selected")}),check_categ(),$(indicators_bt_lb2).html(language[e.lb][lang]),close_floatings(),check_filters()}function check_categ(){var e=0;$(DATA.list).each(function(a,t){0==CATEG.id?($(t).removeClass("hide"),e++):1==CATEG.id?t.selected?($(t).removeClass("hide"),e++):$(t).addClass("hide"):(console.log(t.categ),t.categ.indexOf(CATEG.name)<0?$(t).addClass("hide"):($(t).removeClass("hide"),e++))}),e>0?$(msg_indicators).hide():$(msg_indicators).show()}function submit_search(e){var a=search.value;if(""!=a){$(search_bt).hide(),$(search_cancel_bt).show(),$(municipios_ul).html(null),console.log("search_for: ",a);var t=removeSpaces(removeAccents(a.toLowerCase()),"-"),r=JSON.search(AREA.municipios,'//list[contains(index,"'+t+'")]');search_results=elem("li",{trg:municipios_ul,id:"search_results"}),$(search_results).html("&raquo; "+r.length+' resultado(s) para "'+a+'"'),$(r).each(function(e,a){area_filter_li(a.uf+" - "+a.nome,municipios_ul,!1,"municipio",a.cod_mu)})}}function reset_search(){$(municipios_ul).html(null),$(search_results).hide(),$(search_cancel_bt).hide(),$(search_bt).show(),search.value="",$(AREA.municipios.list).each(function(e,a){area_filter_li(a.uf+" - "+a.nome,municipios_ul,!1,"municipio",a.cod_mu)})}function hide_list(e){e.trava||($(e).removeClass("show"),e.trava=!0,setTimeout(function(){$(e).hide(),e.trava=!1},animate4)),AREA.current_list=!1}function show_list(e){e.trava||($(e).show(),e.trava=!0,setTimeout(function(){$(e).addClass("show")},10),setTimeout(function(){e.trava=!1},animate4))}function create_area_list(e,a,t){AREA.current_list=!1;var r=elem("div",{trg:area_filters,cls:"floating_list list_container animate2"});$(r).hide(),area_filter_li(language[a.toLowerCase()][lang],e,r,!1,!1);var i=elem("div",{trg:r,cls:"floating_list_back"});i.container=r,i.bt_lb=a,$(i).on("click",function(){hide_list(this.container)}).mouseenter(function(){$(this.label).text(language.back[lang])}).mouseleave(function(){$(this.label).text(language[this.bt_lb.toLowerCase()][lang])});var o=(elem("div",{trg:i,cls:"animate1 icon icon15",apd:icons.left}),elem("label",{trg:i,cls:"animate1",html:language[a.toLowerCase()][lang]}));i.label=o;var n=elem("ul",{trg:r,cls:"floating_list list_content"});switch($(n).css({top:80,paddingTop:20,height:"calc(100% - 80px)"}),a){case"Estados":sort_on(t,"ESTADO",!1,!1),$(t).each(function(e,a){area_filter_li(a.ESTADO,n,!1,"estado",a.UF)});break;case"Municipios":$(n).css({top:80,paddingTop:20,height:"calc(100% - 160px)"}),municipios_ul=n,search_container=r;var l=elem("input",{trg:r,id:"search"});$(l).attr("placeholder",language.search_city[lang]),search_bt=elem("div",{trg:r,id:"search_bt"}),$(search_bt).on("click",function(){submit_search()});var s=(elem("label",{trg:search_bt,cls:"animate1 bt_label",html:language.search[lang]}),elem("div",{trg:search_bt,cls:"icon icon25 animate1 bt_icon"}));$(s).append(icons.lupa),search_cancel_bt=elem("div",{trg:r,id:"search_cancel_bt"}),$(search_cancel_bt).on("click",function(){reset_search()}),$(search_cancel_bt).hide();var s=(elem("label",{trg:search_cancel_bt,cls:"animate1 bt_label",html:language.cancel[lang]}),elem("div",{trg:search_cancel_bt,cls:"icon icon25 animate1 bt_icon"}));$(s).append(icons.x),$(l).on("focus",function(){l.focus=!0}),$(l).on("blur",function(){l.focus=!1});for(var c in t)$(t[c]).each(function(e,a){var t=area_filter_li(c+" - "+a.nome,n,!1,"municipio",a.cod_mu),r={};r.li=t,r.uf=c,r.nome=a.nome,r.cod_mu=a.cod_mu,r.index=removeSpaces(removeAccents(a.nome.toLowerCase()),"-"),AREA.municipios.list.push(r)});break;case"Biomas":sort_on(t,"BIOMA",!1,!1),$(t).each(function(e,a){area_filter_li(a.BIOMA,n,!1,"bioma",a.BIOMA)});break;case"Regioes":sort_on(t,"nome",!1,!1),$(t).each(function(e,a){area_filter_li(a.nome,n,!1,"regiao",a.nome)});break;case"Bacias":}}function area_filter_li(e,a,t,r,i){var o=elem("li",{trg:a});if($(o).addClass("filter").addClass("animate1").html(e).on("click",function(){this.list?call_area_list(this.list):set_area_filter(this)}),t){var n=elem("div",{trg:o,cls:"go icon15"});$(n).append(icons.right)}return o.lb=e,o.list=t,o.regionType=r,o.region=i,AREA.itens.push(o),o.ID=AREA.itens.indexOf(o),o}function call_area_list(e){show_list(e),AREA.current_list=e}function set_area_filter(e){console.log("set_area_filter: "+e.lb+" - "+e.region),set_preloader(),report.locked=!0;var a=e.ID;AREA.id=a,$(AREA.itens).each(function(e,t){e==a?$(t).addClass("selected"):$(t).removeClass("selected")}),$(areas_bt_lb2).html(e.lb),close_floatings(),check_filters();var t="/service/indicadores/lista";if("brasil"!=e.regionType&&(t+="?regionType="+e.regionType),"brasil"!=e.region&&(t+="&region="+e.region),ajax(t,DATA,"update_indicators_data",[e.regionType,e.region]),wms_limits&&map.removeLayer(wms_limits),wms_limits=L.tileLayer.wms("http://ows.lapig.iesa.ufg.br/ows?",{layers:"limits",format:"image/png",transparent:!0,width:512,height:512,srs:"EPSG:900913",MSFILTER:'"[name]"="'+e.region+'"',updateWhenIdle:!0}),map.addLayer(wms_limits),wms_limits.setZIndex(1e3),report.regionType=e.regionType,report.region=e.region,report.title=toTitleCase(e.lb),report.title.indexOf("-")>0){var r=report.title.split(" - ");report.title=toTitleCase(r[1])+" - "+r[0].toUpperCase()}report.title.replace(/\b[a-z]/g,function(e){return e.toUpperCase()})}function toTitleCase(e){return e.replace(/\w\S*/g,function(e){return e.charAt(0).toUpperCase()+e.substr(1).toLowerCase()})}function convert_lang(e){switch(e){case"_pt":return"pt-bt";case"_en":return"en-us"}}console.log("--- module: map.js"),set("data_bt"),set("data_container"),set("indicators_bt"),set("areas_bt"),set("clear_filters"),set("filters"),set("category_filter"),set("area_filters"),set("report_bt"),set("map"),set("map_report"),set("report_ul"),set("tooltip"),set("tooltip_city"),set("tooltip_val"),$(tooltip).hide();var indicator_val,map_itens=[],report_itens=[],report={};report.locked=!0;var utfgrid,bounds;$(dbody).addClass("data_mode preloader_mode"),data_container.open=!0,$(data_bt).on("click",function(){data_container.open?close_data():open_data(),resize_map(animate2)}),$(map).mouseleave(function(){setTimeout(function(){$(tooltip).hide()},100)}),$(indicators_bt).on("click",function(){this.list.open?close_floatings():open_floating(this)}),$(clear_filters).on("click",function(){close_floatings(),set_area_filter(area_brasil),set_categ_filter(CATEG.itens[0])}),$(areas_bt).on("click",function(){this.list.open?close_floatings():open_floating(this)}),indicators_bt.list=category_filter,areas_bt.list=area_filters;var preloader=get("preloader"),mouse_x,mouse_y;$(window).on("mousemove",function(e){e=e||window.event,e=$.event.fix(e),mouse_x=e.pageX,mouse_y=e.pageY,mouse_x>win_w/2?$(tooltip).removeClass().addClass("right").css({left:mouse_x-320,top:mouse_y-20}):$(tooltip).removeClass().addClass("left").css({left:mouse_x+20,top:mouse_y-20})});var layers=elem("div",{trg:dbody});$(layers).attr("id","layers").addClass("l1").addClass("animate2"),layers.open=!1;var layers_bt=elem("div",{trg:map_controls});$(layers_bt).attr("id","layers_bt").addClass("animate1").on("click",function(){open_layers()});var icon1=elem("div",{id:"layers_bt_icon1",trg:layers_bt});$(icon1).addClass("layer_icon").addClass("animate1").addClass("icon25").append(icons.layers);var label=elem("span",{cls:"lg_layers",id:"layers_bt_label",trg:layers_bt,html:language.layers[lang]}),layers_counter=elem("span",{id:"layers_counter",cls:"counter animate1",trg:layers_bt}),layers_top=elem("div",{id:"layers_top",cls:"animate1",trg:layers});$(layers_top).on("click",function(e,a){close_layers()});var icon2=elem("div",{id:"layers_top_icon",cls:"layer_bt_icon",trg:layers_top});$(icon2).addClass("layer_icon").addClass("animate1").addClass("icon25").append(icons.layers);var label2=elem("div",{id:"layers_top_label",trg:layers_top,html:language.layers[lang]}),icon3=elem("div",{id:"layers_top_x",cls:"icon15 layer_bt_icon",trg:layers_top});$(icon3).append(icons.right);var layers_list=elem("ul",{id:"layers_list",cls:"",trg:layers});$(layers_list).sortable({axis:"y",handle:".handle",revert:100,scrollSensitivity:10,scrollSpeed:20,update:function(e,a){var t=$(layers_list).sortable("toArray");$(t).each(function(e,a){var r=get(a);$(map_itens).each(function(a,i){i.obj==r.obj&&i.setZIndex(t.length-e)})})}}).disableSelection();var msg_layers=elem("div",{cls:"no_indicators_msg",trg:layers});$(msg_layers).html(language.no_indicators[lang]);var msg_indicators=elem("li",{cls:"no_indicators_msg",trg:indicators});$(msg_indicators).html(language.no_indicators[lang]);var msg_report=elem("div",{cls:"no_indicators_msg",trg:report_content});$(msg_report).html(language.no_indicators[lang]);var sort_layers_msg=elem("div",{id:"sort_layers_msg",trg:layers});$(sort_layers_msg).html(language.sort_msg[lang]),set("clear_report"),$(clear_report).on("click",function(){$(report_ul).html(null),$(DATA.list).each(function(e,a){a.selected&&toggle_check_indicator(a)}),report.csv=[],close_report()}),set("download_report"),$(download_report).on("click",function(){json2csv(report.csv,"risco_socioambiental_"+report.region,"Risco Socioambiental - "+report.title+" (http://riscosocioambiental.org/)",!1)});var DATA={};set("indicators_list"),DATA.list=[],DATA.categs=["all","selected"],DATA.create_indicators_list=function(){$.each(DATA.json,function(e,a){a.lb=removeAccents(a.nome.toLowerCase())}),sort_on(DATA.json,"lb",!1,!1),$.each(DATA.json,function(e,a){create_indicator(a),$(a.categ).each(function(e,a){var t=removeAccents(a.toLowerCase());DATA.categs.indexOf(t)<0&&DATA.categs.push(t)})}),CATEG.itens=[],$(DATA.categs).each(function(e,a){var t=removeAccents(a.toLowerCase());create_categ_filter(e,t,!1)}),set_categ_filter(CATEG.itens[0]),check_indicators_on()},DATA.update_indicators_data=function(e,a){console.log("update_indicators_data"),$(DATA.list).each(function(e,a){$(DATA.json).each(function(e,t){a.id==t.id&&indicator_data(a,t.ano,t.valor,t.area_ha)})}),set_bounds(DATA.json[0].bbox),report.locked=!1,remove_preloader()},set("report_ul"),set("report_container"),set("report_bt_label"),set("report_category"),set("report_area"),$(report_bt).on("click",function(){report_container.open?close_report():(generate_report(),close_floatings())}),report.csv=[];var report_rankings=[],report={list:[]};set("category_filter"),set("category_filter_ul"),set("indicators_bt_lb2");var CATEG={};CATEG.itens=[],CATEG.id=0,set("area_filters"),set("area_main_list"),set("area_main_ul"),set("areas_bt_lb2");var AREA={};AREA.itens=[],AREA.municipios={},AREA.municipios.list=[],AREA.id=0;var d,m,area_brasil,search_bt,search_cancel_bt,search_results,search_container,municipios_ul;AREA.load_floating_lists=function(){area_brasil=area_filter_li(language.brasil[lang],area_main_ul,!1,"brasil","brasil");for(d in AREA.json){var e=removeAccents(d);create_area_list(area_main_ul,e,AREA.json[d],!0)}var a="/service/indicadores/lista";ajax(a,DATA,"create_indicators_list",[]),set_area_filter(area_brasil)};var results=0;window.onkeydown=function(e){""!=search.value&&search.focus&&(27==e.which&&(search.value=""),13==e.which&&submit_search())};var wms_limits,regions_url="/service/indicadores/regions";ajax(regions_url,AREA,"load_floating_lists",[]),initMap(!0),check_session_report(),count_report(),check_filters(),check_layers(),console.log("session_report: ",report);