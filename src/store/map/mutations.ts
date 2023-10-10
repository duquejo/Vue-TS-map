import { MutationTree } from 'vuex';
import { IMapState } from './state';
import Mapboxgl from 'mapbox-gl';
import { Feature } from '../../interfaces/places';


const mutation: MutationTree<IMapState> = {
    setMap(state, map: Mapboxgl.Map) {
        state.map = map;
    },
    setPlacesMarkers(state, places: Feature[] ) {

        /**
         * Remove each marker
         */
        state.markers.forEach( marker => marker.remove() );
        state.markers = [];

        if( ! state.map ) {
            return;
        }

        /**
         * Create new markers.
         */
        for (const place of places) {
            const [lng, lat] = place.center;
            const locationPopup = new Mapboxgl.Popup()
            .setLngLat([lng, lat])
            .setHTML(`<h4>${ place.text }</h4><p>${ place.place_name }</p>`);
    
            const locationMarker = new Mapboxgl.Marker()
            .setLngLat([lng, lat])
            .addTo(state.map)
            .setPopup(locationPopup);

            state.markers.push( locationMarker );
        }

        /**
         * Clear polylines
         */
        if( state.map.getLayer('RouteString')) {
            state.map.removeLayer('RouteString');
            state.map.removeSource('RouteString');
            state.distance = undefined;
            state.duration = undefined;
        }
    },
    setRoutePolyline(state, coords: number[][] ) {
        const start = coords[0];
        const end = coords[coords.length - 1];

        /**
         * Bounds definition
         */
        const bounds = new Mapboxgl.LngLatBounds(
            [ start[0], start[1]],
            [ end[0], end[1]],
        );

        /**
         * Add each point to your bounds.
         */
        for (const coord of coords) {
            const newCoord: [number, number] = [coord[0], coord[1]];
            bounds.extend(newCoord);
        }

        state.map?.fitBounds(bounds, {
            padding: 200,
        });

        /**
         * Polyline
         */
        const sourceData: Mapboxgl.AnySourceData = {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: coords,
                        }
                    }
                ]
            }
        };

        if( state.map?.getLayer('RouteString')) {
            state.map.removeLayer('RouteString');
            state.map.removeSource('RouteString');
        }

        state.map?.addSource('RouteString', sourceData);

        state.map?.addLayer({
            id: 'RouteString', // Customizable.
            type: 'line',
            source: 'RouteString',
            layout: {
                'line-cap': 'round',
                'line-join': 'round'
            },
            paint: {
                'line-color': '#000000',
                'line-width': 3,
            },
        });
    },
    setDistanceDuration(state, { distance, duration }: { distance: number, duration: number }) {
        let kms = distance/1000;
        kms = Math.round(kms*100);
        kms /= 100;

        state.distance = kms; 
        state.duration = Math.floor(duration/60);
    },
}


export default mutation;