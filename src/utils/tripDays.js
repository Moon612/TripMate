export const generateTripDays = (startDate, endDate) => {
    const days = [];

    const currentDate = new Date(startDate);
    const lastDate = new Date(endDate);

    let dayNumber = 1;

    while (currentDate <= lastDate) {
        const date = currentDate.toISOString().split("T")[0];

        days.push({
            day: dayNumber,
            date: date
        });

        currentDate.setDate(currentDate.getDate() + 1);
        dayNumber++;
    }

    return days;
};