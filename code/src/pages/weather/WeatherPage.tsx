import PageWrapper from "@/layouts/page-wrapper/PageWrapper";

import AppBox from "@/components/app-box/AppBox";

import "@/pages/weather/WeatherPage.scss";

const WeatherPage = () => {
  return (
    <PageWrapper>
      <AppBox className="spa-weather-page">
        <div>Weather</div>
      </AppBox>
    </PageWrapper>
  );
};

export default WeatherPage;
