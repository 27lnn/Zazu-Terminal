<div align="center">

![Zazu Terminal](zazuterminal.png)

# Zazu Terminal

A UNIX-style command-line interface with integrated personality layer

</div>

---

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
  - [Package Managers](#package-managers)
  - [Building from Source](#building-from-source)
  - [System Requirements](#system-requirements)
- [Command Reference](#command-reference)
  - [Core Commands](#core-commands)
  - [System Information](#system-information)
  - [Behavioral Commands](#behavioral-commands)
  - [Administrative Commands](#administrative-commands)
- [Personality Engine](#personality-engine)
  - [Architecture](#architecture)
  - [Mood States](#mood-states)
  - [Response Determinism](#response-determinism)
  - [Verbosity Control](#verbosity-control)
- [Configuration](#configuration)
  - [Configuration File](#configuration-file)
  - [Theming](#theming)
  - [Prompt Customization](#prompt-customization)
  - [Commentary Levels](#commentary-levels)
- [ASCII Identity](#ascii-identity)
  - [Display Rules](#display-rules)
  - [Example Rendering](#example-rendering)
- [Extensibility](#extensibility)
  - [Command Registration](#command-registration)
  - [Plugin Architecture](#plugin-architecture)
  - [API Surface](#api-surface)
- [Philosophy](#philosophy)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Zazu Terminal is a functional command-line interface that operates as a standard UNIX-style shell utility with an integrated personality layer. The system accepts arguments, processes commands, and returns structured output while maintaining a minimal commentary interface.

This is not a novelty wrapper. Zazu Terminal implements real terminal workflows, system monitoring, and extensible command processing with an opinionated interface design that prioritizes signal over noise.

The personality layer is deterministic, configurable, and designed to enhance rather than obstruct terminal operations.

---

## Installation

### Package Managers

**npm (recommended)**

```bash
npm install -g zazu-terminal
```

**Cargo**

```bash
cargo install zazu-terminal
```

**Homebrew**

```bash
brew tap zazu-cli/tap
brew install zazu-terminal
```

### Building from Source

**Requirements:**
- Rust 1.70+
- Git

**Build process:**

```bash
git clone https://github.com/zazu-cli/zazu-terminal.git
cd zazu-terminal
cargo build --release
sudo cp target/release/zazu /usr/local/bin/
```

**Verify installation:**

```bash
zazu --version
```

### System Requirements

- Linux (kernel 3.10+), macOS (10.12+), or WSL2
- 64-bit architecture
- Terminal with 256-color support
- Unicode font (recommended: Fira Code, JetBrains Mono)

---

## Command Reference

### Core Commands

#### `zazu help`

Displays command reference with usage syntax.

**Usage:**

```bash
zazu help [command]
```

**Example output:**

```
$ zazu help

zazu terminal v1.4.2

usage: zazu [command] [options]

commands:
  help       display this message
  status     system status check
  mood       current mood state
  judge      evaluate input
  uptime     system runtime
  ps         process snapshot
  top        resource monitor
  whoami     identity check
  env        environment dump
  scream     output test
  stare      idle operation
  sleep      suspend commentary
  ignore     null operation

run 'zazu help [command]' for details
```

**Specific command help:**

```
$ zazu help judge

zazu judge [input]

evaluates provided input
returns assessment
no guarantees

options:
  --strict    stricter evaluation
  --verbose   extended output
```

#### `zazu status`

Reports system operational state and internal metrics.

**Usage:**

```bash
zazu status [--verbose]
```

**Example output:**

```
$ zazu status

system: operational
cpu: nominal
memory: adequate
disk: sufficient
network: connected
zazu: observing
```

**Verbose output:**

```
$ zazu status --verbose

system metrics
  uptime: 47h 23m
  load: 0.42, 0.38, 0.31
  cpu: 4 cores @ 2.4GHz
  utilization: 12%

memory allocation
  total: 16384 MB
  used: 8192 MB
  available: 8192 MB
  swap: 0 MB

filesystem status
  /: 234.5 GB / 512.0 GB (45%)
  /home: 89.2 GB / 256.0 GB (34%)

network interfaces
  eth0: 192.168.1.100
  wlan0: disconnected

zazu subsystem
  mood: neutral
  commentary: enabled
  response_time: 2ms
  status: monitoring
```

#### `zazu mood`

Displays current personality state and response weighting.

**Usage:**

```bash
zazu mood [--set STATE]
```

**Example output:**

```
$ zazu mood

current state: neutral
response bias: default
verbosity: minimal
last transition: 12m ago
```

**Setting mood:**

```
$ zazu mood --set indifferent

mood updated
current state: indifferent
commentary reduced
```

Available states: `neutral`, `indifferent`, `annoyed`, `curious`, `resigned`

#### `zazu judge`

Evaluates provided input and returns assessment.

**Usage:**

```bash
zazu judge [input]
```

**Example output:**

```
$ zazu judge "my new startup idea"

assessment: reviewed
verdict: unlikely
confidence: moderate
```

```
$ zazu judge "should I rewrite this in Rust"

assessment: processed
verdict: probably
confidence: high
recommendation: inevitable
```

**Strict mode:**

```
$ zazu judge --strict "tabs vs spaces"

assessment: reviewed
verdict: spaces
confidence: absolute
reasoning: objectively correct
dissent: not recognized
```

### System Information

#### `zazu uptime`

Reports system runtime and session statistics.

**Usage:**

```bash
zazu uptime
```

**Example output:**

```
$ zazu uptime

system uptime: 2d 14h 32m
zazu uptime: 2d 14h 31m
sessions started: 47
commands processed: 1,823
average response: 3ms
```

#### `zazu ps`

Displays snapshot of current process state.

**Usage:**

```bash
zazu ps [--tree]
```

**Example output:**

```
$ zazu ps

PID    NAME              CPU%   MEM%    STATE
1      systemd           0.0    0.1     sleeping
428    zazu-daemon       0.1    0.3     observing
1247   zazu-cli          0.2    0.2     running
1248   ps-monitor        0.0    0.1     idle
2891   chrome            12.4   18.7    consuming
3104   code              3.2    8.4     editing

6 processes listed
```

**Tree view:**

```
$ zazu ps --tree

systemd (1)
├─ zazu-daemon (428)
│  └─ zazu-cli (1247)
│     └─ ps-monitor (1248)
├─ chrome (2891)
│  ├─ renderer (2912)
│  ├─ renderer (2913)
│  └─ gpu-process (2914)
└─ code (3104)
   └─ node (3125)
```

#### `zazu top`

Real-time resource monitoring interface.

**Usage:**

```bash
zazu top [interval]
```

**Example output:**

```
$ zazu top

zazu top - 14:23:47 up 2 days, 14:32
tasks: 247 total, 1 running, 246 sleeping
cpu: 8.2% user, 2.1% system, 89.7% idle
mem: 8192/16384 MB

PID    COMMAND           CPU%   MEM%
2891   chrome            12.4   18.7
3104   code              3.2    8.4
1247   zazu-cli          0.2    0.2
428    zazu-daemon       0.1    0.3

refresh: 2s | q to quit
```

Monitoring runs until interrupted. Default refresh interval is 2 seconds.

#### `zazu whoami`

Identity and context verification.

**Usage:**

```bash
zazu whoami
```

**Example output:**

```
$ zazu whoami

user: alex
hostname: workstation
shell: /bin/zsh
home: /home/alex
groups: wheel, docker, sudo
uid: 1000
gid: 1000

context verified
```

#### `zazu env`

Environment variable dump with optional filtering.

**Usage:**

```bash
zazu env [pattern]
```

**Example output:**

```
$ zazu env

HOME=/home/alex
PATH=/usr/local/bin:/usr/bin:/bin
SHELL=/bin/zsh
EDITOR=vim
LANG=en_US.UTF-8
ZAZU_CONFIG=/home/alex/.zazurc
ZAZU_THEME=minimal
ZAZU_MOOD=neutral

8 variables listed
```

**Filtered output:**

```
$ zazu env ZAZU

ZAZU_CONFIG=/home/alex/.zazurc
ZAZU_THEME=minimal
ZAZU_MOOD=neutral
ZAZU_VERBOSITY=low

4 variables matched
```

### Behavioral Commands

#### `zazu scream`

Controlled output test for terminal verification.

**Usage:**

```bash
zazu scream [--intensity LEVEL]
```

**Example output:**

```
$ zazu scream

A

output test complete
```

**High intensity:**

```
$ zazu scream --intensity high

AAAAAAAAAAAAAA

excessive but functional
```

Intensity levels: `low` (default), `medium`, `high`, `maximum`

#### `zazu stare`

Idle operation with no side effects.

**Usage:**

```bash
zazu stare [duration]
```

**Example output:**

```
$ zazu stare

...

operation complete
```

**Timed stare:**

```
$ zazu stare 5s

.....

5 seconds elapsed
```

Duration accepts standard time suffixes: `s`, `m`, `h`

#### `zazu sleep`

Temporarily suspends commentary layer.

**Usage:**

```bash
zazu sleep [duration]
```

**Example output:**

```
$ zazu sleep

commentary suspended
resume with 'zazu wake'
```

**Timed suspension:**

```
$ zazu sleep 1h

commentary suspended for 1 hour
auto-resume at 15:23
```

During sleep mode, all commands execute silently with minimal output.

#### `zazu ignore`

Null operation for testing and automation.

**Usage:**

```bash
zazu ignore [input]
```

**Example output:**

```
$ zazu ignore "this is a test"

acknowledged
```

All input is accepted and discarded. Exit code always 0.

### Administrative Commands

#### `zazu config`

Configuration management interface.

**Usage:**

```bash
zazu config [get|set|list] [key] [value]
```

**Example output:**

```
$ zazu config list

theme=minimal
mood=neutral
verbosity=low
prompt_style=compact
color_scheme=dark
commentary_enabled=true
ascii_frequency=rare

7 settings configured
```

**Get specific value:**

```
$ zazu config get theme

minimal
```

**Set value:**

```
$ zazu config set verbosity high

verbosity updated: low -> high
restart recommended
```

#### `zazu theme`

Theme management and preview.

**Usage:**

```bash
zazu theme [list|set|preview] [name]
```

**Example output:**

```
$ zazu theme list

available themes:
  minimal     (current)
  classic
  midnight
  nord
  gruvbox
  monochrome

use 'zazu theme preview [name]' to test
```

**Preview theme:**

```
$ zazu theme preview nord

theme: nord
colors: verified
rendering sample...

[displays color palette and sample output]

apply with 'zazu theme set nord'
```

#### `zazu reset`

Reset configuration to defaults.

**Usage:**

```bash
zazu reset [--hard]
```

**Example output:**

```
$ zazu reset

configuration reset to defaults
custom settings backed up to ~/.zazurc.backup
restart required
```

**Hard reset:**

```
$ zazu reset --hard

all configuration removed
cache cleared
history purged
state reset
restart required
```

---

## Personality Engine

### Architecture

The personality layer operates as a separate subsystem that processes command output before display. It does not interfere with command execution or return codes.

**Key components:**

1. **Mood State Machine**: Tracks current personality state based on interaction patterns
2. **Response Weighting**: Determines probability distribution for commentary variants
3. **Context Analyzer**: Evaluates command history and system state
4. **Output Processor**: Applies personality layer to command results

The engine uses a deterministic seed based on system time and command hash, ensuring consistent responses for identical inputs while maintaining variance across sessions.

**Processing pipeline:**

```
Command Input
    |
    v
Command Executor
    |
    v
Raw Output
    |
    v
Context Analyzer
    |
    v
Mood State Check
    |
    v
Response Weighting
    |
    v
Commentary Generator
    |
    v
Output Formatter
    |
    v
Terminal Display
```

### Mood States

The personality engine maintains five discrete mood states:

**neutral** (default)
- Balanced response probability
- Standard verbosity
- No bias in commentary

**indifferent**
- Reduced commentary frequency
- Minimal responses preferred
- Higher threshold for output

**annoyed**
- Increased response brevity
- Slightly elevated sarcasm weight
- Lower patience for redundant commands

**curious**
- Extended output probability increased
- Additional context more likely
- Higher engagement with novel inputs

**resigned**
- Maximum brevity
- Commentary approaches zero
- Responses limited to essential information

State transitions occur based on interaction patterns, command frequency, and manual override.

### Response Determinism

While personality output appears varied, the system uses controlled randomization:

**Deterministic factors:**
- Command hash
- Current timestamp (minute precision)
- Mood state
- Recent command history

**Response selection:**

```
hash = SHA256(command + timestamp_minute)
index = hash % response_pool_size
selected_response = response_pool[index]
```

This ensures:
- Identical commands at the same time produce identical output
- Sufficient variance across different invocations
- Reproducible behavior for debugging
- No true randomness in production

### Verbosity Control

Commentary verbosity operates on three levels:

**low** (default)
- Single-line additions maximum
- Commentary appears in 20% of outputs
- Essential information only

**medium**
- Multi-line commentary permitted
- Appears in 40% of outputs
- Additional context included

**high**
- Extended commentary enabled
- Appears in 60% of outputs
- Detailed explanations and observations

Verbosity is configurable per-command or globally via `.zazurc`.

**Override example:**

```bash
zazu status --quiet  # forces verbosity=0
zazu status --verbose  # forces verbosity=high
```

---

## Configuration

### Configuration File

Zazu Terminal reads configuration from `~/.zazurc` at startup.

**Default configuration:**

```ini
# Zazu Terminal Configuration
# ~/.zazurc

[personality]
mood = neutral
verbosity = low
commentary_enabled = true
ascii_frequency = rare

[display]
theme = minimal
color_scheme = dark
prompt_style = compact
unicode_support = true

[behavior]
auto_update_check = false
command_history_size = 1000
response_timeout = 5000
error_handling = graceful

[advanced]
debug_mode = false
performance_logging = false
plugin_directory = ~/.zazu/plugins
```

### Theming

Themes control color palette, prompt format, and visual styling.

**Built-in themes:**

**minimal** (default)
```
Foreground: #e0e0e0
Background: #1a1a1a
Accent: #4a90e2
Dim: #666666
```

**classic**
```
Foreground: #00ff00
Background: #000000
Accent: #00ff00
Dim: #008800
```

**midnight**
```
Foreground: #c7c7c7
Background: #0a0e14
Accent: #39bae6
Dim: #4d5566
```

**nord**
```
Foreground: #d8dee9
Background: #2e3440
Accent: #88c0d0
Dim: #4c566a
```

**gruvbox**
```
Foreground: #ebdbb2
Background: #282828
Accent: #fabd2f
Dim: #928374
```

**Custom theme definition:**

Create `~/.zazu/themes/custom.theme`:

```json
{
  "name": "custom",
  "colors": {
    "foreground": "#ffffff",
    "background": "#000000",
    "accent": "#ff0000",
    "dim": "#666666",
    "success": "#00ff00",
    "warning": "#ffff00",
    "error": "#ff0000"
  },
  "prompt": {
    "format": "{{user}}@{{host}} {{dir}} >",
    "color": "accent"
  }
}
```

Apply with `zazu theme set custom`.

### Prompt Customization

Prompt format uses template syntax with system variables.

**Available variables:**

- `{{user}}`: Current username
- `{{host}}`: Hostname
- `{{dir}}`: Current directory
- `{{time}}`: Current time (HH:MM)
- `{{mood}}`: Current mood state
- `{{status}}`: Last exit code indicator

**Example configurations:**

**Compact (default):**
```
prompt_style = "{{user}} >"
```

**Standard:**
```
prompt_style = "{{user}}@{{host}} {{dir}} >"
```

**Detailed:**
```
prompt_style = "[{{time}}] {{user}}@{{host}}:{{dir}} [{{mood}}] >"
```

**Minimal:**
```
prompt_style = ">"
```

Configure via:
```bash
zazu config set prompt_style "[{{time}}] {{user}} >"
```

### Commentary Levels

Fine-grained control over personality layer output.

**Configuration options:**

```ini
[personality]
# Master toggle
commentary_enabled = true

# Frequency (0.0 - 1.0)
commentary_frequency = 0.2

# Per-command overrides
commentary_overrides = {
  "status": "always",
  "help": "never",
  "judge": "always",
  "ps": "rare"
}
```

**Levels:**
- `never`: No commentary (0%)
- `rare`: Minimal commentary (10%)
- `occasional`: Reduced commentary (20%)
- `normal`: Standard commentary (40%)
- `frequent`: Increased commentary (60%)
- `always`: Maximum commentary (100%)

---

## ASCII Identity

### Display Rules

ASCII art rendering is intentionally restricted to specific contexts:

**Triggers:**
- Initial session startup (5% probability)
- Error states requiring attention
- Explicit invocation via `zazu ascii`
- Major version updates
- Configuration reset

**Suppression:**
- Piped output
- Non-TTY environments
- Quiet mode enabled
- Terminal width < 80 columns

ASCII rendering respects `ZAZU_ASCII=false` environment variable for complete suppression.

### Example Rendering

```
     /\_/\
    ( o.o )
     > ^ <
```

Rendered size: 3 lines, 11 columns maximum.

Alternative compact form (1 line):

```
(=^..^=)
```

ASCII identity appears in startup banner:

```
$ zazu

     /\_/\
    ( o.o )
     > ^ <

zazu terminal v1.4.2
type 'zazu help' for commands
```

Subsequent sessions display minimal banner:

```
$ zazu

zazu terminal v1.4.2
```

---

## Extensibility

### Command Registration

Custom commands integrate via the plugin system.

**Command structure:**

Create `~/.zazu/plugins/custom_command.py`:

```python
from zazu.plugin import Command, register

@register
class CustomCommand(Command):
    name = "custom"
    description = "custom command implementation"
    
    def execute(self, args):
        # Command logic here
        return {
            "output": "custom output",
            "status": 0,
            "commentary": "optional commentary"
        }
    
    def validate(self, args):
        # Argument validation
        return True
```

Commands must implement:
- `name`: Unique command identifier
- `description`: Help text
- `execute(args)`: Main execution method
- `validate(args)`: Input validation

Return structure:
```python
{
    "output": str,        # Primary output
    "status": int,        # Exit code (0 = success)
    "commentary": str,    # Optional personality layer text
    "raw": bool          # Skip formatting if True
}
```

### Plugin Architecture

Plugins load at startup from configured directory.

**Plugin structure:**

```
~/.zazu/plugins/
├── __init__.py
├── custom_command.py
├── system_monitor.py
└── config.json
```

**Plugin configuration (`config.json`):**

```json
{
  "name": "custom-plugin",
  "version": "1.0.0",
  "commands": [
    "custom_command",
    "system_monitor"
  ],
  "dependencies": [],
  "enabled": true
}
```

**Loading order:**
1. Core commands
2. Plugin discovery
3. Command registration
4. Dependency resolution
5. Initialization hooks

**Initialization hook example:**

```python
from zazu.plugin import Plugin

class CustomPlugin(Plugin):
    def on_load(self):
        # Executed once during plugin load
        self.initialize_resources()
    
    def on_command(self, command_name):
        # Executed before command runs
        self.log(f"executing {command_name}")
    
    def on_shutdown(self):
        # Cleanup on exit
        self.release_resources()
```

### API Surface

Plugins access core functionality via the API:

**System interface:**

```python
from zazu.api import System

system = System()

# Process management
processes = system.get_processes()
cpu_usage = system.get_cpu_usage()
memory = system.get_memory_info()

# Environment
env_vars = system.get_environment()
user = system.get_current_user()
hostname = system.get_hostname()
```

**Personality interface:**

```python
from zazu.api import Personality

personality = Personality()

# State management
current_mood = personality.get_mood()
personality.set_mood("curious")

# Response generation
commentary = personality.generate_commentary(
    context="command_success",
    mood_override=None
)
```

**Configuration interface:**

```python
from zazu.api import Config

config = Config()

# Read configuration
theme = config.get("theme")
verbosity = config.get("personality.verbosity")

# Write configuration
config.set("custom.setting", "value")
config.save()
```

**Output interface:**

```python
from zazu.api import Output

output = Output()

# Formatted output
output.success("operation complete")
output.warning("potential issue detected")
output.error("operation failed")

# Raw output
output.write("unformatted text")
output.write_line("text with newline")

# Structured output
output.table([
    ["column1", "column2"],
    ["value1", "value2"]
])
```

Future API versions maintain backward compatibility within major releases.

---

## Philosophy

Software should be functional first and opinionated second.

Terminals remain the most efficient interface for technical work. Adding personality to this interface is valid only if it enhances rather than obstructs productivity.

Zazu Terminal exists because:

1. **Efficiency matters**: Command-line interfaces provide unmatched speed for experienced users
2. **Personality has value**: Minimal, well-executed personality improves user experience
3. **Restraint is essential**: Excessive commentary degrades utility

The project maintains three design principles:

**Function over form**  
Every feature must serve a practical purpose. Personality elements appear only when they do not interfere with core functionality.

**Signal over noise**  
Commentary remains minimal by default. Users should receive information, not distraction.

**Configurability over opinion**  
All personality features can be disabled. The tool adapts to the user, not vice versa.

This is a terminal tool that happens to have opinions, not an opinion delivery system disguised as a terminal tool.

---

## Contributing

Contributions are welcome. Follow these guidelines:

**Code standards:**
- Rust code follows `rustfmt` defaults
- Python code follows PEP 8
- Maximum line length: 100 characters
- Documentation required for public APIs

**Commit messages:**
```
type(scope): brief description

detailed explanation if necessary

- bullet points for changes
- reference issues with #123
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Testing requirements:**
- Unit tests for new functionality
- Integration tests for command additions
- Performance regression tests for core paths
- All tests must pass before merge

**Pull request process:**
1. Fork repository
2. Create feature branch
3. Implement changes with tests
4. Update documentation
5. Submit PR with description
6. Address review feedback
7. Await merge approval

**Code review criteria:**
- Functionality correctness
- Test coverage
- Documentation completeness
- Performance impact
- Design consistency

**Personality contributions:**

New commentary requires:
- Minimal verbosity (prefer single lines)
- Contextual relevance
- No pop culture references
- No memes or internet slang
- Dry tone preferred

Response pools should maintain variety without sacrificing restraint.

---

## License

MIT License

Copyright (c) 2024 Zazu Terminal Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

**Repository**: https://github.com/zazu-cli/zazu-terminal  
**Issues**: https://github.com/zazu-cli/zazu-terminal/issues  
**Documentation**: https://docs.zazu-cli.dev  
**Version**: 1.4.2  
**Last Updated**: 2024-01-18