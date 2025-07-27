import { IonContent, IonPage } from "@ionic/react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Tab3.css";

const Tab3: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    const timer = setTimeout(() => {
      history.push("/tab1");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen className="pantalla-inicio">
        <div className="logo-inicio">
          <h1>
            <span className="pizza-text">Pizza</span>
            <span className="ya-text">YA</span>
          </h1>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
