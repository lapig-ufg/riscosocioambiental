# Banco de dados

 Na plataforma de Risco Socioambiental o banco de dados utilizado foi o SQLite que usa a biblioteca SpatiaLite para fornecer um SGBD (Sistema gerenciador de banco de dados) espacial completo e poderoso. O último backup deste banco pode ser encontrado no [link](https://drive.google.com/file/d/1Qww9WQ7G1YHZ1ndLEYzrTrcjAklTRP1v/view?usp=sharing) no arquivo `indicadores.sqlite`. 


## Gerenciador do banco de dados

O [spatialite_gui](https://www.gaia-gis.it/fossil/spatialite_gui/index) é uma ferramenta de interface gráfica de usuário (GUI) de código aberto que oferece suporte SpatiaLite, simples de utilizar, caso tenha dúvidas acesse a [documentação e tutoriais](http://www.gaia-gis.it/gaia-sins/spatialite-gui-docs/). 

Basicamente para gerenciar o banco de dados você precisará instalar o [spatialite_gui](https://www.gaia-gis.it/fossil/spatialite_gui/index) em seu computador, após isso abra a ferramenta e clique no ícone para conectar a um banco de dados, conforme na imagem a seguir:
![conectando a um banco de dados.](/imgs/03/spatialite_1.png "conectando a um banco de dados.")

Escolha o arquivo `indicadores.sqlite` que baixou agora a pouco por meio do [link](https://drive.google.com/file/d/1Qww9WQ7G1YHZ1ndLEYzrTrcjAklTRP1v/view?usp=sharing), assim o banco será carregado na ferramenta veja:
![Banco de dados carregado.](/imgs/03/spatialite_2.png "Banco de dados carregado.")

Agora você já pode começar as atualizações!

## Processo de atualização

Diversos dados presentes na plataforma de Risco Socioambiental são periodicamente atualizados pelas instituições competentes. Desta forma, a medida que os mesmos são atualizados e disponibilizados pelas instituições também é necessário realizar a atualização no banco de dados de indicadores da plataforma. Para facilitar a inserção/atualizações de dados nós criamos alguns scripts que serão apresentados ao longo desde documento.

### Tabela base

A tabela regions é a base para todas as outras tabelas que são inseridas na plataforma, ela é responsável por armazenar todas as possíveis regiões de filtragem (biomas, estados, municípios, Matopiba e Arco do Desmatamento) de acordo com o interesse do usuário, assim quando executamos o script de inserção de algum dado, ele usará a tabela regions para contruir toda a estrutura e acrescentar apenas o determinado indicador.

### Script de importação

Este script realiza a inserção de um dado do tipo ShapeFile no banco de dados, lá ele será apresentado como tabela e conterá suas geometrias. Você poderá baixar o script por meio do [link](https://drive.google.com/file/d/1g-ifse7WkYiGaQ7V2ulcbOHnMDggmQmt/view?usp=sharing), em todo caso este é o conteúdo:

``` sh
SHP_PATH=$(echo "$1" | cut -d. -f1)
SHP_PROJ=4674
SHP_ENCODING='ISO-8859-1'
DB_PATH="/home/fernanda/Documentos/Projeto/Dados_local/Ocultos/indicadores.sqlite"
LAYERNAME=$(basename "$SHP_PATH" .shp)
TABLE_NAME=$LAYERNAME
GEOMETRY_TYPE=$(ogrinfo -ro -so $SHP_PATH $LAYERNAME | grep 'Geometry' | cut -d':' -f2)

spatialite_tool -i -shp $SHP_PATH -2 -k -d $DB_PATH -t $TABLE_NAME -g Geometry -s $SHP_PROJ -c $SHP_ENCODING --type $GEOMETRY_TYPE
```


O script acima lê o caminho da pasta do shapefile (`SHP_PATH`), a projeção (`SHP_PROJ`), o encoding (`SHP_ENCODING`), o banco de dados .sqlite (`DB_PATH`), nome da tabela que será criada no banco de dados (`TABLE_NAME`) e geometria (`GEOMETRY_TYPE`)  tudo isso é feito dentro do script e pode ser alterado conforme necessidade.
Ao executar o script `import_indicadores.sh` você deverá apenas informar o caminho da pasta do shapefile (`SHP_PATH`) veja um exemplo de execução:

``` sh
./import_spatial_inteligence.sh Dados/SPATIAL/Trabalho_Escravo/trabalho_escravo_cpt_2000.shp
./import_spatial_inteligence.sh Dados/SPATIAL/Trabalho_Escravo/trabalho_escravo_cpt_2002.shp
./import_spatial_inteligence.sh Dados/SPATIAL/Trabalho_Escravo/trabalho_escravo_cpt_2008.shp
./import_spatial_inteligence.sh Dados/SPATIAL/Trabalho_Escravo/trabalho_escravo_cpt_2009.shp
./import_spatial_inteligence.sh Dados/SPATIAL/Trabalho_Escravo/trabalho_escravo_cpt_2010.shp
./import_spatial_inteligence.sh Dados/SPATIAL/Trabalho_Escravo/trabalho_escravo_cpt_2011.shp
./import_spatial_inteligence.sh Dados/SPATIAL/Trabalho_Escravo/trabalho_escravo_cpt_2012.shp
./import_spatial_inteligence.sh Dados/SPATIAL/Trabalho_Escravo/trabalho_escravo_cpt_2013.shp
./import_spatial_inteligence.sh Dados/SPATIAL/Trabalho_Escravo/trabalho_escravo_cpt_2014.shp
./import_spatial_inteligence.sh Dados/SPATIAL/Trabalho_Escravo/trabalho_escravo_cpt_2015.shp
```
Pronto! Os dados de Trabalho Escravo para os anos de 2000 á 2015 foram inserido com sucesso no banco de dados. 

### Script de atualização dentro do banco de dados

O Próximo passo é cruzar este dado com a tabela base `regions`, para que este dado possa ser filtrado na plataforma por regiões de interesse e também unificar todos os os anos em apenas uma tabela. Este processo também é simples e temos vários scripts prontos em `sql`, para baixar acesse o [link](https://drive.google.com/file/d/10A5MKBrPCmOqun7Dcy7F6acyuhI9K9uT/view?usp=sharing). Veja um exemplo de script para atualizar a tabela geral (`trabalho_escravo`) de todos os anos de Trabalho Escravo:

``` sql
PRAGMA journal_mode = off;
PRAGMA cache_size = -1024000;

SELECT DisableSpatialIndex('trabalho_escravo', 'Geometry');
SELECT DiscardGeometryColumn('trabalho_escravo', 'Geometry');
DROP TABLE "trabalho_escravo";

CREATE TABLE "trabalho_escravo" (
	"PK_UID" INTEGER PRIMARY KEY AUTOINCREMENT,
	"COD_UF" INTEGER,
	"COD_MUNICI" TEXT,
	"REGIAO" TEXT,
	"ESTADO" TEXT,
	"UF" TEXT,
	"MUNICIPIO" TEXT,
	"BIOMA" TEXT,
	"ARCODESMAT" INTEGER,
	"MATOPIBA" INTEGER,
	"QTD_PESSOAS" REAL,
	"REGION_FK" INTEGER,
	"ANO" INTEGER
);

SELECT AddGeometryColumn('trabalho_escravo', 'Geometry', 4674, 'MULTIPOLYGON', 2);

INSERT INTO "trabalho_escravo"(COD_UF, COD_MUNICI, REGIAO, ESTADO, UF, MUNICIPIO, BIOMA, ARCODESMAT, MATOPIBA, QTD_PESSOAS, REGION_FK, ANO, Geometry)
SELECT 	r.COD_UF, r.COD_MUNICI, r.REGIAO, r.ESTADO, r.UF, r.MUNICIPIO, r.BIOMA, r.ARCODESMAT, r.MATOPIBA,
		s.TRAB_PROPO, r.PK_UID, '2000', s.Geometry
FROM "trabalho_escravo_cpt_2000" s, regions r
WHERE r.COD_MUNICI = s.COD_MUNICI AND r.POL_HA = s.POL_HA;

INSERT INTO "trabalho_escravo"(COD_UF, COD_MUNICI, REGIAO, ESTADO, UF, MUNICIPIO, BIOMA, ARCODESMAT, MATOPIBA, QTD_PESSOAS, REGION_FK, ANO, Geometry)
SELECT 	r.COD_UF, r.COD_MUNICI, r.REGIAO, r.ESTADO, r.UF, r.MUNICIPIO, r.BIOMA, r.ARCODESMAT, r.MATOPIBA,
		s.TRAB_PROPO, r.PK_UID, '2002', s.Geometry
FROM "trabalho_escravo_cpt_2002" s, regions r
WHERE r.COD_MUNICI = s.COD_MUNICI AND r.POL_HA = s.POL_HA;

INSERT INTO "trabalho_escravo"(COD_UF, COD_MUNICI, REGIAO, ESTADO, UF, MUNICIPIO, BIOMA, ARCODESMAT, MATOPIBA, QTD_PESSOAS, REGION_FK, ANO, Geometry)
SELECT 	r.COD_UF, r.COD_MUNICI, r.REGIAO, r.ESTADO, r.UF, r.MUNICIPIO, r.BIOMA, r.ARCODESMAT, r.MATOPIBA,
		s.TRAB_PROPO, r.PK_UID, '2008', s.Geometry
FROM "trabalho_escravo_cpt_2008" s, regions r
WHERE r.COD_MUNICI = s.COD_MUNICI AND r.POL_HA = s.POL_HA;

INSERT INTO "trabalho_escravo"(COD_UF, COD_MUNICI, REGIAO, ESTADO, UF, MUNICIPIO, BIOMA, ARCODESMAT, MATOPIBA, QTD_PESSOAS, REGION_FK, ANO, Geometry)
SELECT 	r.COD_UF, r.COD_MUNICI, r.REGIAO, r.ESTADO, r.UF, r.MUNICIPIO, r.BIOMA, r.ARCODESMAT, r.MATOPIBA,
		s.TRAB_PROPO, r.PK_UID, '2009', s.Geometry
FROM "trabalho_escravo_cpt_2009" s, regions r
WHERE r.COD_MUNICI = s.COD_MUNICI AND r.POL_HA = s.POL_HA;

INSERT INTO "trabalho_escravo"(COD_UF, COD_MUNICI, REGIAO, ESTADO, UF, MUNICIPIO, BIOMA, ARCODESMAT, MATOPIBA, QTD_PESSOAS, REGION_FK, ANO, Geometry)
SELECT 	r.COD_UF, r.COD_MUNICI, r.REGIAO, r.ESTADO, r.UF, r.MUNICIPIO, r.BIOMA, r.ARCODESMAT, r.MATOPIBA,
		s.TRAB_PROPO, r.PK_UID, '2010', s.Geometry
FROM "trabalho_escravo_cpt_2010" s, regions r
WHERE r.COD_MUNICI = s.COD_MUNICI AND r.POL_HA = s.POL_HA;

INSERT INTO "trabalho_escravo"(COD_UF, COD_MUNICI, REGIAO, ESTADO, UF, MUNICIPIO, BIOMA, ARCODESMAT, MATOPIBA, QTD_PESSOAS, REGION_FK, ANO, Geometry)
SELECT 	r.COD_UF, r.COD_MUNICI, r.REGIAO, r.ESTADO, r.UF, r.MUNICIPIO, r.BIOMA, r.ARCODESMAT, r.MATOPIBA,
		s.TRAB_PROPO, r.PK_UID, '2011', s.Geometry
FROM "trabalho_escravo_cpt_2011" s, regions r
WHERE r.COD_MUNICI = s.COD_MUNICI AND r.POL_HA = s.POL_HA;

INSERT INTO "trabalho_escravo"(COD_UF, COD_MUNICI, REGIAO, ESTADO, UF, MUNICIPIO, BIOMA, ARCODESMAT, MATOPIBA, QTD_PESSOAS, REGION_FK, ANO, Geometry)
SELECT 	r.COD_UF, r.COD_MUNICI, r.REGIAO, r.ESTADO, r.UF, r.MUNICIPIO, r.BIOMA, r.ARCODESMAT, r.MATOPIBA,
		s.TRAB_PROPO, r.PK_UID, '2012', s.Geometry
FROM "trabalho_escravo_cpt_2012" s, regions r
WHERE r.COD_MUNICI = s.COD_MUNICI AND r.POL_HA = s.POL_HA;

INSERT INTO "trabalho_escravo"(COD_UF, COD_MUNICI, REGIAO, ESTADO, UF, MUNICIPIO, BIOMA, ARCODESMAT, MATOPIBA, QTD_PESSOAS, REGION_FK, ANO, Geometry)
SELECT 	r.COD_UF, r.COD_MUNICI, r.REGIAO, r.ESTADO, r.UF, r.MUNICIPIO, r.BIOMA, r.ARCODESMAT, r.MATOPIBA,
		s.TRAB_PROPO, r.PK_UID, '2013', s.Geometry
FROM "trabalho_escravo_cpt_2013" s, regions r
WHERE r.COD_MUNICI = s.COD_MUNICI AND r.POL_HA = s.POL_HA;

INSERT INTO "trabalho_escravo"(COD_UF, COD_MUNICI, REGIAO, ESTADO, UF, MUNICIPIO, BIOMA, ARCODESMAT, MATOPIBA, QTD_PESSOAS, REGION_FK, ANO, Geometry)
SELECT 	r.COD_UF, r.COD_MUNICI, r.REGIAO, r.ESTADO, r.UF, r.MUNICIPIO, r.BIOMA, r.ARCODESMAT, r.MATOPIBA,
		s.TRAB_PROPO, r.PK_UID, '2014', s.Geometry
FROM "trabalho_escravo_cpt_2014" s, regions r
WHERE r.COD_MUNICI = s.COD_MUNICI AND r.POL_HA = s.POL_HA;

INSERT INTO "trabalho_escravo"(COD_UF, COD_MUNICI, REGIAO, ESTADO, UF, MUNICIPIO, BIOMA, ARCODESMAT, MATOPIBA, QTD_PESSOAS, REGION_FK, ANO, Geometry)
SELECT 	r.COD_UF, r.COD_MUNICI, r.REGIAO, r.ESTADO, r.UF, r.MUNICIPIO, r.BIOMA, r.ARCODESMAT, r.MATOPIBA,
		s.TRAB_PROPO, r.PK_UID, '2015', s.Geometry
FROM "trabalho_escravo_cpt_2015" s, regions r
WHERE r.COD_MUNICI = s.COD_MUNICI AND r.POL_HA = s.POL_HA;

INSERT INTO "trabalho_escravo"(COD_UF, COD_MUNICI, REGIAO, ESTADO, UF, MUNICIPIO, BIOMA, ARCODESMAT, MATOPIBA, QTD_PESSOAS, REGION_FK, ANO, Geometry)
SELECT 	r.COD_UF, r.COD_MUNICI, r.REGIAO, r.ESTADO, r.UF, r.MUNICIPIO, r.BIOMA, r.ARCODESMAT, r.MATOPIBA,
		s.TRAB_PROPO, r.PK_UID, '2016', s.Geometry
FROM "trabalho_escravo_cpt_2016" s, regions r
WHERE r.COD_MUNICI = s.COD_MUNICI AND r.POL_HA = s.POL_HA;
```

Este é um exemplo de dado temporal, vamos conferir um dado diferente!

### Exemplo de inserção de dado não temporal

Execute o script de importação de dados:

``` sh
./import_spatial_inteligence.sh Dados/SPATIAL/unidades_conservacao_integral/unidades_conservacao_integral_todos.shp
```

Agora dentro do banco de dados, o Próximo passo é cruzar este dado com a tabela base `regions`, para que este dado possa ser filtrado na plataforma por regiões de interesse:

``` sql
PRAGMA journal_mode = off;
PRAGMA cache_size = -1024000;

SELECT DisableSpatialIndex('unidades_conservacao_integral', 'Geometry');
SELECT DiscardGeometryColumn('unidades_conservacao_integral', 'Geometry');
DROP TABLE "unidades_conservacao_integral";

CREATE TABLE "unidades_conservacao_integral" (
	"PK_UID" INTEGER PRIMARY KEY AUTOINCREMENT,
	"COD_UF" INTEGER,
	"COD_MUNICI" TEXT,
	"REGIAO" TEXT,
	"ESTADO" TEXT,
	"UF" TEXT,
	"MUNICIPIO" TEXT,
	"BIOMA" TEXT,
	"ARCODESMAT" INTEGER,
	"MATOPIBA" INTEGER,
	"AREA_HA" REAL,
	"REGION_FK" INTEGER,
	"ANO" INTEGER
);

SELECT AddGeometryColumn('unidades_conservacao_integral', 'Geometry', 4674, 'MULTIPOLYGON', 2);

INSERT INTO "unidades_conservacao_integral"(COD_UF, COD_MUNICI, REGIAO, ESTADO, UF, MUNICIPIO, BIOMA, ARCODESMAT, MATOPIBA, AREA_HA, REGION_FK, ANO, Geometry)
SELECT 	r.COD_UF, r.COD_MUNICI, r.REGIAO, r.ESTADO, r.UF, r.MUNICIPIO, r.BIOMA, r.ARCODESMAT, r.MATOPIBA,
		s.AREA_HA, r.PK_UID, '2014', s.Geometry
FROM "unidades_conservacao_integral_todos" s, regions r
WHERE r.COD_MUNICI = s.COD_MUNICI AND r.POL_HA = s.POL_HA;
```

Pronto, agora você já sabe como atualizar os dados do banco de dados de indicadores da plataforma de Risco Socioambiental.