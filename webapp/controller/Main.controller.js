sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("googleimage.controller.Main", {
            onInit: function () {

                //Vou fazer um table type dentro de uma estrutura do abap
                let ImageList = {
                    Imagens : [ //Variável "Imagens" da lista ImageList
                        /*{
                            url : "http://cdn.shopify.com/s/files/1/0265/3893/4330/products/coca-cola-110591_1200x1200.jpg?v=1590528264",
                            thumbnail : "https://rapidapi.usearch.com/api/thumbnail/get?value=158279291306047240",
                            title: "Coca-cola White Lily Diner",
                            provider : {
                                name : "shopify"
                            }
                        },
                        {
                            url : "http://cdn.shopify.com/s/files/1/0309/8755/0851/products/CocaCola_1200x1200.jpg?v=1585705641",
                            thumbnail : "https://rapidapi.usearch.com/api/thumbnail/get?value=549732196490595880",
                            title: "Coca Cola Mary's Mountain Cookies in Omaha",
                            provider : {
                                name : "shopify"
                            }
                        },
                        {
                            url : "http://www.thesouthafrican.com/wp-content/uploads/2022/04/Coca-cola-price-hikes-scaled.jpg",
                            thumbnail : "https://rapidapi.usearch.com/api/thumbnail/get?value=9168078460098355363",
                            title: "Coca-Cola price hikes with little signs of consumer pushback",
                            provider : {
                                name : "thesouthafrican"
                            }
                        }*/

                    ]
                };    //let é uma variavel local

                //CRIAÇAO DO MODELO PARA EXIBIR DADOS NA TELA
                let ImageModel = new JSONModel (ImageList);
                //agora tenho de fazer data binding para esta funcionalidade existir no ficheiro view 
                let view = this.getView();//para instanciar a tela na minha variavel
                view.setModel(ImageModel, "ModeloImagem");

            },
            onPressBuscar: function (){
                //instancia objeto input na variável
                let inputBusca = this.byId("inpBusca");
                //coleta o valor digitado no input
                let query = inputBusca.getValue();
                //exibe na tela
                //alert(query);

                const settings = {
                    "async": true,
                    "crossDomain": true,
                    //concatenate
                    "url": "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?q="
                    + query 
                    + "&pageNumber=1&pageSize=10&autoCorrect=true",
                    "method": "GET",
                    "headers": {
                        "X-RapidAPI-Key": "93229315fbmsh253b37630d66bc4p1cae83jsne3f130b9522f",
                        "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com"
                    }
                };
                
                //done -> callback: uma função executada no final de outra função
                $.ajax(settings).done(function (response) {//ajax é um comando que permite fazer comunicação entre cliente e servidor
                    console.log(response);

                    //instanciar o modelo
                    let oImageModel = this.getView().getModel("ModeloImagem");//this é relativa à função que estou dentro(lá em cima) e está está referente ao controller main dentro da view
                                                                            //é este modelo que está nesta tela(declarei lá em cima)
                    //agora vou pegar na informação que está dentro do modelo
                    let oDadosImage = oImageModel.getData();//vai retornar a lista criada acima ("tabela interna")

                    //clear da tabela interna = array
                    oDadosImage.Imagens = [];

                    //loop que adiciona dados de uma tabela noutra tabela
                    let listaResultados = response.value;
                    let newItem;

                    for (var i = 0; i < listaResultados.length; i++){
                        //read table pelo indice
                        newItem = listaResultados[i];
                        //append dos dados na nova tabela
                        oDadosImage.Imagens.push(newItem);
                    }

                    oImageModel.refresh();

                }.bind(this)//Isto serve para dizer que esta função vai ter acesso às funções acima dela
                );


            }
        });
    });
