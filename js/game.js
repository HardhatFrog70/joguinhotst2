
    /* ==========================================================================
       1. WEB AUDIO API SYNTHESIZER
       ========================================================================== */
    const SoundFX = {
      ctx: null,
      muted: false,

      init() {
        if (!this.ctx) {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          if (AudioContext) {
            this.ctx = new AudioContext();
          }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
      },

      toggleMute() {
        this.muted = !this.muted;
        const btn = document.getElementById('btn-sound-toggle');
        if (btn) btn.textContent = this.muted ? '🔇' : '🔊';
        if (!this.muted) this.play('click');
      },

      play(type) {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;

        try {
          if (type === 'click') {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);
            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.04);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.04);
          } 
          else if (type === 'correct') {
            // Bright cheerful arpeggio (C5, E5, G5, C6)
            const notes = [523.25, 659.25, 783.99, 1046.50];
            notes.forEach((freq, idx) => {
              const osc = this.ctx.createOscillator();
              const gain = this.ctx.createGain();
              osc.type = 'triangle';
              osc.frequency.setValueAtTime(freq, now + idx * 0.07);
              gain.gain.setValueAtTime(0, now + idx * 0.07);
              gain.gain.linearRampToValueAtTime(0.22, now + idx * 0.07 + 0.02);
              gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.28);
              osc.connect(gain);
              gain.connect(this.ctx.destination);
              osc.start(now + idx * 0.07);
              osc.stop(now + idx * 0.07 + 0.3);
            });
          } 
          else if (type === 'wrong') {
            // Descending harsh buzzer
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(220, now);
            osc.frequency.exponentialRampToValueAtTime(80, now + 0.35);
            gain.gain.setValueAtTime(0.25, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.35);
          } 
          else if (type === 'tick') {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(1100, now);
            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.02);
          } 
          else if (type === 'shield') {
            // Shimmering chime
            [600, 900, 1200].forEach((freq, i) => {
              const osc = this.ctx.createOscillator();
              const gain = this.ctx.createGain();
              osc.type = 'sine';
              osc.frequency.setValueAtTime(freq, now + i * 0.05);
              gain.gain.setValueAtTime(0.18, now + i * 0.05);
              gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.4);
              osc.connect(gain);
              gain.connect(this.ctx.destination);
              osc.start(now + i * 0.05);
              osc.stop(now + i * 0.05 + 0.4);
            });
          } 
          else if (type === 'powerup') {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(300, now);
            osc.frequency.exponentialRampToValueAtTime(1400, now + 0.3);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.3);
          } 
          else if (type === 'levelUp') {
            // Triumphant Fanfare
            const notes = [440, 554.37, 659.25, 880];
            notes.forEach((freq, i) => {
              const osc = this.ctx.createOscillator();
              const gain = this.ctx.createGain();
              osc.type = 'square';
              osc.frequency.setValueAtTime(freq, now + i * 0.12);
              gain.gain.setValueAtTime(0.15, now + i * 0.12);
              gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.35);
              osc.connect(gain);
              gain.connect(this.ctx.destination);
              osc.start(now + i * 0.12);
              osc.stop(now + i * 0.12 + 0.38);
            });
          } 
          else if (type === 'gameOver') {
            // Sad minor descent
            const notes = [440, 415.3, 392, 349.23];
            notes.forEach((freq, i) => {
              const osc = this.ctx.createOscillator();
              const gain = this.ctx.createGain();
              osc.type = 'sawtooth';
              osc.frequency.setValueAtTime(freq, now + i * 0.2);
              gain.gain.setValueAtTime(0.18, now + i * 0.2);
              gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.2 + 0.3);
              osc.connect(gain);
              gain.connect(this.ctx.destination);
              osc.start(now + i * 0.2);
              osc.stop(now + i * 0.2 + 0.32);
            });
          }
        } catch (e) {
          console.warn("Audio error:", e);
        }
      }
    };

    /* ==========================================================================
       2. DATABASE: 15 SITUAÇÕES DO SEMÁFORO RÁPIDO
       ========================================================================== */
    const situations = [
      // NÍVEL 1 - ESTAGIÁRIO (fácil)
      {
        id: 1, level: 1,
        title: "Operador de Máquina",
        description: "João está operando uma prensa com todos os EPIs: capacete, óculos de proteção, luvas e botinas. A proteção da máquina está instalada e ele seguiu o procedimento padrão.",
        correctAnswer: "green",
        explanation: "Todos os EPIs estão sendo usados corretamente e a máquina possui proteção. Esta é uma situação SEGURA.",
        safeAction: "Continue assim! Manter todos os EPIs e proteções é a atitude correta.",
        didYouKnow: "A NR-12 (Segurança no Trabalho em Máquinas e Equipamentos) exige proteções nas partes móveis das máquinas.",
        svgScene: "machine_safe"
      },
      {
        id: 2, level: 1,
        title: "Extintor Bloqueado",
        description: "Uma caixa de papelão grande foi colocada na frente do extintor de incêndio do setor de produção. O extintor está vencido há 3 meses.",
        correctAnswer: "red",
        explanation: "Extintor bloqueado E vencido representa PERIGO GRAVE. Em caso de incêndio, seria impossível acessar o equipamento de combate.",
        safeAction: "Remover imediatamente o obstáculo, acionar inspeção do extintor e comunicar o SESMT.",
        didYouKnow: "A NR-23 (Proteção Contra Incêndios) proíbe obstruir saídas de emergência e equipamentos de combate a incêndio.",
        svgScene: "extinguisher_blocked"
      },
      {
        id: 3, level: 1,
        title: "Capacete Correto",
        description: "Maria trabalha na construção civil usando capacete classe B (dielétrico), óculos de segurança, luvas de borracha e botinas com biqueira de aço. Ela está realizando manutenção elétrica.",
        correctAnswer: "green",
        explanation: "Para trabalho elétrico, o capacete classe B (dielétrico) é o correto. Todos os EPIs estão adequados para a atividade.",
        safeAction: "Situação segura! Continue usando os EPIs adequados para cada tipo de risco.",
        didYouKnow: "A NR-6 define os tipos de EPI e sua obrigatoriedade. O capacete Classe B protege contra choques elétricos.",
        svgScene: "electrical_safe"
      },
      {
        id: 4, level: 1,
        title: "Corredor Obstruído",
        description: "Caixas e paletes estão empilhados no corredor de emergência da fábrica, dificultando a passagem. Uma das saídas de emergência está parcialmente bloqueada.",
        correctAnswer: "red",
        explanation: "Corredor de emergência bloqueado é PERIGO GRAVE. Em caso de acidente ou incêndio, as pessoas não conseguiriam evacuar.",
        safeAction: "Retirar imediatamente os materiais, manter corredores livres com sinalização clara e treinar equipe sobre rotas de fuga.",
        didYouKnow: "A NR-23 estabelece que as saídas de emergência devem estar sempre desobstruídas e sinalizadas.",
        svgScene: "corridor_blocked"
      },
      {
        id: 5, level: 1,
        title: "Máquina Sem Proteção",
        description: "Uma serra circular está em operação sem a proteção da lâmina. O operador não está usando luvas de corte e manipula a madeira sem dispositivo de empurrar.",
        correctAnswer: "red",
        explanation: "Serra sem proteção + ausência de EPI adequado = PERIGO GRAVE de amputação e cortes graves.",
        safeAction: "Parar imediatamente a operação, instalar proteção na lâmina e fornecer luvas de corte e dispositivo de empurrar.",
        didYouKnow: "A NR-12 exige proteções em todas as partes cortantes e móveis de máquinas. Não existe 'rapidinho' sem proteção.",
        svgScene: "saw_unguarded"
      },

      // NÍVEL 2 - TÉCNICO (médio)
      {
        id: 6, level: 2,
        title: "EPI Errado para o Risco",
        description: "Carlos está pintando com tinta epóxi em ambiente fechado usando máscara cirúrgica (descartável comum) e luvas de látex. Alega que a máscara 'protege suficiente'.",
        correctAnswer: "red",
        explanation: "Máscara cirúrgica NÃO protege contra vapores químicos. Para tinta epóxi, é obrigatório respirador com filtro específico para vapores orgânicos (PFF2 ou superior com cartucho químico).",
        safeAction: "Substituir a máscara cirúrgica por respirador com cartucho para vapores orgânicos. Garantir ventilação adequada do ambiente.",
        didYouKnow: "A NR-6 especifica que o EPI deve ser adequado ao RISCO da atividade. Usar EPI incorreto é tão perigoso quanto não usar.",
        svgScene: "wrong_ppe"
      },
      {
        id: 7, level: 2,
        title: "Escada Mal Posicionada",
        description: "Um técnico usa uma escada de alumínio apoiada em ângulo de 80° (quase vertical) para trocar uma lâmpada. A escada não está travada nem sendo sustentada.",
        correctAnswer: "yellow",
        explanation: "O ângulo correto de uma escada de apoio deve ser entre 65° e 75° (proporção 1:4). A 80° a escada está instável e pode tombar para trás.",
        safeAction: "Reposicionar a escada no ângulo correto (1:4 - para cada 4m de altura, 1m de distância da base). Sempre ter alguém segurando ou travar a escada.",
        didYouKnow: "A NR-18 e a NR-35 estabelecem critérios para uso seguro de escadas. O ângulo correto é fundamental para estabilidade.",
        svgScene: "ladder_wrong"
      },
      {
        id: 8, level: 2,
        title: "Sinalização Desgastada",
        description: "A sinalização de piso de rota de fuga está apagada e ilegível em 70% do percurso. As faixas amarelas de delimitação de área de máquinas estão quase invisíveis.",
        correctAnswer: "yellow",
        explanation: "Sinalização desgastada é ATENÇÃO. Embora ainda não tenha causado acidente, a ausência efetiva de sinalização aumenta significativamente o risco.",
        safeAction: "Programar imediatamente a renovação da sinalização de piso e demarcações de área. Registrar como não-conformidade e fazer inspeção completa.",
        didYouKnow: "A NR-26 (Sinalização de Segurança) e a NR-23 exigem que sinalizações de emergência sejam visíveis e legíveis. Manutenção periódica é obrigatória.",
        svgScene: "faded_signs"
      },
      {
        id: 9, level: 2,
        title: "Cabo de Energia no Chão",
        description: "Uma extensão elétrica de 20m atravessa o corredor de pedestres da fábrica no chão. O cabo apresenta emendas improvisadas com fita isolante em 3 pontos.",
        correctAnswer: "red",
        explanation: "Cabo no chão com emendas = PERIGO GRAVE. Risco triplo: tropeçar e cair, curto-circuito e choque elétrico.",
        safeAction: "Retirar o cabo imediatamente, substituir por extensão sem emendas, usar calhas de proteção ou passar o cabeamento pelo teto/parede.",
        didYouKnow: "A NR-10 (Segurança em Instalações Elétricas) proíbe emendas improvisadas. Instalações elétricas devem ser feitas por profissional habilitado.",
        svgScene: "cable_floor"
      },
      {
        id: 10, level: 2,
        title: "Extintor Vencido",
        description: "Durante inspeção mensal, o técnico encontra um extintor de pó químico com data de vencimento há 2 anos. O lacre está intacto e visualmente o extintor parece normal.",
        correctAnswer: "yellow",
        explanation: "Extintor vencido é ATENÇÃO URGENTE. Mesmo parecendo bom visualmente, o agente extintor pode ter perdido eficiência e o extintor pode falhar quando mais precisar.",
        safeAction: "Retirar o extintor de operação imediatamente, colocar extintor reserva no local, e encaminhar para recarga/manutenção certificada.",
        didYouKnow: "A NR-23 e a NBR 12962 exigem manutenção anual e recarga conforme fabricante. Extintor vencido deve ser substituído imediatamente.",
        svgScene: "expired_extinguisher"
      },

      // NÍVEL 3 - ESPECIALISTA (difícil)
      {
        id: 11, level: 3,
        title: "Manutenção Sem Bloqueio",
        description: "Um mecânico realiza manutenção em uma esteira transportadora. A máquina está desligada, mas NÃO foi aplicado o bloqueio e etiquetagem (LOTO). O supervisor diz: 'É rápido, não precisa'.",
        correctAnswer: "red",
        explanation: "Manutenção sem LOTO (Lockout/Tagout) é PERIGO GRAVE mesmo com máquina desligada. Outro operador pode acionar a máquina a qualquer momento.",
        safeAction: "SEMPRE aplicar LOTO antes de qualquer manutenção. Desligar, bloquear com cadeado pessoal, aplicar etiqueta 'NÃO LIGUE' e verificar estado zero de energia.",
        didYouKnow: "A NR-12 exige procedimento de bloqueio e etiquetagem. 'É rápido' é a frase mais perigosa da segurança do trabalho.",
        svgScene: "loto_missing"
      },
      {
        id: 12, level: 3,
        title: "Trabalho em Altura",
        description: "Um trabalhador está a 3,5m de altura em andaime sem guarda-corpo. Está usando cinto de segurança tipo paraquedista, mas o talabarte está preso na própria roupa, não em ponto de ancoragem.",
        correctAnswer: "red",
        explanation: "PERIGO GRAVE: Talabarte preso na roupa não é ancoragem segura. Em caso de queda, o cinto não irá reter o trabalhador. O andaime sem guarda-corpo agrava ainda mais.",
        safeAction: "Parar o trabalho. Instalar guarda-corpo no andaime. Prender o talabarte SEMPRE em ponto de ancoragem estrutural certificado para suportar 15kN.",
        didYouKnow: "A NR-35 (Trabalho em Altura) define que trabalho acima de 2m exige análise de risco e uso correto de EPI contra quedas, com ancoragem adequada.",
        svgScene: "height_wrong_anchor"
      },
      {
        id: 13, level: 3,
        title: "Espaço Confinado",
        description: "Um trabalhador entra sozinho em um tanque para limpeza, sem medição de oxigênio prévia. Ele pensa: 'O tanque ficou aberto ontem, o ar renovou'. Não há vigia externo.",
        correctAnswer: "red",
        explanation: "PERIGO GRAVE EXTREMO. Espaço confinado SEM medição de atmosfera e SEM vigia é situação de risco de vida. Gases tóxicos são invisíveis e inodoros.",
        safeAction: "NUNCA entrar em espaço confinado sem: medição atmosférica, vigia treinado externo, comunicação, EPI adequado e Permissão de Entrada e Trabalho (PET).",
        didYouKnow: "A NR-33 (Espaços Confinados) estabelece que toda entrada deve ter Permissão de Trabalho, medição de oxigênio (19,5% a 23,5%) e vigia permanente.",
        svgScene: "confined_space"
      },
      {
        id: 14, level: 3,
        title: "EPI Usado Errado",
        description: "Pedro usa todos os EPIs corretos para trabalho com solda: capacete, óculos de solda, avental de raspa e luvas. Porém, o óculos de solda está levantado na testa enquanto realiza a solda.",
        correctAnswer: "red",
        explanation: "PERIGO GRAVE. EPI correto usado incorretamente não protege. Com óculos levantados, Pedro está exposto à radiação UV, respingos e faíscas diretamente nos olhos.",
        safeAction: "EPI deve estar POSICIONADO CORRETAMENTE durante toda a execução da tarefa. Óculos de solda SEMPRE cobrindo os olhos ao soldar.",
        didYouKnow: "A NR-6 exige não apenas o fornecimento do EPI, mas também que o trabalhador USE CORRETAMENTE. O empregador deve fiscalizar o uso adequado.",
        svgScene: "ppe_wrong_use"
      },
      {
        id: 15, level: 3,
        title: "Empilhadeira com Sobrecarga",
        description: "O operador de empilhadeira transporta uma carga de 2.500kg. A empilhadeira tem capacidade de 2.000kg. O operador justifica: 'É só uma vez, o trajeto é curto'.",
        correctAnswer: "red",
        explanation: "PERIGO GRAVE. Sobrecarga em 25% pode causar tombamento da empilhadeira, quebra do garfo ou perda total do controle. Não existe 'só uma vez' seguro.",
        safeAction: "Nunca exceder a capacidade nominal. Dividir a carga em duas viagens ou usar equipamento com capacidade adequada. Registrar e comunicar ao supervisor.",
        didYouKnow: "A NR-11 (Transporte de Cargas) e NR-12 proíbem o uso de equipamentos acima da capacidade. O tombamento de empilhadeira é um dos acidentes mais fatais.",
        svgScene: "forklift_overload"
      }
    ];

    /* ==========================================================================
       3. DATABASE: ITENS DE EPI (18 ITENS COM SVGs VETORIAIS)
       ========================================================================== */
    const EPI_DATABASE = [
      // ── CABEÇA ──────────────────────────────────────────────────────────────
      { id: 'cap_a', name: 'Capacete Classe A', category: 'cabeca',
        svg: `<svg viewBox="0 0 40 40"><path d="M8 26 C8 14 32 14 32 26 L36 28 L4 28 Z" fill="#ffffff" stroke="#90a4ae" stroke-width="2"/><rect x="18" y="10" width="4" height="6" fill="#cfd8dc"/><text x="20" y="34" font-size="5" fill="#555" text-anchor="middle">Cl.A</text></svg>` },
      { id: 'cap_b', name: 'Capacete Classe B (Dielétrico)', category: 'cabeca',
        svg: `<svg viewBox="0 0 40 40"><path d="M8 25 C8 13 32 13 32 25 L36 27 L4 27 Z" fill="#1e88e5" stroke="#0d47a1" stroke-width="2"/><path d="M12 27 Q20 36 28 27" stroke="#37474f" stroke-width="2" fill="none"/><text x="20" y="22" font-size="5" fill="#fff" text-anchor="middle" font-weight="bold">B</text></svg>` },
      { id: 'cap_c', name: 'Capacete Classe C (Condutivo)', category: 'cabeca',
        svg: `<svg viewBox="0 0 40 40"><path d="M8 26 C8 14 32 14 32 26 L36 28 L4 28 Z" fill="#f44336" stroke="#b71c1c" stroke-width="2"/><rect x="18" y="10" width="4" height="6" fill="#ef9a9a"/><text x="20" y="34" font-size="5" fill="#b71c1c" text-anchor="middle">Cl.C</text></svg>` },
      { id: 'cap_jugular', name: 'Capacete c/ Jugular (Altura)', category: 'cabeca',
        svg: `<svg viewBox="0 0 40 40"><path d="M8 25 C8 13 32 13 32 25 L36 27 L4 27 Z" fill="#ff9800" stroke="#e65100" stroke-width="2"/><path d="M10 27 Q16 34 20 34 Q24 34 30 27" stroke="#4e342e" stroke-width="2.5" fill="none"/><circle cx="20" cy="34" r="2" fill="#795548"/></svg>` },

      // ── OLHOS ───────────────────────────────────────────────────────────────
      { id: 'oculos_incolor', name: 'Óculos de Seg. Incolor', category: 'olhos',
        svg: `<svg viewBox="0 0 40 40"><path d="M6 18 Q14 18 18 22 Q22 18 34 18 L32 26 Q24 28 20 23 Q16 28 8 26 Z" fill="rgba(79,195,247,0.3)" stroke="#4fc3f7" stroke-width="2"/><circle cx="13" cy="22" r="3" fill="rgba(255,255,255,0.6)"/><circle cx="27" cy="22" r="3" fill="rgba(255,255,255,0.6)"/></svg>` },
      { id: 'oculos_solar', name: 'Óculos Solar (uso comum)', category: 'olhos',
        svg: `<svg viewBox="0 0 40 40"><path d="M6 18 Q14 18 18 22 Q22 18 34 18 L32 26 Q24 28 20 23 Q16 28 8 26 Z" fill="#212121" stroke="#424242" stroke-width="2"/><text x="20" y="30" font-size="5" fill="#888" text-anchor="middle">UV</text></svg>` },
      { id: 'oculos_ampla_visao', name: 'Óculos Ampla Visão (vedação)', category: 'olhos',
        svg: `<svg viewBox="0 0 40 40"><ellipse cx="20" cy="22" rx="14" ry="10" fill="rgba(100,200,255,0.25)" stroke="#29b6f6" stroke-width="2.5"/><ellipse cx="20" cy="22" rx="8" ry="5" fill="rgba(255,255,255,0.15)"/><path d="M6 22 Q4 24 4 26 M34 22 Q36 24 36 26" stroke="#0288d1" stroke-width="2" fill="none"/></svg>` },

      // ── FACIAL / ROSTO ───────────────────────────────────────────────────────
      { id: 'mascara_solda', name: 'Máscara de Solda Automática', category: 'facial',
        svg: `<svg viewBox="0 0 40 40"><path d="M10 8 C10 8 30 8 30 8 L28 32 C28 36 12 36 12 32 Z" fill="#263238" stroke="#37474f" stroke-width="2"/><rect x="14" y="16" width="12" height="6" fill="#102027" stroke="#00e676" stroke-width="1.5"/><circle cx="29" cy="10" r="3" fill="#ffd700"/></svg>` },
      { id: 'protetor_facial', name: 'Protetor Facial (policarbonato)', category: 'facial',
        svg: `<svg viewBox="0 0 40 40"><path d="M8 12 Q20 8 32 12 L30 32 Q20 36 10 32 Z" fill="rgba(255,255,255,0.18)" stroke="#b0bec5" stroke-width="2"/><rect x="10" y="8" width="20" height="5" fill="#ffd700" rx="2"/><circle cx="22" cy="12" r="2" fill="#37474f"/></svg>` },
      { id: 'mascara_pvc', name: 'Máscara Facial Inteira PVC', category: 'facial',
        svg: `<svg viewBox="0 0 40 40"><path d="M10 10 Q20 6 30 10 L32 30 Q20 36 8 30 Z" fill="rgba(0,230,118,0.15)" stroke="#00e676" stroke-width="2"/><ellipse cx="20" cy="22" rx="6" ry="4" fill="rgba(0,0,0,0.3)" stroke="#00e676"/><circle cx="20" cy="30" r="3" fill="#37474f"/></svg>` },

      // ── RESPIRATÓRIO ─────────────────────────────────────────────────────────
      { id: 'resp_pff1', name: 'Respirador PFF1 (poeiras leves)', category: 'respiratorio',
        svg: `<svg viewBox="0 0 40 40"><path d="M10 18 L20 13 L30 18 L28 28 L20 32 L12 28 Z" fill="#f5f5f5" stroke="#bdbdbd" stroke-width="2"/><text x="20" y="24" font-size="6" fill="#888" text-anchor="middle">PFF1</text></svg>` },
      { id: 'resp_pff2', name: 'Respirador PFF2 / N95', category: 'respiratorio',
        svg: `<svg viewBox="0 0 40 40"><path d="M10 16 L20 12 L30 16 L28 28 L20 32 L12 28 Z" fill="#eceff1" stroke="#90a4ae" stroke-width="2"/><circle cx="20" cy="22" r="4" fill="#00bcd4"/><path d="M6 18 L10 16 M30 16 L34 18" stroke="#ffb300" stroke-width="2"/></svg>` },
      { id: 'resp_pff3', name: 'Respirador PFF3 (alta eficiência)', category: 'respiratorio',
        svg: `<svg viewBox="0 0 40 40"><path d="M10 16 L20 11 L30 16 L28 29 L20 33 L12 29 Z" fill="#37474f" stroke="#263238" stroke-width="2"/><circle cx="20" cy="22" r="4" fill="#ff9800"/><path d="M6 18 L10 16 M30 16 L34 18" stroke="#ffd700" stroke-width="2.5"/><text x="20" y="12" font-size="4.5" fill="#ff9800" text-anchor="middle">PFF3</text></svg>` },
      { id: 'resp_quimico', name: 'Respirador c/ Cartuchos Químicos', category: 'respiratorio',
        svg: `<svg viewBox="0 0 40 40"><path d="M14 14 L20 12 L26 14 L24 28 L20 31 L16 28 Z" fill="#37474f" stroke="#263238" stroke-width="2"/><circle cx="11" cy="24" r="5" fill="#f57c00"/><circle cx="29" cy="24" r="5" fill="#f57c00"/><text x="20" y="24" font-size="4" fill="#fff" text-anchor="middle">Org.</text></svg>` },
      { id: 'resp_scba', name: 'Máscara Autônoma (SCBA)', category: 'respiratorio',
        svg: `<svg viewBox="0 0 40 40"><ellipse cx="20" cy="20" rx="13" ry="15" fill="#212121" stroke="#37474f" stroke-width="2"/><ellipse cx="20" cy="19" rx="7" ry="6" fill="rgba(100,200,255,0.3)" stroke="#29b6f6" stroke-width="1.5"/><rect x="16" y="30" width="8" height="6" fill="#f57c00" rx="2"/><circle cx="20" cy="36" r="2" fill="#37474f"/></svg>` },

      // ── AUDIÇÃO ──────────────────────────────────────────────────────────────
      { id: 'prot_auricular', name: 'Protetor Auricular Concha', category: 'audicao',
        svg: `<svg viewBox="0 0 40 40"><path d="M10 24 C10 10 30 10 30 24" stroke="#ff1744" stroke-width="3" fill="none"/><rect x="6" y="20" width="8" height="12" rx="3" fill="#d50000"/><rect x="26" y="20" width="8" height="12" rx="3" fill="#d50000"/></svg>` },
      { id: 'fone_inserir', name: 'Protetor Auricular de Inserção', category: 'audicao',
        svg: `<svg viewBox="0 0 40 40"><circle cx="12" cy="22" r="5" fill="#ff7043" stroke="#bf360c" stroke-width="1.5"/><circle cx="28" cy="22" r="5" fill="#ff7043" stroke="#bf360c" stroke-width="1.5"/><path d="M17 22 Q20 18 23 22" stroke="#795548" stroke-width="2" fill="none"/><text x="20" y="36" font-size="5" fill="#888" text-anchor="middle">foam</text></svg>` },

      // ── MÃOS / BRAÇOS ────────────────────────────────────────────────────────
      { id: 'luva_raspa', name: 'Luvas de Raspa de Couro', category: 'maos',
        svg: `<svg viewBox="0 0 40 40"><path d="M12 32 L12 20 Q12 16 16 16 L18 16 L18 12 Q20 12 22 12 L22 16 L24 16 L24 14 Q26 14 28 14 L28 22 L26 32 Z" fill="#8d6e63" stroke="#5d4037" stroke-width="2"/></svg>` },
      { id: 'luva_eletrica', name: 'Luvas de Alta Tensão (borracha)', category: 'maos',
        svg: `<svg viewBox="0 0 40 40"><path d="M12 34 L12 18 C12 14 16 14 16 14 L18 10 C20 10 22 10 22 14 L24 12 C26 12 28 12 28 18 L28 34 Z" fill="#ff6f00" stroke="#bf360c" stroke-width="2"/><rect x="10" y="30" width="20" height="4" fill="#d84315"/><text x="20" y="24" font-size="5" fill="#fff" text-anchor="middle">AT</text></svg>` },
      { id: 'luva_quimica', name: 'Luvas Nitrílicas (química)', category: 'maos',
        svg: `<svg viewBox="0 0 40 40"><path d="M12 34 L12 18 C12 14 16 14 16 14 L18 10 C20 10 22 10 22 14 L24 12 C26 12 28 12 28 18 L28 34 Z" fill="#00b0ff" stroke="#0091ea" stroke-width="2"/><text x="20" y="24" font-size="4.5" fill="#fff" text-anchor="middle">Nit.</text></svg>` },
      { id: 'luva_corte', name: 'Luvas Anticorte (nível 5)', category: 'maos',
        svg: `<svg viewBox="0 0 40 40"><path d="M12 32 L12 20 Q12 16 16 16 L18 16 L18 12 Q20 12 22 12 L22 16 L24 16 L24 14 Q26 14 28 14 L28 22 L26 32 Z" fill="#43a047" stroke="#1b5e20" stroke-width="2"/><text x="20" y="26" font-size="5" fill="#fff" text-anchor="middle">C5</text></svg>` },
      { id: 'luva_pvc', name: 'Luvas de PVC Longas', category: 'maos',
        svg: `<svg viewBox="0 0 40 40"><path d="M12 36 L12 16 C12 12 16 12 16 12 L18 8 C20 8 22 8 22 12 L24 10 C26 10 28 10 28 16 L28 36 Z" fill="#ffd600" stroke="#f57f17" stroke-width="2"/><text x="20" y="28" font-size="4.5" fill="#795548" text-anchor="middle">PVC</text></svg>` },
      { id: 'luva_vaqueta', name: 'Luvas de Vaqueta (cal / cimento)', category: 'maos',
        svg: `<svg viewBox="0 0 40 40"><path d="M12 32 L12 20 Q12 16 16 16 L18 16 L18 12 Q20 12 22 12 L22 16 L24 16 L24 14 Q26 14 28 14 L28 22 L26 32 Z" fill="#bcaaa4" stroke="#795548" stroke-width="2"/><text x="20" y="26" font-size="4.5" fill="#5d4037" text-anchor="middle">Vaq.</text></svg>` },
      { id: 'luva_antivibracao', name: 'Luvas Antivibração', category: 'maos',
        svg: `<svg viewBox="0 0 40 40"><path d="M12 32 L12 20 Q12 16 16 16 L18 16 L18 12 Q20 12 22 12 L22 16 L24 16 L24 14 Q26 14 28 14 L28 22 L26 32 Z" fill="#7e57c2" stroke="#4527a0" stroke-width="2"/><path d="M14 20 Q20 17 26 20 M14 24 Q20 21 26 24" stroke="#fff" stroke-width="1" fill="none" opacity="0.5"/></svg>` },

      // ── CORPO / TRONCO ───────────────────────────────────────────────────────
      { id: 'avental_raspa', name: 'Avental de Raspa de Couro', category: 'corpo',
        svg: `<svg viewBox="0 0 40 40"><path d="M14 6 L26 6 L28 16 L32 36 L8 36 L12 16 Z" fill="#795548" stroke="#4e342e" stroke-width="2"/><line x1="14" y1="6" x2="26" y2="6" stroke="#d7ccc8" stroke-width="2"/></svg>` },
      { id: 'avental_pvc', name: 'Avental de PVC Impermeável', category: 'corpo',
        svg: `<svg viewBox="0 0 40 40"><path d="M14 6 L26 6 L28 16 L32 36 L8 36 L12 16 Z" fill="#ffd600" stroke="#f57f17" stroke-width="2"/><text x="20" y="28" font-size="5" fill="#795548" text-anchor="middle">PVC</text></svg>` },
      { id: 'roupa_anti_arco', name: 'Roupa Anti-Arco Elétrico', category: 'corpo',
        svg: `<svg viewBox="0 0 40 40"><rect x="8" y="8" width="24" height="28" rx="4" fill="#1565c0" stroke="#0d47a1" stroke-width="2"/><path d="M14 8 L14 36 M26 8 L26 36" stroke="#42a5f5" stroke-width="1"/><text x="20" y="26" font-size="4.5" fill="#ffd700" text-anchor="middle">Arc-F</text></svg>` },
      { id: 'roupa_quimica', name: 'Macacão Tyvek (químico)', category: 'corpo',
        svg: `<svg viewBox="0 0 40 40"><rect x="6" y="6" width="28" height="30" rx="3" fill="#ffffff" stroke="#b0bec5" stroke-width="2"/><path d="M6 20 L6 36 M34 20 L34 36" stroke="#90a4ae" stroke-width="1"/><text x="20" y="24" font-size="4" fill="#37474f" text-anchor="middle">Tyvek</text><circle cx="20" cy="10" r="4" fill="#b0bec5"/></svg>` },
      { id: 'colete_refletivo', name: 'Colete Refletivo (sinalização)', category: 'corpo',
        svg: `<svg viewBox="0 0 40 40"><path d="M10 10 L30 10 L34 36 L6 36 Z" fill="#ff9800" stroke="#e65100" stroke-width="2"/><rect x="6" y="18" width="28" height="4" fill="#f5f5f5"/><rect x="6" y="26" width="28" height="4" fill="#f5f5f5"/></svg>` },
      { id: 'capa_chuva', name: 'Capa de Chuva / Impermeável', category: 'corpo',
        svg: `<svg viewBox="0 0 40 40"><path d="M10 8 L30 8 L36 36 L4 36 Z" fill="#1e88e5" stroke="#0d47a1" stroke-width="2" opacity="0.85"/><path d="M16 8 L14 20 M24 8 L26 20" stroke="#fff" stroke-width="1.5" opacity="0.5"/></svg>` },

      // ── ALTURA / QUEDA ───────────────────────────────────────────────────────
      { id: 'cinto_pqd', name: 'Cinto Paraquedista 4 Pontos', category: 'altura',
        svg: `<svg viewBox="0 0 40 40"><path d="M12 6 L12 34 M28 6 L28 34 M8 22 L32 22 M10 32 L30 32" stroke="#ff9100" stroke-width="3" fill="none"/><circle cx="20" cy="14" r="3" fill="#bdbdbd" stroke="#616161"/><text x="20" y="38" font-size="4.5" fill="#ff9100" text-anchor="middle">4pts</text></svg>` },
      { id: 'talabarte', name: 'Talabarte em Y c/ Absorvedor', category: 'altura',
        svg: `<svg viewBox="0 0 40 40"><path d="M20 34 L20 22 L10 10 M20 22 L30 10" stroke="#ffd600" stroke-width="3" fill="none"/><rect x="16" y="24" width="8" height="8" fill="#e65100" rx="2"/><text x="20" y="12" font-size="4" fill="#ffd600" text-anchor="middle">absv</text></svg>` },
      { id: 'trava_queda', name: 'Trava-Quedas Retrátil', category: 'altura',
        svg: `<svg viewBox="0 0 40 40"><circle cx="20" cy="14" r="8" fill="#37474f" stroke="#263238" stroke-width="2"/><circle cx="20" cy="14" r="4" fill="#ff9800"/><path d="M20 22 L20 36" stroke="#ff9800" stroke-width="3"/><path d="M14 32 L20 36 L26 32" stroke="#ffd600" stroke-width="2" fill="none"/></svg>` },
      { id: 'linha_vida', name: 'Linha de Vida Horizontal', category: 'altura',
        svg: `<svg viewBox="0 0 40 40"><line x1="4" y1="16" x2="36" y2="16" stroke="#f57c00" stroke-width="3"/><circle cx="4" cy="16" r="4" fill="#37474f" stroke="#f57c00" stroke-width="2"/><circle cx="36" cy="16" r="4" fill="#37474f" stroke="#f57c00" stroke-width="2"/><path d="M20 16 L20 32" stroke="#ffd600" stroke-width="2"/><text x="20" y="38" font-size="4.5" fill="#f57c00" text-anchor="middle">Ln.Vida</text></svg>` },

      // ── PÉS / PERNAS ─────────────────────────────────────────────────────────
      { id: 'botina_aco', name: 'Botina Bico de Aço', category: 'pes',
        svg: `<svg viewBox="0 0 40 40"><path d="M12 12 L18 12 L18 24 L32 24 L32 32 L8 32 L8 20 Z" fill="#37474f" stroke="#263238" stroke-width="2"/><path d="M24 24 L32 24 L32 32 L24 32 Z" fill="#cfd8dc" opacity="0.8"/></svg>` },
      { id: 'bota_pvc', name: 'Bota de Borracha / PVC', category: 'pes',
        svg: `<svg viewBox="0 0 40 40"><path d="M14 6 L22 6 L22 24 L32 24 L32 34 L12 34 L12 14 Z" fill="#ffffff" stroke="#90a4ae" stroke-width="2"/><rect x="12" y="30" width="20" height="4" fill="#00e676"/></svg>` },
      { id: 'botina_dieletrica', name: 'Botina Dielétrica (sem metal)', category: 'pes',
        svg: `<svg viewBox="0 0 40 40"><path d="M12 12 L18 12 L18 24 L32 24 L32 32 L8 32 L8 20 Z" fill="#1e88e5" stroke="#0d47a1" stroke-width="2"/><text x="20" y="30" font-size="5" fill="#fff" text-anchor="middle">Diel.</text></svg>` },
      { id: 'perneira', name: 'Perneira de Raspa (solda/moto)', category: 'pes',
        svg: `<svg viewBox="0 0 40 40"><rect x="12" y="6" width="16" height="30" rx="4" fill="#8d6e63" stroke="#5d4037" stroke-width="2"/><line x1="12" y1="16" x2="28" y2="16" stroke="#bcaaa4" stroke-width="1.5"/><line x1="12" y1="26" x2="28" y2="26" stroke="#bcaaa4" stroke-width="1.5"/></svg>` },
      { id: 'sapatilha_antistatica', name: 'Calçado Antiestático (ESD)', category: 'pes',
        svg: `<svg viewBox="0 0 40 40"><path d="M10 14 L18 14 L18 24 L32 24 L32 32 L8 32 L8 20 Z" fill="#7e57c2" stroke="#4527a0" stroke-width="2"/><text x="20" y="30" font-size="4.5" fill="#ede7f6" text-anchor="middle">ESD</text></svg>` },

      // ── PELE / CREMES ────────────────────────────────────────────────────────
      { id: 'creme_protetor', name: 'Creme Protetor de Pele', category: 'pele',
        svg: `<svg viewBox="0 0 40 40"><rect x="12" y="10" width="16" height="22" rx="4" fill="#fff9c4" stroke="#f9a825" stroke-width="2"/><rect x="14" y="6" width="12" height="6" rx="2" fill="#f9a825"/><path d="M16 20 Q20 16 24 20" stroke="#f9a825" stroke-width="2" fill="none"/></svg>` },
      { id: 'protetor_solar', name: 'Protetor Solar FPS 50+', category: 'pele',
        svg: `<svg viewBox="0 0 40 40"><rect x="12" y="8" width="16" height="24" rx="4" fill="#ff8f00" stroke="#e65100" stroke-width="2"/><rect x="14" y="4" width="12" height="6" rx="2" fill="#ffe082"/><text x="20" y="24" font-size="5" fill="#fff" text-anchor="middle">FPS</text><text x="20" y="30" font-size="5" fill="#fff" text-anchor="middle">50+</text></svg>` },

      // ── SINALIZAÇÂO / VISIBILIDADE ────────────────────────────────────────────
      { id: 'colete_classe3', name: 'Colete Classe 3 Alta Visib.', category: 'sinalizacao',
        svg: `<svg viewBox="0 0 40 40"><path d="M10 10 L30 10 L34 36 L6 36 Z" fill="#ff1744" stroke="#b71c1c" stroke-width="2"/><rect x="6" y="17" width="28" height="5" fill="#f5f5f5"/><rect x="6" y="27" width="28" height="5" fill="#f5f5f5"/><text x="20" y="13" font-size="4" fill="#fff" text-anchor="middle">Cl.3</text></svg>` },
      { id: 'faixa_refletiva', name: 'Faixa Refletiva no Uniforme', category: 'sinalizacao',
        svg: `<svg viewBox="0 0 40 40"><rect x="4" y="17" width="32" height="6" rx="2" fill="#f5f5f5" stroke="#bdbdbd" stroke-width="1"/><rect x="4" y="17" width="32" height="2" fill="#ffd700"/><rect x="4" y="21" width="32" height="2" fill="#ffd700"/></svg>` },

      // ── CABEÇA / PESCOÇO (novos) ─────────────────────────────────────────────
      { id: 'touca_solda', name: 'Touca de Solda (capuz de raspa)', category: 'cabeca',
        svg: `<svg viewBox="0 0 40 40"><path d="M10 6 Q20 2 30 6 L32 20 Q32 30 20 34 Q8 30 8 20 Z" fill="#5d4037" stroke="#3e2723" stroke-width="2"/><ellipse cx="20" cy="14" rx="6" ry="4" fill="#795548" opacity="0.6"/><text x="20" y="30" font-size="4.5" fill="#d7ccc8" text-anchor="middle">raspa</text></svg>` },
      { id: 'protetor_nuca', name: 'Protetor de Nuca (sol/calor)', category: 'cabeca',
        svg: `<svg viewBox="0 0 40 40"><path d="M8 26 C8 14 32 14 32 26 L36 28 L4 28 Z" fill="#ffe082" stroke="#f9a825" stroke-width="2"/><rect x="18" y="10" width="4" height="6" fill="#fff9c4"/><path d="M6 28 Q8 38 14 38 Q20 38 26 38 Q32 38 34 28" fill="#ffe082" stroke="#f9a825" stroke-width="1.5"/></svg>` },

      // ── OLHOS / VISÃO (novos) ────────────────────────────────────────────────
      { id: 'oculos_oxicorte', name: 'Óculos de Oxicorte (DIN 5-6)', category: 'olhos',
        svg: `<svg viewBox="0 0 40 40"><path d="M5 18 Q14 18 18 23 Q22 18 35 18 L33 27 Q24 30 20 24 Q16 30 7 27 Z" fill="rgba(255,140,0,0.4)" stroke="#f57c00" stroke-width="2"/><circle cx="12" cy="22" r="3.5" fill="rgba(255,165,0,0.5)"/><circle cx="28" cy="22" r="3.5" fill="rgba(255,165,0,0.5)"/><text x="20" y="36" font-size="4.5" fill="#f57c00" text-anchor="middle">DIN 5</text></svg>` },
      { id: 'oculos_laser', name: 'Óculos de Proteção para Laser', category: 'olhos',
        svg: `<svg viewBox="0 0 40 40"><path d="M6 17 Q14 17 18 21 Q22 17 34 17 L32 25 Q24 27 20 22 Q16 27 8 25 Z" fill="rgba(170,0,255,0.35)" stroke="#9c27b0" stroke-width="2"/><circle cx="13" cy="21" r="3" fill="rgba(200,0,255,0.3)"/><circle cx="27" cy="21" r="3" fill="rgba(200,0,255,0.3)"/><text x="20" y="34" font-size="4" fill="#ce93d8" text-anchor="middle">LASER</text></svg>` },
      { id: 'oculos_ir', name: 'Óculos Infravermelho (fornos)', category: 'olhos',
        svg: `<svg viewBox="0 0 40 40"><path d="M6 18 Q14 18 18 22 Q22 18 34 18 L32 26 Q24 28 20 23 Q16 28 8 26 Z" fill="rgba(255,50,0,0.4)" stroke="#d32f2f" stroke-width="2"/><circle cx="13" cy="22" r="3" fill="rgba(255,80,0,0.4)"/><circle cx="27" cy="22" r="3" fill="rgba(255,80,0,0.4)"/><text x="20" y="35" font-size="4" fill="#ff7043" text-anchor="middle">IR</text></svg>` },

      // ── RESPIRATÓRIO (novos) ─────────────────────────────────────────────────
      { id: 'resp_co', name: 'Respirador c/ Cartucho para CO', category: 'respiratorio',
        svg: `<svg viewBox="0 0 40 40"><path d="M14 14 L20 12 L26 14 L24 28 L20 31 L16 28 Z" fill="#37474f" stroke="#263238" stroke-width="2"/><circle cx="11" cy="24" r="5" fill="#607d8b"/><circle cx="29" cy="24" r="5" fill="#607d8b"/><text x="20" y="24" font-size="4" fill="#b0bec5" text-anchor="middle">CO</text></svg>` },
      { id: 'resp_dupla', name: 'Respirador Dupla Função (org+ácido)', category: 'respiratorio',
        svg: `<svg viewBox="0 0 40 40"><path d="M14 14 L20 12 L26 14 L24 28 L20 31 L16 28 Z" fill="#212121" stroke="#37474f" stroke-width="2"/><circle cx="10" cy="24" r="5" fill="#ff6f00"/><circle cx="30" cy="24" r="5" fill="#43a047"/><text x="20" y="24" font-size="3.5" fill="#fff" text-anchor="middle">2x</text></svg>` },
      { id: 'capuz_jateamento', name: 'Capuz de Jateamento c/ Ar Forçado', category: 'respiratorio',
        svg: `<svg viewBox="0 0 40 40"><path d="M10 8 Q20 4 30 8 L32 24 Q32 36 20 38 Q8 36 8 24 Z" fill="#37474f" stroke="#263238" stroke-width="2"/><ellipse cx="20" cy="18" rx="7" ry="6" fill="rgba(100,200,255,0.25)" stroke="#29b6f6" stroke-width="1.5"/><path d="M28 10 L36 10 L36 16 L32 16" stroke="#29b6f6" stroke-width="2" fill="none"/><text x="20" y="34" font-size="4" fill="#90caf9" text-anchor="middle">Ar Forc.</text></svg>` },

      // ── AUDIÇÃO (novos) ──────────────────────────────────────────────────────
      { id: 'prot_auricular_nr4', name: 'Protetor Auricular NRR 29dB', category: 'audicao',
        svg: `<svg viewBox="0 0 40 40"><path d="M10 22 C10 8 30 8 30 22" stroke="#c62828" stroke-width="3.5" fill="none"/><rect x="5" y="18" width="10" height="14" rx="4" fill="#b71c1c"/><rect x="25" y="18" width="10" height="14" rx="4" fill="#b71c1c"/><text x="20" y="38" font-size="4.5" fill="#ef9a9a" text-anchor="middle">29dB</text></svg>` },

      // ── MÃOS / BRAÇOS (novos) ────────────────────────────────────────────────
      { id: 'luva_criogenica', name: 'Luvas Criogênicas (-196°C)', category: 'maos',
        svg: `<svg viewBox="0 0 40 40"><path d="M12 34 L12 16 C12 12 16 12 16 12 L18 8 C20 8 22 8 22 12 L24 10 C26 10 28 10 28 16 L28 34 Z" fill="#b3e5fc" stroke="#0288d1" stroke-width="2"/><path d="M12 20 Q16 16 20 20 Q24 16 28 20" stroke="#81d4fa" stroke-width="1.5" fill="none" opacity="0.7"/><text x="20" y="30" font-size="4" fill="#0288d1" text-anchor="middle">-196°C</text></svg>` },
      { id: 'luva_descartavel', name: 'Luvas Descartáveis (látex/vinil)', category: 'maos',
        svg: `<svg viewBox="0 0 40 40"><path d="M13 32 L13 20 Q13 17 17 17 L18 17 L18 13 Q20 13 22 13 L22 17 L23 17 L23 15 Q25 15 27 15 L27 21 L25 32 Z" fill="#ffe0b2" stroke="#ff9800" stroke-width="1.5" opacity="0.9"/><text x="20" y="12" font-size="4" fill="#ff9800" text-anchor="middle">1x</text></svg>` },
      { id: 'luva_mecanica', name: 'Luvas Mecânicas Anti-Impacto', category: 'maos',
        svg: `<svg viewBox="0 0 40 40"><path d="M12 32 L12 20 Q12 16 16 16 L18 16 L18 12 Q20 12 22 12 L22 16 L24 16 L24 14 Q26 14 28 14 L28 22 L26 32 Z" fill="#1565c0" stroke="#0d47a1" stroke-width="2"/><rect x="13" y="17" width="13" height="5" rx="2" fill="#42a5f5" opacity="0.7"/><text x="20" y="30" font-size="4" fill="#bbdefb" text-anchor="middle">Mec.</text></svg>` },
      { id: 'luva_frigorifico', name: 'Luvas para Frigorífico (-30°C)', category: 'maos',
        svg: `<svg viewBox="0 0 40 40"><path d="M12 34 L12 18 C12 13 16 13 16 13 L18 9 C20 9 22 9 22 13 L24 11 C26 11 28 11 28 18 L28 34 Z" fill="#e3f2fd" stroke="#90caf9" stroke-width="2"/><path d="M15 20 L25 20 M15 24 L25 24" stroke="#42a5f5" stroke-width="1.5"/><text x="20" y="31" font-size="4" fill="#1976d2" text-anchor="middle">-30°C</text></svg>` },
      { id: 'luva_soldagem_mig', name: 'Luvas de Soldagem MIG (longas)', category: 'maos',
        svg: `<svg viewBox="0 0 40 40"><path d="M11 36 L11 16 C11 11 15 11 15 11 L17 7 C19 7 21 7 21 11 L23 9 C25 9 27 9 27 16 L27 36 Z" fill="#6d4c41" stroke="#3e2723" stroke-width="2"/><rect x="9" y="28" width="20" height="8" fill="#5d4037" rx="1"/><text x="20" y="24" font-size="4" fill="#bcaaa4" text-anchor="middle">MIG</text></svg>` },
      { id: 'mangote_raspa', name: 'Mangote de Raspa Couro', category: 'maos',
        svg: `<svg viewBox="0 0 40 40"><rect x="12" y="6" width="16" height="28" rx="6" fill="#8d6e63" stroke="#5d4037" stroke-width="2"/><line x1="12" y1="14" x2="28" y2="14" stroke="#bcaaa4" stroke-width="1.5"/><line x1="12" y1="22" x2="28" y2="22" stroke="#bcaaa4" stroke-width="1.5"/><text x="20" y="36" font-size="4.5" fill="#d7ccc8" text-anchor="middle">Mang.</text></svg>` },
      { id: 'braçadeira_anticorte', name: 'Braçadeira Anticorte (antebraço)', category: 'maos',
        svg: `<svg viewBox="0 0 40 40"><rect x="10" y="10" width="20" height="20" rx="10" fill="none" stroke="#43a047" stroke-width="4"/><path d="M15 20 L25 20 M20 15 L20 25" stroke="#a5d6a7" stroke-width="2"/><text x="20" y="36" font-size="4.5" fill="#66bb6a" text-anchor="middle">C5</text></svg>` },

      // ── CORPO / TRONCO (novos) ───────────────────────────────────────────────
      { id: 'avental_chumbo', name: 'Avental de Chumbo (radiação)', category: 'corpo',
        svg: `<svg viewBox="0 0 40 40"><path d="M13 6 L27 6 L29 16 L33 36 L7 36 L11 16 Z" fill="#546e7a" stroke="#37474f" stroke-width="2"/><text x="20" y="24" font-size="5" fill="#b0bec5" text-anchor="middle">Pb</text><text x="20" y="31" font-size="4" fill="#90a4ae" text-anchor="middle">0.5mm</text></svg>` },
      { id: 'jaleco_lab', name: 'Jaleco de Laboratório', category: 'corpo',
        svg: `<svg viewBox="0 0 40 40"><rect x="8" y="6" width="24" height="30" rx="3" fill="#ffffff" stroke="#e0e0e0" stroke-width="2"/><path d="M8 6 L8 36 M32 6 L32 36" stroke="#e0e0e0" stroke-width="1"/><path d="M15 6 L14 20 M25 6 L26 20" stroke="#bdbdbd" stroke-width="1"/><circle cx="20" cy="10" r="3" fill="#eeeeee" stroke="#bdbdbd"/><rect x="10" y="22" width="6" height="8" rx="1" fill="#e3f2fd" stroke="#90caf9"/></svg>` },
      { id: 'uniforme_ignifugo', name: 'Uniforme Ignífugo (FR) Nomex®', category: 'corpo',
        svg: `<svg viewBox="0 0 40 40"><rect x="8" y="6" width="24" height="30" rx="3" fill="#ff8f00" stroke="#e65100" stroke-width="2"/><path d="M14 6 L14 36 M26 6 L26 36" stroke="#ffe082" stroke-width="1"/><text x="20" y="24" font-size="4.5" fill="#fff" text-anchor="middle">FR</text><text x="20" y="30" font-size="3.5" fill="#ffe082" text-anchor="middle">Nomex</text></svg>` },
      { id: 'roupa_calor', name: 'Roupa Aluminizada (calor radiante)', category: 'corpo',
        svg: `<svg viewBox="0 0 40 40"><rect x="8" y="6" width="24" height="30" rx="3" fill="#e0e0e0" stroke="#bdbdbd" stroke-width="2"/><path d="M10 8 L30 10 M10 14 L30 16 M10 20 L30 22 M10 26 L30 28 M10 32 L28 34" stroke="#f5f5f5" stroke-width="1.5" opacity="0.8"/><path d="M14 6 L14 36 M26 6 L26 36" stroke="#f5f5f5" stroke-width="1"/><text x="20" y="24" font-size="4" fill="#757575" text-anchor="middle">1000°C</text></svg>` },
      { id: 'capuz_tyvek', name: 'Capuz Descartável Tyvek', category: 'corpo',
        svg: `<svg viewBox="0 0 40 40"><path d="M10 8 Q20 4 30 8 L34 30 Q20 36 6 30 Z" fill="#ffffff" stroke="#b0bec5" stroke-width="2"/><ellipse cx="20" cy="16" rx="8" ry="6" fill="#f5f5f5" stroke="#cfd8dc" stroke-width="1"/><text x="20" y="30" font-size="4" fill="#90a4ae" text-anchor="middle">Tyvek</text></svg>` },
      { id: 'colete_salva_vidas', name: 'Colete Salva-Vidas (aquático)', category: 'corpo',
        svg: `<svg viewBox="0 0 40 40"><path d="M10 10 L30 10 L32 34 L8 34 Z" fill="#ff9800" stroke="#e65100" stroke-width="2"/><path d="M14 10 L14 34 M26 10 L26 34" stroke="#fff" stroke-width="1.5"/><rect x="14" y="16" width="12" height="6" rx="2" fill="#ffe082"/><text x="20" y="31" font-size="4" fill="#fff" text-anchor="middle">150N</text></svg>` },

      // ── ALTURA / QUEDA (novos) ───────────────────────────────────────────────
      { id: 'cinto_posicionamento', name: 'Cinto de Posicionamento (abdominal)', category: 'altura',
        svg: `<svg viewBox="0 0 40 40"><rect x="6" y="16" width="28" height="8" rx="4" fill="#ff6f00" stroke="#e65100" stroke-width="2"/><rect x="17" y="13" width="6" height="14" rx="2" fill="#bdbdbd" stroke="#757575"/><path d="M6 20 L2 20 M34 20 L38 20" stroke="#ff6f00" stroke-width="2.5"/><text x="20" y="34" font-size="4.5" fill="#ff9800" text-anchor="middle">Posic.</text></svg>` },
      { id: 'absorvedor_queda', name: 'Absorvedor de Energia (pack)', category: 'altura',
        svg: `<svg viewBox="0 0 40 40"><rect x="12" y="12" width="16" height="16" rx="3" fill="#b71c1c" stroke="#7f0000" stroke-width="2"/><path d="M20 6 L20 12 M20 28 L20 34" stroke="#ff7043" stroke-width="2.5"/><path d="M14 14 L26 26 M26 14 L14 26" stroke="#ef9a9a" stroke-width="1.5" opacity="0.7"/><text x="20" y="38" font-size="4" fill="#ff7043" text-anchor="middle">Absorv.</text></svg>` },

      // ── PÉS / PERNAS (novos) ────────────────────────────────────────────────
      { id: 'botina_quimica', name: 'Botina Resistente a Químicos', category: 'pes',
        svg: `<svg viewBox="0 0 40 40"><path d="M12 12 L18 12 L18 24 L32 24 L32 32 L8 32 L8 20 Z" fill="#7b1fa2" stroke="#4a148c" stroke-width="2"/><text x="20" y="30" font-size="4.5" fill="#e1bee7" text-anchor="middle">Quím.</text></svg>` },
      { id: 'polaina_raspa', name: 'Polainas de Raspa Couro (solda)', category: 'pes',
        svg: `<svg viewBox="0 0 40 40"><rect x="10" y="6" width="20" height="28" rx="4" fill="#6d4c41" stroke="#3e2723" stroke-width="2"/><line x1="10" y1="14" x2="30" y2="14" stroke="#8d6e63" stroke-width="1.5"/><line x1="10" y1="22" x2="30" y2="22" stroke="#8d6e63" stroke-width="1.5"/><text x="20" y="34" font-size="4" fill="#bcaaa4" text-anchor="middle">raspa</text></svg>` },
      { id: 'joelheira', name: 'Joelheira de Proteção (piso duro)', category: 'pes',
        svg: `<svg viewBox="0 0 40 40"><ellipse cx="20" cy="22" rx="12" ry="10" fill="#37474f" stroke="#263238" stroke-width="2"/><ellipse cx="20" cy="22" rx="7" ry="5" fill="#546e7a"/><path d="M14 18 Q20 14 26 18" stroke="#78909c" stroke-width="1.5" fill="none"/><text x="20" y="36" font-size="4.5" fill="#90a4ae" text-anchor="middle">joelh.</text></svg>` },
      { id: 'meia_antistatica', name: 'Meia Antiestática ESD', category: 'pes',
        svg: `<svg viewBox="0 0 40 40"><path d="M12 8 L28 8 L30 28 L26 36 L14 36 L10 28 Z" fill="#7e57c2" stroke="#4527a0" stroke-width="2"/><path d="M14 14 L26 14 M13 20 L27 20 M12 26 L28 26" stroke="#b39ddb" stroke-width="1.5" opacity="0.6"/><text x="20" y="36" font-size="0" fill="none"/><text x="20" y="12" font-size="4" fill="#ede7f6" text-anchor="middle">ESD</text></svg>` },

      // ── SINALIZAÇÂO / DETECÇÃO (novos) ──────────────────────────────────────
      { id: 'detector_gas', name: 'Detector de Gás Portátil (4 gases)', category: 'sinalizacao',
        svg: `<svg viewBox="0 0 40 40"><rect x="10" y="6" width="20" height="28" rx="4" fill="#212121" stroke="#37474f" stroke-width="2"/><rect x="13" y="9" width="14" height="8" rx="2" fill="#1b5e20"/><text x="20" y="16" font-size="5" fill="#00e676" text-anchor="middle">OK</text><circle cx="20" cy="26" r="4" fill="#f57c00"/><text x="20" y="28" font-size="4" fill="#fff" text-anchor="middle">4x</text><text x="20" y="38" font-size="4" fill="#90a4ae" text-anchor="middle">LEL</text></svg>` },
      { id: 'faixa_lombar', name: 'Faixa Lombar (esforço postural)', category: 'sinalizacao',
        svg: `<svg viewBox="0 0 40 40"><rect x="4" y="14" width="32" height="12" rx="4" fill="#1565c0" stroke="#0d47a1" stroke-width="2"/><rect x="4" y="17" width="32" height="2" fill="#42a5f5" opacity="0.5"/><rect x="4" y="23" width="32" height="2" fill="#42a5f5" opacity="0.5"/><rect x="15" y="12" width="10" height="16" rx="2" fill="#1976d2" stroke="#0d47a1"/><text x="20" y="36" font-size="4.5" fill="#90caf9" text-anchor="middle">Lombar</text></svg>` },
      { id: 'sinalizador_led', name: 'Sinalizador LED Individual (pisca)', category: 'sinalizacao',
        svg: `<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="12" fill="#212121" stroke="#37474f" stroke-width="2"/><circle cx="20" cy="20" r="7" fill="#ff6f00"/><circle cx="20" cy="20" r="4" fill="#ffe082"/><path d="M20 4 L20 8 M20 32 L20 36 M4 20 L8 20 M32 20 L36 20" stroke="#ff9800" stroke-width="2"/><text x="20" y="38" font-size="0" fill="none"/></svg>` }
    ];

    /* ==========================================================================
       4. DATABASE: TAREFAS DO MODO 3 (MONTE O EPI)
       ========================================================================== */
    const EPI_TASKS = [
      {
        id: 1,
        title: "Soldagem Industrial com Eletrodo Revestido",
        description: "Selecione todos os EPIs obrigatórios para um soldador operar com eletrodo revestido em oficina mecânica. Há ruído intenso de esmerilhamento ao redor.",
        mandatory: ['mascara_solda', 'luva_raspa', 'avental_raspa', 'botina_aco', 'prot_auricular'],
        optional: ['cap_a', 'resp_pff2'],
        forbidden: ['luva_quimica', 'oculos_ampla_visao', 'bota_pvc'],
        nr: 'NR-6, NR-9',
        explanation: "Para solda elétrica: Máscara de solda automática (protege da radiação UV/IV e respingos), Avental e Luvas de raspa de couro (resistência ao calor e fagulhas), Botina bico de aço e Protetor auricular. ATENÇÃO: Luvas nitrílicas derretem com respingos de solda!"
      },
      {
        id: 2,
        title: "Manutenção Elétrica em Cabine Primária — Alta Tensão",
        description: "Eletricista habilitado irá intervir em painel de alta tensão (13,8kV) já desenergizado e bloqueado (LOTO). Há risco de arco elétrico residual.",
        mandatory: ['cap_b', 'luva_eletrica', 'oculos_incolor', 'botina_dieletrica', 'roupa_anti_arco'],
        optional: ['protetor_facial', 'prot_auricular'],
        forbidden: ['cap_a', 'cap_c', 'bota_pvc', 'luva_raspa'],
        nr: 'NR-10, NR-6',
        explanation: "Alta tensão exige: Capacete Classe B (dielétrico), Luvas de borracha certificadas para a classe de tensão, Botina dielétrica SEM partes metálicas externas, Óculos de proteção e Roupa anti-arco elétrico. O Capacete Classe A e a botina comum conduzem eletricidade!"
      },
      {
        id: 3,
        title: "Trabalho em Altura — Andaime Fachadeiro a 8m (NR-35)",
        description: "Equipe o trabalhador que instalará estruturas metálicas a 8 metros de altura em andaime fachadeiro. Vento moderado. Há ruído de disco de corte.",
        mandatory: ['cinto_pqd', 'talabarte', 'cap_jugular', 'botina_aco', 'luva_raspa'],
        optional: ['oculos_incolor', 'prot_auricular', 'trava_queda'],
        forbidden: ['cap_a', 'luva_eletrica', 'bota_pvc'],
        nr: 'NR-35, NR-6',
        explanation: "NR-35 acima de 2m: Cinto paraquedista completo, Talabarte em Y com absorvedor de energia, Capacete COM jugular (sem ela o vento derruba o capacete), Botina bico de aço e Luvas de raspa. O Trava-quedas retrátil é altamente recomendado em andaimes!"
      },
      {
        id: 4,
        title: "Manuseio de Ácido Sulfúrico Concentrado (H₂SO₄)",
        description: "Operador transferirá ácido sulfúrico 98% de tambor para reator químico. Vapores ácidos presentes. Piso molhado possível.",
        mandatory: ['avental_pvc', 'luva_pvc', 'resp_quimico', 'oculos_ampla_visao', 'bota_pvc'],
        optional: ['cap_a', 'protetor_facial', 'mascara_pvc'],
        forbidden: ['luva_raspa', 'luva_eletrica', 'botina_aco', 'resp_pff2'],
        nr: 'NR-6, NR-9, NR-26',
        explanation: "Ácido corrosivo exige proteção TOTAL contra respingos: Avental PVC impermeável, Luvas de PVC longas (nitrílicas também aceitas), Óculos de vedação ampla visão (não os normais!), Respirador com cartucho para gases ácidos e Bota de borracha. Luvas de couro são destruídas imediatamente pelo ácido!"
      },
      {
        id: 5,
        title: "Operação de Esmeril de Bancada e Desbaste",
        description: "Trabalhador rebarbará peças de aço com disco abrasivo em alta rotação. Estilhaços projetados em alta velocidade. Ruído acima de 85dB.",
        mandatory: ['protetor_facial', 'oculos_incolor', 'prot_auricular', 'botina_aco', 'avental_raspa'],
        optional: ['cap_a'],
        forbidden: ['luva_raspa', 'luva_quimica', 'mascara_solda'],
        nr: 'NR-12, NR-6',
        explanation: "Esmerilhamento: Protetor facial E óculos de segurança (proteção dupla contra estilhaços), Avental de couro (fragmentos quentes), Protetor auricular (ruído > 85dB) e Botina. ATENÇÃO CRÍTICA: Luvas em máquinas rotativas podem ser capturadas e arrastar a mão — NÃO usar luvas em esmerils!"
      },
      {
        id: 6,
        title: "Trabalho em Espaço Confinado — Tanque de Resíduos (NR-33)",
        description: "Trabalhador entrará em tanque de resíduos de tinta para limpeza manual. Atmosfera com solventes orgânicos. Entrada vertical com escada.",
        mandatory: ['resp_scba', 'cinto_pqd', 'talabarte', 'cap_a', 'luva_quimica', 'botina_aco', 'roupa_quimica'],
        optional: ['oculos_ampla_visao', 'protetor_facial'],
        forbidden: ['resp_pff2', 'resp_pff1', 'resp_quimico'],
        nr: 'NR-33, NR-6',
        explanation: "Espaço confinado com solventes EXIGE máscara autônoma SCBA (ar comprimido independente), pois a concentração de vapores pode ser IDLH (imediatamente perigosa à vida). Respiradores com cartucho e PFF NÃO são suficientes. Cinto paraquedista obrigatório para resgate sem entrar no espaço!"
      },
      {
        id: 7,
        title: "Aplicação de Tinta Spray Epóxi em Ambiente Fechado",
        description: "Pintor aplicará tinta epóxi com pistola em câmara de pintura com ventilação forçada. Névoa de tinta presente. Superfícies deslizantes.",
        mandatory: ['resp_quimico', 'oculos_incolor', 'luva_quimica', 'roupa_quimica', 'bota_pvc'],
        optional: ['cap_a', 'protetor_facial', 'colete_refletivo'],
        forbidden: ['resp_pff1', 'resp_pff2', 'luva_raspa', 'mascara_solda'],
        nr: 'NR-6, NR-9, NR-15',
        explanation: "Tinta epóxi em spray: Respirador com cartucho para vapores orgânicos (PFF NÃO protege contra vapores!), Óculos de proteção, Luvas nitrílicas resistentes a solventes, Macacão descartável Tyvek e bota antiderrapante. A névoa de epóxi pode causar sensibilização respiratória permanente!"
      },
      {
        id: 8,
        title: "Operação de Motosserra em Área Florestal",
        description: "Trabalhador realizará corte de árvores e galhos com motosserra a gasolina. Risco de retrocoice e corte grave. Ruído extremo. Cavacos projetados.",
        mandatory: ['cap_a', 'protetor_facial', 'prot_auricular', 'luva_corte', 'perneira', 'botina_aco'],
        optional: ['oculos_incolor', 'colete_refletivo'],
        forbidden: ['luva_raspa', 'luva_quimica', 'mascara_solda', 'cinto_pqd'],        nr: 'NR-31, NR-6',
        explanation: "Motosserra é um dos equipamentos mais perigosos: Capacete florestal com protetor facial integrado, Protetor auricular (ruído > 100dB), Luvas anticorte nível 5 (testadas contra corrente), Perneira anticorte (protege pernas do retrocoice) e Botina bico de aço. As luvas de raspa comum são cortadas facilmente pela corrente!"
      },
      {
        id: 9,
        title: "Jateamento de Areia / Granalha em Peças Metálicas",
        description: "Operador realizará jateamento abrasivo para limpeza superficial de estruturas de aço. Partículas de granalha e pó de óxido em suspensão. Ruído intenso.",
        mandatory: ['resp_pff3', 'oculos_ampla_visao', 'prot_auricular', 'luva_vaqueta', 'avental_raspa', 'botina_aco'],
        optional: ['cap_a', 'protetor_facial', 'colete_refletivo'],
        forbidden: ['resp_pff1', 'resp_pff2', 'luva_quimica', 'oculos_incolor'],
        nr: 'NR-6, NR-9, NR-15',
        explanation: "Jateamento abrasivo gera poeiras de sílica cristalina (risco de silicose) e partículas metálicas: Respirador PFF3 (maior eficiência de filtração — 99,97%), Óculos de vedação ampla visão, Protetor auricular, Luvas de vaqueta (resistentes ao impacto abrasivo) e Avental de raspa. PFF1 e PFF2 não possuem eficiência suficiente contra sílica!"
      },
      {
        id: 10,
        title: "Trabalho Externo em Via Pública — Equipe de Manutenção",
        description: "Equipe realizará manutenção de rede elétrica subterrânea em via pública movimentada. Tráfego de veículos. Poeira. Riscos de atropelamento.",
        mandatory: ['colete_classe3', 'cap_a', 'botina_aco', 'oculos_incolor', 'luva_raspa'],
        optional: ['prot_auricular', 'protetor_solar', 'creme_protetor', 'faixa_refletiva'],
        forbidden: ['cinto_pqd', 'luva_eletrica', 'resp_scba', 'mascara_solda'],
        nr: 'NR-6, NR-10, NR-26',
        explanation: "Trabalho em via pública com tráfego exige ALTA VISIBILIDADE: Colete refletivo Classe 3 (máxima área refletiva), Capacete, Botina bico de aço (proteção contra queda de equipamentos), Óculos e Luvas. O protetor solar e o creme protetor são recomendados para exposição solar prolongada (NR-9 agente físico)!"
      }
    ];

    /* ==========================================================================
       5. DATABASE: CENÁRIOS DO MODO 4 (DECISÃO DO TÉCNICO)
       ========================================================================== */
    const DECISION_SCENARIOS = [
      {
        id: 1,
        title: "Vazamento de Gás Combustível em Ambiente Confinado",
        description: "Durante a ronda, você detecta forte odor de GLP em uma sala fechada de compressores com equipamento operando.",
        options: [
          { letter: "A", text: "Ligar imediatamente o ventilador de parede para dispersar o gás rapidamente.", score: -10, explanation: "❌ ERRO GRAVE: O acionamento do interruptor elétrico do ventilador gera faísca que pode provocar explosão catastrófica imediata!" },
          { letter: "B", text: "Acionar o alarme do setor, evacuar a área, cortar a energia em disjuntor externo e fechar a válvula mestra externa de gás.", score: 20, explanation: "✅ EXCELENTE: Evacuação preventiva imediata, eliminação de fontes de ignição por comando externo e bloqueio do suprimento na válvula geral." },
          { letter: "C", text: "Entrar com um pano úmido no rosto e tentar vedar a tubulação com fita ou trapo.", score: -10, explanation: "❌ PERIGO EXTREMO: Risco iminente de asfixia por deslocamento de oxigênio e intoxicação grave, sem estancar a pressão do gás." },
          { letter: "D", text: "Continuar a ronda e apenas abrir um chamado no sistema para o turno da noite.", score: -10, explanation: "❌ NEGLIGÊNCIA: O acúmulo contínuo de GLP em recinto fechado atingirá o limite de inflamabilidade com risco iminente de desastre." }
        ]
      },
      {
        id: 2,
        title: "Operador Experiente se Recusando a Usar EPI",
        description: "Um soldador antigo retirou o avental e a máscara facial alegando calor extremo de 34°C: 'Trabalho há 20 anos assim e nunca me queimei'.",
        options: [
          { letter: "A", text: "Autorizar que continue sem avental desde que tome cuidado redobrado com as faíscas.", score: -10, explanation: "❌ ERRO GRAVE: A NR-6 e a NR-1 proíbem qualquer concessão no uso de EPI obrigatório, responsabilizando a empresa por queimaduras." },
          { letter: "B", text: "Paralisar a atividade, dialogar sobre o risco de radiação UV e câncer de pele, disponibilizar ventilação industrial e manter o uso estrito do EPI.", score: 20, explanation: "✅ AÇÃO EXEMPLAR: A segurança não se negocia. Combina fiscalização firme com melhoria ergonômica do ambiente de trabalho (conforto térmico)." },
          { letter: "C", text: "Aplicar imediatamente suspensão disciplinar sem ouvir as queixas nem oferecer alternativas.", score: 10, explanation: "⚠️ PARCIALMENTE EFICAZ: Cumpre a lei, mas a punição sem diálogo não constrói cultura de segurança duradoura." },
          { letter: "D", text: "Fingir que não viu para não arrumar conflito com o líder do setor.", score: -10, explanation: "❌ OMISSÃO GRAVE: A omissão do técnico de segurança valida o comportamento inseguro e aumenta o risco de acidentes severos." }
        ]
      },
      {
        id: 3,
        title: "Trabalho em Altura Urgente com Chuva Iminente",
        description: "A diretoria solicita troca emergencial de telha furada sobre um lote milionário de mercadorias. O céu está escuro com ventos de 50 km/h.",
        options: [
          { letter: "A", text: "Subir correndo para consertar a telha antes que a chuva comece de vez.", score: -10, explanation: "❌ CONDUTA INSEGURA: A pressa em trabalho em altura é causa primordial de quedas fatais por telhas quebradas ou escorregamento." },
          { letter: "B", text: "Vetar o trabalho em altura por intempéries climáticas adversas (NR-35) e implementar contenção no solo protegendo as cargas com lonas plásticas.", score: 20, explanation: "✅ DECISÃO PERFEITA: Vida em primeiro lugar. A NR-35 exige a suspensão imediata de trabalhos em altura sob vento forte e chuva iminente." },
          { letter: "C", text: "Autorizar a subida apenas se os trabalhadores usarem dois talabartes simultâneos.", score: -10, explanation: "❌ INADEQUADO: O vento forte e a telha úmida quebram com facilidade. Nem mesmo dois talabartes anulam a proibição normativa." },
          { letter: "D", text: "Subir você mesmo para não arriscar os operadores contratados.", score: -10, explanation: "❌ INCONSEQUENTE: O técnico de segurança deve zelar pelas regras e liderar pelo exemplo, não assumir riscos suicidas." }
        ]
      },
      {
        id: 4,
        title: "Princípio de Incêndio em Painel de Controle Energizado (440V)",
        description: "Um operador avisa que há fumaça preta e labaredas saindo de um quadro de distribuição elétrica trifásico.",
        options: [
          { letter: "A", text: "Correr e descarregar o extintor de Água Pressurizada (Classe A) mais próximo.", score: -10, explanation: "❌ PERIGO FATAL: Água é condutora de eletricidade e provocará choque elétrico fatal com arco elétrico violento!" },
          { letter: "B", text: "Seccionar a chave geral se houver acesso seguro, evacuar os presentes e combater as chamas com extintor de CO2 ou Pó Químico Seco (Classe C).", score: 20, explanation: "✅ CORRETO: Princípios em equipamentos elétricos energizados exigem agente não-condutor (CO2 ou PQS) após isolamento da fonte." },
          { letter: "C", text: "Pegar papelão e tentar abafar as chamas na força física.", score: -10, explanation: "❌ ERRO GRAVE: Papelão é combustível e alimentará o incêndio, além da proximidade perigosa com componentes energizados." },
          { letter: "D", text: "Jogar terra ou areia com pá metálica dentro do painel.", score: -10, explanation: "❌ ARRISCADO: Pá metálica conduz choque ao encostar nos barramentos vivos." }
        ]
      },
      {
        id: 5,
        title: "Acidente com Corte Profundo e Sangramento Ativo",
        description: "Um ajudante corta o antebraço em chapa de zinco recém-cortada. O corte é extenso e verte sangue vermelho vivo em abundância.",
        options: [
          { letter: "A", text: "Amarrar uma corda no pescoço ou passar pó de café e pomada caseira sobre a ferida.", score: -10, explanation: "❌ GRAVÍSSIMO: Práticas caseiras causam infecções severas e choque hemorrágico." },
          { letter: "B", text: "Comprimir o ferimento com compressa limpa, elevar o braço acima do coração, encaminhar com urgência ao pronto-socorro e emitir a CAT no SESMT.", score: 20, explanation: "✅ CONDUTA CORRETA: Primeiros socorros padrão para hemorragias (compressão direta e elevação), transporte seguro e abertura legal da CAT." },
          { letter: "C", text: "Passar álcool 70% direto no corte profundo e mandar o funcionário lavar a louça para higienizar.", score: -10, explanation: "❌ INCORRETO: Álcool no tecido exposto aprofunda lesões celulares e causa dor lancinante sem estancar hemorragia." },
          { letter: "D", text: "Colocar um curativo pequeno e solicitar que continue trabalhando devagar até o fim do expediente.", score: -10, explanation: "❌ NEGLIGÊNCIA: O sangramento profuso exige atendimento médico imediato e sutura cirúrgica." }
        ]
      }
    ];

    /* ==========================================================================
       6. DATABASE: PROCEDIMENTOS DO MODO 5 (ORDEM CERTA)
       ========================================================================== */
    const ORDER_PROCEDURES = [
      {
        id: 1,
        title: "Procedimento de Bloqueio e Etiquetagem (LOTO)",
        description: "Organize na ordem exata as etapas do protocolo de segurança para intervenção mecânica:",
        correctSteps: [
          "1. Notificar os operadores e equipe afetada sobre a paralisação da máquina",
          "2. Desligar o equipamento através dos botões e controles normais de operação",
          "3. Isolar completamente todas as fontes primárias de energia (elétrica, pneumática, hidráulica)",
          "4. Bloquear com cadeados individuais exclusivos e afixar etiquetas de advertência (LOTO)",
          "5. Dissipar e purgar todas as energias residuais acumuladas (pressão, molas, capacitores)",
          "6. Realizar o teste de estado de energia zero tentando religar a máquina antes de intervir"
        ]
      },
      {
        id: 2,
        title: "Operação Correta de Extintor Portátil (Método PASS)",
        description: "Ordene os passos universais de combate a princípio de incêndio:",
        correctSteps: [
          "1. Puxar a trava de segurança rompendo o lacre plástico",
          "2. Apontar o bico da mangueira para a BASE do fogo a uma distância segura (2 a 3 metros)",
          "3. Apertar o gatilho da alavanca com firmeza para expelir o agente extintor",
          "4. Varrer o jato em movimento de ziguezague horizontal cobrindo toda a área das chamas"
        ]
      },
      {
        id: 3,
        title: "Preparação Rigorosa para Trabalho em Altura (NR-35)",
        description: "Ordene as medidas preventivas desde o planejamento até a subida:",
        correctSteps: [
          "1. Elaborar a Análise de Risco (AR) detalhada e emitir a Permissão de Trabalho (PT)",
          "2. Isolar e sinalizar a área no solo sob o local da atividade para evitar acidentes com queda de materiais",
          "3. Inspecionar visualmente o cinto tipo paraquedista, talabartes e certificar os pontos de ancoragem (15 kN)",
          "4. Vestir e ajustar perfeitamente o cinto paraquedista ajustando pernas, peito e costas",
          "5. Conectar o mosquetão do talabarte ao ponto de ancoragem antes de acessar a zona de risco"
        ]
      }
    ];

    /* ==========================================================================
       7. DATABASE: CARTAS SURPRESA DO MODO 6
       ========================================================================== */
    const SURPRISE_CARDS = [
      { id: 1, title: "Inspeção do MTE!", desc: "Fiscal do Trabalho na fábrica! A próxima questão vale PONTOS EM DOBRO!", icon: "⚖️", effect: "double_points" },
      { id: 2, title: "Alarme de Incêndio!", desc: "Simulação de evacuação! Responda o próximo desafio em até 8 segundos!", icon: "🚨", effect: "fast_time" },
      { id: 3, title: "Colega Distraído!", desc: "Você orientou um novato sobre segurança e ganhou 1 DICA EXTRA no inventário!", icon: "💡", effect: "add_hint" },
      { id: 4, title: "EPI Distribuído!", desc: "Chegou o lote de novos capacetes homologados! Você RECUPEROU 1 VIDA!", icon: "💖", effect: "add_life" },
      { id: 5, title: "Acidente Evitado!", desc: "Quase-acidente relatado e corrigido a tempo! BÔNUS DIRETO DE +50 PONTOS!", icon: "🌟", effect: "add_points" },
      { id: 6, title: "SESMT em Ação!", desc: "Auditoria preventiva impecável! ESCUDO ATIVADO AUTOMATICAMENTE!", icon: "🛡️", effect: "activate_shield" },
      { id: 7, title: "Treinamento Relâmpago!", desc: "DDS realizado com sucesso! Veja uma dica técnica antes de responder!", icon: "📚", effect: "auto_hint" },
      { id: 8, title: "Fiscalização Surpresa!", desc: "Auditor elogiou os procedimentos! SEU COMBO SALTA DIRETO PARA x2!", icon: "🔥", effect: "combo_x2" }
    ];

    /* ==========================================================================
       8. DATABASE: AUDITORIAS DO CHEFE FINAL (MODO 7)
       ========================================================================== */
    const BOSS_SITUATIONS = [
      {
        id: 101,
        title: "Manutenção em Prensa Hidráulica de 100 Toneladas",
        description: "Mecânico posicionou calço de madeira improvisado e entrou sob o martelo da prensa sem calço de segurança mecânico monitorado nem bloqueio hidráulico.",
        correctAnswer: "red",
        explanation: "PERIGO CRÍTICO DE ESMAGAMENTO FATAL. Calço improvisado pode romper sob pressão residual. A NR-12 exige calço de retenção mecânica intertravado e LOTO completo.",
        safeAction: "Interromper imediatamente. Instalar calço mecânico homologado com sensor elétrico de intertravamento e bloquear as válvulas hidráulicas.",
        didYouKnow: "A NR-12 Anexo VIII estabelece requisitos rigorosos de segurança para prensas e similares.",
        svgScene: "machine_safe"
      },
      {
        id: 102,
        title: "Trabalho a Quente Próximo a Solventes",
        description: "Soldador opera maçarico a 2 metros de tambores abertos contendo thinner e tíner de limpeza sem biombo incombustível nem extintor de prontidão.",
        correctAnswer: "red",
        explanation: "PERIGO GRAVE DE EXPLOSÃO. Vapores de solventes inflamáveis formam atmosfera explosiva que detona instantaneamente em contato com faísca.",
        safeAction: "Paralisar trabalho. Remover produtos inflamáveis para raio mínimo de 10 metros, ventilar o local, usar mantas antichama e manter vigia de fogo (fire watch).",
        didYouKnow: "A NR-34 e a NR-20 exigem Permissão para Trabalho a Quente e monitoramento contínuo de gases inflamáveis.",
        svgScene: "wrong_ppe"
      },
      {
        id: 103,
        title: "Entrada em Reator Químico de Resina",
        description: "Trabalhador se prepara para entrar no tanque com PET emitida, medição de oxigênio em 20.9%, exaustão contínua ligada, vigia dedicado e tripé com resgatador instalado.",
        correctAnswer: "green",
        explanation: "SITUAÇÃO SEGURA E EXEMPLAR. Todos os requisitos da NR-33 foram integralmente cumpridos: análise prévia, vigia permanente e sistema de resgate montado.",
        safeAction: "Manter comunicação contínua entre operador e vigia externo a cada 5 minutos até o término da tarefa.",
        didYouKnow: "A NR-33 estabelece que o vigia nunca deve entrar no espaço confinado para resgate sem autorização e equipe reserva.",
        svgScene: "confined_space"
      },
      {
        id: 104,
        title: "Içamento de Viga com Cabo Danificado",
        description: "Guindaste içando viga metálica de 4 toneladas com laço de cabo de aço apresentando 8 arames rompidos e alma de aço esmagada.",
        correctAnswer: "red",
        explanation: "PERIGO GRAVE DE RUPTURA E QUEDA DE CARGA. Cabos com arames rompidos ou deformações plásticas perdem sua capacidade de carga nominal e podem partir subitamente.",
        safeAction: "Descer a carga com cautela ao solo, inutilizar e cortar imediatamente o cabo danificado para descarte e certificar novo acessório de içamento.",
        didYouKnow: "A NBR ISO 4309 e a NR-11 estabelecem critérios rigorosos para descarte de cabos de aço e cintas sintéticas.",
        svgScene: "forklift_overload"
      },
      {
        id: 105,
        title: "Subestação Elétrica Energizada com Água no Piso",
        description: "Após temporal, a canaleta da subestação de 13.800V transbordou formando lâmina de água de 3cm onde ficam os operadores.",
        correctAnswer: "red",
        explanation: "PERIGO EXTREMO DE ELETROCUTAMENTO COLETIVO. Alta tensão na presença de água no solo pode provocar arcos de terra fatais e choque elétrico por tensão de passo.",
        safeAction: "Isolar a subestação pelo disjuntor de montante externo na concessionária, evacuar e acionar equipe especializada de drenagem.",
        didYouKnow: "A NR-10 exige condições ambientais controladas e proibição de trabalhos elétricos em áreas alagadas sem proteção especial.",
        svgScene: "electrical_safe"
      }
    ];

    /* ==========================================================================
       9. CONQUISTAS E MEDALHAS
       ========================================================================== */
    const ACHIEVEMENTS_LIST = [
      { id: 'eagle_eye', name: 'Olho de Águia', desc: 'Acertou 5 situações seguidas sem errar', icon: '🦅' },
      { id: 'no_errors', name: 'Sem Erros', desc: 'Completou uma fase com 100% de precisão', icon: '⭐' },
      { id: 'epi_master', name: 'Mestre dos EPIs', desc: 'Montou o EPI perfeito nas tarefas', icon: '🦺' },
      { id: 'combo_x5', name: 'Combo Supremo', desc: 'Atingiu o multiplicador máximo de combo', icon: '🔥' },
      { id: 'speed_demon', name: 'Velocidade Pura', desc: 'Respondeu 3 situações em menos de 10s', icon: '⚡' },
      { id: 'safety_master', name: 'Mestre da Segurança', desc: 'Concluiu todas as 7 fases da trilha', icon: '👷' },
      { id: 'final_boss', name: 'Técnico Master', desc: 'Venceu a Auditoria do Chefe Final sem falhas', icon: '🏆' }
    ];
    /* ==========================================================================
       10. ILUSTRAÇÕES VETORIAIS SVG PARA CADA SITUAÇÃO
       ========================================================================== */
    const SVGSceneArt = {
      render(type) {
        const bg = `<rect width="600" height="240" fill="#101222"/>
                    <rect y="180" width="600" height="60" fill="#1b1d30"/>
                    <line x1="0" y1="180" x2="600" y2="180" stroke="#2d304a" stroke-width="2"/>`;

        switch(type) {
          case 'machine_safe':
            return `<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg">
              ${bg}
              <!-- Safe Hydraulic Press with Interlocked Guard -->
              <rect x="240" y="30" width="160" height="150" fill="#2c3e50" rx="8" stroke="#34495e" stroke-width="3"/>
              <rect x="280" y="50" width="80" height="40" fill="#7f8c8d"/>
              <rect x="295" y="90" width="50" height="50" fill="#bdc3c7"/>
              <!-- Polycarbonate Shield (Green Border) -->
              <rect x="250" y="70" width="140" height="90" fill="rgba(0, 255, 136, 0.15)" stroke="#00ff88" stroke-width="2" rx="4"/>
              <text x="320" y="120" font-size="12" fill="#00ff88" font-weight="bold" text-anchor="middle">PROTEÇÃO ATIVA</text>
              <!-- Safe Worker with Helmet, Glasses, Ear Muffs, Vest -->
              <circle cx="150" cy="90" r="16" fill="#f1c40f"/> <!-- Helmet -->
              <circle cx="150" cy="100" r="11" fill="#f5cd79"/> <!-- Face -->
              <rect x="142" y="98" width="16" height="5" fill="#4fc3f7" rx="2"/> <!-- Goggles -->
              <rect x="135" y="115" width="30" height="55" fill="#e67e22" rx="4"/> <!-- Safety Vest -->
              <rect x="142" y="122" width="16" height="6" fill="#ecf0f1"/> <!-- Reflective band -->
              <rect x="138" y="170" width="11" height="25" fill="#2c3e50"/>
              <rect x="151" y="170" width="11" height="25" fill="#2c3e50"/>
              <!-- Safe Green Checkmark -->
              <circle cx="480" cy="100" r="32" fill="rgba(0,255,136,0.15)" stroke="#00ff88" stroke-width="3"/>
              <path d="M465 100 L475 112 L498 88" stroke="#00ff88" stroke-width="5" fill="none" stroke-linecap="round"/>
            </svg>`;

          case 'extinguisher_blocked':
            return `<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg">
              ${bg}
              <!-- Red Extinguisher on Wall -->
              <rect x="280" y="40" width="40" height="80" fill="#b71c1c" rx="4"/>
              <rect x="290" y="55" width="20" height="50" fill="#ff1744" rx="6"/>
              <text x="300" y="50" font-size="8" fill="#fff" font-weight="bold" text-anchor="middle">EXTINTOR</text>
              <!-- Big Crates and Pallet completely blocking access -->
              <rect x="240" y="90" width="120" height="90" fill="#8d6e63" stroke="#4e342e" stroke-width="3" rx="4"/>
              <line x1="240" y1="135" x2="360" y2="135" stroke="#4e342e" stroke-width="2"/>
              <text x="300" y="130" font-size="14" fill="#3e2723" font-weight="bold" text-anchor="middle">CARGA PESADA</text>
              <!-- Red Danger Sign -->
              <circle cx="480" cy="100" r="32" fill="rgba(255,68,68,0.15)" stroke="#ff4444" stroke-width="3"/>
              <line x1="465" y1="85" x2="495" y2="115" stroke="#ff4444" stroke-width="5" stroke-linecap="round"/>
              <line x1="495" y1="85" x2="465" y2="115" stroke="#ff4444" stroke-width="5" stroke-linecap="round"/>
              <text x="300" y="215" font-size="12" fill="#ff4444" font-weight="bold" text-anchor="middle">ACESSO BLOQUEADO E VENCIDO</text>
            </svg>`;

          case 'electrical_safe':
            return `<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg">
              ${bg}
              <!-- Electrician with Blue Class B Helmet & Insulated Gloves -->
              <rect x="360" y="50" width="140" height="130" fill="#2c3e50" stroke="#ffd700" stroke-width="2" rx="4"/>
              <circle cx="390" cy="80" r="8" fill="#e74c3c"/>
              <circle cx="420" cy="80" r="8" fill="#2ecc71"/>
              <circle cx="450" cy="80" r="8" fill="#f1c40f"/>
              <!-- Electrician Worker -->
              <circle cx="220" cy="80" r="16" fill="#1e88e5"/> <!-- Blue Helmet -->
              <path d="M210 90 Q220 100 230 90" stroke="#333" stroke-width="2" fill="none"/> <!-- Jugular -->
              <circle cx="220" cy="92" r="11" fill="#f5cd79"/>
              <rect x="205" y="106" width="30" height="55" fill="#34495e" rx="4"/>
              <rect x="230" y="115" width="18" height="10" fill="#ff6f00" rx="2"/> <!-- Insulated Gloves -->
              <!-- Safety Certification Badge -->
              <circle cx="100" cy="100" r="32" fill="rgba(0,255,136,0.15)" stroke="#00ff88" stroke-width="3"/>
              <text x="100" y="98" font-size="10" fill="#00ff88" font-weight="bold" text-anchor="middle">NR-10</text>
              <text x="100" y="112" font-size="9" fill="#00ff88" text-anchor="middle">DIELÉTRICO</text>
            </svg>`;

          case 'corridor_blocked':
            return `<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg">
              ${bg}
              <!-- Green Exit Door partially obscured -->
              <rect x="420" y="50" width="90" height="130" fill="#1b5e20" stroke="#4caf50" stroke-width="3"/>
              <text x="465" y="80" font-size="12" fill="#fff" font-weight="bold" text-anchor="middle">SAÍDA</text>
              <!-- Pallets, drums and junk blocking the walkway -->
              <rect x="360" y="110" width="100" height="70" fill="#8d6e63" stroke="#4e342e" stroke-width="2"/>
              <ellipse cx="280" cy="130" rx="25" ry="10" fill="#0277bd"/>
              <rect x="255" y="130" width="50" height="50" fill="#01579b"/>
              <!-- Red Blocked Sign -->
              <polygon points="120,60 160,130 80,130" fill="#ff1744"/>
              <text x="120" y="118" font-size="20" fill="#fff" font-weight="bold" text-anchor="middle">!</text>
              <text x="120" y="160" font-size="13" fill="#ff4444" font-weight="bold" text-anchor="middle">ROTA OBSTRUÍDA</text>
            </svg>`;

          case 'saw_unguarded':
            return `<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg">
              ${bg}
              <!-- Table Saw Machine Without Guard -->
              <rect x="200" y="100" width="200" height="80" fill="#37474f" stroke="#546e7a" stroke-width="3"/>
              <!-- Spinning Sharp Blade Exposed -->
              <circle cx="300" cy="95" r="38" fill="#b0bec5" stroke="#eceff1" stroke-width="3" stroke-dasharray="10 5"/>
              <circle cx="300" cy="95" r="8" fill="#263238"/>
              <!-- Flying Hot Sparks -->
              <path d="M315 70 L340 50 M320 85 L355 75 M310 60 L330 35" stroke="#ffab00" stroke-width="2.5"/>
              <!-- Red Warning Circle -->
              <circle cx="480" cy="100" r="35" fill="rgba(255,68,68,0.15)" stroke="#ff4444" stroke-width="3"/>
              <text x="480" y="105" font-size="11" fill="#ff4444" font-weight="bold" text-anchor="middle">SEM COIFA</text>
            </svg>`;

          case 'wrong_ppe':
            return `<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg">
              ${bg}
              <!-- Painter with Flimsy Surgical Mask Surrounded by Chemical Fumes -->
              <path d="M260 70 Q300 30 340 70 T420 60" stroke="#00e676" stroke-width="8" fill="none" opacity="0.4"/>
              <path d="M240 100 Q280 60 320 100 T400 90" stroke="#00e676" stroke-width="6" fill="none" opacity="0.4"/>
              <!-- Worker with thin surgical paper mask -->
              <circle cx="200" cy="85" r="16" fill="#f5cd79"/>
              <rect x="190" y="85" width="20" height="12" fill="#ffffff" stroke="#90a4ae" rx="2"/>
              <line x1="185" y1="88" x2="215" y2="88" stroke="#cfd8dc"/>
              <rect x="185" y="105" width="30" height="55" fill="#3f51b5" rx="4"/>
              <!-- Inadequate Mask Notice -->
              <rect x="360" y="70" width="180" height="70" fill="rgba(255,68,68,0.15)" stroke="#ff4444" stroke-width="2" rx="6"/>
              <text x="450" y="95" font-size="12" fill="#ff4444" font-weight="bold" text-anchor="middle">MÁSCARA CIRÚRGICA</text>
              <text x="450" y="115" font-size="10" fill="#fff" text-anchor="middle">NÃO PROTEGE VAPOR TÓXICO</text>
            </svg>`;

          case 'ladder_wrong':
            return `<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg">
              ${bg}
              <!-- Mezzanine / Wall -->
              <rect x="420" y="20" width="180" height="160" fill="#2c3e50"/>
              <!-- Steep Ladder at 80 degrees (Too steep) -->
              <line x1="390" y1="30" x2="410" y2="180" stroke="#cfd8dc" stroke-width="5"/>
              <line x1="405" y1="30" x2="425" y2="180" stroke="#cfd8dc" stroke-width="5"/>
              <line x1="393" y1="60" x2="408" y2="60" stroke="#cfd8dc" stroke-width="3"/>
              <line x1="397" y1="90" x2="412" y2="90" stroke="#cfd8dc" stroke-width="3"/>
              <line x1="401" y1="120" x2="416" y2="120" stroke="#cfd8dc" stroke-width="3"/>
              <line x1="405" y1="150" x2="420" y2="150" stroke="#cfd8dc" stroke-width="3"/>
              <!-- Angle Meter Display -->
              <circle cx="200" cy="100" r="40" fill="rgba(255,215,0,0.12)" stroke="#ffd700" stroke-width="3"/>
              <text x="200" y="95" font-size="16" fill="#ffd700" font-weight="bold" text-anchor="middle">80°</text>
              <text x="200" y="115" font-size="9" fill="#ffd700" text-anchor="middle">ÂNGULO INSTÁVEL</text>
              <text x="200" y="128" font-size="8" fill="#aaa" text-anchor="middle">CORRETO: 65° a 75°</text>
            </svg>`;

          case 'faded_signs':
            return `<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg">
              ${bg}
              <!-- Faded safety ground demarcations -->
              <rect x="80" y="195" width="440" height="15" fill="none" stroke="#ffd700" stroke-width="3" stroke-dasharray="15 30" opacity="0.4"/>
              <path d="M200 185 L220 200 L200 215" stroke="#ffd700" stroke-width="3" fill="none" opacity="0.3"/>
              <text x="300" y="100" font-size="15" fill="#ffd700" font-weight="bold" text-anchor="middle">FAIXAS DE SEGURANÇA DESGASTADAS</text>
              <text x="300" y="125" font-size="11" fill="#bbb" text-anchor="middle">Demarcação ilegível eleva risco de atropelamento e colisão</text>
            </svg>`;

          case 'cable_floor':
            return `<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg">
              ${bg}
              <!-- Extension cord across floor with tape splices -->
              <path d="M60 190 Q200 210 320 185 T540 200" stroke="#f1c40f" stroke-width="5" fill="none"/>
              <rect x="180" y="194" width="20" height="12" fill="#000" rx="2"/>
              <rect x="360" y="185" width="20" height="12" fill="#000" rx="2"/>
              <!-- Sparks from splice -->
              <polygon points="368,175 364,185 372,185 366,195 375,182 369,182" fill="#00e5ff"/>
              <circle cx="150" cy="90" r="32" fill="rgba(255,68,68,0.15)" stroke="#ff4444" stroke-width="3"/>
              <text x="150" y="88" font-size="10" fill="#ff4444" font-weight="bold" text-anchor="middle">TROPEÇO</text>
              <text x="150" y="102" font-size="10" fill="#ff4444" font-weight="bold" text-anchor="middle">+ CHOQUE</text>
            </svg>`;

          case 'expired_extinguisher':
            return `<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg">
              ${bg}
              <!-- Fire Extinguisher with Overdue Inspection Tag -->
              <rect x="220" y="45" width="45" height="110" fill="#b71c1c" rx="8"/>
              <rect x="235" y="30" width="15" height="20" fill="#757575"/>
              <circle cx="242" cy="70" r="12" fill="#ffffff"/>
              <!-- Manometer Gauge in Red zone -->
              <line x1="242" y1="70" x2="236" y2="64" stroke="#d50000" stroke-width="2"/>
              <!-- Yellow Inspection Tag with Expired Date -->
              <rect x="280" y="60" width="160" height="90" fill="#ffd700" stroke="#f57f17" stroke-width="2" rx="4"/>
              <text x="360" y="85" font-size="11" fill="#000" font-weight="bold" text-anchor="middle">INSPEÇÃO PERIÓDICA</text>
              <text x="360" y="108" font-size="16" fill="#b71c1c" font-weight="900" text-anchor="middle">VENCIDO HÁ 2 ANOS</text>
              <text x="360" y="130" font-size="10" fill="#333" text-anchor="middle">Substituir e recarregar</text>
            </svg>`;

          case 'loto_missing':
            return `<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg">
              ${bg}
              <!-- Conveyor Belt with Worker leaning in, switch ON -->
              <rect x="240" y="110" width="220" height="30" fill="#424242"/>
              <circle cx="255" cy="125" r="10" fill="#757575"/>
              <circle cx="445" cy="125" r="10" fill="#757575"/>
              <!-- Disconnect switch on wall with NO PADLOCK -->
              <rect x="140" y="60" width="45" height="70" fill="#e0e0e0" stroke="#9e9e9e" stroke-width="2"/>
              <rect x="155" y="70" width="15" height="25" fill="#d32f2f"/> <!-- Lever in ON position -->
              <circle cx="162" cy="115" r="5" fill="#f44336"/> <!-- Empty padlock hole -->
              <!-- Danger Banner -->
              <rect x="300" y="40" width="220" height="50" fill="rgba(255,68,68,0.2)" stroke="#ff4444" stroke-width="2" rx="4"/>
              <text x="410" y="62" font-size="12" fill="#ff4444" font-weight="bold" text-anchor="middle">SEM BLOQUEIO LOTO</text>
              <text x="410" y="78" font-size="10" fill="#fff" text-anchor="middle">'É rapidinho' = RISCO DE VIDA</text>
            </svg>`;

          case 'height_wrong_anchor':
            return `<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg">
              ${bg}
              <!-- Scaffolding Frame at Height -->
              <line x1="200" y1="30" x2="200" y2="180" stroke="#90a4ae" stroke-width="4"/>
              <line x1="380" y1="30" x2="380" y2="180" stroke="#90a4ae" stroke-width="4"/>
              <line x1="200" y1="90" x2="380" y2="90" stroke="#90a4ae" stroke-width="3"/>
              <!-- Worker on platform with lanyard hooked to OWN BELT instead of beam -->
              <circle cx="280" cy="50" r="12" fill="#f5cd79"/>
              <rect x="272" y="62" width="16" height="30" fill="#e65100"/>
              <!-- Lanyard looping back into clothes -->
              <path d="M280 75 Q250 85 275 88" stroke="#ffd600" stroke-width="4" fill="none"/>
              <circle cx="480" cy="80" r="34" fill="rgba(255,68,68,0.15)" stroke="#ff4444" stroke-width="3"/>
              <text x="480" y="75" font-size="10" fill="#ff4444" font-weight="bold" text-anchor="middle">ANCORAGEM</text>
              <text x="480" y="90" font-size="10" fill="#ff4444" font-weight="bold" text-anchor="middle">INCORRETA</text>
            </svg>`;

          case 'confined_space':
            return `<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg">
              ${bg}
              <!-- Dark storage tank with open manhole, no gas monitor, no attendant -->
              <ellipse cx="300" cy="80" rx="90" ry="30" fill="#37474f" stroke="#78909c" stroke-width="3"/>
              <ellipse cx="300" cy="80" rx="60" ry="18" fill="#101018"/>
              <!-- Toxic Invisible Gas Symbol -->
              <path d="M290 70 Q300 45 310 70" stroke="#81c784" stroke-width="3" fill="none" opacity="0.6"/>
              <rect x="420" y="60" width="150" height="70" fill="rgba(255,68,68,0.15)" stroke="#ff4444" stroke-width="2" rx="4"/>
              <text x="495" y="85" font-size="11" fill="#ff4444" font-weight="bold" text-anchor="middle">SEM VIGIA EXTERNO</text>
              <text x="495" y="105" font-size="10" fill="#fff" text-anchor="middle">SEM TESTE DE OXIGÊNIO</text>
            </svg>`;

          case 'ppe_wrong_use':
            return `<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg">
              ${bg}
              <!-- Welder with goggles pushed up on forehead instead of over eyes -->
              <circle cx="280" cy="85" r="18" fill="#f5cd79"/>
              <!-- Goggles ON FOREHEAD -->
              <rect x="270" y="70" width="20" height="7" fill="#102027" stroke="#00e676" stroke-width="2" rx="2"/>
              <!-- Eyes exposed to torch sparks -->
              <circle cx="275" cy="86" r="2" fill="#000"/>
              <circle cx="285" cy="86" r="2" fill="#000"/>
              <!-- Welding Torch Sparkling near exposed eyes -->
              <line x1="320" y1="120" x2="300" y2="105" stroke="#757575" stroke-width="4"/>
              <circle cx="300" cy="105" r="4" fill="#00e5ff"/>
              <polygon points="305,95 315,100 305,108 300,103" fill="#ffeb3b"/>
              <!-- Alert -->
              <rect x="380" y="70" width="180" height="60" fill="rgba(255,68,68,0.15)" stroke="#ff4444" stroke-width="2" rx="4"/>
              <text x="470" y="94" font-size="11" fill="#ff4444" font-weight="bold" text-anchor="middle">ÓCULOS NA TESTA</text>
              <text x="470" y="112" font-size="10" fill="#fff" text-anchor="middle">EXPOSIÇÃO OCULAR DIRETA</text>
            </svg>`;

          case 'forklift_overload':
            return `<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg">
              ${bg}
              <!-- Forklift leaning forward under massive overload -->
              <rect x="180" y="90" width="110" height="60" fill="#fbc02d" rx="6"/>
              <circle cx="205" cy="165" r="18" fill="#212121" stroke="#757575" stroke-width="4"/>
              <circle cx="270" cy="165" r="18" fill="#212121" stroke="#757575" stroke-width="4"/>
              <rect x="280" y="50" width="8" height="110" fill="#424242"/>
              <!-- Giant Crates Exceeding 2500kg -->
              <rect x="290" y="40" width="90" height="120" fill="#8d6e63" stroke="#4e342e" stroke-width="2"/>
              <text x="335" y="105" font-size="14" fill="#ffeb3b" font-weight="bold" text-anchor="middle">2.500 kg</text>
              <!-- Capacity Gauge in Red -->
              <rect x="420" y="65" width="150" height="70" fill="rgba(255,68,68,0.15)" stroke="#ff4444" stroke-width="2" rx="4"/>
              <text x="495" y="90" font-size="11" fill="#ff4444" font-weight="bold" text-anchor="middle">CAPACIDADE: 2.000 kg</text>
              <text x="495" y="110" font-size="13" fill="#ff4444" font-weight="900" text-anchor="middle">+25% SOBRECARGA</text>
            </svg>`;

          default:
            return `<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg">
              ${bg}
              <circle cx="300" cy="110" r="40" fill="rgba(79,195,247,0.1)" stroke="#4fc3f7" stroke-width="2"/>
              <text x="300" y="115" font-size="14" fill="#4fc3f7" text-anchor="middle">Trabalho Seguro Ltda.</text>
            </svg>`;
        }
      }
    };

    /* ==========================================================================
       11. SISTEMA DE CONFETES (CANVAS ENGINE)
       ========================================================================== */
    const ConfettiEngine = {
      canvas: null,
      ctx: null,
      particles: [],
      animationId: null,

      init() {
        this.canvas = document.getElementById('confetti-canvas');
        if (this.canvas) {
          this.ctx = this.canvas.getContext('2d');
          this.resize();
          window.addEventListener('resize', () => this.resize());
        }
      },

      resize() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
      },

      explode(count = 120) {
        this.init();
        if (!this.ctx) return;

        const colors = ['#00ff88', '#ffd700', '#ff4444', '#4fc3f7', '#b388ff', '#ffffff'];
        for (let i = 0; i < count; i++) {
          this.particles.push({
            x: window.innerWidth * (0.3 + Math.random() * 0.4),
            y: window.innerHeight * 0.4,
            vx: (Math.random() - 0.5) * 16,
            vy: (Math.random() - 0.8) * 18,
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            vRot: (Math.random() - 0.5) * 10,
            opacity: 1
          });
        }

        if (!this.animationId) {
          this.animate();
        }
      },

      animate() {
        if (!this.ctx) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = this.particles.length - 1; i >= 0; i--) {
          const p = this.particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.35; // gravity
          p.vx *= 0.98;
          p.rotation += p.vRot;
          p.opacity -= 0.007;

          if (p.opacity <= 0 || p.y > window.innerHeight + 20) {
            this.particles.splice(i, 1);
            continue;
          }

          this.ctx.save();
          this.ctx.translate(p.x, p.y);
          this.ctx.rotate((p.rotation * Math.PI) / 180);
          this.ctx.globalAlpha = Math.max(0, p.opacity);
          this.ctx.fillStyle = p.color;
          this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          this.ctx.restore();
        }

        if (this.particles.length > 0) {
          this.animationId = requestAnimationFrame(() => this.animate());
        } else {
          this.animationId = null;
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
      }
    };
    /* ==========================================================================
       12. GAME APP CONTROLLER & LOGIC
       ========================================================================== */
    const GameApp = {
      // Estado Global
      mode: 'solo', // 'solo' | 'competition'
      difficulty: 1, // 1 (30s) | 2 (20s) | 3 (15s)
      currentStage: 1,
      unlockedStage: 1,
      score: 0,
      lives: 3,
      comboIndex: 0,
      comboMultipliers: [1, 1.5, 2, 2.5, 3],
      timerSeconds: 30,
      timerMaxSeconds: 30,
      timerInterval: null,
      questionStartTime: 0,
      powerUps: { hint: 3, swap: 2, shield: 1 },
      shieldActive: false,
      
      // Histórico e Estatísticas
      hitsCount: 0,
      errorsCount: 0,
      speedBonusCount: 0,
      perfectEpiCount: 0,
      mistakesHistory: [],
      achievementsUnlocked: new Set(),

      // Competição
      teamCount: 2,
      teams: [
        { id: 1, name: 'Equipe Alfa', color: '#00ff88', score: 0, lives: 3 },
        { id: 2, name: 'Equipe Beta', color: '#ffd700', score: 0, lives: 3 },
        { id: 3, name: 'Equipe Gama', color: '#4fc3f7', score: 0, lives: 3 },
        { id: 4, name: 'Equipe Delta', color: '#ff4444', score: 0, lives: 3 }
      ],
      currentTeamIdx: 0,

      // Estados de cada Modo
      m1CurrentIdx: 0,
      m1FilteredList: [],
      
      m2FoundRisks: new Set(),
      m2HazardsInfo: {
        1: { name: "Extintor Bloqueado", nr: "NR-23", desc: "Palete de madeira e caixas empilhadas na frente do extintor, impedindo o combate a princípio de incêndio." },
        2: { name: "Cabo de Energia no Chão", nr: "NR-10", desc: "Extensão com emendas improvisadas no meio da passagem de pedestres gerando risco de choque e queda." },
        3: { name: "Máquina Sem Proteção", nr: "NR-12", desc: "Serra/rebolo em operação sem a coifa protetora contra estilhaços e contato acidental com partes cortantes." },
        4: { name: "Escada em Ângulo Incorreto", nr: "NR-18 / NR-35", desc: "Escada apoiada a 85 graus, muito íngreme e sem amarração, com altíssimo risco de queda para trás." },
        5: { name: "Trabalhador Desprovido de EPI", nr: "NR-6", desc: "Operador em área fabril sem capacete e óculos de proteção perto de fontes geradoras de fagulhas." },
        6: { name: "Tambor Químico Vazando sem Rótulo", nr: "NR-26", desc: "Vazamento de fluido químico tóxico sem identificação GHS e sem contenção em bacia." }
      },

      m3TaskIdx: 0,
      m3SelectedEPIs: new Set(),

      m4ScenarioIdx: 0,

      m5ProcIdx: 0,
      m5CurrentOrder: [],

      m6CurrentCard: null,
      m6ChallengeActive: false,

      m7BossIdx: 0,
      m7Streak: 0,

      // Next Callback após fechar feedback modal
      nextActionCallback: null,

      /* ------------------------------------------------------------------------
         INICIALIZAÇÃO DO JOGO
         ------------------------------------------------------------------------ */
      init() {
        ConfettiEngine.init();
        this.startHeroTrafficLight();
        this.renderStageTrail();
        this.renderTeamInputs();
        this.updateHUD();
      },

      startHeroTrafficLight() {
        const red = document.getElementById('hero-lens-red');
        const yellow = document.getElementById('hero-lens-yellow');
        const green = document.getElementById('hero-lens-green');

        let step = 0;
        setInterval(() => {
          if (!red || !yellow || !green) return;
          red.classList.remove('active');
          yellow.classList.remove('active');
          green.classList.remove('active');

          if (step === 0) red.classList.add('active');
          else if (step === 1) yellow.classList.add('active');
          else if (step === 2) green.classList.add('active');

          step = (step + 1) % 3;
        }, 1200);
      },

      showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        const target = document.getElementById(screenId);
        if (target) {
          target.classList.add('active');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      },

      selectDifficulty(lvl) {
        this.difficulty = lvl;
        document.querySelectorAll('.level-btn').forEach(btn => {
          btn.classList.toggle('selected', parseInt(btn.dataset.level) === lvl);
        });
        SoundFX.play('click');
      },

      startSoloMode() {
        SoundFX.play('click');
        this.mode = 'solo';
        this.score = 0;
        this.lives = 3;
        this.comboIndex = 0;
        this.unlockedStage = 1;
        this.powerUps = { hint: 3, swap: 2, shield: 1 };
        this.mistakesHistory = [];
        this.hitsCount = 0;
        this.errorsCount = 0;
        this.updateHUD();
        this.goToMap();
      },

      goToCompetitionSetup() {
        SoundFX.play('click');
        this.showScreen('screen-competition-setup');
      },

      setTeamCount(count) {
        this.teamCount = count;
        document.querySelectorAll('.team-count-btn').forEach(b => {
          b.classList.toggle('active', parseInt(b.textContent) === count);
        });
        this.renderTeamInputs();
        SoundFX.play('click');
      },

      renderTeamInputs() {
        const container = document.getElementById('teams-inputs-container');
        if (!container) return;
        container.innerHTML = '';

        for (let i = 0; i < this.teamCount; i++) {
          const t = this.teams[i];
          const row = document.createElement('div');
          row.className = 'team-input-row';
          row.innerHTML = `
            <input type="color" class="team-color-picker" value="${t.color}" onchange="GameApp.teams[${i}].color = this.value">
            <input type="text" class="team-name-input" value="${t.name}" onchange="GameApp.teams[${i}].name = this.value">
            <span style="font-weight: 800; color: ${t.color}; font-size: 0.9rem;">Equipe ${i + 1}</span>
          `;
          container.appendChild(row);
        }
      },

      startCompetitionMode() {
        SoundFX.play('levelUp');
        this.mode = 'competition';
        this.currentTeamIdx = 0;
        for (let i = 0; i < this.teamCount; i++) {
          this.teams[i].score = 0;
          this.teams[i].lives = 3;
        }
        this.score = 0;
        this.lives = 3;
        this.unlockedStage = 1;
        this.powerUps = { hint: 3, swap: 2, shield: 1 };
        this.mistakesHistory = [];
        this.hitsCount = 0;
        this.errorsCount = 0;
        this.updateHUD();
        this.goToMap();
      },

      goToMap() {
        this.stopTimer();
        this.renderStageTrail();
        this.showScreen('screen-map');
      },

      renderStageTrail() {
        const stages = [
          { id: 1, name: "Semáforo Rápido", icon: "🚦", desc: "15 situações críticas de trabalho: Verde, Amarelo ou Vermelho" },
          { id: 2, name: "Caça aos Riscos", icon: "🔎", desc: "Descubra 6 armadilhas ocultas no galpão industrial em 90s" },
          { id: 3, name: "Monte o EPI", icon: "🦺", desc: "Equipe profissionais para solda, eletricidade, químicos e altura" },
          { id: 4, name: "Decisão do Técnico", icon: "🛠️", desc: "Tome decisões gerenciais sob pressão em emergências reais" },
          { id: 5, name: "Ordem Certa", icon: "🔢", desc: "Organize procedimentos de LOTO, Extintores e Trabalho em Altura" },
          { id: 6, name: "Carta Surpresa", icon: "🃏", desc: "Sorteie modificadores do SESMT com multiplicadores especiais" },
          { id: 7, name: "Chefe Final", icon: "👷", desc: "A grande auditoria de segurança sem tolerância a erros" }
        ];

        const container = document.getElementById('map-trail-stages');
        if (!container) return;
        container.innerHTML = '';

        stages.forEach(st => {
          const isUnlocked = st.id <= this.unlockedStage;
          const isCurrent = st.id === this.unlockedStage;
          const isCompleted = st.id < this.unlockedStage;

          const card = document.createElement('div');
          card.className = `stage-card ${isUnlocked ? 'unlocked' : 'locked'} ${isCurrent ? 'current' : ''} ${isCompleted ? 'completed' : ''}`;
          if (isUnlocked) {
            card.onclick = () => this.launchStage(st.id);
          }

          card.innerHTML = `
            <div class="stage-icon-circle">${st.icon}</div>
            <div class="stage-info">
              <div class="stage-number">Fase ${st.id} • ${isCompleted ? 'Concluída ✅' : isCurrent ? 'Fase Atual 🎯' : 'Bloqueada 🔒'}</div>
              <div class="stage-title">${st.name}</div>
              <div class="stage-desc">${st.desc}</div>
            </div>
            <div class="stage-status-badge">
              ${isCompleted ? '⭐' : isCurrent ? '▶️' : '🔒'}
            </div>
          `;
          container.appendChild(card);
        });
      },

      launchStage(stageId) {
        SoundFX.play('click');
        this.currentStage = stageId;

        if (stageId === 1) this.startMode1();
        else if (stageId === 2) this.startMode2();
        else if (stageId === 3) this.startMode3();
        else if (stageId === 4) this.startMode4();
        else if (stageId === 5) this.startMode5();
        else if (stageId === 6) this.startMode6();
        else if (stageId === 7) this.startMode7();
      },

      /* ------------------------------------------------------------------------
         SISTEMA DE HUD, PONTUAÇÃO, VIDAS E COMBOS
         ------------------------------------------------------------------------ */
      updateHUD() {
        const hudScore = document.getElementById('hud-score');
        const hudLives = document.getElementById('hud-lives');
        const hudCombo = document.getElementById('hud-combo');
        const hudHint = document.getElementById('hud-powerup-hint');
        const hudSwap = document.getElementById('hud-powerup-swap');
        const hudShield = document.getElementById('hud-powerup-shield');
        const teamBadge = document.getElementById('team-turn-badge');
        const teamDot = document.getElementById('team-turn-dot');
        const teamName = document.getElementById('team-turn-name');

        let displayScore = this.score;
        let displayLives = this.lives;

        if (this.mode === 'competition') {
          const curTeam = this.teams[this.currentTeamIdx];
          displayScore = curTeam.score;
          displayLives = curTeam.lives;

          if (teamBadge && teamDot && teamName) {
            teamBadge.style.display = 'flex';
            teamDot.style.background = curTeam.color;
            teamDot.style.color = curTeam.color;
            teamName.textContent = curTeam.name;
          }
        } else {
          if (teamBadge) teamBadge.style.display = 'none';
        }

        if (hudScore) hudScore.textContent = `${displayScore} pts`;
        if (hudLives) {
          hudLives.textContent = '❤️'.repeat(Math.max(0, displayLives)) || '💀';
        }
        if (hudCombo) {
          hudCombo.textContent = `x${this.comboMultipliers[this.comboIndex]}`;
        }

        if (hudHint) hudHint.textContent = this.powerUps.hint;
        if (hudSwap) hudSwap.textContent = this.powerUps.swap;
        if (hudShield) {
          hudShield.textContent = this.powerUps.shield;
          const btnShield = document.getElementById('powerup-shield');
          if (btnShield) {
            btnShield.style.borderColor = this.shieldActive ? 'var(--green)' : '';
            btnShield.style.boxShadow = this.shieldActive ? 'var(--glow-green)' : '';
          }
        }
      },

      updateProgressBar(pct) {
        const fill = document.getElementById('hud-progress-fill');
        if (fill) fill.style.width = `${Math.min(100, Math.max(0, pct))}%`;
      },

      addScore(basePoints, isSpeedBonus = false) {
        const mult = this.comboMultipliers[this.comboIndex];
        let total = Math.round(basePoints * mult);

        if (isSpeedBonus) {
          total += 5;
          this.speedBonusCount++;
          if (this.speedBonusCount >= 3) {
            this.checkAchievement('speed_demon');
          }
        }

        if (this.mode === 'competition') {
          this.teams[this.currentTeamIdx].score += total;
        } else {
          this.score += total;
        }

        this.hitsCount++;
        this.comboIndex = Math.min(this.comboIndex + 1, this.comboMultipliers.length - 1);
        if (this.comboIndex === this.comboMultipliers.length - 1) {
          this.checkAchievement('combo_x5');
        }

        this.updateHUD();
        return total;
      },

      loseLife(severity = 'severe') {
        if (this.shieldActive) {
          this.shieldActive = false;
          SoundFX.play('shield');
          this.triggerToast("🛡️ Escudo Utilizado!", "O escudo absorveu a penalidade de vida com sucesso!");
          this.updateHUD();
          return;
        }

        this.comboIndex = 0;
        this.errorsCount++;

        if (severity === 'severe') {
          if (this.mode === 'competition') {
            this.teams[this.currentTeamIdx].lives--;
            if (this.teams[this.currentTeamIdx].lives <= 0) {
              this.handleGameOver();
            }
          } else {
            this.lives--;
            if (this.lives <= 0) {
              this.handleGameOver();
            }
          }
        } else {
          // Erro leve: deduz pontos
          if (this.mode === 'competition') {
            this.teams[this.currentTeamIdx].score = Math.max(0, this.teams[this.currentTeamIdx].score - 5);
          } else {
            this.score = Math.max(0, this.score - 5);
          }
        }

        this.updateHUD();
      },

      handleGameOver() {
        SoundFX.play('gameOver');
        alert("⚠️ Fim de Jogo! As vidas foram esgotadas. Redirecionando para a avaliação final.");
        this.showEndGame();
      },

      usePowerUp(type) {
        if (this.powerUps[type] <= 0) {
          SoundFX.play('wrong');
          return;
        }

        SoundFX.play('powerup');
        this.powerUps[type]--;

        if (type === 'hint') {
          this.triggerToast("💡 Dica do SESMT", "Consulte a norma técnica: analise se todos os controles coletivos e individuais estão operantes!");
        } else if (type === 'swap') {
          this.triggerToast("⏭️ Situação Trocada", "Situação ignorada sem perda de pontos ou vidas!");
          this.stopTimer();
          if (this.currentStage === 1) {
            this.m1CurrentIdx = (this.m1CurrentIdx + 1) % this.m1FilteredList.length;
            this.loadMode1Situation();
          }
        } else if (type === 'shield') {
          this.shieldActive = true;
          this.triggerToast("🛡️ Escudo Ativado", "Seu próximo erro não custará vidas!");
        }

        this.updateHUD();
      },

      startTimer(seconds, onTick, onExpire) {
        this.stopTimer();
        this.timerSeconds = seconds;
        this.timerMaxSeconds = seconds;
        this.questionStartTime = Date.now();

        const hudTimer = document.getElementById('hud-timer');
        if (hudTimer) hudTimer.textContent = `${this.timerSeconds}s`;

        this.timerInterval = setInterval(() => {
          this.timerSeconds--;
          if (hudTimer) hudTimer.textContent = `${this.timerSeconds}s`;

          if (this.timerSeconds <= 5 && this.timerSeconds > 0) {
            SoundFX.play('tick');
          }

          if (onTick) onTick(this.timerSeconds);

          if (this.timerSeconds <= 0) {
            this.stopTimer();
            if (onExpire) onExpire();
          }
        }, 1000);
      },

      stopTimer() {
        if (this.timerInterval) {
          clearInterval(this.timerInterval);
          this.timerInterval = null;
        }
      },

      /* ------------------------------------------------------------------------
         MODO 1: SEMÁFORO RÁPIDO
         ------------------------------------------------------------------------ */
      startMode1() {
        // Filtrar ou ordenar de acordo com dificuldade
        if (this.difficulty === 1) {
          this.m1FilteredList = situations.filter(s => s.level <= 1);
          this.timerMaxSeconds = 30;
        } else if (this.difficulty === 2) {
          this.m1FilteredList = situations.filter(s => s.level <= 2);
          this.timerMaxSeconds = 20;
        } else {
          this.m1FilteredList = situations;
          this.timerMaxSeconds = 15;
        }

        this.m1CurrentIdx = 0;
        this.showScreen('screen-mode1');
        this.loadMode1Situation();
      },

      loadMode1Situation() {
        const item = this.m1FilteredList[this.m1CurrentIdx];
        if (!item) {
          this.completeStage(1);
          return;
        }

        const tag = document.getElementById('mode1-tag');
        const levelName = document.getElementById('mode1-level-name');
        const title = document.getElementById('mode1-title');
        const desc = document.getElementById('mode1-desc');
        const scene = document.getElementById('mode1-scene-svg');

        if (tag) tag.textContent = `Fase 1 • Situação ${this.m1CurrentIdx + 1}/${this.m1FilteredList.length}`;
        if (levelName) {
          levelName.textContent = item.level === 1 ? 'Nível: Estagiário' : item.level === 2 ? 'Nível: Técnico' : 'Nível: Especialista';
        }
        if (title) title.textContent = item.title;
        if (desc) desc.textContent = item.description;
        if (scene) scene.innerHTML = SVGSceneArt.render(item.svgScene);

        this.updateProgressBar((this.m1CurrentIdx / this.m1FilteredList.length) * 100);

        this.startTimer(this.timerMaxSeconds, null, () => {
          this.handleSignalTimeout();
        });
      },

      handleSignalChoice(chosenColor) {
        this.stopTimer();
        const item = this.m1FilteredList[this.m1CurrentIdx];
        const isCorrect = chosenColor === item.correctAnswer;
        const elapsedSec = (Date.now() - this.questionStartTime) / 1000;
        const isSpeed = elapsedSec < 10;

        if (isCorrect) {
          SoundFX.play('correct');
          const pts = this.addScore(10, isSpeed);
          this.showFeedbackModal({
            correct: true,
            title: `Excelente! +${pts} pts ${isSpeed ? '⚡ Bônus Velocidade!' : ''}`,
            why: item.explanation,
            action: item.safeAction,
            nr: item.didYouKnow
          });
        } else {
          SoundFX.play('wrong');
          // Classificar vermelho como verde = severo (-1 vida)
          const isSevere = (item.correctAnswer === 'red' && chosenColor === 'green');
          this.loseLife(isSevere ? 'severe' : 'light');

          this.mistakesHistory.push({
            phase: "Semáforo Rápido",
            title: item.title,
            yourChoice: chosenColor.toUpperCase(),
            correct: item.correctAnswer.toUpperCase(),
            why: item.explanation
          });

          this.showFeedbackModal({
            correct: false,
            title: isSevere ? `Perigo Grave Ignorado! -1 Vida` : `Atenção Necessária! -5 pts`,
            why: item.explanation,
            action: item.safeAction,
            nr: item.didYouKnow
          });
        }

        this.nextActionCallback = () => {
          this.m1CurrentIdx++;
          if (this.m1CurrentIdx < this.m1FilteredList.length) {
            this.rotateTeamTurn();
            this.loadMode1Situation();
          } else {
            this.completeStage(1);
          }
        };
      },

      handleSignalTimeout() {
        SoundFX.play('wrong');
        this.loseLife('severe');
        const item = this.m1FilteredList[this.m1CurrentIdx];

        this.mistakesHistory.push({
          phase: "Semáforo Rápido",
          title: item.title,
          yourChoice: "TEMPO ESGOTADO",
          correct: item.correctAnswer.toUpperCase(),
          why: "O tempo de análise expirou! Em emergências, a lentidão excessiva custa vidas."
        });

        this.showFeedbackModal({
          correct: false,
          title: "Tempo Esgotado! -1 Vida",
          why: item.explanation,
          action: item.safeAction,
          nr: item.didYouKnow
        });

        this.nextActionCallback = () => {
          this.m1CurrentIdx++;
          if (this.m1CurrentIdx < this.m1FilteredList.length) {
            this.rotateTeamTurn();
            this.loadMode1Situation();
          } else {
            this.completeStage(1);
          }
        };
      },

      /* ------------------------------------------------------------------------
         MODO 2: CAÇA AOS RISCOS
         ------------------------------------------------------------------------ */
      startMode2() {
        this.showScreen('screen-mode2');
        this.m2FoundRisks.clear();
        document.querySelectorAll('.hazard-hotspot').forEach(el => el.classList.remove('found'));
        const counter = document.getElementById('caca-counter');
        if (counter) counter.textContent = '0 / 6';

        this.updateProgressBar(0);

        this.startTimer(90, (sec) => {
          this.updateProgressBar(((90 - sec) / 90) * 100);
        }, () => {
          this.finishMode2(false);
        });
      },

      foundHazard(hazardId, event) {
        if (event) event.stopPropagation();
        if (this.m2FoundRisks.has(hazardId)) return;

        this.m2FoundRisks.add(hazardId);
        SoundFX.play('correct');

        const el = document.getElementById(`hotspot-${hazardId}`);
        if (el) el.classList.add('found');

        const info = this.m2HazardsInfo[hazardId];
        this.addScore(15);
        this.triggerToast(`✅ Risco Detectado: ${info.name}`, `${info.nr} • ${info.desc}`);

        const counter = document.getElementById('caca-counter');
        if (counter) counter.textContent = `${this.m2FoundRisks.size} / 6`;

        if (this.m2FoundRisks.size === 6) {
          this.stopTimer();
          setTimeout(() => this.finishMode2(true), 600);
        }
      },

      handleFactoryClick(e) {
        if (e.target.classList.contains('hazard-hotspot')) return;

        SoundFX.play('wrong');
        if (this.mode === 'competition') {
          this.teams[this.currentTeamIdx].score = Math.max(0, this.teams[this.currentTeamIdx].score - 5);
        } else {
          this.score = Math.max(0, this.score - 5);
        }
        this.updateHUD();

        // Feedback flutuante "-5"
        const wrapper = document.getElementById('factory-scene-wrapper');
        if (wrapper) {
          const rect = wrapper.getBoundingClientRect();
          const span = document.createElement('span');
          span.className = 'floating-feedback';
          span.style.color = 'var(--red)';
          span.style.left = `${e.clientX - rect.left - 10}px`;
          span.style.top = `${e.clientY - rect.top - 20}px`;
          span.textContent = '-5 pts';
          wrapper.appendChild(span);
          setTimeout(() => span.remove(), 800);
        }
      },

      finishMode2(allFound) {
        if (allFound) {
          SoundFX.play('levelUp');
          this.checkAchievement('eagle_eye');
        }

        let summaryText = Object.values(this.m2HazardsInfo).map(h => `• ${h.name} (${h.nr}): ${h.desc}`).join('\n\n');

        this.showFeedbackModal({
          correct: allFound,
          title: allFound ? "Perfeito! Todos os 6 Riscos Eliminados!" : "Tempo Esgotado no Galpão!",
          why: summaryText,
          action: "A inspeção periódica de segurança do trabalho no galpão deve eliminar de imediato os bloqueios de rota, improvisos elétricos e desvios de EPI.",
          nr: "NR-12, NR-10, NR-23, NR-35 e NR-26."
        });

        this.nextActionCallback = () => {
          this.completeStage(2);
        };
      },

      /* ------------------------------------------------------------------------
         MODO 3: MONTE O EPI
         ------------------------------------------------------------------------ */
      startMode3() {
        this.m3TaskIdx = 0;
        this.showScreen('screen-mode3');
        this.renderEpiLocker();
        this.loadEpiTask();
      },

      renderEpiLocker() {
        const container = document.getElementById('epi-locker-container');
        if (!container) return;
        container.innerHTML = '';

        // Mapa de categorias com rótulos amigáveis e emojis
        const categoryLabels = {
          cabeca:       '🪖 Proteção da Cabeça',
          olhos:        '👁️ Proteção dos Olhos',
          facial:       '😷 Proteção Facial',
          respiratorio: '🫁 Proteção Respiratória',
          audicao:      '👂 Proteção Auditiva',
          maos:         '🧤 Proteção das Mãos',
          corpo:        '🦺 Proteção do Corpo',
          altura:       '🧗 Proteção Contra Quedas',
          pes:          '👢 Proteção dos Pés',
          pele:         '🌞 Proteção da Pele',
          sinalizacao:  '🔆 Visibilidade / Sinalização'
        };

        // Agrupa por categoria
        const grouped = {};
        EPI_DATABASE.forEach(item => {
          if (!grouped[item.category]) grouped[item.category] = [];
          grouped[item.category].push(item);
        });

        Object.entries(categoryLabels).forEach(([cat, label]) => {
          const items = grouped[cat];
          if (!items || items.length === 0) return;

          // Rótulo de categoria
          const catLabel = document.createElement('div');
          catLabel.className = 'epi-category-label';
          catLabel.textContent = label;
          container.appendChild(catLabel);

          // Cards da categoria
          items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'epi-item-card';
            card.id = `epi-card-${item.id}`;
            card.title = item.name;
            card.onclick = () => this.toggleEpiSelection(item.id);
            card.innerHTML = `
              <div class="epi-svg-icon">${item.svg}</div>
              <div class="epi-item-name">${item.name}</div>
            `;
            container.appendChild(card);
          });
        });
      },

      loadEpiTask() {
        const task = EPI_TASKS[this.m3TaskIdx];
        if (!task) {
          this.completeStage(3);
          return;
        }

        this.m3SelectedEPIs.clear();
        this.updateEquippedShelf();

        const counter = document.getElementById('epi-task-counter');
        const title = document.getElementById('epi-task-title');
        const desc = document.getElementById('epi-task-desc');

        if (counter) counter.textContent = `Tarefa ${this.m3TaskIdx + 1}/${EPI_TASKS.length}`;
        if (title) title.textContent = task.title;
        if (desc) desc.textContent = task.description;

        document.querySelectorAll('.epi-item-card').forEach(c => c.classList.remove('selected'));
        this.updateProgressBar((this.m3TaskIdx / EPI_TASKS.length) * 100);
      },

      toggleEpiSelection(epiId) {
        SoundFX.play('click');
        if (this.m3SelectedEPIs.has(epiId)) {
          this.m3SelectedEPIs.delete(epiId);
        } else {
          this.m3SelectedEPIs.add(epiId);
        }

        const card = document.getElementById(`epi-card-${epiId}`);
        if (card) card.classList.toggle('selected', this.m3SelectedEPIs.has(epiId));

        this.updateEquippedShelf();
      },

      updateEquippedShelf() {
        const shelf = document.getElementById('epi-equipped-shelf');
        const count = document.getElementById('epi-equipped-count');
        if (count) count.textContent = this.m3SelectedEPIs.size;
        if (!shelf) return;
        shelf.innerHTML = '';

        this.m3SelectedEPIs.forEach(id => {
          const item = EPI_DATABASE.find(e => e.id === id);
          if (!item) return;

          const pill = document.createElement('div');
          pill.className = 'stat-badge';
          pill.style.fontSize = '0.75rem';
          pill.style.padding = '0.2rem 0.5rem';
          pill.style.cursor = 'pointer';
          pill.onclick = () => this.toggleEpiSelection(id);
          pill.innerHTML = `<span>❌</span> <span>${item.name}</span>`;
          shelf.appendChild(pill);
        });
      },

      confirmEpiSelection() {
        const task = EPI_TASKS[this.m3TaskIdx];
        let correctCount = 0;
        let wrongCount = 0;

        task.mandatory.forEach(id => {
          if (this.m3SelectedEPIs.has(id)) correctCount++;
          else wrongCount++;
        });

        this.m3SelectedEPIs.forEach(id => {
          if (!task.mandatory.includes(id) && !task.optional.includes(id)) {
            wrongCount++;
          }
          // EPI proibido para a tarefa penaliza ainda mais
          if (task.forbidden && task.forbidden.includes(id)) {
            wrongCount++;
          }
        });

        const isPerfect = (wrongCount === 0);
        if (isPerfect) {
          SoundFX.play('correct');
          this.addScore(correctCount * 5);
          this.perfectEpiCount++;
          if (this.perfectEpiCount >= 3) {
            this.checkAchievement('epi_master');
          }
        } else {
          SoundFX.play('wrong');
          this.loseLife('light');
        }

        const mandatoryNames = task.mandatory.map(id => EPI_DATABASE.find(e => e.id === id)?.name).join(', ');
        const optionalNames = task.optional.map(id => EPI_DATABASE.find(e => e.id === id)?.name).join(', ') || 'Nenhum';
        const forbiddenNames = (task.forbidden || []).map(id => EPI_DATABASE.find(e => e.id === id)?.name).filter(Boolean).join(', ') || 'Nenhum';
        const nrRef = task.nr || 'NR-6';

        this.showFeedbackModal({
          correct: isPerfect,
          title: isPerfect ? "Configuração de EPI Perfeita!" : "EPI Incompleto ou Incorreto!",
          why: task.explanation,
          action: `✅ Obrigatórios: ${mandatoryNames}.\n⚠️ Opcionais aceitos: ${optionalNames}.\n❌ NUNCA usar aqui: ${forbiddenNames}.`,
          nr: `${nrRef} — O EPI deve ser adequado ao risco específico da atividade. EPI errado pode ser tão perigoso quanto nenhum EPI!`
        });

        this.nextActionCallback = () => {
          this.m3TaskIdx++;
          if (this.m3TaskIdx < EPI_TASKS.length) {
            this.rotateTeamTurn();
            this.loadEpiTask();
          } else {
            this.completeStage(3);
          }
        };
      },

      /* ------------------------------------------------------------------------
         MODO 4: DECISÃO DO TÉCNICO
         ------------------------------------------------------------------------ */
      startMode4() {
        this.m4ScenarioIdx = 0;
        this.showScreen('screen-mode4');
        this.loadMode4Scenario();
      },

      loadMode4Scenario() {
        const item = DECISION_SCENARIOS[this.m4ScenarioIdx];
        if (!item) {
          this.completeStage(4);
          return;
        }

        const counter = document.getElementById('decision-counter');
        const title = document.getElementById('decision-title');
        const desc = document.getElementById('decision-desc');
        const container = document.getElementById('decision-options-container');

        if (counter) counter.textContent = `Cenário ${this.m4ScenarioIdx + 1}/5`;
        if (title) title.textContent = item.title;
        if (desc) desc.textContent = item.description;

        this.updateProgressBar((this.m4ScenarioIdx / DECISION_SCENARIOS.length) * 100);

        if (!container) return;
        container.innerHTML = '';

        item.options.forEach(opt => {
          const card = document.createElement('div');
          card.className = 'option-card';
          card.onclick = () => this.selectDecisionOption(opt);
          card.innerHTML = `
            <div class="option-letter">${opt.letter}</div>
            <div class="option-text">${opt.text}</div>
          `;
          container.appendChild(card);
        });
      },

      selectDecisionOption(opt) {
        const item = DECISION_SCENARIOS[this.m4ScenarioIdx];
        const isBest = opt.score === 20;

        if (isBest) {
          SoundFX.play('correct');
          this.addScore(20);
        } else if (opt.score > 0) {
          SoundFX.play('tick');
          this.addScore(10);
        } else {
          SoundFX.play('wrong');
          this.loseLife('severe');
          this.mistakesHistory.push({
            phase: "Decisão do Técnico",
            title: item.title,
            yourChoice: `Opção ${opt.letter}`,
            correct: "Opção B",
            why: opt.explanation
          });
        }

        this.showFeedbackModal({
          correct: isBest,
          title: isBest ? "Decisão Exemplar do SESMT! (+20 pts)" : opt.score > 0 ? "Ação Parcialmente Eficaz (+10 pts)" : "Decisão Insegura! (-10 pts e -1 Vida)",
          why: opt.explanation,
          action: "Em situações de crise, preserve a integridade física coletiva e suspenda imediatamente operações de risco iminente.",
          nr: "Normas Regulamentadoras NR-1, NR-10 e NR-35."
        });

        this.nextActionCallback = () => {
          this.m4ScenarioIdx++;
          if (this.m4ScenarioIdx < DECISION_SCENARIOS.length) {
            this.rotateTeamTurn();
            this.loadMode4Scenario();
          } else {
            this.completeStage(4);
          }
        };
      },

      /* ------------------------------------------------------------------------
         MODO 5: ORDEM CERTA
         ------------------------------------------------------------------------ */
      startMode5() {
        this.m5ProcIdx = 0;
        this.showScreen('screen-mode5');
        this.loadMode5Procedure();
      },

      loadMode5Procedure() {
        const proc = ORDER_PROCEDURES[this.m5ProcIdx];
        if (!proc) {
          this.completeStage(5);
          return;
        }

        const counter = document.getElementById('order-proc-counter');
        const title = document.getElementById('order-title');
        const desc = document.getElementById('order-desc');

        if (counter) counter.textContent = `Procedimento ${this.m5ProcIdx + 1}/3`;
        if (title) title.textContent = proc.title;
        if (desc) desc.textContent = proc.description;

        this.updateProgressBar((this.m5ProcIdx / ORDER_PROCEDURES.length) * 100);

        // Embaralhar passos
        this.m5CurrentOrder = [...proc.correctSteps].sort(() => Math.random() - 0.5);
        this.renderOrderSteps();
      },

      renderOrderSteps() {
        const container = document.getElementById('order-steps-container');
        if (!container) return;
        container.innerHTML = '';

        this.m5CurrentOrder.forEach((stepText, idx) => {
          const card = document.createElement('div');
          card.className = 'sortable-step-card';
          card.innerHTML = `
            <div class="step-index-badge">${idx + 1}</div>
            <div class="step-text">${stepText}</div>
            <div class="step-reorder-btns">
              <button class="btn-step-move" onclick="GameApp.moveStep(${idx}, -1)">▲</button>
              <button class="btn-step-move" onclick="GameApp.moveStep(${idx}, 1)">▼</button>
            </div>
          `;
          container.appendChild(card);
        });
      },

      moveStep(idx, dir) {
        SoundFX.play('click');
        const target = idx + dir;
        if (target < 0 || target >= this.m5CurrentOrder.length) return;

        const temp = this.m5CurrentOrder[idx];
        this.m5CurrentOrder[idx] = this.m5CurrentOrder[target];
        this.m5CurrentOrder[target] = temp;
        this.renderOrderSteps();
      },

      validateProcedureOrder() {
        const proc = ORDER_PROCEDURES[this.m5ProcIdx];
        let correctMatches = 0;

        for (let i = 0; i < proc.correctSteps.length; i++) {
          if (this.m5CurrentOrder[i] === proc.correctSteps[i]) {
            correctMatches++;
          }
        }

        const isPerfect = correctMatches === proc.correctSteps.length;

        if (isPerfect) {
          SoundFX.play('correct');
          this.addScore(20);
        } else {
          SoundFX.play('wrong');
          this.loseLife('light');
        }

        const correctFormatted = proc.correctSteps.join('\n');

        this.showFeedbackModal({
          correct: isPerfect,
          title: isPerfect ? "Procedimento em Ordem Perfeita! (+20 pts)" : "Sequência Incorreta de Segurança!",
          why: `A ordem correta do protocolo é:\n\n${correctFormatted}`,
          action: "A inversão de etapas em protocolos como LOTO ou Extintor pode custar segundos preciosos ou causar acionamento acidental.",
          nr: "Procedimentos homologados sob NR-12 e NR-23."
        });

        this.nextActionCallback = () => {
          this.m5ProcIdx++;
          if (this.m5ProcIdx < ORDER_PROCEDURES.length) {
            this.rotateTeamTurn();
            this.loadMode5Procedure();
          } else {
            this.completeStage(5);
          }
        };
      },

      /* ------------------------------------------------------------------------
         MODO 6: CARTA SURPRESA
         ------------------------------------------------------------------------ */
      startMode6() {
        this.showScreen('screen-mode6');
        const box = document.getElementById('surprise-card-box');
        const challengeBox = document.getElementById('surprise-challenge-box');
        if (box) box.classList.remove('flipped');
        if (challengeBox) challengeBox.style.display = 'none';
        this.m6CurrentCard = null;
        this.m6ChallengeActive = false;
        this.updateProgressBar(75);
      },

      flipSurpriseCard() {
        if (this.m6ChallengeActive) return;
        this.m6ChallengeActive = true;
        SoundFX.play('powerup');

        const card = SURPRISE_CARDS[Math.floor(Math.random() * SURPRISE_CARDS.length)];
        this.m6CurrentCard = card;

        const iconEl = document.getElementById('surprise-card-icon');
        const titleEl = document.getElementById('surprise-card-title');
        const descEl = document.getElementById('surprise-card-desc');
        const tagEl = document.getElementById('surprise-card-tag');
        const box = document.getElementById('surprise-card-box');

        if (iconEl) iconEl.textContent = card.icon;
        if (titleEl) titleEl.textContent = card.title;
        if (descEl) descEl.textContent = card.desc;
        if (tagEl) tagEl.textContent = `EFEITO: ${card.title.toUpperCase()}`;
        if (box) box.classList.add('flipped');

        // Aplicar efeito imediato da carta
        if (card.effect === 'add_life') {
          if (this.mode === 'competition') this.teams[this.currentTeamIdx].lives = Math.min(3, this.teams[this.currentTeamIdx].lives + 1);
          else this.lives = Math.min(3, this.lives + 1);
          this.updateHUD();
        } else if (card.effect === 'add_points') {
          this.addScore(50);
        } else if (card.effect === 'activate_shield') {
          this.shieldActive = true;
          this.updateHUD();
        } else if (card.effect === 'add_hint') {
          this.powerUps.hint++;
          this.updateHUD();
        } else if (card.effect === 'combo_x2') {
          this.comboIndex = 2;
          this.updateHUD();
        }

        setTimeout(() => {
          this.presentSurpriseChallenge();
        }, 1200);
      },

      presentSurpriseChallenge() {
        const challengeBox = document.getElementById('surprise-challenge-box');
        const qTitle = document.getElementById('surprise-q-title');
        const qDesc = document.getElementById('surprise-q-desc');

        if (challengeBox) challengeBox.style.display = 'flex';
        if (qTitle) qTitle.textContent = "Situação de Fiscalização Rápida";
        if (qDesc) qDesc.textContent = "Um trabalhador está utilizando lixadeira angular sem empunhadura auxiliar e com disco de corte trincado. Qual é a classificação imediata?";

        let timerLimit = (this.m6CurrentCard && this.m6CurrentCard.effect === 'fast_time') ? 8 : 15;
        this.startTimer(timerLimit, null, () => {
          this.handleSurpriseChoice('timeout');
        });
      },

      handleSurpriseChoice(choice) {
        this.stopTimer();
        const isCorrect = choice === 'red';
        const isDouble = (this.m6CurrentCard && this.m6CurrentCard.effect === 'double_points');

        if (isCorrect) {
          SoundFX.play('correct');
          this.addScore(isDouble ? 40 : 20);
        } else {
          SoundFX.play('wrong');
          this.loseLife('severe');
        }

        this.showFeedbackModal({
          correct: isCorrect,
          title: isCorrect ? `Desafio Concluído! +${isDouble ? '40' : '20'} pts` : "Falha na Fiscalização! -1 Vida",
          why: "Disco abrasivo trincado pode fragmentar em alta rotação (mais de 10.000 RPM) agindo como projéteis fatais. Situação de PERIGO GRAVE (Vermelho).",
          action: "Paralisar imediatamente, inutilizar o disco danificado quebrando-o ao meio e substituir por disco novo com teste de som.",
          nr: "A NR-12 exige condições operacionais seguras em ferramentas portáteis rotativas."
        });

        this.nextActionCallback = () => {
          this.completeStage(6);
        };
      },

      /* ------------------------------------------------------------------------
         MODO 7: CHEFE FINAL (ZERO ERROS)
         ------------------------------------------------------------------------ */
      startMode7() {
        this.m7BossIdx = 0;
        this.m7Streak = 0;
        this.showScreen('screen-mode7');
        this.updateBossDots();
        this.loadBossSituation();
      },

      updateBossDots() {
        const dots = document.querySelectorAll('.boss-streak-dots .streak-dot');
        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx < this.m7Streak);
        });
      },

      loadBossSituation() {
        const item = BOSS_SITUATIONS[this.m7BossIdx];
        if (!item) {
          this.completeStage(7);
          return;
        }

        const tag = document.getElementById('boss-question-tag');
        const title = document.getElementById('boss-title');
        const desc = document.getElementById('boss-desc');
        const scene = document.getElementById('boss-scene-svg');

        if (tag) tag.textContent = `Auditoria ${this.m7BossIdx + 1}/5 • Acertos Consecutivos: ${this.m7Streak}/5`;
        if (title) title.textContent = item.title;
        if (desc) desc.textContent = item.description;
        if (scene) scene.innerHTML = SVGSceneArt.render(item.svgScene);

        this.updateProgressBar((this.m7Streak / 5) * 100);
      },

      handleBossChoice(choice) {
        const item = BOSS_SITUATIONS[this.m7BossIdx];
        const isCorrect = choice === item.correctAnswer;

        if (isCorrect) {
          SoundFX.play('correct');
          this.addScore(25);
          this.m7Streak++;
          this.updateBossDots();

          this.showFeedbackModal({
            correct: true,
            title: `Auditoria Aprovada! (${this.m7Streak}/5 Consecutivos)`,
            why: item.explanation,
            action: item.safeAction,
            nr: item.didYouKnow
          });

          this.nextActionCallback = () => {
            if (this.m7Streak >= 5) {
              this.checkAchievement('final_boss');
              this.completeStage(7);
            } else {
              this.m7BossIdx = (this.m7BossIdx + 1) % BOSS_SITUATIONS.length;
              this.loadBossSituation();
            }
          };
        } else {
          // Erro no chefe final = reset de sequência e vida perdida
          SoundFX.play('wrong');
          this.loseLife('severe');
          this.m7Streak = 0;
          this.updateBossDots();

          this.mistakesHistory.push({
            phase: "Chefe Final",
            title: item.title,
            yourChoice: choice.toUpperCase(),
            correct: item.correctAnswer.toUpperCase(),
            why: item.explanation
          });

          this.showFeedbackModal({
            correct: false,
            title: "FALHA NA AUDITORIA! Sequência Reiniciada!",
            why: item.explanation,
            action: item.safeAction,
            nr: item.didYouKnow
          });

          this.nextActionCallback = () => {
            this.m7BossIdx = 0;
            this.loadBossSituation();
          };
        }
      },

      /* ------------------------------------------------------------------------
         TRANSIÇÕES, FEEDBACK E CONQUISTAS
         ------------------------------------------------------------------------ */
      showFeedbackModal(data) {
        const modal = document.getElementById('modal-feedback');
        const banner = document.getElementById('modal-feedback-banner');
        const icon = document.getElementById('modal-feedback-icon');
        const title = document.getElementById('modal-feedback-title');
        const why = document.getElementById('modal-feedback-why');
        const action = document.getElementById('modal-feedback-action');
        const nr = document.getElementById('modal-feedback-nr');

        if (!modal) return;
        modal.classList.add('active');

        if (banner) {
          banner.className = `feedback-status-banner ${data.correct ? 'correct' : 'wrong'}`;
        }
        if (icon) icon.textContent = data.correct ? '✅' : '❌';
        if (title) title.textContent = data.title;
        if (why) why.textContent = data.why;
        if (action) action.textContent = data.action;
        if (nr) nr.textContent = data.nr;
      },

      closeFeedbackModal() {
        const modal = document.getElementById('modal-feedback');
        if (modal) modal.classList.remove('active');
        if (this.nextActionCallback) {
          const cb = this.nextActionCallback;
          this.nextActionCallback = null;
          cb();
        }
      },

      completeStage(stageId) {
        SoundFX.play('levelUp');
        ConfettiEngine.explode(80);
        this.triggerToast("🎉 Fase Concluída!", `Você completou com louvor a Fase ${stageId}!`);

        if (stageId >= this.unlockedStage) {
          this.unlockedStage = stageId + 1;
        }

        if (this.unlockedStage > 7) {
          this.checkAchievement('safety_master');
          setTimeout(() => this.showEndGame(), 1000);
        } else {
          setTimeout(() => this.goToMap(), 1000);
        }
      },

      rotateTeamTurn() {
        if (this.mode !== 'competition') return;
        this.currentTeamIdx = (this.currentTeamIdx + 1) % this.teamCount;
        this.updateHUD();
        const curTeam = this.teams[this.currentTeamIdx];
        this.triggerToast(`Turno da ${curTeam.name}`, `É a vez da equipe pontuar!`, '👥');
      },

      checkAchievement(achId) {
        if (this.achievementsUnlocked.has(achId)) return;
        const ach = ACHIEVEMENTS_LIST.find(a => a.id === achId);
        if (!ach) return;

        this.achievementsUnlocked.add(achId);
        SoundFX.play('levelUp');
        this.triggerToast(`🏆 ${ach.name}`, ach.desc, ach.icon);
      },

      triggerToast(title, desc, icon = '⭐') {
        const toast = document.getElementById('toast-notification');
        const tIcon = document.getElementById('toast-icon');
        const tTitle = document.getElementById('toast-title');
        const tDesc = document.getElementById('toast-desc');

        if (!toast) return;
        if (tIcon) tIcon.textContent = icon;
        if (tTitle) tTitle.textContent = title;
        if (tDesc) tDesc.textContent = desc;

        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3800);
      },

      /* ------------------------------------------------------------------------
         TELA FINAL / PODIUM / CERTIFICADO
         ------------------------------------------------------------------------ */
      showEndGame() {
        this.stopTimer();
        SoundFX.play('levelUp');
        ConfettiEngine.explode(150);
        this.showScreen('screen-endgame');

        const podium = document.getElementById('endgame-podium');
        const soloSummary = document.getElementById('endgame-solo-summary');

        if (this.mode === 'competition') {
          if (podium) podium.style.display = 'flex';
          if (soloSummary) soloSummary.style.display = 'none';
          this.renderPodium();
        } else {
          if (podium) podium.style.display = 'none';
          if (soloSummary) soloSummary.style.display = 'flex';
          this.renderSoloSummary();
        }

        this.renderAchievementsGrid();
      },

      renderPodium() {
        const podium = document.getElementById('endgame-podium');
        if (!podium) return;
        podium.innerHTML = '';

        // Ordenar equipes por score decrescente
        const sorted = [...this.teams].slice(0, this.teamCount).sort((a, b) => b.score - a.score);

        const places = [
          { pos: '2º', class: 'second', team: sorted[1] },
          { pos: '1º', class: 'first', team: sorted[0] },
          { pos: '3º', class: 'third', team: sorted[2] }
        ];

        places.forEach(p => {
          if (!p.team) return;
          const col = document.createElement('div');
          col.className = `podium-col ${p.class}`;
          col.innerHTML = `
            <div style="font-weight: 800; color: ${p.team.color}; margin-bottom: 0.3rem; font-size: 0.9rem;">${p.team.name}</div>
            <div class="podium-box">
              <span style="font-size: 1.6rem;">${p.pos === '1º' ? '👑' : p.pos === '2º' ? '🥈' : '🥉'}</span>
              <span style="font-size: 1.2rem; font-weight: 900;">${p.pos}</span>
              <span style="font-size: 0.82rem;">${p.team.score} pts</span>
            </div>
          `;
          podium.appendChild(col);
        });
      },

      renderSoloSummary() {
        const scoreVal = document.getElementById('final-score-val');
        const badge = document.getElementById('final-classification-badge');
        const badgeText = document.getElementById('final-classification-text');
        const hits = document.getElementById('final-hits');
        const errors = document.getElementById('final-errors');
        const accuracy = document.getElementById('final-accuracy');

        if (scoreVal) scoreVal.textContent = `${this.score} pts`;

        const totalAttempts = this.hitsCount + this.errorsCount;
        const accPct = totalAttempts > 0 ? Math.round((this.hitsCount / totalAttempts) * 100) : 100;

        if (hits) hits.textContent = this.hitsCount;
        if (errors) errors.textContent = this.errorsCount;
        if (accuracy) accuracy.textContent = `${accPct}%`;

        let rank = "Iniciante em Segurança";
        let color = "var(--text-muted)";

        if (this.score >= 251) {
          rank = "Mestre da Segurança";
          color = "var(--green)";
        } else if (this.score >= 181) {
          rank = "Especialista em Prevenção";
          color = "var(--accent)";
        } else if (this.score >= 101) {
          rank = "Técnico de Segurança Pleno";
          color = "var(--yellow)";
        } else if (this.score >= 51) {
          rank = "Aprendiz de Segurança";
          color = "var(--orange)";
        }

        if (badge && badgeText) {
          badge.style.borderColor = color;
          badge.style.color = color;
          badgeText.textContent = rank;
        }
      },

      renderAchievementsGrid() {
        const container = document.getElementById('endgame-achievements-container');
        if (!container) return;
        container.innerHTML = '';

        ACHIEVEMENTS_LIST.forEach(ach => {
          const earned = this.achievementsUnlocked.has(ach.id);
          const card = document.createElement('div');
          card.className = `achievement-card ${earned ? 'earned' : 'locked'}`;
          card.innerHTML = `
            <div style="font-size: 1.6rem;">${ach.icon}</div>
            <div style="font-weight: 800; font-size: 0.78rem;">${ach.name}</div>
            <div style="font-size: 0.68rem; color: var(--text-muted);">${earned ? 'Desbloqueada' : 'Bloqueada'}</div>
          `;
          container.appendChild(card);
        });
      },

      openErrorsReviewModal() {
        const modal = document.getElementById('modal-errors-review');
        const list = document.getElementById('errors-review-list');
        if (!modal || !list) return;

        list.innerHTML = '';

        if (this.mistakesHistory.length === 0) {
          list.innerHTML = `<p style="color: var(--green); text-align: center; padding: 2rem;">🎉 Parabéns! Nenhum erro registrado nesta sessão.</p>`;
        } else {
          this.mistakesHistory.forEach((item, idx) => {
            const card = document.createElement('div');
            card.className = 'feedback-card';
            card.style.borderLeftColor = 'var(--red)';
            card.innerHTML = `
              <div class="feedback-card-title">${item.phase} • ${item.title}</div>
              <div style="font-size: 0.88rem; color: #ff9999; margin: 0.2rem 0;">Sua escolha: <strong>${item.yourChoice}</strong> | Correta: <strong>${item.correct}</strong></div>
              <div class="feedback-card-text">${item.why}</div>
            `;
            list.appendChild(card);
          });
        }

        modal.classList.add('active');
      },

      openCertificateModal() {
        const modal = document.getElementById('modal-certificate');
        const container = document.getElementById('certificate-svg-container');
        if (!modal || !container) return;

        const winnerName = this.mode === 'competition' ? this.teams[0].name : "Profissional Técnico Master";
        const dateStr = new Date().toLocaleDateString('pt-BR');

        container.innerHTML = `
          <svg viewBox="0 0 600 400" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="certBg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#14142b"/>
                <stop offset="100%" stop-color="#0a0a1a"/>
              </linearGradient>
            </defs>
            <rect width="600" height="400" fill="url(#certBg)" stroke="#ffd700" stroke-width="6" rx="14"/>
            <rect x="15" y="15" width="570" height="370" fill="none" stroke="#4fc3f7" stroke-width="1.5" stroke-dasharray="6 3"/>
            
            <circle cx="300" cy="70" r="30" fill="rgba(255,215,0,0.15)" stroke="#ffd700" stroke-width="2"/>
            <text x="300" y="78" font-size="28" text-anchor="middle">🛡️</text>
            
            <text x="300" y="125" font-size="22" font-weight="900" fill="#ffd700" text-anchor="middle" letter-spacing="2">CERTIFICADO DE EXCELÊNCIA</text>
            <text x="300" y="145" font-size="11" fill="#8e8ea8" text-anchor="middle" letter-spacing="3">TRABALHO SEGURO LTDA. • SESMT</text>
            
            <text x="300" y="180" font-size="12" fill="#fff" text-anchor="middle">Certificamos com honra que</text>
            <text x="300" y="215" font-size="20" font-weight="bold" fill="#00ff88" text-anchor="middle">${winnerName}</text>
            <line x1="180" y1="225" x2="420" y2="225" stroke="#00ff88" stroke-width="1.5"/>
            
            <text x="300" y="250" font-size="12" fill="#d0d0e6" text-anchor="middle">concluiu com êxito todas as 7 etapas do Semáforo da Segurança,</text>
            <text x="300" y="268" font-size="12" fill="#d0d0e6" text-anchor="middle">demonstrando domínio pleno das Normas Regulamentadoras do Trabalho.</text>
            
            <text x="150" y="330" font-size="10" fill="#8e8ea8" text-anchor="middle">Data de Conclusão: ${dateStr}</text>
            <text x="450" y="330" font-size="10" fill="#ffd700" font-weight="bold" text-anchor="middle">Selo Mestre da Segurança</text>
            
            <circle cx="450" cy="355" r="16" fill="rgba(0,255,136,0.15)" stroke="#00ff88" stroke-width="1.5"/>
            <text x="450" y="360" font-size="14" text-anchor="middle">⭐</text>
          </svg>
        `;

        modal.classList.add('active');
      },

      restartGame() {
        SoundFX.play('click');
        this.showScreen('screen-home');
      }
    };

    // Inicialização ao carregar a página
    window.addEventListener('DOMContentLoaded', () => {
      GameApp.init();
    });
  
