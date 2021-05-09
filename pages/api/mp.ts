import mercadoPago from 'mercadopago';
//Not being used, just for reference.
export default function handler(req, res) {
  console.log('entre');
  if (req.method === 'POST') {
    const { cart } = req.body;

    console.log(cart);
    const items = cart.map((item) => {
      return {
        title: item.product.name,
        unit_price: item.product.price,
        quantity: item.quantity,
      };
    });
    console.log(items);
    mercadoPago.configurations.setAccessToken(
      process.env.NEXT_PUBLIC_ACCESS_TOKEN
    );
    let preference = {
      items,
      back_urls: {
        success: `http://localhost:7777/`,
        pending: `http://localhost:7777/`,
        failure: `http://localhost:7777/`,
      },
      auto_return: 'approved',
    };

    console.log(preference);

    mercadoPago.preferences
      .create(preference)
      .then(function (response) {
        console.log(response.body.init_point);
        return res.json({ initPoint: response.body.init_point });
      })
      .catch(function (error) {
        console.log(error);
        return res.json({ error: 'salio mal' });
      });
    // console.log(mercadoPago);
    // return res.status(200).json({ msg: 'Aca vaya a saber' });
  }
  if (req.method === 'GET') {
    return res.status(200).json({ email: 'email' });
  }

  // res.status(200).json({ name: 'wo' });
}
