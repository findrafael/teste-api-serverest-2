import geradorDados from "./geraDados"

const URL_USUARIOS   = '/usuarios/'
const URL_LOGIN     = '/login'
const URL_PRODUTOS  = '/produtos/'
const URL_CARRINHOS = '/carrinhos/'

export default class Usuarios {

    static buscarUsuario(){
        return cy.request(URL_USUARIOS)
    }

    static buscarUltimoUsuarioID(){
        cy.request(URL_USUARIOS).then(res => {
            const array = res.body.usuarios
            const ultimo = array[array.length - 1]._id
            cy.wrap({
                _id: ultimo
            }).as('ultimoUsuarioID')
        })
    }

    static buscarUsuarioAleatorio(){
        cy.request(URL_USUARIOS).then(res => {
            const array = res.body.usuarios
            const tamanho = array.length
            const random = Math.floor(Math.random() * tamanho)
            const id = array[random]['_id']
            cy.wrap({
                _id: id
            }).as('idRandom')
        })
    }

    static buscarUsuarioID(id){
        return cy.request({
            url: URL_USUARIOS + id,
            failOnStatusCode: false
        })
    }

    static criaUsuario(){
        let usuario = geradorDados.geraUsuario()
        cy.wrap({
            nome: usuario.nome,
            email: usuario.email,
            senha: usuario.senha
        }).as('ultimoUserCadastrado')
        
        return cy.request({
            method: 'POST',
            url: URL_USUARIOS,
            failOnStatusCode: false,
            body: {
                    "nome": usuario.nome,
                    "email": usuario.email,
                    "password": usuario.senha,
                    "administrador": 'true'
            }
        })
    }

    static naoCriaUsuario(){
        return cy.request({
            method: 'POST',
            url: URL_USUARIOS,
            failOnStatusCode: true,
            body: {
            }
        })
    }

    static criaUsuarioNormal(){
        let usuario = geradorDados.geraUsuarioNormal()
        cy.wrap({
            nome: usuario.nome,
            email: usuario.email,
            senha: usuario.senha
        }).as('ultimoUserNormalCadastrado')
        
        return cy.request({
            method: 'POST',
            url: URL_USUARIOS,
            failOnStatusCode: false,
            body: {
                    "nome": usuario.nome,
                    "email": usuario.email,
                    "password": usuario.senha,
                    "administrador": "false"
            }
        })
    }

    static criaUsuarioSemSucesso(nome, email, senha){
        return cy.request({
            method: 'POST',
            url: URL_USUARIOS,
            failOnStatusCode: false,
            body: {
                    "nome": nome,
                    "email": email,
                    "password": senha,
                    "administrador": 'true'
            }
        })
    }
    
    
}