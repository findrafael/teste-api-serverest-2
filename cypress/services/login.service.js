const URL_USUARIOS   = '/usuarios/'
const URL_LOGIN     = '/login'

export default class Login {
    
    static buscarLoginUsuario(){
            return cy.request(URL_USUARIOS).then(res => {
                const array = res.body.usuarios
                const ultimoemail = array[array.length - 1].email
                const ultimasenha = array[array.length -1].password
                return {
                    email: ultimoemail,
                    senha: ultimasenha
                }
            })
    }
    
    static fazerLogin(email, senha){
            return cy.request({
                method: 'POST',
                url: URL_LOGIN,
                failOnStatusCode: false,
                body: {
                    "email": email,
                    "password": senha
                }
            })
    }

    static naoFazerLogin(email, senha){
        return cy.request({
            method: 'POST',
            url: URL_LOGIN,
            failOnStatusCode: true,
            body: {
                "email": email,
                "password": senha
            }
        })
}
    
    static salvarBearer(res){
            Cypress.env('bearer', res.body.authorization.slice(7))
    }

    
}