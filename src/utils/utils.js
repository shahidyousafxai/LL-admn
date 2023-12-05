import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import InsertLinkRoundedIcon from '@mui/icons-material/InsertLinkRounded';
import FormatBoldRoundedIcon from '@mui/icons-material/FormatBoldRounded';
import FormatItalicRoundedIcon from '@mui/icons-material/FormatItalicRounded';
import FormatUnderlinedRoundedIcon from '@mui/icons-material/FormatUnderlinedRounded';
import FormatAlignLeftRoundedIcon from '@mui/icons-material/FormatAlignLeftRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import { gray } from './style/GlobalVariables';

export const toolBar = [
  {
    exeCmd: 'insertImage',
    icon: <ImageRoundedIcon fontSize='medium' sx={{ color: gray }} />,
    tooltip: 'Image',
    show: false,
    absence: null,
    onClick: () => {}, // Optional,
  },
  {
    exeCmd: 'insertVideo',
    icon: <VideocamRoundedIcon fontSize='medium' sx={{ color: gray }} />,
    tooltip: 'Video',
    show: false,
    absence: null,
    onClick: () => {}, // Optional,
  },
  {
    exeCmd: 'createLink',
    icon: <InsertLinkRoundedIcon fontSize='medium' sx={{ color: gray }} />,
    tooltip: 'Link',
    show: false,
    absence: null,
    onClick: () => {}, // Optional,
  },
  {
    exeCmd: 'bold',
    icon: <FormatBoldRoundedIcon fontSize='medium' sx={{ color: gray }} />,
    tooltip: 'Bold',
    show: false,
    absence: null,
    onClick: () => {}, // Optional,
  },
  {
    exeCmd: 'italic',
    icon: <FormatItalicRoundedIcon fontSize='medium' sx={{ color: gray }} />,
    tooltip: 'Italic',
    show: false,
    absence: null,
    onClick: () => {}, // Optional,
  },
  {
    exeCmd: 'underline',
    icon: (
      <FormatUnderlinedRoundedIcon fontSize='medium' sx={{ color: gray }} />
    ),
    tooltip: 'Underline',
    show: false,
    absence: null,
    onClick: () => {}, // Optional,
  },
  {
    exeCmd: 'justifyLeft',
    icon: <FormatAlignLeftRoundedIcon fontSize='medium' sx={{ color: gray }} />,
    tooltip: 'Align Left',
    show: false,
    absence: null,
    onClick: () => {}, // Optional,
  },
  {
    exeCmd: 'justifyCenter',
    icon: <FormatAlignCenterIcon fontSize='medium' sx={{ color: gray }} />,
    tooltip: 'Align Left',
    show: false,
    absence: null,
    onClick: () => {}, // Optional,
  },
  {
    exeCmd: 'justifyRight',
    icon: <FormatAlignRightIcon fontSize='medium' sx={{ color: gray }} />,
    tooltip: 'Align Right',
    show: false,
    absence: null,
    onClick: () => {}, // Optional,
  },
  {
    exeCmd: 'insertUnorderedList',
    icon: (
      <FormatListBulletedRoundedIcon fontSize='small' sx={{ color: gray }} />
    ),
    tooltip: 'Bulleted List',
    show: false,
    absence: '',
    onClick: () => {}, // Optional,
  },
];

export const imageSizeList = [
  { name: 'Default', value: 'default', id: 1 },
  { name: 'Custom', value: 'custom', id: 2 },
];

export const fontSizeList = [
  { label: 'Size', value: '' },
  { label: '8px', value: '8px' },
  { label: '10px', value: '10px' },
  { label: '12px', value: '12px' },
  { label: '14px', value: '14px' },
  { label: '16px', value: '16px' },
  { label: '18px', value: '18px' },
  { label: '20px', value: '20px' },
  { label: '22px', value: '22px' },
  { label: '24px', value: '24px' },
  { label: '28px', value: '28px' },
  { label: '30px', value: '30px' },
  { label: '32px', value: '32px' },
  { label: '34px', value: '34px' },
  { label: '36px', value: '36px' },
  { label: '38px', value: '38px' },
  { label: '40px', value: '40px' },
  { label: '42px', value: '42px' },
  { label: '44px', value: '44px' },
  { label: '46px', value: '46px' },
  { label: '48px', value: '48px' },
];

export function LinkPopover({ onLinkAdded, onClose, position, url, setUrl }) {
  const handleAddLink = () => {
    if (url) {
      onLinkAdded(url);
    }
    setUrl('');
  };

  return (
    <div
      className={`bg-white border p-4 rounded shadow-lg `}
      style={{ position: 'absolute', top: position.y, left: position.x }}
    >
      <input
        className='mb-2 border p-2 rounded w-full'
        type='text'
        placeholder='Enter URL'
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2'
        onClick={handleAddLink}
      >
        Save
      </button>
      <button
        className='bg-gray-300 hover-bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded'
        onClick={onClose}
      >
        Cancel
      </button>
    </div>
  );
}
