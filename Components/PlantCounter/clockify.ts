import React from "react";

export const clockify = (secondsLeft: number) => {
  let hours = Math.floor(secondsLeft / 60 / 60);
  let mins = Math.floor((secondsLeft / 60) % 60);
  let seconds = Math.floor(secondsLeft % 60);
  let displayHours = hours < 10 ? `0${hours}` : hours;
  let displayMins = mins < 10 ? `0${mins}` : mins;
  let displaySecs = seconds < 10 ? `0${seconds}` : seconds;
  return {
    displayHours,
    displayMins,
    displaySecs,
  };
};

export const clockifyPlant = (SecondsPlant: number) => {
  let hours = Math.floor(SecondsPlant / 60 / 60);
  let mins = Math.floor((SecondsPlant / 60) % 60);
  let seconds = Math.floor(SecondsPlant % 60);
  let displayHours = hours < 10 ? `0${hours}` : hours;
  let displayMins = mins < 10 ? `0${mins}` : mins;
  let displaySecs = seconds < 10 ? `0${seconds}` : seconds;
  return {
    displayHours,
    displayMins,
    displaySecs,
  };
};
