"use client";

import { useState, useEffect, useRef } from "react";
import type { ComponentType, KeyboardEvent as ReactKeyboardEvent, ReactNode } from "react";
import Image from "next/image";
import {
  Activity,
  ArrowRight,
  BarChart3,
  BookOpen,
  Boxes,
  Database,
  FileText,
  Gamepad2,
  Globe,
  GraduationCap,
  Lock,
  Mail,
  Monitor,
  Moon,
  RotateCw,
  ScanEye,
  ShieldCheck,
  Sparkles,
  Sun,
  Trophy,
  Undo2,
  Users,
} from "lucide-react";
import {
  SiPython, SiFastapi, SiDjango, SiSpringboot,
  SiAngular, SiTypescript, SiTailwindcss,
  SiPostgresql, SiDocker, SiGit,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

const PORTRAIT_SRC = "/images/adrias-portrait.png";
const PORTRAIT_REAL_SRC = "/images/portrait-real.jpg";

/* ══════════════════════════════════════════════════════════════════════════
   BRAND SVGs  (lucide-react 1.17 dropped logo icons)
══════════════════════════════════════════════════════════════════════════ */

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.2 3.44 9.61 8.21 11.16.6.11.82-.25.82-.55 0-.27-.01-1.18-.02-2.14-3.34.71-4.04-1.59-4.04-1.59-.55-1.36-1.34-1.72-1.34-1.72-1.09-.73.08-.72.08-.72 1.2.08 1.84 1.22 1.84 1.22 1.07 1.8 2.81 1.28 3.5.98.11-.76.42-1.28.76-1.57-2.67-.3-5.47-1.31-5.47-5.84 0-1.29.47-2.35 1.24-3.18-.12-.3-.54-1.51.12-3.15 0 0 1.01-.32 3.3 1.21a11.6 11.6 0 0 1 6 0c2.29-1.53 3.3-1.21 3.3-1.21.66 1.64.24 2.85.12 3.15.77.83 1.23 1.89 1.23 3.18 0 4.54-2.81 5.54-5.49 5.83.43.36.81 1.08.81 2.18 0 1.58-.01 2.85-.01 3.24 0 .31.22.68.83.56A11.5 11.5 0 0 0 24 12.29C24 5.78 18.63.5 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.44-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   ANIMATED RETRO BACKGROUND (dark mode only — light mode uses DinoGame)
══════════════════════════════════════════════════════════════════════════ */

function RetroBackground() {
  return (
    <div className="rb-root" aria-hidden="true">
      <div className="rb-star-layer rb-stars-far" />
      <div className="rb-star-layer rb-stars-mid" />
      <div className="rb-star-layer rb-stars-near" />
      <div className="rb-grid" />
      <div className="rb-overlay" />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   CHROME DINO GAME — light-mode animated background
   Spacebar / ↑ to jump (desktop). Tap canvas on mobile.
══════════════════════════════════════════════════════════════════════════ */

const DSCALE = 3;

const SP_BODY = [
  [0,0,0,1,1,1,1,1,1,0],
  [0,0,1,1,1,1,1,1,1,1],
  [0,0,1,1,0,0,1,1,0,0],
  [0,0,1,1,1,1,1,1,0,0],
  [0,1,1,1,1,1,0,0,0,0],
  [1,1,1,1,1,0,0,0,0,0],
  [1,1,1,1,0,0,0,0,0,0],
  [1,1,1,1,0,0,0,0,0,0],
] as const;

const SP_LEGS_A = [
  [0,1,0,1,0,0,0,0,0,0],
  [0,1,0,0,0,0,0,0,0,0],
] as const;

const SP_LEGS_B = [
  [0,0,1,1,0,0,0,0,0,0],
  [0,0,0,1,0,0,0,0,0,0],
] as const;

const SP_CACTUS = [
  [0,0,1,0,0,0],
  [0,0,1,0,1,0],
  [1,0,1,0,1,0],
  [1,1,1,1,1,0],
  [0,1,1,0,0,0],
  [0,0,1,0,0,0],
  [0,0,1,0,0,0],
  [0,0,1,0,0,0],
  [0,0,1,0,0,0],
  [0,0,1,0,0,0],
] as const;

const SP_CLOUD = [
  [0,0,1,1,0,0,0,0],
  [0,1,1,1,1,1,0,0],
  [1,1,1,1,1,1,1,0],
  [0,1,1,1,1,1,0,0],
] as const;

function drawSp(
  ctx: CanvasRenderingContext2D,
  sprite: readonly (readonly number[])[],
  x: number, y: number, color: string
) {
  ctx.fillStyle = color;
  for (let r = 0; r < sprite.length; r++)
    for (let c = 0; c < sprite[r].length; c++)
      if (sprite[r][c])
        ctx.fillRect(Math.round(x + c * DSCALE), Math.round(y + r * DSCALE), DSCALE, DSCALE);
}

interface DinoGs {
  mode: "idle" | "running" | "dead";
  dinoY: number; dinoVY: number; jumping: boolean;
  tick: number; score: number; hiScore: number; speed: number;
  cacti: { x: number }[];
  clouds: { x: number; y: number }[];
  nextCactus: number; groundScroll: number;
}

function freshGs(): DinoGs {
  return {
    mode: "idle", dinoY: 0, dinoVY: 0, jumping: false,
    tick: 0, score: 0, hiScore: 0, speed: 5,
    cacti: [], clouds: [], nextCactus: 90, groundScroll: 0,
  };
}

function DinoGame({ lang }: { lang: Lang }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gsRef     = useRef<DinoGs>(freshGs());
  const rafRef    = useRef(0);
  const labelsRef = useRef({ start: "", over: "GAME OVER", restart: "" });

  useEffect(() => {
    labelsRef.current = lang === "pt"
      ? { start: "ESPAÇO para jogar", over: "GAME OVER", restart: "ESPAÇO para reiniciar" }
      : { start: "SPACE to play",     over: "GAME OVER", restart: "SPACE to restart" };
  }, [lang]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      if (gsRef.current.clouds.length === 0) {
        const gY = Math.floor(canvas.height * 0.78);
        gsRef.current.clouds = [
          { x: canvas.width * 0.25, y: gY - 90 },
          { x: canvas.width * 0.58, y: gY - 70 },
          { x: canvas.width * 0.82, y: gY - 110 },
        ];
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const doJump = () => {
      const g = gsRef.current;
      if (g.mode === "idle" || g.mode === "dead") {
        const hi = g.hiScore; const clouds = g.clouds;
        gsRef.current = { ...freshGs(), hiScore: hi, clouds, mode: "running" };
      } else if (!g.jumping) { g.dinoVY = -15; g.jumping = true; }
    };

    const onKey   = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") { e.preventDefault(); doJump(); }
    };
    const onTouch = () => doJump();

    document.addEventListener("keydown", onKey);
    canvas.addEventListener("touchstart", onTouch);

    const BODY_W = SP_BODY[0].length   * DSCALE;
    const BODY_H = SP_BODY.length      * DSCALE;
    const LEGS_H = SP_LEGS_A.length    * DSCALE;
    const DINO_H = BODY_H + LEGS_H;
    const CACT_W = SP_CACTUS[0].length * DSCALE;
    const CACT_H = SP_CACTUS.length    * DSCALE;
    const GND_R  = 0.78;
    const DINO_XR = 0.10;

    const loop = () => {
      const W = canvas.width, H = canvas.height;
      const g = gsRef.current;
      const gY = Math.floor(H * GND_R);
      const dX = Math.floor(W * DINO_XR);

      if (g.mode === "running") {
        g.tick++; g.score++;
        g.speed = Math.min(14, 5 + g.score * 0.001);
        g.groundScroll = (g.groundScroll + g.speed) % W;
        g.dinoVY += 0.7; g.dinoY -= g.dinoVY;
        if (g.dinoY <= 0) { g.dinoY = 0; g.dinoVY = 0; g.jumping = false; }

        g.clouds.forEach(c => { c.x -= g.speed * 0.25; });
        g.clouds = g.clouds.filter(c => c.x > -80);
        while (g.clouds.length < 3)
          g.clouds.push({ x: W + 30, y: gY - 70 - Math.random() * 120 });

        if (--g.nextCactus <= 0) {
          g.cacti.push({ x: W + 10 });
          g.nextCactus = Math.floor((55 + Math.random() * 60) * (5 / g.speed));
        }
        g.cacti.forEach(c => { c.x -= g.speed; });
        g.cacti = g.cacti.filter(c => c.x > -CACT_W);

        const dL = dX + DSCALE, dR = dX + BODY_W - DSCALE;
        const dB = gY - g.dinoY, dT = dB - DINO_H;
        for (const c of g.cacti) {
          if (dR > c.x + DSCALE && dL < c.x + CACT_W - DSCALE && dB > gY - CACT_H && dT < gY) {
            g.mode = "dead";
            g.hiScore = Math.max(g.hiScore, Math.floor(g.score / 10));
          }
        }
      }

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#a1a1aa";
      ctx.fillRect(0, gY, W, 2);

      ctx.fillStyle = "#d4d4d8";
      const segW = 36, segGap = 52;
      const offX = g.groundScroll % (segW + segGap);
      for (let x = -offX; x < W; x += segW + segGap) {
        ctx.fillRect(x, gY + 5, segW, 2);
        ctx.fillRect(x + 14, gY + 10, 16, 2);
      }

      g.clouds.forEach(cl => drawSp(ctx, SP_CLOUD, cl.x, cl.y, "#d4d4d8"));
      g.cacti.forEach(c  => drawSp(ctx, SP_CACTUS, c.x, gY - CACT_H, "#52525b"));

      const legs   = (g.tick % 18 < 9) ? SP_LEGS_A : SP_LEGS_B;
      const dinoTY = gY - g.dinoY - DINO_H;
      drawSp(ctx, SP_BODY, dX, dinoTY, "#3f3f46");
      if (g.mode !== "dead") drawSp(ctx, legs, dX, dinoTY + BODY_H, "#3f3f46");

      ctx.font = "12px monospace"; ctx.textAlign = "right";
      if (g.hiScore > 0) {
        ctx.fillStyle = "#a1a1aa";
        ctx.fillText(`HI ${String(g.hiScore).padStart(5, "0")}`, W - 84, 40);
      }
      ctx.fillStyle = "#4f46e5";
      ctx.fillText(String(Math.floor(g.score / 10)).padStart(5, "0"), W - 24, 40);

      ctx.textAlign = "center";
      const lb = labelsRef.current;
      if (g.mode === "idle") {
        ctx.fillStyle = "#71717a"; ctx.font = "11px monospace";
        ctx.fillText(lb.start, W / 2, gY - 48);
      } else if (g.mode === "dead") {
        ctx.fillStyle = "#3f3f46"; ctx.font = "bold 14px monospace";
        ctx.fillText(lb.over, W / 2, gY - 62);
        ctx.fillStyle = "#71717a"; ctx.font = "11px monospace";
        ctx.fillText(lb.restart, W / 2, gY - 38);
      }
      ctx.textAlign = "left";
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      document.removeEventListener("keydown", onKey);
      canvas.removeEventListener("touchstart", onTouch);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, zIndex: -9, pointerEvents: "auto" }}
      aria-hidden="true"
    />
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PIXEL ART ANT (SVG sprite)
══════════════════════════════════════════════════════════════════════════ */

function AntSprite({ className }: { className?: string }) {
  const cells: [number, number][] = [
    [6,0],[5,1],[8,0],[7,1],
    [4,2],[5,2],[6,2],[4,3],[5,3],[6,3],
    [3,4],[4,4],[3,5],[4,5],
    [1,4],[2,4],[7,4],[8,4],[1,5],[2,5],[7,5],[8,5],
    [0,6],[7,6],[8,6],
    [2,6],[3,6],[4,6],[5,6],[1,7],[2,7],[3,7],[4,7],[5,7],[2,8],[3,8],[4,8],
  ];
  return (
    <svg width="27" height="27" viewBox="0 0 27 27" fill="currentColor" aria-hidden="true" className={className}>
      {cells.map(([c, r]) => <rect key={`${c}-${r}`} x={c*3} y={r*3} width={3} height={3} />)}
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   i18n TYPES & DICTIONARY
══════════════════════════════════════════════════════════════════════════ */

type Lang = "pt" | "en";

interface ProjectText {
  category: string;
  title: string;
  description: string;
  backstory: string;
  stack: string[];
}

interface ExperienceItem {
  period: string;
  role: string;
  system: string;
  focus: string;
  projects: string[];
  achievements: string[];
}

interface EducationCard {
  tag: string;
  title: string;
  subtitle: string;
  backTitle: string;
  backLines: string[];
}

interface Dict {
  nav: { projects: string; about: string; skills: string; experience: string; contact: string };
  hero: { greeting: string; headline: string; headlineAccent: string; sub: string; cta1: string; cta2: string; scroll: string };
  labels: { confidential: string; viewOnGithub: string; back: string; backstoryTitle: string; achievementsTitle: string; hoverHint: string };
  sections: { work: string; about: string; contact: string };
  projects: ProjectText[];
  education: [EducationCard, EducationCard, EducationCard];
  about: { p1a: string; sefaz: string; p1b: string; p2a: string; ufac: string; p2b: string; eduSection: string };
  skills: { section: string; cats: readonly [string, string, string, string] };
  experience: { section: string; entries: ExperienceItem[] };
  contact: { headline: string; sub: string; built: string; rights: string };
}

const DICT: Record<Lang, Dict> = {
  pt: {
    nav: { projects: "Projetos", about: "Sobre", skills: "Habilidades", experience: "Experiência", contact: "Contato" },
    hero: {
      greeting: "Olá, sou Adrias.",
      headline: "Construo o full stack —",
      headlineAccent: "e os dados por trás dele.",
      sub: "Desenvolvedor Full-Stack & Analista de Dados. Construindo desde interfaces com UX impecável até microsserviços e motores de auditoria fiscal.",
      cta1: "Ver Projetos", cta2: "Entrar em Contato", scroll: "role",
    },
    labels: { confidential: "Interno / Confidencial", viewOnGithub: "Ver no GitHub", back: "Voltar", backstoryTitle: "Nos bastidores", achievementsTitle: "Conquistas & Momentos-chave", hoverHint: "passe o mouse" },
    sections: { work: "Projetos", about: "Sobre", contact: "Contato" },
    projects: [
      {
        category: "Fiscal & APEX",
        title: "Sistema Tucandeira",
        description: "Aplicação Oracle APEX integrada a um middleware Java (Spring Boot) para controle de mercadorias no Posto Fiscal. Integração PIX em tempo real e automação fiscal.",
        backstory: "O maior gargalo era a dependência de uma API externa instável para gerar as guias GNRE. Desenvolvi um gerador de PDF proprietário no backend (Spring Boot) que espelha o documento oficial. Agora, a API de origem fornece apenas o recibo (SOAP), enquanto nós temos controle total sobre o layout e a geração da guia, aplicando conceitos de Poka-Yoke para reduzir erros operacionais no posto fiscal.",
        stack: ["Oracle APEX", "Spring Boot", "PIX"],
      },
      {
        category: "Dados & BI",
        title: "Dashboards Inteligência Fiscal",
        description: "Dashboards analíticos e mapas interativos em Tableau. Extração (SQL) e tratamento de dados fiscais estratégicos da Receita Estadual.",
        backstory: "Transformei bases de dados brutas em ferramentas de decisão. Criei um painel mapeando o trânsito bovino (classificando sexo, idade e rotas regionais) e um dashboard focado no Índice de Participação dos Municípios (IPM), exibindo a distribuição de cotas de arrecadação em mapas dinâmicos para audição visual rápida.",
        stack: ["Tableau", "Eng. de Dados", "SQL"],
      },
      {
        category: "Game Dev",
        title: "Tic Tac Boom",
        description: "Protótipo caótico de jogo da velha 2D em Godot 4.x, com 'Cartas do Caos' que alteram as regras em tempo real e grades dinâmicas de 3x3 a 5x5.",
        backstory: "O desafio de Game Design e programação foi criar uma arquitetura de estado (State Machine) flexível para suportar modificadores de regras durante a partida. O tabuleiro reage ativamente às cartas jogadas, exigindo uma lógica de verificação de vitória (match-checking) totalmente dinâmica para lidar com grids expansíveis e condições mutáveis.",
        stack: ["Godot", "GDScript", "Game Design"],
      },
      {
        category: "Desktop & Python",
        title: "Autenticador de Arquivos",
        description: "Aplicação desktop nativa para Windows (Python + CustomTkinter) para verificação de integridade de arquivos em mídias físicas com hash MD5.",
        backstory: "A equipe de auditoria precisava de uma forma inviolável de provar que arquivos de mídias físicas não foram adulterados. Empacotei um gerador de 'impressão digital' criptográfica (MD5) em um executável (.exe) de interface amigável. O sistema varre os arquivos e gera um laudo formal em PDF via ReportLab, utilizado como prova íntegra nos processos.",
        stack: ["Python", "CustomTkinter", "ReportLab"],
      },
      {
        category: "Angular & Django",
        title: "SGCC-INSS",
        description: "Sistema corporativo desenvolvido para catalogar e monitorar a defasagem tecnológica do hardware nas Agências da Previdência Social.",
        backstory: "A gerência sofria com a falta de visibilidade sobre computadores obsoletos. Modelei o banco de dados relacional e estruturei a interface Angular para consumir a API Django. O resultado foi um fluxo de inventário veloz para os técnicos de campo e relatórios estratégicos para justificar orçamentos e trocas de equipamento.",
        stack: ["Angular", "Django REST", "MySQL"],
      },
      {
        category: "Fiscal & Full-Stack",
        title: "G-TRIB",
        description: "Sistema para a SEFAZ monitorar o andamento de fluxos processuais tributários e levantar métricas de desempenho da equipe auditora.",
        backstory: "Construído em ambiente hands-on real. Arquitetei um backend capaz de processar o tempo transcorrido por processo e ponderar seu nível de complexidade. No front-end, o desafio foi converter essas métricas brutas em interfaces visuais intuitivas, permitindo aos gestores identificar rapidamente gargalos na linha de produção da auditoria fiscal.",
        stack: ["Spring Boot", "Angular", "Bootstrap"],
      },
      {
        category: "SRE & QA",
        title: "TaskNote Academy",
        description: "Gerenciador de tarefas com foco em usabilidade preventiva (Poka-Yoke) e liderança técnica de equipe.",
        backstory: "Atuei como líder técnico e mentor da equipe, guiando o escopo do projeto para atender às expectativas da banca avaliadora. No código, foquei em proteger o banco de dados implementando conceitos de Poka-Yoke e validações estritas diretamente no front-end. Essa experiência de guiar o usuário para o 'caminho feliz' e reduzir o atrito de erros visuais serviu como base para a arquitetura de interface que implementei mais tarde no sistema da Tucandeira.",
        stack: ["JavaScript", "Liderança Técnica", "UX/UI"],
      },
      {
        category: "Automação & RH",
        title: "SGPS-WA",
        description: "Desenvolvimento de interface (Front-end) e modelagem de dados para o sistema de processos seletivos do Web Academy.",
        backstory: "Após o levantamento de requisitos com o Product Owner, modelei o banco de dados e construí 100% das telas em Angular. O maior aprendizado deste projeto foi sobre gestão de tempo e dependências sistêmicas: devido a projetos paralelos e gargalos na equipe, a integração entre o front e a API não foi concluída a tempo. O projeto gerou excelentes entregáveis de interface e modelagem, mas me ensinou na prática o custo técnico da falta de integração contínua (CI).",
        stack: ["Angular", "Bootstrap", "DB Modeling"],
      },
      {
        category: "Next.js & Design",
        title: "Portfólio Pessoal",
        description: "Portfólio interativo com estética retrô 16-bit, toggle de modo escuro/claro, mini-game Dino integrado como background animado e suporte bilíngue PT/EN.",
        backstory: "Este site. Estética retrô 16-bit em Next.js e Tailwind v4, com um mini-game do Dino jogável renderizado em canvas como plano de fundo no modo claro, i18n PT/EN e estes cartões 3D que você está virando agora.",
        stack: ["Next.js", "TypeScript", "Tailwind CSS"],
      },
    ],
    education: [
      {
        tag: "Graduação",
        title: "Sistemas de Informação",
        subtitle: "UFAC · Conclusão Dez. 2025",
        backTitle: "Bacharelado",
        backLines: [
          "Universidade Federal do Acre (UFAC)",
          "Conclusão prevista: Dezembro de 2025",
          "Foco em engenharia de software e dados",
        ],
      },
      {
        tag: "TCC",
        title: "IA Generativa na Educação",
        subtitle: "Pesquisa de conclusão de curso",
        backTitle: "Trabalho de Conclusão",
        backLines: [
          "“Percepção e Impacto da IA Generativa na Educação Superior”",
          "Estudo com alunos de Ciências Exatas da UFAC",
          "Abordagem qualitativa · IA Generativa",
        ],
      },
      {
        tag: "Próx. passos",
        title: "Visão Computacional",
        subtitle: "Mestrado (pretendido)",
        backTitle: "Pesquisa",
        backLines: [
          "Mirando um Mestrado em Ciência da Computação",
          "Linha de pesquisa: Visão Computacional",
          "Rigor com avaliação e casos de borda",
        ],
      },
    ],
    about: {
      p1a: "Sou desenvolvedor full-stack e analista de dados que entrega software de produção para o setor público — mais recentemente, engenhando soluções fiscais e tributárias para a ",
      sefaz: "SEFAZ/AC",
      p1b: ", a Secretaria de Estado da Fazenda do Acre. Meu trabalho abrange interfaces front-end refinadas, microsserviços Java / Spring Boot e pipelines de dados que transformam registros fiscais brutos em insights auditáveis.",
      p2a: "No meio acadêmico, estou concluindo o ",
      ufac: "Bacharelado em Sistemas de Informação na UFAC",
      p2b: " (Dezembro de 2025), com TCC sobre o impacto da IA Generativa no ensino superior — e mirando um mestrado em Visão Computacional. A trajetória acadêmica me mantém próximo dos primeiros princípios: rigoroso com correção, avaliação e casos de borda.",
      eduSection: "Formação",
    },
    skills: {
      section: "Habilidades",
      cats: ["Backend & APIs", "Frontend & Low-Code", "Dados", "Infra & Metodologias"],
    },
    experience: {
      section: "Experiência",
      entries: [
        {
          period: "Mai 2025 – Presente",
          role: "Desenvolvedor Full-Stack & Analista de Dados",
          system: "VINT Global",
          focus: "Arquitetura de APIs, manipulação de dados complexos e desenvolvimento de soluções corporativas de alto impacto para a SEFAZ/AC.",
          projects: ["Dashboards IPM e Trânsito de Gado", "Sistema Tucandeira", "Autenticador de Arquivos"],
          achievements: [
            "Desenvolvi a API middleware (Java/Spring Boot) do sistema Tucandeira, viabilizando a automação de guias GNRE e integração PIX em tempo real.",
            "Criei o Autenticador de Arquivos (Python/CustomTkinter) com hash MD5, garantindo a integridade legal de dados de auditoria trafegados em mídias físicas.",
            "Modelei dashboards estratégicos no Tableau manipulando bases de dados massivas da Receita Estadual, fundamentais para a tomada de decisão fiscal.",
          ],
        },
        {
          period: "Ago 2024 – Nov 2024",
          role: "Desenvolvedor Full-Stack (Estágio)",
          system: "INSS — Web Academy",
          focus: "Automação e catalogação do parque tecnológico utilizando Angular e Python (Django REST).",
          projects: ["Sistema corporativo SGCC-INSS"],
          achievements: [
            "Estruturei o front-end responsivo (Angular/Bootstrap) e o conectei à API Django REST para mapear a obsolescência de hardware das Agências da Previdência.",
            "Desenvolvi filtros e relatórios detalhados que transformaram o inventário de TI em uma ferramenta ágil para orientar as compras da gerência executiva.",
          ],
        },
        {
          period: "Ago 2024 – Dez 2024",
          role: "Desenvolvedor Full-Stack & Scrum Master",
          system: "Web Academy / MOTO E",
          focus: "Liderança ágil e desenvolvimento ponta a ponta focado em arquitetura limpa, SRE e interfaces responsivas.",
          projects: ["G-TRIB", "TaskNote Academy", "SGPS-WA"],
          achievements: [
            "Atuei como Scrum Master e desenvolvedor no G-TRIB (SEFAZ), modernizando processos tributários com Spring Boot e Angular.",
            "Liderança técnica e mentoria no TaskNote Academy, focando na implementação de Poka-Yoke no front-end para blindar o banco de dados.",
            "Desenvolvimento de 100% da interface e modelagem do banco de dados do SGPS-WA, lidando com requisitos diretos do Product Owner.",
          ],
        },
      ],
    },
    contact: {
      headline: "Vamos construir algo preciso.",
      sub: "Aberto a funções e colaborações em engenharia e dados full-stack. A maneira mais rápida de entrar em contato comigo é por e-mail.",
      built: "Feito com Next.js & Tailwind CSS.",
      rights: "Todos os direitos reservados.",
    },
  },

  en: {
    nav: { projects: "Projects", about: "About", skills: "Skills", experience: "Experience", contact: "Contact" },
    hero: {
      greeting: "Hi, I'm Adrias.",
      headline: "I build the full stack —",
      headlineAccent: "and the data underneath it.",
      sub: "Full-Stack Developer & Data Analyst. Building everything from flawless UX interfaces to microservices and tax audit engines.",
      cta1: "View Projects", cta2: "Get in Touch", scroll: "scroll",
    },
    labels: { confidential: "Internal / Confidential", viewOnGithub: "View on GitHub", back: "Back", backstoryTitle: "Behind the scenes", achievementsTitle: "Key Achievements", hoverHint: "hover me" },
    sections: { work: "Selected Work", about: "About", contact: "Contact" },
    projects: [
      {
        category: "Fiscal & APEX",
        title: "Tucandeira System",
        description: "Oracle APEX application integrated with a Java (Spring Boot) middleware for goods control at a Fiscal Post. Real-time PIX integration and fiscal automation.",
        backstory: "The biggest bottleneck was dependency on an unstable external API to generate GNRE guides. I built a proprietary PDF generator in the backend (Spring Boot) that mirrors the official document. Now the source API only provides the receipt (SOAP), while we retain full control over layout and guide generation — applying Poka-Yoke concepts to reduce operational errors at the fiscal post.",
        stack: ["Oracle APEX", "Spring Boot", "PIX"],
      },
      {
        category: "Data & BI",
        title: "Fiscal Intelligence Dashboards",
        description: "Analytical dashboards and interactive maps in Tableau. SQL extraction and processing of strategic fiscal data from the State Revenue authority.",
        backstory: "I transformed raw databases into decision-making tools. I built a panel mapping cattle transit (classifying by sex, age, and regional routes) and a dashboard focused on the Municipality Participation Index (IPM), displaying revenue share distribution on dynamic maps for rapid visual auditing.",
        stack: ["Tableau", "Data Engineering", "SQL"],
      },
      {
        category: "Game Dev",
        title: "Tic Tac Boom",
        description: "A chaotic 2D tic-tac-toe prototype in Godot 4.x, featuring 'Chaos Cards' that alter rules in real time and dynamic grids from 3x3 to 5x5.",
        backstory: "The game design and programming challenge was building a flexible State Machine architecture to support in-game rule modifiers. The board actively reacts to played cards, demanding fully dynamic win-condition logic (match-checking) to handle expandable grids and mutable rules.",
        stack: ["Godot", "GDScript", "Game Design"],
      },
      {
        category: "Desktop & Python",
        title: "File Authenticator",
        description: "Native desktop application for Windows (Python + CustomTkinter) for verifying file integrity on physical media using MD5 hashing.",
        backstory: "The audit team needed an inviolable way to prove that files on physical media had not been tampered with. I packaged a cryptographic fingerprint generator (MD5) into a user-friendly executable (.exe). The system scans files and generates a formal PDF report via ReportLab, used as verified evidence in legal proceedings.",
        stack: ["Python", "CustomTkinter", "ReportLab"],
      },
      {
        category: "Angular & Django",
        title: "SGCC-INSS",
        description: "Corporate system developed to catalog and monitor hardware technological obsolescence across Social Security branches.",
        backstory: "Management had no visibility into obsolete hardware. I modeled the relational database and built the Angular interface to consume the Django API. The result was a fast inventory workflow for field technicians and strategic reports to justify budget requests and equipment replacements.",
        stack: ["Angular", "Django REST", "MySQL"],
      },
      {
        category: "Fiscal & Full-Stack",
        title: "G-TRIB",
        description: "System for SEFAZ to monitor the progress of tax process flows and gather performance metrics for the auditing team.",
        backstory: "Built in a real hands-on environment. I architected a backend capable of processing elapsed time per process and weighting its complexity level. On the front-end, the challenge was converting those raw metrics into intuitive visual interfaces, allowing managers to quickly identify bottlenecks in the fiscal audit production line.",
        stack: ["Spring Boot", "Angular", "Bootstrap"],
      },
      {
        category: "SRE & QA",
        title: "TaskNote Academy",
        description: "Task manager focused on preventive usability (Poka-Yoke) and technical team leadership.",
        backstory: "I acted as technical lead and mentor, guiding the project scope to meet the evaluation panel's expectations. In the code, I focused on protecting the database by implementing Poka-Yoke concepts and strict validations directly on the front-end. This experience of guiding users to the 'happy path' and reducing visual error friction became the foundation for the interface architecture I later applied in the Tucandeira system.",
        stack: ["JavaScript", "Tech Leadership", "UX/UI"],
      },
      {
        category: "Automation & HR",
        title: "SGPS-WA",
        description: "Front-end development and data modeling for the Web Academy selection process management system.",
        backstory: "After requirements gathering with the Product Owner, I modeled the database and built 100% of the screens in Angular. The biggest lesson from this project was about time management and systemic dependencies: due to parallel projects and team bottlenecks, the front-end and API integration was not completed on time. The project delivered strong interface and modeling artifacts, but taught me firsthand the technical cost of lacking continuous integration (CI).",
        stack: ["Angular", "Bootstrap", "DB Modeling"],
      },
      {
        category: "Next.js & Design",
        title: "Personal Portfolio",
        description: "Interactive portfolio with a 16-bit retro aesthetic, dark/light mode toggle, integrated Dino mini-game as animated background, and PT/EN bilingual support.",
        backstory: "This site. A 16-bit retro aesthetic built with Next.js and Tailwind v4, featuring a playable Dino mini-game rendered on canvas as the light-mode background, PT/EN i18n, and the 3D cards you're flipping right now.",
        stack: ["Next.js", "TypeScript", "Tailwind CSS"],
      },
    ],
    education: [
      {
        tag: "Degree",
        title: "Information Systems",
        subtitle: "UFAC · Graduating Dec 2025",
        backTitle: "Bachelor's",
        backLines: [
          "Federal University of Acre (UFAC)",
          "Expected conclusion: December 2025",
          "Focus on software & data engineering",
        ],
      },
      {
        tag: "Thesis",
        title: "Generative AI in Education",
        subtitle: "Undergraduate capstone research",
        backTitle: "Capstone (TCC)",
        backLines: [
          "“Perception and Impact of Generative AI on Higher Education”",
          "A study with Exact Sciences students at UFAC",
          "Qualitative approach · Generative AI",
        ],
      },
      {
        tag: "Next steps",
        title: "Computer Vision",
        subtitle: "Master's (intended)",
        backTitle: "Research",
        backLines: [
          "Aiming for an MSc in Computer Science",
          "Research line: Computer Vision",
          "Rigorous about evaluation & edge cases",
        ],
      },
    ],
    about: {
      p1a: "I'm a full-stack developer and data analyst who ships production software for the public sector — most recently engineering fiscal and tax solutions for ",
      sefaz: "SEFAZ/AC",
      p1b: ", the State Treasury of Acre. My work spans polished front-end interfaces, Java / Spring Boot microservices, and data pipelines that turn raw fiscal records into auditable insight.",
      p2a: "On the academic side, I'm finishing a ",
      ufac: "Bachelor's in Information Systems at UFAC",
      p2b: " (December 2025), with a thesis on the impact of Generative AI on higher education — and aiming for a Master's in Computer Vision. The academic track keeps me close to first principles: rigorous about correctness, evaluation, and edge cases.",
      eduSection: "Education",
    },
    skills: {
      section: "Skills",
      cats: ["Backend & APIs", "Frontend & Low-Code", "Data", "Infra & Methodologies"],
    },
    experience: {
      section: "Experience",
      entries: [
        {
          period: "May 2025 – Present",
          role: "Full-Stack Developer & Data Analyst",
          system: "VINT Global",
          focus: "API architecture, complex data manipulation, and high-impact corporate solutions for SEFAZ/AC.",
          projects: ["IPM & Cattle Transit Dashboards", "Tucandeira System", "File Authenticator"],
          achievements: [
            "Built the middleware API (Java/Spring Boot) for the Tucandeira system, enabling GNRE guide automation and real-time PIX integration.",
            "Created the File Authenticator (Python/CustomTkinter) with MD5 hashing, ensuring the legal integrity of audit data on physical media.",
            "Modeled strategic Tableau dashboards over massive State Revenue datasets, forming the foundation for fiscal decision-making.",
          ],
        },
        {
          period: "Aug 2024 – Nov 2024",
          role: "Full-Stack Developer (Intern)",
          system: "INSS via Web Academy",
          focus: "Automation and cataloging of the technology infrastructure using Angular and Python (Django REST).",
          projects: ["SGCC-INSS corporate system"],
          achievements: [
            "Built the responsive front-end (Angular/Bootstrap) and connected it to the Django REST API to map hardware obsolescence across Social Security branches.",
            "Developed detailed filters and reports that turned the IT inventory into an agile tool for guiding executive procurement decisions.",
          ],
        },
        {
          period: "Aug 2024 – Dec 2024",
          role: "Full-Stack Developer & Scrum Master",
          system: "Web Academy / MOTO E",
          focus: "Agile leadership and end-to-end development focused on clean architecture, SRE, and responsive interfaces.",
          projects: ["G-TRIB", "TaskNote Academy", "SGPS-WA"],
          achievements: [
            "Acted as Scrum Master and developer on G-TRIB (SEFAZ), modernizing tax processes with Spring Boot and Angular.",
            "Technical leadership and mentoring on TaskNote Academy, focusing on Poka-Yoke implementation on the front-end to protect the database.",
            "Built 100% of the SGPS-WA interface and database modeling, handling requirements directly from the Product Owner.",
          ],
        },
      ],
    },
    contact: {
      headline: "Let's build something precise.",
      sub: "Open to roles and collaborations across full-stack engineering and data. The fastest way to reach me is email.",
      built: "Built with Next.js & Tailwind CSS.",
      rights: "All rights reserved.",
    },
  },
};

/* ══════════════════════════════════════════════════════════════════════════
   PROFILE, SOCIALS & PROJECT META
══════════════════════════════════════════════════════════════════════════ */

const PROFILE = {
  fullName: "Adrias Soares de Souza",
  shortName: "Adrias",
  email: "adriasbrown@hotmail.com",
  github: "https://github.com/AdriasSouza",
  linkedin: "https://www.linkedin.com/in/adrias-souza-88445017a",
};

interface ProjectMeta {
  isConfidential: boolean;
  githubUrl?: string;
  Icon: ComponentType<{ className?: string }>;
}

const PROJECT_META: ProjectMeta[] = [
  { isConfidential: true,  Icon: FileText    },  // Tucandeira
  { isConfidential: true,  Icon: BarChart3   },  // Fiscal Dashboards
  { isConfidential: false, githubUrl: "https://github.com/AdriasSouza/Tic-Tac-Boom",                    Icon: Gamepad2   },
  { isConfidential: false, githubUrl: "https://github.com/AdriasSouza/autenticador_arquivos",            Icon: ShieldCheck },
  { isConfidential: false, githubUrl: "https://github.com/AdriasSouza/SGCC-INSS-Estagio",               Icon: Monitor    },
  { isConfidential: true,  Icon: Boxes       },  // G-TRIB SEFAZ
  { isConfidential: false, githubUrl: "https://github.com/webacademyufac/hands-on-ead-t2-moto-g",        Icon: Activity   },  // TaskNote Academy
  { isConfidential: false, githubUrl: "https://github.com/AdriasSouza/SGPS-WA",                         Icon: Users      },
  { isConfidential: false, githubUrl: "https://github.com/AdriasSouza/Adrias-Souza-Portifolio",          Icon: Globe      },  // Portfolio
];

function buildSocials(t: Dict) {
  return [
    { label: "GitHub",   href: PROFILE.github,   Icon: GithubIcon   as ComponentType<{ className?: string }> },
    { label: "LinkedIn", href: PROFILE.linkedin, Icon: LinkedinIcon as ComponentType<{ className?: string }> },
    { label: t.nav.contact === "Contato" ? "E-mail" : "Email",
      href: `mailto:${PROFILE.email}`,           Icon: Mail         as ComponentType<{ className?: string }> },
  ];
}

/* ══════════════════════════════════════════════════════════════════════════
   SKILLS DATA
══════════════════════════════════════════════════════════════════════════ */

type SkillIcon = ComponentType<{ size?: number | string; className?: string }>;
interface SkillEntry { name: string; abbr: string; Icon: SkillIcon; }

const SKILL_GROUPS: Array<{ skills: SkillEntry[] }> = [
  { skills: [
    { name: "Python",       abbr: "Py",  Icon: SiPython      as SkillIcon },
    { name: "FastAPI",      abbr: "FA",  Icon: SiFastapi     as SkillIcon },
    { name: "Django",       abbr: "Dj",  Icon: SiDjango      as SkillIcon },
    { name: "Java",         abbr: "Jv",  Icon: FaJava        as SkillIcon },
    { name: "Spring Boot",  abbr: "SB",  Icon: SiSpringboot  as SkillIcon },
  ]},
  { skills: [
    { name: "Angular",      abbr: "Ng",  Icon: SiAngular     as SkillIcon },
    { name: "TypeScript",   abbr: "TS",  Icon: SiTypescript  as SkillIcon },
    { name: "Oracle APEX",  abbr: "AP",  Icon: Database      as SkillIcon },
    { name: "Tailwind CSS", abbr: "TW",  Icon: SiTailwindcss as SkillIcon },
  ]},
  { skills: [
    { name: "Oracle SQL",   abbr: "SQL", Icon: Database      as SkillIcon },
    { name: "PostgreSQL",   abbr: "PG",  Icon: SiPostgresql  as SkillIcon },
    { name: "Tableau",      abbr: "Tb",  Icon: BarChart3     as SkillIcon },
  ]},
  { skills: [
    { name: "Docker",       abbr: "Do",  Icon: SiDocker      as SkillIcon },
    { name: "Git",          abbr: "Gi",  Icon: SiGit         as SkillIcon },
    { name: "Scrum",        abbr: "Sc",  Icon: Users         as SkillIcon },
  ]},
];

const SKILL_ACCENT       = ["text-accent","text-accent-gold","text-accent-crimson","text-accent-emerald"] as const;
const SKILL_HEADER_ACCENT = ["text-accent","text-accent-gold","text-accent-crimson","text-accent-emerald"] as const;

/* ══════════════════════════════════════════════════════════════════════════
   SHARED COMPONENTS
══════════════════════════════════════════════════════════════════════════ */

function SectionHeading({ index, title }: { index: string; title: string }) {
  return (
    <div className="mb-12 flex items-center gap-4">
      <span className="font-pixel text-[10px] text-accent-gold">[{index}]</span>
      <h2 className="font-pixel text-[10px] uppercase tracking-widest text-accent">{title}</h2>
      <span className="h-px flex-1 bg-line transition-colors duration-500" />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   FLIP CARD  —  click-controlled (`flipped`) or hover-controlled (`hover`)
══════════════════════════════════════════════════════════════════════════ */

interface FlipCardProps {
  front: ReactNode;
  back: ReactNode;
  flipped?: boolean;
  hover?: boolean;
  onClick?: () => void;
  className?: string;
  faceClassName?: string;
  ariaLabel?: string;
}

function FlipCard({ front, back, flipped, hover, onClick, className, faceClassName, ariaLabel }: FlipCardProps) {
  const interactive = !hover && !!onClick;

  // Inner rotation class — hover cards use CSS group-hover, click cards use
  // the controlled `flipped` prop. The two branches never overlap.
  const innerRotation = hover
    ? "group-hover:[transform:rotateY(180deg)]"
    : flipped
    ? "[transform:rotateY(180deg)]"
    : "";

  return (
    /*
      Outer layer — perspective + hover bounce.
      `relative` makes it the containing block for the absolute inner layer,
      so `inset-0` on the inner always fills this element regardless of
      whether the height came from an explicit `h-[...]` or `min-h-[...]`.
    */
    <div
      className={[
        "card-root relative group [perspective:1200px]",
        "transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-black/20",
        interactive ? "cursor-pointer" : "",
        className ?? "",
      ].join(" ")}
      onClick={onClick}
      onKeyDown={
        interactive
          ? (e: ReactKeyboardEvent<HTMLDivElement>) => {
              if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick?.(); }
            }
          : undefined
      }
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-pressed={interactive ? !!flipped : undefined}
      aria-label={ariaLabel}
    >
      {/* Inner layer — 3D rotation. absolute inset-0 fills the outer layer. */}
      <div
        className={[
          "flip-inner absolute inset-0 [transform-style:preserve-3d]",
          "transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
          innerRotation,
        ].join(" ")}
      >
        <div className={`flip-face ${faceClassName ?? ""}`}>{front}</div>
        <div className={`flip-face flip-back ${faceClassName ?? ""}`}>{back}</div>
      </div>
    </div>
  );
}


/* ══════════════════════════════════════════════════════════════════════════
   TYPING BRAND
══════════════════════════════════════════════════════════════════════════ */

const BRAND_PHRASES: Record<Lang, string[]> = {
  pt: ["Olá, mundo!", "Eu sou ", "Adrias Souza"],
  en: ["Hello, world!", "I'm ", "Adrias Souza"],
};

function TypingBrand({ lang }: { lang: Lang }) {
  const [displayed, setDisplayed]   = useState("");
  const [phraseIdx, setPhraseIdx]   = useState(0);
  const [phase, setPhase]           = useState<"typing" | "pausing" | "deleting">("typing");

  useEffect(() => {
    const target = BRAND_PHRASES[lang][phraseIdx];
    const isLast = phraseIdx === BRAND_PHRASES[lang].length - 1;

    if (phase === "typing") {
      if (displayed.length < target.length) {
        const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 75);
        return () => clearTimeout(t);
      }
      const pause = isLast ? 2800 : 1200;
      const t = setTimeout(() => setPhase("deleting"), pause);
      return () => clearTimeout(t);
    }

    if (phase === "deleting") {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(prev => prev.slice(0, -1)), 40);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => {
        setPhraseIdx(i => (i + 1) % BRAND_PHRASES[lang].length);
        setPhase("typing");
      }, 400);
      return () => clearTimeout(t);
    }
  }, [displayed, phase, phraseIdx, lang]);

  return (
    <span className="font-pixel text-[11px] text-foreground">
      {displayed}
      <span className="text-accent-gold">_</span>
    </span>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   HEADER
══════════════════════════════════════════════════════════════════════════ */

interface HeaderProps {
  isDark: boolean; setIsDark: (v: boolean) => void;
  lang: Lang;      setLang:   (v: Lang)    => void;
  nav: Dict["nav"];
}

function Header({ isDark, setIsDark, lang, setLang, nav }: HeaderProps) {
  const links = [
    { href: "#projects",   label: nav.projects   },
    { href: "#about",      label: nav.about      },
    { href: "#skills",     label: nav.skills     },
    { href: "#experience", label: nav.experience },
    { href: "#contact",    label: nav.contact    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/80 backdrop-blur-md transition-colors duration-500">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-6">
        <a href="#top" className="w-40 shrink-0 transition-all duration-300 ease-out hover:text-accent">
          <TypingBrand key={lang} lang={lang} />
        </a>

        <nav className="hidden flex-1 items-center justify-center gap-5 text-sm text-muted sm:flex">
          {links.map(link => (
            <a key={link.href} href={link.href}
              className="inline-block transition-all duration-300 ease-out hover:-translate-y-0.5 hover:text-foreground">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <button onClick={() => setLang(lang === "pt" ? "en" : "pt")}
            aria-label="Alternar idioma / Toggle language"
            className="inline-block rounded-lg border-2 border-line px-2.5 py-1.5 font-pixel text-[9px] text-muted transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent">
            {lang === "pt" ? "EN" : "PT"}
          </button>
          <button onClick={() => setIsDark(!isDark)}
            aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border-2 border-line text-muted transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent">
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════════════════════════ */

function Hero({ t }: { t: Dict }) {
  const h = t.hero;
  return (
    <section className="flex min-h-[calc(100svh-4rem)] flex-col justify-center py-24">
      <p className="mb-6 font-pixel text-[11px] leading-relaxed text-accent-gold">{h.greeting}</p>

      <h1 className="max-w-3xl text-4xl font-semibold leading-[1.15] tracking-tight text-foreground sm:text-5xl">
        {h.headline} <span className="text-accent">{h.headlineAccent}</span>
      </h1>

      <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{h.sub}</p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <a href="#projects"
          className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl border-2 border-accent/40 bg-accent/15 px-6 text-sm font-semibold text-foreground transition-all duration-300 ease-out hover:-translate-y-1.5 hover:bg-accent/25 hover:shadow-xl hover:shadow-accent/20">
          {h.cta1}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
        </a>
        <a href="#contact"
          className="inline-flex h-12 items-center justify-center rounded-xl border-2 border-line px-6 text-sm font-semibold text-foreground transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-lg">
          {h.cta2}
        </a>
      </div>

      <div className="mt-16 hidden items-center gap-3 text-faint sm:flex">
        <span className="animate-pulse font-pixel text-[8px]">&gt;&gt;</span>
        <span className="text-xs uppercase tracking-widest opacity-70">{h.scroll}</span>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PROJECT CARD
══════════════════════════════════════════════════════════════════════════ */

const TAG_COLORS = [
  "text-accent border-accent/30 bg-accent/10",
  "text-accent-gold border-accent-gold/30 bg-accent-gold/10",
  "text-accent-crimson border-accent-crimson/30 bg-accent-crimson/10",
];

interface ProjectCardProps {
  data: ProjectText;
  meta: ProjectMeta;
  showAnt?: boolean;
  labels: Dict["labels"];
  flipped: boolean;
  onToggle: () => void;
}

function ProjectCard({ data, meta, showAnt, labels, flipped, onToggle }: ProjectCardProps) {
  const { Icon } = meta;

  const flipBtn = (icon: ReactNode, label: string) => (
    <button
      type="button"
      onClick={onToggle}
      aria-label={label}
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-2 border-line text-faint transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent"
    >
      {icon}
    </button>
  );

  /* ── FRONT ─────────────────────────────────────────────────────────── */
  const front = (
    <div className="surface-face relative flex h-full flex-col overflow-hidden rounded-2xl p-6">
      <div className="mb-6 flex items-start justify-between">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-chip text-accent transition-colors duration-500">
          <Icon className="h-5 w-5" />
        </span>
        {flipBtn(<RotateCw className="h-4 w-4" />, labels.backstoryTitle)}
      </div>

      <p className="mb-2 font-pixel text-[9px] uppercase text-accent-gold">{data.category}</p>
      <h3 className="text-lg font-semibold leading-snug text-foreground">{data.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{data.description}</p>

      <ul className="mt-5 flex flex-wrap gap-2">
        {data.stack.map((item, i) => (
          <li key={item} className={`rounded-md border px-2.5 py-1 font-mono text-[11px] ${TAG_COLORS[i % TAG_COLORS.length]}`}>
            {item}
          </li>
        ))}
      </ul>

      {meta.isConfidential ? (
        <div className="mt-5 flex items-center gap-2 text-faint">
          <Lock className="h-3.5 w-3.5 shrink-0" />
          <span className="font-pixel text-[8px] leading-relaxed">{labels.confidential}</span>
        </div>
      ) : (
        <a
          href={meta.githubUrl ?? PROFILE.github}
          target={meta.githubUrl !== "#" ? "_blank" : undefined}
          rel={meta.githubUrl !== "#" ? "noopener noreferrer" : undefined}
          className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-medium text-accent transition-all duration-300 ease-out hover:gap-3 hover:text-foreground"
        >
          <GithubIcon className="h-4 w-4 shrink-0" />
          {labels.viewOnGithub}
        </a>
      )}

      {showAnt && (
        <>
          <div className="pointer-events-none absolute bottom-3 left-0 w-full overflow-hidden" style={{ height: 28 }} aria-hidden="true">
            <div className="ant-march text-accent-gold" style={{ position: "absolute", bottom: 0 }}>
              <AntSprite />
            </div>
          </div>
          <div className="h-7" />
        </>
      )}
    </div>
  );

  /* ── BACK: "behind the scenes" ─────────────────────────────────────── */
  const back = (
    <div className="surface-face flex h-full flex-col overflow-hidden rounded-2xl p-6">
      <div className="mb-4 flex items-start justify-between">
        <span className="inline-flex items-center gap-2 text-accent">
          <Sparkles className="h-4 w-4 shrink-0" />
          <span className="font-pixel text-[9px] uppercase leading-relaxed">{labels.backstoryTitle}</span>
        </span>
        {flipBtn(<Undo2 className="h-4 w-4" />, labels.back)}
      </div>

      <h3 className="text-base font-semibold leading-snug text-foreground">{data.title}</h3>
      <p className="mt-3 min-h-0 flex-1 overflow-y-auto pr-1 text-sm leading-relaxed text-foreground/85">{data.backstory}</p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {data.stack.map((item, i) => (
          <li key={item} className={`rounded-md border px-2.5 py-1 font-mono text-[11px] ${TAG_COLORS[i % TAG_COLORS.length]}`}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );

  return <FlipCard flipped={flipped} className="min-h-[470px]" front={front} back={back} />;
}

/* ══════════════════════════════════════════════════════════════════════════
   PROJECTS SECTION
══════════════════════════════════════════════════════════════════════════ */

function Projects({ t }: { t: Dict }) {
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});
  const toggle = (i: number) => setFlipped(prev => ({ ...prev, [i]: !prev[i] }));

  return (
    <section id="projects" className="py-24">
      <SectionHeading index="01" title={t.sections.work} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {t.projects.map((project, i) => (
          <ProjectCard
            key={project.title}
            data={project}
            meta={PROJECT_META[i] ?? PROJECT_META[0]}
            showAnt={i === 0}
            labels={t.labels}
            flipped={!!flipped[i]}
            onToggle={() => toggle(i)}
          />
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   ABOUT SECTION
══════════════════════════════════════════════════════════════════════════ */

const EDUCATION_ICONS = [GraduationCap, BookOpen, ScanEye] as const;

function EducationFlipCard({ card, Icon }: { card: EducationCard; Icon: ComponentType<{ className?: string }> }) {
  const front = (
    <div className="surface-face flex h-full flex-col rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line bg-chip text-accent">
          <Icon className="h-4 w-4" />
        </span>
        <span className="font-pixel text-[8px] uppercase text-accent-gold">{card.tag}</span>
      </div>
      <p className="mt-3 text-sm font-semibold leading-snug text-foreground">{card.title}</p>
      <p className="mt-1 text-xs leading-snug text-muted">{card.subtitle}</p>
    </div>
  );
  const back = (
    <div className="surface-face flex h-full flex-col overflow-hidden rounded-2xl p-4">
      <p className="font-pixel text-[8px] uppercase leading-relaxed text-accent">{card.backTitle}</p>
      <ul className="mt-2 space-y-1.5 overflow-y-auto">
        {card.backLines.map((line, i) => (
          <li key={i} className="flex gap-1.5 text-[11px] leading-snug text-foreground/85">
            <span className="shrink-0 text-accent">›</span>
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
  return <FlipCard hover className="min-h-[150px]" front={front} back={back} />;
}

function About({ t }: { t: Dict }) {
  const ab = t.about;
  return (
    <section id="about" className="py-24">
      <SectionHeading index="02" title={t.sections.about} />

      <div className="grid items-start gap-10 md:grid-cols-[1fr_auto] md:gap-16">
        <div className="space-y-8">
          <div className="space-y-5 text-base leading-relaxed text-foreground/85">
            <p>
              {ab.p1a}<span className="font-medium text-foreground">{ab.sefaz}</span>{ab.p1b}
            </p>
            <p>
              {ab.p2a}<span className="font-medium text-foreground">{ab.ufac}</span>{ab.p2b}
            </p>
          </div>

          <div>
            <p className="mb-4 font-pixel text-[9px] uppercase tracking-widest text-accent">{ab.eduSection}</p>
            <ul className="grid gap-3 sm:grid-cols-3">
              {t.education.map((card, i) => (
                <li key={card.title}>
                  <EducationFlipCard card={card} Icon={EDUCATION_ICONS[i]} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Avatar — hover to flip from pixel art to the real photo */}
        <FlipCard
          hover
          className="h-[200px] w-[180px] shrink-0"
          front={
            <div className="surface-face relative h-full w-full overflow-hidden rounded-2xl">
              <Image
                src={PORTRAIT_SRC}
                alt={`${PROFILE.fullName} — pixel art portrait`}
                fill sizes="180px"
                style={{ imageRendering: "pixelated", objectFit: "cover" }}
              />
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-md border border-line bg-background/80 px-2 py-1 font-pixel text-[7px] uppercase text-accent backdrop-blur">
                {t.labels.hoverHint}
              </span>
            </div>
          }
          back={
            <div className="surface-face relative h-full w-full overflow-hidden rounded-2xl">
              <Image
                src={PORTRAIT_REAL_SRC}
                alt={`${PROFILE.fullName} — photo`}
                fill sizes="180px"
                style={{ objectFit: "cover" }}
              />
            </div>
          }
        />
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   SKILLS SECTION
══════════════════════════════════════════════════════════════════════════ */

function Skills({ t }: { t: Dict }) {
  return (
    <section id="skills" className="py-24">
      <SectionHeading index="03" title={t.skills.section} />
      <div className="space-y-10">
        {SKILL_GROUPS.map((group, gi) => (
          <div key={gi}>
            <p className={`mb-4 font-pixel text-[9px] uppercase tracking-widest ${SKILL_HEADER_ACCENT[gi]}`}>
              {t.skills.cats[gi]}
            </p>
            <div className="flex flex-wrap gap-3">
              {group.skills.map(skill => (
                <FlipCard
                  key={skill.name}
                  hover
                  className="h-[88px] w-[96px]"
                  front={
                    <div className="surface-face flex h-full w-full flex-col items-center justify-center gap-1.5 rounded-xl px-2">
                      <span className={`font-pixel text-[10px] ${SKILL_ACCENT[gi]}`}>{skill.abbr}</span>
                      <span className="text-center text-[10px] leading-tight text-muted">{skill.name}</span>
                    </div>
                  }
                  back={
                    <div className={`surface-face flex h-full w-full flex-col items-center justify-center gap-2 rounded-xl px-2 ${SKILL_ACCENT[gi]}`}>
                      <skill.Icon size={28} aria-hidden="true" />
                      <span className="text-center text-[9px] leading-tight text-muted">{skill.name}</span>
                    </div>
                  }
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   EXPERIENCE SECTION
══════════════════════════════════════════════════════════════════════════ */

function Experience({ t }: { t: Dict }) {
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});
  const toggle = (i: number) => setFlipped(prev => ({ ...prev, [i]: !prev[i] }));

  return (
    <section id="experience" className="py-24">
      <SectionHeading index="04" title={t.experience.section} />
      <div className="relative pl-8">
        <div className="timeline-track" />
        <div className="space-y-8">
          {t.experience.entries.map((entry, i) => {
            const front = (
              <div className="surface-face flex h-full flex-col rounded-2xl p-6">
                <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-pixel text-[9px] text-accent-gold">{entry.system}</p>
                    <h3 className="mt-1.5 text-base font-semibold text-foreground">{entry.role}</h3>
                  </div>
                  <span className="shrink-0 font-pixel text-[8px] text-faint">{entry.period}</span>
                </div>
                <ul className="mb-4 space-y-1.5">
                  {entry.projects.map(proj => (
                    <li key={proj} className="flex items-start gap-2 text-sm text-muted">
                      <span className="mt-1 font-pixel text-[8px] leading-none text-accent">›</span>
                      <span>{proj}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs italic text-faint">{entry.focus}</p>
                <span className="mt-auto flex items-center gap-1.5 self-end pt-4 text-faint">
                  <RotateCw className="h-3.5 w-3.5" />
                  <span className="font-pixel text-[7px] uppercase leading-relaxed">{t.labels.achievementsTitle}</span>
                </span>
              </div>
            );
            const back = (
              <div className="surface-face flex h-full flex-col rounded-2xl p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 text-accent-gold">
                    <Trophy className="h-4 w-4 shrink-0" />
                    <span className="font-pixel text-[9px] uppercase leading-relaxed">{t.labels.achievementsTitle}</span>
                  </span>
                  <span className="shrink-0 font-pixel text-[8px] text-faint">{entry.system}</span>
                </div>
                <ul className="min-h-0 flex-1 space-y-2 overflow-y-auto">
                  {entry.achievements.map((a, ai) => (
                    <li key={ai} className="flex gap-2 text-sm leading-snug text-foreground/85">
                      <span className="mt-0.5 shrink-0 text-accent-gold">★</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
            return (
              <div key={i} className="relative">
                <div className="absolute -left-8 top-5 z-10 h-3.5 w-3.5 rounded-sm border-2 border-accent bg-background transition-colors duration-500" />
                <FlipCard
                  flipped={!!flipped[i]}
                  onClick={() => toggle(i)}
                  ariaLabel={`${entry.system} — ${entry.role}`}
                  className="min-h-[300px]"
                  front={front}
                  back={back}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   CONTACT / FOOTER
══════════════════════════════════════════════════════════════════════════ */

function Contact({ t }: { t: Dict }) {
  const ct = t.contact;
  const year = new Date().getFullYear();
  const socials = buildSocials(t);

  return (
    <footer id="contact" className="border-t border-line py-16 transition-colors duration-500">
      <div className="mx-auto w-full max-w-5xl px-6">
        <SectionHeading index="05" title={t.sections.contact} />

        <div className="flex flex-col items-start justify-between gap-10 sm:flex-row sm:items-end">
          <div className="max-w-md">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{ct.headline}</h2>
            <p className="mt-3 leading-relaxed text-muted">{ct.sub}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {socials.map(({ label, href, Icon }) => {
              const external = href.startsWith("http");
              return (
                <a key={label} href={href} aria-label={label}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="surface-card inline-flex items-center gap-2 px-4 py-2.5 text-sm text-muted hover:text-foreground">
                  <Icon className="h-4 w-4" />
                  {label}
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-6 text-xs text-faint transition-colors duration-500 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-pixel text-[8px]">© {year} {PROFILE.fullName}. {ct.rights}</span>
          <span>{ct.built}</span>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PAGE ROOT
══════════════════════════════════════════════════════════════════════════ */

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [lang, setLang]     = useState<Lang>("pt");

  useEffect(() => {
    document.documentElement.classList.toggle("light", !isDark);
  }, [isDark]);

  const t = DICT[lang];

  return (
    <>
      <RetroBackground />
      {!isDark && <DinoGame lang={lang} />}
      <Header isDark={isDark} setIsDark={setIsDark} lang={lang} setLang={setLang} nav={t.nav} />
      <main id="top" className="mx-auto w-full max-w-5xl flex-1 px-6 transition-colors duration-500">
        <Hero t={t} />
        <Projects t={t} />
        <About t={t} />
        <Skills t={t} />
        <Experience t={t} />
      </main>
      <Contact t={t} />
    </>
  );
}
