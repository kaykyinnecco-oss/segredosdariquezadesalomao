/* Edite este arquivo para atualizar a oferta. Valores monetários usam ponto decimal. */
window.SITE_CONFIG = {
  CHECKOUT_URL: "",
  price: 19.99,
  currency: "BRL",
  // Use somente se a comparação puder ser comprovada. Ex.: { value: 24.99, label: "Preço anterior" }.
  previousPrice: { value: 275, label: "De" },
  creator: { name: "Coleção Salomão", photo: "", story: "" },
  bonusPrices: [], // Preços avulsos comprovados, na ordem dos dois livros.

  productId: "biblioteca-777-salomao",
  productName: "Os 777 Segredos da Riqueza de Salomão",
  subtitle: "A Biblioteca da Sabedoria Financeira com um Método Prático de 7 Passos.",
  pixelId: "2429955871112248",
  images: {
    brand: "assets/media/marca.webp",
    coverSmall: "assets/media/capa-mobile.webp",
    cover: "assets/media/capa.webp",
    heroSmall: "assets/media/kit-hero-560.webp",
    heroMedium: "assets/media/kit-hero-800.webp",
    hero: "assets/media/kit-hero-1000.webp",
    seal: "assets/media/garantia.webp"
  },
  guaranteeEnabled: true,
  galleryLabels: {
    region: "Páginas de amostra",
    hint: "Toque na página para ampliar.",
    open: "Ampliar a página",
    previous: "Página anterior",
    next: "Próxima página",
    zoom: "Ampliar detalhes",
    fit: "Ajustar página à tela",
    close: "Fechar leitura"
  },
  samples: [
    { title: "Gaste menos do que ganha", folio: "Página 03", src: "assets/media/segredo.webp", full: "assets/media/segredo-zoom.webp", width: 558, height: 789, alt: "Página ilustrada sobre como gastar menos do que se ganha, com um exemplo em reais e cinco ações para fechar o mês." },
    { title: "Como utilizar sua biblioteca", folio: "Página 02", src: "assets/media/biblioteca.webp", full: "assets/media/biblioteca-zoom.webp", width: 558, height: 789, alt: "Página de orientação com duas formas de consultar a biblioteca e a lista dos sete passos, do orçamento do mês à revisão dos resultados." },
    { title: "Como percorrer o método", folio: "Página 06", src: "assets/media/metodo.webp", full: "assets/media/metodo-zoom.webp", width: 558, height: 789, alt: "Página seis com instruções para escolher um passo, fazer as contas do mês e voltar ao checklist." }
  ],
  bonuses: [
    { label: "Bônus 01", title: "Os 365 Ladrões Invisíveis do Seu Dinheiro", description: "Encontre os pequenos gastos que se repetem e escolha quais vale a pena cortar.", image: "assets/media/bonus-1.webp", width: 480, height: 679 },
    { label: "Bônus 02", title: "Os 100 Códigos da Mente Milionária", description: "Reconheça o que leva você a comprar por impulso e faça a próxima escolha com mais calma.", image: "assets/media/bonus-2.webp", width: 480, height: 679 }
  ],
  offer: {
    "badge": "PLANO COMPLETO • 2 BÔNUS • ACESSO VITALÍCIO",
    "title": "Plano Completo + 2 Bônus",
    "benefits": [
      "7 passos para organizar suas contas do mês",
      "Leitura no celular e impressão em A4"
    ],
    "cta": "Quero acessar os 777 Segredos",
    "guarantee": "Garantia de 7 dias",
    "paymentMethods": [
      {
        "name": "Pix",
        "image": "assets/media/pagamento/pix.svg"
      },
      {
        "name": "Visa",
        "image": "assets/media/pagamento/visa.svg"
      },
      {
        "name": "Mastercard",
        "image": "assets/media/pagamento/mastercard.svg"
      }
    ],
    "deliveryTitle": "Como receber seu plano completo",
    "steps": [
      {
        "icon": "credit-card",
        "title": "Garanta seu acesso",
        "text": "Informe seu e-mail, escolha como pagar e confirme a compra."
      },
      {
        "icon": "envelope-open",
        "title": "Receba no seu e-mail",
        "text": "Assim que o pagamento for aprovado, você recebe o link para os três livros."
      },
      {
        "icon": "book-open-text",
        "title": "Abra e comece a usar",
        "text": "Abra o primeiro segredo no celular ou imprima a página para anotar seus gastos."
      }
    ],
    "mainItem": "Livro principal com 777 ensinamentos"
  },
  usagePhotos: [
    {
      "image": "assets/media/leitores/leitura-01.webp",
      "full": "assets/media/leitores/leitura-01-ampliada.webp",
      "width": 580,
      "height": 773,
      "imageAlt": "Leitor consulta a capa no celular junto à página impressa do primeiro segredo.",
      "caption": "Leitura no celular"
    },
    {
      "image": "assets/media/leitores/leitura-02.webp",
      "full": "assets/media/leitores/leitura-02-ampliada.webp",
      "width": 580,
      "height": 773,
      "imageAlt": "Mulher mostra no tablet a capa verde e dourada de Os 777 Segredos da Riqueza de Salomão.",
      "caption": "A biblioteca no tablet"
    },
    {
      "image": "assets/media/leitores/leitura-03.webp",
      "full": "assets/media/leitores/leitura-03-ampliada.webp",
      "width": 580,
      "height": 773,
      "imageAlt": "Leitora acompanha no tablet a página ilustrada sobre gastar menos do que se ganha.",
      "caption": "Consulta ao Segredo 01"
    },
    {
      "image": "assets/media/leitores/leitura-04.webp",
      "full": "assets/media/leitores/leitura-04-ampliada.webp",
      "width": 580,
      "height": 773,
      "imageAlt": "Homem segura uma página impressa do Segredo 01 e aponta para a ilustração.",
      "caption": "O Segredo 01 em papel"
    },
    {
      "image": "assets/media/leitores/leitura-05.webp",
      "full": "assets/media/leitores/leitura-05-ampliada.webp",
      "width": 445,
      "height": 790,
      "imageAlt": "Homem observa uma versão da biblioteca impressa e encadernada em espiral.",
      "caption": "Páginas encadernadas"
    },
    {
      "image": "assets/media/leitores/leitura-06.webp",
      "full": "assets/media/leitores/leitura-06-ampliada.webp",
      "width": 580,
      "height": 773,
      "imageAlt": "Mulher mostra a capa no celular com três páginas da biblioteca impressas sobre a mesa.",
      "caption": "Na tela e no papel"
    },
    {
      "image": "assets/media/leitores/leitura-07.webp",
      "width": 580,
      "height": 773,
      "imageAlt": "Leitor consulta o livro no celular ao lado do Segredo 01 encadernado e de uma caneca de café."
    }
  ],
  testimonials: {
    enabled: true,
    entries: [
      {
        "name": "João Pedro",
        "city": "",
        "image": "assets/media/feedbacks/conversa-01.webp",
        "full": "assets/media/feedbacks/conversa-01-ampliada.webp",
        "width": 445,
        "height": 790,
        "imageAlt": "Print de conversa em que o leitor comenta a clareza do passo a passo e relata ter começado a separar uma reserva.",
        "caption": "Conversa sobre leitura e organização financeira"
      },
      {
        "name": "Marcos Silva",
        "city": "",
        "image": "assets/media/feedbacks/conversa-02.webp",
        "full": "assets/media/feedbacks/conversa-02-ampliada.webp",
        "width": 445,
        "height": 790,
        "imageAlt": "Print de conversa sobre organizar as contas, acompanhado de uma foto das folhas impressas.",
        "caption": "Conversa sobre a impressão das folhas"
      },
      {
        "name": "Rafael Souza",
        "city": "",
        "image": "assets/media/feedbacks/conversa-03.webp",
        "full": "assets/media/feedbacks/conversa-03-ampliada.webp",
        "width": 445,
        "height": 790,
        "imageAlt": "Print de conversa com uma foto da capa no tablet e relato sobre rever despesas e organizar uma reserva.",
        "caption": "Conversa sobre a consulta digital"
      },
      {
        "name": "Sara Cristina",
        "city": "",
        "image": "assets/media/feedbacks/conversa-04.webp",
        "full": "assets/media/feedbacks/conversa-04-ampliada.webp",
        "width": 445,
        "height": 790,
        "imageAlt": "Print de conversa sobre colocar em prática a orientação de gastar menos do que se ganha.",
        "caption": "Conversa sobre o primeiro passo"
      },
      {
        "name": "Ana Paula Ferreira",
        "city": "",
        "image": "assets/media/feedbacks/conversa-05.webp",
        "full": "assets/media/feedbacks/conversa-05-ampliada.webp",
        "width": 445,
        "height": 790,
        "imageAlt": "Print de conversa com foto do livro e da página impressa e relato sobre a revisão dos gastos.",
        "caption": "Conversa sobre os primeiros passos"
      },
      {
        "name": "Patrícia Souza",
        "city": "",
        "image": "assets/media/feedbacks/conversa-06.webp",
        "full": "assets/media/feedbacks/conversa-06-ampliada.webp",
        "width": 445,
        "height": 790,
        "imageAlt": "Print de conversa com o exercício de listar gastos que podem ser reduzidos ou eliminados.",
        "caption": "Conversa sobre a lista de gastos"
      },
      {
        "name": "João Pedro",
        "city": "",
        "image": "assets/media/feedbacks/conversa-07.webp",
        "full": "assets/media/feedbacks/conversa-07-ampliada.webp",
        "width": 445,
        "height": 790,
        "imageAlt": "Print de conversa com o Segredo 01 impresso e relato sobre ajustes no orçamento.",
        "caption": "Conversa sobre a prática com o PDF"
      },
      {
        "name": "Carlos Henrique",
        "city": "",
        "image": "assets/media/feedbacks/conversa-08.webp",
        "full": "assets/media/feedbacks/conversa-08-ampliada.webp",
        "width": 445,
        "height": 790,
        "imageAlt": "Print de conversa com uma foto da capa e relato sobre o uso do método no dia a dia.",
        "caption": "Conversa sobre a aplicação no dia a dia"
      }
    ]
  },
  faq: [
  {
    "question": "Como e quando recebo os livros?",
    "answer": "Depois da confirmação do pagamento, o acesso chega ao e-mail informado na compra. Confira também as pastas de spam e promoções."
  },
  {
    "question": "O material é físico ou digital?",
    "answer": "São três livros digitais em PDF. Você pode abrir os arquivos no celular, tablet ou computador e imprimir as páginas que quiser."
  },
  {
    "question": "Posso imprimir em A4?",
    "answer": "Sim. Os três livros estão em formato A4. Você pode imprimir uma página para fazer um exercício ou encadernar o material completo."
  },
  {
    "question": "Os dois bônus estão incluídos no preço?",
    "answer": "Sim. O mesmo pagamento inclui o livro principal, Os 365 Ladrões Invisíveis do Seu Dinheiro e Os 100 Códigos da Mente Milionária."
  },
  {
    "question": "Por quanto tempo tenho acesso?",
    "answer": "O acesso é vitalício e o pagamento é único. Você pode baixar os PDFs e guardá-los para consultar quando precisar."
  },
  {
    "question": "Como funciona a garantia?",
    "answer": "A garantia vale por sete dias após a compra. Se quiser solicitar o reembolso, use o canal de atendimento indicado no comprovante de pagamento.",
    "guaranteeOnly": true
  }
],
  links: {
    support: "", // URL de suporte ou mailto: com um endereço real.
    whatsappNumber: "", // Opcional. DDI + DDD + número, apenas dígitos.
    privacy: "",
    terms: ""
  },
  copy: {
    brand: "Coleção Salomão",
    launchLead: "Condição especial de lançamento.",
    launchEnd: "Por tempo limitado.",
    offerLink: "Ver o pacote",
    headlineLead: "777 segredos da riqueza de Salomão",
    headlineJoin: "para",
    headlineAccent: "seguir e melhorar a sua vida financeira.",
    heroSupport: "Segredos bíblicos de Salomão em um passo a passo para consultar onde estiver e colocar as contas em ordem.",
    heroNote: "Sabedoria prática para a sua vida financeira.",
    heroCTA: "Quero acessar os 777 segredos",
    ribbonMethod: "Acesso imediato · Livro completo",
    ribbonBonus: "Impressão em A4 · Baseado na Bíblia",
    ribbonExtras: "Mais 2 bônus por tempo limitado",
    samplesTitle: "O que vou receber?",
    sampleKicker: "Por dentro do livro",
    sampleStoryTitle: "Seu salário caiu. Quanto você pode gastar?",
    sampleStory: "Antes de fazer a próxima compra, abra o primeiro segredo. Em cinco ações, você compara o que entrou com as contas do mês, escolhe um gasto para reduzir e decide quanto pode guardar.",
    bonusesTitle: "Dois bônus para cuidar do seu dinheiro",
    usageTitle: "Na tela e no papel",
    testimonialsTitle: "O que dizem sobre o material",
    guaranteeTitle: "7 dias de garantia",
    guaranteeText: "Abra os livros, leia o primeiro segredo e experimente o método. Você tem sete dias após a compra para solicitar o reembolso pelo canal informado no comprovante.",
    faqTitle: "Perguntas frequentes",
    digitalNote: "Produto digital em PDF.",
    supportLabel: "Suporte",
    whatsappLabel: "Suporte pelo WhatsApp",
    whatsappMessage: "Olá! Vim pela página da biblioteca Os 777 Segredos da Riqueza de Salomão e tenho uma dúvida sobre a oferta.",
    whatsappHeroMessage: "Olá! Vi a apresentação dos 777 Segredos da Riqueza de Salomão e gostaria de saber mais sobre o livro.",
    whatsappFooterMessage: "Olá! Cheguei ao final da página dos 777 Segredos da Riqueza de Salomão e tenho uma dúvida antes de comprar.",
    privacyLabel: "Política de privacidade",
    termsLabel: "Termos de uso",
    preferencesLabel: "Preferências de privacidade",
    preferencesInfo: "Você pode permitir que a Meta registre a visita à biblioteca e a ida ao checkout para medir os anúncios. A escolha é opcional e pode ser alterada aqui.",
    consentAllowed: "A medição de anúncios está ativada.",
    consentDenied: "A medição de anúncios está desativada.",
    allow: "Permitir medição",
    deny: "Recusar medição",
    previewNotice: "Você está na prévia. O checkout ainda precisa ser configurado."
  }
};
