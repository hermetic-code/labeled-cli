const esbuild = require("esbuild");
const { chmodSync } = require("fs");

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
            chmodSync("dist/labeled", "755");
            console.log(
                "⚡ Production single-file shebang bundle created and made executable inside dist/!",
            );
        } catch (fsError) {
            console.error(
                "⚠️ Bundle created, but failed to automatically set executable permissions:",
                fsError,
            );
        }
    })
    .catch(() => process.exit(1));
