import Modal from './Modal';
import { Form, InputGroup, Alert, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

interface WithdrawCashProps {
  cashboxId: number;
  userId: number;
  show: boolean;
  onClose: () => void;
}

interface WithdrawPayload {
  amount: number;
  cashboxId: number;
  comments: string;
  userId: number;
  currency: string;
}

const WithdrawCash = ({
  cashboxId,
  userId,
  show,
  onClose,
}: WithdrawCashProps) => {
  const [error, setError] = useState<String>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [payload, setPayload] = useState<WithdrawPayload>({
    amount: 0,
    cashboxId: 0,
    comments: '',
    userId: 0,
    currency: 'MXN',
  });

  useEffect(() => {
    clean();
  }, [show]);

  const handlePayloadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name == 'amount') {
      setPayload((prev) => ({
        ...prev,
        ['amount']: Number(value),
      }));
    } else if (name == 'cashboxId') {
      setPayload((prev) => ({
        ...prev,
        ['cashboxId']: Number(value),
      }));
    } else if (name == 'userId') {
      setPayload((prev) => ({
        ...prev,
        ['userId']: Number(value),
      }));
    } else {
      setPayload((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      if (payload.amount <= 0) {
        setError('El monto debe ser mayor a cero');
        return;
      }
      await onSubmit(payload.amount);
      onClose();
    } catch (err) {
      setError('Error al guardar el monto inicial: ' + err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = async (amount: number) => {
    // Implement the logic to withdraw cash here
    // For example, make an API call to withdraw the cash
    console.log('Withdrawing cash:', amount);
    // After successful withdrawal, close the modal
    clean();
    onClose();
  };

  const clean = () => {
    setPayload({
      amount: 0,
      cashboxId: 0,
      comments: '',
      userId: 0,
      currency: 'MXN',
    });
    setError('');
    setIsSubmitting(false);
  };

  return (
    <Modal
      show={show}
      title={'Retirar Dinero'}
      content={
        <div style={{ padding: '0 15px' }}>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form
            onSubmit={handleSubmit}
            style={{
              width: '100%',
              display: 'grid',
              gap: '10px',
              gridTemplateColumns: '1fr 1fr',
            }}
          >
            <Form.Group style={{ width: '100%' }}>
              <Form.Label
                style={{
                  fontWeight: '500',
                  marginBottom: '8px',
                  textAlign: 'start',
                  width: '100%',
                }}
              >
                Importe
              </Form.Label>
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  type="number"
                  name="amount"
                  value={payload.amount}
                  onChange={handlePayloadChange}
                  placeholder="0.00"
                  required
                  isInvalid={!!error}
                  disabled={isSubmitting}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group style={{ width: '100%' }}>
              <Form.Label
                style={{
                  fontWeight: '500',
                  marginBottom: '8px',
                  textAlign: 'start',
                  width: '100%',
                }}
              >
                Moneda
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type="options"
                  name="currency"
                  value={payload.currency}
                  onChange={handlePayloadChange}
                  placeholder="MXN"
                  required
                  isInvalid={!!error}
                  disabled={true}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group style={{ width: '100%' }}>
              <Form.Label
                style={{
                  fontWeight: '500',
                  marginBottom: '8px',
                  textAlign: 'start',
                  width: '100%',
                }}
              >
                Comentarios
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  name="comments"
                  value={payload.comments}
                  onChange={handlePayloadChange}
                  placeholder=""
                  required
                  isInvalid={!!error}
                />
              </InputGroup>
            </Form.Group>
          </Form>
        </div>
      }
      buttonGroup={
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
          <Button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? 'Cargando...' : 'Guardar'}
          </Button>
        </div>
      }
      handlers={{ onClose: onClose }}
    />
  );
};

export default WithdrawCash;
