class API {
  async obtenerDatos(ciudad) {
    const idAPI = "8776168e08bf566a531c031952f103a2"; // Reemplaza con tu clave de acceso

    const url = `http://api.weatherstack.com/current?access_key=${idAPI}&query=${encodeURIComponent(ciudad)}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      console.log(data);

      if (data.error) {
        if (data.error.code === 105) {
          return { encontrado: false, data: "API fuera de servicio" };
        }

        return {
          encontrado: false,
          data: "No se encontraron registros de esa ciudad o país",
        };
      }
      return { encontrado: true, data };
    } catch (error) {
      console.error("Error al obtener el pronóstico del tiempo:", error);
    }
  }
}

export default API;
