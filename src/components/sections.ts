import { rabik } from '../data/brand.ts';
import { $, reducedMotion } from '../lib/dom.ts';
import { onEnter, onScrollProgress } from '../lib/scroll.ts';

const motionAllowed = () => !reducedMotion.matches;

/** Movimentos das seções abaixo da hero; cada uma com um gesto próprio. */
export function setupSectionMotion() {
  // Dias leves: os dois recortes se aproximam enquanto a composição atravessa a tela.
  const light = $('[data-occ-light]');
  onScrollProgress(light, (value) => light.style.setProperty('--approach', Math.min(1, value / 0.55).toFixed(3)), {
    enabled: motionAllowed,
  });

  // Trabalho: a faixa fotográfica se abre por máscara.
  const work = $('[data-occ-work]');
  onScrollProgress(work, (value) => work.style.setProperty('--reveal', Math.min(1, value / 0.45).toFixed(3)), {
    enabled: motionAllowed,
  });

  // Fim de semana: a foto menor desliza no sentido oposto à maior.
  const weekend = $('[data-occ-weekend]');
  onScrollProgress(weekend, (value) => weekend.style.setProperty('--drift', (value - 0.5).toFixed(3)), {
    enabled: motionAllowed,
  });

  // Ocasiões: cada bloco revela suas fotos por máscara quando entra, em
  // direções diferentes; o texto entra à parte, com outro tempo.
  onEnter(document.querySelectorAll('.occ'), (block) => block.classList.add('is-in'), 0.2);

  // Detalhes: aproximação lenta (escala) e deslocamento dentro da moldura.
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((frame) => {
    onScrollProgress(
      frame,
      (value) => {
        frame.style.setProperty('--shift', (value - 0.5).toFixed(3));
        frame.style.setProperty('--zoom', value.toFixed(3));
      },
      { enabled: motionAllowed },
    );
  });

  // Encerramento: uma cortina na cor de destaque recolhe enquanto o bloco entra.
  const closing = $('#rabik');
  onScrollProgress(closing, (value) => closing.style.setProperty('--wipe', Math.min(1, Math.max(0, (value - 0.04) / 0.32)).toFixed(3)), {
    enabled: motionAllowed,
  });

  // Sobre: o fundo muda de tom quando a seção ocupa a tela.
  const about = $('[data-tint]');
  new IntersectionObserver(
    ([entry]) => about.classList.toggle('is-tinted', entry.isIntersecting),
    { threshold: 0.3 },
  ).observe(about);

  // Entradas discretas (uma vez), usadas só onde não há outro movimento.
  // Observa o bloco pai: um elemento recortado por clip-path pode não "intersectar".
  const revealables = [...document.querySelectorAll<HTMLElement>('[data-reveal]')];
  const parents = new Set(revealables.map((element) => element.parentElement!));
  onEnter(parents, (parent) => {
    revealables.filter((element) => element.parentElement === parent).forEach((element, i) => {
      element.style.transitionDelay = `${i * 90}ms`;
      element.classList.add('is-in');
    });
  }, 0.2);
}

export function setupRabikContact() {
  const link = $('[data-rabik-whatsapp]') as HTMLAnchorElement;
  link.href = rabik.whatsappUrl;
  $('[data-rabik-phone]').textContent = rabik.phoneLabel;
  const email = $('[data-rabik-email]') as HTMLAnchorElement;
  email.href = `mailto:${rabik.email}`;
  email.textContent = rabik.email;
}
