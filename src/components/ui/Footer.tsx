const Footer = () => {
	return (
		<div className='h-12 w-full bg-slate-600'>
			{/* State made by Sharukh Rahman , add email and github link */}
			<div className='flex items-center justify-center h-full'>
				<div className='text-white text-sm'>
					Made with ❤️ by <span className='font-bold'>Sharukh Rahman</span>
				</div>
				<div className='mx-2'>|</div>
				<div className='text-white text-sm'>
					<p>
						<a href='mailto:sharukhraman@gmail.com'>sharukhraman@gmail.com</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Footer;
