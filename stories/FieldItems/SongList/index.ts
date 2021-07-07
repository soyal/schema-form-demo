import { FormItemSchema } from '../../../src/typings/schema';
import UploadWrapper from '../../components/UploadWrapper';
import songType from './SongType';
import songVersion from './SongVersion';

const schemaItem: FormItemSchema = {
  field: 'songList',
  label: '歌曲列表',
  component: {
    Element: UploadWrapper,
  },
  arrayOf: [songVersion, songType],
};

export default schemaItem;
