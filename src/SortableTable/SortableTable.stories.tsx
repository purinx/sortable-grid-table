import { DragHandleIcon } from '@chakra-ui/icons';
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
}

const init: Brand[] = [
  {
    position: 1,
    name: 'Facebook',
    logoUrl: '/facebook.jpg',
  },
  {
    position: 2,
    name: 'Instagram',
    logoUrl: '/instagram.jpeg'
  },
  {
    position: 3,
    name: 'Tiktok',
    logoUrl: '/tiktok.jpeg',
  },
  {
    position: 4,
    name: 'Twitter',
    logoUrl: '/twitter.jpeg'
  },
  {
    position: 5,
    name: 'ZOOM',
    logoUrl: '/zoom.png'
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
    <SortableTable
      cols={3}
      rowspan="150px"
      onDrop={onDrop}
      gridTemplateColumns="50px 200px auto"
    >
      <Header height="60px">
        <Cell></Cell>
        <Cell>Brand</Cell>
        <Cell>Logo</Cell>
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
        </SortableRow>
      ))}
    </SortableTable>
  )
}
