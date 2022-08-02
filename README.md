# Testes Automatizados - Serverest.dev

Este é um projeto de teste da API Serverest, desenvolvido durante um estágio realizado.

## 🚀 Como começar?

Essas instruções permitirão que você clone uma cópia dos nossos testes e os execute na sua máquina, de forma simples e fácil.

### 📋 Pré-requisitos

Para começarmos, você precisará de instalar algumas coisas:

- Git- https://git-scm.com/downloads

- NodeJS - https://nodejs.org/en/download/

- Visual Studio Code (IDE recomendada) - https://code.visualstudio.com/download

## 🔧 Instalação

Siga os passos abaixo para fazer o processo de clonagem e configuração da aplicação.

### ⚡ Clonando o repositório

Copie este link abaixo e deixe-o na área de transferência:
```
https://github.com/findrafael/teste-api-serverest-2.git
```

Dentro de uma pasta vazia, clique com o botão direito, abra o Git Bash e digite o seguinte comando:

```
git clone <insira o link aqui>
```

Pressione Enter no teclado. Uma pasta será criada no seu diretório com todos os arquivos dos testes.

### 🛠 Configurando a aplicação

Com o VS Code na raiz da pasta onde se encontram os arquivos, abra um terminal pressionando as teclas:

```
Ctrl + Shift + '
```

Em seguida, digite o comando para baixar os módulos do NodeJS:

```
npm i -yes
```

Sua aplicação está devidamente configurada, agora é só executar os testes.



## ⚙️ Executando os testes

Você pode executar o teste de duas maneiras:

🎀 - Usando o ambiente de produção (serverest.dev)

✨ - Usando o ambiente de desenvolvimento (localhost:3000)

(ps: Ao usar o ambiente de desevolvimento você precisará baixar uma versão local da Serverest no seu computador, isso será mostrado ao decorrer deste tutorial.)

### 🎀 - Executando em ambiente de produção 

Com o VS Code aberto na pasta raiz do projeto, execute o seguinte comando para abrir o Cypress em ambiente de produção:
```
npm run cy:open:prod
```

Uma janela se abrirá, e nela serão mostrados todos os testes disponíveis para serem executados.

Clique no botão Run 4 integration specs, para executar os testes.

Uma janela do navegador abrirá, e todos os testes serão executados.

Prontinho, você executou os testes da Serverest em abiente de produção no seu computador.

### ✨ - Executando em ambiente de desenvolvimento

Com o VS Code aberto na pasta raiz do projeto, execute o seguinte comando para baixar e executar uma cópia local do Serverest no seu computador:
```
npx serverest@latest
```

Após isso, em um novo terminal execute o Cypress em ambiente de desenvolvimento:
```
npm run cy:open
```

Uma janela se abrirá, e nela serão mostrados todos os testes disponíveis para serem executados.

Clique no botão Run 4 integration specs, para executar os testes.

Uma janela do navegador abrirá, e todos os testes serão executados.

Prontinho, você executou os testes da Serverest em abiente de produção no seu computador.

## 👨‍💻 - Gerando o relatório de execução

Execute o seguinte comando para gerar o relatório de execução:
```
npm test
```
⚡ O arquivo do relatório de execução se encontra na pasta:
```
/cypress/reports/mochareports/report.html
```

## 🛠️ Construído com

* [NodeJS](http://www.nodejs.org/en/download)
* [VS Code](https://code.visualstudio.com/download)
* [Cypress](https://cypress.io)
* [Faker-BR](https://www.npmjs.com/package/faker-br)

## ✒️ Autores

* **Rafael Luna** - [findrafael](https://github.com/findrafael)