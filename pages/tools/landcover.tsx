import React, { useState } from 'react';
import Layout from '../../components/Layout';
import ReactMapGL from 'react-map-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const Landcover: React.FC = () => {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: 780,
    latitude: 52,
    longitude: 9,
    zoom: 5
  });

  return (
    <Layout>
      <div className="page">
        <h1 className="text-gray-800 text-4xl font-extrabold">
          Flächennutzung
        </h1>
        <h3 className="text-gray-800">
          © Bundesamt für Kartographie und Geodäsie 2021
        </h3>
        <main className="mt-12">
          <div className="flex flex-wrap">
            <div className="flex-grow sm:mr-4 shadow overflow-scroll sm:overflow-auto border-b border-gray-200 rounded-lg">
              <ReactMapGL
                {...viewport}
                onViewportChange={nextViewport => setViewport(nextViewport)}
                mapStyle={{
                  version: 8,
                  metadata: {
                    'mapbox:autocomposite': true,
                    'mapbox:type': 'template'
                  },
                  sources: {
                    'raster-tiles': {
                      type: 'raster',
                      tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
                      tileSize: 256
                    },
                    landcover: {
                      type: 'raster',
                      // use the tiles option to specify a WMS tile source URL
                      // https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/
                      tiles: [
                        'https://sgx.geodatenzentrum.de/wms_clc5_2018?service=WMS&version=1.3.0&crs=epsg:3857&request=GetMap&format=image/png&styles=&bbox={bbox-epsg-3857}&srs=EPSG:3857&transparent=true&width=256&height=256&&layers=clc5'
                      ],
                      tileSize: 256
                    }
                  },
                  layers: [
                    {
                      id: 'simple-tiles',
                      type: 'raster',
                      source: 'raster-tiles',
                      minzoom: 0,
                      maxzoom: 22
                    },
                    {
                      id: 'landcover',
                      type: 'raster',
                      source: 'landcover',
                      paint: { 'raster-opacity': 0.75 }
                    }
                  ]
                }}
              />
            </div>
            <img
              className="flex-initial"
              src="https://sgx.geodatenzentrum.de/wms_clc5_2018?styles=&layer=clc5&service=WMS&format=image/png&sld_version=1.1.0&request=GetLegendGraphic&version=1.1.1&"
            ></img>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Landcover;
