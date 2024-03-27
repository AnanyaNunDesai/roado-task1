class DeviceDetails {
    loggedIn: Date | null;
    loggedOut: Date | null;
    lastSeenAt: Date | null;

    constructor(loggedIn: Date | null, loggedOut : Date | null, lastSeenAt: Date | null) {
        this.loggedIn = loggedIn;
        this.loggedOut = loggedOut;
        this.lastSeenAt = lastSeenAt;
    }
}

class User {
    userId: string;
    sessionActivity: Map<string, DeviceDetails>;
}

const user1: User = {
    userId: '123',
    sessionActivity: new Map([
        [
            'iPhone 11',
            new DeviceDetails(new Date(2023, 10, 3), null, new Date())
        ]
    ])
};

const user2: User = {
    userId: '456',
    sessionActivity: new Map([
        [
            'Samsung Galaxy S7',
            new DeviceDetails(new Date(2023, 10, 3), null, new Date(2023, 10, 21))
        ]
    ])
};

const usersList = [user1, user2];

function calculateMonthlyActiveUsers(users: User[]) {
    const monthlyActiveUsers = new Map<string, number>();

    users.forEach((user) => {
        const singleUserActiveMonths = new Set<string>();

        // Using Set to prevent duplication if user has already been active on month before
        user.sessionActivity?.forEach((device) => {
            const monthActive = `${device.lastSeenAt?.getMonth() + 1}-${device.lastSeenAt?.getFullYear()}`;
            singleUserActiveMonths.add(monthActive);

            if (device.loggedIn) {
                const loginMonth = `${device.loggedIn.getMonth() + 1}-${device.loggedIn.getFullYear()}`;
                singleUserActiveMonths.add(loginMonth);
            }
        });


        // Store instances of this user's activity in overall map of dates
        singleUserActiveMonths.forEach((activeMonth) => {
            const numActiveOnMonth = monthlyActiveUsers.get(activeMonth);

            if (!numActiveOnMonth) {
                monthlyActiveUsers.set(activeMonth, 1);
            } else {
                monthlyActiveUsers.set(activeMonth, numActiveOnMonth + 1);
            }
        });
    });

    return monthlyActiveUsers;
}

console.log(calculateMonthlyActiveUsers(usersList));
