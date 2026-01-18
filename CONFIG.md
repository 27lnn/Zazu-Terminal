# Configuration

Zazu Terminal reads configuration from `~/.zazurc`.

Two formats are supported:

## JSON

```json
{
  "theme": "green",
  "commentLevel": 1,
  "mood": "observing",
  "asciiRare": true,
  "telemetry": false
}
```

## Key/Value

```ini
theme=green
commentLevel=1
mood=observing
asciiRare=true
telemetry=false
```

Notes:
- `commentLevel` ranges from `0` to `2`.
- Zazu intentionally avoids chatty output by default.
