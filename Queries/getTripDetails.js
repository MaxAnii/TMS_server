const getTripDetailsQuery = (date) => {
	return `
WITH TripData AS (
    SELECT 
        ts.device_id,
        ts.start_time,
        ts.end_time,
        ti.on_board_time,
        ti.user_type
    FROM 
        tripSchedule ts
    JOIN 
        tripInformation ti ON ts.device_id = ti.device_id
                           AND CAST(ti.on_board_time AS time) BETWEEN ts.start_time AND ts.end_time
    WHERE 
        DATE(ti.on_board_time::DATE) = '${date}'
)
SELECT 
    device_id,
    COUNT(DISTINCT CONCAT(start_time, end_time, device_id)) AS total_trips,
    SUM(CASE WHEN user_type = '1' THEN 1 ELSE 0 END) AS employees,
    SUM(CASE WHEN user_type = '0' THEN 1 ELSE 0 END) AS non_employees,
    COUNT(*) AS total_passengers
FROM 
    TripData
GROUP BY 
    device_id;
`;
};
module.exports = getTripDetailsQuery;
