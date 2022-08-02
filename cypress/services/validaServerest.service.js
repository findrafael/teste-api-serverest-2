export default class validaServerest{
    
    // Funções de Validar - login
    static validaFazerLogin(res){
        expect(res.body).to.haveOwnProperty('authorization')
    }


    static validaLoginFake(res){
        expect(res.body.message).to.be.equals('Email e/ou senha inválidos')
    }



    // Funções de Validar - Usuários
    static validaBuscaUsuarios(res){
        expect(res.body.quantidade).to.be.greaterThan(0)
    }


    static validaNaoBuscarUsuarioID(res){
        expect(res.body.message).to.be.equals('Usuário não encontrado')
    }


    static validaDeletarUsuarioID(res){
        expect(res.body.message).to.be.equals("Registro excluído com sucesso")
    }


    static validaNaoDeletaUsuarioID(res){
        expect(res.body.message).to.be.equals("Não é permitido excluir usuário com carrinho cadastrado")
    }


    static validaCriaUsuarioSucesso(res){
        expect(res.body.message).to.be.equals('Cadastro realizado com sucesso')
    }


    static validaCriaUsuarioSemSucesso(res){
        expect(res.body.message).to.be.equals('Este email já está sendo usado')
    }


    static validaEditaUsuario(res){
        expect(res.body.message).to.be.equals('Registro alterado com sucesso')
    }


    static validaNaoEditaUsuario(res){
        expect(res.body.message).to.be.equals('Este email já está sendo usado')
    }



    // Funções de Validar - Produtos
    static validaBuscaProdutos(res){
        expect(res.body.quantidade).to.be.greaterThan(0)
    }


    static validaNaoBuscaProdutoID(res){
        expect(res.body.message).to.be.equals('Produto não encontrado')
    }


    static validaCriaProduto(res){
        expect(res.body.message).to.be.equals("Cadastro realizado com sucesso")
    }

    static validaCriaProdutoUserNormal(res){
        expect(res.body.message).to.be.equals("Rota exclusiva para administradores")
    }


    static validaNaoCriaProduto(res){
        expect(res.body.message).to.be.equals("Já existe produto com esse nome")
    }


    static validaDeletaProdutoID(res){
        expect(res.body.message).to.be.equals("Registro excluído com sucesso")
    }

    static validaDeletaProdutoUserNormal(res){
        expect(res.body.message).to.be.equals('Rota exclusiva para administradores')

    }


    static validaEditaProduto(res){
        expect(res.body.message).to.be.equals('Registro alterado com sucesso')
    }

    static validaEditaProdutoUserNormal(res){
        expect(res.body.message).to.be.equals('Rota exclusiva para administradores')
    }

    static validaNaoEditaProduto(res){
        expect(res.body.message).to.be.equals("Já existe produto com esse nome")

    }



    // Funções de Validar - Carrinhos
    static validaBuscaCarrinho(res){
        expect(res.body.quantidade).to.be.greaterThan(0)
    }


    static validaBuscaCarrinhoID(res){
        expect(res.body.precoTotal).to.be.greaterThan(0)
    }


    static validaCriaCarrinho(res){
        expect(res.body.message).to.be.equals('Cadastro realizado com sucesso')
    }


    static validaConcluiCompra(res){
        expect(res.body.message).to.be.equals('Registro excluído com sucesso')
    }

    static validaNaoConcluiCompra(res){
        expect(res.body.message).to.be.equals('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
    }

    static validaCancelaCompra(res){
        expect(res.body.message).to.be.equals('Registro excluído com sucesso. Estoque dos produtos reabastecido')
    }

    static validaNaoCancelaCompra(res){
        expect(res.body.message).to.be.equals('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
    }

}