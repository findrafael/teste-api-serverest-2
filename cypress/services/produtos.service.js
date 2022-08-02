import geradorDados from "./geraDados"

const URL_USUARIOS   = '/usuarios/'
const URL_LOGIN     = '/login'
const URL_PRODUTOS  = '/produtos/'
const URL_CARRINHOS = '/carrinhos/'

export default class Produtos {

    static buscaProduto(){
        return cy.request(URL_PRODUTOS)
    }

    static buscaProdutoID(id){
        return cy.request({
            url: URL_PRODUTOS + id,
            failOnStatusCode: false
        })
    }

    static buscarUltimoProdutoID(){
        cy.request(URL_PRODUTOS).then(res => {
            const array = res.body.produtos
            const ultimo = array[array.length - 1]._id
            cy.wrap({
                _id: ultimo,
            }).as('ultimoProdutoID')
        })
    }

    static buscarProdutoAleatorio(){
        cy.request(URL_PRODUTOS).then(res => {
            const array = res.body.produtos
            const tamanho = array.length
            const random = Math.floor(Math.random() * tamanho)
            const id = array[random]['_id']
            cy.wrap({
                _id: id
            }).as('idRandom')
        })
    }

    static criaProduto(){
        let produto = geradorDados.geraProduto()

        cy.wrap({
            nome: produto.nome,
            preco: produto.email,
            descricao: produto.senha,
            quantidade: produto.quantidade
        }).as('ultimoProdutoCadastrado')

        return cy.request({
            method: 'POST',
            url: URL_PRODUTOS,
            failOnStatusCode: false,
            body: {
                "nome": produto.nome,
                "preco": produto.preco,
                "descricao": produto.descricao,
                "quantidade": produto.quantidade
                  },
            headers:{
                    Authorization: 'Bearer ' + Cypress.env('bearer')           
               }
        })
        
    }

    static naoCriaProdutoVazio(){
        return cy.request({
            method: 'POST',
            url: URL_PRODUTOS,
            failOnStatusCode: true,
            body: {},
            headers:{
                    Authorization: 'Bearer ' + Cypress.env('bearer')           
               }
        })
        
    }

    static naoCriaProdutoUserNormal(token){
        let produto = geradorDados.geraProduto()

        cy.wrap({
            nome: produto.nome,
            preco: produto.email,
            descricao: produto.senha,
            quantidade: produto.quantidade
        }).as('ultimoProdutoCadastrado')

        return cy.request({
            method: 'POST',
            url: URL_PRODUTOS,
            failOnStatusCode: false,
            body: {
                "nome": produto.nome,
                "preco": produto.preco,
                "descricao": produto.descricao,
                "quantidade": produto.quantidade
                  },
            headers:{
                    Authorization: token          
               }
        })
        
    }

    static naoCriaProduto(nome, preco, descricao, quantidade){
        return cy.request({
            method: 'POST',
            url: URL_PRODUTOS,
            failOnStatusCode: false,
            body: {
                "nome": nome,
                "preco": preco,
                "descricao": descricao,
                "quantidade": quantidade
                  },
            headers:{
                    Authorization: 'Bearer ' + Cypress.env('bearer')           
               }
        })
        
    }

    static deletaProdutoID(id){
        return cy.request({
            method: 'DELETE',
            url: URL_PRODUTOS + id,
            auth: {
                bearer: Cypress.env('bearer')
            }
        })
    }

    static deletaProdutoIDUserNormal(id, token){
        return cy.request({
            method: 'DELETE',
            url: URL_PRODUTOS + id,
            failOnStatusCode: false,
            auth: {
                bearer: token
            }
        })
    }

    static editaProduto(id){

        let produto = geradorDados.geraProduto2()

        return cy.request({
            method: 'PUT',
            url: URL_PRODUTOS + id,
            failOnStatusCode: false,
            body: {
                "nome": produto.nome,
                "preco": produto.preco,
                "descricao": produto.descricao,
                "quantidade": produto.quantidade
            },
            auth: {
                bearer: Cypress.env('bearer')
            }
        })
    }

    static naoEditaProdutoUserNormal(id, token){

        let produto = geradorDados.geraProduto2()

        return cy.request({
            method: 'PUT',
            url: URL_PRODUTOS + id,
            failOnStatusCode: false,
            body: {
                "nome": produto.nome,
                "preco": produto.preco,
                "descricao": produto.descricao,
                "quantidade": produto.quantidade
            },
            headers:{
                Authorization: token          
           }
        })
    }
    
}