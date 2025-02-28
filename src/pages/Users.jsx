import { useState, useEffect } from "react";
import { getUsers, logout } from "../api";
import DataTable from "react-data-table-component";
import UserStatistics from "../components/UserStatistics"; // Componente de estadísticas


function Users() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
  
    // Cargar usuarios al iniciar y cuando cambia la página o búsqueda
    useEffect(() => {
        fetchUsers(currentPage, search);
    }, [currentPage, search]);
    

    // Obtener usuarios desde la API con paginación
    const fetchUsers = async (page, query) => {
        try {
        const data = await getUsers(page, query);
        setUsers(data.data); // Establecer usuarios
        setFilteredUsers(data.data); 
        setTotalRows(data.total); // Total de registros en la BD
        setPerPage(data.per_page); // Cantidad de usuarios por página
        } catch (error) {
        console.error("Error al obtener usuarios:", error);
        }
    };

    // Cambiar de página en DataTable
    const handlePageChange = (page) => {
        setCurrentPage(page); 
    };

    // Cerrar sesión
    const handleLogout = async () => {
        try {
            await logout(); 
            navigate("/"); 
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    // Filtrar usuarios en tiempo real
    useEffect(() => {
        const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [search, users]);

    // Definir columnas para DataTables
    const columns = [
        {
        name: "Nombre",
        selector: (row) => row.name,
        sortable: true,
        },
        {
        name: "Email",
        selector: (row) => row.email,
        sortable: true,
        },
        {
        name: "Fecha de Registro",
        selector: (row) => new Date(row.created_at).toLocaleDateString(),
        sortable: true,
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Encabezado */}
            <header className="bg-blue-600 text-white flex justify-between items-center py-4 px-6 rounded-lg shadow-md">
                <h1 className="text-xl font-bold">Panel de Gestión de Usuarios</h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300"
                >
                    Cerrar Sesión
                </button>
            </header>
            
            {/* Contenedor Principal */}
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h2 className="text-xl font-semibold mb-4">Lista de Usuarios</h2>
            
                {/* Input de búsqueda */}
                <input
                    type="text"
                    placeholder="Buscar por nombre o email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-2 border rounded w-full mb-4"
                />
            
                {/* Tabla con DataTable */}
                <DataTable
                    columns={columns}
                    data={filteredUsers}
                    pagination
                    paginationServer
                    paginationTotalRows={totalRows}
                    paginationPerPage={perPage}
                    paginationDefaultPage={currentPage}
                    onChangePage={handlePageChange}
                    highlightOnHover
                    striped
                    responsive
                    noDataComponent="No se encontraron usuarios"
                />
            </div>  
                

            {/* Estadísticas */}
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h2 className="text-xl font-semibold mb-4">Estadísticas</h2>
                <UserStatistics />
            </div>
            
        </div>
      );
    }
    
    export default Users;
