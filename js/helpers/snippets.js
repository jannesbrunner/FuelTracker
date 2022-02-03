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
    toSort.sort( (a, b) => {
        let diffLatA =  location.coords.latitude - parseFloat(a.lat);
        let diffLongA = location.coords.longitude - parseFloat(a.long);
        let diffLatB = location.coords.latitude - parseFloat(b.lat);
        let diffLongB = location.coords.longitude - parseFloat(b.long);

        let sumA = Math.sqrt(Math.pow(diffLatA, 2) + Math.pow(diffLongA, 2));
        let sumB = Math.sqrt(Math.pow(diffLatB, 2) + Math.pow(diffLongB, 2));
        
        return sumA - sumB;
    })
    return toSort;
}
  