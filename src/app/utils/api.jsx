const baseUrl = "http://localhost:8000";

export const apiPath = (apiPath) => baseUrl + "/test" + apiPath;

export const apiFilePath = (filePath) => baseUrl + '/files' + filePath