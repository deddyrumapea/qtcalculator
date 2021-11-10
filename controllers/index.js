import QueueModel from "../models/QueueModel.js";
import StorageHelper from "../helpers/StorageHelper.js";

let formQueueData = document.querySelector("#form-queue-data");
let btnCalculate = document.querySelector("#button-calculate");
let clpSolution = document.querySelector("#collapse-solution");

showHistory(); // TODO: move this into a document on ready function

formQueueData.onsubmit = (e) => {
  e.preventDefault();
  showSolution();
};

btnCalculate.onclick = () => {
  if (!clpSolution.classList.contains("show"))
    new bootstrap.Collapse(clpSolution);
};

// TODO: fix performance issue
function showSolution() {
  let arrivalRate = document.querySelector("#input-arrival-rate").value;
  let serviceRate = document.querySelector("#input-service-rate").value;
  let queue = new QueueModel(arrivalRate, serviceRate);

  let container = document.querySelector("#solution-body");
  container.innerHTML =
    queue.writeUtilizationRate() +
    queue.writeProbabilityOf(0) +
    queue.writeLengthOfQueue() +
    queue.writeWaitingTime() +
    queue.writeWaitingTimeInQueue() +
    queue.writeWaitingTimeInService();

  MathJax.typeset();
  StorageHelper.save(
    QueueModel.STORAGE_KEY,
    QueueModel.STORAGE_CAPACITY,
    queue
  );
  showHistory();
}

function showHistory() {
  const history = StorageHelper.findAll(QueueModel.STORAGE_KEY);
  let table = document.querySelector("#table-body-history");

  if (history.length === 0) {
    table.innerHTML = `<tr><td colspan="9"><i>History is empty.</i></td></tr>`;
    return;
  }

  let historyRows = "";
  history.forEach((item, i) => {
    historyRows += `<tr>
    <th scope="row">${i + 1}</th>
    <td>${item.lambda}</td>
    <td>${item.mu}</td>
    <td>${item.utilizationRate.toFixed(2) * 100}%</td>
    <td>${item.probabilityOfZero.toFixed(2)}</td>
    <td>${item.lengthOfQueue.toFixed(2)}</td>
    <td>${item.waitingTime.toFixed(2)}</td>
    <td>${item.waitingTimeInQueue.toFixed(2)}</td>
    <td>${item.waitingTimeInService.toFixed(2)}</td>
    </tr>`;
  });

  table.innerHTML = historyRows;
}
