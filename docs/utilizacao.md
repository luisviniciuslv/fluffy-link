# Utilização de Redirecionamentos no Fluffy-Link

## Visão Geral

Após registrar um redirecionamento no Fluffy-Link, você pode utilizá-lo para redirecionar usuários para os links configurados. O redirecionamento é acessado através de uma requisição **GET** utilizando o `username` e a `ext` configurados.

---

## Endpoint de Redirecionamento

### **Acessar Redirecionamento**

- **Rota**: `GET /:username/:ext`
- **Descrição**: Redireciona o usuário para um dos links configurados no redirecionamento, com base nas probabilidades definidas.

#### Requisição

- **Headers**: Nenhum.
- **Parâmetros de Rota**:
  - `username`: Nome de usuário associado ao redirecionamento.
  - `ext`: Extensão única configurada ou gerada automaticamente para o redirecionamento.

#### Respostas

- **302 Found**: Redireciona o usuário para o link configurado.
- **404 Not Found**: Redirecionamento não encontrado para o `username` e `ext` fornecidos.

---

## Exemplo de Uso

### 1. **Acessar Redirecionamento**

#### Requisição

```sh
curl -X GET http://localhost:1500/john_doe/abc123
```

#### Resposta

O servidor redirecionará o usuário para o link configurado. Por exemplo:

* Se o redirecionamento configurado contém apenas um link, o usuário será redirecionado diretamente para esse link.
* Se o redirecionamento contém múltiplos links com probabilidades (`percent`), o servidor escolherá um link com base nas probabilidades definidas.
