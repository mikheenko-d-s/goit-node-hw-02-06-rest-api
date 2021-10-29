module.exports = {
  v2: {
    config: () => {},
    uploader: {
      upload: (a, b, cb) =>
        cb(null, { public_id: "testing", secure_url: "http://testing.com" }),
    },
  },
};
