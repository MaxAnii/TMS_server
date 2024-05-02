const getComparisonDataQuery = (date) => {
	return `
    SELECT 
    device_id,
    SUM(CASE WHEN on_board_time::time BETWEEN '08:00:00' AND '08:59:59' THEN 1 ELSE 0 END) AS passengers_at_8_10,
    SUM(CASE WHEN on_board_time::time BETWEEN '10:00:00' AND '10:59:59' THEN 1 ELSE 0 END) AS passengers_at_10_12,
    SUM(CASE WHEN on_board_time::time BETWEEN '12:00:00' AND '13:59:59' THEN 1 ELSE 0 END) AS passengers_at_12_2,
    SUM(CASE WHEN on_board_time::time BETWEEN '14:00:00' AND '15:59:59' THEN 1 ELSE 0 END) AS passengers_at_2_4,
    SUM(CASE WHEN on_board_time::time BETWEEN '16:00:00' AND '17:59:59' THEN 1 ELSE 0 END) AS passengers_at_4_6,
    SUM(CASE WHEN on_board_time::time BETWEEN '18:00:00' AND '19:59:59' THEN 1 ELSE 0 END) AS passengers_at_6_8
    
FROM 
    tripInformation
WHERE on_board_time::date = '${date}'
GROUP BY 
    device_id
    `;
};

module.exports = getComparisonDataQuery;
