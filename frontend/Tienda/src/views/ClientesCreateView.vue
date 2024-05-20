<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4> Agregar cliente</h4>
                <div v-if="mensaje == 1" class="alert alert-success" role="alert">
                    Datos guardados con exito
                </div>
            </div>
            <div class="card-body">
                <Form :validation-schema="validationSchema" @submit="onTodoBien">
                    <div class="mb-3">
                        ID
                        <Field name="id" id="id" type="text" class="form-control" v-model="model.cliente.id" />
                        <ErrorMessage name="id" /> 
                    </div>
                    <div class="mb-3">
                        Nombre
                        <Field name="nombre" id="nombre" type="text" class="form-control" v-model="model.cliente.nombre" />
                        <ErrorMessage name="nombre" /> 
                    </div>
                    <div class="mb-3">
                        Direccion
                        <Field name="direccion" id="direccion" type="text" class="form-control" v-model="model.cliente.direccion" />
                        <ErrorMessage name="direccion" /> 
                    </div>
                    <div class="mb-3">
                        Telefono
                        <Field name="telefono" id="telefono" type="text" class="form-control" v-model="model.cliente.telefono" />
                        <ErrorMessage name="telefono" /> 
                    </div>
                    <div class="mb-3">
                        RFC
                        <Field name="rfc" id="rfc" type="text" class="form-control" v-model="model.cliente.rfc" />
                        <ErrorMessage name="rfc" /> 
                    </div>
                    <div class="mb-3">
                        <button type="submit" class="btn btn-primary"> Guardar</button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { Field, Form, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';
export default {
    name: "ClientesCreate",
    components: { Field, Form, ErrorMessage },
    data() {
        const validationSchema = toTypedSchema(
            zod.object({
                id: zod.string({message: 'Requerido'}).min(1),
                nombre: zod.string({message: 'Requerido'}).min(1),
                direccion: zod.string({message: 'Requerido'}).min(1),
                telefono: zod.string({message: 'Requerido'}).min(1).max(10),
                rfc: zod.string({message: 'Requerido'}).min(1)
            })
        )
        return {
            validationSchema,
            mensaje: 0,
            model: {
                cliente: {
                    id: '',
                    nombre: '',
                    direccion: '',
                    telefono: '',
                    rfc: ''
                }
            }
        }
    },
    methods: {
        onTodoBien(){
            alert('Todo validado');
        },
        GuardarCliente() {
            axios.post('http://localhost:3000/api/clientes', this.model.cliente)
                .then(res => {
                    //Si insertamos 1 regstro
                    if (res.data.affectedRows == 1) {
                        //Limpiamos los textos
                        this.model.cliente = {
                            id: '',
                            nombre: '',
                            direccion: '',
                            telefono: '',
                            rfc: ''
                        }
                        //Para que salga el mensaje de exito
                        this.mensaje = 1;
                    }
                })
        }
    }
}
</script>