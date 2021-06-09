interface IPagina {
  path: string
  label: string
}

const paginasDoApp: IPagina[] = [
  { path: 'diario', label: 'Diário' },
  { path: 'date', label: 'Detalhe de um dia' },
  { path: 'sentimentos', label: 'Preencher sentimentos' },
  { path: 'habitos', label: 'Preencher hábitos' },
  { path: 'anotacoes', label: 'Preencher anotações' },
  { path: 'graficos ', label: 'Gráficos' },
  { path: 'meditacoes ', label: 'Meditações' },
  { path: 'configuracoes ', label: 'Configurações' }
]

export const getPaginasDoApp = (): IPagina[] => {
  return paginasDoApp
}

export const getLabel = (path: string): string => {
  return paginasDoApp.find(pagina => pagina.path === path).label
}
