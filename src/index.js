app.use(express.json())
app.use(express.urlencoded({ extended: true }))

server.get("/", async (req, res) => {
	console.log("bateu");
});