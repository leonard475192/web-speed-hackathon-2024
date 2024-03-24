import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { init as ucaInit } from 'unicode-collation-algorithm2';

import { GetBookListRequestQuerySchema } from '@wsh-2024/schema/src/api/books/GetBookListRequestQuery';
import { GetBookListResponseSchema } from '@wsh-2024/schema/src/api/books/GetBookListResponse';

import { isContains } from '../../../lib/filter/isContains';
import { bookRepository } from '../../../repositories';

ucaInit();

const app = new OpenAPIHono();

const route = createRoute({
  method: 'get',
  path: '/api/v1/books',
  request: {
    query: GetBookListRequestQuerySchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: GetBookListResponseSchema,
        },
      },
      description: 'Get book list.',
    },
  },
  tags: ['[App] Books API'],
});

app.openapi(route, async (c) => {
  const query = c.req.valid('query');
  const res = await bookRepository.readAll({ query });

  if (res.isErr()) {
    throw res.error;
  }
  if (query.name) {
    const keyword = query.name;
    const filteredRes = res.value.filter((book) => {
      return isContains({ query: keyword, target: book.name }) || isContains({ query: keyword, target: book.nameRuby });
    });
    return c.json(filteredRes);
  }
  return c.json(res.value);
});

export { app as getBookListApp };
