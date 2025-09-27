import React from 'react'
import logo from './logo.png';

const Navbar = () => {
  return (
    <div className='flex flex-col items-center'>
      <nav className='flex items-center justify-between w-[100vw] bg-green-50'>
        <div className='flex items-center'>
          <img src={logo} className='md:w-[180px] w-[25vw]' alt="" />
          <div className='font-bold md:text-4xl text-3xl logo flex gap-0'>
            <p className='text-green-500'>Pass</p>
            <p>Panda</p>
          </div>
        </div>
        <div >
          <a href="https://github.com/AnkuThakur704/PassPanda.git" target='_blank'><img src="/gitlogo.png" className='md:w-[40px] w-[25px] mr-[25px]' alt="gitlogo" /></a>
        </div>
      </nav>
      <div className='w-[100vw] h-[1px] border border-green-700 '></div>
    </div>
  )
}

export default Navbar
