import { BsImage } from 'react-icons/bs';
import { useState } from 'react';
import { Card } from './components/ui/card';
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
import { SortableContext, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable';
import ImageCardSortable from './components/ui/ImageCardSortable';
import ImageCard from './components/ui/ImageCard';
import ActionHeader from './components/ui/ActionHeader';

export type Image = {
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
					<ActionHeader
						selectedImageCount={selectedImageCount}
						handleDeleteSelectedImages={handleDeleteSelectedImages}
					/>
					<div className='p-8'>
						<DndContext
							sensors={sensors}
							collisionDetection={closestCenter}
							onDragStart={handleDragStart}
							onDragEnd={handleDragEnd}
							onDragCancel={handleDragCancel}>
							<SortableContext items={images} strategy={rectSortingStrategy}>
								<div className='grid grid-cols-5 gap-6'>
									{images.map((image, i) => (
										<ImageCardSortable
											index={i}
											key={i}
											image={image}
											onClick={() => handleImageClick(image.id)}
										/>
									))}
									<AddImageCardPlaceHolder />
								</div>
							</SortableContext>
							<DragOverlay
								adjustScale
								dropAnimation={{
									duration: 300,
									easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)'
								}}>
								{overlayItem ? (
									<ImageCard
										image={overlayItem}
										index={images.findIndex((item) => item.id === overlayItem.id)}
									/>
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
