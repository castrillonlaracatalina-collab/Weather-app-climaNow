function hasAny(haystack: string, needles: string[]) {
  const h = (haystack || "").toLowerCase()
  return needles.some(n => h.includes(n))
}

export function mapIcon(condition: string, isDay = true) {
  const c = (condition || "").toLowerCase()

  if (hasAny(c, ["clear", "despejado", "cielo claro"])) {
    return isDay ? "meteocons:clear-day-fill" : "meteocons:clear-night-fill"
  }
  if (hasAny(c, ["cloud", "nube", "nuboso", "nublado", "dispersas", "fragmentadas"])) {
    return isDay ? "meteocons:partly-cloudy-day-fill" : "meteocons:partly-cloudy-night-fill"
  }
  if (hasAny(c, ["rain", "lluvia", "aguacero"])) return "meteocons:rain-fill"
  if (hasAny(c, ["drizzle", "llovizna"]))        return "meteocons:drizzle-fill"
  if (hasAny(c, ["thunder", "tormenta"]))        return "meteocons:thunderstorms-fill"
  if (hasAny(c, ["snow", "nieve"]))              return "meteocons:snow-fill"
  if (hasAny(c, ["mist", "fog", "niebla", "neblina", "bruma"])) return "meteocons:fog-fill"

  return "meteocons:cloud-fill"
}

export function iconColor(condition: string) {
  const c = (condition || "").toLowerCase()
  if (hasAny(c, ["clear", "despejado", "cielo claro"]))               return "#f59e0b" // ámbar
  if (hasAny(c, ["cloud", "nube", "nuboso", "nublado", "dispersas"])) return "#60a5fa" // azul suave
  if (hasAny(c, ["rain", "lluvia", "aguacero"]))                       return "#0ea5e9" // celeste
  if (hasAny(c, ["drizzle", "llovizna"]))                              return "#acdbef"
  if (hasAny(c, ["thunder", "tormenta"]))                              return "#88bcecc4" // índigo
  if (hasAny(c, ["snow", "nieve"]))                                    return "#86cbf1" // cian
  if (hasAny(c, ["mist", "fog", "niebla", "neblina", "bruma"]))        return "#94a3b8" // slate
  return "#60a5fa"
}
