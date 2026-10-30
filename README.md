# Nordeste Loc Fest · 15 anos

Interface do convite da celebração dos 15 anos da **Nordeste Locações**, construída em React e TypeScript a partir da arte oficial. A composição preserva o fundo oficial em degradê azul e coral, as marcas, os cartões translúcidos e o destaque coral.

## Evento e orientações

- **Data:** 27/11/2026, sexta-feira.
- **Horário:** a partir das 12h30.
- **Local:** Barraca Gran Royal, Praia do Futuro, Fortaleza/CE.
- **Dress code:** look confortável e adequado à celebração.

Não será permitido o uso de:

- Camisas de partidos políticos ou de times de futebol.
- Roupas de banho, incluindo biquínis e maiôs.
- Saídas de praia.

Acompanhantes, transporte, alimentação, atrações e horário de encerramento não são apresentados como confirmados.

## Interface

- Seções reais em HTML: apresentação, informações do evento, dress code e mensagem de encerramento.
- Textos selecionáveis e layout responsivo; no celular, o local ocupa uma linha própria para melhorar a leitura.
- Marcas preservadas da arte oficial, exibidas separadamente dos textos e cartões.
- Ícones vetoriais, cartões translúcidos, contornos e assinatura tipográfica.
- Animações de entrada ao rolar, brilho suave no fundo, pulsação do ornamento e efeitos de interação.
- Respeito à preferência de movimento reduzido do dispositivo.
- O cartão da **data** baixa um arquivo `.ics` para adicionar o evento à agenda, com início às 12h30 de Fortaleza e sem inventar horário de término.
- O cartão do **local** abre uma busca pelo estabelecimento no mapa.

Não há formulário de presença, mural, playlist ou painel de dados. A página não coleta dados nem acessa o armazenamento local do navegador.

## Executar localmente

Com Bun, usando o lockfile versionado:

```sh
bun install --frozen-lockfile
bun run dev
```

Ou com Node.js e npm compatíveis com o Vite instalado:

```sh
npm install
npm run dev
```

Acesse o endereço informado no terminal. A porta inicial é 3000; se estiver ocupada, o Vite utiliza a próxima disponível. Não são necessários arquivo `.env` ou chaves de API.

## Comandos

| Comando | Finalidade |
| --- | --- |
| `bun run dev` | Desenvolvimento local. |
| `bun run lint` | Verificação de tipos. |
| `bun run build` | Build de produção em `dist/`. |
| `bun run preview` | Conferência local do build. |
| `bun run clean` | Limpeza de `dist/`, compatível com Windows. |

Com npm, substitua `bun run` por `npm run`.

## Arquivos principais

| Arquivo | Conteúdo |
| --- | --- |
| `src/App.tsx` | Seções, cartões e animações de entrada. |
| `src/index.css` | Layout, transparências, tipografia e animações. |
| `src/components/OfficialMark.tsx` | Exibição isolada das marcas oficiais da arte. |
| `src/utils/calendar.ts` | Geração do convite de calendário. |
| `src/event.ts` | Informações reais, regras e link do mapa. |
| `src/components/GradientFrame.tsx` | Ornamentos vetoriais do fundo, sem imagens rasterizadas. |
| `src/assets/images/nordeste-loc-fest-convite-final.png` | Referência original e origem das marcas. |
| `index.html` | Metadados e carregamento das fontes. |

A arte completa não é usada como interface. O fundo é feito com gradientes CSS e os ornamentos são vetoriais. As marcas são preservadas da arte; cartões, textos, ícones e regras são renderizados separadamente.

O degradê azul e coral foi recriado em código a partir da referência oficial, com camadas de gradientes lineares e radiais. As faixas coloridas usam CSS e os contornos usam SVG, permanecendo nítidos em qualquer resolução. As imagens anteriores de fundo são materiais históricos e não são carregadas pela interface.

Ao alterar o evento, revise também a data em `src/utils/calendar.ts`, o atributo `dateTime` em `src/App.tsx`, os metadados e as marcas que contêm o número de anos. A versão `BAILE_NORDESTE_15_ANOS.html` permanece como reprodução estática da arte anterior e não é a entrada da aplicação React.

As fontes DM Sans e Allura são carregadas pelo Google Fonts. O mapa e as fontes externas dependem de internet; fontes locais de fallback são usadas quando necessário.

## Publicação

```sh
bun run lint
bun run build
```

Publique `dist/` em uma hospedagem estática. Para hospedar em um subdiretório, configure `base` em `vite.config.ts` antes de gerar o build.
