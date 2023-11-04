import { Card } from './card';

import { BsImage } from 'react-icons/bs';

const ImageAddCardPlaceHolder = () => {
	return (
		<Card className='border-dashed border-2 flex items-center justify-center h-full w-full bg-gray-100'>
			<div className='flex flex-col items-center space-y-6 py-3 md:py-4 lg:py-6'>
				<BsImage />
				<div className='text-sm sm:text-base'>Add Images</div>
			</div>
		</Card>
	);
};
export default ImageAddCardPlaceHolder;
