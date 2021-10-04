import { chakra, ChakraComponent, Grid } from '@chakra-ui/react';
import React, {
  Dispatch,
  SetStateAction,
  ReactNode,
  CSSProperties,
  createContext,
  useState,
  useContext,
  useEffect,
} from 'react';

type SortableContextValue = {
  crossing?: number;
  dragging?: number;
  onDrop?: (from: number, to: number) => void;
  rowspan?: string;
  setCrossing?: Dispatch<SetStateAction<number | undefined>>;
  setDragging?: Dispatch<SetStateAction<number | undefined>>;
};

const SortableContext = createContext<SortableContextValue>({});

type Props = {
  children: ReactNode;
  cols: number;
  gridTemplateColumns?: string;
  onDrop: (from: number, to: number) => void;
  rowspan?: string;
  style?: CSSProperties;
};

export default function SortableTable({
  children,
  cols,
  gridTemplateColumns = `repeat(${cols}, auto)`,
  onDrop,
  rowspan = '52px',
  style,
}: Props) {
  const [dragging, setDragging] = useState<number>();
  const [crossing, setCrossing] = useState<number>();

  return (
    <SortableContext.Provider
      value={{
        crossing,
        dragging,
        onDrop,
        rowspan,
        setCrossing,
        setDragging,
      }}
    >
      <Grid
        border="1px solid #ccc"
        className="table"
        gridTemplateColumns="auto"
        gridTemplateRows={`60px repeat(auto-fill, ${rowspan})`}
        marginTop="20px"
        style={style}
        sx={{
          '> div': {
            gridTemplateColumns,
          },
        }}
        verticalAlign="bottom"
        width="100%"
      >
        {children}
      </Grid>
    </SortableContext.Provider>
  );
}

export const Header: ChakraComponent<'div'> = (props) => (
  <Row
    className="header"
    {...props}
    sx={{
      '> div': {
        height: props.height,
        borderBottom: '4px double #ccc',
        color: 'black',
        display: 'flex',
        fontSize: '14px',
        fontWeight: 'bold',
      },
    }}
  />
);

/**
 * @param index 1base
 */
export const SortableRow: ChakraComponent<'div', { index: number }> = ({
  index,
  ...props
}) => {
  const {
    crossing = 0,
    dragging = 0,
    onDrop,
    rowspan,
    setCrossing,
    setDragging,
  } = useContext(SortableContext);
  const [transform, setTransform] = useState<string>();

  useEffect(() => {
    if (dragging === 0) {
      setTransform(undefined);
    }
  }, [dragging]);

  return (
    <Row
      height={rowspan}
      transform={transform}
      transition=".2s"
      draggable
      onDragEnd={() => {
        onDrop?.(dragging, crossing);
        setDragging?.(undefined);
        setCrossing?.(undefined);
      }}
      onDragEnter={() => {
        if (dragging === index) return;
        if (transform) {
          setTransform(undefined);
          setCrossing?.(undefined);
          return;
        }
        setCrossing?.(index);
        setTransform(
          dragging > index ? `translateY(${rowspan})` : `translateY(-${rowspan})`
        );
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDragStart={() => {
        setDragging?.(index);
      }}
      {...props}
    />
  );
};

const Row = chakra('div', {
  baseStyle: {
    display: 'grid',
    'div + div': {
      borderLeft: 'none',
    }
  },
});

export const Cell = chakra('div', {
  baseStyle: {
    alignItems: 'center',
    borderBottom: '1px solid #ccc',
    display: 'flex',
    padding: '10px',
  },
});
