import React from 'react'
import Item from './item';

const ItemPanel = ( {pageTitle} ) => {
  const userKey = true;

  return (
    <div className='panel bg-[#212121] w-4/5 h-full rounded-md border border-gray-500 py-5 px-4 overflow-y-auto'>
      
        {userKey ? (
          <div className='login-message w-full h-full'>
            <div className='flex flex-wrap'>
              <Item />
              <Item />
              <Item />
            </div>
          </div>
        ) : (
          <div className='login-message w-full h-full flex items-center justify-center'>
            <button className='flex justify-center items-center gap-2 bg-gray-300 text-gray-900 py-2 px-4 rounded-md'>
              <span className='text-sm font-semibold'>
                로그인이 필요한 서비스 입니다.
              </span>
            </button>
          </div>
        )}
      
    </div>
  )
}

export default ItemPanel;
