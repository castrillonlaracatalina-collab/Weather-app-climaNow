import styled from "styled-components"
import { Icon } from "@iconify/react"
import type { Weather } from "../types/weather"
import { mapIcon, iconColor } from "../utils/icons"

interface Props {
  weather: Weather
}
const Card = styled.section`
  position: relative;
  margin-top: 18px;
  width: min(760px, 92vw);
  border-radius: 18px;
  padding: 22px 22px 16px;
  color: #0f172a;
  background: #ffffff;
  border: 1px solid rgba(0,0,0,.06);
  box-shadow: 0 16px 32px rgba(0,0,0,.14);

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

const Header = styled.div`
  display: grid;
  justify-items: center;
  row-gap: 6px;
  width: 100%;

  .location {
    font-weight: 800;
    font-size: 18px;
  }

  .title {
    font-weight: 700;
    font-size: 14px;
    color: #475569;
  }

  .time {
    color: #64748b;
    font-size: 12px;
  }
`

const TempRow = styled.div`
  margin-top: 12px;
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  column-gap: 14px;

  @media (max-width: 360px) {
    grid-auto-flow: row;
    row-gap: 8px;
  }
`

const IconPill = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: radial-gradient(100% 100% at 35% 25%, #fff 0%, #f8fafc 60%, #eef2f7 100%);
`

const Temp = styled.div`
  display: inline-flex;
  align-items: baseline;
  gap: 6px;
  font-size: clamp(40px, 9vw, 64px);
  font-weight: 900;
  line-height: .9;

  sup {
    font-size: .38em;
    transform: translateY(-6px);
  }
`

const RightInfo = styled.div`
  display: grid;
  align-content: center;
  justify-items: start;
  text-align: left;
  row-gap: 4px;

  .cond {
    font-weight: 800;
  }

  .feels {
    color: #475569;
    font-size: 14px;
  }
`

const Footer = styled.div`
  margin-top: 8px;
  padding-top: 10px;
  border-top: 1px solid #e2e8f0;
  width: 100%;
  display: flex;
  justify-content: center;
`

const cap = (t: string) =>
  (t || "").split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")

const nowTime = () =>
  new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })

export default function WeatherCard({ weather }: Props) {

  const main = weather.weather[0]?.main ?? ""
  const desc = weather.weather[0]?.description ?? ""

  const iconName = mapIcon(main)
  const color = iconColor(main)

  const temp = Math.round(weather.main?.temp ?? 0)
  const feels = Math.round(weather.main?.feels_like ?? temp)

  return (
    <Card>

      <Header>
        <div className="location">
          {weather.name}, {weather.sys.country}
        </div>

        <div className="title">
          Clima actual
        </div>

        <div className="time">
          {nowTime()}
        </div>
      </Header>

      <TempRow>

        <IconPill>
          <Icon icon={iconName} width="40" height="40" color={color}/>
        </IconPill>

        <Temp>
          {temp}<sup>°C</sup>
        </Temp>

        <RightInfo>
          <div className="cond">{cap(desc)}</div>
          <div className="feels">
            Sensación térmica <b>{feels}°</b>
          </div>
        </RightInfo>

      </TempRow>

      <Footer>
        <div>
          💧 Humedad {weather.main.humidity}%
        </div>
      </Footer>

    </Card>
  )
}
