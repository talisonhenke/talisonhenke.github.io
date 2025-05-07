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
    const financiamentoOver = construcaoOver + valorTerrenoOver;
    const financiamentoOver80 = construcaoOver80 + terreno80over;
    const entradaOver = (construcaoOver + valorTerrenoOver) - financiamentoOver80;
    const ValorDifImposto = ((valorTerrenoOver - valorTerrenoPadrao) * porcentagemDifImposto) /100;
  
    // ===== Seção: Dados do Cliente =====
    // const creditoMaximo = parseCurrency(document.getElementById("creditoMaximo").value);
    const subsidio = parseCurrency(document.getElementById("subsidio").value);
    const parcelasPadrao = parseCurrency(document.getElementById("parcelasPadrao").value);
    const parcelasOver = parseCurrency(document.getElementById("parcelasOver").value);
    const qtdParcelas = parseNumber(document.getElementById("qtdParcelas").value);
    const jurosPadrao = parseFloat(document.getElementById("jurosPadrao").value) || 0;
    const jurosOver = parseFloat(document.getElementById("jurosOver").value) || 0;
  
    const recursoTotal = subsidio + financiamentoOver80;
  
    // ===== Seção: Documentação =====
    const registroImoveis = parseCurrency(document.getElementById("registroImoveis").value);
    const taxasCaixa = parseCurrency(document.getElementById("taxasCaixa").value);
    const porcentagemEntradaItbi = parseFloat(document.getElementById("porcentagemEntradaItbi").value) / 100;
    const porcentagemFinanciamentoItbi = parseFloat(document.getElementById("porcentagemFinanciamentoItbi").value) / 100;
  
    const itbiPadrao = (entrada * porcentagemEntradaItbi) + (financiamento * porcentagemFinanciamentoItbi);
    const itbiOver = (entradaOver * porcentagemEntradaItbi) + (financiamentoOver80 * porcentagemFinanciamentoItbi);
  
    const totalDocPadrao = itbiPadrao + registroImoveis + taxasCaixa;
    const totalDocOver = itbiOver + registroImoveis + taxasCaixa;

  
    // ===== Tabelas do Corretor =====
    const entradaFacilitadaCorretor = (valorReal - recursoTotal) + valorAba + totalDocOver;
    const entradaPadraoCorretor = (valorReal - financiamento) + totalDocPadrao;
  
    //TODO: Exibir o subsídio de forma isolada na linha Entrada (tabela corretor)
    //TODO: Testar 10 financiamentos e buscar a relação de valres para entender a fórmula do cálculo da CAIXA
    const tabelaCorretor = `
  <h5>${nomeCliente} - CONDIÇÃO DE FINANCIAMENTO FACILITADA</h5>
  <table class="table table-bordered tabela-zebrada" id="tabelaFacilitadaCorretor">
    <tr><th>Valor</th><td><b>${formatCurrency(valorReal)}</b> (${formatCurrency(financiamentoOver)}) => Overprice (${formatCurrency(financiamentoOver80)}) => Overprice 80%</td></tr>
    <tr><th>Documentação</th><td>${formatCurrency(totalDocOver)}</td></tr>
    <tr><th>Dif. imposto terreno</th><td>${formatCurrency(ValorDifImposto)}</td></tr>
    <tr><th>Entrada</th><td>${formatCurrency(valorReal)} (Construção) - ${formatCurrency(recursoTotal)} (Financiamento) + ${formatCurrency(valorAba)} (Aba) = ${formatCurrency((valorReal - recursoTotal) + valorAba)} (Total)</td></tr>
    <tr><th>Parcelas</th><td>${formatCurrency(parcelasOver)}</td></tr>
    ${(jurosOver && parseFloat(jurosOver) !== 0) ? `
      <tr>
        <th>Taxa de Juros</th>
        <td>${parseFloat(jurosOver).toFixed(2)}% A.A</td>
      </tr>` : ""}
  </table>

  <h5 class="mt-4">${nomeCliente} - CONDIÇÃO DE FINANCIAMENTO PADRÃO</h5>
  <table class="table table-bordered tabela-zebrada" id="tabelaPadraoCorretor">
    <tr><th>Valor</th><td>${formatCurrency(valorReal)}</td></tr>
    <tr><th>Documentação</th><td>${formatCurrency(totalDocPadrao)}</td></tr>
    <tr><th>Entrada</th><td>${formatCurrency(valorReal)}(Construção) - ${formatCurrency(financiamentoOver80)} (Financiamento) - ${formatCurrency(subsidio)} (Subsídio) = ${formatCurrency((valorReal - financiamento) - subsidio)} (Total)</td></tr>
    <tr><th>Parcelas</th><td>${formatCurrency(parcelasPadrao)}</td></tr>
    ${(jurosPadrao && parseFloat(jurosPadrao) !== 0) ? `
      <tr>
        <th>Taxa de Juros</th>
        <td>${parseFloat(jurosPadrao).toFixed(2)}% A.A</td>
      </tr>` : ""}
  </table>
  <div class="d-flex flex-column flex-sm-row justify-content-center gap-2 mt-2">
  <button class="btn btn-outline-primary" onclick="copiarTabelaFacilitada('tabelaFacilitadaCorretor')">
    Copiar Tabela Facilitada Corretor
  </button>
  <button class="btn btn-outline-primary" onclick="copiarTabelaPadrao('tabelaPadraoCorretor')">
    Copiar Tabela Padrão Corretor
  </button>
</div>

`;


  
    document.getElementById("tabelaCorretor").innerHTML = tabelaCorretor;

    // ===== Mostrar informações extras para o cliente =====
    const mostrarDocCliente = document.getElementById("mostrarDocCliente").checked;
    const mostrarParcelasCliente = document.getElementById("mostrarParcelasCliente").checked;
    const mostrarDifImpostoCliente = document.getElementById("mostrarDifImpostoCliente").checked;
  
    // ===== Tabelas do Cliente =====
    const entradaFacilitadaCliente = mostrarDifImpostoCliente
    ? ((valorReal - recursoTotal + valorAba) + ValorDifImposto) : (valorReal - recursoTotal + valorAba);
    
    const entradaPadraoCliente = mostrarDifImpostoCliente
    ? (((valorReal - financiamento) - subsidio) + ValorDifImposto) : ((valorReal - financiamento) - subsidio);

    // Linhas de parcelas Cliente
    let linhaParcelaFacilitadaCliente = `
    <tr>
      <th>Parcelas</th>
      <td>${formatCurrency(parcelasOver)}
      ${mostrarParcelasCliente ? ` (${qtdParcelas} vezes)` : ""}</td>
    </tr>`;

    let linhaParcelaPadraoCliente = `
      <tr>
        <th>Parcelas</th>
        <td>${formatCurrency(parcelasPadrao)}
        ${mostrarParcelasCliente ? ` (${qtdParcelas} vezes)` : ""}</td>
      </tr>`;

    // Linhas de documentação Cliente
      let linhaDocPadraoCliente = mostrarDocCliente ? `
      <tr>
        <th>Documentação</th>
        <td>${formatCurrency(totalDocPadrao)}</td>
      </tr>` : "";

      let linhaDocFacilitadaCliente = mostrarDocCliente ? `
      <tr>
        <th>Documentação</th>
        <td>${formatCurrency(totalDocOver)}</td>
      </tr>` : "";
  
    const tabelaCliente = `
      <h5>${nomeCliente} - CONDIÇÃO DE FINANCIAMENTO FACILITADA</h5>
      <table class="table table-bordered tabela-zebrada" id="tabelaFacilitadaCliente">
        <tr><th>Valor</th><td>${formatCurrency(valorReal)}</td></tr>
        ${linhaDocFacilitadaCliente}
        <tr><th>Entrada</th><td>${formatCurrency(entradaFacilitadaCliente)}</td></tr>
        ${linhaParcelaFacilitadaCliente}
        ${(jurosOver && parseFloat(jurosOver) !== 0) ? `
          <tr>
            <th>Taxa de Juros</th>
            <td>${parseFloat(jurosOver).toFixed(2)}% A.A</td>
        </tr>` : ""}
      </table>
      <h5>${nomeCliente} - CONDIÇÃO DE FINANCIAMENTO PADRÃO</h5>
      <table class="table table-bordered tabela-zebrada" id="tabelaPadraoCliente">
        <tr><th>Valor</th><td>${formatCurrency(valorReal)}</td></tr>
        ${linhaDocPadraoCliente}
        <tr><th>Entrada</th><td>${formatCurrency(entradaPadraoCliente)}</td></tr>
        ${linhaParcelaPadraoCliente}
        ${(jurosPadrao && parseFloat(jurosPadrao) !== 0) ? `
          <tr>
            <th>Taxa de Juros</th>
            <td>${parseFloat(jurosPadrao).toFixed(2)}% A.A</td>
          </tr>` : ""}
      </table>
      <div class="d-flex flex-column flex-sm-row justify-content-center gap-2 mt-2">
        <button class="btn btn-outline-primary" onclick="copiarTabelaFacilitada('tabelaFacilitadaCliente')">
          Copiar Tabela Facilitada Cliente
        </button>
        <button class="btn btn-outline-primary" onclick="copiarTabelaPadrao('tabelaPadraoCliente')">
          Copiar Tabela Padrão Cliente
        </button>
      </div>

    `;
  
    document.getElementById("tabelaCliente").innerHTML = tabelaCliente;

    // Salvar sugestões de autopreenchimento
      // localStorage.setItem('valorTerrenoPadrao', document.getElementById('valorTerrenoPadrao').value);
      // localStorage.clear();

      //salvar sugestões de autopreenchimento
      salvarValorTerreno(document.getElementById('valorTerrenoPadrao').value);
      salvarSugestoesValorTerrenoOverPrice(document.getElementById('valorTerrenoOver').value);
      salvarSugestoesM2Padrao(document.getElementById('valorM2Padrao').value);
      salvarSugestoesM2Over(document.getElementById('valorM2Over').value);
      salvarSugestoesQtdM2Padrao(document.getElementById('qtdM2Padrao').value);
      salvarSugestoesQtdM2Over(document.getElementById('qtdM2Over').value);
      salvarSugestoesMedidaAba(document.getElementById('medidaAba').value);
      medidaAba
  } 

  // explicação dos campos
  document.addEventListener('DOMContentLoaded', function () {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach(tooltipTriggerEl => {
      new bootstrap.Tooltip(tooltipTriggerEl);
    });
  });
  
  // Você pode adicionar listeners aqui para formatar os campos conforme o usuário digita (como máscaras).


  function copiarTabelaFacilitada(idTabela) {
    const tabela = document.getElementById(idTabela);
    const nomeCliente = document.getElementById("nomeCliente").value.trim(); 
    if (!tabela) return;
  
    let texto = `*Condição facilitada* *- ${nomeCliente}*\n`;
    const linhas = tabela.querySelectorAll("tr");
    linhas.forEach((linha) => {
      const th = linha.querySelector("th")?.innerText || "";
      const td = linha.querySelector("td")?.innerText || "";
      texto += `\n*${th}:* ${td}`;
    });
    
    navigator.clipboard.writeText(texto).then(() => {
      mostrarToast("Tabela copiada para a área de transferência!");
    }).catch(err => {
      mostrarToast("Erro ao copiar: " + err, true);
    });
  }

  function copiarTabelaPadrao(idTabela) {
    const tabela = document.getElementById(idTabela);
    const nomeCliente = document.getElementById("nomeCliente").value.trim();
    if (!tabela) return;
  
    let texto = `*Condição padrão* *- ${nomeCliente}*\n`;
    const linhas = tabela.querySelectorAll("tr");
    linhas.forEach((linha) => {
      const th = linha.querySelector("th")?.innerText || "";
      const td = linha.querySelector("td")?.innerText || "";
      texto += `\n*${th}:* ${td}`;
    });
  
    navigator.clipboard.writeText(texto).then(() => {
      mostrarToast("Tabela copiada para a área de transferência!");
    }).catch(err => {
      mostrarToast("Erro ao copiar: " + err, true);
    });
  }
  
  function mostrarToast(mensagem, erro = false) {
    const toastEl = document.getElementById("toastMensagem");
    const toastBody = toastEl.querySelector(".toast-body");
  
    // Atualiza mensagem e cor
    toastBody.textContent = mensagem;
    toastEl.classList.remove("text-bg-primary", "text-bg-danger");
    toastEl.classList.add(erro ? "text-bg-danger" : "text-bg-primary");
  
    // Mostra o toast
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
  }

  //Mostrar quantidade de parcelas
  //<tr><th>Parcelas</th><td>${formatCurrency(parcelasPadrao)} (${qtdParcelas} vezes)</td></tr>
