import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";
import { useEffect, useState } from "react";
import "./Tab4.css";

interface Pedido {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  direccion: string;
  articulos: { plato: string; precio: number; imagen: string }[];
  total: number;
  fecha: string;
  estado?: "pendiente" | "confirmado" | "terminado" | "descartado";
}

const Tab4: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const cargarPedidos = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/pedidos");
      const data = await res.json();
      setPedidos(data);
    } catch (err) {
      console.error("Error al cargar pedidos", err);
    }
  };

  useEffect(() => {
    cargarPedidos();

    const intervalo = setInterval(() => {
      cargarPedidos();
    }, 3000);

    return () => clearInterval(intervalo);
  }, []);

  const actualizarEstado = async (id: number, nuevoEstado: string) => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/pedidos/${id}/estado`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ estado: nuevoEstado }),
        }
      );
      if (res.ok) {
        cargarPedidos();
      }
    } catch (err) {
      console.error("Error al actualizar estado", err);
    }
  };

  const descartarPedido = async (id: number) => {
    if (!window.confirm("¿Estás seguro de descartar este pedido?")) return;
    try {
      const res = await fetch(
        `http://localhost:4000/api/pedidos/${id}/descartar`,
        {
          method: "PUT",
        }
      );
      if (res.ok) {
        cargarPedidos();
      }
    } catch (err) {
      console.error("Error al descartar pedido", err);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ "--background": "#c50000" }}>
          <IonTitle style={{ color: "white", fontWeight: "bold" }}>
            Panel Administrador
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="admin-content">
        {pedidos.length === 0 ? (
          <div className="admin-vacio">No hay pedidos registrados</div>
        ) : (
          pedidos.map((p) => (
            <IonCard key={p.id} className="admin-card">
              <IonCardHeader>
                <IonCardTitle style={{ fontSize: "16px" }}>
                  Pedido de {p.nombre.toUpperCase()} {p.apellido.toUpperCase()}{" "}
                  <br />
                  <small>({(p.estado || "pendiente").toUpperCase()})</small>
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p>
                  <strong>Correo:</strong> {p.correo}
                </p>
                <p>
                  <strong>Dirección:</strong> {p.direccion}
                </p>
                <p>
                  <strong>Fecha:</strong>{" "}
                  {new Date(p.fecha).toLocaleString("es-EC", {
                    dateStyle: "short",
                    timeStyle: "medium",
                  })}
                </p>
                {p.articulos.map((art, index) => (
                  <div key={index} className="admin-item">
                    <img
                      src={art.imagen}
                      alt={art.plato}
                      className="admin-img"
                    />
                    <div>
                      <strong>{art.plato}</strong>
                      <p>${art.precio.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
                <p className="admin-total">Total: ${p.total.toFixed(2)}</p>

                <div className="admin-botones">
                  {(!p.estado || p.estado === "pendiente") && (
                    <>
                      <IonButton
                        color="success"
                        expand="block"
                        onClick={() => actualizarEstado(p.id, "confirmado")}
                      >
                        Confirmar Pedido
                      </IonButton>
                      <IonButton
                        color="danger"
                        expand="block"
                        onClick={() => descartarPedido(p.id)}
                      >
                        Descartar Pedido
                      </IonButton>
                    </>
                  )}

                  {p.estado === "confirmado" && (
                    <IonButton
                      color="tertiary"
                      expand="block"
                      onClick={() => actualizarEstado(p.id, "terminado")}
                    >
                      Pedido Entregado
                    </IonButton>
                  )}
                </div>
              </IonCardContent>
            </IonCard>
          ))
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab4;
