export default class TimeUnitHelper {
  static SECONDS = "seconds";
  static MINUTES = "minutes";
  static HOURS = "hours";
  static DAYS = "days";

  static formatToHms(timeUnit, value) {
    let seconds = TimeUnitHelper.toSeconds(timeUnit, value).toFixed();

    let hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;

    let minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;

    let hms = "";
    hms += hours > 0 ? `${hours}\\;hours\\;` : "";
    hms += minutes > 0 ? `${minutes}\\;minutes\\;` : "";
    hms += seconds > 0 ? `${seconds}\\;seconds\\;` : "";
    return hms;
  }

  static toSeconds(timeUnit, value) {
    let seconds = 0;
    switch (timeUnit) {
      case TimeUnitHelper.SECONDS:
        seconds = value;
        break;
      case TimeUnitHelper.MINUTES:
        seconds = value * 60;
        break;
      case TimeUnitHelper.HOURS:
        seconds = value * 3600;
        break;
      case TimeUnitHelper.DAYS:
        seconds = value * 86400;
        break;
    }
    return seconds;
  }
}
