export type weatherprops = {
    name: string;
    main: {
      temp: number | undefined;
    };
    weather: {
      description: string;
    }[];
  };