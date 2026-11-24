# Respostas — Pipes

## 1. Por que não trocar `'cartao'` por `'Cartão de crédito'` dentro do objeto?

Porque isso altera o **dado**, e não só a tela. O sistema e o backend esperam o código `cartao`.
Ao editar o participante e salvar, o objeto voltaria com `'Cartão de crédito'`, que não é um
`FormaPagamento` válido: o dado gravado ficaria errado e o `Record` do pipe não o reconheceria mais.
O pipe resolve isso porque traduz só na hora de mostrar e deixa o objeto intacto.

## 2. `{{ evento.titulo | slice:0:10 | uppercase }}`

"Pegue `evento.titulo`, passe por `slice` usando 0 e 10 (do caractere 0 ao 10), depois passe o
resultado por `uppercase`." Para `'Semana de Tecnologia'` o `slice` devolve `'Semana de '`
(com o espaço no final) e a saída é **`SEMANA DE `**.

## 3. Por que devolver o valor original quando o telefone não é reconhecido?

Porque o pipe só formata, não valida. Devolver `''` faz o dado sumir da tela sem erro algum, e
`'inválido'` esconde o que a pessoa digitou. Devolvendo `'123'` como chegou, nenhuma informação
se perde e o problema continua visível para quem lê. Dizer se o telefone está errado é trabalho
da validação do formulário.

## 4. Por que o `diasPara` recebe o `hoje` como parâmetro?

Sem isso, o pipe leria o relógio do computador, e o resultado dependeria do dia em que o teste roda.
Um teste que passa hoje falharia amanhã, e seria impossível verificar de forma fixa casos como
"Hoje", "Amanhã" e "Faltam 10 dias". Com `hoje` como parâmetro, o teste passa `new Date(2026, 10, 10)`
e a tabela vale em qualquer dia do ano. Na tela ninguém passa o segundo argumento, então vale a data real.

## 5. Por que "Hoje" não vira "Encerrado" à meia-noite?

O pipe é puro: só roda de novo quando o valor de entrada muda. A entrada é a string da data do
evento (`'2026-11-20'`), que não muda à meia-noite. O Angular não sabe que o relógio andou, então
reaproveita o último resultado e a tela continua mostrando "Hoje" até recarregar a página ou até a
data do evento mudar.

## 6. Mostrar só quem pagou por Pix: pipe ou `computed`?

**`computed`.** Pipe serve para formatar *um valor* ("pegue este valor e mostre assim"). Filtrar é
transformar uma *lista*. Além disso, o pipe puro compara a referência da entrada, então um `push`
na lista não o faz rodar de novo e a tela ficaria desatualizada. O `computed` recalcula sempre que
os signals de que depende mudam, e o resultado fica pronto para ser reutilizado.

## Desafio

Os três pipes estão em `src/app/pipes/` (`titulo`, `resumo`, `mascaraEmail`), gerados pelo CLI, com
testes, e aparecem na tela de participantes.

### 3. `mascaraEmail`: LGPD e limite do pipe

O e-mail é **dado pessoal**: a LGPD pede coletar e expor só o necessário (princípio da necessidade) e
proteger o dado. Uma lista pública não precisa mostrar o endereço inteiro, então mascarar reduz a exposição.
Mas o pipe **não protege o dado de verdade**: ele só muda o que aparece na tela. O e-mail completo
já foi enviado pelo backend e baixado pelo navegador, e qualquer pessoa o vê na aba *Network* do DevTools,
no JSON da resposta. A proteção real é no backend: não enviar o e-mail, ou enviá-lo já mascarado.
