function calcularEdad(fechaNacimiento: Date): number {
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    
    // Ajuste si la persona aún no ha cumplido años en este año
    const mesActual = hoy.getMonth();
    const diaActual = hoy.getDate();
    const mesNacimiento = fechaNacimiento.getMonth();
    const diaNacimiento = fechaNacimiento.getDate();
    
    if (mesActual < mesNacimiento || (mesActual === mesNacimiento && diaActual < diaNacimiento)) {
        return edad - 1;
    }
    
    return edad;
}
function calcularEdadConPromesa(persona: { nombre: string; fechaNacimiento: Date }): Promise<{ nombre: string; edad: number }> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ nombre: persona.nombre, edad: calcularEdad(persona.fechaNacimiento) });
        }, Math.random() * 1000);
    });
}

function calcularEdadesConPromesas(personas: { nombre: string; fechaNacimiento: Date }[]): Promise<{ nombre: string; edad: number }[]> {
    return Promise.all(personas.map(calcularEdadConPromesa));
}

async function calcularEdadesConAsyncAwait(personas: { nombre: string; fechaNacimiento: Date }[]): Promise<{ nombre: string; edad: number }[]> {
    return await calcularEdadesConPromesas(personas);
}

(async () => {
    const resultado = await calcularEdadesConAsyncAwait([{ nombre: "Ricardo", fechaNacimiento: new Date(1998, 7, 15) }]);
    console.log("Async/Await:", resultado);
})();
(async () => {
    const resultado = await calcularEdadesConAsyncAwait([{ nombre: "Oscar", fechaNacimiento: new Date(2004, 9, 5) }]);
    console.log("Async/Await:", resultado);
})();