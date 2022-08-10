/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-plusplus */
import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import ReactCountdownClock from 'react-countdown-clock';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Box } from '@mui/material';
import { Time } from '../sections/@dashboard/home';
// redux
import {
  onNextLevel,
  onLetterUp,
  onLetterDown,
  onLastWord,
  onValidWord,
  onArrayCleanUpDropArea,
  onUpdateScore,
  onPauseGame,
} from '../redux/slices/scambleWords';
import { useDispatch, useSelector } from '../redux/store';
// components
import { MFab } from '../components/@material-extend';
import Page from '../components/Page';

// ----------------------------------------------------------------------

export default function DashboardHome() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { fetchedData, dropArea, gameData } = useSelector((state) => state.scambleWords);
  console.log(gameData);
  function decodeContent(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(
      atob(str)
        .split('')
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join('')
    );
  }
  function dropAreaData(n) {
    return dropArea.length ? dropArea[n - 1] : '';
  }
  function letterUp(e, val) {
    e.stopPropagation();
    if (dropArea.indexOf(val) > -1) return false;

    const currElem = e.currentTarget;
    letterAction(currElem, 'letterUp', val);
  }
  function letterDown(e, val) {
    if (!val) return false;
    e.stopPropagation();

    const currElem = e.currentTarget;

    letterAction(currElem, 'letterDown', val);
  }
  function letterAction(currElem, type, data) {
    if (type === 'letterUp') {
      if (dropArea.indexOf(data) > -1) return false;
    }

    if (!data.trim()) return false;
    if (currElem.classList.contains('animating')) return false;

    // clone element
    const cloneLI = currElem.cloneNode(true);
    cloneLI.style.top = type === 'letterUp' ? '200px' : '50px';
    const clonersElem = document.querySelector('#cloners');
    clonersElem.appendChild(cloneLI);

    currElem.classList.add('animating');
    currElem.classList.add('inactive');

    let i;
    let letterElem;
    let liStyles;
    if (type === 'letterUp') {
      if (dropArea.indexOf('') !== -1) {
        i = dropArea.indexOf('') + 1;
        // console.log('==>', i);
      } else {
        i = dropArea.length + 1;
      }
      letterElem = document.querySelector(`#drop-area li:nth-child(${i})`);
      letterElem.classList.add('animating');
      liStyles = window.getComputedStyle(letterElem);
    } else {
      i = gameData.c.ques.indexOf(data) + 1;
      letterElem = document.querySelector(`#q-area li:nth-child(${i})`);
      letterElem.classList.add('animating');
      liStyles = window.getComputedStyle(letterElem);
    }

    // $store.dispatch(type, { value: data });

    // const $this = this;
    // Velocity(
    //   cloneLI,
    //   {
    //     top: liStyles.top,
    //     left: liStyles.left,
    //   },
    //   {
    //     duration: 150,
    //     complete(elements) {
    //       // $$store.dispatch(type, {value:data});

    //       clonersElem.removeChild(elements[0]);
    //       currElem.classList.remove('animating');

    //       letterElem.classList.remove('animating');
    //       letterElem.classList.remove('inactive');

    //       $arrayCleanUp();
    //     },
    //   }
    // );
  }
  function submitAction() {
    const word = dropArea.join('');
    if (!word) return false;
    const i = gameData.c.opt.indexOf(word);
    const isAlreadyFound = gameData.c.userAnswers.indexOf(word);
    if (i !== -1 && isAlreadyFound === -1) {
      dispatch(onValidWord({ value: word }));
      dispatch(onLastWord({ value: word }));
      for (let j = 0; j < dropArea.length; j++) {
        // this.$emit(
        //   "bringDownAll",
        //   document.querySelector(`#drop-area li:nth-child(${  j + 1  })`),
        //   "letterDown",
        //   dropArea[j]
        // );
      }

      dispatch(onUpdateScore(100 * (dropArea.length + 1)));
    } else {
      if (isAlreadyFound !== -1) {
        // this.$emit('setError', error.exist);
      } else {
        // this.$emit('setError', error.invalid);
      }
      clearAction();
    }
  }
  function clearAction() {
    const ln = dropArea.length;
    if (!ln) return false;
    for (let i = 0; i < ln; i++) {
      if (!dropArea[i]) return;
      letterAction(document.querySelector(`#drop-area li:nth-child(${i + 1})`), 'letterDown', dropArea[i]);
    }
  }
  function arrayCleanUp() {
    if (!dropArea.length) return false;
    if (dropArea[dropArea.length - 1] === '') {
      // $store.dispatch("arrayCleanUpDropArea");
      arrayCleanUp();
    }
  }
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function shuffleQuestion() {
    const q = gameData.c.ques;
    let arr = q.slice();
    arr = shuffle(arr);
    const li = document.querySelectorAll('#q-area li');
  }

  function shuffle(arr) {
    console.log(arr);
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
    dispatch(onNextLevel(data[i]));
  }, [dispatch, fetchedData]);

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <div id="gameApp">
          <div className="game-container">
            {/* <ul id="drop-area">
              {gameData.c?.ques.map((item, index) => (
                <li
                  key={index - 1}
                  className="inactive"
                  index={index}
                  data={dropAreaData(index)}
                  data-id={dropArea[index - 1]}
                  onClick={(e) => letterDown(e, dropArea[index - 1])}
                >
                  {dropAreaData(index)}
                </li>
              ))}
            </ul> */}
            <ul id="cloners">{/*  */}</ul>
            <ul id="q-area">
              {gameData.c?.ques.map((item, index) => (
                <li
                  key={index - 1}
                  index={index}
                  className="game-button"
                  data={dropAreaData(index)}
                  data-id={item}
                  onClick={(e) => letterDown(e, item)}
                >
                  <Typography variant="h3">{item}</Typography>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Box>
            <MFab
              onClick={(e) => clearAction()}
              variant="extended"
              size="small"
              className="game-button red"
              color="default"
              sx={{ m: 2 }}
            >
              {/* <Icon icon="ic:round-clear-all" width={22} /> */}
              clear
            </MFab>
            <MFab
              onClick={(e) => {}}
              variant="extended"
              size="small"
              className="game-button green"
              color="default"
              sx={{ m: 2 }}
            >
              Submit
            </MFab>
            <MFab
              onClick={(e) => shuffleQuestion()}
              className="game-button blue"
              variant="extended"
              size="small"
              color="default"
              sx={{ m: 2 }}
            >
              {/* <Icon icon="material-symbols:shuffle-outline-rounded" width={22} /> */}
              shuffle
            </MFab>
          </Box>
          <br />
          <ReactCountdownClock
            seconds={60}
            color={theme.palette.primary.main}
            alpha={0.9}
            size={50}
            weight={10}
            onComplete={() => console.log('Finished')}
          />
        </Box>

        {/* <Time /> */}
        <Grid container spacing={3}>
          <br />
        </Grid>
      </Container>
    </Page>
  );
}
