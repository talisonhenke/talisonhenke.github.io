// script.js

// Função para formatar valores monetários
function formatCurrency(value) {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }
  
  function parseCurrency(value) {
    return parseFloat(value.replace(/[^0-9,-]+/g, "").replace(',', '.')) || 0;
  }
  
  function parseNumber(value) {
    return parseFloat(value.replace(/[^0-9]+/g, "")) || 0;
  }

  function parseReal(str) {
    if (!str) return 0;
    return parseFloat(
      str.replace(/\s/g, '')           // remove espaços
         .replace('R$', '')            // remove símbolo
         .replace(/\./g, '')           // remove pontos
         .replace(',', '.')            // troca vírgula por ponto
    ) || 0;
  }
  
  // Calcular

  function calcularTudo() {
    const nomeCliente = document.getElementById("nomeCliente").value;
  
    // ===== Seção: Valores Padrão =====
    const valorM2Padrao = parseReal(document.getElementById("valorM2Padrao").value);
    const qtdM2Padrao = parseNumber(document.getElementById("qtdM2Padrao").value);
    const valorTerrenoPadrao = parseReal(document.getElementById("valorTerrenoPadrao").value);
    const porcentagemDifImposto = parseNumber(document.getElementById("porcentagemDifImposto").value);
  
    const construcao = valorM2Padrao * qtdM2Padrao;

    const construcao80 = construcao * 0.8;
    const terreno80 = valorTerrenoPadrao * 0.8;
    const valorReal = construcao + valorTerrenoPadrao;
    const financiamento = construcao80 + terreno80;
    const entrada = valorReal - financiamento;
  
    // ===== Seção: Valores Overpricing =====
    const medidaAba = parseNumber(document.getElementById("medidaAba").value);
    const valorAba = parseReal(document.getElementById("valorAba").value);
    const valorM2Over = parseReal(document.getElementById("valorM2Over").value);
    const qtdM2Over = parseNumber(document.getElementById("qtdM2Over").value);
    const valorTerrenoOver = parseReal(document.getElementById("valorTerrenoOver").value);
    const terreno80over = valorTerrenoOver * 0.8;
  
    const construcaoOver = valorM2Over * (qtdM2Over + medidaAba);
    const construcaoOver80 = construcaoOver * 0.8;
    const financiamentoOver = construcaoOver80 + terreno80over;
    const entradaOver = (construcaoOver + valorTerrenoOver) - financiamentoOver;
    const ValorDifImposto = ((valorTerrenoOver - valorTerrenoPadrao) * porcentagemDifImposto) /100;
  
    // ===== Seção: Dados do Cliente =====
    const creditoMaximo = parseCurrency(document.getElementById("creditoMaximo").value);
    const subsidio = parseCurrency(document.getElementById("subsidio").value);
    const parcelasPadrao = parseCurrency(document.getElementById("parcelasPadrao").value);
    const parcelasOver = parseCurrency(document.getElementById("parcelasOver").value);
    const qtdParcelas = parseNumber(document.getElementById("qtdParcelas").value);
    const jurosPadrao = parseFloat(document.getElementById("jurosPadrao").value) || 0;
    const jurosOver = parseFloat(document.getElementById("jurosOver").value) || 0;
  
    const recursoTotal = subsidio + financiamentoOver;
  
    // ===== Seção: Documentação =====
    const registroImoveis = parseCurrency(document.getElementById("registroImoveis").value);
    const taxasCaixa = parseCurrency(document.getElementById("taxasCaixa").value);
    const porcentagemEntradaItbi = parseFloat(document.getElementById("porcentagemEntradaItbi").value) / 100;
    const porcentagemFinanciamentoItbi = parseFloat(document.getElementById("porcentagemFinanciamentoItbi").value) / 100;
  
    const itbiPadrao = (entrada * porcentagemEntradaItbi) + (financiamento * porcentagemFinanciamentoItbi);
    const itbiOver = (entradaOver * porcentagemEntradaItbi) + (financiamentoOver * porcentagemFinanciamentoItbi);
  
    const totalDocPadrao = itbiPadrao + registroImoveis + taxasCaixa;
    const totalDocOver = itbiOver + registroImoveis + taxasCaixa;
  
    // ===== Tabelas do Corretor =====
    const entradaFacilitadaCorretor = (valorReal - recursoTotal) + valorAba + totalDocOver;
    const entradaPadraoCorretor = (valorReal - financiamento) + totalDocPadrao;
  
    const tabelaCorretor = `
      <h5>${nomeCliente} - CONDIÇÃO DE FINANCIAMENTO FACILITADA</h5>
      <table class="table table-bordered">
        <tr class="table-light"><th>Valor</th><td>${formatCurrency(valorReal)}</td></tr>
        <tr class="table-secondary"><th>Documentação</th><td>${formatCurrency(totalDocOver)}</td></tr>
        <tr class="table-secondary"><th>Dif. imposto terreno</th><td>${formatCurrency(ValorDifImposto)}</td></tr>
        <tr class="table-light"><th>Entrada</th><td>${formatCurrency(valorReal)} (Construção) - ${formatCurrency(recursoTotal)} (Financiamento) + ${formatCurrency(valorAba)} (Aba) = ${formatCurrency((valorReal - recursoTotal) + valorAba)} (Total)</td></tr>
        <tr class="table-secondary"><th>Parcelas</th><td>${formatCurrency(parcelasOver)}</td></tr>
        ${(jurosOver && parseFloat(jurosOver) !== 0) ? `
          <tr class="table-light">
            <th>Taxa de Juros</th>
            <td>${parseFloat(jurosOver).toFixed(2)}% A.A</td>
        </tr>` : ""}
      </table>
      <h5>${nomeCliente} - CONDIÇÃO DE FINANCIAMENTO PADRÃO</h5>
      <table class="table table-bordered">
        <tr class="table-light"><th>Valor</th><td>${formatCurrency(valorReal)}</td></tr>
        <tr class="table-secondary"><th>Documentação</th><td>${formatCurrency(totalDocPadrao)}</td></tr>
        <tr class="table-light"><th>Entrada</th><td>${formatCurrency(valorReal)} (Construção) - ${formatCurrency(financiamento)} (Financiamento) - ${formatCurrency(subsidio)} (Subsídio)  = ${formatCurrency((valorReal - financiamento) - subsidio)} (Total)</td></tr>
        ${(jurosPadrao && parseFloat(jurosPadrao) !== 0) ? `
          <tr class="table-light">
            <th>Taxa de Juros</th>
            <td>${parseFloat(jurosPadrao).toFixed(2)}% A.A</td>
          </tr>` : ""}
      </table>
    `;
  
    document.getElementById("tabelaCorretor").innerHTML = tabelaCorretor;
  
    // ===== Tabelas do Cliente =====
    const entradaFacilitadaCliente = (valorReal - recursoTotal + valorAba);
    const entradaPadraoCliente = ((valorReal - financiamento) - subsidio);

    //Entrada + Documentação
    // const entradaFacilitadaCliente = (valorReal - recursoTotal + valorAba) + totalDocOver;
    // const entradaPadraoCliente = ((valorReal - financiamento) - subsidio) + totalDocPadrao;

    //Juros campo padrão
    // <tr class="table-secondary"><th>Parcelas</th><td>${formatCurrency(parcelasPadrao)}</td></tr>
    // <tr class="table-light"><th>Taxa de Juros</th><td>${jurosOver.toFixed(2)}% A.A</td></tr>
  
    const tabelaCliente = `
      <h5>${nomeCliente} - CONDIÇÃO DE FINANCIAMENTO FACILITADA</h5>
      <table class="table table-bordered">
        <tr class="table-light"><th>Valor</th><td>${formatCurrency(valorReal)}</td></tr>
        <tr class="table-secondary"><th>Entrada</th><td>${formatCurrency(entradaFacilitadaCliente)}</td></tr>
        <tr class="table-light"><th>Parcelas</th><td>${formatCurrency(parcelasOver)}</td></tr>
        ${(jurosOver && parseFloat(jurosOver) !== 0) ? `
          <tr class="table-light">
            <th>Taxa de Juros</th>
            <td>${parseFloat(jurosOver).toFixed(2)}% A.A</td>
        </tr>` : ""}
      </table>
      <h5>${nomeCliente} - CONDIÇÃO DE FINANCIAMENTO PADRÃO</h5>
      <table class="table table-bordered">
        <tr class="table-light"><th>Valor</th><td>${formatCurrency(valorReal)}</td></tr>
        <tr class="table-secondary"><th>Entrada</th><td>${formatCurrency(entradaPadraoCliente)}</td></tr>
        <tr class="table-light"><th>Parcelas</th><td>${formatCurrency(parcelasPadrao)}</td></tr>
        ${(jurosPadrao && parseFloat(jurosPadrao) !== 0) ? `
          <tr class="table-light">
            <th>Taxa de Juros</th>
            <td>${parseFloat(jurosPadrao).toFixed(2)}% A.A</td>
          </tr>` : ""}
      </table>
    `;
  
    document.getElementById("tabelaCliente").innerHTML = tabelaCliente;
  } 
  
  // Você pode adicionar listeners aqui para formatar os campos conforme o usuário digita (como máscaras).

  //Mostrar quantidade de parcelas
  //<tr class="table-light"><th>Parcelas</th><td>${formatCurrency(parcelasPadrao)} (${qtdParcelas} vezes)</td></tr>