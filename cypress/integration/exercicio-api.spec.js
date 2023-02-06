/// <reference types="cypress" />

describe('Testes da Funcionalidade Usuários', () => {

    it('Deve validar contrato de usuários', () => {
         //TODO: 
    });

    it('Deve listar usuários cadastrados', () => {
     cy.request({
          method: 'GET',
          url: 'usuarios'
     }).then((response) => {
          expect(response.status).to.equal(200)
      })
    });

    it('Deve cadastrar um usuário com sucesso', () => {
       cy.request({
          method: 'POST',
          url: 'usuarios',
          body: {
               "nome": "Tody Santos",
               "email": "tody@qa.com.br",
               "password": "teste@teste",
               "administrador": "true"
             }
       }).then((response) => {
          expect(response.status).to.equal(201)
          expect(response.body.message).to.equal('Cadastro realizado com sucesso')
          cy.log(response.body.authorization)
      })
    });

    it('Deve validar um usuário com email inválido', () => {
     cy.request({
          method: 'POST',
          url: 'usuarios',
          body: {
               "nome": "Matheus Santos",
               "email": "santos@qa.com.br",
               "password": "teste@teste",
               "administrador": "true"
             }
       }).then((response) => {
          expect(response.status).to.equal(400)
          expect(response.body.message).to.equal('Este email já está sendo usado')
          cy.log(response.body.authorization)
      })
    });

    it('Deve editar um usuário previamente cadastrado', () => {
     cy.request('usuarios').then(response => {
         let id = response.body.usuarios._id
         cy.request({
              method: 'PUT',
              url: 'usuarios/${id}',
              body: {
                       "nome": "Fila da Silva",
                       "email": "fila@qa.com.br",
                       "password": "teste@teste",
                       "administrador": "true",
                     }
         }).then((response) => {
              expect(response.status).to.equal(201)
              expect(response.body.message).to.equal('Cadastro realizado com sucesso')
              cy.log(response.body.authorization)
          })
     })
   });

   it.only('Deve deletar um usuário previamente cadastrado', () => {
     let usuarios = 'usuario ${Math.floor(Math.random() * 10000000000)}'
     cy.usuarios('mathewz', 'mathewz@gmail.com', 'testes@testes')
     .then(response => {
      let id = response.body._id 
          cy.request({
          method: 'DELETE',
          url: 'usuarios/${id}',
       })
     })
    });

});
