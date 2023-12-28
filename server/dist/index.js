import app from './app.js';
import { connectToDatabase } from './database/connection.js';
//connections
const PORT = process.env.PORT || 4000;
connectToDatabase()
    .then(() => {
    app.listen(PORT, () => console.log('Server Open'));
})
    .catch((err) => console.log(err));
//# sourceMappingURL=index.js.map