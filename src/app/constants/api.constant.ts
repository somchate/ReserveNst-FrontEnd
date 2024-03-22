import { environment } from '../../environments/environment';

const BASE_URL_LOG = environment.api_url_log;
const BASE_URL_NST = environment.api_url_nst;
const BASE_URL_RECRUIT = environment.api_url_recruit;

export const API_URL = {
    nst: BASE_URL_NST,
    log_verify: BASE_URL_LOG,
    recruit: BASE_URL_RECRUIT
};