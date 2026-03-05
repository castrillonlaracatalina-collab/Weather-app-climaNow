
import styled from "styled-components"
import { Icon } from "@iconify/react"
import type { Weather } from "../types/weather"
import { mapIcon, iconColor } from "../utils/icons"

interface Props {
  weather: Weather
  cityLabel?: string   
}

const Card = styled.section`
  margin-top: 18px;
  width: min(760px, 92vw);
  border-radius: 18px;
  padding: 22px 22px 16px;
  background: #ffffff;
  border: 1px solid rgba(0,0,0,.06);
  box-shadow: 0 16px 32px rgba(0,0,0,.14);
  display: flex; flex-direction: column; align-items: center; text-align: center;
  color: #0f172a;
`

const CityTitle = styled.div`
  font-weight: 900; font-size: 18px; color: #0f172a;
`

const Header = styled.div`
  display: grid; justify-items: center; row-gap: 4px; width: 100%;
  .title { font-weight: 800; font-size: 14px; color: #334155; }
  .time  { color: #64748b; font-size: 12px; }
`

const TempRow = styled.div`
  margin-top: 12px;
  display: grid; grid-auto-flow: column; align-items: center; column-gap: 14px;
  @media (max-width: 360px){ grid-auto-flow: row; row-gap: 8px; }
`

const IconPill = styled.div`
  width: 78px; height: 78px; border-radius: 14px;
  display: grid; place-items: center;
  background: radial-gradient(110% 110% at 35% 25%, #ffffff 0%, #eef7ff 60%, #e4f0fb 100%);
  border: 1px solid #dbe7f5;
  box-shadow: inset 0 0 22px rgba(255,255,255,.75), 0 4px 12px rgba(15,23,42,.08);

  svg {
    filter:
      drop-shadow(0 0 1px rgba(255,255,255,.95))
      drop-shadow(0 7px 12px rgba(0,0,0,.20))
      saturate(1.45) contrast(1.15);
  }
`

const Temp = styled.div`
  display: inline-flex; align-items: baseline; gap: 6px;
  font-size: clamp(40px, 9vw, 64px); font-weight: 900; line-height: .9;
  sup { font-size: .38em; transform: translateY(-6px) }
`

const RightInfo = styled.div`
  display: grid; align-content: center; justify-items: start; text-align: left;
  row-gap: 4px; max-width: 60ch;
  .cond { font-weight: 800; font-size: clamp(16px, 2.6vw, 20px); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 40ch; }
  .feels { color: #475569; font-size: 14px; white-space: nowrap; }
  @media (max-width: 420px){ .cond { max-width: 26ch; } }
`

const Summary = styled.p`
  margin: 14px 0 10px; color: #334155; font-size: 14px; line-height: 1.35; max-width: 62ch;
`

const Footer = styled.div`
  margin-top: 8px; padding-top: 10px; border-top: 1px solid #e2e8f0;
  width: 100%; display: flex; justify-content: center;
  .item { display: inline-flex; gap: 8px; align-items: center; font-size: 14px; font-weight: 600; }
  .sub { color: #64748b; font-weight: 500; }
`

const cap = (t: string) => (t || "").split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
const nowTime = () => new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })

export default function WeatherCard({ weather, cityLabel }: Props) {
  const main = weather.weather[0]?.main ?? ""
  const desc = weather.weather[0]?.description ?? ""
  const iconName = mapIcon(main, true)
  const color    = iconColor(main)

  const temp  = Math.round(weather.main?.temp ?? 0)
  const feels = Math.round((weather.main?.feels_like ?? weather.main?.temp ?? temp))
  const tmax  = weather.main?.temp_max != null ? Math.round(weather.main.temp_max) : null

  const sentence = (() => {
    const base = desc ? `Habrá ${cap(desc)} en tu zona.` : ""
    const max  = tmax != null ? ` Una temperatura máxima de ${tmax}°.` : ""
    const hum  = weather.main?.humidity != null && weather.main.humidity >= 60 ? " Día húmedo." : ""
    return `${base}${max}${hum}`.trim()
  })()

  return (
    <Card>
      {}
      <CityTitle>{cityLabel || `${weather.name}, ${weather.sys.country}`}</CityTitle>

      <Header>
        <div className="title">Clima actual</div>
        <div className="time">{nowTime()}</div>
      </Header>

      <TempRow>
        <IconPill>
          <Icon icon={iconName} width="48" height="48" color={color} />
        </IconPill>

        <Temp>{temp}<sup>°C</sup></Temp>

        <RightInfo>
          <div className="cond">{cap(desc) || "—"}</div>
          <div className="feels">Sensación térmica&nbsp;<b>{feels}°</b></div>
        </RightInfo>
      </TempRow>

      {sentence && <Summary>{sentence}</Summary>}

      <Footer>
        <div className="item">
          <Icon icon="mdi:water-percent" width="18" height="18" color="#2563eb" />
          <span>{weather.main.humidity}%</span>
          <span className="sub">humedad</span>
        </div>
      </Footer>
    </Card>
  )
}
