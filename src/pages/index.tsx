import React, { FC } from 'react'
import { Box, Container, Typography } from '@material-ui/core/'
import Link from 'next/link'

const Home: FC = () => (
  <Container maxWidth="sm">
    <Box my={4}>
      <Typography variant="h4" component="h1" color="primary">
        Jornada Solar
      </Typography>

      <Link href="/cadastro">
        <a>Cadastro</a>
      </Link>
    </Box>
  </Container>
)

export default Home
