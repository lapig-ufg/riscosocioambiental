window.onload = function(){

  var saida = document.getElementById('saida');
  var reload = document.getElementById('reload');
  var select = document.getElementById('select');
  var temp;
  saida.innerHTML = null;

  select.onclick = function(){
    saida.select();
    document.execCommand("copy");
  }

  reload.onclick = function(){
    location.reload();
  }

  var files = [
    'icons_wwflapig_25px.svg',
    'icons_wwflapig_15px.svg'
  ];

  var viewBox;

  function load_file(i){
    $.ajax({
      url: files[i],
      dataType: 'xml',
      success: function(data){

        console.log( '>' + files[i] );
        viewBox = $(data).children()[0].attributes.viewBox.nodeValue;
        console.log( 'viewBox: ' + viewBox );

        // populate
        $(data).children().children().each(function(i,node){
          if($(node)[0].localName!= 'title'){ // remove a tag title
            temp = $(node)[0].outerHTML.split('\n').join('');
            temp = temp.split('\"').join('\'');
            temp = temp.split('display=\'none\'').join('');
            temp = temp.split('fill=\'#000000\'').join('fill=\'#ffffff\'');
            temp = temp.split('xmlns=\'http://www.w3.org/2000/svg\'').join(' ');
            temp = temp.split('\t').join('');
            temp = temp.split('  ').join('');
            saida.innerHTML +=  node.id + ': \"<svg viewBox=\'' + viewBox + '\'>' + temp + '</svg>\",\n ';
          }
        });

        i++;
        if ( files[i] ){
          load_file(i);
        }else{
            saida.innerHTML += '}\r\n';
            saida.innerHTML += 'console.log(\'--- icons.js\');';
        }
      }
    });
  }

  // go!
  saida.innerHTML = 'var icons = {\n';
  var i = 0;
  load_file(i);

}
