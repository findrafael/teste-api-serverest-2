import Produtos from '../../services/produtos.service'
import Carrinhos from '../../services/carrinhos.service'
import Login from '../../services/login.service'
import Usuarios from '../../services/usuarios.service'
import validaServerest from '../../services/validaServerest.service'
import validacao from '../../fixtures/validaContrato'

describe('Casos de teste da rota de Carrinhos', () => {

    context('Cenário positivo! - Concluindo compra.', () => {

        beforeEach('Logar', () => {
            Usuarios.criaUsuario()
            cy.get('@ultimoUserCadastrado').then(res => {
                Login.fazerLogin(res.email, res.senha).then(res => {
                    validacao.validaContrato(res, 'get-login', 200)
                    validaServerest.validaFazerLogin(res)
                    Login.salvarBearer(res)
                })
            })
        })

        it('Deve obter todos os carrinhos', () => {
            Carrinhos.buscaCarrinho().then(res => {
                validacao.validaContrato(res, 'carrinhos/get-carrinhos', 200)
                validaServerest.validaBuscaCarrinho(res)
            })
        })

        it('Deve criar um carrinho', () => {
            Produtos.buscaProduto().then(res => {
                Carrinhos.criaCarrinho(res.body.produtos[0]['_id'], 1).then(res => {
                    validacao.validaContrato(res, 'carrinhos/cria-carrinho', 200)
                    validaServerest.validaCriaCarrinho(res)
                })
            })
        })

        it('TC18 - Deve concluir uma compra, deletando um carrinho', () => {

            Carrinhos.concluiCompra().then(res => {
                validacao.validaContrato(res, 'carrinhos/conclui-compra', 200)
                validaServerest.validaConcluiCompra(res)
            })
        })

    })

    context('Cenário de erro! - Concluindo compra.', () => {

        beforeEach('Logar', () => {
            Usuarios.criaUsuario()
            cy.get('@ultimoUserCadastrado').then(res => {
                Login.fazerLogin(res.email, res.senha).then(res => {
                    validacao.validaContrato(res, 'get-login', 200)
                    validaServerest.validaFazerLogin(res)
                    Login.salvarBearer(res)
                })
            })
        })

        it('TC19 - Não deve concluir uma compra com token ausente.', () => {

            Carrinhos.naoConcluiCompra().then(res => {
                validacao.validaContrato(res, 'carrinhos/conclui-compra', 401)
                validaServerest.validaNaoConcluiCompra(res)
            })

        })

    })
    
    context('Cenário positivo! - Cancelando compra.', () => {

        beforeEach('Logar', () => {
            Usuarios.criaUsuario()
            cy.get('@ultimoUserCadastrado').then(res => {
                Login.fazerLogin(res.email, res.senha).then(res => {
                    validacao.validaContrato(res, 'get-login', 200)
                    validaServerest.validaFazerLogin(res)
                    Login.salvarBearer(res)
                })
            })
        })

        it('Deve obter todos os carrinhos', () => {
            Carrinhos.buscaCarrinho().then(res => {
                validacao.validaContrato(res, 'carrinhos/get-carrinhos', 200)
                validaServerest.validaBuscaCarrinho(res)
            })
        })

        it('Deve criar um carrinho', () => {
            Produtos.buscaProduto().then(res => {
                Carrinhos.criaCarrinho(res.body.produtos[0]['_id'], 1).then(res => {
                    validacao.validaContrato(res, 'carrinhos/cria-carrinho', 200)
                    validaServerest.validaCriaCarrinho(res)
                })
            })
        })

        it('TC20 - Deve cancelar uma compra, deletando um carrinho', () => {
            Carrinhos.cancelaCompra().then(res => {
                validacao.validaContrato(res, 'carrinhos/cancela-compra', 200)
                validaServerest.validaCancelaCompra(res)
            })
        })

    })

    context('Cenário de erro! - Cancelando compra.', () => {

        beforeEach('Logar', () => {
            Usuarios.criaUsuario()
            cy.get('@ultimoUserCadastrado').then(res => {
                Login.fazerLogin(res.email, res.senha).then(res => {
                    validacao.validaContrato(res, 'get-login', 200)
                    validaServerest.validaFazerLogin(res)
                    Login.salvarBearer(res)
                })
            })
        })

        it('TC21 - Não deve cancelar uma compra com token ausente.', () => {
            Carrinhos.naoCancelaCompra().then(res => {
                validacao.validaContrato(res, 'carrinhos/cancela-compra', 401)
                validaServerest.validaNaoCancelaCompra(res)
            })

        })

    })

})