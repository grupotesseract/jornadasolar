import { ISentimento } from 'src/entities/Sentimento'
import GetSentimentosByUserId from 'src/services/sentimentos/GetSentimentosByUserId'
import GetAllSentimentosModelos from 'src/services/sentimentosModelos/GetAllSentimentosModelos'

export const getSentimentosIniciais = async (
  userId?: string
): Promise<ISentimento[]> => {
  if (userId) {
    return await new GetSentimentosByUserId(userId).call()
  }
  return await new GetAllSentimentosModelos().call()
}
