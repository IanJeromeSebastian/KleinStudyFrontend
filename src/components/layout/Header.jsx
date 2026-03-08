/* eslint-disable no-unused-vars */
import React from 'react'
import { useAuth } from '../../context/AuthContext';
import { Bell, Menu, User } from 'lucide-react'

const Header = ({toggleSidebar}) => {
    const {user} = useAuth();

  return (
    <header className='sticky top-0 z-40w-full h-16 bg-[#faf4f1] backdrop-blur-xl border-b border-slate-200/60'>
        <div className='flex items-center justify-between h-full px-6'>
            {/* mobile */}
            <button
                onClick={toggleSidebar}
                className='md:hidden inline-flex items-center justify-center w-10 h-10 text-slate-900 hover:text-slate-600 hover:bg-[#faf4f1] rounded-xl transition-all duration-200'
                aria-label='Toggle sidebar'
            >
                <Menu size={24}/>
            </button>

            <div className='hidden md-block'></div>

            <div className='flex items-center gap-3'>
                <button className='relative inline-flex items-center justify-center w-10 h-10 text-slate-900 hover:text-slate-600 hover:bg-[#faf4f1] rounded-xl transition-all duration-200 group'>
                    <Bell size={20} strokeWidth={2} className='group-hover:scale-110 transition-transform duration-200'/>
                    <span className='absolute top-1.5 right-1.5 w-2 h-2 bg-[#ffd700] rounded-full ring-2 ring-white'></span>
                </button>

                <div className='flex items-center gap-3 pl-3 border-l border-slate-200/60'>
                    <div className='flex items-center gap-3 pl-3 py-1.5 rounded-xl hover:bg-[#e4dcd7] transition-colors duration-200 cursor-pointer group'>
                        <div className='w-9 h-9 rounded-xl bg-linear-to-br from-[#ffd700] to-[#ffae00] flex items-center justify-center shadow-md shadow-[#ffd700]/20 group-hover:shadow-[#ffd700]/30 transition-all duration-200'>
                            <User size={18} strokeWidth={2.5}/>
                        </div>
                        <div>
                            <p className='text-sm font-semibold text-slate-900'>
                                {user?.username || 'John Doe'}
                            </p>
                            <p className=' text-xs text-slate-500'>
                                {user?.email || 'johndoe@example.com'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header
