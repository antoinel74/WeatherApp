function saveCity(city) {
  localStorage.setItem("lastCity", city);
}

function loadCity() {
  return localStorage.getItem("lastCity");
}

export { saveCity, loadCity };
