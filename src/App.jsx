import React, { useEffect, useState } from 'react'
import Header from './compoment/Header'
import MyCard from './compoment/Card'
import AreaCard from './compoment/AreaCard'
import './css/tailWind.css'
import axios from 'axios'
import utils from './utils'
import { Button, message, Space } from 'antd';

export default function App() {
  const defaultApi = `5188d7de167d6ba74f485aa0fc3d3b94`
  const [messageApi, contextHolder] = message.useMessage();
  const [city, setCity] = useState('Guangdong')
  const [change,setChange]=useState('')
  const mySearch = (newArea) => {
    if (utils.areaMap.hasOwnProperty(newArea)) {
      const result = utils.areaMap[newArea];
      console.log(`${newArea} 对应的是 ${result}1111`);
      setCity(result)
      setChange(result)
    } else {
      console.log(`${newArea} 未在映射表中找到`);
      messageApi.open({
        type: 'warning',
        content: '暂无地区天气信息',
      });
      return
    }
  }
  
  function getKeyByValue(map, value) {
    for (let key in map) {
      if (map.hasOwnProperty(key) && map[key] === value) {
        return key;
      }
    }
    return null; // 如果没有找到对应的键，可以返回null或其他默认值
  }
  useEffect(() => {
    try {
      const fetchData = async () => {
        try {
          let { data } = await axios({
            method: 'get',
            url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${defaultApi}&lang=zh_cn&units=metric`
          });
          console.log(data, 'data', utils.areaMap);
          console.log(data.cod);
          if (data.cod == 200) {

            setData({
              name: getKeyByValue(utils.areaMap, city),
              main: data.main,
              weather: data.weather,
              coord: data.coord,
              wind: data.wind,
              sunrise: data.sys.sunrise,
              sunset: data.sys.sunset
            })
          } else {
            alert('获取天气错误')
            return
          }
        } catch (error) {
          console.log(error, 'erroe');
        }
      };
      fetchData(); // 立即调用异步函数
    } catch (error) {
      console.log(error);
    }
  }, [city])

  const [data, setData] = useState()
  return (
    <div className='h-screen w-screen bg-black 500'>
      {contextHolder}
      <Header onSearch={mySearch}></Header>
      <div className='flex justify-center'>
        <MyCard weather={data} ></MyCard>
        <AreaCard change={change} onSearch={mySearch}></AreaCard>
      </div>



    </div>
  )
}
