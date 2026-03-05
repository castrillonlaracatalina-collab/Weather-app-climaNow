export interface Weather {
  name: string
  sys: { country: string }
  main: {
    temp: number
    feels_like?: number
    temp_min?: number
    temp_max?: number
    humidity: number
    pressure?: number
  }
  weather: { description: string; icon: string; main: string }[]
  visibility?: number
  wind?: { speed?: number }
}

export interface ForecastItem {
  dt_txt: string // "YYYY-MM-DD HH:mm:ss" (UTC)
  main: { temp: number }
  weather: { description: string; icon: string; main: string }[]
}

export interface Forecast {
  list: ForecastItem[]
}