# Documentação: Gerenciamento de Redirects no **Fluffy-Link

**## Visão Geral**

**O Fluffy-Link permite que usuários autenticados **gerenciem redirects personalizados. Um redirect **pode conter múltiplos links, cada um com uma **porcentagem associada (`percent`) que define a **probabilidade de redirecionamento para aquele **link.

**### Modelo de Redirect**

**Um redirect é representado pelo seguinte modelo:**

**```json**

**{**

**  "_id": "string",**

**  "ext": "string",** (opicional, gerado automaticamente caso não informado)

**  "links": [**

**    {**

**      "to": "string",** (todos os links devem seguir o padrão https:// co°m um domínio.)

**      "percent": "number (opcional)"**

**    }**

**  ]**

**}**

* **`_id`** : Identificador único do redirect.
* **`ext`** : Extensão única para acessar o redirect.
* **`links`** : Lista de links associados ao redirect.
* **`to`** : URL para onde o usuário será redirecionado.
* **`percent`** : (Opcional) Probabilidade de redirecionamento para este link. A soma de todos os valores de `percent` deve ser igual a 100 quando houver múltiplos links.

### Regras para o Campo `percent`

* Se houver  **apenas um link** , o campo `percent`  **não deve ser informado** .
* Se houver  **múltiplos links** , o campo `percent` é **obrigatório** para cada link, e a soma de todos os valores deve ser  **igual a 100** .
* Links duplicados não são permitidos.

---

## Endpoints

### 1. **Criar Redirect**

 **Rota** : `POST /user/redirect`
 **Descrição** : Registra um novo redirect para o usuário autenticado.

#### Requisição

* **Headers** :
* `x-access-token`: Token JWT do usuário autenticado.
* **Body** :

**{**

**  **"ext"**: **"string (opcional)"**,**

**  **"links"**: **[

**    **{

**      **"to"**: **"string"**,**

**      **"percent"**: **"number (opcional)"

**    **}

**  **]

**}**

#### Respostas

* **200 OK** : Redirect criado com sucesso.
* **400 Bad Request** : Payload inválido ou soma de `percent` incorreta.
* **401 Unauthorized** : Token de autenticação ausente ou inválido.

---

### 2. **Recuperar Redirects**

 **Rota** : `GET /user/redirect`
 **Descrição** : Retorna todos os redirects do usuário autenticado.

#### Requisição

* **Headers** :
* `x-access-token`: Token JWT do usuário autenticado.

#### Respostas

* **200 OK** : Lista de redirects do usuário.
* **401 Unauthorized** : Token de autenticação ausente ou inválido.

Exemplo de resposta:

**[**

**  **{

**    **"_id"**: **"12345"**,**

**    **"ext"**: **"abcde"**,**

**    **"links"**: **[

**      **{

**        **"to"**: **"**https://example.com**"**,**

**        **"percent"**: **100

**      **}

**    **]

**  **}

**]**

---

### 3. **Deletar Redirect**

 **Rota** : `DELETE /user/redirect/:id`
 **Descrição** : Remove um redirect do usuário autenticado.

#### Requisição

* **Headers** :
* `x-access-token`: Token JWT do usuário autenticado.
* **Parâmetros** :
* `id`: Identificador único do redirect a ser deletado.

#### Respostas

* **200 OK** : Redirect deletado com sucesso.
* **401 Unauthorized** : Token de autenticação ausente ou inválido.
* **404 Not Found** : Redirect não encontrado.

---

## Considerações Finais

* Certifique-se de que o token JWT seja enviado no header `x-access-token` para acessar os endpoints protegidos.
* Ao criar redirects com múltiplos links, valide que a soma dos valores de `percent` seja exatamente 100.
* Utilize o campo `ext` para criar extensões personalizadas para os redirects. Caso não seja informado, uma extensão única será gerada automaticamente.
