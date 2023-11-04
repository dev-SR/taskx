import { Checkbox } from './checkbox';
import { Button } from './button';
type Props = {
	selectedImageCount: number;
	handleDeleteSelectedImages: () => void;
};

const ActionHeader = ({ selectedImageCount, handleDeleteSelectedImages }: Props) => {
	return (
		<div className='border-b-2 py-4 px-8 font-bold text-xl'>
			{selectedImageCount < 1 ? (
				'Gallery'
			) : (
				<div className='flex items-center justify-between'>
					<div className='flex space-x-2 items-center'>
						<Checkbox id='status' checked={true} />
						<label htmlFor='status'>
							{selectedImageCount} {selectedImageCount == 1 ? 'File' : 'Files'} Selected
						</label>
					</div>
					<Button
						variant='link'
						className='text-red-500 text-base h-0'
						onClick={handleDeleteSelectedImages}>
						Delete {selectedImageCount == 1 ? 'File' : 'Files'}
					</Button>
				</div>
			)}
		</div>
	);
};

export default ActionHeader;
