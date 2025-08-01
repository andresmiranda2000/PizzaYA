import { createContext, useState } from "react";

export interface Pedido {
  id: number;
  plato: string;
  precio: number;
  nombre: string;
  apellido: string;
  correo: string;
  direccion: string;
  imagen: string;
}

interface PedidoContextType {
  pedidos: Pedido[];
  setPedidos: (p: Pedido[]) => void;
  agregarPedido: (p: Pedido) => void;
}

export const PedidoContext = createContext<PedidoContextType>({
  pedidos: [],
  setPedidos: () => {},
  agregarPedido: () => {},
});

export const PedidoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const agregarPedido = (pedido: Pedido) => {
    setPedidos([...pedidos, pedido]);
  };

  return (
    <PedidoContext.Provider value={{ pedidos, setPedidos, agregarPedido }}>
      {children}
    </PedidoContext.Provider>
  );
};

