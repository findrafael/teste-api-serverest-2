import Login from '../services/login.service'
import validaServerest from './validaServerest.service'

export default class Serverest {

    static fazerlogin(){
        Login.buscarLoginUsuario().then(usuario => {
            Login.fazerLogin(usuario.email, usuario.senha).then(res =>{
                validaServerest.validaFazerLogin(res)
                Login.salvarBearer(res)
            })
    })

}

}