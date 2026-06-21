# 🏷️ labeled

A lightweight, cross-distro transactional package wrapper designed to group,
track, and cleanly purge temporary Linux installations.

Whether you are testing experimental fixes, compiling code from source, or
debugging system dependencies, `labeled` lets you mark your installations under
a session name so you can wipe them out completely in one go, without leaving
orphan clutter behind.

---

## 🔍 What Problem It Solves

Traditional Linux package managers (`apt`, `dnf`, `pacman`) are fantastic at
tracking _automated_ dependencies, but they fail during manual troubleshooting
or experimentation.

When you manually type `sudo apt install` or `sudo dnf install` to run a test,
the package manager permanently flags those packages as "Explicitly Installed by
the User." Even if you run `autoremove` later, the system assumes you want to
keep those packages forever. Over time, your system accumulates hundreds of
megabytes of forgotten troubleshooting clutter.

### Scenario 1: The Infinite Troubleshooting Loop

Your system audio suddenly stops working. You search online and find a forum
thread suggesting you install `alsa-utils`, `jackd2`, and `pavucontrol` to test
a fix. It doesn't work. You find a second guide that tells you to install
`pulseaudio-utils` and `pavumeter`. That doesn't work either. By the time you
find the correct fix on the 4th attempt, your system is bloated with a dozen
audio utilities you don't need, and you can't remember which ones were
originally there and which ones you added.

### Scenario 2: The Temporary Build Environment

You download an open-source tool from GitHub that you need to compile from
source. To run the build, you are forced to install `gcc`, `make`, `cmake`,
`libssl-dev`, and `automake`. Once the software successfully compiles and
installs into your local bin, those hundreds of megabytes of compiling tools are
dead weight. Removing them manually means tracking down a massive list of
individual package names.

---

## 💡 How `labeled` Solves It

`labeled` acts as a wrapper. It executes your native package manager to install
what you need, but logs the action into a centralized, structured timeline under
a custom string label.

Instead of directly deleting tracked packages when you want to clean up (which
risks breaking shared dependencies used by other programs), `labeled` uses a
**Strategy Pattern** to dynamically interact with your package manager's
backend:

1. It looks up your custom label block.
2. It changes the state of those packages from "User Explicit" back to
   **"Automatic Dependency"**.
3. It triggers a system-wide `autoremove` safety sweep.

If another application on your system has started relying on one of those
packages in the meantime, the system safely leaves it behind. If nothing else is
using them, they are cleanly nuked from your hard drive along with their
specific configurations.

### Use Case 1: Cleaning up failed experiments

You group all packages under a single experimental label. If the fix fails, you
command `labeled` to tear the session down. The entire experiment is undone like
a localized system restore point.

### Use Case 2: Multi-Manager scaling

Because `labeled` organizes your logs by label _and then_ by package manager,
you can test an `apt` fix, fail, try a native alternative, and track them both
under the exact same session identity. When you delete the label, `labeled`
cleanly iterates through every package manager involved in that session and
triggers sequential cleanups.

---

## 🛠️ Prerequisites & Installation Guide

### Prerequisites

`labeled` requires **Node.js** (v18+) to run. Ensure your system has it
installed:

- **Ubuntu/Debian:** `sudo apt install nodejs`
- **Fedora/RHEL:** `sudo dnf install nodejs`
- **Arch Linux:** `sudo pacman -S nodejs`

### Installation

1. Clone or download the script file to your machine.
2. Make the file executable:

    ```bash
    chmod +x labeled
    ```

3. Move it to your local system path to make it accessible globally from any
   directory:
    ```bash
    sudo mv labeled /usr/local/bin/labeled

    ```

---

## 🚀 How to Use

`labeled` features an explicit, natural syntax framework.

### 1. Install Packages Under a Label

To install temporary packages, group them under a designated label name.

```bash
labeled install <label_name> <package1> <package2> ...

```

**Example:**

```bash
labeled install wifi-fix wireless-tools firmware-iwlwifi

```

### 2. List Active Tracking Sessions

To view all open labels, timestamps, package managers utilized, and package
payloads currently being tracked on your system:

```bash
labeled list

```

**Example Output:**

```text
LABEL                MANAGER    DATE                 PACKAGES
----------------------------------------------------------------------
wifi-fix             dnf        2026-06-21 18:30:12  wireless-tools, firmware-iwlwifi

```

### 3. Remove/Nuke Everything Under a Label

When you are done experimenting and want to safely restore your system state:

```bash
labeled remove <label_name>

```

**Example:**

```bash
labeled remove wifi-fix

```

---

## ⚙️ Supported Package Managers

`labeled` features native auto-detection capabilities for:

- **APT** (Debian, Ubuntu, Linux Mint, Pop!\_OS)
- **DNF / DNF5** (Fedora, RHEL)
- **Pacman** (Arch Linux, Manjaro)

## 📄 License

Distributed under the MIT License. Feel free to modify and share!
