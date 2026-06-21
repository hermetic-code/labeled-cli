<p align="center">
  <img src="./assets/banner.png" alt="labeled CLI banner" width="100%">
</p>

<p align="center">
</p>

<p align="center">
A cross-distro package tracking wrapper for Linux. <br>
`labeled` lets you group package installations under a custom label and safely remove them later using your system's native package manager. <br>
Instead of manually remembering every package you installed during troubleshooting, testing, or development, you can track them as a temporary session and clean them up in one command.
</p>

<p align="center">
</p>

---

## Why?

Package managers like APT, DNF, and Pacman track dependencies well, but they
don't help when you're experimenting.

A typical workflow looks like:

```bash
sudo apt install pavucontrol alsa-utils
sudo apt install pulseaudio-utils
sudo apt install jackd2
```

A few hours later:

- You no longer need most of those packages.
- You don't remember what you installed.
- `autoremove` won't remove them because they're marked as explicitly installed.

Over time, temporary experiments become permanent system clutter.

`labeled` solves this by tracking those installations under a named session.

---

## Quick Example

Install packages under a label:

```bash
labeled install --label [label_name] <packages>
```

View tracked sessions:

```bash
labeled list
```

Output:

```text
LABEL         MANAGER   DATE                  PACKAGES
------------------------------------------------------
audio-fix     apt       2026-06-21 18:30:12   alsa-utils, pavucontrol
```

Remove the session:

```bash
labeled remove audio-fix
```

`labeled` safely returns those packages to automatic dependency status and lets
your package manager remove anything that is no longer needed.

---

## Installation

### npm

```bash
npm install -g labeled-cli
```

### Verify

```bash
labeled --help
```

---
## Common Use Cases

### Troubleshooting Sessions

Testing multiple fixes from forum posts, documentation, or issue trackers:

```bash
labeled install --label wifi-fix wireless-tools firmware-iwlwifi
```

If the fix fails:

```bash
labeled remove wifi-fix
```

### Temporary Build Dependencies

Installing compilers and development tools only for a single build:

```bash
labeled install --label build-env gcc make cmake automake
```

After the build completes:

```bash
labeled remove build-env
```

### Dependency Experiments

Trying alternative libraries or runtimes without permanently modifying your
system.

```bash
labeled install --label node-test nodejs npm
```

Remove everything when you're done:

```bash
labeled remove node-test
```

---
## Commands

### Install

```bash
labeled install --label [label_name] <packages>
```

Example:

```bash
labeled install --label audio-fix alsa-utils pavucontrol
```

### List

```bash
labeled list
```

Displays all tracked sessions.

### Remove

```bash
labeled remove <label>
```

Example:

```bash
labeled remove audio-fix
```

---
## How It Works

`labeled` acts as a thin wrapper around your system package manager.

When packages are installed under a label:

1. The package manager performs the installation.
2. `labeled` records the package list and metadata.
3. Packages remain fully managed by the native package manager.

When a label is removed:

1. `labeled` loads the recorded package set.
2. Packages are returned to automatic dependency status.
3. The package manager performs an autoremove operation.
4. Shared dependencies required by other software are preserved.

This approach minimizes the risk of accidentally removing packages still needed
elsewhere on the system.

---
## Supported Package Managers

| Package Manager | Distribution                         |
| --------------- | ------------------------------------ |
| APT             | Debian, Ubuntu, Linux Mint, Pop!\_OS |
| DNF / DNF5      | Fedora, RHEL                         |
| Pacman          | Arch Linux, Manjaro                  |

Package manager detection is automatic.

---
## Requirements

- Node.js 18 or newer
- Linux
- A supported package manager

---
## License

MIT License.
