import React, { useState } from 'react';
import { FormArrayOfWrapper } from '../../../src/typings/form';
import Button from 'antd/es/button';

const FieldWrapper: React.FC<FormArrayOfWrapper> = ({
  children,
  add,
  remove,
  value,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <div
        style={{
          width: 300,
        }}
      >
        <h3>上传的作品列表</h3>
        <ul
          style={{
            paddingLeft: 0,
          }}
        >
          {value.map((valueItem, index) => (
            <li
              key={index}
              onClick={() => {
                setActiveIndex(index);
              }}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                border: '1px solid #999',
                background: index === activeIndex ? '#acacac' : '#eee',
                cursor: 'pointer',
              }}
            >
              <span>歌曲{index}</span>
              <a
                onClick={() => {
                  remove(index);
                }}
                style={{
                  color: 'red',
                }}
              >
                删除歌曲
              </a>
            </li>
          ))}
        </ul>
        <div>
          <Button
            onClick={() => {
              add({});
            }}
          >
            上传歌曲
          </Button>
        </div>
      </div>

      <div
        style={{
          marginLeft: 100,
          flexGrow: 1,
        }}
      >
        {children.length > 0 ? (
          children.map((child, index) => {
            return (
              <div
                key={index}
                style={{
                  padding: 30,
                  border: '1px solid #ccc',
                  display: index === activeIndex ? 'block' : 'none',
                }}
              >
                {child}
              </div>
            );
          })
        ) : (
          <div>无上传歌曲</div>
        )}
      </div>
    </div>
  );
};

export default FieldWrapper;
