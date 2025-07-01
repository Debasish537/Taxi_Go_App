import * as React from 'react';
import { Layer, Source } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

function MapBoxRoute({ coordinates }: { coordinates: number[][] }) {
  return (
    <div>
      <Source
        type='geojson'
        data={{
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: coordinates,
          },
          properties: {},
        }}
      >
        <Layer
          type='line'
          layout={{ 'line-join': 'round', 'line-cap': 'round' }}
          paint={{ 'line-color': '#1e90ff', 'line-width': 5 }}
        />
      </Source>
    </div>
  );
}

export default MapBoxRoute;





// 'use client'

// import * as React from 'react'
// import Map, { Layer, Source } from 'react-map-gl/mapbox'
// import 'mapbox-gl/dist/mapbox-gl.css'
// import type { Feature, LineString } from 'geojson' // ✅ Import proper GeoJSON types

// // ✅ Define the style for the route line
// const routeLayer: any = {
//   id: 'route-line',
//   type: 'line',
//   source: 'route',
//   layout: {
//     'line-join': 'round',
//     'line-cap': 'round',
//   },
//   paint: {
//     'line-color': '#3b82f6',
//     'line-width': 5,
//   },
// }

// function MapBoxRoute({ coordinates }: { coordinates: number[][] }) {
//   if (!coordinates || coordinates.length < 2) return null

//   // ✅ Correctly typed GeoJSON feature
//   const geojson: Feature<LineString> = {
//     type: 'Feature',
//     geometry: {
//       type: 'LineString',
//       coordinates,
//     },
//     properties: {}, // required
//   }

//   return (
//     <div> {/* ✅ Preserved your original structure */}
//       <Source id="route" type="geojson" data={geojson}>
//         <Layer {...routeLayer} />
//       </Source>
//     </div>
//   )
// }

// export default MapBoxRoute

