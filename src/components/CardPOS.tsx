import '../styles/cardPos.css'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { SlOptionsVertical } from 'react-icons/sl';
import StartupCashbox from './StartupCashbox';

interface CardPOSProps {
  POSName: string;
  POSId: number;
}

const CardPOS = ({ POSName, POSId }: CardPOSProps) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        padding: '10px',
        height: '150px',
        alignItems: 'start',
        justifyContent: 'space-between',
        border: '1px solid #ddd',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
          }}
        >
          <strong> {POSName} </strong>
          <div>
            <strong
              style={{ fontSize: '9px', background: 'rgb(242, 92, 5, 50%)' }}
            >
              {' '}
              ABIERTO{' '}
            </strong>
          </div>
        </div>
        <div className='hover-gray' style={{ borderRadius: '50%' ,display: 'flex', alignItems: 'center', width: '30px', height: '30px', justifyContent: 'center' }}>
          <SlOptionsVertical />
        </div>
      </div>

      <span> Usuario </span>

      <Button
        onClick={() => navigate(`/punto-venta/${POSId}`)}
        variant="primary"
        style={{ width: '100%' }}
      >
        ABRIR POS
      </Button>

      <StartupCashbox
            show={true}
            title="Apertura de Caja"
            user="Juan Pérez"
            cashboxName="Caja Principal"
            onClose={() => {}}
            onSubmit={() => {}}
        />
    </div>
  );
};

export default CardPOS;
