<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Editar Articulos</h4>
                <div v-if="mensaje == 1" class="alert alert-success" role="alert">
                    Datos guardados con exito
                </div>
            </div>
            <div class="card-body">
                <Form :validation-schema="validationSchema" @submit="onTodoBien">
                    <div class="md-3">
                        clavearticulo
                        <Field name="clavearticulo" id="clavearticulo" class="form-control" type="number"
                            v-model="model.Articulos.clavearticulo" />
                        <ErrorMessage name="clavearticulo" class="errorValidation" />
                    </div>
                    <div class="md-3">
                        descripcion
                        <Field name="descripcion" id="descripcion" class="form-control" type="text"
                            v-model="model.Articulos.descripcion" />
                        <ErrorMessage name="descripcion" class="errorValidation" />
                    </div>
                    <div class="md-3">
                        existencia
                        <Field name="existencia" id="existencia" class="form-control" type="text"
                            v-model="model.Articulos.existencia" />
                        <ErrorMessage name="existencia" class="errorValidation" />
                    </div>
                    <div class="md-3">
                        precio
                        <Field name="precio" id="precio" class="form-control" type="text"
                            v-model="model.Articulos.precio" />
                        <ErrorMessage name="precio" class="errorValidation" />
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
    name: "ArticulosEdit",
    components: { Field, Form, ErrorMessage },
    data() {
        const validationSchema = toTypedSchema(
            zod.object({
                clavearticulo: zod.number({ message: 'Solo numero enteros' }),
                descripcion: zod.string().min(1, { message: 'Campo Requerido' }).min(1),
                existencia: zod.string().min(1, { message: 'Campo Requerido' }).min(1),
                precio: zod.string().min(1, { message: 'Campo Requerido' }).min(1),
            })
        )
        return {
            validationSchema,
            mensaje: 0,
            model: {
                Articulos: {
                    clavearticulo: '',
                    descripcion: '',
                    existencia: '',
                    precio: ''
                }
            }
        }
    },
    mounted() {
        this.getArticulos(this.$route.params.id);
    },
    methods: {
        getArticulos(ArticulosID) {
            axios.get('http://localhost:3000/api/Articulos/' + ArticulosID).then(res => {
                //this.model.cliente.id = res.data[0].id;
                //this.model.cliente.nombre = res.data[0].nombre;
                this.model.Articulos = res.data[0];
            })
        },
        onTodoBien() {
            this.guardarArticulos();
        },
        guardarArticulos() {
            axios.put('http://localhost:3000/api/Articulos/' + this.$route.params.id,
                this.model.Articulos).then(res => {
                    if (res.data.affectedRows == 1) {// si inesetamos 1 registros
                        //limpiar el cuadro de textos
                        this.model.Articulos = {
                            clavearticulo: '',
                            descripcion: '',
                            existencia: '',
                            precio: ''
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