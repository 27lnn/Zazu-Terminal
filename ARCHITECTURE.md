# Architecture

Zazu Terminal is split into two layers:

1. Command layer
   - Small, testable commands with consistent IO behavior.
   - Commands accept an execution context and raw argv.

2. Personality layer
   - Optional, restrained commentary that can be disabled.
   - Deterministic selection via hash-based picking.

The CLI entrypoint uses a minimal registry rather than a large command tree.
This keeps the surface area small and avoids leaky state.
