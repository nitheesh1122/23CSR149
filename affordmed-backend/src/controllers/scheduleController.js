const {
    fetchDepots,
    fetchVehicles
} = require("../services/vehicleservice");

const maximizeImpact =
require("../utils/knapsack");

const Log =
require("../middleware/logger");

async function getSchedule(req, res) {

    try {

        await Log(
            "backend",
            "info",
            "controller",
            "Fetching optimized schedule"
        );

        const depotData =
        await fetchDepots();

        const vehicleData =
        await fetchVehicles();

        const depots =
        depotData.depots;

        const vehicles =
        vehicleData.vehicles;

        const result = [];

        for (const depot of depots) {

            const bestImpact =
            maximizeImpact(
                vehicles,
                depot.MechanicHours
            );

            result.push({
                depotId: depot.ID,
                maximumImpact:
                bestImpact
            });
        }

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {

        await Log(
            "backend",
            "error",
            "controller",
            error.message
        );

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
}

module.exports = {
    getSchedule
};