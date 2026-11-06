# 🚦 SEMÁFORO DA SEGURANÇA
### Trabalho Seguro Ltda. — Jogo Educativo Interativo

> **"Segurança não é opção, é responsabilidade de todos!"**

Jogo educativo gamificado desenvolvido para estudantes do curso **Técnico em Segurança do Trabalho**. Ensina a identificar situações seguras, de atenção e de perigo grave em ambientes industriais, de forma divertida e interativa.

---

## 🎮 Como Jogar

1. Abra o arquivo `index.html` diretamente no navegador (Chrome, Firefox, Edge)
2. **Funciona 100% offline** — sem necessidade de servidor ou internet
3. Escolha entre **Jogar Sozinho** ou **Competição entre Equipes**
4. Selecione o nível de dificuldade e explore as 7 fases!

---

## 🗂️ Estrutura do Projeto

```
semaforo-seguranca/
│
├── index.html          # Página principal do jogo
├── README.md           # Este arquivo
├── .gitignore          # Arquivos ignorados pelo Git
│
├── css/
│   └── style.css       # Todo o estilo visual (tema neon escuro, animações)
│
└── js/
    └── game.js         # Lógica completa do jogo (situações, mecânicas, pontuação)
```

---

## 🕹️ Modos de Jogo

| # | Modo | Mecânica |
|---|------|----------|
| 🚦 | **Semáforo Rápido** | Classifique situações em Verde / Amarelo / Vermelho com cronômetro |
| 🔎 | **Caça aos Riscos** | Encontre riscos escondidos em uma cena de fábrica SVG |
| 🦺 | **Monte o EPI** | Selecione os EPIs corretos para cada tarefa industrial |
| 🛠️ | **Decisão do Técnico** | Escolha a melhor ação e veja as consequências |
| 🔢 | **Ordem Certa** | Organize passos de procedimentos de segurança na ordem correta |
| 🃏 | **Carta Surpresa** | Eventos aleatórios do SESMT que modificam o jogo |
| 👷 | **Chefe Final** | 5 situações seguidas sem erro — conquiste o selo Master! |

---

## 🎯 Sistema de Classificação por Semáforo

| Cor | Significado |
|-----|-------------|
| 🟢 **VERDE** | Situação segura — EPIs corretos, máquinas protegidas, ambiente organizado |
| 🟡 **AMARELO** | Atenção — risco que precisa de correção imediata |
| 🔴 **VERMELHO** | Perigo grave — risco de acidente grave ou fatal |

---

## 📊 Níveis de Dificuldade

| Nível | Perfil | Características |
|-------|--------|-----------------|
| 🟢 **Estagiário** | Fácil | Situações óbvias, dicas liberadas, 30s por questão |
| 🟡 **Técnico** | Médio | Detalhes sutis, dicas limitadas, 20s por questão |
| 🔴 **Especialista** | Difícil | Casos ambíguos, sem dicas, 15s por questão |

---

## 🏆 Sistema de Pontos e Conquistas

- **10 pontos** por acerto no Semáforo Rápido
- **Combo multiplicador**: acertos seguidos aumentam x1.5 → x2 → x2.5 → x3
- **Bônus de velocidade**: responder em menos de 10s dá pontos extras
- **3 vidas** (❤️): erros graves custam uma vida; erros leves deduzem pontos
- **Power-ups**: 💡 Dica · ⏭️ Trocar situação · 🛡️ Escudo

### 🎖️ Medalhas
| Medalha | Como Desbloquear |
|---------|-----------------|
| 🦅 Olho de Águia | 5 acertos seguidos |
| ⭐ Sem Erros | Fase completa sem errar |
| 🦺 Mestre dos EPIs | Monte o EPI perfeito 3 vezes |
| 🔥 Combo Supremo | Atingir combo x5 |
| ⚡ Velocidade | 10 respostas com bônus de velocidade |
| 👷 Mestre da Segurança | Completar o jogo todo |
| 🏆 Técnico Master | Vencer o Chefe Final |

### 🏅 Classificação Final
| Pontuação | Classificação |
|-----------|---------------|
| 0 – 50 | Iniciante |
| 51 – 100 | Aprendiz |
| 101 – 180 | Técnico |
| 181 – 250 | Especialista |
| 251+ | **Mestre da Segurança** |

---

## ✏️ Como Editar as Questões

Abra `js/game.js` e localize o array `situations`. Cada questão segue este modelo:

```javascript
{
  id: 1,
  level: 1,              // 1 = Estagiário | 2 = Técnico | 3 = Especialista
  title: "Título da Situação",
  description: "Descrição do cenário apresentado ao jogador.",
  correctAnswer: "green", // "green" | "yellow" | "red"
  explanation: "Por que esta é a classificação correta.",
  safeAction: "O que o trabalhador deveria fazer.",
  didYouKnow: "Curiosidade ou referência à Norma Regulamentadora.",
  svgScene: "nome_da_cena" // identificador da ilustração SVG
}
```

> 💡 **Dica para professores:** As questões são embaralhadas a cada partida. Adicione quantas quiser — recomenda-se pelo menos 5 por nível.

---

## 📋 Normas Regulamentadoras Abordadas

| NR | Tema |
|----|------|
| **NR-6** | EPIs — Equipamentos de Proteção Individual |
| **NR-10** | Segurança em Instalações e Serviços em Eletricidade |
| **NR-11** | Transporte, Movimentação, Armazenagem e Manuseio de Materiais |
| **NR-12** | Segurança no Trabalho em Máquinas e Equipamentos |
| **NR-18** | Condições e Meio Ambiente de Trabalho na Indústria da Construção |
| **NR-23** | Proteção Contra Incêndios |
| **NR-26** | Sinalização de Segurança |
| **NR-33** | Segurança e Saúde nos Trabalhos em Espaços Confinados |
| **NR-35** | Trabalho em Altura |

---

## 🛠️ Tecnologias Utilizadas

- **HTML5** puro — sem frameworks
- **CSS3** — animações, gradientes, design responsivo
- **JavaScript ES6+** — lógica do jogo, Web Audio API
- **SVG** inline — ilustrações vetoriais desenhadas no código
- **Web Audio API** — efeitos sonoros sintetizados sem arquivos externos
- **Canvas API** — efeito de confete na tela final

> ✅ Nenhuma dependência externa. Funciona completamente offline.

---

## 👥 Modo Competição entre Equipes

1. Na tela inicial, selecione **"👥 Competição entre Equipes"**
2. Configure de **2 a 4 equipes** com nome e cor personalizados
3. As equipes jogam em rodadas alternadas no mesmo dispositivo
4. Placar sempre visível com ranking em tempo real
5. Tela final com **pódio animado** e estatísticas por equipe

---

## 📱 Compatibilidade

| Plataforma | Suporte |
|------------|---------|
| Chrome 90+ | ✅ Total |
| Firefox 88+ | ✅ Total |
| Edge 90+ | ✅ Total |
| Safari 14+ | ✅ Total |
| Mobile (Android/iOS) | ✅ Responsivo |

---

## 📄 Licença

Projeto educacional de uso livre para fins não comerciais.  
Desenvolvido para apoio pedagógico em cursos de Segurança do Trabalho.

---

*"Segurança não é opção, é responsabilidade de todos!"* 🚦
