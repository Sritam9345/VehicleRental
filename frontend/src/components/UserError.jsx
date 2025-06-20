import React from 'react'

function UserError(props) {


  function handelClick(){
    props.setErrorPopupPanel(false);
  }

  return (
     <div className='relative w-full h-screen'>
        <div className='bg-[#E9E9E9] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-[239px] h-[129px] flex flex-col gap-[26px] justify-center items-start rounded-[20px]'>
      <div
      className='absolute w-full h-[46px] left-[0px] top-[9px]'
      ><p className='text-red-500 font-semibold text-center align-top text-[14px] font-inter'>The email or password is invalid.</p>
      </div>
<div className='absolute gap-[10px] left-[75.5px] font-semibold top-[81px] w-[88px] h-[38px] bg-[#5EC768] px-[26px] py-[11px] flex flex-row items-center rounded-[20px]'
onClick={()=>handelClick()}
>Close</div>
        </div>
    </div>
  )
}

export default UserError