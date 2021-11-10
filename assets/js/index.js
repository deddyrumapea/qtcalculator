let formQueueData = document.querySelector("#form-queue-data");
formQueueData.onsubmit = (e) => {
  e.preventDefault();
  showSolution();
};

function showSolution() {
  let arrivalRate = document.querySelector("#input-arrival-rate").value;
  let serviceRate = document.querySelector("#input-service-rate").value;

  let container = document.querySelector("#solution-body");
  container.innerHTML += utilityRate(arrivalRate, serviceRate);
  container.innerHTML += probabilityOf(0, arrivalRate, serviceRate);
  container.innerHTML += lengthOfQueue(arrivalRate, serviceRate);
  container.innerHTML += waitingTimeInQueue(arrivalRate, serviceRate);
  container.innerHTML += waitingTime(arrivalRate, serviceRate);
  container.innerHTML += waitingTimeInService(arrivalRate, serviceRate);

  MathJax.typeset();
}

function utilityRate(lambda, mu) {
  return `<p>Service utilization rate 
  \\[U = {\\lambda \\over \\mu}\\]
  \\[U = {${lambda} \\over ${mu}}\\]
  \\[U = {${(lambda / mu).toFixed(2)}}\\]
  \\[U = {${(lambda / mu).toFixed(2) * 100}}\\%\\]
  </p>
  `;
}

function probabilityOf(n, lambda, mu) {
  let utility = (lambda / mu).toFixed(2);
  let probability = `<p>Probability of zero customers
  \\[P_n = (1 - U) \\times U^n\\]
  \\[P_${n} = (1 - ${utility}) \\times ${utility}^${n}\\]
  \\[P_${n} = (${(1 - utility).toFixed(2)}) \\times ${Math.pow(utility, n)}\\]
  \\[P_${n} = ${((1 - utility) * Math.pow(utility, n)).toFixed(2)}\\]
  </p>`;
  return probability;
}

function lengthOfQueue(lambda, mu) {
  return `<p>Average length of queue
  \\[L_Q = {\\lambda^2 \\over \\mu(\\mu - \\lambda)}\\]
  \\[L_Q = {${lambda}^2 \\over ${mu} (${mu} - ${lambda})}\\]
  \\[L_Q = {${Math.pow(lambda, 2)} \\over ${mu}(${mu - lambda})}\\]
  \\[L_Q = {${Math.pow(lambda, 2)} \\over ${mu * (mu - lambda)}}\\]
  \\[L_Q = {${Math.pow(lambda, 2)} \\over ${mu * (mu - lambda)}}\\]
  \\[L_Q = {${(Math.pow(lambda, 2) / (mu * (mu - lambda))).toFixed(2)}}\\]
  \\[L_Q \\approx {${(Math.pow(lambda, 2) / (mu * (mu - lambda))).toFixed()}}\\]
  </p>`;
}

function waitingTimeInQueue(lambda, mu) {
  return `<p>Average wating time in queue
  \\[W_Q = {\\lambda \\over \\mu(\\mu - \\lambda)}\\]
  \\[W_Q = {${lambda} \\over ${mu} (${mu} - ${lambda})}\\]
  \\[W_Q = {${lambda} \\over ${mu}(${mu - lambda})}\\]
  \\[W_Q = {${lambda} \\over ${mu * (mu - lambda)}}\\]
  \\[W_Q = {${lambda} \\over ${mu * (mu - lambda)}}\\]
  \\[W_Q = {${(lambda / (mu * (mu - lambda))).toFixed(2)}}\\]
  </p>`;
}

function waitingTime(lambda, mu) {
  return `<p>Average waiting time in system
  \\[W = {1 \\over \\mu - \\lambda}\\]
  \\[W = {1 \\over ${mu}- ${lambda}}\\]
  \\[W = {1 \\over ${mu - lambda}}\\]
  \\[W = {${(1 / (mu - lambda)).toFixed(2)}}\\]
  </p>`;
}

function waitingTimeInService(lambda, mu) {
  return `<p>Average waiting time in service
  \\[W_S = {1 \\over \\mu}\\]
  \\[W_S = {1 \\over ${mu}}\\]
  \\[W_S = ${(1 / mu).toFixed(2)}\\]
  </p>`;
}
