export function errorHandler(err, req, res, next) {
  console.error("Backend error:", err);

  res.status(err.status || 500).json({
    message:
      err.status && err.status < 500
        ? err.message
        : "Something went wrong on the server.",
  });
}
