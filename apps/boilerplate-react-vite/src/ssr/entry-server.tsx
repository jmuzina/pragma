import Application from "../Application.js";

type Props = {
  lang?: string;
  scriptTags: string;
  linkTags: string;
};

function Shell({ lang = "en", scriptTags, linkTags }: Props) {
  return (
    <html lang={lang}>
      <head>
        <title>React Server Components</title>
        {scriptTags}
        {linkTags}
      </head>
      <body>
        <div id="root">
          <Application />
        </div>
      </body>
    </html>
  );
}

function EntryServer({ lang = "en", scriptTags, linkTags }: Props) {
  return <Shell lang={lang} scriptTags={scriptTags} linkTags={linkTags} />;
}

export default EntryServer;
