# Configuração do Arquivo [.env](vscode-file://vscode-app/c:/Users/vinicius_tudoemnuvem/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)

Para configurar corretamente o arquivo [.env](vscode-file://vscode-app/c:/Users/vinicius_tudoemnuvem/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) do projeto, siga as instruções abaixo:

## 1. Configuração do Banco de Dados (MongoDB)

O projeto utiliza um banco de dados MongoDB. Para isso, é necessário ter um servidor MongoDB rodando. Caso ainda não tenha configurado um, consulte a [documentação oficial do MongoDB](https://www.mongodb.com/) para instruções sobre como criar e configurar um servidor MongoDB.

No arquivo [.env](vscode-file://vscode-app/c:/Users/vinicius_tudoemnuvem/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html), configure a variável `DATABASE_ADDRESS` com a string de conexão do seu servidor MongoDB.

---

## 2. Configuração do E-mail (Gmail)

O projeto utiliza um e-mail do tipo Gmail para envio de mensagens. Para configurar o e-mail, siga os passos abaixo:

1. Acesse [Google Minha Conta - Segurança](https://myaccount.google.com/security) com o e-mail desejado.
2. Na aba  **"Verificação em duas etapas"** , ative a verificação em duas etapas, caso ainda não esteja ativada.
3. Após ativar a verificação em duas etapas, acesse a aba  **"Senhas de app"** .
4. Crie uma nova senha de app com o nome de sua preferência.
5. Copie a senha gerada e cole-a na variável `PASSWORD_EMAIL_ADDRESS` no arquivo [.env](vscode-file://vscode-app/c:/Users/vinicius_tudoemnuvem/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html).

---

### Exemplo de Configuração do [.env](vscode-file://vscode-app/c:/Users/vinicius_tudoemnuvem/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)

**EMAIL_ADDRESS**=**"seu-email@gmail.com"**

**PASSWORD_EMAIL_ADDRESS**=**"sua-senha-de-app"**

**DATABASE_ADDRESS**=**"sua-string-de-conexao-mongodb"**

**SECRET**=**"sua-chave-secreta"**
