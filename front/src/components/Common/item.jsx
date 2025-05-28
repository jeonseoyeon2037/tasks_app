import {React, useState} from 'react'
import { MdEditDocument } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { fetchGetItems, fetchUpdateCompleted } from '../../redux/slice/apiSlice';
import { toast } from 'react-toastify';
const item = ({task}) => {

  debugger;
  const {_id, title, description, date, iscompleted, isimportant, userid} = task;
  const dispatch = useDispatch();
  

  const textLengthOverCut = (text, length, lastTxt) => {
    if (length === "" || length === null) {
      length = 20;
    }
    if(lastTxt === "" || lastTxt === null) {
      lastTxt = "...";
    }
    if(text.length > length) {
      text = text.substr(0, length) + lastTxt;
    }

    return text;    
  }

  const [isCompleted, setIsCompleted] = useState(iscompleted);

  const changeCompleted = async () => {
    // setIsCompleted(!isCompleted)을 호출하면 상태 업데이트가 비동기적으로 이루어지기 때문에, isCompleted의 값이 즉시 변경되지 않는다.
    // 따라서 updateCompletedData 객체를 생성할 때 isCompleted의 이전 값이 사용된다. 이로 인해 true/false가 한 단계씩 밀리게 된다.

    // 상태를 미리 업데이트 하여 반영된 값을 사용
    const newIsCompleted = !isCompleted;
    setIsCompleted(newIsCompleted);

    const updateCompletedData = {
      isCompleted: newIsCompleted,
      itemId: _id,
    }

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateCompletedData),
    }

    try {
      await dispatch(fetchUpdateCompleted(options)).unwrap();
      newIsCompleted ? toast.success("할일을 완료했습니다!") : toast.success("할일을 진행중입니다.");
      
      await dispatch(fetchGetItems(userid)).unwrap();
    } catch (error) {
      console.log("Fail to Update");
      toast.error("상태 변경에 실패했습니다.");
    }
    
  }

  return (
    <div className='item w-1/3 h-[25vh] p-[0.25rem]'>
      <div className='w-full h-full border border-gray-500 rounded-md flex py-3 px-4 flex-col justify-between bg-gray-950'>
        <div className="upper">
          <h2 className='text-xl font-normal mb-3 relative pb-2 flex justify-between border-b'>
            <span className='bottom-0'>{title}</span>
            <span className='text-sm py-1 px-3 border border-gray-500 rounded-sm hover:bg-gray-700 cursor-pointer'>자세히</span>
          </h2>
          <p style={{ whiteSpace: 'pre-wrap'}}>{textLengthOverCut(description, 10)}</p>
        </div>
        <div className="lower">
          <p className='text-sm mb-1'>{date}</p>
          <div className='item-footer flex justify-between'>
            <div className="item-footer-left flex gap-2">
              {
                iscompleted 
                  ? (<button className='block py-1 px-4 bg-green-400 text-sm text-white rounded-md' onClick={changeCompleted}>Complete</button>) 
                  : (<button className='block py-1 px-4 bg-cyan-500 text-sm text-white rounded-md' onClick={changeCompleted}>Incomplete</button>)
              }
              {
                isimportant && (
                  <button className='block py-1 px-4 bg-red-500 text-sm text-white rounded-md'>
                    Important
                  </button>
                )
              }
            </div>
            <div className="item-footer-right flex gap-2">
              <button className='edit-btn'>
                <MdEditDocument className='w-5 h-5' />
              </button>
              <button className='delete-btn' >
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default item
