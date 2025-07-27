import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonToast,
  IonModal,
  IonInput,
  IonItemSliding,
  IonItem,
  IonItemOptions,
  IonItemOption,
} from "@ionic/react";
import { useContext, useState } from "react";
import { PedidoContext } from "../PedidoContext";
import "./Tab2.css";

const Tab2: React.FC = () => {
  const { pedidos, setPedidos } = useContext(PedidoContext);

  const [mostrarToast, setMostrarToast] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [direccion, setDireccion] = useState("");

  const abrirModal = () => setMostrarModal(true);
  const cerrarModal = () => {
    setMostrarModal(false);
    setNombre("");
    setApellido("");
    setCorreo("");
    setDireccion("");
  };

  const eliminarPedido = (id: number) => {
    const confirmacion = window.confirm("¿Estás seguro de eliminar este pedido?");
    if (confirmacion) {
      const actualizados = pedidos.filter((p) => p.id !== id);
      setPedidos(actualizados);
    }
  };

  const confirmarConDatos = async () => {
  try {
    const articulos = pedidos.map(({ plato, precio, imagen }) => ({
      plato,
      precio,
      imagen,
    }));

    const orden = {
      nombre,
      apellido,
      correo,
      direccion,
      articulos,
      total: articulos.reduce((acc, p) => acc + p.precio, 0),
    };

    const response = await fetch("http://localhost:4000/api/pedidos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orden),
    });

    if (!response.ok) {
      const error = await response.json();
      alert("Error al confirmar pedido: " + error?.error);
      return;
    }

    setPedidos([]);
    cerrarModal();
    setMostrarToast(true);
  } catch (err) {
    console.error("Error al confirmar pedido:", err);
    alert("Error al confirmar pedido");
  }
};

  const total = pedidos.reduce((acc, p) => acc + p.precio, 0);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="carrito-toolbar">
          <IonTitle className="carrito-title">Carrito</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="pedido-content">
        {pedidos.length === 0 ? (
          <div className="pedido-vacio">No tienes ningún pedido agregado</div>
        ) : (
          <>
            {pedidos.map((pedido) => (
              <IonItemSliding key={pedido.id} className="pedido-slide">
                <IonItem className="pedido-item" lines="none">
                  <div className="pedido-texto">
                    <h3>{pedido.plato}</h3>
                    <p className="precio">${pedido.precio.toFixed(2)}</p>
                  </div>
                  <img
                    src={pedido.imagen}
                    alt="img"
                    className="pedido-imagen"
                  />
                </IonItem>
                <IonItemOptions side="end">
                  <IonItemOption
                    color="danger"
                    onClick={() => eliminarPedido(pedido.id)}
                  >
                    <span role="img" aria-label="Eliminar">🗑️</span>
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            ))}

            <p className="pedido-total">Total: ${total.toFixed(2)}</p>

            <div className="pedido-boton">
              <IonButton
                expand="block"
                className="go-button"
                onClick={abrirModal}
              >
                Confirmar Pedido
              </IonButton>
            </div>
          </>
        )}

        <IonModal isOpen={mostrarModal} onDidDismiss={cerrarModal}>
          <IonHeader>
            <IonToolbar className="modal-toolbar">
              <IonTitle className="modal-title">Datos del Cliente</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="modal-content">
            <div className="modal-form ion-padding">
              <IonInput
                label="Nombre:"
                value={nombre}
                onIonChange={(e) => setNombre(e.detail.value!)}
              />
              <IonInput
                label="Apellido:"
                value={apellido}
                onIonChange={(e) => setApellido(e.detail.value!)}
              />
              <IonInput
                label="Correo:"
                value={correo}
                onIonChange={(e) => setCorreo(e.detail.value!)}
              />
              <IonInput
                label="Dirección:"
                value={direccion}
                onIonChange={(e) => setDireccion(e.detail.value!)}
              />
              <IonButton expand="block" onClick={confirmarConDatos}>
                Confirmar
              </IonButton>
              <IonButton expand="block" color="medium" onClick={cerrarModal}>
                Cancelar
              </IonButton>
            </div>
          </IonContent>
        </IonModal>

        <IonToast
          isOpen={mostrarToast}
          onDidDismiss={() => setMostrarToast(false)}
          message="Pedido confirmado"
          duration={2000}
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
