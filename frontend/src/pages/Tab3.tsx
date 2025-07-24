import {
  IonPage,
  IonContent
} from '@ionic/react';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import './Tab3.css';

const Tab3: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    const timer = setTimeout(() => {
      history.push('/Tab1'); 
    }, 5000);
    return () => clearTimeout(timer);
  }, [history]);

  return (
    <IonPage>
      <IonContent fullscreen className="tab3-content">
        <div className="tab3-background">
          <img src="/logo.png" alt="Logo" className="tab3-logo" />
          <h1>¡Bienvenido a PizzaYA!</h1>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
