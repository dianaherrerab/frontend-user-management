import { useState, useEffect } from "react";
import { getUserStatistics } from "../api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

function UserStatistics() {
  const [stats, setStats] = useState({
    usersLast30Days: [],
    actionsPerUser: [],
    mostActiveUsers: [],
  });

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const data = await getUserStatistics();
      setStats(data);
    } catch (error) {
      console.error("Error al obtener estadísticas", error);
    }
  };

  // Colores para gráficos
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Estadísticas de Usuarios</h2>

      <div className="grid grid-cols-1 gap-6">
        {/* Usuarios registrados en los últimos 30 días */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-2">Usuarios Últimos 30 Días</h3>
          {stats.usersLast30Days.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={stats.usersLast30Days}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500">No hay datos disponibles</p>
          )}
        </div>

        {/* Número de acciones por usuario */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-2">Acciones por Usuario</h3>
          {stats.actionsPerUser.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={stats.actionsPerUser}
                  dataKey="actions"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#00C49F"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
                >
                  {stats.actionsPerUser.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500">No hay datos disponibles</p>
          )}
        </div>

        {/* Usuarios más activos */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-2">Usuarios Más Activos</h3>
          {stats.mostActiveUsers.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={stats.mostActiveUsers}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="activity_count" fill="#FFBB28" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500">No hay datos disponibles</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserStatistics;
