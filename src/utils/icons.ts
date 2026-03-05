function hasAny(haystack: string, needles: string[]) {
  const h = (haystack || "").toLowerCase()
  return needles.some((n) => h.includes(n))
}


export function mapIcon(condition: string, isDay = true) {
  const c = (condition || "").toLowerCase()

  if (hasAny(c, ["clear", "despejado", "cielo claro"])) {
    return isDay ? "mdi:weather-sunny" : "mdi:weather-night"
  }

  if (hasAny(c, ["cloud", "nube", "nuboso", "nublado", "dispersas", "fragmentadas"])) {
    
    return "mdi:weather-cloudy"
  }


  if (hasAny(c, ["rain", "lluvia", "aguacero"])) return "mdi:weather-rainy"
  if (hasAny(c, ["drizzle", "llovizna"]))        return "mdi:weather-partly-rainy"


  if (hasAny(c, ["thunder", "tormenta"]))        return "mdi:weather-lightning"
 
  if (hasAny(c, ["snow", "nieve"]))              return "mdi:weather-snowy"
  
  if (hasAny(c, ["mist", "fog", "niebla", "neblina", "bruma"])) return "mdi:weather-fog"

  return "mdi:weather-cloudy"
}

export function iconColor(condition: string) {
  const c = (condition || "").toLowerCase()

  if (hasAny(c, ["clear", "despejado", "cielo claro"]))               return "#f59e0b" 
  if (hasAny(c, ["cloud", "nube", "nuboso", "nublado", "dispersas"])) return "#1e40af" 
  if (hasAny(c, ["rain", "lluvia", "aguacero"]))                       return "#0ea5e9" 
  if (hasAny(c, ["drizzle", "llovizna"]))                              return "#38bdf8" 
  if (hasAny(c, ["thunder", "tormenta"]))                              return "#4f46e5" 
  if (hasAny(c, ["snow", "nieve"]))                                    return "#06b6d4" 
  if (hasAny(c, ["mist", "fog", "niebla", "neblina", "bruma"]))        return "#334155" 

  return "#1e40af"
}
