// material
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
// hooks
import useCountdown from '../../../hooks/useCountdown';

// Styled
const CountdownStyle = styled('div')({
  display: 'flex',
  justifyContent: 'center',
});
const SeparatorStyle = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  [theme.breakpoints.up('sm')]: {
    margin: theme.spacing(0, 2.5),
  },
}));
// ---------------------------------

const Time = () => {
  const countdown = useCountdown(new Date('06/06/2022 24:00'));
  return (
    <CountdownStyle>
      <Box>
        <Typography variant="caption">{countdown.hours}</Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          Hours
        </Typography>
      </Box>

      <SeparatorStyle variant="caption">:</SeparatorStyle>

      <Box>
        <Typography variant="caption">{countdown.minutes}</Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          Minutes
        </Typography>
      </Box>

      <SeparatorStyle variant="caption">:</SeparatorStyle>

      <Box>
        <Typography variant="caption">{countdown.seconds}</Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          Seconds
        </Typography>
      </Box>
    </CountdownStyle>
  );
};
export default Time;
