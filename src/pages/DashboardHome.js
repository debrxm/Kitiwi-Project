import { useEffect, useState } from 'react';
// @mui
// import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import { Time } from '../sections/@dashboard/home';
// redux
import { onNextLevel } from '../redux/slices/scambleWords';
import { useDispatch, useSelector } from '../redux/store';
// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

export default function DashboardHome() {
  // const theme = useTheme();
  const dispatch = useDispatch();
  const { fetchedData, gameData } = useSelector((state) => state.scambleWords);
  // console.log(gameData);
  function decodeContent(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(
      atob(str)
        .split('')
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join('')
    );
  }
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  function shuffle(arr) {
    let currIndex = arr.length;
    let tempValue;
    let randomIndex;
    while (currIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currIndex);
      currIndex -= 1;
      tempValue = arr[currIndex];
      arr[currIndex] = arr[randomIndex];
      arr[randomIndex] = tempValue;
    }
    return arr;
  }
  useEffect(() => {
    const data = JSON.parse(decodeContent(fetchedData));
    const i = getRandomNumber(0, data.length - 1);
    data[i].ques = shuffle(data[i].ques);
    data[i].userAnswers = [];
    data[i].lastword = '';
    console.log(data[i]);
    dispatch(onNextLevel(data[i]));
  }, [dispatch, fetchedData]);

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Home
        </Typography>
        <Time />
        <Grid container spacing={3}>
          <br />
        </Grid>
      </Container>
    </Page>
  );
}
