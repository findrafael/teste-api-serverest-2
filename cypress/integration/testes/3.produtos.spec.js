import validaServerest from '../../services/validaServerest.service'
import Login from '../../services/login.service'
import validacao from '../../fixtures/validaContrato'
import Produtos from '../../services/produtos.service'
import Usuarios from '../../services/usuarios.service'

describe('Casos de teste da rota de Produtos', () => {

    context('Cenário positivo!', () => {

        it('TC08 - Deve obter todos os produtos', () => {
            Produtos.buscaProduto().then(res => {
                validacao.validaContrato(res, 'produtos/get-produtos', 200)
                validaServerest.validaBuscaProdutos(res)
            })
        })

        it('TC09 - Deve obter um produto cadastrado pelo ID', () => {
            Produtos.buscarUltimoProdutoID()
            cy.get('@ultimoProdutoID').then(res => {
                Produtos.buscaProdutoID(res['_id']).then(res => {
                    validacao.validaContrato(res, 'produtos/get-produto-id', 200)
                })
            })

        })

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

        it('TC10 - Deve cadastrar um novo produto', () => {

            Produtos.criaProduto().then(res => {
                Cypress.env('idUltimoProdutoCadastrado', res.body['_id'])
                validacao.validaContrato(res, 'produtos/post-produto', 201)
                validaServerest.validaCriaProduto(res)
            })
        })

        it('TC11 - Deve editar um produto existente', () => {
            Produtos.criaProduto().then(res => {
                Produtos.editaProduto(res.body['_id']).then(res => {
                    validacao.validaContrato(res, 'produtos/put-produto', 200)
                    validaServerest.validaEditaProduto(res)
                })


            })
        })

        it('TC12 - Deve deletar um produto', () => {
            Produtos.criaProduto().then(res => {
                Produtos.deletaProdutoID(res.body['_id']).then(res => {
                    validacao.validaContrato(res, 'produtos/delete-produto', 200)
                    validaServerest.validaDeletaProdutoID(res)
                })
            })
        })

    })

    context('Cenário de erro!', () => {

        it('TC13 - Não deve obter um produto usando um ID inválido', () => {
            Produtos.buscaProdutoID('erjBJy7gBJBKJ').then(res => {
                validacao.validaContrato(res, 'produtos/get-produto-id', 400)
                validaServerest.validaNaoBuscaProdutoID(res)
            })
        })

        it('ISS03 - Não deve cadastrar um novo produto com informações vazias', () => {
            Produtos.naoCriaProdutoVazio()
        })

        it('TC14 - Não deve cadastrar um produto existente', () => {

            Produtos.buscaProduto().then(res => {
                let produto = res.body.produtos[0]
                Produtos.naoCriaProduto(produto.nome, produto.preco, produto.descricao, produto.quantidade).then(res => {
                    validacao.validaContrato(res, 'produtos/post-produto', 400)
                    validaServerest.validaNaoCriaProduto(res)
                })
            })

        })

        it('TC15 - Não deve criar um produto usando um login de usuário comum', () => {
            Usuarios.criaUsuarioNormal()
            cy.get('@ultimoUserNormalCadastrado').then(res => {
                Login.fazerLogin(res.email, res.senha).then(res => {
                    validacao.validaContrato(res, 'get-login', 200)
                    validaServerest.validaFazerLogin(res)
                    let bearer = res.body.authorization

                    Produtos.naoCriaProdutoUserNormal(bearer).then(res => {
                        Cypress.env('idUltimoProdutoCadastrado', res.body['_id'])
                        validacao.validaContrato(res, 'produtos/post-produto', 403)
                        validaServerest.validaCriaProdutoUserNormal(res)

                    })
                })
            })

        })

        it('TC16 - Não deve editar um produto usando um login de usuário comum', () => {
            Usuarios.criaUsuarioNormal()
            cy.get('@ultimoUserNormalCadastrado').then(res => {
                Login.fazerLogin(res.email, res.senha).then(res => {
                    validacao.validaContrato(res, 'get-login', 200)
                    validaServerest.validaFazerLogin(res)
                    let bearer = res.body.authorization

                    Produtos.naoEditaProdutoUserNormal('8dmaskdhj3', bearer).then(res => {
                        validacao.validaContrato(res, 'produtos/put-produto', 403)
                        validaServerest.validaEditaProdutoUserNormal(res)

                    })


                })
            })

        })

        it('TC17 - Não deve excluir um produto usando um login de usuário comum', () => {

            Usuarios.criaUsuarioNormal()
            cy.get('@ultimoUserNormalCadastrado').then(res => {
                Login.fazerLogin(res.email, res.senha).then(res => {
                    validacao.validaContrato(res, 'get-login', 200)
                    validaServerest.validaFazerLogin(res)
                    let bearer = res.body.authorization.slice(7)


                    Produtos.deletaProdutoIDUserNormal('6gsfaswe', bearer).then(res => {
                        validacao.validaContrato(res, 'produtos/delete-produto', 403)
                        validaServerest.validaDeletaProdutoUserNormal(res)

                    })
                })
            })

        })

    })

})