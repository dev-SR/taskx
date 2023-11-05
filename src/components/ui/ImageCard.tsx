import { Image } from '@/App';
import { forwardRef, HTMLAttributes } from 'react';
import { Card } from './card';
import { cn } from '@/lib/utils';
import { Checkbox } from './checkbox';

type Props = {
	index: number;
	image: Image;
	isDragging?: boolean;
	onClick?: () => void;
} & HTMLAttributes<HTMLDivElement>;

const CheckBoxItem = ({ checked }: { checked: boolean }) => (
	<div className={cn(`hidden group-hover:inline absolute top-2 left-2 z-20`, checked && 'inline')}>
		<Checkbox id='terms' checked={checked} className='bg-white' />
	</div>
);
const ImageCardOverlay = ({ checked }: { checked: boolean }) => (
	<div
		className={cn(
			'absolute  w-full h-full z-10 group-hover:bg-gray-400/70',
			checked && 'bg-gray-300/60'
		)}
	/>
);

const DragOverlayX = () => <div className='absolute bg-gray-100 w-full h-full' />;

const ImageCard = forwardRef<HTMLDivElement, Props>(
	({ index, onClick, image, isDragging, style, ...props }, ref) => {
		// const styles: CSSProperties = {
		// 	opacity: isDragging ? '0.4' : '1',
		// 	lineHeight: '0.5',
		// 	transform: isDragging ? 'scale(1.05)' : 'scale(1)',
		// 	...style
		// };

		return (
			<Card
				ref={ref}
				style={style}
				{...props}
				onClick={onClick}
				className={cn(
					'shadow relative group overflow-hidden origin-[0_0]',
					index === 0 && 'col-span-2 row-span-2'
				)}>
				{isDragging && <DragOverlayX />}
				{!isDragging && <CheckBoxItem checked={image.checked} />}
				<ImageCardOverlay checked={image.checked} />
				<img
					src={image.src}
					alt={`Image ${image.id}`}
					className='h-auto w-auto object-cover aspect-square group-hover:scale-[1.15] overflow-hidden transition-all'
				/>
			</Card>
		);
	}
);

export default ImageCard;
