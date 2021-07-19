<h1 align="center">
  <img src="public/icons/icon-192x192.png" height="100" /><br>
  Jornada Solar
</h1>

<p align="center">
  Aplicativo do <a href="https://jornadasolar.grupotesseract.vercel.app/" target="_blank" rel="nofollow noopener">Jornada Solar</a> criado com <a href="https://nextjs.org/" target="_blank" rel="nofollow noopener">Next</a>
</p>

<p align="center">
  <a href="#instalação">Instalação</a> •
  <a href="#notas">Testes</a>
</p>

## Instalação 🚀

```shell
git clone https://github.com/grupotesseract/jornadasolar.git
cd jornadasolar
yarn install
yarn dev
```

## Testes 🔧

Testes unitários com <a href="https://jestjs.io/" target="_blank" rel="nofollow noopener">Jest</a> e <a href="https://enzymejs.github.io/enzyme/" target="_blank" rel="nofollow noopener">Enzyme</a>

```shell
yarn test
```

Testes de integração com <a href="https://jestjs.io/" target="_blank" rel="nofollow noopener">Cypress</a>

```shell
yarn cypress
```

> ❗ **Nota**: Para rodar os testes de integração é necessário adicionar os dados da conta de serviço do firebase. Acesse firebase _(banco de dados de desenvolvimento)_ e em Configurações do projeto > Contas de serviço, clique em "Gerar nova chave privada". Salve o arquivo como `firebaseServiceAccount.json` em `/cypress/plugins/firebaseServiceAccount.json`.

## Firebase funcions 🔧

Instalar CLI do Firebase

```shell
 npm install -g firebase-tools
 firebase login
```

Acessar pasta das funcions

```shell
 cd functions/
```

Para testar local

```shell
 npm run serve
```

Fazer deploy das funções no ambiente de desenvolvimento

```shell
firebase use default
npm run deploy
```

Fazer deploy das funções no ambiente de produção

```shell
firebase use production
npm run deploy
```
