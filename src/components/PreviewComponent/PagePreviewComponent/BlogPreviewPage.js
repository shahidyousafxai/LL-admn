import { Box } from '@mui/material';
import { yellow } from '../../../utils/style/GlobalVariables';

const BlogPreviewPage = ({ data }) => {
  console.log(
    '🚀 ~ file: BlogPreviewPage.js:5 ~ BlogPreviewPage ~ data:',
    data
  );
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const currentDate = new Date();
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;
  return (
    <div>
      <div className='mt-8'>
        <p className='text-center text-white text-sm' style={{ fontSize: 40 }}>
          Blog Preview Page
        </p>
        <p className='text-center text-gray-400 text-sm mt-10'>
          {formattedDate}
        </p>
        <h1
          className='text-white text-center md:px-0 px-5'
          style={{ fontSize: 40, lineHeight: '45px' }}
        >
          {data?.title}
        </h1>
        <div className='mt-5 flex justify-center gap-3 flex-wrap px-5 md:px-0'>
          {data?.tags?.map((tag, index) => {
            return (
              <span
                key={`${index}`}
                className={`px-2.5 py-1 flex justify-center items-center text-sm rounded-full text-[${yellow}] border-2 border-[${yellow}]`}
              >
                {tag}
              </span>
            );
          })}
        </div>
      </div>
      <div
        className='my-8 flex items-center rounded-3xl xl:w-[1200px] lg:w-[900px] w-[600px]'
        style={{ height: '400px', overflow: 'hidden', marginInline: '10px' }}
      >
        <img
          className='object-cover object-center w-full rounded-3xl'
          src={data?.featureImage}
          alt=''
        ></img>
      </div>
      <section
        className='text-white body-font'
        style={{ paddingBottom: '50px' }}
      >
        <div className='container px-5 mx-auto'>
          <div className='w-3/4  mx-auto'>
            <Box
              component='div'
              dangerouslySetInnerHTML={{ __html: data?.blog }}
              sx={{
                img: {
                  borderRadius: '10px',
                },
                '& .closeButton': {
                  fontSize: '40px',
                  display: 'none !important',
                },
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPreviewPage;
