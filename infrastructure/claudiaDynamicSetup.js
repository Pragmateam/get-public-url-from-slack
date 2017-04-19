const fs = require('fs');

const content = {
  lambda: {
    role: process.env.CLAUDIA_LAMBDA_ROLE,
    name: process.env.CLAUDIA_LAMBDA_NAME,
    region: process.env.AWS_REGION
  },
  api: {
    id: process.env.CLAUDIA_API_ID,
    module: 'index'
  }
};

fs.unlink('./claudia.json', () => {
  fs.writeFile('./claudia.json', JSON.stringify(content), (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("success");
    }
  });
});
