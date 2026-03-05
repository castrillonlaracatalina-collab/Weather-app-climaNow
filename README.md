## APLICACIÓN DEL TIEMPO - CLIMANOW
Manténgase a la vanguardia del clima, sin esfuerzo y con confianza.

Aplicación web desarrollada en React + TypeScript que permite consultar el clima actual y el pronóstico del tiempo para diferentes ciudades del mundo utilizando una API pública de clima.

La aplicación muestra información como:

- Temperatura actual
- Condición climática
- Íconos dinámicos según el clima
- Pronóstico de los próximos días

## Tecnologías utilizadas
- React
- TypeScript
- Styled Components
- API pública de clima (OpenWeatherMap)
- Vite para la configuración del proyecto

## ⚙️ Instalación y ejecución del proyecto
Sigue estos pasos para ejecutar el proyecto localmente.

1️⃣ Clonar el repositorio
git clone https://github.com/castrillonlaracatalina-collab/ClimaNow-weather-app.git

2️⃣ Entrar al proyecto
cd ClimaNow-weather-app

3️⃣ Instalar dependencias
npm install

4️⃣ En la raíz del proyecto crea un archivo: .env y Y agrega tu API key: VITE_OWM_API_KEY=TU_API_KEY_AQUI
Esta API Key la obtienes gratis en https://openweathermap.org

5️⃣Ejecutar la aplicación
npm run dev

Luego abre en el navegador:
http://localhost:5173

## 🧠 Decisiones técnicas
- React + TypeScript: Se utilizó TypeScript para mejorar la seguridad del código mediante tipado estático, lo que ayuda a prevenir errores y facilita el mantenimiento del proyecto.

- Componentización: La aplicación se organizó en componentes reutilizables, permitiendo una estructura más clara y escalable.

- Styled Components: Se utilizó Styled Components para encapsular los estilos dentro de los componentes y facilitar el mantenimiento del diseño, evitando conflictos entre estilos globales.

- Consumo de API: La aplicación consume una API pública de clima para obtener información actualizada sobre las condiciones meteorológicas y el pronóstico por ciudad.

## 🌐 Deploy en producción
Link: https://clima-now-weather-app.vercel.app/
