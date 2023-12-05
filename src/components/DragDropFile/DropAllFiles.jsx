import { Styles } from '../../utils/style/GlobalStyles';
import {
  gray,
  red,
  secondaryColor,
  primaryColor,
  yellow,
} from '../../utils/style/GlobalVariables';

export default ({
  video,
  image,
  label,
  onDrop,
  onChange,
  onClick,
  error,
  accept,
}) => {
  const onDragOver = (e) => {
    console.log('onDragOver');
    e.preventDefault();
    let ele = document.getElementById('dropzone-file-label');
    ele.style.backgroundColor = primaryColor;
    ele.style.borderColor = yellow;
  };
  const onDragLeave = (e) => {
    e.preventDefault();
    let ele = document.getElementById('dropzone-file-label');
    ele.style.backgroundColor = secondaryColor;
    ele.style.borderColor = gray;
  };
  return (
    <>
      <div className='flex flex-col justify-center w-full'>
        <div style={Styles.smallTextWhite} className='mb-1 mt-5'>
          {label}
        </div>
        <label
          htmlFor='dropzone-file'
          id='dropzone-file-label'
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className='flex flex-col items-center justify-center w-full h-40 border border-gray-300 border-dashed rounded-lg cursor-pointer'
        >
          <div className='flex flex-col items-center justify-center pt-5 pb-6'>
            <svg
              className='w-8 h-8 mb-4'
              style={{ color: gray }}
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 20 16'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
              />
            </svg>
            <p className='mb-2 text-sm text-white'>
              Drag & drop files, or{' '}
              <span style={{ color: yellow }}>Browse</span>
            </p>
            <p
              style={{ color: gray }}
              className='text-xs text-gray-500 text-center'
            >
              {video && 'The maximum file size allowed is 2MB'}
              {image && 'The maximum file size allowed is 200KB.'}
            </p>
            {error ? (
              <p style={{ color: red }} className='text-sm'>
                {error}
              </p>
            ) : null}
          </div>
          <input
            accept={accept}
            id='dropzone-file'
            type='file'
            className='hidden'
            onChange={(e) => onChange(e?.target?.files)}
            onClick={onClick}
          />
        </label>
      </div>
    </>
  );
};
