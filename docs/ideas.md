## Ideas and inclusions for the app:

Get the schedules of upcoming rotations through this api:
```json
    "schedules": "https://splatoon3.ink/data/schedules.json"
```

inclusion of personal stats to start out with:
```sql
UPDATE bosses SET steelheads = 3400, flyfishes = 1200, maws = 3300, stingers = 2900, steeleals = 1700, scrappers = 1717, 
drizzlers = 1650, flippers = 1450, slamonlids = 1490, fishticks = 1530, bigshots = 1020 
WHERE id = 1;

UPDATE game_accounts
SET bronzescales = 3112, silverscales = 945, goldscales = 210
WHERE id = 1;
```