import { DragHandleIcon } from '@chakra-ui/icons';
import { chakra } from '@chakra-ui/system';
import React, { useCallback, useState } from 'react';
import { getPosition } from '../lib/getPosition';

import SortableTable, { Cell, Header, SortableRow } from './index';

export default {
  title: 'components/SortableTable',
  component: Component
}

type Brand = {
  position: number;
  logoUrl: string;
  name: string;
  link: string;
}

const init: Brand[] = [
  {
    position: 1,
    name: 'Facebook',
    logoUrl: 'https://higherkingpud.github.io/sortable-grid-table/facebook.jpg',
    link: 'https://www.facebook.com'
  },
  {
    position: 2,
    name: 'Instagram',
    logoUrl: 'https://higherkingpud.github.io/sortable-grid-table/instagram.jpeg',
    link: 'https://www.instagram.com',
  },
  {
    position: 3,
    name: 'Tiktok',
    logoUrl: 'https://higherkingpud.github.io/sortable-grid-table/tiktok.jpeg',
    link: 'https://www.tiktok.com'
  },
  {
    position: 4,
    name: 'Twitter',
    logoUrl: 'https://higherkingpud.github.io/sortable-grid-table/twitter.jpeg',
    link: 'https://twitter.com'
  },
  {
    position: 5,
    name: 'ZOOM',
    logoUrl: 'https://higherkingpud.github.io/sortable-grid-table/zoom.png',
    link: 'https://zoom.us'
  }
]

export function Component() {
  const [sorted, setSorted] = useState<Brand[]>(init);
  
  const onDrop = useCallback((dragged: number, dropped: number) => {
    setSorted(
      prev => prev.map(
        (brand, index) => ({
          ...brand,
          position: getPosition(index + 1, dragged, dropped)
        })
      )
      .sort((a, b) => a.position > b.position ? 1 : -1)
    )
  }, [])
  
  return (
    <chakra.div minWidth="800px">
      <SortableTable
        cols={4}
        rowspan="150px"
        onDrop={onDrop}
        gridTemplateColumns="100px 200px 300px 1fr"
      >
        <Header height="60px">
          <Cell></Cell>
          <Cell>Brand</Cell>
          <Cell>Logo</Cell>
          <Cell>Link</Cell>
        </Header>
        {sorted.map((brand, index) => (
          <SortableRow index={index + 1} key={index}>
            <Cell
              _hover={{ cursor: 'grab' }}
              sx={{ 'svg': { margin: 'auto' } }}
            >
              <DragHandleIcon />
            </Cell>
            <Cell>{brand.name}</Cell>
            <Cell sx={{ 'img': { maxHeight: '130px' } }}>
              <img src={brand.logoUrl} alt={brand.name} />
            </Cell>
            <Cell sx={{ 'a': { textDecoration: 'underline', color: 'blue' } }}>
              <a href={brand.link}>{brand.link}</a>
            </Cell>
          </SortableRow>
        ))}
      </SortableTable>
    </chakra.div>
  );
}
