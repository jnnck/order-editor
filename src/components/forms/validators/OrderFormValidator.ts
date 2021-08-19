import * as Yup from 'yup';

export default Yup.object().shape({
    customerId: Yup.number().required(),
    items: Yup.array().of(
        Yup.object().shape({
            productId: Yup.string()
                .required(),
            quantity: Yup.number()
                .min(1)
                .required()
        })
    )
});