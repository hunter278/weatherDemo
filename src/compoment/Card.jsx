import React, { useEffect, useState } from 'react';
import {
    SwapOutlined,
    AimOutlined,
    MoonOutlined,
    DashboardOutlined
} from '@ant-design/icons';
import utils from '../utils'
import '../icon/iconfont.css'
const WeatherCard = ({ weather }) => {
    if (!weather) return null;
    const { name, main, weather: cooid, wind, sunrise, sunset, coord } = weather;
    // const [city, setCity] = useState('guangdong')
    const [detail, setDetail] = useState(false)
    const [wenDu, setWenDu] = useState(false)
    const [mySunrise, setSunrise] = useState(0)
    const [mySunset, setSunset] = useState(0)
    const [icon, setIcon] = useState('icon-tianqitubiao_qing')
    const [date, setDate] = useState('')
    const showDetail = () => {
        setDetail(true)
    }
    const wenDuChange = () => {
        setWenDu(!wenDu)
    }
    const formatTime = (timestamp) => {
        var date = new Date(timestamp * 1000);
        var hours = ("0" + date.getHours()).slice(-2);
        var minutes = ("0" + date.getMinutes()).slice(-2);
        var seconds = ("0" + date.getSeconds()).slice(-2);
        var formattedDate = `${hours}:${minutes}:${seconds}`;
        console.log(formattedDate);
        return formattedDate
    }
    const formatTime2 = (timestamp) => {
        var date = new Date(timestamp * 1000);
        var year = date.getFullYear();
        var month = ("0" + (date.getMonth() + 1)).slice(-2); // getMonth返回的月份是从0开始的，所以需要+1
        var day = ("0" + date.getDate()).slice(-2);
        var formattedDate = `${year}年${month}月${day}日`;
        console.log(formattedDate);
        return formattedDate
    }
    function findWeatherIcons(desc) {
        console.log(desc, 'ss');
        const conditions = desc.split('，'); // 根据逗号分割描述
        console.log(conditions, 'sa');
        const icons = conditions.map(condition => {
            // 去除前后空白并转换为标准格式（如从"阴 "调整为"阴"），以便于匹配
            const trimmedCondition = condition.trim().replace('天', '');
            console.log(trimmedCondition, 'AA', utils.weather[trimmedCondition]);
            return utils.weather[trimmedCondition] || "icon-yin"; // 如果没找到对应图标，返回"未知图标"
        });
        console.log(icons, 'w', icons.reverse()[0]);
        return icons.reverse()[0];
    }


    useEffect(() => {
        setIcon(findWeatherIcons(cooid[0].description))
        setSunrise(formatTime(sunrise))
        setSunset(formatTime(sunset))
        setDate(formatTime2(sunset))
    }, [sunrise, sunset])


    return (
        <>
            <div className='flex '>
                <div className="   p-4 ml-3 mt-4 bg-zinc-800 rounded-md shadow-md">
                    <i className={`iconfont ${icon} text-white  text-5xl md:text-6lg lg:text-7lg`} ></i>
                    <h2 className="text-xl font-bold text-white">{name}</h2>
                    <p className="text-lg text-white">天气：{cooid[0].description}</p>
                    <div className='flex'>
                        {wenDu && <p className="text-lg text-white mr-20">温度：{main.temp}°C</p>}
                        {!wenDu && <p className="text-lg text-white mr-20">华氏：{((main.temp * 9 / 5) + 32).toFixed(2)}°F</p>}
                        <SwapOutlined className='text-white' onClick={wenDuChange} />
                    </div>
                    <p className='text-white'>风速: {wind.speed} m/s</p>
                    <p className='text-white'>湿度: {main.humidity}%</p>
                    {!detail && <p className='text-white text-xs cursor-pointer hover:text-emerald-300' onClick={showDetail} >查看详情？</p>}
                    {detail && <p className='text-white'>日出时间：{mySunrise}</p>}
                    {detail && <p className='text-white'>日落时间：{mySunset}</p>}
                </div>
                <div className="sm:w-60 md:w-96 lg:w-110 p-4 ml-3 mt-4 bg-zinc-800 rounded-md shadow-md">
                    <h2 className="text-xl font-bold text-white">{date}</h2>
                    <div className='flex justify-between mt-5'>
                        <div className='flex  w-5/12 mr-6'>
                            <AimOutlined className='text-cyan-700 mr-2' />
                            <div className='flex w-full justify-between'>
                                <p className='text-white'>经度：{coord.lon}</p>
                                <p className='text-white'>纬度：{coord.lat}</p>
                            </div>
                        </div>
                        <div className='flex   w-7/12'>
                            <MoonOutlined className='text-yellow-500 mr-2' />
                            <div className='flex w-full '>
                                <p className='text-white  mr-5'>日落：{mySunset}</p>
                                <p className='text-white'>日出：{mySunrise}</p>

                            </div>
                        </div>
                    </div>
                    <div className=' mt-5'>
                        <div className='flex  w-8/12 mr-6'>
                            <DashboardOutlined className='text-rose-400 mr-2' />
                            <div className='flex w-full justify-between'>
                                <p className='text-white'>海平面大气压：{main.pressure}hPa</p>
                                <p className='text-white'>最低温度：{main.temp_min}°C</p>
                                <p className='text-white'>最高温度：{main.temp_max}°C</p>
                            </div>
                        </div>
                    </div>
                    <div className=' mt-5'>
                        <div className='flex  w-8/12 mr-6'>
                            <DashboardOutlined className='text-emerald-300 mr-2' />
                            <div className='flex w-full justify-between'>
                                <p className='text-white mr-4'>风速：{wind.speed}hPa</p>
                                <p className='text-white mr-4'>风向：{wind.deg}°C</p>
                                <p className='text-white mr-4'>阵风：{wind.gust}°C</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




        </>

    );
};

export default WeatherCard;