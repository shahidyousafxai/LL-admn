import ImageGalleryNew from '../../Gallery';
import { gray } from '../../../utils/style/GlobalVariables';
import AssetsImages from '../../../assets';
const CampusPreviewPage = ({ data }) => {
  const images = [AssetsImages.loginBG];
  return (
    <section>
      <div className='flex items-center justify-center mt-10'>
        <p className='font-semibold text-white text-3xl lg:w-96 text-center'>
          Campus Preview Page
        </p>
      </div>
      <div className='container px-6 py-10 mx-auto'>
        <div className='lg:-mx-6 lg:flex lg:items-center'>
          {data?.campusImages?.length > 0 ? (
            <ImageGalleryNew images={data?.campusImages} />
          ) : (
            <ImageGalleryNew images={images} />
          )}
          <div className='mt-8 lg:w-1/2 lg:px-6 lg:mt-0 h-[470px] overflow-auto flex flex-col justify-center'>
            <h1 className='font-semibold text-white text-2xl lg:w-96'>
              {data?.title}
            </h1>
            <div
              className='max-w-lg mt-6 campus-preview-page'
              style={{ color: gray }}
              dangerouslySetInnerHTML={{ __html: data?.description }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampusPreviewPage;
