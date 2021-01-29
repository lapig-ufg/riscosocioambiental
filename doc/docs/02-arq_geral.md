# Arquitetura de software

O Risco Socioambiental foi desenvolvido de acordo com os padrões de interoperabilidade definidos pela *Open Geospatial Consortium* ([OGC](https://www.ogc.org/)) e a arquitetura de *webservices* com o padrão [REST](https://pt.wikipedia.org/wiki/REST).

## Componentes de software

A arquitetura de software desenvolvida para o Risco Socioambiental pode ser observada na Figura abaixo.

**Fernanda, tem que fazer uma figura parecida com esta porém atualizando o Openlayers para Leaflet e PostgreSQL para SQLite**

![Arquitetura Risco Socioambiental.](imgs/02/softArch.png)

Essencialmente, pode-se dividir o Risco Socioambiental em três partes:

+ *Client:* responsável por apresentar toda a interface, construído em Angular 5 com apoio dos frameworks:
  - WebMap: Mapa interativo construído com o [Leaflet](https://leafletjs.com/)
  - Componentes *front-end*: **Fernanda olhe aqui os componentes utilizados (Bootstrap..? ) ou foi tudo apenas com CSS puro?**
+ *Server:* Disponibiliza os serviços que compõem a aplicação:
  - *Application Server:* Disponibiliza o acesso aos dados do Data Source, análises e configurações.
  - *OWS Server*: Disponibiliza o acesso ao [MapServer](https://mapserver.org/), responsável pelo processamento dos dados geográficos, apresentação visual dos mesmos e gerenciamento de cache das imagens geradas.
+ *Data Source*: Responsável por armazenar os dados vetoriais e matriciais.

Resumidamente, todos os dados usados pelo Risco Socioambiental estão organizados em um banco de dados SQLite e em sistemas de arquivos *(Data Repository)*. O SQLite é armazenado também em arquivo e permite processar consultas espaciais via *Structured Query Language* (SQL). Já os dados que não necessitam de cruzamentos espaciais são armazenados em arquivos nos formatos Shapefile e/ou GeoTIFF.

Estes dados são acessados pelo *Application Server* e pelo *OWS Server* (ambos construídos em NodeJS) e são disponibilizados através de URLs com requisições por meio do protocolo [HTTP](https://pt.wikipedia.org/wiki/Hypertext_Transfer_Protocol). Todas as requisições Web realizadas aos Servers são interceptadas pelo Apache Server e devidamente redirecionadas. Desta forma, o *Client* realiza todas as requisições necessárias para construir a visualização dos elementos da página, tais como: mapa interativo, gráficos, campo de busca e etc.

Por fim, destaca-se que todo o código-fonte para o [Risco Socioambiental](https://github.com/lapig-ufg/riscosocioambiental) e também para o [OWS Server](https://github.com/lapig-ufg/lapig-maps) foi disponibilizado publicamente no [Github do LAPIG/UFG](https://github.com/lapig-ufg/).
