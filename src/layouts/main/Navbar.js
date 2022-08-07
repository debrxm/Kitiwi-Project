import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, Button, AppBar, Link, IconButton } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
import useSettings from '../../hooks/useSettings';
import useAuth from '../../hooks/useAuth';
// components
import Logo from '../../components/Logo';
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const LinkStyle = styled(Link)(({ theme }) => ({
  ...theme.typography.mainNavLink,
  color: theme.palette.text.primary,
  textDecoration: 'none',
  marginLeft: theme.spacing(6),
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shortest,
  }),
  '&:hover': {
    opacity: 0.48,
    textDecoration: 'none',
  },
}));

const ToolbarStyle = styled(AppBar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingLeft: '5%',
  paddingRight: '5%',

  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    paddingLeft: '5%',
    paddingRight: '5%',
  },
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};
MenuDesktopItem.propTypes = {
  item: PropTypes.object,
  title: PropTypes.string,
  path: PropTypes.string,
};

function MenuDesktopItem({ item }) {
  const { title, path } = item;

  return (
    <LinkStyle
      to={path}
      component={RouterLink}
      end={path === '/'}
      sx={{
        '&.active': {
          color: 'primary.main',
        },
      }}
    >
      {title}
    </LinkStyle>
  );
}

export default function DashboardNavbar({ onOpenSidebar }) {
  const { user } = useAuth();
  const { themeMode, onChangeMode } = useSettings();
  const isDesktop = useResponsive('up', 'lg');
  const LinkStyle = styled(Link)(({ theme }) => ({
    ...theme.typography.mainNavLink,
    color: theme.palette.text.primary,
    marginLeft: theme.spacing(3),
    textDecoration: 'none',
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shortest,
    }),
    '&:hover': {
      opacity: 0.48,
      textDecoration: 'none',
    },
  }));
  return (
    <ToolbarStyle>
      <Stack direction="row" sx={{ width: '100%', alignItems: 'center' }}>
        <RouterLink
          to="/"
          style={{ textDecoration: 'none', margin: 0, padding: 0, display: 'flex', alignItems: 'baseline' }}
        >
          <Logo sx={isDesktop ? { width: 30, height: 30 } : {}} />
          <LinkStyle sx={{ ml: 0.3, mb: 0 }} href="/">
            KITIWI
          </LinkStyle>
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" sx={{ width: '100%', alignItems: 'center' }}>
          <Box sx={{ flexGrow: 1 }} />

          {!user?.email && <LinkStyle href="/auth/register">Leaderboard</LinkStyle>}
          {!user?.email && (
            <LinkStyle href="/auth/login">
              <Button variant="contained">Sign In</Button>
            </LinkStyle>
          )}
          {user?.email && (
            <LinkStyle href="/dashboard">
              <Button variant="contained">Dashboard</Button>
            </LinkStyle>
          )}
          <Button
            size="small"
            onClick={() => onChangeMode(themeMode === 'dark' ? 'light' : 'dark')}
            sx={{
              py: 1,
              height: 40,
              width: 0,
              borderRadius: '50%',
              display: 'flex',
              color: 'text.disabled',
              justifyContent: 'center',
              ...(themeMode === 'dark' && {
                color: 'primary.main',
              }),
            }}
          >
            <Icon icon={themeMode === 'light' ? 'eva:sun-fill' : 'eva:moon-fill'} width={24} height={24} />
          </Button>
        </Stack>
      </Stack>
    </ToolbarStyle>
  );
}
