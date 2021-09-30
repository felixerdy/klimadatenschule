const withPwa = require('next-pwa');

module.exports = withPwa({
  webpack: (config, options) => {
    config.resolve.alias['mapbox-gl'] = 'maplibre-gl';
    return config;
  },
  pwa: {
    dest: 'public'
  }
});
