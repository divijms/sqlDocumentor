-- Most Economical Bowlers (min 2 overs bowled)
-- Purpose: Identify most restrictive bowlers

SELECT DISTINCT
    bowler,
    match_id,
    ROUND(overs_bowled, 1) as overs,
    runs_conceded,
    wickets_taken,
    economy_rate,
    ROUND(dot_ball_percentage, 1) as dot_ball_pct,
    CASE 
        WHEN wickets_taken >= 3 THEN 'High Impact'
        WHEN wickets_taken >= 1 THEN 'Medium Impact'
        ELSE 'Low Impact'
    END as impact_category
FROM cricketpulse.gold.bowler_match_stats
WHERE overs_bowled >= 3
ORDER BY economy_rate ASC
LIMIT 10;