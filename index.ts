import { app, port } from './src';
import { swaggerDocs } from './src/v1/swagger';

app.listen(port, () => {
	console.log(`API listening at http://localhost:${port}`);
	swaggerDocs({ app, port });
});