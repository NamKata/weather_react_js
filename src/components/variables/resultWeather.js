import React from "react";
// import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloud,
  faBolt,
  faCloudRain,
  faCloudShowersHeavy,
  faSnowflake,
  faSun,
  faSmog,
} from "@fortawesome/free-solid-svg-icons";

// import ForecastHour from "./ForecastHour";
import device from "../../reponsive/sizeGUI";
import ResultFadeIn from "./resultFadeIn";
// import BigLabel from "./bigLabel";
import styled from "styled-components";
import SmallLabel from "./SmallLabel";
import Text from "./textP";
const Results = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 40px 0;
  opacity: 0;
  visibility: hidden;
  position: relative;
  top: 20px;
  animation: ${ResultFadeIn} 0.5s 1.4s forwards;
`;

const LocationWrapper = styled.div`
  flex-basis: 100%;
`;

const CurrentWeatherWrapper = styled.div`
  flex-basis: 100%;
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: auto 1fr;
  margin: 20px 0;
  grid-gap: 30px;
  @media ${device.mobileL} {
    flex-basis: 50%;
    padding-right: 10px;
  }
  @media ${device.tablet} {
    grid-template-columns: 1fr 1fr;
    padding-right: 20px;
  }
`;
const WeatherIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 70px;
  color: #ffffff;
  @media ${device.tablet} {
    font-size: 100px;
    justify-content: flex-end;
  }
  @media ${device.laptop} {
    font-size: 120px;
  }
  @media ${device.laptopL} {
    font-size: 140px;
  }
`;
const TemperatureWrapper = styled.div``;
const Temperature = styled.h3`
  display: block;
  font-size: 50px;
  font-weight: 400;
  color: #ffffff;
  @media ${device.tablet} {
    font-size: 70px;
  }
  @media ${device.laptop} {
    font-size: 90px;
  }
  @media ${device.laptopL} {
    font-size: 110px;
  }
`;

const WeatherDetailsWrapper = styled.div`
  flex-basis: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0;
  margin: 20px 0;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  align-self: flex-start;
  @media ${device.mobileL} {
    flex-basis: 50%;
  }
`;

const WeatherDetail = styled.div`
  flex-basis: calc(100% / 3);
  padding: 10px;
  @media ${device.laptop} {
    padding: 20px 10px;
  }
`;

const ForecastWrapper = styled.div`
  flex-basis: 100%;
  margin: 20px 0;
  overflow: hidden;
`;

const Forecast = styled.div`
  position: relative;
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  scrollbar-color: lightgray #ffffff;
  scrollbar-width: thin;
  margin-top: 20px;
  padding-bottom: 20px;
  @media ${device.laptop} {
    order: 4;
  }
`;
const MediumLabel = styled.h3`
  color: ${({ color }) => color || "#FFFFFF"};
  display: block;
  font-weight: ${({ weight }) => weight || "600"};
  font-size: ${({ fontSize }) => fontSize || "20px"};
  text-align: ${({ align }) => align || "left"};
  padding: 5px 0;
  ${({ firstToUpperCase }) =>
    firstToUpperCase &&
    `
  &:first-letter {
    text-transform: uppercase;
  }
  `}
  @media ${device.tablet} {
    font-size: ${({ fontSize }) => fontSize || "23px"};
  }
  @media ${device.laptop} {
    font-size: ${({ fontSize }) => fontSize || "26px"};
  }
  @media ${device.laptopL} {
    font-size: ${({ fontSize }) => fontSize || "29px"};
  }
`;

const BigLabel = styled.h2`
  color: ${({ color }) => color || "#FFFFFF"};
  display: block;
  font-weight: ${({ weight }) => weight || "600"};
  font-size: ${({ fontSize }) => fontSize || "30px"};
  text-align: ${({ align }) => align || "left"};
  padding: 5px 0;
  ${({ firstToUpperCase }) =>
    firstToUpperCase &&
    ` &:first-letter{
    text-transform:uppercase;
}`}
  @media ${device.tablet} {
    font-size: ${({ fontSize }) => fontSize || "37px"};
  }
  @media ${device.laptop} {
    font-size: ${({ fontSize }) => fontSize || "43px"};
  }
  @media ${device.laptopL} {
    font-size: ${({ fontSize }) => fontSize || "52px"};
  }
`;
const ForecastResultWrapper = styled.div`
  flex-shrink: 0;
  flex-basis: 90px;
  padding: 10px;
  margin: 0 5px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.2);
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
  @media ${device.tablet} {
    flex-basis: 110px;
  }
  @media ${device.laptop} {
    flex-basis: 125px;
  }
  @media ${device.laptopL} {
    flex-basis: 140px;
  }
`;

