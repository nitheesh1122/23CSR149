const axios = require("axios");

const token =
require("../config/auth");

const BASE_URL =
"http://4.224.186.213/evaluation-service";

async function Log(
    stack,
    level,
    packageName,
    message
) {

    try {

        const response = await axios.post(
            `${BASE_URL}/logs`,
            {
                stack: stack,
                level: level,
                package: packageName,
                message: message
            },
            {
                headers: {
                    Authorization:
                    `Bearer ${token}`,
                    "Content-Type":
                    "application/json"
                }
            }
        );

        console.log(
            "Log created successfully"
        );

    } catch (error) {

        console.log(
            error.response?.data ||
            error.message
        );

    }
}

module.exports = Log;