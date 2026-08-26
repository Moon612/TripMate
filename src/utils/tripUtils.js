export function categorizeTrips(trips) {
    const today = new Date();

    const ongoingTrips = trips
        .filter((trip) => {
            const startDate = new Date(trip.startDate);
            const endDate = new Date(trip.endDate);

            return startDate <= today && today <= endDate;
        })
        .sort((a, b) => {
            return new Date(a.startDate) - new Date(b.startDate);
        });

    const upcomingTrips = trips
        .filter((trip) => {
            const startDate = new Date(trip.startDate);

            return startDate > today;
        })
        .sort((a, b) => {
            return new Date(a.startDate) - new Date(b.startDate);
        });

    const pastTrips = trips
        .filter((trip) => {
            const endDate = new Date(trip.endDate);

            return endDate < today;
        })
        .sort((a, b) => {
            return new Date(b.endDate) - new Date(a.endDate);
        });

    return {
        ongoingTrips,
        upcomingTrips,
        pastTrips,
    };
}