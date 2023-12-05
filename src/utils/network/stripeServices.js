import axios from 'axios'

class stripeConstants {

    //************************* Stripe Keys *******************************//
    static stripePublishKey = "pk_test_51H2MwcAGkK2zQZwYPMJsp48QWEssaQpFcSB4d6KTm8yuFzVkmEeMSBYHqhpxnXKObb7JigTlE5hUIlTYkbnjKyEU00MX0nPYIC"
    static stripeSecretKey = "sk_test_51H2MwcAGkK2zQZwYu7Iex8d4gVizX38FCFNeGlulknnM011JDg3d8GUEzlN5UkAmdak7gO1CEFDpyz7EsVLUD8PK00gH3L3DG3"

    //************************* Stripe BaseURL *******************************//
    static baseUrl = "https://api.stripe.com/v1";

    //************************* Stripe EndPoints *******************************//
    static endPoint = {
        addCardToken: "tokens",
        linkCardToCustomer: "customers",
    }

    //************************* Stripe Add Card Payload *******************************//
    static addCardTokenPayload = (cardData) => {
        const params = new URLSearchParams()
        params.append('card[name]', cardData.cardHolderName)
        params.append('card[number]', cardData.cardNum)
        params.append('card[exp_month]', cardData.cardExpMonth)
        params.append('card[exp_year]', cardData.cardExpYear)
        params.append('card[cvc]', cardData.cardCVC)

        return params;
    }

    //************************* Stripe Lind Card To Customer Payload *******************************//
    static linkCardToCustomerPayload = (cardToken) => {
        const cusParams = new URLSearchParams()
        cusParams.append('source', cardToken)

        return cusParams;
    }

}

class stripeService {

    //************************* Add Stripe Publish Key In Bearer Token *******************************//
    #addPublishKeyInBearerToken = () => {
        const axiosInstance = axios.create({
            baseURL: stripeConstants.baseUrl
        });

        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${stripeConstants.stripePublishKey}`
        }
        axiosInstance.defaults.headers = headers;
        return axiosInstance;
    }

    //************************* Add Stripe Secret Key In Bearer Token *******************************//
    #addSecretKeyInBearerToken = () => {
        const axiosInstance = axios.create({
            baseURL: stripeConstants.baseUrl
        });

        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${stripeConstants.stripeSecretKey}`
        }
        axiosInstance.defaults.headers = headers;
        return axiosInstance;
    }

    //************************* Add Card To Stripe *******************************//
    addCardOnStripe = (card, callback) => {
        const axiosWithSecret = this.#addPublishKeyInBearerToken()
        const payload = stripeConstants.addCardTokenPayload(card)

        axiosWithSecret.post(`${stripeConstants.baseUrl}/${stripeConstants.endPoint.addCardToken}`, payload).then(res => {
            const response = {
                success: true,
                data: res?.data
            }
            callback(response)
        }).catch(err => {
            const response = {
                success: false,
                data: {
                    errorName: err.response.data.error.code,
                    message: err.response.data.error.message
                }
            }
            callback(response)
        })
    }

    //************************* Link Card To Customer *******************************//
    linkCardToCustomer = (cusData, callback) => {
        const axiosWithSecret = this.#addSecretKeyInBearerToken()
        const payload = stripeConstants.linkCardToCustomerPayload(cusData.cardToken)

        axiosWithSecret.post(`${stripeConstants.baseUrl}/${stripeConstants.endPoint.linkCardToCustomer}/${cusData.cusId}/sources`, payload).then(res => {
            const response = {
                success: true,
                data: res?.data
            }
            callback(response)
        }).catch(err => {
            const response = {
                success: false,
                data: err.response.data.error.message
            }
            callback(response)
        })
    }

}

const StripeServices = new stripeService();
export default StripeServices;