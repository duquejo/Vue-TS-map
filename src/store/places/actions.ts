import { ActionTree } from 'vuex';
import { IPlacesState } from './state';
import { StateInterface } from '../index';
import { searchApi } from '@/api';
import { PlacesResponse } from '@/interfaces/places';
import { Feature } from '../../interfaces/places';


const actions: ActionTree<IPlacesState, StateInterface> = {
    getInitialLocation({ commit }) {
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => commit('setLngLat', { lng: coords.longitude, lat: coords.latitude }),
            ( err ) => {
                console.error(err);
                throw new Error('Geolocation not found.');
            },
        );
    },
    async searchPlacesByTerm({ commit, state }, query: string ): Promise<Feature[]> {
        if( query.length === 0 ) {
            commit('setPlaces', []);
            return [];
        }

        if( ! state.userLocation ) {
            throw new Error('Geolocation not found.');
        }

        commit('setIsLoadingPlaces');
        const response = await searchApi.get<PlacesResponse>(`/${query}.json`, {
            params: {
                proximity: state.userLocation?.join(','),
            },
        });
        commit('setPlaces', response.data.features);
        return response.data.features;
    }
};



export default actions;