const envVariables = {
  // DB configurations
  DB_USER: process.env.DB_USER || "dqwzzeooumpwlq",
  DB_PASSWORD:process.env.DB_PASSWORD || "2659bb5198d2b3a015055d3715b314bbb5ac12d9153b10c0672becfc0568c1d9",
  DB_HOST: process.env.DB_HOST || "ec2-174-129-218-200.compute-1.amazonaws.com",
  DB_NAME: process.env.DB_NAME || "ddtsuoc56vn53p",
  DB_SSL: process.env.DB_SSL || true,
  DB_PORT: process.env.DB_PORT || 5432,
  DB_MAX_POOL_SIZE: process.env.DB_MAX_POOL_SIZE || "5",
  //server configurations
  SERVER_PORT: process.env.SERVER_PORT || "8080",
  PORT: 8080,
	BODY_LIMIT: "100kb",
	CROS_HEADERS: ["Link"]
};
export default envVariables;
