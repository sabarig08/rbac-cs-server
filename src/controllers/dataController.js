exports.getSecretData = async (req, res) => {
  res.json({ message: 'This is protected data visible only with proper role/permission.' });
};
