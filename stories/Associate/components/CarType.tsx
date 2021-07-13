/**
 * 车型
 */
import React, { useState, useEffect } from 'react';
import Select from 'antd/es/select';
import Input from 'antd/es/input';
import { FormItemProps } from '../../../src/typings/form';

const CarType: React.FC<FormItemProps> = ({ value, onChange }) => {
  const [brandList, setBrandList] = useState<{ id: string; name: string }[]>(
    []
  );
  const [brandValue, setBrandValue] = useState<string>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    new Promise((resolve) => {
      setTimeout(() => {
        const list = [
          {
            id: '1',
            name: '本田',
          },
          {
            id: '2',
            name: '宝马',
          },
          {
            id: '3',
            name: '奔驰',
          },
        ];
        setBrandList(list);
        setBrandValue(list[0].id);
        setLoading(false);
        resolve(true);
      }, 2000);
    });

    return () => {
      setLoading(false);
    };
  }, []);

  if (loading) return <div>loading...</div>;

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <Select
        value={brandValue}
        onChange={(_value) => {
          setBrandValue(_value);
          onChange(value, brandList.find((b) => b.id === _value))
        }}
        style={{
          width: 200,
        }}
      >
        {brandList.map((brand) => (
          <Select.Option value={brand.id} key={brand.id}>
            {brand.name}
          </Select.Option>
        ))}
      </Select>

      <Input
        placeholder="品牌描述"
        value={value}
        onChange={(e) => {
          onChange(
            e.target.value,
            brandList.find((b) => b.id === brandValue)
          );
        }}
      ></Input>
    </div>
  );
};

export default CarType;
