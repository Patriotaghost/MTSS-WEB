import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'

import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Home from './pages/Home'
import Clientes from './pages/Clientes'
import Produtos from './pages/Produtos'
import Pedidos from './pages/Pedidos'
import Compras from './pages/Compras'
import ValoresPagos from './pages/ValoresPagos'
import SaldoDevedor from './pages/SaldoDevedor'
import MinhasVendas from './pages/MinhasVendas'
import Lucro from './pages/Lucro'
import Custo from './pages/Custo'
import PrecoVenda from './pages/PrecoVenda'
import Obs from './pages/Obs'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          <Route
            path="/clientes"
            element={
              <PrivateRoute>
                <Clientes />
              </PrivateRoute>
            }
          />

          <Route
            path="/produtos"
            element={
              <PrivateRoute>
                <Produtos />
              </PrivateRoute>
            }
          />

          <Route
            path="/pedidos"
            element={
              <PrivateRoute>
                <Pedidos />
              </PrivateRoute>
            }
          />

          <Route
            path="/compras"
            element={
              <PrivateRoute>
                <Compras />
              </PrivateRoute>
            }
          />

          <Route
            path="/valores-pagos"
            element={
              <PrivateRoute>
                <ValoresPagos />
              </PrivateRoute>
            }
          />

          <Route
            path="/saldo-devedor"
            element={
              <PrivateRoute>
                <SaldoDevedor />
              </PrivateRoute>
            }
          />

          <Route
            path="/minhas-vendas"
            element={
              <PrivateRoute>
                <MinhasVendas />
              </PrivateRoute>
            }
          />

          <Route
            path="/lucro"
            element={
              <PrivateRoute>
                <Lucro />
              </PrivateRoute>
            }
          />

          <Route
            path="/custo"
            element={
              <PrivateRoute>
                <Custo />
              </PrivateRoute>
            }
          />

          <Route
            path="/preco-venda"
            element={
              <PrivateRoute>
                <PrecoVenda />
              </PrivateRoute>
            }
          />

          <Route
            path="/obs"
            element={
              <PrivateRoute>
                <Obs />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App