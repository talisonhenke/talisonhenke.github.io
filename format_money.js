 // Formatar campos de valores monetários em tempo de edição
 
 function formatarRealInput(value) {
    // Remove tudo que não for número
    value = value.replace(/\D/g, '');
  
    // Converte para número
    const numero = parseFloat(value) / 100;
  
    // Formata para moeda brasileira
    return numero.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }
  
  document.querySelectorAll('.money').forEach(input => {
    input.addEventListener('input', (e) => {
      const cursorPosition = e.target.selectionStart;
      const valorFormatado = formatarRealInput(e.target.value);
      e.target.value = valorFormatado;
  
      // Mantém o cursor no final do input
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = e.target.value.length;
      }, 0);
    });
  
    // Evita entrada de letras e símbolos inválidos
    input.addEventListener('keypress', (e) => {
      if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
      }
    });
  });