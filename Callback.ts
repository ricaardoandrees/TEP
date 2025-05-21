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

function calcularEdadesConCallback(personas: { nombre: string; fechaNacimiento: Date }[], callback: (resultado: { nombre: string; edad: number }[]) => void): void {
    const resultados: { nombre: string; edad: number }[] = [];
    
    personas.forEach((persona, index) => {
        setTimeout(() => {
            resultados.push({ nombre: persona.nombre, edad: calcularEdad(persona.fechaNacimiento) });
            
            // Cuando todos los cálculos han terminado, ejecutamos el callback
            if (resultados.length === personas.length) {
                callback(resultados);
            }
        }, Math.random() * 1000); // Simulación de retraso
    });
}

// Uso:
calcularEdadesConCallback([{ nombre: "Ricardo", fechaNacimiento: new Date(1780, 3, 5) }], resultado => {
    console.log("Callback:", resultado);
});
calcularEdadesConCallback([{ nombre: "Ramon", fechaNacimiento: new Date(2007, 5, 23) }], resultado => {
    console.log("Callback:", resultado);
});