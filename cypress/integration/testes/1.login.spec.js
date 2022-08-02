import Login from '../../services/login.service'
import validaServerest from '../../services/validaServerest.service'
import validacao from '../../fixtures/validaContrato'
import Usuarios from '../../services/usuarios.service'

describe('Casos de teste da rota de Login', () => {

    context('Cenário positivo!', () => {

        it('TC01 - Deve realizar login com sucesso', () => {
            Usuarios.criaUsuario().then(res => {
                validacao.validaContrato(res, 'usuarios/post-usuario', 201)
                validaServerest.validaCriaUsuarioSucesso(res)
            })

            cy.get('@ultimoUserCadastrado').then(res => {
                Login.fazerLogin(res.email, res.senha).then(res => {
                    validacao.validaContrato(res, 'get-login', 200)
                    validaServerest.validaFazerLogin(res)
                    Login.salvarBearer(res)
                })
            })

        })

    })

    context('Cenário de erro!', () => {

        it('TC02 - Não deve realizar login com informações inválidas', () => {
            Login.fazerLogin('emailinvalido@cypress.xyz', "@@@@@@@@").then(res => {
                validacao.validaContrato(res, 'get-login', 401)
                validaServerest.validaLoginFake(res)
            })
        })

        it('ISS01 - Não deve realizar login com informações faltando', () => {
            Login.naoFazerLogin()
        })

    })

})