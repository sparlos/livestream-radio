export default class Set {

  constructor(name, description, initialStation) {
    this.name = name;
    this.description = description;
    this.initialStation = initialStation;
    this.stations = [initialStation];
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