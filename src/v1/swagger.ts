import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"

//Metadata info about the API
const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "API",
			version: "1.0.0",
		},
		servers: [
			{
				url: "http://localhost:3000",
			},
		],
	},
	apis: ["./src/v1/routes/userRoutes.ts"],
}

// Docs en Json format
const swaggerSpecs = swaggerJSDoc(options)

// function to use swagger
export const swaggerDocs = ({ app, port }: any) => {
	app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs))
	app.get("/docs.json", ({ req, res }: any) => {
		res.setHeader("Content-Type", "application/json")
		res.send(swaggerSpecs)
	})

	console.log(`Swagger docs running at http://localhost:${port}/docs`)
}