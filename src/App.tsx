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
import { initialData } from './data/images';
import ImageAddCardPlaceHolder from './components/ui/ImageAddCardPlaceHolder';

export type Image = {
	id: number;
	src: string;
	checked: boolean;
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
		useSensor(MouseSensor, {
			activationConstraint: {
				distance: 8
			}
		}),
		useSensor(TouchSensor, {
			activationConstraint: {
				distance: 8
			}
		}),
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
		<div className='bg-gray-200 min-h-screen overflow-hidden'>
			<Card className='mx-4 sm:mx-10 md:mx-20 lg:mx-64 my-10'>
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
							<div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-2 sm:gap-6'>
								{images.map((image, i) => (
									<ImageCardSortable
										index={i}
										key={i}
										image={image}
										onClick={() => handleImageClick(image.id)}
									/>
								))}
								<ImageAddCardPlaceHolder />
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
	);
}

export default App;
