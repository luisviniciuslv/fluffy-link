# Documentação: Criação de Conta no Fluffy-Link

## Visão Geral

O processo de criação de conta no Fluffy-Link é dividido em duas etapas principais:

1. **Solicitação de Criação de Conta** : O usuário fornece um nome de usuário, e-mail e senha. Um código de verificação é enviado para o e-mail informado.
2. **Verificação do Código** : O usuário informa o código recebido por e-mail para concluir a criação da conta.

---

## Endpoints

### 1. **Solicitar Criação de Conta**

 **Rota** : `POST /createAcc`
 **Descrição** : Cria uma solicitação de criação de conta e envia um código de verificação para o e-mail do usuário.

#### Requisição

* **Headers** : Nenhum.
* **Body** :

  **{**

  **  **"username"**: **"string"**,**

  **  **"email"**: **"string"**,**

  **  **"password"**: "string" **

  **}**

#### Respostas

* **201 Created** : Solicitação criada com sucesso. O código de verificação foi enviado para o e-mail.
* **400 Bad Request** : Nome de usuário, e-mail ou senha não foram fornecidos.
* **409 Conflict** : Já existe uma solicitação de criação de conta para o e-mail informado ou o nome de usuário já está em uso.
* **500 Internal Server Error** : Erro ao enviar o e-mail ou outro erro interno.

---

### 2. **Verificar Código de Criação**

 **Rota** : `PUT /createAcc`
 **Descrição** : Verifica o código de criação enviado para o e-mail e cria a conta do usuário.

#### Requisição

* **Headers** : Nenhum.
* **Body** :

  **{**

  **  **"email"**: **"string"**,**

  **  **"code"**: **"string"

  **}**

#### Respostas

* **200 OK** : Conta criada com sucesso.
* **400 Bad Request** : E-mail ou código não foram fornecidos.
* **404 Not Found** : Solicitação de criação de conta não encontrada para o e-mail informado.
* **400 Bad Request** : O código informado está incorreto.
* **500 Internal Server Error** : Erro interno.

---

## Fluxo de Funcionamento

### 1. **Solicitação de Criação de Conta**

1. O cliente faz uma requisição `POST /createAcc` com [username](vscode-file://vscode-app/c:/Users/vinicius_tudoemnuvem/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html), [email](vscode-file://vscode-app/c:/Users/vinicius_tudoemnuvem/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) e [password](vscode-file://vscode-app/c:/Users/vinicius_tudoemnuvem/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html).
2. O backend verifica:
   * Se o e-mail já está associado a um usuário existente.
   * Se o nome de usuário já está em uso.
   * Se já existe uma solicitação de criação de conta para o e-mail informado.
3. Caso nenhuma restrição seja violada:
   * Um código de verificação é gerado.
   * A solicitação de criação de conta é salva no banco de dados.
   * Um e-mail contendo o código de verificação é enviado para o usuário.

### 2. **Verificação do Código**

1. O cliente faz uma requisição `PUT /createAcc` com [email](vscode-file://vscode-app/c:/Users/vinicius_tudoemnuvem/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) e [code](vscode-file://vscode-app/c:/Users/vinicius_tudoemnuvem/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html).
2. O backend verifica:
   * Se existe uma solicitação de criação de conta para o e-mail informado.
   * Se o código informado corresponde ao código salvo no banco de dados.
3. Caso as verificações sejam bem-sucedidas:
   * A solicitação de criação de conta é removida do banco de dados.
   * A conta do usuário é criada com os dados fornecidos.

---

## Estrutura de Dados

### Solicitação de Criação de Conta ([ICreationAccount](vscode-file://vscode-app/c:/Users/vinicius_tudoemnuvem/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html))

**interface** **ICreationAccount** **{**

**  **username**:** **string**;

**  **email**:** **string**;

**  **password**:** **string**;

**  **code**:** **string**;

**  **created_at**:** **Date**;

**}**

### Usuário ([IUser](vscode-file://vscode-app/c:/Users/vinicius_tudoemnuvem/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html))

**interface** **IUser** **{**

**  **_id**:** **string**;

**  **username**:** **string**;

**  **email**:** **string**;

**  **password**:** **string**;

**  **redirects**:** **Redirect**[**]**;

**}**

---

## Exceções Tratadas

* **UsernameOrEmailOrPasswordNotProvided** : Nome de usuário, e-mail ou senha não foram fornecidos.
* **UserAlreadyExistsException** : O e-mail ou nome de usuário já está em uso.
* **CreationAccCodeAlreadyExists** : Já existe uma solicitação de criação de conta para o e-mail informado.
* **CreationAccountCodeNotExists** : Solicitação de criação de conta não encontrada.
* **codesAreNotTheSame** : O código informado está incorreto.

---

## Fluxo de Código

### Serviço: [CreationAccountService](vscode-file://vscode-app/c:/Users/vinicius_tudoemnuvem/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)

#### Método: [createCreationRequest](vscode-file://vscode-app/c:/Users/vinicius_tudoemnuvem/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)

1. Verifica se o e-mail ou nome de usuário já existem.
2. Gera um código de verificação.
3. Salva a solicitação de criação no banco de dados.
4. Envia o código de verificação por e-mail.

#### Método: [verifyCodeAndCreateUser](vscode-file://vscode-app/c:/Users/vinicius_tudoemnuvem/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)

1. Verifica se a solicitação de criação existe.
2. Valida o código informado.
3. Cria o usuário no banco de dados.

---

## Exemplo de Uso

### Solicitar Criação de Conta

 **Requisição** :

**curl** **-X** **POST** **http://localhost:1500/createAcc** **\**

**-H **"Content-Type: application/json"** **\

**-d **'{

**  "username": "john_doe",**

**  "email": "john.doe@example.com",**

**  "password": "securepassword123"**

**}'**

 **Resposta** :

**{**

**  **"message"**: **"Creation request created"

**}**

---

### Verificar Código

 **Requisição** :

**curl** **-X** **PUT** **http://localhost:1500/createAcc** **\**

**-H **"Content-Type: application/json"** **\

**-d **'{

**  "email": "john.doe@example.com",**

**  "code": "123456"**

**}'**

 **Resposta** :

**{**

**  **"message"**: **"User created successfully"

**}**

---

## Considerações Finais

* O código de verificação expira após  **2 minutos** .
* Certifique-se de configurar corretamente as variáveis de ambiente no arquivo [.env](vscode-file://vscode-app/c:/Users/vinicius_tudoemnuvem/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) para o envio de e-mails e conexão com o banco de dados.
* Utilize o middleware de tratamento de erros para capturar e retornar mensagens de erro apropriadas.
