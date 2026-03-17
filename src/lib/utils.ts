export function currency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value);
}

export function dateTime(value: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(value));
}

export function shortDate(value: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
  }).format(new Date(value));
}

export function percent(value: number) {
  return `${value.toFixed(1).replace('.', ',')}%`;
}
