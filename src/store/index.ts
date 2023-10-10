import { createStore } from 'vuex';

// My custom modules
import placesModule from './places';
import { IPlacesState } from './places/state';
import mapModule from './map';
import { IMapState } from './map/state';


export interface StateInterface {
  places: IPlacesState,
  map: IMapState,
}

export default createStore<StateInterface>({
  modules: {
    places: placesModule,
    map: mapModule,
  }
});