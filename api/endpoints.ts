const ENDPOINTS = {
    auth: {
        signup: '/auth/signup',
        update: '/auth/update',
        removeAvatar: '/auth/avatar/remove',
        verifyToken: '/auth/verify',
    },
    water: {
        createWater: '/water/create',
        updateWater: '/water',
        deleteWater: '/water',
        dailyWater: '/water/daily',
        weeklyWater: '/water/weekly',
        monthlyWater: '/water/monthly',
    },
};

export default ENDPOINTS;
