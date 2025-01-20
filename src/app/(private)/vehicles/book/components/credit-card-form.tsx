import { AddressElement, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Modal } from 'antd';

interface ICreditCardFormProps {
    openCreditCardForm: boolean;
    setOpenCreditCardForm: (value: boolean) => void;
    onPaymentSuccess: (value: string) => void;
}

function CreditCardForm({ openCreditCardForm, setOpenCreditCardForm, onPaymentSuccess }: ICreditCardFormProps) {

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "https://example.com/order/123/complete",
            },
            redirect: 'if_required'
        });

        if (result.error) {
            console.log(result.error.message);
        } else {
            onPaymentSuccess(result.paymentIntent.id)
        }
    };

    return (
        <Modal open={openCreditCardForm} onCancel={() => setOpenCreditCardForm(false)} centered title='COMPLETE YOUR BOOKING PAYMENT' footer={null}>
            <form onSubmit={handleSubmit}>
                <PaymentElement />
                <AddressElement
                    options={{
                        allowedCountries: ['US'],
                        mode: 'billing'
                    }}
                />
                <div className="flex justify-end gap-5 mt-5">
                    <Button>Cancel</Button>
                    <Button type="primary" htmlType="submit">Submit Payment</Button>
                </div>
            </form>
        </Modal>
    );
};

export default CreditCardForm

