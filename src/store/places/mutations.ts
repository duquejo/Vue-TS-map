import { MutationTree } from 'vuex';
import { IPlacesState } from './state';
import { Feature } from '../../interfaces/places';



const mutation: MutationTree<IPlacesState> = {
    setLngLat(state: IPlacesState, { lng, lat }: { lng: number, lat: number } ) {
        state.userLocation = [lng, lat];
        state.isLoading = false;
    },
    setPlaces(state, places: Feature[]) {
        state.places = places;
        state.isLoadingPlaces = false;
    },
    setIsLoadingPlaces( state ) {
        state.isLoadingPlaces = true;
    }
}


export default mutation;