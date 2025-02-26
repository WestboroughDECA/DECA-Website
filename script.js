const minute = 1000 * 60;
const hour = minute * 60;
const day = hour * 24;
const year = day * 365;

function getYearsAsATeam() {
  var d = new Date();
  let years = Math.round(d.getTime() / year); //Years since January 1st 1970
  years = years - 51; //Years since 2021
  return (years);
}

document.getElementById("yearsAsATeam").innerHTML = getYearsAsATeam() + " Years";

document.getElementById("amountRaised").innerHTML = "$" + 5000

document.getElementById("goal").innerHTML = "$" + 10000