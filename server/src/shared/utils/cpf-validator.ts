export function isValidCPF(cpf: string): boolean {
  const cleanCPF = cpf.replace(/[^\d]+/g, '')

  if (cleanCPF.length !== 11 || !!cleanCPF.match(/(\d)\1{10}/)) {
    return false
  }

  const cpfDigits = cleanCPF.split('').map((el) => +el)

  const getRest = (count: number) => {
    return (
      (cpfDigits
        .slice(0, count - 12)
        .reduce((soma, el, index) => soma + el * (count - index), 0) *
        10) %
      11 %
      10
    )
  }

  return getRest(10) === cpfDigits[9] && getRest(11) === cpfDigits[10]
}

export function formatCPF(cpf: string): string {
  const cleanCPF = cpf.replace(/\D/g, '')
  if (cleanCPF.length === 11) {
    return cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }
  return cpf
}