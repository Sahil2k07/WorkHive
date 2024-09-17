const SERVER_URL = String(import.meta.env.VITE_SERVER_URL);

export const LOGIN_URL = SERVER_URL + "/user/login";

export const LOGOUT_URL = SERVER_URL + "/user/logout";

export const SIGNUP_URL = SERVER_URL + "/user/signup";

export const GET_JOBS = SERVER_URL + "/job/get-jobs";

export const GET_JOB_ID = SERVER_URL + "/job/get-job";

export const APPLY_JOB = SERVER_URL + "/application/apply-job";

export const APPLIED_JOBS = SERVER_URL + "/application/applied-jobs";

export const UPDATE_PROFILE = SERVER_URL + "/user/update-profile";

export const USER_COMPANIES = SERVER_URL + "/company/user-company";

export const GET_COMPANY = SERVER_URL + "/company/get-company";

export const UPDATE_COMPANY = SERVER_URL + "/company/update-company";

export const REGISTER_COMPANY = SERVER_URL + "/company/register-company";

export const DELETE_COMPANY = SERVER_URL + "/company/delete-company";

export const ADMIN_JOBS = SERVER_URL + "/job/user-jobs";

export const POST_JOB = SERVER_URL + "/job/post-job";

export const GET_JOB = SERVER_URL + "/job/get-job";

export const UPDATE_JOB = SERVER_URL + "/job/update-job";

export const DELETE_JOB = SERVER_URL + "/job/delete-job";

export const GET_APPLICANTS = SERVER_URL + "/application/get-applicants";

export const UPDATE_STATUS = SERVER_URL + "/application/update-status";
