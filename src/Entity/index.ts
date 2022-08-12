import ReserveDate from "./ReserveDate";

const init = new Date();
const end = new Date(new Date().getMilliseconds() + 1000000);

const reserveDate = new ReserveDate(init, end);

console.log(reserveDate.formatDate());