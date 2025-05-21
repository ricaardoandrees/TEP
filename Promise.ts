function calcularEdad(fechaNacimiento: Date): number {
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    
    const mesActual = hoy.getMonth();
    const diaActual = hoy.getDate();
    const mesNacimiento = fechaNacimiento.getMonth();
    const diaNacimiento = fechaNacimiento.getDate();
    
    if (mesActual < mesNacimiento || (mesActual === mesNacimiento && diaActual < diaNacimiento)) {
        return edad - 1;
    }
    
    return edad;
}



function calcularEdadConPromesa(persona: { nombre: string; fecha: Date }): Promise<{ nombre: string; edad: number }> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ nombre: persona.nombre, edad: calcularEdad(persona.fecha) });
        }, Math.random() * 1000);
    });
}

function calcularEdadesConPromesas(personas: { nombre: string; fecha: Date }[]): Promise<{ nombre: string; edad: number }[]> {
    return Promise.all(personas.map(calcularEdadConPromesa));
}


calcularEdadesConPromesas([{ nombre: "Ricardo", fecha: new Date(1990, 5, 15) }])
    .then(resultado => console.log("Promesas:", resultado));
calcularEdadesConPromesas([{ nombre: "Jharold", fecha: new Date(1890, 1, 11) }])
    .then(resultado => console.log("Promesas:", resultado));
calcularEdadesConPromesas([{ nombre: "Chopsu", fecha: new Date(2000, 5, 14) }])
    .then(resultado => console.log("Promesas:", resultado));