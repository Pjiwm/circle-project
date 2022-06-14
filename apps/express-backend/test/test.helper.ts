const setup = async (): Promise<void> => {
	process.env["NODE_ENV"] = "test";
};
export default setup;