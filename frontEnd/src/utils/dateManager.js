export const dateManager = (mongoDate) => {
  let modified = new Date(mongoDate);
  let hour =
    modified.getHours() > 12
      ? `${modified.getHours() % 12}:${modified.getMinutes()<10?"0"+modified.getMinutes():modified.getMinutes()}Pm`
      : `${modified.getHours()} ${modified.getMinutes()<10?"0"+modified.getMinutes():modified.getMinutes()} Am`;
  let day = modified.getDate();
  let month = modified.getMonth() + 1;
  let year = modified.getFullYear() - 2000;
  console.log(hour, day, month, year);

  return `${hour} : ${
    new Date().getDate() === day &&
    new Date().getFullYear() - 2000 === year &&
    new Date().getMonth() + 1 === month ?"Today":`${day}/${month}/${year}`
  }`;
};
