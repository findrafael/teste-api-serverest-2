import Usuarios from '../../services/usuarios.service'
import validaServerest from '../../services/validaServerest.service'
import validacao from '../../fixtures/validaContrato'

describe('Casos de teste da rota de Usuários', () => {

    context('Cenário positivo!', () => {

        it('TC03 - Deve obter todos os usuários cadastrados', () => {
            Usuarios.buscarUsuario().then(res => {
                validacao.validaContrato(res, 'usuarios/get-usuarios', 200)
                validaServerest.validaBuscaUsuarios(res)
            })
        })

        it('TC04 - Deve obter o último usuário da lista de usuários pelo id', () => {
            Usuarios.buscarUltimoUsuarioID()
            cy.get('@ultimoUsuarioID').then(res => {
                Usuarios.buscarUsuarioID(res['_id']).then(res => {
                    validacao.validaContrato(res, 'usuarios/get-usuario-id', 200)
                })
            })
        })

        it('TC05 - Deve cadastrar um novo usuário', () => {
            Usuarios.criaUsuario().then(res => {
                validacao.validaContrato(res, 'usuarios/post-usuario', 201)
                validaServerest.validaCriaUsuarioSucesso(res)
            })
        })

    })

    context('Cenário negativo!', () => {

        it('TC06 - Não deve obter um usuário informando um ID inválido', () => {
            Usuarios.buscarUsuarioID('issoéumidinvalido').then(res => {
                validacao.validaContrato(res, 'usuarios/get-usuario-id', 400)
                validaServerest.validaNaoBuscarUsuarioID(res)
            })
        })

        it('TC07 - Não deve cadastrar um usuário com e-mail já existente', () => {

            Usuarios.criaUsuario()
            cy.get('@ultimoUserCadastrado').then(res => {
                Usuarios.criaUsuarioSemSucesso(res.nome, res.email, res.senha).then(res => {
                    validacao.validaContrato(res, 'usuarios/post-usuario', 400)
                    validaServerest.validaCriaUsuarioSemSucesso(res)
                })
            })


        })

        it('ISS02 - Não deve cadastrar um usuário sem passar nenhuma informação', () => {
            Usuarios.naoCriaUsuario()
        })

    })

})
