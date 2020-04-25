import { APP_LEVEL_DEBUG, APP_LEVEL_PRODUCTION } from 'constants/generic';

/* modify this line to change debug level of application */
export const APP_LEVEL = APP_LEVEL_DEBUG;
export const DEBUG = APP_LEVEL === APP_LEVEL_PRODUCTION ? false : true;
export const APP_HOST = DEBUG ? 'http://localhost:8000' : 'https://something.com';
