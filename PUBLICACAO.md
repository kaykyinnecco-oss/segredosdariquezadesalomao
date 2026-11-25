# Coleção Salomão

## Abrir a prévia

Abra `site/index.html` com um duplo clique. As capturas para revisão em celular e desktop ficam em `previas/`.

## Configurar a página

Edite `site/config.js`, salve e atualize a página no navegador.

| Campo | O que editar |
| --- | --- |
| `CHECKOUT_URL` | Endereço HTTPS definitivo do pagamento. Todos os botões de compra usam esse destino. Enquanto o campo estiver vazio, o clique exibe o aviso de prévia. |
| `price`, `currency`, `previousPrice` | O preço inicial é R$ 19,99, configurado como `19.99` em `BRL`. O Pixel usa esses mesmos valores. Para uma comparação comprovada, preencha `previousPrice` com `value` e `label`. O padrão é `null`. |
| Abertura e textos editoriais | A abertura e as seções editoriais ficam em `site/index.html`. O título da aba e a descrição usam `productName` e `subtitle`. |
| Mockups | Os arquivos WebP em `assets/media/hero-leitura-*` são as composições do hero. A oferta usa as imagens do pacote completo, com os dois bônus. |
| `samples` e `bonuses` | As três amostras formam uma pilha com o Segredo 01 à frente. Cada bônus usa sua própria capa e descrição. |
| `usagePhotos` | Sete fotos mostram como consultar a biblioteca na tela e no papel. A ordem do array define a ordem da galeria. |
| `offer`, `offer.paymentMethods` | Edite o destaque em `badge`, o botão em `cta` e o passo a passo em `steps`. A prévia apresenta Pix, Visa e Mastercard. Mantenha em `paymentMethods` os meios habilitados no checkout, com o nome em `name` e o caminho do ícone em `image`. A plataforma de pagamentos define os meios que o cliente poderá usar. |
| `testimonials.enabled`, `testimonials.entries` | A prévia exibe os oito prints fornecidos. Confira cada conversa com a mensagem recebida e a autorização para usar nome, foto e conteúdo na página. Atualize os registros em `entries` ou use `enabled: false` para ocultar a seção. |
| `guaranteeEnabled`, `faq` | Habilite a garantia anunciada conforme as condições da oferta. Cada pergunta aceita `question`, `answer` e, opcionalmente, `guaranteeOnly: true` para exibição condicionada à garantia. |
| `links` | Configure o endereço oficial da Cakto em `CHECKOUT_URL` e o e-mail em `links.support` no formato `mailto:`. Links oficiais em `terms` e `privacy` substituem os painéis locais. O checkout recebe UTMs e fbclid. |
| `pixelId`, `productId` | Identificadores do Pixel da Meta e do produto nos eventos. |

As fotos e as conversas usam `image`, `width`, `height` e `imageAlt`. As versões compactas usam o sufixo `-compacta.webp`.

As galerias de fotos e conversas deslizam continuamente enquanto estão visíveis. Com movimento reduzido, a pessoa pode percorrer a faixa manualmente.

Preços avulsos comprovados podem ser informados em `bonusPrices`. Com o campo vazio, a oferta exibe “2 bônus incluídos”. As cidades dos depoimentos são opcionais em `testimonials.entries[].city`.

### Contagem de páginas do pacote

As **444 páginas** correspondem à soma dos três PDFs de entrega. Se os arquivos forem substituídos, confira a nova contagem e atualize o card.

| PDF de entrega | Páginas |
| --- | ---: |
| `777 Segredos da Riqueza de Salomão.pdf` | 307 |
| `365-Caderno-de-Investigacao.pdf` | 81 |
| `100-Atlas-de-Decisoes.pdf` | 56 |
| **Total** | **444** |

## Publicar

### Importar o repositório na Vercel

Selecione a pasta `site` em **Root Directory** e o preset **Other**. Habilite **Override** para **Build Command** e deixe o comando vazio. Mantenha o **Output Directory** padrão (`.`) e deixe **Install Command** vazio. O arquivo de entrada é `site/index.html`. As fontes, imagens e scripts são locais. A página dispensa Node.js, gerenciador de pacotes e variáveis de ambiente.

O destino dos botões é o campo público `CHECKOUT_URL` em `site/config.js`. Enquanto ele estiver vazio, os botões exibem o aviso de prévia. A pasta `originais/` reúne os arquivos de criação e fica fora da raiz publicada.

### Preparar a operação de venda

1. Na plataforma de venda, associe os três PDFs à compra e configure o envio do acesso por e-mail após a confirmação do pagamento. Confira o preço, o prazo de acesso, os meios de pagamento e a garantia disponíveis ao comprador.
2. Preencha `CHECKOUT_URL` e os links de suporte e políticas em `site/config.js`.
3. Envie **apenas o conteúdo de `site/`** para a raiz da hospedagem estática com HTTPS. O arquivo de entrada é `index.html`. Preserve as pastas de imagens e fontes e os arquivos CSS e JavaScript. A publicação dispensa instalação de pacotes e compilação.
4. No celular, abra a página publicada, confira o destino dos botões, a exibição do Segredo 01 e a sequência das conversas. Use o modo de teste da plataforma para conferir a entrega dos três PDFs no e-mail de uma compra aprovada.

### Meta Pixel

O Pixel `2429955871112248` carrega após a autorização em **Preferências de privacidade**, no rodapé. A escolha fica salva no navegador e pode ser revista no mesmo local. Com autorização, a página envia `PageView` e `ViewContent` uma vez por carregamento e envia `InitiateCheckout` ao abrir o checkout configurado.

Depois da publicação, confira os três eventos em **Testar eventos**, no Gerenciador de Eventos da Meta. Configure `Purchase` na plataforma de pagamento para registrá-lo após a confirmação real da compra.
