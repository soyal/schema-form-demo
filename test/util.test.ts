import { setValue, getValue } from '../src/util';

describe('src/util', () => {
  it('getValue', () => {
    const obj = { a: { b: { c: 1, e: [1] } } };
    expect(getValue(obj, 'a.b.c') === 1);
    expect(getValue(obj, 'a.d') === null);
    expect(getValue(obj, 'a.b.e.0') === 1);
  });

  it('setValue', () => {
    const obj: any = {};
    const key = 'songList.0.albumType';
    setValue(obj, key, 'origin');
    expect(obj.songList[0].albumType === 'origin');
  });
});
