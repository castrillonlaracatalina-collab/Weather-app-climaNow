import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import {
  getCurrentWeather,
  getForecast,
  getCurrentWeatherByCoords,
  getForecastByCoords,
} from "./api/weather"
import type { Weather, Forecast } from "./types/weather"
import WeatherCard from "./components/WeatherCard"
import ForecastList from "./components/Forecast"

const Page = styled.div<{ $bg: string }>`
  min-height: 100dvh;
  display: flex; flex-direction: column; align-items: center;
  background: ${({ $bg }) => $bg};
  font-family: Inter, system-ui, Segoe UI, Roboto, Arial, sans-serif;
  padding-bottom: 40px; transition: background .4s ease;
`

const Container = styled.div`
  width: 100%; max-width: 1100px; padding: 0 16px; margin: 0 auto;
  display: flex; flex-direction: column; align-items: center;
`

const Title = styled.h1`
  font-size: clamp(28px, 5vw, 48px);
  margin-top: 40px; letter-spacing: -0.02em;
  color: #0f172a; text-shadow: 0 2px 10px rgba(255,255,255,.6);
`

const SearchWrap = styled.div`
  margin: 20px 0 6px;
  display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;

  & > input {
    padding: 10px 14px; min-width: 260px; border-radius: 10px;
    border: 1px solid rgba(0,0,0,0.15); outline: none;
    background: #ffffffaa; backdrop-filter: blur(4px);
  }
  & > button {
    padding: 10px 18px; border: 0; border-radius: 10px; cursor: pointer;
    background: #111827; color: #fff; font-weight: 700;
    transition: transform .15s ease, opacity .2s ease, box-shadow .2s ease;
    box-shadow: 0 10px 24px rgba(0,0,0,0.18);
  }
  & > button:hover { transform: translateY(-1px); }
  & > button:disabled { opacity: .6; cursor: not-allowed; }
`

const InlineMsg = styled.p`
  color: #0f172a; opacity: 0.9; text-align: center;
  background: #ffffff66; padding: 6px 10px; border-radius: 10px;
`

// 🔤 Capitaliza sin perder tildes
const toTitle = (s: string) =>
  s
    .trim()
    .split(/\s+/)
    .map(w => w.charAt(0).toLocaleUpperCase("es-ES") + w.slice(1))
    .join(" ")

function App() {
  const [city, setCity] = useState("")
  const [displayCity, setDisplayCity] = useState<string>("") // 👈 nombre “como lo buscas”
  const [weather, setWeather] = useState<Weather | null>(null)
  const [forecast, setForecast] = useState<Forecast | null>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const didInit = useRef(false)

  useEffect(() => {
    if (didInit.current) return
    didInit.current = true
    const savedCity = localStorage.getItem("lastCity")
    if (savedCity) {
      setCity(savedCity)
      setDisplayCity(toTitle(savedCity)) // 👈 respeta cómo se buscó
      handleSearch(savedCity)
    }
  }, [])

  const handleSearch = async (cityToSearch?: string) => {
    const finalCity = (cityToSearch ?? city).trim()
    if (!finalCity) return
    try {
      setError(""); setLoading(true)
      // 👇 Muestra el nombre como lo tecleaste (antes del fetch), con mayúsculas bonitas
      setDisplayCity(toTitle(finalCity))

      const [w, f] = await Promise.all([
        getCurrentWeather(finalCity),
        getForecast(finalCity),
      ])
      setWeather(w); setForecast(f)
      localStorage.setItem("lastCity", finalCity)
    } catch (e: any) {
      const msg = String(e?.message || "")
      if (msg.includes("401"))      setError("API Key inválida o no configurada (401).")
      else if (msg.includes("404")) setError("Ciudad no encontrada (404).")
      else if (msg.includes("429")) setError("Límite de peticiones excedido (429).")
      else                          setError("Error de red o del servicio.")
      setWeather(null); setForecast(null)
    } finally {
      setLoading(false)
    }
  }

  const handleUseMyLocation = async () => {
    if (!("geolocation" in navigator)) { setError("Tu navegador no soporta geolocalización."); return }
    try {
      setError(""); setLoading(true)
      const coords = await new Promise<GeolocationCoordinates>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (pos) => resolve(pos.coords),
          (err) => reject(err),
          { enableHighAccuracy: true, timeout: 15000 }
        )
      })
      const [w, f] = await Promise.all([
        getCurrentWeatherByCoords(coords.latitude, coords.longitude),
        getForecastByCoords(coords.latitude, coords.longitude),
      ])
      setWeather(w); setForecast(f)
      // 👇 En geoloc, usa el nombre del API (p.ej. “Medellín”)
      setDisplayCity(toTitle(w.name || ""))
      setCity(w.name || "")
      localStorage.setItem("lastCity", w.name || "")
    } catch {
      setError("No se pudo obtener tu ubicación o el clima.")
    } finally {
      setLoading(false)
    }
  }

  const getBackground = () => {
    if (!weather) return "linear-gradient(135deg, #acebf5, #87d3f6, #98e9f6)"
    const condition = weather.weather[0].main.toLowerCase()
    if (condition.includes("cloud"))
      return "linear-gradient(135deg, #6e6c8e, #abc8ef, #475569)"
    if (condition.includes("rain"))
      return "linear-gradient(135deg, #0f172a, #1e293b, #1d4ed8)"
    if (condition.includes("clear"))
      return "linear-gradient(135deg, #90d3f5, #41a0edda, #67e8f9)"
    if (condition.includes("snow"))
      return "linear-gradient(135deg, #dbeafe, #eff6ff, #ffffff)"
    if (condition.includes("mist"))
      return "linear-gradient(135deg, #9ca3af, #6b7280, #4b5563)"
    return "linear-gradient(135deg,  #b2e2fa, #7cbef4da, #a0eaf4)"
  }

  const showEmpty = !weather && !loading && !error
  const cityLabel = weather
    ? `${displayCity || weather.name}, ${weather.sys.country}` // 👈 label final
    : displayCity

  return (
    <Page $bg={getBackground()}>
      <Container>
        <Title>ClimaNow</Title>

        <SearchWrap>
          <input
            type="text"
            placeholder="Buscar ciudad"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={() => handleSearch()} disabled={loading}>
            {loading ? "Buscando..." : "Buscar"}
          </button>
          <button onClick={handleUseMyLocation} disabled={loading}>
            {loading ? "..." : "Usar mi ubicación"}
          </button>
        </SearchWrap>

        {loading && <InlineMsg>Cargando...</InlineMsg>}
        {error && <InlineMsg style={{ color: "#1a1919", background: "#ece1e1" }}>{error}</InlineMsg>}
        {showEmpty && <InlineMsg>Ingresa una ciudad para ver el clima y el pronóstico.</InlineMsg>}

        {weather && <WeatherCard weather={weather} cityLabel={cityLabel} />}
        {forecast && <ForecastList list={forecast.list} title={`Pronóstico a 5 días`} />}
      </Container>
    </Page>
  )
}

export default App
