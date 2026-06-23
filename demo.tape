# Output file location
Output assets/demo.gif

# Visual Settings tailored for an elegant terminal look
Set FontSize 16
Set Width 1200
Set Height 600
Set Theme "Dracula"
Set Padding 20

# --- The Recording Sequence ---

# 1. Install packages under a tracking label
Type "labeled install audio-fix alsa-utils pavucontrol"
Sleep 500ms
Enter
Sleep 4s

Type "1@3$"
Enter
Sleep 4s

Type "Y"
Sleep 500ms
Enter
Sleep 8s

# 2. Clear terminal layout space
Type "clear"
Enter
Sleep 500ms

# 3. View the active tracking session matrix
Type "labeled list"
Sleep 500ms
Enter
Sleep 4s

# 4. Clear the layout space again
Type "clear"
Enter
Sleep 500ms

# 5. Remove the session to trigger the DNF5 autoremove sequence
Type "labeled remove audio-fix"
Sleep 500ms
Enter
Sleep 4s

# 6. Simulate confirming the interactive DNF prompt
Type "Y"
Sleep 500ms
Enter
Sleep 4s

Type "Y"
Sleep 500ms
Enter
Sleep 4s