import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonToast,
  IonSegment,
  IonSegmentButton,
  IonLabel,
} from "@ionic/react";
import { useEffect, useState, useContext, useRef } from "react";
import "./Tab1.css";
import { PedidoContext } from "../PedidoContext";

interface Plato {
  id: number;
  nombre: string;
  categoria: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

const Tab1: React.FC = () => {
  const [menu, setMenu] = useState<Plato[]>([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState<string>("Todos");
  const { agregarPedido } = useContext(PedidoContext);
  const [mostrarToast, setMostrarToast] = useState(false);
  const segmentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/menu")
      .then((res) => res.json())
      .then((data) => setMenu(data));
  }, []);

  const agregarDirecto = (plato: Plato) => {
    agregarPedido({
      id: Date.now(),
      plato: plato.nombre,
      precio: plato.precio,
      nombre: "",
      apellido: "",
      correo: "",
      direccion: "",
      imagen: plato.imagen,
    });

    setMostrarToast(true);
  };

  const categorias = ["Todos", ...new Set(menu.map((p) => p.categoria))];
  const menuFiltrado =
    categoriaSeleccionada === "Todos"
      ? menu
      : menu.filter((p) => p.categoria === categoriaSeleccionada);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="carrito-toolbar">
          <IonTitle className="carrito-title">Menú</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="menu-content">
        <div className="billboard-container">
          {menu.slice(0, 4).map((plato) => (
            <div key={plato.id} className="billboard-item">
              <img
                src={plato.imagen}
                alt={plato.nombre}
                className="billboard-img"
              />
              <div className="billboard-nombre">{plato.nombre}</div>
            </div>
          ))}
        </div>

        <div className="segment-wrapper" ref={segmentRef}>
          <IonSegment
            value={categoriaSeleccionada}
            onIonChange={(e) =>
              setCategoriaSeleccionada(e.detail.value?.toString() || "Todos")
            }
            className="menu-segment"
          >
            {categorias.map((cat) => (
              <IonSegmentButton
                key={cat}
                value={cat}
                className="segment-button-custom"
              >
                <IonLabel className="segment-label-custom">{cat}</IonLabel>
              </IonSegmentButton>
            ))}
          </IonSegment>
        </div>

        {menuFiltrado.map((plato) => (
          <div key={plato.id} className="menu-item">
            <div className="menu-info">
              <div className="menu-texto">
                <h2>{plato.nombre}</h2>
                <p className="menu-precio">${plato.precio.toFixed(2)}</p>
                <p className="menu-desc">{plato.descripcion}</p>
              </div>
              <div className="menu-imagen-container">
                <img
                  src={plato.imagen}
                  alt={plato.nombre}
                  className="menu-imagen"
                />
                <IonButton
                  className="menu-boton"
                  onClick={() => agregarDirecto(plato)}
                  shape="round"
                  fill="solid"
                  size="small"
                >
                  +
                </IonButton>
              </div>
            </div>
          </div>
        ))}

        <IonToast
          isOpen={mostrarToast}
          onDidDismiss={() => setMostrarToast(false)}
          message="Artículo agregado"
          duration={1500}
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
