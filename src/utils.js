export function formatDate(date) {
  const spans = {
    second: 1000,
    minute: 1000 * 60,
    hour: 1000 * 60 * 60,
    day: 1000 * 60 * 60 * 24,
    week: 1000 * 60 * 60 * 24 * 7,
    month: 1000 * 60 * 60 * 24 * 30,
    year: 1000 * 60 * 60 * 24 * 30 * 12,
  }
  let diff = Date.now() - new Date(date);
  let seconds = 0;
  let minutes = 0;
  let hours = 0;
  let days = 0;
  let weeks = 0;
  let months = 0;
  let years = 0;

  while (diff >= spans.year) {
    diff -= spans.year;
    years++;
  }
  while (diff >= spans.month) {
    diff -= spans.month;
    months++;
  }
  while (diff >= spans.week) {
    diff -= spans.week;
    weeks++;
  }
  while (diff >= spans.day) {
    diff -= spans.day;
    days++;
  }
  while (diff >= spans.hour) {
    diff -= spans.hour;
    hours++;
  }
  while (diff >= spans.minute) {
    diff -= spans.minute;
    minutes++;
  }
  while (diff >= spans.second) {
    diff -= spans.second;
    seconds++;
  }

  if (years) {
    return `${years} year${years > 1 ? 's' : ''} ago`;
  } else if (months) {
    return `${months} month${months > 1 ? 's' : ''} ago`;
  } else if (weeks) {
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  } else if (days) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (seconds) {
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  } else {
    return `just now`
  }
}

