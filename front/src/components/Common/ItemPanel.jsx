import React, { useState } from 'react'
import Item from './Item';
import { useSelector, useDispatch } from 'react-redux';
import AddItem from './addItem';
import PageTitle from './PageTitle';
import { fetchGetItems } from '../../redux/slice/apiSlice';
import { useEffect } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';
import LoadingSkeleton from './LoadingSkeleton';

const ItemPanel = ( {pageTitle} ) => {
  //Auth Data Variables
  const authData = useSelector((state) => state.auth.authData);
  const userKey = authData?.sub;
  // console.log(userKey);111849747230708742661

  //API Data Variables
  const getTasksData = useSelector((state) => state.api.getItemsData);
  const dispatch = useDispatch();

  // loading state
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(!userKey) return;

    const fetchGetItemsData = async () => {
      try {
        setLoading(true);
        // useEffect 내부에서 dispatch 함수를 호출할 때는 async/await를 사용할 수 없을때 unwrap()을 사용;
        console.log(userKey);
        await dispatch(fetchGetItems(userKey)).unwrap();
      } catch (error) {
        console.log("Fail to fetch items", error);
      } finally {
        setLoading(false);
      }
    }
    fetchGetItemsData();
  }, [dispatch, userKey]);

  // console.log(getTasksData);

  return (
    <div className='panel bg-[#212121] w-4/5 h-full rounded-md border border-gray-500 py-5 px-4 overflow-y-auto'>
      
        {userKey ? (
          <div className='login-message w-full h-full'>
            <PageTitle title={pageTitle} />
            <div className='flex flex-wrap'>
              {/* {
                getTasksData?.map((task, idx) => (
                  <Item key={idx} task={task} />
                ))
              } */}
              {
                loading ? (
                  <SkeletonTheme baseColor='#202020' highlightColor='#444' height='25vh'>
                    {/* {[...Array(getTasksData?.length)].map((_, idx) => (
                      <LoadingSkeleton key={idx} />
                    ))} */}
                    <LoadingSkeleton />
                    <LoadingSkeleton />
                    <LoadingSkeleton />
                  </SkeletonTheme>
                ) : (
                  getTasksData?.map((task, idx) => (
                    <Item key={idx} task={task} />
                  ))
                )}

              <AddItem /> 
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
