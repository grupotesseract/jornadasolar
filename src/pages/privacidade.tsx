import React, { FC } from 'react'
import { Box, Typography, Container, Link } from '@material-ui/core/'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import LinkVoltar from 'src/components/LinkVoltar'

const useStyles = makeStyles(() =>
  createStyles({
    titulo: {
      fontSize: 32,
      fontWeight: 800,
      lineHeight: '41px'
    },
    tituloParagrafo: {
      fontWeight: 600
    },
    textoParagrafo: {
      textAlign: 'justify'
    }
  })
)

interface ParagrafoProps {
  titulo?: string
  texto: React.ReactNode | string
  id?: string
}

const Privacidade: FC = () => {
  const classes = useStyles()

  const Paragrafo = ({ titulo, texto, id }: ParagrafoProps) => {
    return (
      <Box mt={4}>
        <Typography
          variant="h5"
          id={id}
          className={classes.tituloParagrafo}
          gutterBottom
        >
          {titulo}
        </Typography>
        <Typography variant="body1" className={classes.textoParagrafo}>
          {texto}
        </Typography>
      </Box>
    )
  }

  return (
    <Container maxWidth="lg">
      <Box mt={3} mb={10} mr={2} ml={2}>
        <LinkVoltar href="/" />
        <Box mt={3} mr="auto" ml="auto">
          <Typography variant="h4" component="h1" className={classes.titulo}>
            Política de privacidade
          </Typography>
        </Box>
        <Box mt={3}>
          <Paragrafo
            texto={`O Jornada Solar tem o compromisso com a privacidade e a segurança de seus clientes durante todo o processo de navegação e compra pelo site. 
          Nós não iremos vender, alugar ou transferir seus dados para terceiros.
          Essas informações podem ser agrupadas e utilizadas apenas
          internamente, como estatísticas genéricas, visando obter um melhor
          entendimento do perfil dos usuários para aperfeiçoamento dos produtos
          e serviços oferecidos no site. Com o objetivo de assegurar o direito à
          privacidade e à proteção de dados pessoais dos usuários da plataforma,
          seja em relação ao público geral, colaboradores, funcionários e todos
          aqueles que acessem por quaisquer meios nossos sistemas, apresentamos
          a política de privacidade de nosso sistema, em atendimento à
          legislação vigente e aos princípios que norteiam nossas atividades. Ao
          utilizar nossas plataformas, o usuário declara estar ciente e de
          acordo com o disposto nesta Política de Privacidade, autorizando o
          Jornada Solar, de forma livre e expressa, tratar dados e informações
          fornecidos pelo usuário nos termos aqui estabelecidos.`}
          />
          <Paragrafo
            titulo="Nesta página você será informado sobre:"
            texto={
              <ul>
                <Link href="#tipos-considerados">
                  <li>Que tipo de dados são considerados pela LGPD?</li>
                </Link>
                <Link href="#direitos-titular">
                  <li>
                    Quais são os seus direitos enquanto titular dos dados?
                  </li>
                </Link>
                <Link href="#dados-coletados">
                  <li>Como o Jornada Solar coleta seus dados pessoais?</li>
                </Link>
                <Link href="#tratamento">
                  <li>O que significa tratamento de dados?</li>
                </Link>
                <Link href="#ferramentas-usadas">
                  <li>
                    Quais as ferramentas utilizadas por nós para o tratamento
                    deseus dados?
                  </li>
                </Link>
                <Link href="#cookies">
                  <li>O que são e para que servem os cookies?</li>
                </Link>
                <Link href="#porque-coletar">
                  <li>Por que é necessário coletar e tratar seus dados?</li>
                </Link>
                <Link href="#armazenamento">
                  <li>Como é feito o armazenamento dos seus dados?</li>
                </Link>
                <Link href="#links-externos">
                  <li>Links externos</li>
                </Link>
                <Link href="#alteracoes">
                  <li>Alterações nesta Política de Privacidade</li>
                </Link>
              </ul>
            }
          />
          <Paragrafo
            id="tipos-considerados"
            titulo="Que tipo de dados são considerados pela LGPD?"
            texto="De acordo com a lei nº 13.709/2018 (LGPD), dados são quaisquer
          informações pessoais, analógicas ou digitais, de pessoas físicas ou
          jurídicas, tanto de direito privado como direito público, exceto nas
          hipóteses do artigo 4º da referida Lei. Essas informações são
          classificadas como dados identificados, dados identificáveis, dados
          sensíveis e dados anonimizados."
          />
          <Paragrafo
            id="direitos-titular"
            titulo="Quais são os seus direitos enquanto titular dos dados?"
            texto={
              <>
                <p>
                  O artigo 18 da LGPD garante que o titular dos dados confirme a
                  existência de tratamento dos seus dados pessoais, além de
                  poder acessá-los e corrigi-los, sendo assegurado ao titular, a
                  possibilidade de solicitar a anonimização, o bloqueio ou a
                  eliminação de dados pessoais desnecessários, excessivos ou
                  tratados em desconformidade com a LGPD.
                </p>
                <p>
                  A lei nº 13.709 também possibilita a obtenção de informações
                  sobre as entidades públicas e privadas com as quais a empresa
                  realizou o compartilhamento dos seus dados pessoais e, ainda,
                  a obtenção de informações sobre a possibilidade de não
                  consentir com o tratamento de dados pessoais e sobre eventuais
                  consequências negativas.
                </p>
              </>
            }
          />
          <Paragrafo
            id="dados-coletados"
            titulo="Quais dados dos usuários são coletados pelo Jornada Solar"
            texto={
              <>
                <p>
                  O Jornada Solar coleta de seus usuários, os dados cadastrais,
                  como nome e email. Para as operações de monitoramento de
                  hábitos, são coletados ainda os dados registrados como
                  hábitos, sentimentos e anotações.
                </p>
                <p>
                  Dentre os dados de navegação, são coletados dos usuários,
                  apenas o histórico de navegação. Todos os dados coletados pelo
                  Jornada Solar são armazenados em servidores específicos para
                  este fim, seguindo os mais rigorosos padrões de segurança, com
                  acesso por criptografia e sem compartilhamento de dados com
                  terceiros de qualquer natureza, exceto em caso de solicitação
                  de acesso apresentada por autoridade competente.
                </p>
              </>
            }
          />
          <Paragrafo
            id="tratamento"
            titulo="O que significa tratamento de dados?"
            texto={
              <>
                <p>
                  Logo após a coleta de dados, iniciamos a fase de tratamento
                  dos mesmos e, de acordo com as diretrizes da LGPD, você,
                  usuário, deve estar ciente da descrição deste tratamento e
                  quais as ferramentas utilizadas pelo Jornada Solar, para que
                  ele ocorra de forma segura, respeitando o seu direito à
                  privacidade e a exigência legal de proteção aos seus dados.
                </p>
                <p>
                  O tratamento de dados diz respeito a todas as operações
                  posteriores à coleta. É, basicamente, tudo o que é feito com
                  as informações pessoais que você disponibiliza.{' '}
                </p>
                <p>
                  De acordo com o inciso X do artigo 5 da lei nº 13.709/2018,
                  são permitidas as seguintes operações: coleta, produção,
                  recepção, classificação, utilização, acesso, reprodução,
                  transmissão, distribuição, processamento, arquivamento,
                  armazenamento, eliminação, avaliação ou controle da
                  informação, comunicação, transferência, difusão ou extração.
                </p>
                <p>
                  O encerramento do tratamento de seus dados pessoais se dá
                  quando a finalidade for alcançada e o tratamento não for mais
                  necessário para alcançar as finalidade a que se destina.
                </p>
              </>
            }
          />
          <Paragrafo
            id="ferramentas-usadas"
            titulo="Quais as ferramentas utilizadas pelo Jornada Solar para o tratamento dos seus dados?"
            texto={
              'Dentre as operações de tratamento de dados previstas em Lei, utilizamos apenas armazenamento local, cadastro dos dados pessoais, e cadastro dos hábitos, sentimentos e anotações.'
            }
          />
          <Paragrafo
            id="cookies"
            titulo="O que são e para que servem os cookies?"
            texto={
              <>
                <p>
                  Algumas ferramentas de tratamento de dados fazem uso de
                  cookies e outras ferramentas de rastreamento de dados.
                </p>
                <p>
                  Para compreender o porquê é necessário estar de acordo com o
                  uso de cookies, além da Política de Privacidade, para navegar
                  em nosso site, é preciso ter acesso às suas definições de
                  sistema. Cookies são pequenos arquivos de dados que
                  solicitamos que o seu navegador armazene, seja no computador
                  ou em dispositivos móveis. Dessa forma, o principal objetivo
                  dos cookies é permitir que ao acessar o nosso portal, seu
                  navegador se lembre dos mecanismos de usabilidade
                  desenvolvidos pelo Jornada Solar com mais facilidade,
                  eliminando a necessidade de introduzir repetidamente as mesmas
                  informações.
                </p>
                <p>
                  Por fim, é importante esclarecer que os cookies coletados por
                  nós são apagados de nossos servidores quando não utilizados
                  por prazo superior a 30 dias e caso prefira, você pode
                  desabilitar o salvamento de cookies em seu browser, deletá-los
                  e gerenciar sua utilização por meio da configuração do
                  navegador que utiliza para acessar o site do Jornada Solar.
                </p>
              </>
            }
          />
          <Paragrafo
            id="porque-coletar"
            titulo="Por que é necessário coletar e tratar seus dados?"
            texto={
              'As informações identificadas ou identificáveis que você compartilha com o Jornada Solar têm como finalidade a gestão, administração, prestação, ampliação e melhoramento de navegação e oferta de serviços. Além disso, a partir da coleta e do tratamento de dados, é possível oferecer a possibilidade de o usuário moldar a sua navegação em relação aos dados que lhe são relevantes.'
            }
          />
          <Paragrafo
            id="armazenamento"
            titulo="Como é feito o armazenamento dos seus dados?"
            texto={
              'Ao estar ciente desta Política de Privacidade, o usuário autoriza o Jornada Solar a armazenar a totalidade dos dados coletados, com o objetivo de possibilitar a criação de um banco de dados para uso próprio, incluindo o desenvolvimento de soluções e serviços, além de análises internas.'
            }
          />
          <Paragrafo
            id="links-externos"
            titulo="Links externos"
            texto={
              'Este site pode conter links para outros sites. Aconselhamos que você leia atentamente a Política de Privacidade de todos os sites que visitar. Não temos controle e não assumimos nenhuma responsabilidade pelo conteúdo, políticas ou práticas de privacidade de sites ou serviços de terceiros.'
            }
          />
          <Paragrafo
            id="alteracoes"
            titulo="Alterações nesta Política de Privacidade"
            texto={
              'O Jornada Solar pode, periodicamente, realizar alterações nesta Política de Privacidade, para garantir a contínua melhoria dos nossos serviços, por isso, recomendamos a leitura desta página de tempos em tempos para tomar conhecimento de quaisquer mudanças em nossas diretrizes.'
            }
          />
          <Paragrafo
            id="duvidas"
            titulo="Ficou com alguma dúvida? Fale conosco!"
            texto={
              'Qualquer solicitação que você tenha interesse em fazer a respeito de seus dados – informações, solicitação de alteração; cancelamento, mais informações, entre outros – entre em contato através dos nossos canais de atendimento.'
            }
          />
        </Box>
      </Box>
    </Container>
  )
}

export default Privacidade
