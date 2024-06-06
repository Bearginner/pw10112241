<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Editar vendedores</h4>
                <div v-if="mensaje == 1" class="alert alert-success" role="alert">
                    Datos guardados con exito
                </div>
            </div>
            <div class="card-body">
                <Form :validation-schema="validationSchema" @submit="onTodoBien">
                    <div class="md-3">
                        ID
                        <Field name="idvendedor" id="idvendedor" class="form-control" type="number"
                            v-model="model.vendedores.idvendedor" />
                        <ErrorMessage name="idvendedor" class="errorValidation" />
                    </div>
                    <div class="md-3">
                        Nombre
                        <Field name="nombre" id="nombre" class="form-control" type="text"
                            v-model="model.vendedores.nombre" />
                        <ErrorMessage name="nombre" class="errorValidation" />
                    </div>
                    <div class="md-3">
                        Apellidos
                        <Field name="apellido" id="apellido" class="form-control" type="text"
                            v-model="model.vendedores.apellido" />
                        <ErrorMessage name="apellido" class="errorValidation" />
                    </div>
                    <div class="md-3">
                        departamentotienda
                        <Field name="departamentotienda" id="departamentotienda" class="form-control" type="text"
                            v-model="model.vendedores.departamentotienda" />
                        <ErrorMessage name="departamentotienda" class="errorValidation" />
                    </div>
                    <p></p>
                    <div class="md-3">
                        <button type="submit" class="btn btn-primary">Guardar</button>
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
    name: "VendedoresEdit",
    components: { Field, Form, ErrorMessage },
    data() {
        const validationSchema = toTypedSchema(
            zod.object({
                idvendedor: zod.number({ message: 'Solo numero enteros' }),
                nombre: zod.string().min(1, { message: 'Campo Requerido' }).min(1),
                apellido: zod.string().min(1, { message: 'Campo Requerido' }).min(1),
                departamentotienda: zod.string().min(1, { message: 'Campo Requerido' }).min(1),
            })
        )
        return {
            validationSchema,
            mensaje: 0,
            model: {
                vendedores: {
                    idvendedor: '',
                    nombre: '',
                    apellido: '',
                    departamentotienda: ''
                }
            }
        }
    },
    mounted() {
        this.getVendedores(this.$route.params.id);
    },
    methods: {
        getVendedores(vendedorID) {
            axios.get('http://localhost:3000/api/vendedores/' + vendedorID).then(res => {
                //this.model.cliente.id = res.data[0].id;
                //this.model.cliente.nombre = res.data[0].nombre;
                this.model.vendedores = res.data[0];
            })
        },
        onTodoBien() {
            this.guardarVendedores();
        },
        guardarVendedores() {
            axios.put('http://localhost:3000/api/vendedores/' + this.$route.params.id,
                this.model.vendedores).then(res => {
                    if (res.data.affectedRows == 1) {// si inesetamos 1 registros
                        //limpiar el cuadro de textos
                        this.model.vendedores = {
                            idvendedor: '',
                            nombre: '',
                            apellido: '',
                            departamentotienda: ''
                        }
                        this.mensaje = 1;
                    }
                }).catch((error) => {
                    alert(error.message);
                });
        }
    }
}
</script>
<style scoped>
.errorValidation {
    color: red;
    font-weight: bold;
}
</style>