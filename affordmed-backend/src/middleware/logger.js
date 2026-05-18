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

        await axios.post(
            `${BASE_URL}/logs`,
            {
                stack,
                level,
                package: packageName,
                message
            },
            {
                headers: {
                    Authorization:
                    `Bearer ${token}`
                }
            }
        );

    } catch (error) {

        console.log(
    error.response?.data ||
    error.message
);

    }
}

module.exports = Log;