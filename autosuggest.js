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



  // carregar sugestões 
  carregarSugestoesValorTerreno();
  carregarSugestoesValorTerrenoOverPrice();