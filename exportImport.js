// Pegar todos os valores dos inputs, selects e textareas
function coletarDados() {
  const dados = {};
  document.querySelectorAll("input, select, textarea").forEach(el => {
    if (el.type === "checkbox" || el.type === "radio") {
      dados[el.id] = el.checked;
    } else {
      dados[el.id] = el.value;
    }
  });
  return dados;
}

// Preencher todos os campos a partir de um objeto
function preencherDados(dados) {
  Object.keys(dados).forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      if (el.type === "checkbox" || el.type === "radio") {
        el.checked = dados[id];
      } else {
        el.value = dados[id];
      }
    }
  });
}

// Exportar os dados para JSON
function exportarCondicao() {
  const dados = coletarDados();

  // Pega o nome do cliente
  const nomeCliente = document.getElementById("nomeCliente").value.trim().replace(/\s+/g, "_");

  const blob = new Blob([JSON.stringify(dados, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;

  // Nome do arquivo com o nome do cliente
  a.download = `condicao_${nomeCliente}.json`;

  a.click();
  URL.revokeObjectURL(url);
}


// Importar JSON e preencher os campos
function importarCondicao(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => {
    try {
      const dados = JSON.parse(e.target.result);
      preencherDados(dados);
      alert("Condição importada com sucesso!");
    } catch (err) {
      alert("Erro ao importar arquivo: " + err.message);
    }
  };
  reader.readAsText(file);
}
