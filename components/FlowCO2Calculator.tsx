/* eslint-disable */

import React, { memo, useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  Background,
  Controls,
  addEdge,
  Handle,
  Node,
  Position,
  Edge
} from 'react-flow-renderer';

const SliderNode = memo<any>(({ data, id }) => {
  const onChange = useCallback(event => data.onChange(event, id), [data, id]);

  const valueTextMap = ['kein', 'wenig', 'viel', 'sehr viel'];
  const typeTextMap = {
    meat: {
      icon: '🐄',
      iconNone: '🌱',
      start: 'Ich esse',
      end: 'Fleisch'
    },
    paper: {
      icon: '📄',
      iconNone: '🧑‍💻',
      start: 'Ich verbrauche',
      end: 'Papier'
    },
    car: {
      icon: '🚗',
      iconNone: '🚴‍♂️',
      start: 'Ich fahre',
      end: 'Auto'
    }
  };

  return (
    <div className="bg-gray-50 p-2 shadow-lg rounded border-gray-600 border-solid border-2">
      <Handle type="source" position={Position.Right} />
      <div>
        <p className="w-full text-center">
          {data.value > 0 ? (
            Array(Number(data.value)).fill(
              <span className="mx-2 text-2xl">
                {typeTextMap[data.type].icon}
              </span>
            )
          ) : (
            <span className="mx-2 text-2xl">
              {typeTextMap[data.type].iconNone}
            </span>
          )}
        </p>
        {typeTextMap[data.type].start}{' '}
        <strong>{valueTextMap[data.value]}</strong> {typeTextMap[data.type].end}
      </div>
      <input
        type="range"
        className="nodrag"
        onChange={onChange}
        defaultValue={data.value}
        min={0}
        max={3}
      />
    </div>
  );
});

const CO2Node = memo<any>(({ data }) => {
  const textMap = ['sehr wenig', 'wenig', 'viel', 'sehr viel'];

  return (
    <div className="p-2 shadow-lg rounded border-gray-600 border-solid border-2 bg-gray-800 text-white">
      <Handle type="target" position={Position.Left} />
      <div>
        <p className="w-full text-center">
          {data.value > 0 ? (
            Array(Number(Math.ceil(data.value / 3))).fill(
              <span className="mx-2 text-2xl">🏭</span>
            )
          ) : (
            <span className="mx-2 text-2xl">🌳</span>
          )}
        </p>
      </div>
      {data.value !== undefined ? (
        <p>
          Du verbrauchst <strong>{textMap[Math.ceil(data.value / 3)]}</strong>{' '}
          CO₂
        </p>
      ) : (
        <p>Verschiebe die Regler um deinen CO₂ Ausstoß zu messen</p>
      )}
    </div>
  );
});

const FlowCO2Calculator = () => {
  const [elements, setElements] = useState<(Node | Edge)[]>([]);

  const nodeTypes = {
    selectorNode: SliderNode,
    co2Node: CO2Node
  };

  useEffect(() => {
    const onChange = (event, id) => {
      setElements(els => {
        const nextElements = els.map(e => {
          if (e.id !== id) {
            return e;
          }

          const value = event.target.value;

          return {
            ...e,
            data: {
              ...e.data,
              value
            }
          };
        });

        const reducer = (accumulator, currentValue) =>
          Number(accumulator) + Number(currentValue.data.value);

        const co2sum = nextElements
          .filter(n => n.type === 'selectorNode')
          .reduce(reducer, 0);

        const updatedArray = nextElements.map(n => {
          if (n.id == '4') {
            return {
              ...n,
              data: {
                ...n.data,
                value: co2sum
              }
            };
          }
          return n;
        });

        return updatedArray;
      });
    };

    const initialElements: (Node | Edge)[] = [
      {
        id: '1',
        type: 'selectorNode',
        data: { onChange, value: 0, type: 'meat' },
        position: { x: 100, y: 25 },
        sourcePosition: Position.Right
      },
      {
        id: '2',
        type: 'selectorNode',
        data: { onChange, value: 2, type: 'paper' },
        position: { x: 200, y: 150 },
        sourcePosition: Position.Right
      },
      {
        id: '3',
        type: 'selectorNode',
        data: { onChange, value: 1, type: 'car' },
        position: { x: 300, y: 275 },
        sourcePosition: Position.Right
      },
      {
        id: '4',
        type: 'co2Node',
        data: {
          label: undefined
        },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
        position: { x: 700, y: 150 }
      },
      { id: 'e1-4', source: '1', target: '4', animated: true },
      { id: 'e2-4', source: '2', target: '4', animated: true },
      { id: 'e3-4', source: '3', target: '4', animated: true }
    ];

    setElements(initialElements);
  }, []);

  return (
    <ReactFlowProvider>
      <ReactFlow elements={elements} nodeTypes={nodeTypes}></ReactFlow>
    </ReactFlowProvider>
  );
};

export default FlowCO2Calculator;
