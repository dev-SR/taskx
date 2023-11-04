import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { HTMLAttributes } from 'react';
import Item from './ImageCard';
import { Image } from '@/App';

type Props = {
	index: number;
	image: Image;
	onClick?: () => void;
} & HTMLAttributes<HTMLDivElement>;

const ImageCardSortable = ({ onClick, index, image, ...props }: Props) => {
	const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
		id: image.id
	});

	const styles = {
		transform: CSS.Transform.toString(transform),
		transition: transition || undefined
	};

	return (
		<Item
			onClick={onClick}
			index={index}
			image={image}
			ref={setNodeRef}
			style={styles}
			isDragging={isDragging}
			{...props}
			{...attributes}
			{...listeners}
		/>
	);
};

export default ImageCardSortable;
