export interface weatherprops {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    main: string;
    description: string;
  }[];
}

export type iconprops = {
  iconImg: string;
};

export type ForecastProps = {
  dt_txt: string;
  main: {
    temp: number;
  };
  weather: {
    main: string;
    description: string;
  }[];
};
