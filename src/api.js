
async function getUrl(url) {
  const apiData = await fetch(url, { mode: 'cors' }).then((data) => data.json());
  return apiData;
}

const getWeatherData = (data) => {
  const { main: { temp } } = data;
  return { temp };
};

const getImagesData = (data) => {
  const { data: { images } } = data;
  return images.downsized_large;
};

async function QueryWetherData(location) {
  const key = 'c9d3e08c21247de4a65d75f77fbf5223';
  const weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?';
  if (location) {
    const fullUrl = `${weatherUrl}q=${location}&APPID=${key}`;
    const data = await getUrl(fullUrl);
    return data;
  }
}

async function QueryGiphyData(state) {
  const key = '1YkfvdVZ56eGwBGwpnjd9Xc5Gq5hwTZP';
  const url = `https://api.giphy.com/v1/gifs/translate?api_key=${key}&s=${state}`;
  const data = await getUrl(url);
  return data;
}

const toFarienheit = (celcius) => {
  const temp = (celcius * 9) / 5;
  return temp + 32;
};

const toCelcius = (farienheit) => {
  const temp = (32 * farienheit) - 32;
  return (temp * 5) / 9;
};

export {
  QueryWetherData,
  getWeatherData,
  QueryGiphyData,
  getImagesData,
  toFarienheit,
  toCelcius,
};
