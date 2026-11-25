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
  productName: "Os Segredos da Riqueza de Salomão",
  subtitle: "A Biblioteca da Sabedoria Financeira com 80 lições ilustradas em PDF.",
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
  bonuses: [
    { label: "Bônus 01", title: "Os 365 Ladrões Invisíveis do Seu Dinheiro", description: "Encontre os pequenos gastos que se repetem e escolha quais vale a pena cortar.", image: "assets/media/bonus-1.webp", width: 480, height: 679 },
    { label: "Bônus 02", title: "Os 100 Códigos da Mente Milionária", description: "Reconheça o que leva você a comprar por impulso e faça a próxima escolha com mais calma.", image: "assets/media/bonus-2.webp", width: 480, height: 679 }
  ],
  offer: {
    "badge": "PLANO COMPLETO • 2 BÔNUS • ACESSO VITALÍCIO",
    "title": "Plano Completo + 2 Bônus",
    "benefits": [
      "Lições práticas para organizar suas contas do mês",
      "Leitura no celular e impressão em A4"
    ],
    "cta": "Quero acessar Os Segredos da Riqueza de Salomão",
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
    "mainItem": "Livro principal com 80 lições ilustradas em PDF"
  },
  usagePhotos: [
    {
      "image": "assets/media/leitores/cotidiano-01.webp",
      "width": 848,
      "height": 1060,
      "imageAlt": "Páginas impressas sobre orçamento e reserva ao lado de um tablet com a capa do e-book."
    },
    {
      "image": "assets/media/leitores/exemplar-6.webp",
      "width": 848,
      "height": 1060,
      "imageAlt": "Mulher de blusa laranja exibe o exemplar encadernado em espiral diante de uma parede verde."
    },
    {
      "image": "assets/media/leitores/cotidiano-02.webp",
      "width": 848,
      "height": 1060,
      "imageAlt": "Casal compara no livro aberto os gastos recorrentes e o custo de uma compra parcelada."
    },
    {
      "image": "assets/media/leitores/cotidiano-03.webp",
      "width": 848,
      "height": 1060,
      "imageAlt": "Homem observa quatro lições impressas e o livro encadernado sobre a mesa."
    },
    {
      "image": "assets/media/leitores/exemplar-5.webp",
      "width": 848,
      "height": 1060,
      "imageAlt": "Mulher segura o livro pela borda e mostra a capa em um quarto de paredes lilás."
    },
    {
      "image": "assets/media/leitores/cotidiano-05.webp",
      "width": 848,
      "height": 1060,
      "imageAlt": "Mulher apresenta a capa no tablet ao lado do caderno de prática e das lições impressas."
    },
    {
      "image": "assets/media/leitores/exemplar-4.webp",
      "width": 848,
      "height": 1060,
      "imageAlt": "Mulher de óculos e blusa amarela apresenta o livro encadernado em espiral."
    },
    {
      "image": "assets/media/leitores/cotidiano-06.webp",
      "width": 848,
      "height": 1060,
      "imageAlt": "Mulher mostra a capa no celular com três folhas de exercícios à sua frente."
    },
    {
      "image": "assets/media/leitores/cotidiano-07.webp",
      "width": 848,
      "height": 1060,
      "imageAlt": "Tablet ao lado do livro aberto nas lições sobre gastos recorrentes e a primeira meta de reserva."
    },
    {
      "image": "assets/media/leitores/exemplar-3.webp",
      "width": 848,
      "height": 1060,
      "imageAlt": "Homem de camisa polo branca mostra a capa do livro ao lado de um notebook."
    },
    {
      "image": "assets/media/leitores/cotidiano-08.webp",
      "width": 848,
      "height": 1060,
      "imageAlt": "Mulher segura o celular na cozinha ao lado da lição impressa sobre o custo das parcelas."
    },
    {
      "image": "assets/media/leitores/cotidiano-09.webp",
      "width": 848,
      "height": 1060,
      "imageAlt": "Homem aponta no livro encadernado o exemplo de gastos que se repetem a cada semana."
    },
    {
      "image": "assets/media/leitores/exemplar-2.webp",
      "width": 848,
      "height": 1060,
      "imageAlt": "Mulher de blusa verde segura o livro com as duas mãos na cozinha."
    },
    {
      "image": "assets/media/leitores/cotidiano-10.webp",
      "width": 848,
      "height": 1060,
      "imageAlt": "Mulher aponta para a capa no tablet, com o plano de 30 dias e a meta de reserva sobre a mesa."
    },
    {
      "image": "assets/media/leitores/exemplar-1.webp",
      "width": 848,
      "height": 1060,
      "imageAlt": "Mulher de blusa azul mostra o livro com espiral em uma sala de paredes azuis."
    },
    {
      "image": "assets/media/leitores/cotidiano-11.webp",
      "width": 848,
      "height": 1060,
      "imageAlt": "Leitor consulta o celular junto ao livro aberto no exemplo de R$ 240 em quatro semanas."
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
    headlineLead: "Os Segredos da Riqueza de Salomão",
    headlineJoin: "para",
    headlineAccent: "seguir e melhorar a sua vida financeira.",
    heroSupport: "Segredos bíblicos de Salomão em um passo a passo para consultar onde estiver e colocar as contas em ordem.",
    heroNote: "Sabedoria prática para a sua vida financeira.",
    heroCTA: "Quero acessar Os Segredos da Riqueza de Salomão",
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
    whatsappMessage: "Olá! Vim pela página da biblioteca Os Segredos da Riqueza de Salomão e tenho uma dúvida sobre a oferta.",
    whatsappHeroMessage: "Olá! Vi a apresentação de Os Segredos da Riqueza de Salomão e gostaria de saber mais sobre o livro.",
    whatsappFooterMessage: "Olá! Cheguei ao final da página de Os Segredos da Riqueza de Salomão e tenho uma dúvida antes de comprar.",
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
