const bcrypt = require('bcrypt');

const adminHash = '$2b$10$NlApz1LktmW7mYLPOVjTHOn4NYQyXvJ8QoT394y4pznFcAyz6QK.2';
const userHash = '$2b$10$lc/r05NlKeHhYpgy1ViB9ekg0Np.M91uDuJMsyXDTi3KrtHC7DHSG';

(async () => {
  console.log(await bcrypt.compare('admin123', adminHash)); // should print true
  console.log(await bcrypt.compare('user123', userHash));   // should print true
})();
