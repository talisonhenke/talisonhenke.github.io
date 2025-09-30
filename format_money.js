 // Formatar campos de valores monetários em tempo de edição
 
 function formatarRealInput(value) {
  // Remove tudo que não for número
  value = value.replace(/\D/g, '');

  // Se estiver vazio, retorna o valor padrão
  if (!value) return 'R$ 0,00';

  // Converte para número e formata
  const numero = parseFloat(value) / 100;

  if (isNaN(numero)) return 'R$ 0,00';

  return numero.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

document.querySelectorAll('.money').forEach(input => {
  input.addEventListener('input', (e) => {
    const valorFormatado = formatarRealInput(e.target.value);
    e.target.value = valorFormatado;

    // Mantém o cursor no final
    setTimeout(() => {
      e.target.selectionStart = e.target.selectionEnd = e.target.value.length;
    }, 0);
  });

  // Formata ao perder o foco (caso o campo esteja vazio)
  input.addEventListener('blur', (e) => {
    if (e.target.value.trim() === '') {
      e.target.value = 'R$ 0,00';
    }
  });

  // Evita entrada de letras e símbolos inválidos
  input.addEventListener('keypress', (e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  });
});

