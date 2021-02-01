# Servidor de Aplicação

Basicamente a plataforma de Risco Socioambiental é dividida em duas partes: o *WebMap Client* e o *Application Server*, conforme descrito anteriormente. O código-fonte para estas duas partes está hospedado no [respositório Github](https://github.com/lapig-ufg/riscosocioambiental) do projeto.


Dentro do repositório do projeto, o código-fonte do *Application Server* está em [src/server](https://github.com/lapig-ufg/riscosocioambiental/tree/master/server). Por ser construído em NodeJS, ao clonar o projeto o usuário deverá navegar até a pasta server e instalar as dependências gerenciadas pelo [Node Package Manager (NPM)](https://www.npmjs.com/) através do comando:

```
npm install
```

Em seguida, deve-se copiar o arquivo .env.exemple renomeando-o para .env:

```
cp .env.exemple .env
```

Em seguida, deve-se alterar o arquivo .env com as devidas configurações e parâmetros referentes ao banco de dados, pastas para armazenamento dos arquivos de Upload e Download e endereço de hospedagem do OWS Server. 
<!-- Um exemplo de arquivo .env pode ser observado na [seção](/02-arq_execucao_dpat/#execucao-da-aplicacao-cerrado-dpat) -->

Por fim, a fim de facilitar a execução do *Application Server* foi desenvolvido um script nomeado `start.sh` localizado na raiz da pasta **src/server**. Portanto, basta realizar a execução deste arquivo para inicializar o *Application Server*. A fim de identificar modificações em tempo real, o *Application Server* faz uso da biblioteca [`always`](https://www.npmjs.com/package/always), portanto talvez seja necessário a instalação da mesma através do comando.

``` sh
$ sudo npm install always -g
```

Após a instalação do *always*, pode-se inicializar o *Application Server* através do comando:

``` sh
$ ./src/server/start.sh
```



## Manipulação do banco de dados

O caminho da pasta onde está localizado o banco de dados `indicadores.sqlite` deve ser informado corretamente no arquivo de configuração .env nas seguintes variáveis: `INDICADORES_DB` para o banco de dados ambiente de desenvolvimento e `INDICADORES_DB_PROD` para o banco de dados do ambiente de produção. Caso o caminho não esteja correto, a aplicação pode não funcionar corretamente.

## Como criar um novo serviço

 -
 O *Application Server* possui duas pastas que armazenam os principais arquivos que permitem a disponibilização de um novo serviço ao Risco Socioambiental: 

1. **Controller:**: Os arquivos nesta pasta são responsáveis por processar implementar a lógica da tarefa passada pela requisição HTTP.
2.  **Routes**: Os arquivos desta pasta são os responsáveis por criar as URLs de acesso *(endpoint)* a um serviço, apontar qual o controlador deverá processar a lógica para a requisição.

Portanto, a seguir vamos mostrar um exemplo do serviço real da plataforma, que trás a lista completa dos dados e seus indicadores.

    server/routes/indicadores.js
``` js
module.exports = function (app) {

  var indicadores = app.controllers.indicadores;

	app.get('/service/indicadores/lista', indicadores.lista);

}
```
Após a criação do *endpoint* de acesso, basta criar o controlador `indicadores.js` para receber a requisição, realizar a chamada ao método para execução da *query*, coletar o resultado e enviar como resposta da requisição.

    server/controllers/indicadores.js
``` js
module.exports = function (app) {

    const config = app.config;
    
    var Indicadores = {};
    
    Consults.getIndicadoresDb = function(callback) {
        var indicadoresDb = new sqlite3.Database(config.indicadoresDb);
        indicadoresDb.spatialite(function() {
                callback(indicadoresDb);
        });
    }

	Indicadores.lista = function(request, response, next) {
            var metadata = Indicadores['metadata'];
            var infoBbox = Indicadores.infoBbox;
            var bbox = "[[-33.752414, -73.794489], [5.047586, -35.117489]]";
            var result = [];
            var aux;

            var regionType = request.param('regionType', '');
            var region = request.param('region', '');
            var filter = '';

            infoBbox.forEach(function(info){
                if(regionType != "municipio"){
                    if(region == info[0]){
                        bbox = "[["+info[1]+"], ["+info[2]+"]]";
                    }
                }
            });

            var interate =  function(metadata, next){

                    var fieldResult = {
                            "id": metadata.id,
                            "categ": metadata.categ,
                            "nome": metadata.nome,
                            "descricao": metadata.descricao,
                            "unidade": metadata.unidade,
                            "regiao":metadata.regiao,
                            "area_ha":metadata.area_ha,
                            "valor": metadata.valor,
                            "ano": metadata.ano,
                            "tipo": metadata.tipo,
                            "bbox": bbox
                    };
                    
                    if (regionType){
                            filter = Indicadores.getRegionFilter(regionType, region, metadata.DB.Columm);
                            fieldResult['regiao'] = region;
                    }else{
                            fieldResult['regiao'] = 'Brasil';
                    };

                    var sql = Indicadores.getQuerySql(metadata.DB.Columm, metadata.DB.Table, filter, metadata.DB.Group);
                    var sql2 = 'SELECT sum(POL_HA) as AREA_REG FROM "regions" '+filter;
                    
                    Consults.getIndicadoresDb(function(indicadoresDb){
                            indicadoresDb.all(sql, function(err, rows){
                                if(regionType == 'municipio' && rows[0])
                                        fieldResult['bbox'] = "[["+rows[0].bboxleaflet+"]]";
                                
                                metadata.DB.process(rows, fieldResult);
                                    indicadoresDb.all(sql2, function(err, rows){
                                        fieldResult['area_ha'] = rows[0].AREA_REG;
                                        result.push(fieldResult)
                                        next();
                                    });
                            });
                    });
            }

            var finalize = function (){
                result.sort(function(a,b) {
                    if(a.id < b.id) return -1;
                    if(a.id > b.id) return 1;
                    return 0;
                })
                    request.finalizeResult = result
                    next();
            }

            async.each(metadata, interate, finalize);
    };
    
    return Indicadores;
}
```

Por fim, este por se tratar de uma requisição HTTP do tipo `GET`, a mesma poderá ser acessada via navegador. Considerando que o server está executando em `localhost:3000` e o usuário deseja obter a lista de dados e seus indicadores, a URL de acesso ficará da seguinte forma: 

``` url
http://localhost:3000/service/indicadores/lista
```

A visualização do JSON resultado da requisição acima pode ser observado no [link](http://socioambiental.lapig.iesa.ufg.br/service/indicadores/lista).

Além de requisitar pelo navegador, o serviço também poderá ser requisitado pelo *WebMap Client* a fim de disponibilizar este dado na plataforma Risco Socioambiental:


    client/src/assets/js/app/map.js
``` js

	var url = '/service/indicadores/lista'

    ajax( url, DATA, 'create_indicators_list', [] )
    

```