const WeatherResultIcon = styled.img`
  display: block;
  height: 50px;
  width: 50px;
  margin: 0 auto;
`;
const ForecastResult = ({temp, month, day, hour,icon}) => {
  const iconUrl = `https://openweathermap.org/img/w/${icon}.png`;
  return (
    <>
      <ForecastResultWrapper>
        <Text align="center">{day}/{month}</Text>
        <Text align="center">{hour}:00</Text>
        <WeatherResultIcon src={iconUrl} />
        <SmallLabel align="center" weight="400">
          {temp}&#176;C
        </SmallLabel>
      </ForecastResultWrapper>
    </>
  );
};
const Result = ({item}) => {
  const {
    city,
    country,
    date,
    description,
    main,
    temp,
    sunset,
    sunrise,
    clouds,
    wind,
    highestTemp,
    lowestTemp,
    forecast,
  } = item;
  let weatherIcon = null;

  if (main === 'Thunderstorm') {
    weatherIcon = <FontAwesomeIcon icon={faBolt} />;
  } else if (main === 'Drizzle') {
    weatherIcon = <FontAwesomeIcon icon={faCloudRain} />;
  } else if (main === 'Rain') {
    weatherIcon = <FontAwesomeIcon icon={faCloudShowersHeavy} />;
  } else if (main === 'Snow') {
    weatherIcon = <FontAwesomeIcon icon={faSnowflake} />;
  } else if (main === 'Clear') {
    weatherIcon = <FontAwesomeIcon icon={faSun} />;
  } else if (main === 'Clouds') {
    weatherIcon = <FontAwesomeIcon icon={faCloud} />;
  } else {
    weatherIcon = <FontAwesomeIcon icon={faSmog} />;
  }
  return (
    <Results>
      <LocationWrapper>
        <BigLabel>{city}, {country}</BigLabel>
        <SmallLabel weight="400">{date}</SmallLabel>
      </LocationWrapper>
      <CurrentWeatherWrapper>
        <WeatherIcon>{weatherIcon}</WeatherIcon>
        <TemperatureWrapper>
          <Temperature>{Math.floor(Math.floor(temp)-273.15)}&#176;C</Temperature>
          <SmallLabel weight="400" firstToUpperCase>
          {description}
          </SmallLabel>
        </TemperatureWrapper>
      </CurrentWeatherWrapper>
      <WeatherDetailsWrapper>
        <WeatherDetail>
          <SmallLabel align="center" weight="400">
          {Math.floor(Math.floor(highestTemp)-273.15)}&#176;C
          </SmallLabel>
          <Text align="center">Nhiệt độ cao</Text>
        </WeatherDetail>
        <WeatherDetail>
          <SmallLabel align="center" weight="400">
            {wind} mph
          </SmallLabel>
          <Text align="center">Tốc độ gió</Text>
        </WeatherDetail>
        <WeatherDetail>
          <SmallLabel align="center" weight="400">
            {sunrise}
          </SmallLabel>
          <Text align="center">Binh minh</Text>
        </WeatherDetail>
        <WeatherDetail>
          <SmallLabel align="center" weight="400">
          {Math.floor(Math.floor(lowestTemp)-273.15)}&#176;C
          </SmallLabel>
          <Text align="center">Nhiệt độ Thấp</Text>
        </WeatherDetail>
        <WeatherDetail>
          <SmallLabel align="center" weight="400">
            {clouds}%
          </SmallLabel>
          <Text align="center">Mây</Text>
        </WeatherDetail>
        <WeatherDetail>
          <SmallLabel align="center" weight="400">
            {sunset}
          </SmallLabel>
          <Text align="center">Hoàng hôn</Text>
        </WeatherDetail>
      </WeatherDetailsWrapper>
      <ForecastWrapper>
        <MediumLabel weight="400">Dự đoán thời tiết trong những ngày tới</MediumLabel>
        <Forecast>
          {
            forecast.map(item=>(
              <ForecastResult key={item.dt}
                temp={Math.floor(item.main.temp * 1) / 1}
                icon={item.weather[0].icon}
                month={item.dt_txt.slice(5, 7)}
                day={item.dt_txt.slice(8, 10)}
                hour={item.dt_txt.slice(11, 13) * 1}
              />
            ))
          }
        </Forecast>
      </ForecastWrapper>
    </Results>
  );
};
export default Result;
