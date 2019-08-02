export default class Set {

  constructor(name, description, initialStation, stations=[]) {
    this.name = name;
    this.description = description;
    this.initialStation = initialStation;

    if(stations.length == 0) {
      this.stations = [initialStation];
    } else {
      this.stations = stations;
    }
  }

  add(station) {
    this.stations.push(station);
  }

  remove(index) {
    this.stations.splice(index, 1);
  }

  contains(station) {
    for(let i=0; i<this.stations.length; i++) {
      if(station.id === this.stations[i].id) {
        return true;
      }
    }
    return false;
  }
}