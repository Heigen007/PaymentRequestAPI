function buildShoppingCart() {
    return {
      displayItems: [
        {
          label: "Test",
          amount: {
            currency: "USD",
            value: "15"
          }
        }
      ],
      total: {
        label: "Total",
        amount: {
          currency: "USD",
          value: "15"
        }
      }
    };
}

async function buyItem() {
    const paymentMethods = [
        {
        supportedMethods: "https://google.com/pay",
        data: {
            environment: 'TEST',
            // убрать, когда тестирование окончено и указаны корректные merchant данные
            apiVersion: 2,
            apiVersionMinor: 0,
            merchantInfo: {
                // После того как Вы создадите платежный профиль, Google присвоит ему идентификатор продавца.
                // Он представляет собой уникальный цифровой код, который нельзя изменять.
                // Подробнее: https://support.google.com/paymentscenter/answer/7163092?hl=ru
                merchantId: '12345678901234567890',
                merchantName: 'Example Merchant'
            },
            allowedPaymentMethods: [{
                type: 'CARD',
                parameters: {
                allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                allowedCardNetworks: ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "VISA"]
                },
                tokenizationSpecification: {
                type: 'PAYMENT_GATEWAY',
                // Проверьте свой PAYMENT GATEWAY
                // Подробнее: https://developers.google.com/pay/api/web/reference/request-objects#gateway
                parameters: {
                    'gateway': 'alfabank',
                    'gatewayMerchantId': 'exampleGatewayMerchantId'
                    // gatewayMerchantId нужно получать у банка(к примеру АльфаБанка)
                }
                }
            }]
            }
        }
    ];
    try {
        const paymentObject = buildShoppingCart();
        const payment = new PaymentRequest(paymentMethods, paymentObject);

        // Показать платежное окно
        const paymentUi = await payment.show()
        console.log(paymentUi);

        // Если пользователь закрыл платежное окно, не оплатив, то сработает catch блок
        await paymentUi.complete("success");
        alert("Success!");
    } catch (e) {
        console.log("error: ", e);
    }
}
document.getElementById('button').addEventListener('click', () => {
    buyItem()
})