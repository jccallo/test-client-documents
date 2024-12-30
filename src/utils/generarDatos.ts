export const generarClienteAleatorio = () => {
  const nombresFicticios = [
    'Juan', 'Ana', 'Pedro', 'María', 'Carlos', 'Lucía', 'Sofía', 'Javier', 'Luis', 'Marta',
    'Luis', 'Antonio', 'Elena', 'Victoria', 'Miguel', 'Beatriz', 'Raúl', 'Clara', 'Héctor', 'Paula',
    'Alberto', 'Esteban', 'Isabel', 'David', 'Carmen', 'José', 'Felipe', 'Sara', 'Alejandro', 'Francisco'
  ];

  const apellidosFicticios = [
    'García', 'Pérez', 'Rodríguez', 'Martínez', 'López', 'Sánchez', 'González', 'Díaz', 'Hernández',
    'Fernández', 'Jiménez', 'Gutiérrez', 'Álvarez', 'Moreno', 'Romero', 'Vázquez', 'Torres', 'Ramos',
    'Navarro', 'Gil', 'Ruiz', 'Muñoz', 'Castro', 'Luna', 'Pascual', 'Serrano', 'Molina', 'Morales',
    'López', 'Cabrera', 'Delgado', 'Soto', 'Suárez'
  ];

  // Generar un número de documento aleatorio (simulando que tiene 8 caracteres alfanuméricos)
  const generarNumeroDocumento = () => Math.floor(10000000 + Math.random() * 90000000).toString();

  // Generar un correo aleatorio basado en nombre y apellido
  const generarCorreo = (nombre: string, apellido: string) => `${nombre.toLowerCase()}.${apellido.toLowerCase()}@example.com`;

  // Seleccionar nombre y apellido aleatorio
  const nombre = nombresFicticios[Math.floor(Math.random() * nombresFicticios.length)];
  const apellido = apellidosFicticios[Math.floor(Math.random() * apellidosFicticios.length)];
  const correo = generarCorreo(nombre, apellido);
  const nroDocumento = generarNumeroDocumento();

  // Crear el objeto con los datos aleatorios
  return {
    nombres: nombre,
    apellidos: apellido,
    correo: correo,
    nroDocumento: nroDocumento
  };
}

export const generarNumeroDocumentoUnico = (): string => {
  const timestamp = Date.now().toString(36).slice(-4) // Últimos 4 caracteres del timestamp en base 36
  const randomPart = Math.random().toString(36).substring(2, 6) // 4 caracteres aleatorios
  return (timestamp + randomPart).toUpperCase() // Combina y convierte en mayúsculas
}

// Función para generar un nombre de documento aleatorio con categorías variadas
export const generarDocumentoAleatorio = () => {
  // Categorías o tipos de documentos
  const categorias = [
    'Informe Anual', 'Cuentas de Resultados', 'Word de Finanzas',
    'Presupuesto 2024', 'Plan de Marketing', 'Reporte de Ventas',
    'Estrategia Comercial', 'Resumen Ejecutivo', 'Análisis de Mercado',
    'Cuentas por Cobrar', 'Balance General', 'Contratos',
    'Documentos Legales', 'Propuesta Comercial', 'Informe de Auditoría',
    'Presupuesto de Ingresos', 'Estudio de Viabilidad', 'Propuesta de Proyecto',
    'Evaluación de Desempeño', 'Plan de Acción', 'Informe Técnico',
    'Análisis Financiero', 'Informe de Sostenibilidad', 'Memoria Anual',
    'Acta de Reunión', 'Documentos de Contratación', 'Calendario Fiscal'
  ];

  // Obtener una categoría aleatoria
  const categoria = categorias[Math.floor(Math.random() * categorias.length)];

  // Crear el nombre del documento
  const nombreDocumento = `${categoria}`;

  return {
    codigo: generarNumeroDocumentoUnico(),
    descripcion: nombreDocumento,
  };
};

