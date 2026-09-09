export function toLocalCalendarDate(value) {
    if (!value) {
        return null;
    }

    if (value?.toDate) {
        value = value.toDate();
    }

    if (typeof value === "string") {
        const dateParts = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);

        if (dateParts) {
            return new Date(
                Number(dateParts[1]),
                Number(dateParts[2]) - 1,
                Number(dateParts[3])
            );
        }
    }

    const date = value instanceof Date ? value : new Date(value);

    if (Number.isNaN(date.getTime())) {
        return null;
    }

    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
    );
}


export function categorizeTrips(trips) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const ongoingTrips = trips
        .filter((trip) => {
            const startDate = toLocalCalendarDate(trip.startDate);
            const endDate = toLocalCalendarDate(trip.endDate);

            return startDate && endDate &&
                startDate <= today && today <= endDate;
        })
        .sort((a, b) => {
            return toLocalCalendarDate(a.startDate) -
                toLocalCalendarDate(b.startDate);
        });

    const upcomingTrips = trips
        .filter((trip) => {
            const startDate = toLocalCalendarDate(trip.startDate);

            return startDate && startDate > today;
        })
        .sort((a, b) => {
            return toLocalCalendarDate(a.startDate) -
                toLocalCalendarDate(b.startDate);
        });

    const pastTrips = trips
        .filter((trip) => {
            const endDate = toLocalCalendarDate(trip.endDate);

            return endDate && endDate < today;
        })
        .sort((a, b) => {
            return toLocalCalendarDate(b.endDate) -
                toLocalCalendarDate(a.endDate);
        });

    return {
        ongoingTrips,
        upcomingTrips,
        pastTrips,
    };
}
