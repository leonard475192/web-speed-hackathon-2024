import fs from 'node:fs/promises';

import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';

import { ClientApp } from '@wsh-2024/app/src/index';

import { INDEX_HTML_PATH } from '../../constants/paths';

const app = new Hono();

async function createHTML({ body }: { body: string }): Promise<string> {
  const htmlContent = await fs.readFile(INDEX_HTML_PATH, 'utf-8');

  const content = htmlContent.replaceAll('<div id="root"></div>', `<div id="root">${body}</div>`);
  return content;
}

app.get('*', async (c) => {
  try {
    const body = ReactDOMServer.renderToString(
      <StaticRouter location={c.req.path}>
        <ClientApp />
      </StaticRouter>,
    );

    const html = await createHTML({ body });

    return c.html(html);
  } catch (cause) {
    throw new HTTPException(500, { cause, message: 'SSR error.' });
  }
});

export { app as ssrApp };
