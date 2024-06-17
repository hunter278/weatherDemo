import React, { useEffect, useState } from 'react'
import {
    CloudTwoTone,
    SearchOutlined
} from '@ant-design/icons';
export default function ({ onSearch }) {
    const [area, setArea] = useState('')
    const handleChange = (event) => {
        setArea(event.target.value);
    };
    const mySearch = () => {
        console.log(area);
        onSearch(area)
        if (localStorage.getItem('areaList')) {
            let list = JSON.parse(localStorage.getItem('areaList'));
            const index = list.indexOf(area);
            if (index > -1) {
                // 如果包含，移除这个城市
                list.splice(index, 1);
            }
            list.unshift(area);
            if(list.length>10){
                list = list.slice(0, 10);
            }
            localStorage.setItem('areaList', JSON.stringify(list))
        } else {
            let list = [area]
            localStorage.setItem('areaList', JSON.stringify(list))
        }
    }
   
        
    
    return (
        <div className='py-20px px-20px flex items-center '>
            <div className="logo flex mr-6 sm:mr-12 md:mr-24 lg:mr-48 xl:mr-64">
                <div className="left mr-10px">
                    <CloudTwoTone />
                </div>
                <div className="right text-white">
                    watherDemo
                </div>
            </div>
            <div className="search w-80 bg-gray-600 bg-opacity-50 text-white h-10 rounded-lg flex items-center" >
                <div className="left  h-full flex items-center ml-2 cursor-pointer hover:text-green-300" onClick={mySearch}>
                    <SearchOutlined />
                </div>
                <input value={area} onChange={handleChange} type="text" className='bg-transparent border-0 appearance-none focus:outline-none ml-2' placeholder='请输入地区' />
            </div>
        </div>
    )
}
