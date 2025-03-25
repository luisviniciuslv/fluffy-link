# Documentação: Autenticação no Fluffy-Link

## Visão Geral

Após a criação de uma conta no Fluffy-Link, o usuário pode se autenticar para acessar endpoints protegidos. A autenticação é baseada em  **JSON Web Tokens (JWT)** , que são gerados durante o login e devem ser enviados no **header** das requisições subsequentes.

---

## Fluxo de Autenticação

### 1. **Login**

O usuário realiza login fornecendo seu e-mail e senha. Se as credenciais forem válidas, um token JWT é gerado e retornado.

### 2. **Uso do Token**

O token JWT deve ser enviado no **header** das requisições para endpoints protegidos, utilizando o campo `x-access-token`.

### 3. **Validação do Token**

Os endpoints protegidos utilizam um middleware de autenticação que valida o token. Se o token for inválido ou ausente, a requisição é rejeitada com um erro de autenticação.

---

## Endpoints Relacionados

### 1. **Login**

 **Rota** : `POST /auth`
 **Descrição** : Gera um token JWT para autenticação.

#### Requisição

* **Headers** : Nenhum.
* **Body** :

**{**

**  **"email"**: **"string"**,**

**  **"password"**: **"string"

**}**

#### Respostas

* **200 OK** : Retorna o token JWT.

  **{**

  **  **"accessToken"**: **"string"

  **}**

* **401 Unauthorized** : E-mail ou senha inválidos.
* **400 Bad Request** : Payload inválido.

---

### 2. **Endpoints Protegidos**

Os seguintes endpoints requerem autenticação:

#### **Registrar Redirecionamento**

* **Rota** : `POST /user/redirect`
* **Descrição** : Registra um novo redirecionamento para o usuário autenticado.

#### **Obter Redirecionamentos**

* **Rota** : `GET /user/redirect`
* **Descrição** : Retorna os redirecionamentos do usuário autenticado.

#### **Deletar Redirecionamento**

* **Rota** : `DELETE /user/redirect/:id`
* **Descrição** : Remove um redirecionamento do usuário autenticado.

---

## Uso do Header de Autenticação

Para acessar endpoints protegidos, o token JWT gerado no login deve ser enviado no **header** da requisição:

### Exemplo de Header

**{**

**  **"x-access-token"**: **"seu-token-jwt-aqui"

**}**

[1 vulnerability]()

---

## Middleware de Autenticação

O middleware de autenticação verifica o token JWT enviado no header. Ele realiza as seguintes etapas:

1. **Verifica a Presença do Token** : Se o token não for fornecido, retorna um erro [401 Unauthorized](vscode-file://vscode-app/c:/Users/vinicius_tudoemnuvem/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html).
2. **Valida o Token** : Decodifica o token usando a chave secreta. Se o token for inválido ou expirado, retorna um erro [401 Unauthorized](vscode-file://vscode-app/c:/Users/vinicius_tudoemnuvem/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html).
3. **Anexa o ID do Usuário** : Se o token for válido, o ID do usuário é anexado ao header da requisição (`x-user-id`) para uso nos controladores.

### Exemplo de Resposta de Erro

* **Token Ausente** :

  **{**

  **  **"auth"**: **false**,**

  **  **"message"**: **"No token provided."

  **}**

* **Token Inválido** :

  **{**

  **  **"auth"**: **false**,**

  **  **"message"**: **"Failed to authenticate token."

  **}**

---

## Exemplo de Fluxo Completo

### 1. **Login**

 **Requisição** :

**curl** **-X** **POST** **http://localhost:1500/auth** **\**

**-H **"Content-Type: application/json"** **\

**-d **'{

**  "email": "john.doe@example.com",**

**  "password": "securepassword123"**

**}'**

 **Resposta** :

**{**

**  **"accessToken"**: **"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

**}**

---

### 2. **Acessar Endpoint Protegido**

 **Requisição** :

**curl** **-X** **GET** **http://localhost:1500/user/redirect** **\**

**-H **"Content-Type: application/json"** **\

**-H **"x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV**CJ9..."**

 **Resposta** :

**[**

**  **{

**    **"_id"**: **"12345"**,**

**    **"ext"**: **"abcde"**,**

**    **"links"**: **[

**      **{** **"to"**: **"**https://example.com**"**, **"percent"**: **100** **}

**    **]

**  **}

**]**

---

## Considerações Finais

* O token expira após  **10 horas** . Após a expiração, o usuário precisará realizar login novamente.
