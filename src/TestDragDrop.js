import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ItemTypes = { ITEM: 'ITEM' };

const Box = ({ id }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.ITEM,
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, margin: 10, width: 100, height: 100, backgroundColor: 'lightblue' }}>
      Box {id}
    </div>
  );
};

const Container = () => {
  const [, drop] = useDrop({
    accept: ItemTypes.ITEM,
    drop: (item) => console.log('Item dropped:', item),  // Log when the drop happens
  });

  return (
    <div ref={drop} style={{ height: 200, width: 400, border: '2px dashed black' }}>
      Drop here
    </div>
  );
};

const TestDragDrop = () => {
  return (
    <div>
      <h1>TestDragDrop</h1>
      <Container />
      <Box id={1} />
      <Box id={2} />
    </div>
  );
};

export default TestDragDrop;
