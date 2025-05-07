// sugestões de preenchimento valor terreno

function carregarSugestoesValorTerreno() {
    const sugestoes = JSON.parse(localStorage.getItem('valorTerrenoPadrao')) || [];
    const datalist = document.getElementById('sugestoesValorTerrenoPadrao');
    console.log(datalist);
  
    // Limpa antes de adicionar
    datalist.innerHTML = '';
  
    sugestoes.forEach(valor => {
      const option = document.createElement('option');
      option.value = valor;
      datalist.appendChild(option);
    });
  }
  
  function salvarValorTerreno(valor) {
    let valores = JSON.parse(localStorage.getItem('valorTerrenoPadrao')) || [];

      // Remove se já existir (para atualizar a ordem)
      valores = valores.filter(v => v !== valor);

      // Adiciona no início
      valores.unshift(valor);

      // Mantém só os 5 mais recentes
      valores = valores.slice(0, 5);
      localStorage.setItem('valorTerrenoPadrao', JSON.stringify(valores));
  }

  function carregarSugestoesValorTerrenoOverPrice() {
    const sugestoes = JSON.parse(localStorage.getItem('valorTerrenoOver')) || [];
    const datalist = document.getElementById('sugestoesValorTerrenoOver');
    console.log(datalist);
  
    // Limpa antes de adicionar
    datalist.innerHTML = '';
  
    sugestoes.forEach(valor => {
      const option = document.createElement('option');
      option.value = valor;
      datalist.appendChild(option);
    });
  }
  
  function salvarSugestoesValorTerrenoOverPrice(valor) {
    let valores = JSON.parse(localStorage.getItem('valorTerrenoOver')) || [];

      // Remove se já existir (para atualizar a ordem)
      valores = valores.filter(v => v !== valor);

      // Adiciona no início
      valores.unshift(valor);

      // Mantém só os 5 mais recentes
      valores = valores.slice(0, 5);
      localStorage.setItem('valorTerrenoOver', JSON.stringify(valores));
  }

  function carregarSugestoesM2Padrao() {
    const sugestoes = JSON.parse(localStorage.getItem('valorM2Padrao')) || [];
    const datalist = document.getElementById('sugestoesM2Padrao');
    console.log(datalist);
  
    // Limpa antes de adicionar
    datalist.innerHTML = '';
  
    sugestoes.forEach(valor => {
      const option = document.createElement('option');
      option.value = valor;
      datalist.appendChild(option);
    });
  }
  
  function salvarSugestoesM2Padrao(valor) {
    let valores = JSON.parse(localStorage.getItem('valorM2Padrao')) || [];

      // Remove se já existir (para atualizar a ordem)
      valores = valores.filter(v => v !== valor);

      // Adiciona no início
      valores.unshift(valor);

      // Mantém só os 5 mais recentes
      valores = valores.slice(0, 5);
      localStorage.setItem('valorM2Padrao', JSON.stringify(valores));
  }

  function carregarSugestoesM2Over() {
    const sugestoes = JSON.parse(localStorage.getItem('valorM2Over')) || [];
    const datalist = document.getElementById('sugestoesM2Over');
    console.log(datalist);
  
    // Limpa antes de adicionar
    datalist.innerHTML = '';
  
    sugestoes.forEach(valor => {
      const option = document.createElement('option');
      option.value = valor;
      datalist.appendChild(option);
    });
  }
  
  function salvarSugestoesM2Over(valor) {
    let valores = JSON.parse(localStorage.getItem('valorM2Over')) || [];

      // Remove se já existir (para atualizar a ordem)
      valores = valores.filter(v => v !== valor);

      // Adiciona no início
      valores.unshift(valor);

      // Mantém só os 5 mais recentes
      valores = valores.slice(0, 5);
      localStorage.setItem('valorM2Over', JSON.stringify(valores));
  }

  function carregarSugestoesQtdM2Padrao() {
    const sugestoes = JSON.parse(localStorage.getItem('qtdM2Padrao')) || [];
    const datalist = document.getElementById('sugestoesQtdM2Padrao');
    console.log(datalist);
  
    // Limpa antes de adicionar
    datalist.innerHTML = '';
  
    sugestoes.forEach(valor => {
      const option = document.createElement('option');
      option.value = valor;
      datalist.appendChild(option);
    });
  }
  
  function salvarSugestoesQtdM2Padrao(valor) {
    let valores = JSON.parse(localStorage.getItem('qtdM2Padrao')) || [];

      // Remove se já existir (para atualizar a ordem)
      valores = valores.filter(v => v !== valor);

      // Adiciona no início
      valores.unshift(valor);

      // Mantém só os 5 mais recentes
      valores = valores.slice(0, 5);
      localStorage.setItem('qtdM2Padrao', JSON.stringify(valores));
  }

  function carregarSugestoesQtdM2Over() {
    const sugestoes = JSON.parse(localStorage.getItem('qtdM2Over')) || [];
    const datalist = document.getElementById('sugestoesQtdM2Over');
    console.log(datalist);
  
    // Limpa antes de adicionar
    datalist.innerHTML = '';
  
    sugestoes.forEach(valor => {
      const option = document.createElement('option');
      option.value = valor;
      datalist.appendChild(option);
    });
  }
  
  function salvarSugestoesQtdM2Over(valor) {
    let valores = JSON.parse(localStorage.getItem('qtdM2Over')) || [];

      // Remove se já existir (para atualizar a ordem)
      valores = valores.filter(v => v !== valor);

      // Adiciona no início
      valores.unshift(valor);

      // Mantém só os 5 mais recentes
      valores = valores.slice(0, 5);
      localStorage.setItem('qtdM2Over', JSON.stringify(valores));
  }

  function carregarSugestoesMedidaAba() {
    const sugestoes = JSON.parse(localStorage.getItem('medidaAba')) || [];
    const datalist = document.getElementById('sugestoesMedidaAba');
    console.log(datalist);
  
    // Limpa antes de adicionar
    datalist.innerHTML = '';
  
    sugestoes.forEach(valor => {
      const option = document.createElement('option');
      option.value = valor;
      datalist.appendChild(option);
    });
  }
  
  function salvarSugestoesMedidaAba(valor) {
    let valores = JSON.parse(localStorage.getItem('medidaAba')) || [];

      // Remove se já existir (para atualizar a ordem)
      valores = valores.filter(v => v !== valor);

      // Adiciona no início
      valores.unshift(valor);

      // Mantém só os 5 mais recentes
      valores = valores.slice(0, 5);
      localStorage.setItem('medidaAba', JSON.stringify(valores));
  }


  // carregar sugestões 
  carregarSugestoesValorTerreno();
  carregarSugestoesValorTerrenoOverPrice();
  carregarSugestoesM2Padrao();
  carregarSugestoesM2Over();
  carregarSugestoesQtdM2Padrao();
  carregarSugestoesQtdM2Over();
  carregarSugestoesMedidaAba();