import React from 'react';
import ReactApexChart from 'react-apexcharts';


interface DataPoint {
  x: Date;
  y: number[];
}

interface ForexApiResponse {
  'Meta Data': {
    '2. Symbol': string;
  };
  'Time Series': {
    [date: string]: {
      '1. open': string;
      '2. high': string;
      '3. low': string;
      '4. close': string;
      '5. volume': string;
    };
  };
}

interface Props {
  currencyPair: string; // Propiedad para especificar el par de divisas (por ejemplo, "EURUSD", "GBPUSD", etc.)
  frecuency: string;
  startDate?: string;
  endDate?: string;
}

interface State {
  series: { data: DataPoint[] }[];
  options: any;
}

class ApexChart extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      series: [],
      options: {
        chart: {
          type: 'candlestick',
          height: 350,
        },
        title: {
          text: 'Gráfico de Velas',
          align: 'center',
        },
        xaxis: {
          type: 'datetime',
          labels: {
            formatter: function(val: any) {
              return new Date(val).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              });
            },
          },
        },
        yaxis: {
          tooltip: {
            enabled: true,
          },
        },
        annotations: {
          xaxis: [
            {
              x: new Date('2024-04-28').getTime(), // Posición en el eje x
              borderColor: '#ff0000', // Color del borde de la línea
              label: {
                text: 'Fecha actual', // Texto de la etiqueta
                position: 'top', // Posición de la etiqueta
              },
            },
          ],
        },
        panEnabled: true,
      },
    };
  }

  componentDidMount() {
    // Obtener datos para el par de divisas especificado en la prop currencyPair
    this.fetchForexData(this.props.currencyPair ,this.props.frecuency ,this.props.startDate, this.props.endDate);
  }
  componentDidUpdate(prevProps: Props) {
    const {
      currencyPair: newCurrencyPair,
      frecuency: newFrecuency,
      startDate: newStartDate,
      endDate: newEndDate,
    } = this.props;

    const {
      currencyPair: oldCurrencyPair,
      frecuency: oldFrecuency,
      startDate: oldStartDate,
      endDate: oldEndDate,
    } = prevProps;

    // Verificar si hay cambios relevantes en las propiedades
    if (
      newFrecuency  !==oldFrecuency || // Frecuencia cambió de false a true
      newCurrencyPair !== oldCurrencyPair || // Par de divisas cambió
      newStartDate !== oldStartDate || // Fecha de inicio cambió
      newEndDate !== oldEndDate // Fecha de fin cambió
    ) {
      // Llamar a fetchForexData con las nuevas propiedades
      this.fetchForexData(newCurrencyPair, newFrecuency, newStartDate, newEndDate);
    }
  }

  fetchForexData(currencyPair: string ,frecuency: string , startDate?: string, endDate?: string) {
    // Realizar la solicitud HTTP a la API con el parámetro de divisas
    fetch(`http://127.0.0.1:8000/divisa/dataprueba/?divisas=${currencyPair}&frequency=${frecuency}&start_date=${startDate}&end_date=${endDate}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch forex data');
        }
        return response.json() as Promise<ForexApiResponse>;
      })
      .then(data => {
        // Obtener el símbolo (EURUSD, GBPUSD, etc.) de la respuesta de la API
        const symbol = data['Meta Data']['2. Symbol'];

        // Procesar los datos de la API y actualizar el estado
        const forexData = Object.entries(data['Time Series']).map(([date, values]) => ({
          x: new Date(date),
          y: [
            parseFloat(values['1. open']),
            parseFloat(values['2. high']),
            parseFloat(values['3. low']),
            parseFloat(values['4. close']),
          ],
        }));

        this.setState({
          series: [{ data: forexData }],
          options: {
            ...this.state.options,
            title: {
              text: `Gráfico ${symbol}`, // Actualizar el título con el símbolo (EURUSD, GBPUSD, etc.)
              align: 'center',
            },
          },
        });
      })
      .catch(error => {
        console.error('Error fetching forex data:', error);
      });
  }

  render() {
    return (
      <div>
        <div id="chart">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="candlestick"
            height={515}
          />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

export default ApexChart;
