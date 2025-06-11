# Fluffy-Link: Documentação Geral

## Visão Geral da Aplicação

O **Fluffy-Link** é uma aplicação que permite aos usuários criar contas, autenticar-se e gerenciar redirecionamentos personalizados. A aplicação utiliza **JSON Web Tokens (JWT)** para autenticação e oferece funcionalidades como:

1. **Criação de Conta**: Os usuários podem criar contas fornecendo um nome de usuário, e-mail e senha. Um código de verificação é enviado por e-mail para validar a criação da conta.
2. **Autenticação**: Após a criação da conta, os usuários podem realizar login para acessar endpoints protegidos.
3. **Gerenciamento de Redirects**: Usuários autenticados podem criar, listar e deletar redirects personalizados. Cada redirect pode conter múltiplos links com probabilidades associadas.

A aplicação é construída utilizando **Node.js**, **Express**, **Mongoose** para integração com o MongoDB, e **Nodemailer** para envio de e-mails.

---

## Ordem de Leitura dos Documentos

Para melhor compreensão e utilização da aplicação, siga a ordem abaixo ao ler os documentos que estão na pasta docs:

1. **[Configuração do Arquivo .env](docs/configDotEnv.md)** Este documento explica como configurar o arquivo `.env` para garantir o funcionamento adequado da aplicação, incluindo a conexão com o banco de dados e o envio de e-mails.
2. **[Criação de Conta](docs/criacaoDeContaDoc.md)** Este documento explica como criar uma conta no Fluffy-Link, incluindo o fluxo de solicitação de criação e verificação do código de validação.
3. **[Autenticação](docs/authDoc.md)** Após criar uma conta, leia este documento para entender como realizar login e utilizar o token JWT para acessar endpoints protegidos.
4. **[Gerenciamento de Redirects](docs/redirectsDoc.md)** Por fim, leia este documento para aprender a criar, listar e deletar redirects personalizados, além de entender as regras de configuração de links.
5. **[Utilização de Redirects](docs/utilizacao.md)** Após criar os redirects, leia este documento para aprender como utilizá-los através de requisições **GET** no formato `/:username/:ext` e redirecionar usuários para os links configurados.

---

## Considerações Finais

Certifique-se de seguir a ordem acima para configurar e utilizar a aplicação corretamente. Além disso, configure as variáveis de ambiente no arquivo `.env` para garantir o funcionamento adequado da aplicação, incluindo a conexão com o banco de dados e o envio de e-mails.
