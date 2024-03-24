import { Suspense } from 'react';

import { BookListItem } from '../../../features/book/components/BookListItem';
import { useBookList } from '../../../features/book/hooks/useBookList';
import { Flex } from '../../../foundation/components/Flex';
import { Text } from '../../../foundation/components/Text';
import { Color, Typography } from '../../../foundation/styles/variables';

type Props = {
  keyword: string;
};

const SearchResultItems: React.FC<Props> = ({ keyword }) => {
  const { data: relatedBooks } = useBookList({
    query: {
      name: keyword,
    },
  });
  return (
    <>
      {relatedBooks && relatedBooks.map((book) => <BookListItem key={book.id} book={book} />)}
      {relatedBooks.length === 0 && (
        <Text color={Color.MONO_100} typography={Typography.NORMAL14}>
          関連作品は見つかりませんでした
        </Text>
      )}
    </>
  );
};

export const SearchResult: React.FC<Props> = ({ keyword }) => {
  return (
    <Flex align="center" as="ul" direction="column" justify="center">
      <Suspense
        fallback={
          <Text color={Color.MONO_100} typography={Typography.NORMAL14}>
            「{keyword}」を検索中...
          </Text>
        }
      >
        <SearchResultItems keyword={keyword} />
      </Suspense>
    </Flex>
  );
};
