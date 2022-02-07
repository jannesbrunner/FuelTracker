export function padding(a, b, c, d) {
  return {
    paddingTop: a,
    paddingRight: b ? b : a,
    paddingBottom: c ? c : a,
    paddingLeft: d ? d : (b ? b : a)
  }
}

export function sortStationsByLocation(stations, location) {
  const toSort = Object.values(stations);
  toSort.sort((a, b) => {
    let diffLatA = location.coords.latitude - parseFloat(a.lat);
    let diffLongA = location.coords.longitude - parseFloat(a.long);
    let diffLatB = location.coords.latitude - parseFloat(b.lat);
    let diffLongB = location.coords.longitude - parseFloat(b.long);

    let sumA = Math.sqrt(Math.pow(diffLatA, 2) + Math.pow(diffLongA, 2));
    let sumB = Math.sqrt(Math.pow(diffLatB, 2) + Math.pow(diffLongB, 2));

    return sumA - sumB;
  })
  return toSort;
}

export function createLocationString(locationObj) {
  return `${locationObj.company} - ${locationObj.address}`
}

export function checkNumericInput(input) {
  let check = true;
  if(parseFloat(input) <= 0) check = false;
  if(isNaN(input) || input.length == 0) check = false;
  return check;
}

import { useEffect, useState } from 'react';

export function useScreenWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handler = (event) => {
      setWidth(event.target.innerWidth);
    };

    window.addEventListener('resize', handler);

    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);

  return { width };
}


