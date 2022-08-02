import Ajv from 'ajv'
const ajv = new Ajv({allErrors: true, verbose: true, strict: false})

export default class validacao{

    static validaContrato(res, schema, status){
        cy.log('Realizando testes de contrato')
        cy.fixture(`schemas/${schema}/${status}.json`).then( schema => {
            const validate = ajv.compile(schema)
            const valid = validate(res.body)

            if(!valid){
                var errors = ''
                for(let each in validate.errors){
                    let err = validate.errors[each]
                    errors += `\n${err.instancePath} ${err.message}, but receive ${typeof err.data}`
                }
                throw new Error('Erros encontrados na validação do contrato, por favor verifique: ' + errors)
            } else {
                cy.log('Nenhum erro de contrato encontrado.')
            }
        })
    }
}