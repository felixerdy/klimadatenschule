module.exports = {
  webpack: (config, options) => {
    config.resolve.alias['mapbox-gl'] = 'maplibre-gl';
    return config;
  },
  future: {
    webpack5: true
  }
};
