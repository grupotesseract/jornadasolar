import React, { FC } from 'react'
import { Box, Container, Typography } from '@material-ui/core/'

const Home: FC = () => (
  <Container maxWidth="sm">
    <Box my={4}>
      <Typography variant="h4" component="h1" color="secondary">
        Jornada Solar
      </Typography>
    </Box>
  </Container>
)

export default Home
