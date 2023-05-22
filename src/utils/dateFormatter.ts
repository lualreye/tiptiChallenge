function formatDate(inputDate: string) : string {
  const date = new Date(inputDate);
  const dia = date.getDate();
  const mes = date.getMonth() + 1;
  const anio = date.getFullYear();

  return `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${anio}`;
}

export default formatDate