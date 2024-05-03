self.onmessage = function (event) {
  const { latitude, longitude } = event.data;
  fetchLocation(latitude, longitude);
};

function fetchLocation(latitude, longitude) {
  fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=pt`,
  )
    .then((response) => response.json())
    .then((data) => {
      const street = data.principalSubdivision;
      const city = data.city;
      self.postMessage({ street, city });
    })
    .catch((error) => {
      console.error("Erro ao obter a localização:", error);
      self.postMessage({ error: "Erro ao obter a localização" });
    });
}
