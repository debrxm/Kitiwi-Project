import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Grid, Button, Container, Typography } from '@mui/material';
//
import { varFadeInUp, MotionInView } from '../../components/animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  minHeight: '75vh',
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    alignItems: 'flex-start',
    minHeight: '110vh',
    paddingTop: 20,
    marginBottom: 100,
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  width: '100%',
  textAlign: 'center',
  marginBottom: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    marginBottom: 0,
  },
}));

const ScreenStyle = styled(MotionInView)(({ theme }) => ({
  paddingBottom: 1,
  width: '80%',
  borderRadius: 8,
  backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 300 : 800],
  [theme.breakpoints.up('sm')]: {
    marginTop: -50,
    borderRadius: 12,
  },
  '& img': {
    borderRadius: 8,
    [theme.breakpoints.up('sm')]: {
      borderRadius: 12,
    },
  },
}));

const COMMON = {
  translateX: 0,
  translateY: 0,
  opacity: 0,
};

const variantScreenLeft = {
  initial: COMMON,
  animate: { ...COMMON, translateX: '0', translateY: 160, opacity: 1 },
};

// ----------------------------------------------------------------------

export default function LandingHero() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const isRTL = theme.direction === 'rtl';

  const screenLeftAnimate = variantScreenLeft;

  return (
    <RootStyle>
      <Container>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: { md: 'center' } }}>
            <ContentStyle>
              <MotionInView variants={varFadeInUp}>
                <Typography
                  variant="h3"
                  sx={{
                    mb: 5,
                    color: isLight ? 'text.primary' : 'common.white',
                  }}
                >
                  Get more freedom out of remote work
                </Typography>
              </MotionInView>
              <MotionInView variants={varFadeInUp}>
                <Grid
                  container
                  spacing={1}
                  alignItems="basline"
                  // justifyContent={{ md: 'center' }}
                  sx={{ justifyContent: { xs: 'center', sm: 'center', md: 'flex-start' } }}
                >
                  <Grid item>
                    <Icon icon={'eva:flash-fill'} color={theme.palette.primary.main} width={22} height={22} />
                  </Grid>
                  <Grid item sx={{ mt: 0.5 }}>
                    <Typography component="p" variant="overline" sx={{ mb: 3, color: 'text.secondary' }}>
                      Finish workday earlier
                    </Typography>
                  </Grid>
                </Grid>
              </MotionInView>
              <MotionInView variants={varFadeInUp}>
                <Grid
                  container
                  spacing={1}
                  alignItems="basline"
                  sx={{ justifyContent: { xs: 'center', sm: 'center', md: 'flex-start' } }}
                >
                  <Grid item>
                    <Icon icon={'jam:lifebuoy-f'} color={theme.palette.primary.main} width={20} height={20} />
                  </Grid>
                  <Grid item sx={{ mt: 0.5 }}>
                    <Typography component="p" variant="overline" sx={{ mb: 3, color: 'text.secondary' }}>
                      Fit work into your lifestyle
                    </Typography>
                  </Grid>
                </Grid>
              </MotionInView>
              <MotionInView variants={varFadeInUp}>
                <Grid
                  container
                  spacing={1}
                  alignItems="basline"
                  sx={{ justifyContent: { xs: 'center', sm: 'center', md: 'flex-start' } }}
                >
                  <Grid item>
                    <Icon
                      icon={'ic:outline-self-improvement'}
                      color={theme.palette.primary.main}
                      width={24}
                      height={24}
                    />
                  </Grid>
                  <Grid item sx={{ mt: 0.5 }}>
                    <Typography component="p" variant="overline" sx={{ mb: 3, color: 'text.secondary' }}>
                      More quality time for yourself
                    </Typography>
                  </Grid>
                </Grid>
              </MotionInView>
              <br />
              <MotionInView variants={varFadeInUp}>
                <Button
                  variant="contained"
                  color="inherit"
                  size="large"
                  endIcon={<Icon icon={'ic:round-arrow-right-alt'} width={24} height={24} />}
                  component={RouterLink}
                  to={'/auth/register'}
                >
                  Start Now
                </Button>
              </MotionInView>
            </ContentStyle>
          </Grid>

          <Grid item xs={12} md={8}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                justifyContent: 'center',
              }}
            >
              {[...Array(1)].map((_, index) => (
                <ScreenStyle
                  key={index}
                  threshold={0.72}
                  variants={{
                    ...(index === 0 && screenLeftAnimate),
                  }}
                  transition={{ duration: 0.72, ease: 'easeOut' }}
                  sx={{
                    boxShadow: `${isRTL ? -40 : 40}px -40px 40px ${alpha(
                      isLight ? theme.palette.grey[600] : theme.palette.common.black,
                      0.48
                    )}`,
                    ...(index === 0 && {
                      zIndex: 3,
                      position: 'absolute',
                    }),
                  }}
                >
                  <img alt={`screen ${index + 1}`} src={`/static/home/landinghero.jpg`} />
                </ScreenStyle>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
