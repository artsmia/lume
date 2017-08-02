if(typeof require !== "undefined") var L = require('leaflet')

L.MuseumTileLayer = L.TileLayer.extend({
  options: {
    crs: L.CRS.Simple,
    infinite: false,
    noWrap: true,
    attributionControl: false,
    detectRetina: true,
    edgeBufferTiles: 1,
  },

  initialize: function(url, options) {
    console.log(url, options)
    this.options.crs.wrapLat = this.options.crs.wrapLng =  null
    L.TileLayer.prototype.initialize.call(this, url, options)

    this._adjustForRetina = this.options.detectRetina && L.Browser.retina
    this._computeImageAndGridSize()
    this.on('tileload', this._adjustNonSquareTile)
  },

  _computeImageAndGridSize: function () { // thanks https://github.com/turban/Leaflet.Zoomify
    var options = this.options,
      imageSize = L.point(options.width, options.height),
      tileSize = options.tileSize || 256

    if(this._adjustForRetina) tileSize = tileSize*2 // Don't build the grid off half-sized retina tiles

    this._imageSize = [imageSize];
    this._gridSize = [this._getGridSize(imageSize)];

    while (parseInt(imageSize.x) > tileSize || parseInt(imageSize.y) > tileSize) {
      imageSize = imageSize.divideBy(2).floor();
      this._imageSize.push(imageSize);
      this._gridSize.push(this._getGridSize(imageSize));
    }

    this._imageSize.reverse();
    this._gridSize.reverse();

    this.options.maxNativeZoom = this._gridSize.length - 1
    this.options.maxZoom = this.options.maxNativeZoom - this.options.zoomOffset;
  },

  _getGridSize: function (imageSize) {
    var tileSize = this.options.tileSize;
    return L.point(Math.ceil(imageSize.x / tileSize), Math.ceil(imageSize.y / tileSize));
  },

  _adjustNonSquareTile: function (data) {
    var tile = data.tile
      , pad = 1
      , tileSize = L.point(tile.naturalWidth, tile.naturalHeight)

    if(this._adjustForRetina) tileSize = tileSize.divideBy(2)

    tile.style.width = tileSize.x + pad + 'px'
    tile.style.height = tileSize.y + pad + 'px'
  },

  _isValidTile: function(coords) {
    return (coords.x == 0 && coords.y == 0 && coords.z == 0) ||
      coords.x >= 0 && coords.y >= 0 && coords.z > 0 && coords.z &&
      L.TileLayer.prototype._isValidTile.call(this, coords)
  },

  onAdd: function (map) {
    var self = this
    this.adjustAttribution()
    map.options.maxBoundsViscosity = 0.8

    L.TileLayer.prototype.onAdd.call(this, map);
    this.fitImage()

    map.on('resize', self._mapResized.bind(self))
  },

  _getImageBounds: function () {
    var map = this._map
      , options = this.options
      , imageSize = L.point(options.width, options.height)
      , zoom = map.getMaxZoom()+this.options.zoomOffset
      , nw = map.unproject([0, 0], zoom)

    var se = map.unproject(imageSize, zoom)

    return L.latLngBounds(nw, se)
  },

  fitImage: function () {
    var map = this._map
      , bounds = this._getImageBounds()

    this.options.bounds = bounds // used by `GridLayer.js#_isValidTile`
    map.setMaxBounds(bounds)

    this.fitBoundsExactly()
  },

  // Determine the minimum zoom to fit the entire image exactly into
  // the container. Set that as the minZoom of the map.
  //
  // If the image is 'wider' than its container, its zoom is set based on the
  // ratio of image width to container width. For 'taller' images, height
  // is compared. 'Wide' and 'tall' refer to the aspect ratio of the image and
  // container, `width/height`.
  //
  // Two zooms are computed: 'fit' and 'fill'. Fit is the default, it fits an
  // entire image into the available container. Fill fills the container with a
  // zoomed portion of the image. These two zooms are stored in `this.options.zooms`
  fitBoundsExactly: function() {
    var i, c
      , imageSize = i = this._imageSize[this._imageSize.length-1]
      , map = this._map
      , containerSize = c =  map.getSize()

    var iAR, cAR
      , imageAspectRatio = iAR = imageSize.x/imageSize.y
      , containerAspectRatio = cAR = containerSize.x/containerSize.y
      , imageDimensions = ['container is', cAR <= 1, 'image is', iAR <= 1].join(' ').replace(/true/g, 'tall').replace(/false/g, 'wide')
      , zooms = this.options.zooms = iAR < cAR ?
          {fit: c.y/i.y, fill: c.x/i.x} :
          {fit: c.x/i.x, fill: c.y/i.y}

    var zoom = map.getScaleZoom(zooms.fit, map.getMaxZoom()+this.options.zoomOffset)
    this.options.minZoom = Math.min(map.getMaxZoom(), zoom)
    map._addZoomLimit(this)
    var fill = map.getScaleZoom(zooms.fill, map.getMaxZoom())
    if(map.getZoom() < fill) map.setZoom(zoom)
  },

  fillContainer: function() {
    var map = this._map

    map.setZoom(map.getScaleZoom(this.options.zooms.fill, map.getMaxZoom()))
  },

  // Remove the 'Leaflet' attribution from the map.
  // With no `attribution` option, remove `attributionControl` all together.
  adjustAttribution: function() {
    L.Control.Attribution.prototype.options.prefix = false

    if(!this.options.attribution) {
      this._map.options.attributionControl = false
      this._map.attributionControl.remove()
    }
  },

  _mapResized: function() {
    var self = this
    clearTimeout(self._throttleResize)
    self._throttleResize = setTimeout(L.bind(self.fitBoundsExactly, self), 100)
  },
})

L.museumTileLayer = function (url, options) {
  return new L.MuseumTileLayer(url, options);
};

// https://github.com/TolonUK/Leaflet.EdgeBuffer
var unbufferedGetTiledPixelBounds = L.GridLayer.prototype._getTiledPixelBounds
L.GridLayer.include({
  _getTiledPixelBounds: function(center, zoom, tileZoom) {
    var pixelBounds = unbufferedGetTiledPixelBounds.call(this, center, zoom, tileZoom)

    if (this.options.edgeBufferTiles > 0) {
      var pixelEdgeBuffer = this.options.edgeBufferTiles * this._tileSize.x
      pixelBounds = new L.Bounds(pixelBounds.min.subtract([pixelEdgeBuffer, pixelEdgeBuffer]), pixelBounds.max.add([pixelEdgeBuffer, pixelEdgeBuffer]))
    }

    return pixelBounds;
  }
})

if(typeof module !== "undefined" && typeof require !== "undefined") {
  module.exports = L
}
