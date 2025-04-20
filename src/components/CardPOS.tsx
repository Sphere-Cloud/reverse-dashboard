import '../styles/cardPos.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import StartupCashbox from './StartupCashbox';
import CloseupCashbox from './CloseupCashbox';
import EllipsisMenu from './EllipsisMenu';
import WithdrawCash from './WithdrawCash';
import DepositCash from './DepositCash';
import { useState } from 'react';

interface CardPOSProps {
  POSName: string;
  POSId: number;
  POSStatusIsOpen: boolean;
  POSUserResponsable: string;
}

const CardPOS = ({
  POSName,
  POSId,
  POSStatusIsOpen,
  POSUserResponsable,
}: CardPOSProps) => {
  const navigate = useNavigate();

  const [showCashboxConfig, setShowCashboxConfig] = useState(false);
  const [showCashboxClose, setShowCashboxClose] = useState(false);
  const [showWithdrawCash, setShowWithdrawCash] = useState(false);
  const [showDepositCash, setShowDepositCash] = useState(false);
  const [statusPointOfSale, setStatusPointOfSale] = useState(POSStatusIsOpen);

  const handleStatusPointOfSale = () => {
    setStatusPointOfSale(!statusPointOfSale);
  } 

  const handleOpenPOS = () => {
    navigate(`/punto-venta/${POSId}`);
    return;
  };

  const handleClosePos = () => {
    handleOpenCashboxClose();
  };

  const handleOpenConfigCashbox = () => {
    setShowCashboxConfig(true);
  };

  const handleCloseConfigCashbox = () => {
    setShowCashboxConfig(false);
  };

  const handleOpenCashboxClose = () => {
    setShowCashboxClose(true);
  };

  const handleCloseCashboxClose = () => {
    setShowCashboxClose(false);
  };

  const handleOpenWithdrawCash = () => {
    setShowWithdrawCash(true);
  };

  const handleCloseWithdrawCash = () => {
    setShowWithdrawCash(false);
  };

  const handleOpenDepositCash = () => {
    setShowDepositCash(true);
  };

  const handleCloseDepositCash = () => {
    setShowDepositCash(false);
  };

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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
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
              {statusPointOfSale ? 'ABIERTO' : 'CERRADO'}
            </strong>
          </div>
        </div>
        <div
          className="hover-gray"
          style={{
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            width: '30px',
            height: '30px',
            justifyContent: 'center',
          }}
        >
          <EllipsisMenu
            items={[
              { id: 1, name: 'Retiro', action: handleOpenWithdrawCash },
              { id: 2, name: 'Deposito', action: handleOpenDepositCash },
              { id: 3, name: 'Ventas', action: () => { navigate("/ventas") } },
              { id: 4, name: 'Configuración', action: () => {} },
            ]}
          />
        </div>
      </div>

      <span> {POSUserResponsable} </span>

      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          gap: '10px',
        }}
      >
        {!statusPointOfSale ? (
          <Button
            onClick={handleOpenConfigCashbox}
            variant="primary"
            style={{ width: '100%' }}
          >
            ABRIR CAJA
          </Button>
        ) : (
          <Button
            onClick={handleOpenPOS}
            variant="primary"
            style={{ width: '100%' }}
          >
            CONTINUAR
          </Button>
        )}
        {statusPointOfSale && (
          <Button
            onClick={handleClosePos}
            variant="outline-secondary"
            style={{ width: '100%' }}
          >
            CERRAR CAJA
          </Button>
        )}
      </div>

      <StartupCashbox
        show={showCashboxConfig}
        title="Apertura de Caja"
        user={POSUserResponsable}
        cashboxName={POSName}
        cashboxId={POSId}
        onClose={handleCloseConfigCashbox}
        handleChangePOS={handleStatusPointOfSale}
      />

      <CloseupCashbox
        show={showCashboxClose}
        title="Cierre de Caja"
        user={POSUserResponsable}
        cashboxName={POSName}
        cashboxId={POSId}
        onClose={handleCloseCashboxClose}
        handleChangePOS={handleStatusPointOfSale}
      />

      <WithdrawCash
        show={showWithdrawCash}
        userId={parseInt(POSUserResponsable)}
        cashboxId={POSId}
        onClose={handleCloseWithdrawCash}
      />

      <DepositCash
        show={showDepositCash}
        userId={parseInt(POSUserResponsable)}
        cashboxId={POSId}
        onClose={handleCloseDepositCash}
      />
    </div>
  );
};

export default CardPOS;
