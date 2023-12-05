import { Styles } from '../../utils/style/GlobalStyles';
import {
  gray,
  red,
  secondaryColor,
  yellow,
} from '../../utils/style/GlobalVariables';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';

const DragDropFile = ({
  label,
  onDrop,
  removeImage,
  selectedFiles,
  onChange,
  onClick,
  error,
  setError,
  accept,
  showStaticFiles,
  hideErrorFn,
}) => {
  useEffect(() => {
    // After 3 seconds, hide the processing modal
    const timer = setTimeout(() => {
      if (setError) {
        setError('');
      }
      if (hideErrorFn) {
        hideErrorFn();
      }
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  return (
    <>
      <div className='flex flex-col justify-center w-full'>
        <div style={Styles.smallTextWhite} className='mb-1 mt-5'>
          {label}
        </div>
        <label
          htmlFor='dropzone-file'
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
          style={{ borderColor: gray, backgroundColor: secondaryColor }}
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
              The maximum file size allowed is 200KB.
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
      {showStaticFiles && selectedFiles?.length > 0 && (
        <div className='mt-3'>
          <ul className='flex gap-3 flex-wrap'>
            {typeof selectedFiles === 'string' ? (
              <li key={selectedFiles} className='relative rounded'>
                <img
                  src={selectedFiles}
                  alt={selectedFiles}
                  className='rounded-lg h-[115px] w-[115px]'
                  style={{ objectFit: 'cover' }}
                />
                <div onClick={() => removeImage(selectedFiles, "")}>
                  <CloseIcon
                    fontSize='small'
                    className='cursor-pointer text-white bg-black rounded-full p-1 absolute top-1 right-1'
                  />
                </div>
              </li>
            ) : (
              selectedFiles?.map((file, index) => (
                <li key={index} className='relative rounded'>
                  <img
                    src={typeof file === 'string' ? file: URL.createObjectURL(file)}
                    alt={file?.name}
                    className='rounded-lg h-[115px] w-[115px]'
                    style={{ objectFit: 'cover' }}
                  />
                  <div onClick={() => removeImage(file, index)}>
                    <CloseIcon
                      fontSize='small'
                      className='cursor-pointer text-white bg-black rounded-full p-1 absolute top-1 right-1'
                    />
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default DragDropFile;
