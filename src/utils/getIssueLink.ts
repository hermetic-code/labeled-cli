export default function getIssueLink(
    type: string,
    title: string,
    body: string,
): string {
    return (
        encodeURI(
            `http://github.com/hermetic-code/labeled-cli/issues/new?title=[${type.toUpperCase()}]: `,
        ) +
        encodeURIComponent(title.toUpperCase()) +
        "&body=" +
        encodeURIComponent(body)
    );
}
