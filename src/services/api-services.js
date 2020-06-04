const API_ENDPOINTS = {
  newUserDoc: (lat, lon, time) => {
    return {
      method: "post",
      uri:
        "https://db5b2819.us-south.apigw.appdomain.cloud/covid-19-api/create-user-doc",
      data: {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [lon, lat],
          TimeStamp: time,
        },
      },
    };
  },
  updateUserDoc: (id, rev, lat, lon, time) => {
    return {
      method: "post",
      uri:
        "https://db5b2819.us-south.apigw.appdomain.cloud/covid-19-api/update-user-doc",
      data: {
        _id: id,
        _rev: rev,
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [lon, lat],
          TimeStamp: time,
        },
      },
    };
  },
  getNearPoints: (lat, lon, radius) => {
    return {
      method: "post",
      uri:
        "https://db5b2819.us-south.apigw.appdomain.cloud/covid-19-api/get-near-points",
      data: { lat: lat, lon: lon, radius: radius },
    };
  },
};

async function api_services(endpointName, params) {
  const ENDPOINT_OBJ = API_ENDPOINTS[endpointName](...params);

  // Default options are marked with *

  const response = await fetch(ENDPOINT_OBJ.uri, {
    method: ENDPOINT_OBJ.method, // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({ data: ENDPOINT_OBJ.data }), // body data type must match "Content-Type" header
  });
  //console.log(response.json());
  return response.json(); // parses JSON response into native JavaScript objects
}

//api_services("getNearPoints", [0, 0, 200]).then((res) => {});

export default api_services;
