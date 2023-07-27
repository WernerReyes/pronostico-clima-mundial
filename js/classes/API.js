class API {

  async obtenerDatos(ciudad) {
    const idAPI = 'd633ba8b915346359b3203922232707';

    const url = `https://api.weatherapi.com/v1/current.json?key=${idAPI}&q=${ciudad}&aqi=no`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if(data.error) {
        return { encontrado: false, data: "No se encontraron registros de esa ciudad o país" };
      };
      
      return { encontrado: true, data };

    } catch(error) {
      console.log(error);
    }
  }

}

export default API;
