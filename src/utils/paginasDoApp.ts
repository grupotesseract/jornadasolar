interface IPagina {
  value: string
  label: string
}

const paginasDoApp: IPagina[] = [
  { value: 'diario', label: 'Diário' },
  { value: 'date', label: 'Detalhe de um dia' },
  { value: 'sentimentos', label: 'Preencher sentimentos' },
  { value: 'habitos', label: 'Preencher hábitos' },
  { value: 'anotacoes', label: 'Preencher anotações' },
  { value: 'graficos ', label: 'Gráficos' },
  { value: 'meditacoes ', label: 'Meditações' },
  { value: 'configuracoes ', label: 'Configurações' }
]

export const getPaginasDoApp = (): IPagina[] => {
  return paginasDoApp
}

export const getLabel = (path: string): string => {
  return paginasDoApp.find(pagina => pagina.value === path).label
}
