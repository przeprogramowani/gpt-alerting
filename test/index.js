const { handler } = require('../dist/index');

handler({ alert: 'I would like to ask when this new pair of shoes will be available' }).then(
  (data) => console.log(data)
);

handler({ alert: 'CloudWatch: CRITICAL ERROR: CartProcessing service is down.' }).then((data) =>
  console.log(data)
);
