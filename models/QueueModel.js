export default class QueueModel {
  static STORAGE_KEY = "queue_storage";
  static STORAGE_CAPACITY = 4;

  constructor(lambda, mu, timeUnit) {
    this.lambda = lambda;
    this.mu = mu;
    this.timeUnit = timeUnit;
    this.utilizationRate = lambda / mu;
    this.probabilityOfZero = 1 - this.utilizationRate;
    this.lengthOfQueue = Math.pow(lambda, 2) / (mu * (mu - lambda));
    this.waitingTime = 1 / (mu - lambda);
    this.waitingTimeInQueue = lambda / (mu * (mu - lambda));
    this.waitingTimeInService = 1 / mu;
  }

  writeUtilizationRate() {
    return `<p>Service utilization rate 
    \\[U = {\\lambda \\over \\mu}\\]
    \\[U = {${this.lambda} \\over ${this.mu}}\\]
    \\[U = {${(this.lambda / this.mu).toFixed(2)}}\\]
    \\[U = {${(this.lambda / this.mu).toFixed(2) * 100}}\\%\\]
    </p>
    `;
  }

  writeProbabilityOf(n) {
    let util = (this.lambda / this.mu).toFixed(2);
    let probability = `<p>Probability of zero customers
    \\[P_n = (1 - U) \\times U^n\\]
    \\[P_${n} = (1 - ${util}) \\times ${util}^${n}\\]
    \\[P_${n} = (${(1 - util).toFixed(2)}) \\times ${Math.pow(util, n)}\\]
    \\[P_${n} = ${((1 - util) * Math.pow(util, n)).toFixed(2)}\\]
    </p>`;
    return probability;
  }

  writeLengthOfQueue() {
    let lambda = this.lambda;
    let mu = this.mu;
    return `<p>Average length of queue
    \\[L_Q = {\\lambda^2 \\over \\mu(\\mu - \\lambda)}\\]
    \\[L_Q = {${lambda}^2 \\over ${mu} (${mu} - ${lambda})}\\]
    \\[L_Q = {${Math.pow(lambda, 2)} \\over ${mu}(${mu - lambda})}\\]
    \\[L_Q = {${Math.pow(lambda, 2)} \\over ${mu * (mu - lambda)}}\\]
    \\[L_Q = {${Math.pow(lambda, 2)} \\over ${mu * (mu - lambda)}}\\]
    \\[L_Q = {${(Math.pow(lambda, 2) / (mu * (mu - lambda))).toFixed(2)}}\\]
    \\[L_Q \\approx {${(
      Math.pow(lambda, 2) /
      (mu * (mu - lambda))
    ).toFixed()}\\;units}\\] 
    </p>`;
  }

  writeWaitingTime() {
    return `<p>Average waiting time in system
    \\[W = {1 \\over \\mu - \\lambda}\\]
    \\[W = {1 \\over ${this.mu}- ${this.lambda}}\\]
    \\[W = {1 \\over ${this.mu - this.lambda}}\\]
    \\[W = {${(1 / (this.mu - this.lambda)).toFixed(2)}\\;${this.timeUnit}}\\]
    </p>`;
  }

  writeWaitingTimeInQueue() {
    return `<p>Average wating time in queue
    \\[W_Q = {\\lambda \\over \\mu(\\mu - \\lambda)}\\]
    \\[W_Q = {${this.lambda} \\over ${this.mu} (${this.mu} - ${this.lambda})}\\]
    \\[W_Q = {${this.lambda} \\over ${this.mu}(${this.mu - this.lambda})}\\]
    \\[W_Q = {${this.lambda} \\over ${this.mu * (this.mu - this.lambda)}}\\]
    \\[W_Q = {${this.lambda} \\over ${this.mu * (this.mu - this.lambda)}}\\]
    \\[W_Q = {${(this.lambda / (this.mu * (this.mu - this.lambda))).toFixed(
      2
    )}\\;${this.timeUnit}}\\]
    </p>`;
  }

  writeWaitingTimeInService() {
    return `<p>Average waiting time in service
    \\[W_S = {1 \\over \\mu}\\]
    \\[W_S = {1 \\over ${this.mu}}\\]
    \\[W_S = ${(1 / this.mu).toFixed(2)}\\;${this.timeUnit}\\]
    </p>`;
  }
}
