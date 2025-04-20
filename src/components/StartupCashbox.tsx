import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { Button, Form, InputGroup, Alert } from 'react-bootstrap';

interface StartupCashboxProps {
    show: boolean;
    title: string;
    user: string;
    cashboxName: string;
    cashboxId: number;
    onClose: () => void;
    handleChangePOS: () => void;
}

const StartupCashbox = ({ 
    show, 
    title, 
    user, 
    cashboxName, 
    cashboxId,
    onClose,
    handleChangePOS
}: StartupCashboxProps) => {

    const [initialAmount, setInitialAmount] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Validar formato numérico con máximo 2 decimales
        if (/^\d*\.?\d{0,2}$/.test(value) || value === '') {
            setInitialAmount(value);
            setError('');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!initialAmount || isNaN(Number(initialAmount))) {
            setError('Por favor ingrese un monto válido');
            return;
        }

        if (Number(initialAmount) <= 0) {
            setError('El monto debe ser mayor a cero');
            return;
        }

        setIsSubmitting(true);
        try {
            await onSubmit(Number(initialAmount));
            onClose();
        } catch (error) {
            setError(`${error}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const onSubmit = async (amount: number) => {
        // Lógica para guardar el monto inicial en la caja
        // await api.post('/cashbox/startup', { amount });
        handleChangePOS();
    };

    useEffect(() => {
        if (!show) {
            setInitialAmount('');
            setError('');
        }
    }, [show]);

    return (
        <Modal
            show={show}
            title={title}
            content={
                <div style={{ padding: '0 15px' }}>
                    <div style={{ marginBottom: 20 }}>
                        <div style={{ 
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: 10
                        }}>
                            <span style={{ fontWeight: 500 }}>Caja:</span>
                            <span style={{ color: '#666' }}>{cashboxName}</span>
                        </div>
                        <div style={{ 
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <span style={{ fontWeight: 500 }}>Usuario:</span>
                            <span style={{ color: '#666' }}>{user}</span>
                        </div>
                    </div>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="initialAmount">
                            <Form.Label style={{ 
                                fontWeight: 500, 
                                marginBottom: 8 
                            }}>
                                Saldo inicial *
                            </Form.Label>
                            
                            <InputGroup>
                                <InputGroup.Text>MXN</InputGroup.Text>
                                <Form.Control
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    placeholder="Ej. 1000.00"
                                    value={initialAmount}
                                    onChange={handleInputChange}
                                    isInvalid={!!error}
                                    disabled={isSubmitting}
                                />
                            </InputGroup>

                            {error && (
                                <Alert variant="danger" className="mt-2" style={{ fontSize: 14 }}>
                                    {error}
                                </Alert>
                            )}
                        </Form.Group>
                    </Form>
                </div>
            }
            buttonGroup={
                <div style={{ display: 'flex', gap: 10 }}>
                    <Button 
                        variant="outline-secondary" 
                        onClick={onClose}
                        disabled={isSubmitting}
                    >
                        Cancelar
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Guardando...' : 'Confirmar'}
                    </Button>
                </div>
            }
            handlers={{ onClose }}
        />
    );
}

export default StartupCashbox;