import React from 'react';
// material
import { Box, Grid, Button, Container, Typography, Stack, Avatar } from '@mui/material';
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Items } from './reviewsItem';

const ContainerStyle = styled(Box)({
  width: '100vw',
  flexDirection: 'column',
  marginTop: 5,
});

const Header = styled('div')(({ theme }) => ({
  padding: '0 3px',
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '2.5rem',
  textAlign: 'center',
}));
const Text = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    fontSize: '20px',
    marginRight: '3px',
  },
}));
const BoxStyle = styled(Box)(({ theme }) => ({
  marginTop: 5,
  marginRight: 5,
  [theme.breakpoints.down('sm')]: {
    marginRight: 1,
  },
}));

export default function Reviews() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  return (
    <>
      <ContainerStyle>
        <Header>
          <Text variant="h4" sx={{ color: isLight ? 'text.primary' : 'text.secondary', mr: 1 }}>
            9353 AMBITIOUS FOLKS JOINED INCREASER
          </Text>
        </Header>
        <BoxStyle>
          <Grid container spacing={4} mr={3}>
            {Items.map(({ Image, Name, Text, Desc }) => (
              <Grid item xs={12} sm={6} md={4} p={5}>
                <Stack direction="column" spacing={3}>
                  <Typography variant="p" sx={{ fontSize: '19px', color: isLight ? 'text.secondary' : '#65769a' }}>
                    {Text}
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Avatar sx={{ width: '50px', height: '50px' }} src={Image} alt={Name} />
                    <Stack>
                      <Typography sx={{ color: isLight ? 'text.primary' : 'text.secondary', fontSize: '18px' }}>
                        {Name}
                      </Typography>
                      <Typography sx={{ fontSize: '18px', color: '#65769a' }}>{Desc}</Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </BoxStyle>
      </ContainerStyle>
    </>
  );
}
