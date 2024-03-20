import path from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'
import indexRouter from './routes/index.js'
import usersRouter from './routes/users.js'
import empleadosRouter from './routes/empleados.js'
import puestosRouter from './routes/puestos.js'
import categoriasRouter from './routes/categorias.js'
import platillosRouter from './routes/platillos.js'
import mesasRouter from './routes/mesas.js'
import clientesRouter from './routes/clientes.js'
import comandasRouter from './routes/comandas.js'
import comprasRouter from './routes/compras.js'
import productosRouter from './routes/productos.js'
import rolesRouter from './routes/roles.js'
import imgRouter from './routes/imagenes.js'
import cors from 'cors'
import {soap} from 'express-soap';

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/empleados', empleadosRouter)
app.use('/puestos', puestosRouter)
app.use('/categorias', categoriasRouter)
app.use('/platillos', platillosRouter)
app.use('/mesas', mesasRouter)
app.use('/clientes', clientesRouter)
app.use('/comandas', comandasRouter)
app.use('/compras', comprasRouter)
app.use('/productos', productosRouter)
app.use('/roles', rolesRouter)
app.use('/imagenes', imgRouter)


app.use('/soap/calculation', soap({
    services: {
        CalculatorService: {
            Calculator: {
                Add({a, b}, res) {
                    res({
                            result: a + b
                    });
                },
                Subtract({a, b}, res) {
                    res({
                            result: a - b
                    });
                }
              }
        }
    }, 

    wsdl: `<definitions
    xmlns="http://schemas.xmlsoap.org/wsdl/"
    xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
    xmlns:tns="http://localhost:3000/soap/calculation"
    xmlns:xsd="http://www.w3.org/2001/XMLSchema"
    name="CalculatorService"
    targetNamespace="http://localhost:3000/soap/calculation">

    <types>
        <schema xmlns="http://www.w3.org/2001/XMLSchema" targetNamespace="http://localhost:3000/soap/calculation">
            <element name="AddRequest">
                <complexType>
                    <sequence>
                        <element name="a" type="xsd:int"/>
                        <element name="b" type="xsd:int"/>
                    </sequence>
                </complexType>
            </element>
            <element name="AddResponse">
                <complexType>
                    <sequence>
                        <element name="result" type="xsd:int"/>
                    </sequence>
                </complexType>
            </element>
            <element name="SubtractRequest">
                <complexType>
                    <sequence>
                        <element name="a" type="xsd:int"/>
                        <element name="b" type="xsd:int"/>
                    </sequence>
                </complexType>
            </element>
            <element name="SubtractResponse">
                <complexType>
                    <sequence>
                        <element name="result" type="xsd:int"/>
                    </sequence>
                </complexType>
            </element>
        </schema>
    </types>

    <message name="AddRequest">
        <part name="parameters" element="tns:AddRequest"/>
    </message>
    <message name="AddResponse">
        <part name="parameters" element="tns:AddResponse"/>
    </message>
    <message name="SubtractRequest">
        <part name="parameters" element="tns:SubtractRequest"/>
    </message>
    <message name="SubtractResponse">
        <part name="parameters" element="tns:SubtractResponse"/>
    </message>

    <portType name="CalculatorPortType">
        <operation name="Add">
            <input message="tns:AddRequest"/>
            <output message="tns:AddResponse"/>
        </operation>
        <operation name="Subtract">
            <input message="tns:SubtractRequest"/>
            <output message="tns:SubtractResponse"/>
        </operation>
    </portType>

    <binding name="CalculatorBinding" type="tns:CalculatorPortType">
        <soap:binding style="document" transport="http://schemas.xmlsoap.org/soap/http"/>
        <operation name="Add">
            <soap:operation soapAction="http://localhost:3000/soap/calculation/Add"/>
            <input>
                <soap:body use="literal"/>
            </input>
            <output>
                <soap:body use="literal"/>
            </output>
        </operation>
        <operation name="Subtract">
            <soap:operation soapAction="http://localhost:3000/soap/calculation/Subtract"/>
            <input>
                <soap:body use="literal"/>
            </input>
            <output>
                <soap:body use="literal"/>
            </output>
        </operation>
    </binding>

    <service name="CalculatorService">
        <port name="CalculatorPort" binding="tns:CalculatorBinding">
            <soap:address location="http://localhost:3000/soap/calculation"/>
        </port>
    </service>
</definitions>` // or xml (both options are valid)
}));

export default app
