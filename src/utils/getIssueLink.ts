export default function getIssueLink(
    type: string,
    title: string,
    body: string,
): string {
    const BOLD = "\x1b[1m";
    const BLUE = "\x1b[34m";
    const RESET = "\x1b[0m";

    const rawUrl = 
        encodeURI(`https://github.com/hermetic-code/labeled-cli/issues/new?title=[${type.toUpperCase()}]: `) +
        encodeURIComponent(title.toUpperCase()) +
        "&body=" +
        encodeURIComponent(body);

    // Clean, minimalist terminal hyperlink text
    const clickableAnchor = `\x1b]8;;${rawUrl}\x1b\\[ Submit Bug Report: ${BOLD}${BLUE}github.com/hermetic-code/labeled-cli${RESET} ]\x1b]8;;\x1b\\`;

    return clickableAnchor;
}