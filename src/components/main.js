// import NotFound from './variables/notFound';
import styled from "styled-components";
import device from "../reponsive/sizeGUI";
import SearchWeather from "./variables/searchWether";
import Result from "./variables/resultWeather";
import React from "react";
import NotFound from "./variables/notFound";
const WeatherWrapper = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  heith: calc(100vh -64px);
  width: 100%;
  position: relative;
`;
const NavHeader = styled.h1`
  display: block;
  height: 64px;
  margin: 0;
  padding: 20px 0;
  font-size: 20px;
  text-transform: uppercase;
  font-weight: 400;
  color: #7d7171;
  transition: 0.3s 1.4s;
  opacity: ${({ showLabel }) => (showLabel ? 1 : 0)};
  ${({ secondary }) =>
    secondary &&
    `
  opacity:1;
  height:auto;
  position:relative;
  padding: 20px 0;
  font-size: 30px;
  top:20%;
  text-align:center;
  transition: 0.5s;
  @media ${device.tablet}{
    font-size:40px;
  }
  @media ${device.laptop}{
    font-size:50xp;
  }
  @media ${device.laptopL}{
    font-size:60px;
  }
  @media ${device.desktop}{
    font-size:70px;
  }
`}
  ${({ showResult }) =>
    showResult &&
    `
  opacity:0;
  visivility:hidden;
  top:10%;
`}
`;

class Main extends React.Component {
  state = {
    value:'',
    error:false,
    weather:null,
    message:null,
  }
  handleInputChange=(event)=>{
    console.log(event.target.value);
    this.setState({
      value:event.target.value
    });
  }
  handleSubmitChange=(event)=>{
    event.preventDefault();
    const {value} = this.state;
    if(value.length > 0){
    const APIkey = "876f92d90c56be589b25d7399cff19f2";
    const urlApiWeather=`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${APIkey}&lang=vi`;
    const urlApiForecast=`https://api.openweathermap.org/data/2.5/forecast?q=${value}&APPID=${APIkey}&units=metric`;
    const listWeek = [
      // 'Sunday','Monday','Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday'
      'Chủ Nhật','Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7' 
    ];
    const listMonth=[
      // 'January',
      // 'February',
      // 'March',
      // 'April',
      // 'May',
      // 'June',
      // 'July',
      // 'August',
      // 'September',
      // 'October',
      // 'Nocvember',
      // 'December',
      'Tháng 1', 'Tháng 2','Tháng 3',
      'Tháng 4','Tháng 5','Tháng 6',
      'Tháng 7','Tháng 8','Tháng 9',
      'Tháng 10','Tháng 11','Tháng 12',
    ];
    Promise.all([fetch(urlApiWeather), fetch(urlApiForecast)])
    .then(([result1, result2])=>{
      if(result1.ok && result2.ok){
        return Promise.all([result1.json(), result2.json()])
      }
      throw Error(result1.statusText, result2.statusText);
    }).then(([data1, data2])=>{
      console.log("Data:",data1);
      console.log("Data2:",data2);
      const currentDate = new Date();
      console.log(currentDate.getDay().toLocaleString("vi"));
      const date = `${listWeek[currentDate.getDay().toLocaleString("vi")]}, ngày ${currentDate.getDate().toLocaleString("vi")} ${listMonth[currentDate.getMonth().toLocaleString("vi")]}`;
      const sunset = new Date(data1.sys.sunset * 1000).toLocaleTimeString().split(0,5);
      const sunrise = new Date(data1.sys.sunrise * 1000).toLocaleTimeString().split(0,5);
      const resultTotal = {
        city:data1.name,
        country:data1.sys.country,
        date,
        description:data1.weather[0].description,
        main:data1.weather[0].main,
        temp:data1.main.temp,
        highestTemp:data1.main.temp_max,
        lowestTemp:data1.main.temp_min,
        sunrise,
        sunset,
        clouds:data1.clouds.all,
        humidity:data1.main.humidity,
        wind:data1.wind.speed,
        forecast:data2.list,
      };
      this.setState({
        error:false,
        weather:resultTotal,
        message:null
      });
      console.log(resultTotal);
    }).catch(err=>{
      console.log(err.message);
      this.setState({
        error:true,
        message:err.message,
        weather:null
      });
    })
    }
  }

  render() {
    const {weather, error, message, value} = this.state;
    return (
      <>
        <WeatherWrapper>
          <NavHeader secondary>Thời tiết của thành phố </NavHeader>
          <SearchWeather value={value}  change={this.handleInputChange} submit={this.handleSubmitChange}/>
          {weather && <Result item={weather}/>}
          {(error === true||message !== null)  && <NotFound />}
        </WeatherWrapper>
      </>
    );
  }
}
export default Main;
