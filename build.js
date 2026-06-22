const esbuild = require("esbuild");
const { execSync } = require("child_process");
const { chmodSync, writeFileSync, copyFileSync } = require("fs");
const { join } = require("path");

esbuild
    .build({
        entryPoints: ["src/index.ts"],
        bundle: true,
        minify: true,
        treeShaking: true,
        platform: "node",
        target: "node18",
        outfile: "dist/labeled",
        banner: {
            js: "#!/usr/bin/env node",
        },
    })
    .then(() => {
        try {
            // 1. Ensure the plain text shebang bundle is executable
            chmodSync("dist/labeled", "755");
            console.log(
                "⚡ Production single-file shebang bundle created inside dist/",
            );

            console.log("🚀 Fusing native standalone binary...");

            // 2. Dynamically write the temporary sea-config.json file into the build path
            const configPath = join(__dirname, "sea-config.json");
            const configContent = {
                main: "dist/labeled",
                output: "dist/labeled-linux-x64", // Node bakes the bundle straight to this output filename
            };
            writeFileSync(configPath, JSON.stringify(configContent, null, 2));
            
            // 3. Clone your actual system's node engine binary as the target container
            // process.execPath points directly to the running node binary on the host system
            copyFileSync(process.execPath, "dist/labeled-linux-x64");

            // 4. Run the native Node compiler command to inject your app into the cloned binary
            execSync("node --build-sea sea-config.json");

            // 5. Grant execution permissions to the newly generated standalone binary
            chmodSync("dist/labeled-linux-x64", "755");
            console.log(
                "📦 Standalone zero-dependency native binary created: dist/labeled-linux-x64",
            );
        } catch (fsError) {
            console.error(
                "⚠️ Bundle created, but failed to automatically set executable permissions:",
                fsError,
            );
        }
    })
    .catch(() => process.exit(1));
