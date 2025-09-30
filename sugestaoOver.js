// --- Parser robusto para valores no formato BRL ou variantes ---
function parseBRLToNumber(raw) {
  if (raw === null || raw === undefined) return NaN;
  let str = String(raw).trim();

  if (str === "") return NaN;

  // Remove símbolo R$, espaços e possíveis sinais
  str = str.replace(/R\$|\s/g, '');

  // Se tiver vírgula -> formato BR (ex: "57.000,00")
  if (str.indexOf(',') !== -1) {
    // remove pontos de milhar e transforma vírgula em ponto decimal
    str = str.replace(/\./g, '').replace(',', '.');
    const n = parseFloat(str);
    return isNaN(n) ? NaN : n;
  }

  // Se tiver ponto(s) mas sem vírgula -> pode ser decimal com "." ou máscara com milhar
  const lastDot = str.lastIndexOf('.');
  if (lastDot !== -1) {
    const decimals = str.length - lastDot - 1;

    // caso comum: "1234.56" (decimals <= 2) -> tratar último ponto como decimal
    if (decimals <= 2) {
      const before = str.slice(0, lastDot).replace(/\./g, '');
      const after = str.slice(lastDot + 1);
      const normalized = before + '.' + after;
      const n = parseFloat(normalized);
      return isNaN(n) ? NaN : n;
    }

    // caso observado: "0.005" (decimals === 3) -> muitas máscaras produzem 0.005 quando se quer 0.05
    // heurística: se decimals === 3 e valor < 0.01, multiplicar por 10 (corrige 0.005 -> 0.05)
    const rawNum = parseFloat(str);
    if (!isNaN(rawNum) && decimals === 3 && rawNum > 0 && rawNum < 0.01) {
      return rawNum * 10;
    }

    // fallback: remove todos os pontos (interpreta como inteiro) e parse
    const fallback = parseFloat(str.replace(/\./g, ''));
    return isNaN(fallback) ? NaN : fallback;
  }

  // Sem vírgula e sem ponto: string de dígitos (ex: "5", "50", "57000")
  // Heurística: se tem 1 ou 2 dígitos, provavelmente são centavos -> divide por 100
  const onlyDigits = str.replace(/\D/g, '');
  if (onlyDigits.length <= 2) {
    const cents = parseInt(onlyDigits || '0', 10);
    return cents / 100; // '5' -> 0.05 ; '50' -> 0.50
  }

  // Caso padrão: interpreta como inteiro (ex: "57000")
  const n = parseFloat(str.replace(/\./g, ''));
  return isNaN(n) ? NaN : n;
}

// --- Formata número para R$ ---
function formatCurrencyBRL(n) {
  if (!isFinite(n)) return '';
  return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// --- Função calculadora (usa o parser acima) ---
function calcularOverpriced(valorFormatado) {
  const valorOrig = parseBRLToNumber(valorFormatado);
  if (!isFinite(valorOrig) || valorOrig <= 0) return NaN;
  const sugestao = valorOrig / 0.8;
  return sugestao; // número puro; formatação separada
}

// --- Atualiza tooltip/sugestão e mantém compatibilidade com bootstrap tooltip ---
function atualizarSugestaoOverprice() {
  const valorTerrenoPadraoEl = document.getElementById("valorTerrenoPadrao");
  const sugestaoOverIcon = document.getElementById("sugestaoOverIcon");
  if (!valorTerrenoPadraoEl || !sugestaoOverIcon) return;

  const raw = valorTerrenoPadraoEl.value;
  const sugestaoNum = calcularOverpriced(raw);

  if (!isFinite(sugestaoNum)) {
    // limpa tooltip se inválido
    sugestaoOverIcon.removeAttribute('title');
    sugestaoOverIcon.removeAttribute('data-bs-original-title');
    const tt0 = bootstrap.Tooltip.getInstance(sugestaoOverIcon);
    if (tt0) { tt0.dispose(); }
    new bootstrap.Tooltip(sugestaoOverIcon);
    sugestaoOverIcon.dataset.sugestao = '';
    sugestaoOverIcon.dataset.sugestaoFormatada = '';
    return;
  }

  const sugestaoFormatada = formatCurrencyBRL(sugestaoNum);
  sugestaoOverIcon.dataset.sugestao = String(sugestaoNum);
  sugestaoOverIcon.dataset.sugestaoFormatada = sugestaoFormatada;

  sugestaoOverIcon.setAttribute('title', `Sugestão: ${sugestaoFormatada}`);
  sugestaoOverIcon.setAttribute('data-bs-original-title', `Sugestão: ${sugestaoFormatada}`);

  const tt = bootstrap.Tooltip.getInstance(sugestaoOverIcon);
  if (tt) tt.dispose();
  new bootstrap.Tooltip(sugestaoOverIcon);
}

// --- clique para copiar sugestão ao campo overprice (se quiser esse comportamento) ---
function ligarCliqueSugestao() {
  const sugestaoOverIcon = document.getElementById("sugestaoOverIcon");
  const valorTerrenoOverEl = document.getElementById("valorTerrenoOver");
  if (!sugestaoOverIcon || !valorTerrenoOverEl) return;

  sugestaoOverIcon.style.cursor = 'pointer';
  sugestaoOverIcon.addEventListener('click', () => {
    const f = sugestaoOverIcon.dataset.sugestaoFormatada;
    if (f && f.length) {
      valorTerrenoOverEl.value = f;
      // Caso você use máscara que reage ao evento input:
      valorTerrenoOverEl.dispatchEvent(new Event('input'));
      // feedback temporário
      sugestaoOverIcon.setAttribute('data-bs-original-title', 'Valor copiado para o campo Overprice');
      const tt = bootstrap.Tooltip.getInstance(sugestaoOverIcon);
      if (tt) { tt.dispose(); }
      new bootstrap.Tooltip(sugestaoOverIcon);
    }
  });
}

// inicialização
document.addEventListener('DOMContentLoaded', () => {
  const elPadrao = document.getElementById("valorTerrenoPadrao");
  if (elPadrao) elPadrao.addEventListener('input', atualizarSugestaoOverprice);

  // garante que o ícone exista e tenha tooltip inicial
  const sugestaoOverIcon = document.getElementById("sugestaoOverIcon");
  if (sugestaoOverIcon) {
    new bootstrap.Tooltip(sugestaoOverIcon);
    ligarCliqueSugestao();
  }

  // se você usa importação JSON que preenche campos, chame atualizarSugestaoOverprice() no callback da importação
});
