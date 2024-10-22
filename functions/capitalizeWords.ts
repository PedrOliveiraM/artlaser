function capitalizeWords(str: string) {
  return str
    .split(' ') // Divide a string em palavras
    .map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(), // Capitaliza a primeira letra e mantém o resto em minúscula
    )
    .join(' ') // Une as palavras novamente em uma string
}

export default capitalizeWords
