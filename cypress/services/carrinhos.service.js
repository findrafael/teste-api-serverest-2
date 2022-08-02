const URL_USUARIOS   = '/usuarios/'
const URL_LOGIN     = '/login'
const URL_PRODUTOS  = '/produtos/'
const URL_CARRINHOS = '/carrinhos/'

export default class Carrinhos {

    static buscaCarrinho(){
        return cy.request(URL_CARRINHOS)
    }

    static buscaCarrinhoID(id){
        return cy.request(URL_CARRINHOS + id)
    }

    static criaCarrinho(idProduto, quantidade){
        return cy.request({
            method: 'POST',
            url: URL_CARRINHOS,
            failOnStatusCode: false,
            body: {
                "produtos": [{
                    "idProduto": idProduto,
                    "quantidade": quantidade
                  }]
                  },
            auth: {
                bearer: Cypress.env('bearer')
            }
        })
    }

    static concluiCompra(){
        return cy.request({
            method: 'DELETE',
            url: URL_CARRINHOS + 'concluir-compra/',
            auth: {
                bearer: Cypress.env('bearer')
            }
        })
    }

    static cancelaCompra(){
        return cy.request({
            method: 'DELETE',
            url: URL_CARRINHOS + 'cancelar-compra/',
            auth: {
                bearer: Cypress.env('bearer')
            }
        })
    }
    
    static naoConcluiCompra(){
        return cy.request({
            method: 'DELETE',
            failOnStatusCode: false,
            url: URL_CARRINHOS + 'concluir-compra/'
        })
    }

    static naoCancelaCompra(){
        return cy.request({
            method: 'DELETE',
            failOnStatusCode: false,
            url: URL_CARRINHOS + 'cancelar-compra/'
        })
    }
}