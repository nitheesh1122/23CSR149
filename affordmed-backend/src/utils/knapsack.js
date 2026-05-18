function maximizeImpact(tasks, availableHours) {

    const n = tasks.length;

    const dp = Array(n + 1)
        .fill(0)
        .map(() =>
            Array(availableHours + 1)
            .fill(0)
        );

    for (let i = 1; i <= n; i++) {

        const currentTask =
        tasks[i - 1];

        for (
            let h = 0;
            h <= availableHours;
            h++
        ) {

            if (
                currentTask.duration <= h
            ) {

                dp[i][h] = Math.max(
                    currentTask.impact +
                    dp[i - 1][
                        h -
                        currentTask.duration
                    ],

                    dp[i - 1][h]
                );

            } else {

                dp[i][h] =
                dp[i - 1][h];

            }
        }
    }

    return dp[n][availableHours];
}
module.exports = maximizeImpact;