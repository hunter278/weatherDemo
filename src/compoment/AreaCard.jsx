import React, { useEffect, useState } from 'react'
import utils from '../utils'
import axios from 'axios'
export default function AreaCard({ change,onSearch }) {
    const defaultApi = `5188d7de167d6ba74f485aa0fc3d3b94`
    const [areaList, setAreaList] = useState([])
    const [city, setCity] = useState('')
    const [data, setData] = useState({})
    function getKeyByValue(map, value) {
        for (let key in map) {
            if (map.hasOwnProperty(key) && map[key] === value) {
                return key;
            }
        }
        return null; // 如果没有找到对应的键，可以返回null或其他默认值
    }
    useEffect(() => {
        let list = JSON.parse(localStorage.getItem('areaList')) || []
        setAreaList(list)
    }, [change])
    const myClick = (item) => {
        console.log(item);
        
            onSearch(item)
       
    }
   
    return (
        <div className="w-sm p-4 ml-3 mt-4  bg-zinc-800 rounded-md shadow-md">
            <h2 className="text-xl font-bold text-white">最新搜索记录</h2>
            {areaList.length == 0 && <p className='text-white'>暂无搜索记录</p>}
            {areaList.length > 0 && areaList.map(item => (
                <p className='text-white cursor-pointer hover:text-green-200' key={item} onClick={() => myClick(item)}>{item} </p>
            ))}
        </div>
    )
}
