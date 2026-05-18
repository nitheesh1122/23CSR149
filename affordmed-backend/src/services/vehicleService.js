const axios = require("axios");

const token =
require("../config/auth");

console.log("TOKEN:", token);

const BASE_URL =
"http://4.224.186.213/evaluation-service";

async function fetchDepots() {

    try {

        const response = await axios.get(
            `${BASE_URL}/depots`,
            {
                headers: {
                    Authorization:
                    `Bearer ${token}`,
                    "Content-Type":
                    "application/json"
                }
            }
        );

        return response.data;

    } catch (error) {

        console.log(
            "Depot API Error:",
            error.response?.data ||
            error.message
        );

        throw error;
    }
}

async function fetchVehicles() {

    try {

        const response = await axios.get(
            `${BASE_URL}/vehicles`,
            {
                headers: {
                    Authorization:
                    `Bearer ${token}`,
                    "Content-Type":
                    "application/json"
                }
            }
        );

        return response.data;

    } catch (error) {

        console.log(
            "Vehicle API Error:",
            error.response?.data ||
            error.message
        );

        throw error;
    }
}

module.exports = {
    fetchDepots,
    fetchVehicles
};