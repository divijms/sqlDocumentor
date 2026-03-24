-- Top 10 Batsmen by Strike Rate (min 20 balls faced)
SELECT 
    batter,
    batting_team,
    match_id,
    total_runs,
    balls_faced,
    strike_rate,
    fours,
    sixes,
    boundaries,
    ROUND(boundary_percentage, 1) as boundary_pct
FROM cricketpulse.gold.batsman_match_stats
WHERE balls_faced >= 20
ORDER BY strike_rate DESC
LIMIT 10;