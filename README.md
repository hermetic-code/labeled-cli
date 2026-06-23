<p align="center">
  <img src="./assets/banner.png" alt="labeled CLI banner" width="100%">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/npm-labeled--cli-cb3837?style=for-the-badge&logo=npm&logoColor=white" alt="npm package name" />
  <img src="https://img.shields.io/badge/version-v0.1.1-blue?style=for-the-badge" alt="Current Version" />
  <img src="https://img.shields.io/badge/Node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/APT-Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white" alt="APT Supported" />
  <img src="https://img.shields.io/badge/Pacman-Arch-33AADD?style=for-the-badge&logo=arch-linux&logoColor=white" alt="Pacman Supported" />
  <img src="https://img.shields.io/badge/DNF5-Fedora-51A2DA?style=for-the-badge&logo=fedora&logoColor=white" alt="DNF Supported" />
</p>

<p align="center">
  <b><i>labeled</i></b> lets you group package installations under a custom label and safely remove them later using your system's native package manager. Instead of manually remembering every package you installed during troubleshooting, testing, or development, you can track them as a temporary session and clean them up in one command.
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

## Quick Start

See `labeled` in action as it bundles packages under a clean tracking session,
monitors the environment, and safely offloads them when no longer needed:

![labeled CLI Demo](./assets/demo.gif)

_Can't use the interactive demo? Jump straight to the [Usage Reference](#usage)
below._

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

- **Troubleshooting Sessions** — Test potential fixes from forum threads or
  issue trackers safely. If it doesn't work, wipe it out completely.

    ```bash
    labeled install wifi-fix wireless-tools firmware-iwlwifi
    labeled remove wifi-fix
    ```

- **Temporary Build Tools** — Pull down heavy compilers or development assets
  (`gcc`, `cmake`) just long enough to compile a project from source, then
  instantly free up your disk space.

    ```bash
    labeled install build-env gcc make cmake automake
    labeled remove build-env
    ```

- **Dependency Experiments** — Audit alternative runtimes or evaluate libraries
  locally without permanently cluttering your baseline system environment.
    ```bash
    labeled install node-test nodejs npm
    labeled remove node-test
    ```

---

<span id="usage"><span>

## Commands & Usage

```text
USAGE:
  labeled <command> [options]

COMMANDS:
  install <label> <pkgs...>    Install packages and index them under a label
  remove  <label>              Purge system packages associated with a label
  list                         Display all active labeled environments

ARGUMENTS:
  <label>    The target tracking identifier group
  <pkgs...>  Space-separated list of distro system packages
```

### Quick Examples

```bash
# Group and track a set of packages
labeled install audio-fix alsa-utils pavucontrol

# See your active tracking sessions
labeled list

# Safely purge the label and unneeded dependencies
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

## Contributing

We welcome community contributions! Please read our
[Contributing Guide](CONTRIBUTING.md) to learn how to set up your local
development environment, follow our coding standards, and submit pull requests.

---

## License

Custom License. See the [LICENSE](LICENSE) file for the full terms and usage
conditions.
