import { BsImage } from 'react-icons/bs';
import { CSS } from '@dnd-kit/utilities';

import { DragEventHandler, useState } from 'react';
import { Checkbox } from './components/ui/checkbox';
import { Card } from './components/ui/card';
import { cn } from './lib/utils';
import { Button } from './components/ui/button';
import {
	DndContext,
	DragEndEvent,
	DragOverlay,
	DragStartEvent,
	MouseSensor,
	PointerSensor,
	TouchSensor,
	closestCenter,
	useSensor,
	useSensors
} from '@dnd-kit/core';
import { SortableContext, arrayMove, rectSortingStrategy, useSortable } from '@dnd-kit/sortable';

type Image = {
	id: number;
	src: string;
	checked: boolean;
};

const initialData = [
	{ id: 1, src: '/src/images/image-1.webp', checked: false },
	{ id: 2, src: '/src/images/image-2.webp', checked: false },
	{ id: 3, src: '/src/images/image-3.webp', checked: false },
	{ id: 4, src: '/src/images/image-4.webp', checked: false },
	{ id: 5, src: '/src/images/image-5.webp', checked: false },
	{ id: 6, src: '/src/images/image-6.webp', checked: false },
	{ id: 7, src: '/src/images/image-7.webp', checked: false },
	{ id: 8, src: '/src/images/image-8.webp', checked: false },
	{ id: 9, src: '/src/images/image-9.webp', checked: false },
	{ id: 10, src: '/src/images/image-10.jpeg', checked: false },
	{ id: 11, src: '/src/images/image-11.jpeg', checked: false }
];

type ImageCardProps = {
	image: Image;
	onClick: () => void;
};

const ImageCard = ({ image, onClick, ...props }: ImageCardProps) => {
	const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
		id: image.id
	});
	const styles = {
		transform: CSS.Transform.toString(transform),
		transition: transition || undefined
	};
	return (
		<Card
			ref={setNodeRef}
			style={styles}
			{...attributes}
			{...listeners}
			{...props}
			key={image.id}
			className={cn('shadow relative group overflow-hidden', image.checked && 'bg-gray-300/50')}
			onClick={onClick}>
			{isDragging ? (
				<div className='absolute bg-gray-300 w-full h-full'></div>
			) : (
				<>
					<div
						className={cn(
							`hidden group-hover:inline absolute top-2 left-2 z-10`,
							image.checked && 'inline'
						)}>
						<Checkbox id='terms' checked={image.checked} className='bg-white' />
					</div>
					<div
						className={cn(
							'absolute group-hover:bg-gray-500/50 w-full h-full',
							image.checked && 'bg-gray-400/50',
							isDragging && ' bg-black'
						)}></div>
					<img
						src={image.src}
						alt={`Image ${image.id}`}
						className='h-auto w-auto object-cover aspect-square'
					/>
				</>
			)}
		</Card>
	);
};

const ImageCardFeatured = ({ image, onClick }: ImageCardProps) => {
	return (
		<Card
			key={image.id}
			className='col-span-2 row-span-2 shadow relative group overflow-hidden'
			onClick={onClick}>
			<div
				className={cn(
					`hidden group-hover:inline absolute top-2 left-2 z-10`,
					image.checked && 'inline'
				)}>
				<Checkbox id='terms' checked={image.checked} className='bg-white' />
			</div>
			<div
				className={cn(
					'absolute group-hover:bg-gray-500/50 w-full h-full',
					image.checked && 'bg-gray-400/50'
				)}></div>
			<img
				src={image.src}
				alt={`Image ${image.id}`}
				className='h-auto w-auto object-cover aspect-square'
			/>
		</Card>
	);
};
const AddImageCardPlaceHolder = () => {
	return (
		<Card className='border-dashed border-2 flex items-center justify-center h-full w-full shrink-0 bg-gray-100'>
			<div className='flex flex-col items-center space-y-6'>
				<BsImage />
				<div className=''>Add Images</div>
			</div>
		</Card>
	);
};
function App() {
	const [images, setImages] = useState<Image[]>(initialData);

	const handleImageClick = (id: number) => {
		console.log(id);
		setImages((prevImages) =>
			prevImages.map((image) => (image.id === id ? { ...image, checked: !image.checked } : image))
		);
	};

	const selectedImageCount = images.filter((image) => image.checked).length;
	const handleDeleteSelectedImages = () => {
		const updatedImages = images.filter((image) => !image.checked);
		setImages(updatedImages);
	};

	const sensors = useSensors(
		useSensor(MouseSensor),
		useSensor(TouchSensor),
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8
			}
		})
	);

	// for drag overlay
	const [overlayItem, setOverlayItem] = useState<Image>();

	// triggered when dragging starts
	const handleDragStart = (event: DragStartEvent) => {
		const { active } = event;
		setOverlayItem(images.find((item) => item.id === active.id));
	};

	// triggered when dragging ends
	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (!over) return;

		const activeItem = images.find((item) => item.id === active.id);
		const overItem = images.find((item) => item.id === over.id);

		if (!activeItem || !overItem) {
			return;
		}

		const activeIndex = images.findIndex((item) => item.id === active.id);
		const overIndex = images.findIndex((item) => item.id === over.id);

		if (activeIndex !== overIndex) {
			setImages((prev) => arrayMove(prev, activeIndex, overIndex));
		}
		setOverlayItem(undefined);
	};

	const handleDragCancel = () => {
		setOverlayItem(undefined);
	};

	return (
		<div className='bg-gray-200 w-screen h-full'>
			<div className='px-60 py-10'>
				<Card>
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
					<div className='p-8'>
						{/*  */}
						<DndContext
							sensors={sensors}
							collisionDetection={closestCenter}
							onDragStart={handleDragStart}
							onDragEnd={handleDragEnd}
							onDragCancel={handleDragCancel}>
							<SortableContext items={images} strategy={rectSortingStrategy}>
								<div className='grid grid-cols-5 gap-6'>
									{images.map((image, i) =>
										i == 0 ? (
											<ImageCardFeatured
												key={i}
												image={image}
												onClick={() => handleImageClick(image.id)}
											/>
										) : (
											<ImageCard key={i} image={image} onClick={() => handleImageClick(image.id)} />
										)
									)}
									<AddImageCardPlaceHolder />
								</div>
							</SortableContext>

							<DragOverlay adjustScale>
								{overlayItem ? (
									// <Photo url={activeId} index={items.indexOf(activeId)} />
									<ImageCard image={overlayItem} onClick={() => handleImageClick(overlayItem.id)} />
								) : null}
							</DragOverlay>
						</DndContext>
					</div>
				</Card>
			</div>
		</div>
	);
}

export default App;
