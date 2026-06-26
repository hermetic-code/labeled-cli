export default function section(title: string): void {
    const DIM = '\x1b[2m';
    const BOLD = '\x1b[1m';
    const RESET = '\x1b[0m';

    const brand = 'labeled • ';
    const plainTextLength = brand.length + title.length;

    // Lock the box padding dynamically to match your text length, keeping a sensible minimum width
    const boxWidth = Math.max(plainTextLength + 4, 50);
    const divider = DIM + '━'.repeat(boxWidth) + RESET;

    console.log(`\n${divider}`);
    console.log(`  ${BOLD}${brand}${RESET}${title}`);
    console.log(`${divider}\n`);
}
