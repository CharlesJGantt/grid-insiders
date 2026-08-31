export function ArticleBody({ html }: { html: string }) {
  // eslint-disable-next-line react/no-danger -- content is our own build-time Markdown, not user input
  return <div className="grid-prose" dangerouslySetInnerHTML={{ __html: html }} />;
}
