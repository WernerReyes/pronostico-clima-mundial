class Funciones {

    actualizarHora(divHora) {
        const fechaActual = new Date();
        const hora = fechaActual.getHours();
        const minutos = fechaActual.getMinutes();
        const segundos = fechaActual.getSeconds();
      
        // Formatea la hora para asegurarse de que siempre tenga 2 dígitos (por ejemplo, 09:04:12)
        const horaFormateada = hora.toString().padStart(2, '0');
        const minutosFormateados = minutos.toString().padStart(2, '0');
        const segundosFormateados = segundos.toString().padStart(2, '0');

        // Actualiza el contenido del div con la hora actual
        divHora.textContent = `${horaFormateada}:${minutosFormateados}:${segundosFormateados} ${(Number(horaFormateada) >= 12)  ? 'PM' : 'AM'}`;
      }

      celsiusToFahrenheit(temp, tipo) {
        return (tipo === 'F') ? Number(temp)*1.8+32 : (Number(temp)-32)/1.8;
      }

    
      
}

export default Funciones;