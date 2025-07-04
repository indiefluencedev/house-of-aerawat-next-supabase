// src/components/Header.jsx
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <header>
      {/* Top Navigation Links */}
      <div className='bg-[#14397C] text-white py-2 px-4 flex justify-center space-x-12 text-[16px] new-class'>
        <a href='#' className='hover:underline'>
          Home
        </a>
        <a href='#' className='hover:underline'>
          Explore All Products
        </a>
        <a href='#' className='hover:underline'>
          About Us
        </a>
        <a href='#' className='hover:underline'>
          Get in Touch
        </a>
      </div>

      {/* Main Navbar */}
      <div className='flex flex-wrap items-center justify-between px-4 py-4 border-b'>
        {/* Logo */}
        <div className='flex items-center'>
          <Image
            src='/assets/newlogo.png'
            alt='Logo'
            width={290}
            height={75}
            className=' md:w-[290px]'
            priority
          />
        </div>

        {/* Search */}
        <div className='flex-1 flex justify-end items-center space-x-2 mt-4 md:mt-0'>
          <Image
            src='/assets/search.svg'
            alt='Search Icon'
            width={28}
            height={28}
            className='search hidden md:block'
          />
          <input
            type='text'
            id='search'
            placeholder='Search for Jewellery, Crystals, Gifts...'
            className='w-full md:w-96 p-2 border rounded-lg bg-gray-100 text-sm focus:outline-none'
          />
        </div>

        {/* Icons */}
        <div className='flex items-center ml-2 space-x-4 mt-4 md:mt-0'>
          <Link href='/auth/login'>
            <Image
              src='/assets/person.svg'
              alt='Person Icon'
              width={24}
              height={24}
              className='w-6 h-6'
            />
          </Link>
          <Image
            src='/assets/heart.svg'
            alt='Heart Icon'
            width={24}
            height={24}
            className='w-6 h-6'
          />
          <Link href='/cart'>
            <Image
              src='/assets/chart.svg'
              alt='Cart Icon'
              width={24}
              height={24}
              className='w-6 h-6'
            />
          </Link>
        </div>
      </div>

      {/* Category Navigation */}
      <div className='flex flex-wrap justify-center space-x-4 py-6 text-xs md:text-sm new-class2 gap-26 text-black'>
        <a href='#' className='hover:underline'>
          Fine Jewellery
        </a>
        <a href='#' className='hover:underline'>
          Shringaar
        </a>
        <a href='#' className='hover:underline'>
          Kalapatt
        </a>
        <a href='#' className='hover:underline'>
          Crystals
        </a>
        <a href='#' className='hover:underline'>
          Wooden Beads
        </a>
        <a href='#' className='hover:underline'>
          Treasured Gifts
        </a>
      </div>
    </header>
  );
};

export default Header;
