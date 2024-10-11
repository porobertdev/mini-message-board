const { format } = require('date-fns');

const loadEnvConfig = () => {
    if (process.env.NODE_ENV === 'dev') {
        require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

        // test
        console.log('[ENV TEST]: ', process.env.DATABASE_NAME);
    }
};

const getDate = () => {
    return format(new Date(), 'dd-MM-yyyy / HH:mm');
};

module.exports = { loadEnvConfig, getDate };
