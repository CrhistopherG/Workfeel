
export const IndicacionesEsca = () => {
    return (
        <div className="bg-gray-100 p-4 rounded-md shadow-md mb-6">
            <p className="text-gray-600 text-center">
                Indicacionces: En este modulo podras agreagar, editar y eliminar
                elementos de la escala que sera utilizada en el proceso de evaluacion.
                El valor asignado a cada escala de evaluacion es el que es considerado para el
                calculo de los estadisticos finales. Los valores deberan de ser mayor a 0 .
                Todas las preguntas que hayana sido seleccionadas con esta opcion
                no seran consideradas en los estadistico.
            </p>
        </div>
    )
}
