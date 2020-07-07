const date = new Date();

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Okt",
  "Nov",
  "Dec",
];

function render() {
  document.querySelector(".date h1").textContent = months[date.getMonth()];

  document.querySelector(".date p").textContent = new Date().toDateString();
  const days = document.querySelector(".days");
  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
  const lastDaylastmonth = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();
  let dayscont = "";

  date.setDate(1); //1일로 객체의 날짜를 설정
  let firstDay = date.getDay();
  for (let x = firstDay; x > 0; x--) {
    dayscont += `<div class= "lastmonth">${lastDaylastmonth - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      dayscont += `<div class = "today">${i}</div>`;
    } else {
      dayscont += `<div>${i}</div>`;
    }
  }

  const nextfirstday = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay(); //getDay를 이용해 해당 날짜의 요일 인덱스를 구한다.

  const nextDays = 7 - nextfirstday - 1; // 일주일 총 7일에서 남은 칸수를 구해야하니까 nextfirstday를 이용해서 남은 칸 수를 구하고 인덱스로 바꿔주기위해 1을 뺀다.

  for (let j = 1; j <= nextDays; j++) {
    dayscont += `<div class = "nextmonth">${j}</div>`;
    days.innerHTML = dayscont;
  }
}

render();

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  render();
});
document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  render();
});
