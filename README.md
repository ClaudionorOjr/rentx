# Rentx
> ### API para aluguel de carros 
Projeto da Trilha Node.js do Ignite. Conteúdo criado pela [Rocketseat](https://www.rocketseat.com.br/).

## 🔧 Tecnologias
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [dayjs](https://day.js.org/en/)
- [docker](https://www.docker.com/)
- [express](https://expressjs.com/)
- [jest](https://jestjs.io/)
- [jsonwebtoken](https://jwt.io/)
- [multer](https://www.npmjs.com/package/multer)
- [nodemailer](https://nodemailer.com/about/)
- [swagger](https://swagger.io/)
- [ts-node-dev](https://www.npmjs.com/package/ts-node-dev)
- [tsyringe](https://www.npmjs.com/package/tsyringe)
- [typeorm](https://typeorm.io/)

## 🚀 Getting Started
É necessário ter o `yarn`, `docker` e `docker-compose` instalados em sua máquina.
```
# Instalação de dependências
$ yarn

# Criar containers
$ docker-compose up

# Iniciar o projeto
$ docker-compose start

# Logs
$ docker logs rentx -f // flag -f para rodar em background
```

## Requisitos funcionais do sistema:
### Cadastro de carro  

**Requisitos Funcionais – RF**  
- Deve ser possível cadastrar um novo carro.  

[//]: # (Requisitos que não estão ligados diretamente com a aplicação, as regras de negócio.)  
**Requisitos Não funcionais – RNF**  
_

[//]: # (Regras por trás dos requisitos.)  
**Regra de Negócio**  
- Não deve ser possível cadastrar um carro com uma placa já existente.  
<!-- - Não deve ser possível alterar a placa de um carro já cadastrado.   -->
- O carro deve ser cadastrado, por padrão, com disponibilidade.  
- O usuário responsável pelo cadastro deve ser um usuário administrador.  

### Listagem de carros  

**Requisitos Funcionais – RF**  
- Deve ser possível listar todos os carros disponíveis.
- Deve ser possivel listar todos os carros disponíveis pelo nome da categoria.  
- Deve ser possivel listar todos os carros disponíveis pelo nome da marca.  
- Deve ser possivel listar todos os carros disponíveis pelo nome do carro.  
  
**Requisitos Não funcionais – RNF**  
_

**Regra de Negócio**  
- O usuário não precisa estar logado no sistema.  

### Cadastro de especificação no carro  

**Requisitos Funcionais – RF**  
- Deve ser possível cadastrar uma especificação para um carro.
- Deve ser possível listar todas as especificações.  
- Deve ser possível listar todos os carros.    
  
**Requisitos Não funcionais – RNF**  
_

**Regra de Negócio**  
- Não deve ser possível cadastrar uma especificação para um carro não cadastrado.  
- Não deve ser possível já existente para o mesmo carro.  
- O usuário responsável pelo cadastro deve ser um usuário administrador.  

### Cadastro de imagens do carro

**Requisitos Funcionais – RF**  
- Deve ser possível cadastrar a imagem do carro.  
- Deve ser possível listar todos os carros.  

**Requisitos Não funcionais – RNF**  
- Utilizar o multer para upload dos arquivos.  

**Regra de Negócio**  
- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.  
- O usuário responsável pelo cadastro deve ser um usuário administrador.  

### Aluguel de carro

**Requisitos Funcionais – RF**  
- Deve ser possível cadastrar um aluguel.  

**Requisitos Não funcionais – RNF**  
_

**Regra de Negócio**  
- O aluguel deve ter duração mínima de 24 hora.  
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.  
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.  
- O usuário deve estar logado na aplicação.  
- Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível.  

### Devolução de carro

**Requisitos Funcioonais – RF**
- Dever ser possível realizar a devolução do carro.  

**Requisitos Não Funcionais – RNF**  
–  

**Regra de Negócio**
- Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa.
- Ao realizar a devoluação, o carro devera ser liberado para outro aluguel.
- Ao realizar a devoluação, o usuário deverá ser liberado para outro aluguel.
- Ao realizar a devoluação, deverá ser calculado o total do aluguel.
- Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso.
- Caso haja multa, deverá ser somada ao total do aluguel.

### Listagem de alugueis para usuário

**Requisitos Funcionais – RF**  
- Deve ser possível realizar a busca de todos os alugueis para o usuário.  

**Requisitos Não funcionais – RNF**  
–  

**Regra de Negócio**  
- O usuário deve estar logado na aplicação.  

### Recuperar senha

**Requisitos Funcionais – RF**  
- Deve ser possível o usuário recuperar a senha informando o e-mail.  
- O usuário deve receber um e-mail com o passo a passo para a recuperação de senha.  
- O usuário deve conseguir inserir uma nova senha.  

**Requisitos Não funcionais – RNF**  
–  

**Regra de Negócio**  
- O usuário precisa informar uma nova senha.  
- O link enviado para a recuperação deve expirar em 3 horas.  

<!-- <style>
b { color: Blue}
g { color: Green }
o { color: Orange }
r { color: Red }
</style> -->