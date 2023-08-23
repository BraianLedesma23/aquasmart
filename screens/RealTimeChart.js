import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';

const RealTimeChart = () => {
  const [chartData, setChartData] = useState({ timeStamp: [], Sen_Nivel: [], Sen_Temp: [], Sen_Luz: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.100.15:8000/0320128438/valores');
        const data = response.data.data;
        const timeStamp = data.map(item => item.date);
        const Sen_Nivel = data.map(item => item.Sen_Nivel);
        const Sen_Temp = data.map(item => item.Sen_Temp);
        const Sen_Luz = data.map(item => item.Sen_Luz);

        setChartData({ timeStamp, Sen_Nivel, Sen_Temp, Sen_Luz });
      } catch (error) {
        console.error(error);
      }

   
      axios.interceptors.response.use(
        (response) => response,
        (error) => {
          console.error('Axios Error:', error);
          throw error;
        }
      );
    };

    fetchData();
  }, []);

  const webViewHTML = `
    <html>
      <head>
        <title>Chart.js Example</title>
        <script src="https://cdn.jsdelivr.net/npm/chart.js@3.8.2/dist/chart.min.js"></script>
      </head>
      <body>
        <div id="content">
          <div class="section">
            <h2>NIVEL DE AGUA EN LA PECERA</h2>
            <canvas id="grafica1"></canvas>
          </div>

          <div class="section">
            <h2>TEMPERATURA DE LA PECERA</h2>
            <canvas id="grafica2"></canvas>
          </div>

          <div class="section">
            <h2>CONDUCTIVIDAD EN LA PECERA</h2>
            <canvas id="grafica3"></canvas>
          </div>
        </div>

        <script>
          const last10Data = ${JSON.stringify(chartData)};
          const ctx1 = document.getElementById('grafica1').getContext('2d');
          const ctx2 = document.getElementById('grafica2').getContext('2d');
          const ctx3 = document.getElementById('grafica3').getContext('2d');

          // Configuración y dibujo de las gráficas utilizando Chart.js
          new Chart(ctx1, {
            type: 'bar',
            data: {
              labels: last10Data.timeStamp,
              datasets: [{
                label: 'Nivel de Agua',
                data: last10Data.Sen_Nivel,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
              }],
            },
          });

          new Chart(ctx2, {
            type: 'bar',
            data: {
              labels: last10Data.timeStamp,
              datasets: [{
                label: 'Temperatura',
                data: last10Data.Sen_Temp,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
              }],
            },
          });

          new Chart(ctx3, {
            type: 'bar',
            data: {
              labels: last10Data.timeStamp,
              datasets: [{
                label: 'Conductividad',
                data: last10Data.Sen_Luz,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              }],
            },
          });
        </script>
      </body>
    </html>
  `;

  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ html: webViewHTML }} />
    </View>
  );
};

export default RealTimeChart;
