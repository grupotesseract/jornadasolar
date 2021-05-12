import GrupoDeHabitos, { IGrupoDeHabitos } from 'src/entities/GrupoDeHabitos'
import Habito from '../../entities/Habito'
import GetHabitosByUserId from '../habito/GetHabitosByUserId'

export const gruposDeHabitosTemplate = [
  {
    nome: 'social',
    habitos: [
      {
        emojiUnicode: [
          '1F468',
          '200D',
          '1F468',
          '200D',
          '1F466',
          '200D',
          '1F466'
        ],
        nome: 'Família'
      },
      {
        emojiUnicode: ['1F9D1', '200D', '1F91D', '200D', '1F9D1'],
        nome: 'Amigos'
      },
      { emojiUnicode: ['1F468'], nome: 'Sozinho' },
      { emojiUnicode: ['1F57A'], nome: 'Encontro casual' },
      {
        emojiUnicode: [
          '1F469',
          '200D',
          '2764',
          'FE0F',
          '200D',
          '1F468',
          '1F468',
          '200D',
          '2764',
          'FE0F',
          '200D',
          '1F468'
        ],
        nome: 'Companheir@'
      },
      { emojiUnicode: ['1F4F1'], nome: 'Digital' }
    ]
  },
  {
    nome: 'Lazer',
    habitos: [
      { emojiUnicode: ['2708', 'FE0F'], nome: 'Viagem' },
      { emojiUnicode: ['1F3A5'], nome: 'Fimes/séries' },
      { emojiUnicode: ['1F4DA'], nome: 'Leitura' },
      { emojiUnicode: ['1F3AE'], nome: 'Jogos' },
      { emojiUnicode: ['2600', 'FE0F'], nome: 'Ar livre' },
      { emojiUnicode: ['1F60D'], nome: 'Hobby' }
    ]
  },
  {
    nome: 'Atividade física',
    habitos: [
      { emojiUnicode: ['1F636'], nome: 'Nada' },
      { emojiUnicode: ['1F6B6'], nome: 'Caminhada' },
      { emojiUnicode: ['1F3C3'], nome: 'Esporte' },
      { emojiUnicode: ['1F646', '200D', '2642', 'FE0F'], nome: 'Alongamentos' },
      { emojiUnicode: ['1F4AA'], nome: 'Treino intenso' },
      { emojiUnicode: ['1F635'], nome: 'Lesionado' }
    ]
  },
  {
    nome: 'sono',
    habitos: [
      { emojiUnicode: ['1F634'], nome: 'Dormi cedo' },
      { emojiUnicode: ['1F62A'], nome: 'Dormi tarde' },
      { emojiUnicode: ['1F60C'], nome: 'Dormi bem' },
      { emojiUnicode: ['1F441', 'FE0F'], nome: 'Insônia' },
      { emojiUnicode: ['1F4AD'], nome: 'Sonho' },
      { emojiUnicode: ['1F616'], nome: 'Pesadelo' }
    ]
  },
  {
    nome: 'Alimentação',
    habitos: [
      { emojiUnicode: ['1F951'], nome: 'Caseira' },
      { emojiUnicode: ['1F35F'], nome: 'Fast food' },
      { emojiUnicode: ['1F35D'], nome: 'Restaurante' },
      { emojiUnicode: ['1F357'], nome: 'Carne' },
      { emojiUnicode: ['1F922'], nome: 'Exagerei' },
      { emojiUnicode: ['1F966'], nome: 'Comida leve' }
    ]
  },
  {
    nome: 'Saúde',
    habitos: [
      { emojiUnicode: ['1F468', '200D', '2695', 'FE0F'], nome: 'Médico' },
      { emojiUnicode: ['1F48A'], nome: 'Remédios' },
      { emojiUnicode: ['1F6B0'], nome: 'Água' },
      { emojiUnicode: ['1F9D8'], nome: 'Terapia' },
      { emojiUnicode: ['2615'], nome: 'Chás' },
      { emojiUnicode: ['1F343'], nome: 'Florais' }
    ]
  },
  {
    nome: 'Profissional',
    habitos: [
      { emojiUnicode: ['1F4D3'], nome: 'Estudos' },
      { emojiUnicode: ['1F642'], nome: 'Trabalho leve' },
      { emojiUnicode: ['1F61F'], nome: 'Pressão/tensão' },
      { emojiUnicode: ['1F64B', '200D', '2642', 'FE0F'], nome: 'Voluntariado' },
      { emojiUnicode: ['1F9B8', '200D', '2642', 'FE0F'], nome: 'Workaholic' },
      { emojiUnicode: ['1F61E'], nome: 'Procrastinei' }
    ]
  },
  {
    nome: 'Tarefa',
    habitos: [
      { emojiUnicode: ['1F9F9'], nome: 'Faxina' },
      { emojiUnicode: ['1F6A7'], nome: 'Reforma' },
      { emojiUnicode: ['1F6D2'], nome: 'Compras' },
      { emojiUnicode: ['1F4B2'], nome: 'Finanças' },
      { emojiUnicode: ['1F9FC'], nome: 'Lavar roupa' },
      { emojiUnicode: ['1F468', '200D', '1F373'], nome: 'Cozinhar' }
    ]
  },
  {
    nome: 'Sexo',
    habitos: [
      { emojiUnicode: ['1F590', 'FE0F'], nome: 'Masturbação' },
      { emojiUnicode: ['1F34C'], nome: 'Usei proteção' },
      { emojiUnicode: ['1F57A'], nome: 'Casual' },
      {
        emojiUnicode: [
          '1F469',
          '200D',
          '2764',
          'FE0F',
          '200D',
          '1F468',
          '1F468',
          '200D',
          '2764',
          'FE0F',
          '200D',
          '1F468'
        ],
        nome: 'Companheir@'
      },
      { emojiUnicode: ['1F525'], nome: 'Com tesão' },
      { emojiUnicode: ['1F4A6'], nome: 'Ejaculei' }
    ]
  },
  {
    nome: 'Vício',
    habitos: [
      { emojiUnicode: ['1F6AC'], nome: 'Cigarro' },
      { emojiUnicode: ['1F377'], nome: 'Álcool' },
      { emojiUnicode: ['1F489'], nome: 'Entorpecente' },
      { emojiUnicode: ['1F51E'], nome: 'Pornografia' },
      { emojiUnicode: ['1F3AE'], nome: 'Jogos' },
      { emojiUnicode: ['1F4F1'], nome: 'Rede Social' }
    ]
  }
]

type Parameters = {
  userId: string
  allowPersonalizados?: boolean
}

interface IGetGrupoDeHabitosTemplateByUserId {
  call({
    userId,
    allowPersonalizados
  }: Parameters): Promise<Array<IGrupoDeHabitos>>
}

export default class GetGrupoDeHabitosTemplateByUserId implements IGetGrupoDeHabitosTemplateByUserId {
  async call({
    userId,
    allowPersonalizados = true
  }: Parameters): Promise<Array<IGrupoDeHabitos>> {
    const gruposDeHabitos = gruposDeHabitosTemplate.map(grupoDeHabito => {
      const habitos = grupoDeHabito.habitos.map(
        habito =>
          new Habito({ nome: habito.nome, emojiUnicode: habito.emojiUnicode })
      )
      return new GrupoDeHabitos({ nome: grupoDeHabito.nome, habitos })
    })
    if (allowPersonalizados) {
      const habitosDoUsuario = await new GetHabitosByUserId().call(userId)
      const personalizados = new GrupoDeHabitos({
        nome: 'Personalizados',
        habitos: habitosDoUsuario
      })
      gruposDeHabitos.push(personalizados)
    }

    return gruposDeHabitos
  }
}
