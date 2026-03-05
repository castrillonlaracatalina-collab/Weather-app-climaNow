import type { Weather, Forecast } from "../types/weather.ts"

const API_KEY = import.meta.env.VITE_OWM_API_KEY as string
const BASE_URL = "https://api.openweathermap.org/data/2.5"

if (!API_KEY) {
  console.warn("Falta VITE_OWM_API_KEY en tu archivo .env")
}

function ensureOk(res: Response, tag: string) {
  if (!res.ok) throw new Error(`${tag}:${res.status}`)
  return res
}

// Clima actual por ciudad
export async function getCurrentWeather(city: string): Promise<Weather> {
  const url = `${BASE_URL}/weather?q=${encodeURIComponent(
    city
  )}&appid=${API_KEY}&units=metric&lang=es`

  const res = await fetch(url)
  ensureOk(res, "weather")
  return res.json()
}

// Pronóstico 5 días 
export async function getForecast(city: string): Promise<Forecast> {
  const url = `${BASE_URL}/forecast?q=${encodeURIComponent(
    city
  )}&appid=${API_KEY}&units=metric&lang=es`

  const res = await fetch(url)
  ensureOk(res, "forecast")
  return res.json()
}

//(geolocalización)
export async function getCurrentWeatherByCoords(
  lat: number,
  lon: number
): Promise<Weather> {
  const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`
  const res = await fetch(url)
  ensureOk(res, "weather")
  return res.json()
}

export async function getForecastByCoords(
  lat: number,
  lon: number
): Promise<Forecast> {
  const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`
  const res = await fetch(url)
  ensureOk(res, "forecast")
  return res.json()
}
