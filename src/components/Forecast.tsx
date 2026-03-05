import styled from "styled-components"
import { Icon } from "@iconify/react"
import { mapIcon, iconColor } from "../utils/icons"
import type { ForecastItem } from "../types/weather"

interface Props { list: ForecastItem[]; title?: string }

const Section = styled.section`
  margin-top: 28px;
  width: min(1100px, 92%);
  margin-inline: auto;
  text-align: center;
`

const Title = styled.h2`
  margin: 0 0 14px;
  font-size: clamp(18px, 2.8vw, 22px);
  font-weight: 800;
  color: #0f172a;
  text-shadow: 0 2px 10px rgba(0,0,0,.08);
`

const Grid = styled.div`
  display: grid; gap: 16px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  justify-items: center;

  @media (max-width: 360px){
    /* carrusel horizontal en móviles muy angostos */
    grid-auto-flow: column;
    grid-template-columns: repeat(5, 170px);
    overflow-x: auto;
    padding-bottom: 8px;
    scroll-snap-type: x mandatory;
    & > div { scroll-snap-align: center; }
  }

  @media (min-width: 640px){ grid-template-columns: repeat(3, 1fr); }
  @media (min-width: 1024px){ grid-template-columns: repeat(5, 1fr); }
`

const Card = styled.div`
  background: #ffffff; color: #0f172a;
  border-radius: 16px; padding: 16px; width: 170px; max-width: 100%;
  box-shadow: 0 10px 24px rgba(0,0,0,.10);
  transition: transform .15s ease, box-shadow .2s ease;
  text-align: center;
  &:hover { transform: translateY(-2px); box-shadow: 0 14px 30px rgba(0,0,0,.14); }
  .date { font-weight: 700; }
  .temp { font-size: 22px; font-weight: 900; margin: 6px 0 2px; }
  .desc { color: #64748b; font-size: 13px; min-height: 18px; }
`


const MiniIconPill = styled.div`
  width: 54px; height: 54px; border-radius: 12px;
  margin: 8px auto 6px;
  display: grid; place-items: center;

  background: radial-gradient(110% 110% at 35% 25%, #ffffff 0%, #eef7ff 60%, #e4f0fb 100%);
  border: 1px solid #dbe7f5;
  box-shadow:
    inset 0 0 18px rgba(255,255,255,.8),
    0 3px 8px rgba(15, 23, 42, .06);

  svg {
    filter:
      drop-shadow(0 0 1px rgba(255,255,255, .9))
      drop-shadow(0 5px 10px rgba(0,0,0,.16))
      saturate(1.35) contrast(1.08);
  }
`

function pickDailyClosestToNoon(list: ForecastItem[]) {
  const groups: Record<string, ForecastItem[]> = {}
  list.forEach((it) => {
    const [date] = it.dt_txt.split(" ")
    ;(groups[date] ??= []).push(it)
  })
  const dates = Object.keys(groups).sort().slice(0, 5)
  const target = 12 * 60
  const choose = (arr: ForecastItem[]) => {
    let best = arr[0], bestDiff = Infinity
    for (const it of arr) {
      const [h, m] = it.dt_txt.split(" ")[1].split(":")
      const minutes = parseInt(h) * 60 + parseInt(m)
      const diff = Math.abs(minutes - target)
      if (diff < bestDiff) { best = it; bestDiff = diff }
    }
    return best
  }
  return dates.map(d => choose(groups[d]))
}

const cap = (s: string) => s.split(" ").map(w => w[0]?.toUpperCase() + w.slice(1)).join(" ")

export default function Forecast({ list, title = "Pronóstico a 5 días" }: Props) {
  const daily = pickDailyClosestToNoon(list)
  return (
    <Section>
      <Title>{title}</Title>
      <Grid>
        {daily.map((item) => {
          const d = new Date(item.dt_txt + " UTC")
          const dateText = d.toLocaleDateString("es-ES", { weekday: "short", day: "2-digit", month: "short" })

          const mainEn = item.weather[0]?.main || ""
          const descEs = item.weather[0]?.description || ""

          const iconName = mapIcon(mainEn)
          const color    = iconColor(mainEn)

          return (
            <Card key={item.dt_txt}>
              <div className="date">{dateText}</div>

              <MiniIconPill>
                <Icon icon={iconName} width="34" height="34" color={color} />
              </MiniIconPill>

              <div className="temp">{Math.round(item.main.temp)}°C</div>
              <div className="desc">{cap(descEs)}</div>
            </Card>
          )
        })}
      </Grid>
    </Section>
  )
}
