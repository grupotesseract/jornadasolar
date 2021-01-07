import React, { FC } from 'react'
import EmojiComNome from '../EmojiComNome'

export const gruposDeHabitos = [
  {
    nome: 'social',
    habitos: [
      { emoji: 'familia', nome: 'Família' },
      { emoji: 'amigos', nome: 'Amigos' },
      { emoji: 'sozinho', nome: 'Sozinho' },
      { emoji: 'casual', nome: 'Encontro casual' },
      { emoji: 'companheiro', nome: 'Companheir@' },
      { emoji: 'digital', nome: 'Digital' }
    ]
  },
  {
    nome: 'Lazer',
    habitos: [
      { emoji: 'viagem', nome: 'Viagem' },
      { emoji: 'filmesSeries', nome: 'Fimes/séries' },
      { emoji: 'leitura', nome: 'Leitura' },
      { emoji: 'jogos', nome: 'Jogos' },
      { emoji: 'arLivre', nome: 'Ar livre' },
      { emoji: 'hobby', nome: 'Hobby' }
    ]
  },
  {
    nome: 'Atividade física',
    habitos: [
      { emoji: 'nada', nome: 'Nada' },
      { emoji: 'caminhada', nome: 'Caminhada' },
      { emoji: 'esporte', nome: 'Esporte' },
      { emoji: 'alongamento', nome: 'Alongamentos' },
      { emoji: 'treinoIntenso', nome: 'Treino intenso' },
      { emoji: 'lesionado', nome: 'Lesionado' }
    ]
  },
  {
    nome: 'sono',
    habitos: [
      { emoji: 'dormiCedo', nome: 'Dormi cedo' },
      { emoji: 'dormiTarde', nome: 'Dormi tarde' },
      { emoji: 'dormiBem', nome: 'Dormi bem' },
      { emoji: 'insonia', nome: 'Insônia' },
      { emoji: 'sonho', nome: 'Sonho' },
      { emoji: 'pesadelo', nome: 'Pesadelo' }
    ]
  },
  {
    nome: 'Alimentação',
    habitos: [
      { emoji: 'caseira', nome: 'Caseira' },
      { emoji: 'fastFood', nome: 'Fast food' },
      { emoji: 'restaurante', nome: 'Restaurante' },
      { emoji: 'carne', nome: 'Carne' },
      { emoji: 'exagerei', nome: 'Exagerei' },
      { emoji: 'comidaLeve', nome: 'Comida leve' }
    ]
  },
  {
    nome: 'Saúde',
    habitos: [
      { emoji: 'medico', nome: 'Médico' },
      { emoji: 'remedios', nome: 'Remédios' },
      { emoji: 'agua', nome: 'Água' },
      { emoji: 'terapia', nome: 'Terapia' },
      { emoji: 'chas', nome: 'Chás' },
      { emoji: 'florais', nome: 'Florais' }
    ]
  },
  {
    nome: 'Profissional',
    habitos: [
      { emoji: 'estudos', nome: 'Estudos' },
      { emoji: 'trabalhoLeve', nome: 'Trabalho leve' },
      { emoji: 'pressaoTensao', nome: 'Pressão/tensão' },
      { emoji: 'voluntariado', nome: 'Voluntariado' },
      { emoji: 'workaholic', nome: 'Workaholic' },
      { emoji: 'procrastinei', nome: 'Procrastinei' }
    ]
  },
  {
    nome: 'Tarefa',
    habitos: [
      { emoji: 'faxina', nome: 'Faxina' },
      { emoji: 'reforma', nome: 'Reforma' },
      { emoji: 'compras', nome: 'Compras' },
      { emoji: 'financas', nome: 'Finanças' },
      { emoji: 'lavarRoupa', nome: 'Lavar roupa' },
      { emoji: 'cozinhar', nome: 'Cozinhar' }
    ]
  },
  {
    nome: 'Sexo',
    habitos: [
      { emoji: 'masturbacao', nome: 'Masturbação' },
      { emoji: 'protecao', nome: 'Usei proteção' },
      { emoji: 'casual', nome: 'Casual' },
      { emoji: 'companheiro', nome: 'Companheir@' },
      { emoji: 'tesao', nome: 'Com tesão' },
      { emoji: 'ejaculei', nome: 'Ejaculei' }
    ]
  },
  {
    nome: 'Vício',
    habitos: [
      { emoji: 'cigarro', nome: 'Cigarro' },
      { emoji: 'alcool', nome: 'Álcool' },
      { emoji: 'entorpecente', nome: 'Entorpecente' },
      { emoji: 'pornografia', nome: 'Pornografia' },
      { emoji: 'jogos', nome: 'Jogos' },
      { emoji: 'digital', nome: 'Rede Social' }
    ]
  }
]

interface IProps {
  nome: string
  className?: string
}

const Habito: FC<IProps> = ({ nome, className }) => {
  const habitos = gruposDeHabitos.map(grupo => grupo.habitos).flat()

  return <EmojiComNome lista={habitos} nome={nome} className={className} />
}

export default Habito
