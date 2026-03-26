function enviarReserva() {
    let nombre = document.getElementById("nombredelusuario").value;
    let apellido = document.getElementById("apellidodelusuario").value;
    let email = document.getElementById("emaildelusuario").value;
    let telefono = document.getElementById("telef").value;
    let personas = document.getElementById("personas").value;
    let fecha = document.getElementById("fecha").value;
    let hora = document.getElementById("hora").value;
    let mensaje = document.getElementById("mensaje").value;

    let ubicacion = "No seleccionada";
    if (document.getElementById("afuera").checked) {
        ubicacion = "Afuera";
    } else if (document.getElementById("adentro").checked) {
        ubicacion = "Adentro";
    }

    
    document.body.innerHTML +=
        "Reserva enviada:" +
        "Nombre: " + nombre + " " + apellido +
        "Email: " + email +  
        "Teléfono: " + telefono +
        "Personas: " + personas + 
        "Ubicación: " + ubicacion + 
        "Fecha: " + fecha + 
        "Hora: " + hora + 
        "Mensaje: " + mensaje;
}