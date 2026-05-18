const axios = require("axios");

const token =
require("../config/auth");

const BASE_URL =
"http://4.224.186.213/evaluation-service";

async function fetchDepots() {

    const response = await axios.get(
        `${BASE_URL}/depots`,
        {
            headers: {
                Authorization:
                `Bearer ${token}`
            }
        }
    );

    return response.data;
}

async function fetchVehicles() {

    const response = await axios.get(
        `${BASE_URL}/vehicles`,
        {
            headers: {
                Authorization:
                `Bearer ${token}`
            }
        }
    );

    return response.data;
}

module.exports = {
    fetchDepots,
    fetchVehicles
};