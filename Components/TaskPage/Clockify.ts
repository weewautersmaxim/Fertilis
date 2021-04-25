const clockify = (timer: any) => {
  if (timer != 0) {
    let time = timer * 60;
    let hours = Math.floor(time / 60 / 60);
    let mins = Math.floor((time / 60) % 60);
    let seconds = Math.floor(time % 60);
    let displayHours = hours < 10 ? `0${hours}` : hours;
    let displayMins = mins < 10 ? `0${mins}` : mins;
    let displaySecs = seconds < 10 ? `0${seconds}` : seconds;
    return {
      displayHours,
      displayMins,
      displaySecs,
    };
  }
};

export const clock = (timer: any) => {
  let time = "";
  if (timer != 0) {
    time =
      clockify(timer)!.displayHours +
      ":" +
      clockify(timer)!.displayMins +
      ":" +
      clockify(timer)!.displaySecs;
  }
  return time;
};
