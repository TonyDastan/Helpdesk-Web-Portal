import { baseURL } from "./baseUrl";

export const api = {
    login: baseURL + 'api/auth/login',
    fetchIssues: baseURL + 'api/helpdesk/issues/',
    fetchUser: baseURL + 'api/auth/user-information',
    createUpdateResponseUrl: baseURL + 'api/helpdesk/issue-response/',
    fetchResponsesUrl: baseURL + 'api/helpdesk/get-issue-responses/',
};