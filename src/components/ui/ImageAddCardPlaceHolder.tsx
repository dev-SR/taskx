import { Card } from './card';

import { BsImage } from 'react-icons/bs';

const ImageAddCardPlaceHolder = () => {
	return (
		<Card className='border-dashed border-2 flex items-center justify-center h-full w-full shrink-0 bg-gray-100'>
			<div className='flex flex-col items-center space-y-6 py-12'>
				<BsImage />
				<div className=''>Add Images</div>
			</div>
		</Card>
	);
};
export default ImageAddCardPlaceHolder;
