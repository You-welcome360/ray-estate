import express from 'express';
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from 'helmet';
import morgan from 'morgan';
import { authMiddleware } from './middleware/authMiddleware';

// ROUTE IMPORT
import tenantRoute from './routes/tenantRoutes'
import managerRoute from './routes/managerRoutes'
import propertyRoute from './routes/propertyRoutes'
import leaseRoute from './routes/leaseRoutes'
import applicationRoute from './routes/applicationRoutes'



//CONFIGURATIONS
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginEmbedderPolicy({policy: 'credentialless'}));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

//ROUTES
app.get('/',(req,res)=>{
    res.send('This is home route')
})

app.use("/tenants", authMiddleware(['tenant']),tenantRoute);
app.use("/managers", authMiddleware(['manager']),managerRoute);
app.use('/properties',propertyRoute);
app.use('/leases',leaseRoute);
app.use('/applications',applicationRoute);


//SERVER
const port = process.env.PORT || 3002;
app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
    
})