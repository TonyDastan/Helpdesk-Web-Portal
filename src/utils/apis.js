import { baseURL } from "./baseUrl";

export const api = {
    login: baseURL + 'api/auth/login',
    fetchIssues: baseURL + 'api/helpdesk/issues/',
    fetchUser: baseURL + 'api/auth/user-information',
};