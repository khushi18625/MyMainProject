//     const map = new mapboxgl.Map({
//         container: 'map', // container ID
//         center:listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
//         zoom: 9 // starting zoom
//     });

mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "map", // container ID
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: "mapbox://styles/mapbox/standard",
  zoom: 10, // starting zoom
  center: listing.geometry.coordinates, // starting position
});
map.on("load", () => {
  // Load an image from an external URL.
  map.loadImage(
    "https://docs.mapbox.com/mapbox-gl-js/assets/cat.png",
    (error, image) => {
      if (error) throw error;

      // Add the image to the map style.
      map.addImage("cat", image);

      // Add a data source containing one point feature.
      map.addSource("point", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: listing.geometry.coordinates,
              },
            },
          ],
        },
      });

      // Add a layer to use the image to represent the data.
      map.addLayer({
        id: "points",
        type: "symbol",
        source: "point", // reference the data source
        layout: {
          "icon-image": "cat", // reference the image
          "icon-size": 0.25,
        },
      });
    }
  );
});

const marker = new mapboxgl.Marker()
  .setLngLat(listing.geometry.coordinates) //Listing.geometry.coordinate
  .setPopup(
    new mapboxgl.Popup({ offset: 25 })
      // .setLngLat(e.lngLat)
      .setHTML(
        `<h4>${listing.location}</h4><p> Exact Location Provided After Bokking</P>`
      )
  )
  .addTo(map);
