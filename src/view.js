import {
  QueryWetherData,
  getWeatherData,
  QueryGiphyData,
  getImagesData,
  toFarienheit,
  toCelcius,
} from './api';
import './style.css';

const generateForm = () => {
  const content = document.getElementById('content');
  const form = document.createElement('form');
  const input = document.createElement('input');
  const submitBtn = document.createElement('input');
  const imageContainer = document.createElement('div');
  imageContainer.classList.add('align');
  imageContainer.id = 'img-con';
  submitBtn.setAttribute('type', 'submit');
  submitBtn.value = 'Get';
  input.placeholder = 'Location...';
  input.id = 'loc';
  form.setAttribute('onsubmit', 'return false');
  let flag = true;
  submitBtn.addEventListener('click', async () => {
    const con = document.getElementById('img-con');
    const location = document.getElementById('loc').value;
    con.innerHTML = '';
    const apiData = await QueryWetherData(location);
    const temp = getWeatherData(apiData);
    const currentTemp = temp.temp - 273;
    const tempSpan = document.createElement('p');
    tempSpan.classList.add('align');
    tempSpan.classList.add('temp-text');
    const state = currentTemp < 20 ? 'cold' : 'hot';
    const imgData = await QueryGiphyData(state);
    const imgUrl = getImagesData(imgData);
    tempSpan.innerHTML = `${currentTemp}&#8451;`;
    const img = document.createElement('img');
    img.height = 300;
    img.width = 300;
    img.src = imgUrl.url;
    const cBtn = document.createElement('button');
    cBtn.id = 'cBtn';
    cBtn.classList.add('temp-btn');
    cBtn.addEventListener('click', () => {
      if (flag) {
        flag = false;
        tempSpan.innerHTML = `${toFarienheit(currentTemp)}&#8457;`;
        cBtn.innerHTML = '&#8451;';
        tempSpan.appendChild(cBtn);
      } else {
        flag = true;
        cBtn.innerHTML = '&#8457;';
        tempSpan.innerHTML = `${currentTemp}&#8451;`;
        tempSpan.appendChild(cBtn);
      }
    });
    cBtn.innerHTML = '&#8457;';
    tempSpan.appendChild(cBtn);
    con.appendChild(tempSpan);
    con.appendChild(img);
  });
  form.appendChild(input);
  form.appendChild(submitBtn);
  content.appendChild(form);
  content.appendChild(imageContainer);
};

export {
  generateForm,
};
