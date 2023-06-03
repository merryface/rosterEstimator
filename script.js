function formatDate(date) {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  let suffix = "th";
  if (day === 1 || day === 21 || day === 31) {
    suffix = "st";
  } else if (day === 2 || day === 22) {
    suffix = "nd";
  } else if (day === 3 || day === 23) {
    suffix = "rd";
  }

  return day + suffix + " " + month + " " + year;
}


const GetRosterDays = (firstDutyDay, targetDate, isFiveSix) => {
  // Convert known day and target date to JavaScript Date objects
  const knownDate = new Date(firstDutyDay) ;
  const date = new Date(targetDate);
  
  // Calculate the number of days between the known day and target date
  const dayDifference = Math.floor((date - knownDate) / (1000 * 60 * 60 * 24)) + 1;

  let rosterPattern;
  if (isFiveSix) {
    rosterPattern = [true, true, true, true, true, true, false, false, false, false, false];
  }
  if (!isFiveSix) {
    rosterPattern = [true, true, true, true, true, true, true, false, false, false, false, false, false];
  }

  let daysOn = []
  let daysOff = []
  let currentIndex = 0

  for (i=0; i<dayDifference; i += 1) {
    const currentAssessedDay = formatDate(new Date(knownDate.getFullYear(), knownDate.getMonth(), knownDate.getDate() + i))
    if (rosterPattern[currentIndex]) daysOn.push(currentAssessedDay)
    if (!rosterPattern[currentIndex]) daysOff.push(currentAssessedDay)
    currentIndex += 1
    if (isFiveSix && currentIndex > 10) currentIndex = 0
    if (!isFiveSix && currentIndex > 12) currentIndex = 0
  }

  return {
    daysOn,
    daysOff
  }
}