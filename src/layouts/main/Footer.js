import { Icon } from '@iconify/react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Grid, Link, Divider, Container, Typography, IconButton, Stack } from '@mui/material';
// routes
//
import Logo from '../../components/Logo';

// ----------------------------------------------------------------------

const SOCIALS = [
  { name: 'FaceBook', icon: 'eva:facebook-fill' },
  { name: 'Google', icon: 'eva:google-fill' },
  { name: 'Linkedin', icon: 'eva:linkedin-fill' },
  { name: 'Twitter', icon: 'eva:twitter-fill' },
];

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <RootStyle>
      <Divider />
      <Container maxWidth="lg" sx={{ pt: 10 }}>
        <Grid container>
          <Grid item xs={12} sx={{ mb: 6 }}>
            <ScrollLink to="move_top" spy smooth>
              <Logo sx={{ mx: { xs: 'auto', md: 'inherit' } }} />
            </ScrollLink>
          </Grid>
          <Grid item xs={12} sx={{ mb: 6 }}>
            <Typography
              component="p"
              variant="body2"
              sx={{
                fontSize: 13,
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              © {year}. All rights reserved
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
