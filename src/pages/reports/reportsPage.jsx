import React, { useCallback } from 'react';
import { downloadProductsReport } from '../../services/api';
import { Navbar } from '../../components/navbars/Navbar';
import useFetchStats from '../../shared/hooks/useFetchStats';
import {
  ResponsiveContainer, BarChart, Bar,
  CartesianGrid, XAxis, YAxis, Tooltip, Legend,
  LineChart, Line
} from 'recharts';
import './reportsPage.css';

export const VisualizarEstadisticas = () => {
  const { data, isLoading, error } = useFetchStats();

  const handleDownload = useCallback(async () => {
    try {
      const response = await downloadProductsReport();
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Products_Report.xlsx';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'No se pudo descargar el reporte');
    }
  }, []);

  if (isLoading) return <p>Cargando estadísticas…</p>;
  if (error)     return <p>Error al cargar stats: {error.message}</p>;
  if (!data)     return <p>No hay datos disponibles.</p>;

  const { productSales, productMovements } = data;

  return (
    <>
      <Navbar />
      <div className="stats-page-container">
        <div className="download-button-container">
          <button
            className="download-report-button"
            onClick={handleDownload}
          >
            Descargar Reporte de Productos
          </button>
        </div>

        <div className="chart-grid">
          <div className="chart-card">
            <h3 className="chart-title">Ventas por Producto</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productSales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="product" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="totalSold" name="Unidades vendidas" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3 className="chart-title">Movimientos de Producto</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={productMovements}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="entries" name="Entradas" />
                <Line type="monotone" dataKey="exits"   name="Salidas" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};
