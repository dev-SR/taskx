import { BsGithub } from 'react-icons/bs';

const Footer = () => {
	return (
		<div className='h-20 w-full bg-slate-600 text-white text-xs sm:text-sm md:text-md lg:text-base'>
			{/* State made by Sharukh Rahman , add email and github link */}
			<div className='flex items-center justify-center h-full flex-col'>
				<div className=''>
					Made with ❤️ by <span className='font-bold'>Sharukh Rahman</span>
				</div>
				<div className='flex items-center'>
					<a href='mailto:sharukhraman@gmail.com' className='font-bold'>
						Send Email
					</a>
					<div className='mx-2'>|</div>
					<a href='https://github.com/dev-SR/taskx' target='_blank' rel='noreferrer'>
						<BsGithub className='text-white' />
					</a>
				</div>
			</div>
		</div>
	);
};

export default Footer;
