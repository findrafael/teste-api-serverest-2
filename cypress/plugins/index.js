/// <reference types="cypress" />
// ***********************************************************
const fs = require('fs-extra');
const path = require('path');

function buscaConfig(arquivo) {
  const filePath = path.resolve('.','cypress','config',`${arquivo}.json`)
  return fs.readJSON(filePath)
}

module.exports = (on, config) => {
  const arquivo = config.env.configFile || 'DEV'
  return buscaConfig(arquivo)
}
